from odoo import models, fields, _


class EsgEmissionFactor(models.Model):
    _name = "esg.emission.factor"
    _description = "ESG Emission Factor"
    _order = "name"

    name = fields.Char(required=True, index=True)
    activity_type = fields.Selection(
        selection=[
            ("purchase", "Purchase"),
            ("manufacturing", "Manufacturing"),
            ("fleet", "Fleet"),
            ("expense", "Expense"),
            ("other", "Other"),
        ],
        required=True,
        index=True,
    )
    unit = fields.Char(string="Unit of Measure", required=True)
    co2e_per_unit = fields.Float(
        string="CO2e per Unit (kg)", required=True, digits=(12, 4)
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
            "unique(name, activity_type)",
            "An emission factor with this name and activity type already exists.",
        ),
    ]
