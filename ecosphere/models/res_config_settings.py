from odoo import api, fields, models, _
from odoo.exceptions import ValidationError
from odoo.tools.float_utils import float_compare


class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"

    esg_environmental_weight = fields.Float(
        string="Environmental Weight (%)",
        default=40.0,
        config_parameter="ecosphere.environmental_weight",
    )
    esg_social_weight = fields.Float(
        string="Social Weight (%)",
        default=30.0,
        config_parameter="ecosphere.social_weight",
    )
    esg_governance_weight = fields.Float(
        string="Governance Weight (%)",
        default=30.0,
        config_parameter="ecosphere.governance_weight",
    )
    esg_auto_emission_calculation = fields.Boolean(
        string="Auto Emission Calculation",
        default=True,
        config_parameter="ecosphere.auto_emission_calculation",
    )
    esg_evidence_requirement = fields.Boolean(
        string="Evidence Requirement",
        default=True,
        config_parameter="ecosphere.evidence_requirement",
    )
    esg_badge_auto_award = fields.Boolean(
        string="Badge Auto-Award",
        default=True,
        config_parameter="ecosphere.badge_auto_award",
    )
    esg_compliance_email_alerts = fields.Boolean(
        string="Compliance Email Alerts",
        default=True,
        config_parameter="ecosphere.compliance_email_alerts",
    )

    @api.constrains(
        "esg_environmental_weight",
        "esg_social_weight",
        "esg_governance_weight",
    )
    def _check_esg_weighting(self):
        for settings in self:
            weights = (
                settings.esg_environmental_weight,
                settings.esg_social_weight,
                settings.esg_governance_weight,
            )
            if any(weight < 0 for weight in weights):
                raise ValidationError(_("ESG scoring weights cannot be negative."))
            total = sum(weights)
            if float_compare(total, 100.0, precision_digits=2) != 0:
                raise ValidationError(
                    _("Environmental, Social, and Governance weights must total 100%.")
                )

    def set_values(self):
        self._check_esg_weighting()
        return super().set_values()

    @api.model
    def get_esg_configuration(self):
        params = self.env["ir.config_parameter"].sudo()

        def get_float(key, default):
            raw_value = params.get_param(key, default)
            try:
                return float(raw_value)
            except (TypeError, ValueError):
                return default

        def get_bool(key, default=True):
            raw_value = params.get_param(key, str(default))
            return str(raw_value).lower() in {"1", "true", "yes", "on"}

        return {
            "environmental_weight": get_float("ecosphere.environmental_weight", 40.0),
            "social_weight": get_float("ecosphere.social_weight", 30.0),
            "governance_weight": get_float("ecosphere.governance_weight", 30.0),
            "auto_emission_calculation": get_bool(
                "ecosphere.auto_emission_calculation"
            ),
            "evidence_requirement": get_bool("ecosphere.evidence_requirement"),
            "badge_auto_award": get_bool("ecosphere.badge_auto_award"),
            "compliance_email_alerts": get_bool("ecosphere.compliance_email_alerts"),
        }

    @api.model
    def get_overall_esg(self):
        """Aggregate department scores into an organisation-wide ESG summary
        using the configured Environmental/Social/Governance weights."""
        departments = self.env["esg.department"].search([])
        if not departments:
            return {"environmental": 0, "social": 0, "governance": 0, "overall": 0}
        env = sum(departments.mapped("environmental_score")) / len(departments)
        social = sum(departments.mapped("social_score")) / len(departments)
        gov = sum(departments.mapped("governance_score")) / len(departments)
        config = self.get_esg_configuration()
        ew, sw, gw = (
            config["environmental_weight"],
            config["social_weight"],
            config["governance_weight"],
        )
        total = (ew + sw + gw) or 100.0
        overall = (env * ew + social * sw + gov * gw) / total
        return {
            "environmental": round(env, 1),
            "social": round(social, 1),
            "governance": round(gov, 1),
            "overall": round(overall, 1),
        }

