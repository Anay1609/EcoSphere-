{
    "name": "EcoSphere ESG Management",
    "summary": "ESG management integrated into ERP operations",
    "version": "18.0.1.0.0",
    "category": "Sustainability/ESG",
    "author": "Odoo Hackathon 2026",
    "license": "LGPL-3",
    "depends": ["base", "hr", "mail"],
    "data": [
        "security/esg_security.xml",
        "security/ir.model.access.csv",
        "data/esg_config_defaults.xml",
        "data/esg_demo.xml",
        "views/esg_department_views.xml",
        "views/esg_category_views.xml",
        "views/esg_emission_factor_views.xml",
        "views/esg_carbon_transaction_views.xml",
        "views/esg_dashboard.xml",
        "views/res_config_settings_views.xml",
        "views/esg_menus.xml",
        "views/assets_backend.xml"
    ],
    "demo": [],
    "application": True,
    "installable": True,
}

