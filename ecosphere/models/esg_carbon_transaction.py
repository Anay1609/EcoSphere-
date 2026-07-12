from odoo import models, fields, api
from odoo.exceptions import UserError


class EsgCarbonTransaction(models.Model):
    _name = "esg.carbon.transaction"
    _description = "ESG Carbon Transaction"
    _order = "date desc, id desc"

    name = fields.Char(string="Reference", readonly=True, copy=False, default="New")
    date = fields.Date(default=fields.Date.today, required=True, index=True)
    source_document = fields.Char(string="Source Document")
    department_id = fields.Many2one("esg.department", string="Department", index=True)
    factor_id = fields.Many2one(
        "esg.emission.factor", string="Emission Factor", required=True, ondelete="restrict"
    )
    quantity = fields.Float(required=True, default=1.0)
    uom = fields.Char(related="factor_id.unit", store=True, readonly=True)
    co2e = fields.Float(
        string="Calculated CO2e (kg)", compute="_compute_co2e", store=True, digits=(12, 2)
    )
    status = fields.Selection(
        selection=[
            ("draft", "Draft"),
            ("calculated", "Calculated"),
            ("needs_review", "Needs Review"),
        ],
        default="calculated",
        required=True,
        index=True,
    )
    notes = fields.Text()

    @api.depends("quantity", "factor_id", "factor_id.co2e_per_unit")
    def _compute_co2e(self):
        for transaction in self:
            if not transaction.factor_id:
                transaction.co2e = 0.0
                continue
            transaction.co2e = round(
                (transaction.quantity or 0.0) * (transaction.factor_id.co2e_per_unit or 0.0),
                2,
            )

    @api.model_create_multi
    def create(self, vals_list):
        records = super().create(vals_list)
        for record in records:
            if not record.name or record.name == "New":
                record.name = (
                    self.env["ir.sequence"].next_by_code("esg.carbon.transaction")
                    or f"CT{record.id:05d}"
                )
        return records

    def action_confirm(self):
        self.write({"status": "calculated"})

    @api.model
    def generate_from_purchase(self, source_document, department_id, factor_id, quantity, date=None):
        """Golden-path entry point: a confirmed PO/MO/Fleet/Expense record
        generates a carbon transaction from its emission factor."""
        if not factor_id:
            raise UserError("An emission factor is required to generate a carbon transaction.")
        return self.create(
            {
                "source_document": source_document,
                "department_id": department_id,
                "factor_id": factor_id,
                "quantity": quantity,
                "date": date or fields.Date.today(),
                "status": "calculated",
            }
        )
