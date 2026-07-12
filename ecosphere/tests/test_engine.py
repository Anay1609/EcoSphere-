from odoo.tests.common import SavepointCase, tagged


@tagged("post_install", "-at_install")
class TestEcoSphereEngine(SavepointCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.Factor = cls.env["esg.emission.factor"]
        cls.Transaction = cls.env["esg.carbon.transaction"]
        cls.Department = cls.env["esg.department"]
        cls.Settings = cls.env["res.config.settings"]

        cls.factor = cls.Factor.create(
            {
                "name": "Diesel Fleet Fuel",
                "activity_type": "fleet",
                "unit": "liter",
                "co2e_per_unit": 2.68,
            }
        )
        cls.department = cls.Department.create(
            {
                "name": "Fleet",
                "code": "FLT",
                "target_co2": 70,
                "environmental_score": 73,
                "social_score": 70,
                "governance_score": 76,
            }
        )

    def test_co2e_is_computed_from_factor(self):
        txn = self.Transaction.create(
            {
                "department_id": self.department.id,
                "factor_id": self.factor.id,
                "quantity": 100,
            }
        )
        self.assertEqual(txn.co2e, 268.0)
        self.assertTrue(txn.name and txn.name != "New")

    def test_generate_from_purchase_golden_path(self):
        txn = self.Transaction.generate_from_purchase(
            "Purchase PO00099",
            self.department.id,
            self.factor.id,
            quantity=50,
        )
        self.assertEqual(txn.co2e, 134.0)
        self.assertEqual(txn.source_document, "Purchase PO00099")

    def test_department_current_co2_aggregates_transactions(self):
        self.Transaction.create(
            {
                "department_id": self.department.id,
                "factor_id": self.factor.id,
                "quantity": 100,
            }
        )
        self.department.invalidate_recordset(["current_co2"])
        self.assertEqual(self.department.current_co2, 268.0)

    def test_overall_esg_uses_configured_weights(self):
        self.Settings.create(
            {
                "esg_environmental_weight": 40,
                "esg_social_weight": 30,
                "esg_governance_weight": 30,
            }
        ).set_values()
        summary = self.Settings.get_overall_esg()
        expected = 73 * 0.4 + 70 * 0.3 + 76 * 0.3
        self.assertAlmostEqual(summary["overall"], round(expected, 1), places=1)
