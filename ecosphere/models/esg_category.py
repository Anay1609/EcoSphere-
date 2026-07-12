from odoo import fields, models


class EsgCategory(models.Model):
    _name = "esg.category"
    _description = "ESG Category"
    _order = "type, name"

    name = fields.Char(required=True, index=True)
    type = fields.Selection(
        selection=[
            ("csr_activity", "CSR Activity"),
            ("challenge", "Challenge"),
        ],
        required=True,
        index=True,
    )
    status = fields.Selection(
        selection=[("active", "Active"), ("archived", "Archived")],
        default="active",
        required=True,
        index=True,
    )

    _sql_constraints = [
        (
            "name_type_unique",
            "unique(name, type)",
            "An ESG category with this name and type already exists.",
        ),
    ]

    def action_archive(self):
        self.write({"status": "archived"})

    def action_activate(self):
        self.write({"status": "active"})

