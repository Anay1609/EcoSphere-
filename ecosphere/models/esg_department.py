from odoo import api, fields, models, _
from odoo.exceptions import ValidationError


class EsgDepartment(models.Model):
    _name = "esg.department"
    _description = "ESG Department"
    _parent_name = "parent_id"
    _parent_store = True
    _rec_name = "display_name"
    _order = "code, name"

    name = fields.Char(required=True, index=True)
    code = fields.Char(required=True, index=True, copy=False)
    display_name = fields.Char(compute="_compute_display_name", store=True)
    head_id = fields.Many2one(
        "hr.employee",
        string="Head",
        ondelete="set null",
        index=True,
    )
    parent_id = fields.Many2one(
        "esg.department",
        string="Parent Department",
        ondelete="restrict",
        index=True,
    )
    parent_path = fields.Char(index=True)
    employee_ids = fields.One2many(
        "hr.employee",
        "esg_department_id",
        string="Employees",
    )
    employee_count = fields.Integer(compute="_compute_employee_count")

    # ESG scoring
    carbon_transaction_ids = fields.One2many(
        "esg.carbon.transaction", "department_id", string="Carbon Transactions"
    )
    current_co2 = fields.Float(
        string="Current CO2 (t)", compute="_compute_current_co2", store=True, digits=(12, 2)
    )
    target_co2 = fields.Float(string="Target CO2 (t)", default=100.0)
    environmental_score = fields.Float(string="Environmental Score", default=0.0)
    social_score = fields.Float(string="Social Score", default=0.0)
    governance_score = fields.Float(string="Governance Score", default=0.0)
    esg_score = fields.Float(
        string="Overall ESG Score", compute="_compute_esg_score", store=True, digits=(5, 1)
    )
    status = fields.Selection(
        selection=[("active", "Active"), ("archived", "Archived")],
        default="active",
        required=True,
        index=True,
    )

    _sql_constraints = [
        (
            "code_unique",
            "unique(code)",
            "The ESG department code must be unique.",
        ),
    ]

    @api.depends("name", "code")
    def _compute_display_name(self):
        for department in self:
            if department.code and department.name:
                department.display_name = _("%(code)s - %(name)s") % {
                    "code": department.code,
                    "name": department.name,
                }
            else:
                department.display_name = department.name or department.code

    def _compute_employee_count(self):
        grouped = self.env["hr.employee"].read_group(
            [("esg_department_id", "in", self.ids)],
            ["esg_department_id"],
            ["esg_department_id"],
        )
        count_by_department = {
            row["esg_department_id"][0]: row["esg_department_id_count"]
            for row in grouped
            if row.get("esg_department_id")
        }
        for department in self:
            department.employee_count = count_by_department.get(department.id, 0)

    @api.constrains("parent_id")
    def _check_parent_recursion(self):
        if not self._check_recursion():
            raise ValidationError(_("An ESG department cannot be its own parent."))

    @api.depends("carbon_transaction_ids.co2e")
    def _compute_current_co2(self):
        for department in self:
            department.current_co2 = round(
                sum(department.carbon_transaction_ids.mapped("co2e")), 2
            )

    @api.depends("environmental_score", "social_score", "governance_score")
    def _compute_esg_score(self):
        config = self.env["res.config.settings"].get_esg_configuration()
        ew, sw, gw = (
            config["environmental_weight"],
            config["social_weight"],
            config["governance_weight"],
        )
        total = (ew + sw + gw) or 100.0
        for department in self:
            department.esg_score = round(
                (department.environmental_score * ew
                 + department.social_score * sw
                 + department.governance_score * gw) / total,
                1,
            )

    def action_archive(self):
        self.write({"status": "archived"})

    def action_activate(self):
        self.write({"status": "active"})


class HrEmployee(models.Model):
    _inherit = "hr.employee"

    # This explicit link makes EcoSphere department reporting independent from
    # the company's HR org chart while still letting teams map employees cleanly.
    esg_department_id = fields.Many2one(
        "esg.department",
        string="ESG Department",
        index=True,
        ondelete="set null",
    )

