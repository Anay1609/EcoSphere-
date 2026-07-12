from odoo.exceptions import ValidationError
from odoo.tests.common import SavepointCase, tagged


@tagged("post_install", "-at_install")
class TestEcoSphereFoundation(SavepointCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.Department = cls.env["esg.department"]
        cls.Category = cls.env["esg.category"]
        cls.Settings = cls.env["res.config.settings"]
        cls.Employee = cls.env["hr.employee"]

    def test_settings_weights_must_total_100(self):
        with self.assertRaises(ValidationError):
            self.Settings.create(
                {
                    "esg_environmental_weight": 50,
                    "esg_social_weight": 25,
                    "esg_governance_weight": 20,
                }
            )

    def test_department_employee_count_uses_esg_department_link(self):
        department = self.Department.create({"name": "Sustainability", "code": "SUS"})
        self.Employee.create(
            {"name": "EcoSphere Analyst", "esg_department_id": department.id}
        )

        department.invalidate_recordset(["employee_count"])
        self.assertEqual(department.employee_count, 1)

    def test_department_hierarchy_rejects_cycles(self):
        parent = self.Department.create({"name": "Parent", "code": "PAR"})
        child = self.Department.create(
            {"name": "Child", "code": "CHD", "parent_id": parent.id}
        )

        with self.assertRaises(ValidationError):
            parent.parent_id = child

