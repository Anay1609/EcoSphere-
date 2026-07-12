# Phase 1 Walkthrough - Foundation

## Built

- Created a fresh `ecosphere` Odoo addon scaffold with manifest, model package, security, configuration defaults, views, and tests.
- Added `esg.department` with name, code, head, parent hierarchy, computed employee count, and Active/Archived status.
- Added an explicit `hr.employee.esg_department_id` link so ESG department reporting does not silently assume the HR org chart equals the ESG reporting structure.
- Added shared `esg.category` for CSR Activity and Challenge categories.
- Extended `res.config.settings` with ESG score weights and configuration toggles.
- Added four security groups: ESG Admin, ESG Manager, ESG Employee, and ESG Auditor.
- Added base access rights and broad Foundation record rules so all ESG roles can read departments/categories, while only Admin/Manager can maintain Foundation data.
- Added native Odoo navigation anchors for the Stitch-provided global sections and the implemented Settings entries.

## Key Decisions

- Stitch MCP was requested, but no Stitch tool was exposed in this session. I used the user's provided Stitch wireframe notes as the UI reference of record for this phase.
- Standard Odoo menus approximate the persistent sidebar and module top tabs. A global top tab bar would require a web client extension, so the addon currently creates the requested section hierarchy as menu anchors.
- Auto Emission Calculation, Evidence Requirement, Badge Auto-Award, and Compliance Email Alerts default to enabled. This supports the hackathon golden path immediately after install while keeping each behavior individually switchable.
- Employee Count is computed from `hr.employee.esg_department_id`, not `hr.employee.department_id`, because the spec defines a separate ESG department hierarchy.

## Manual Verification

- Install the addon and open EcoSphere > Settings > Departments.
- Create parent and child departments and confirm recursive parent assignment is rejected.
- Link an employee to an ESG department and confirm Employee Count updates.
- Open EcoSphere > Settings > Categories and confirm CSR Activity and Challenge categories are maintained in the same model.
- Open EcoSphere > Settings > ESG Configuration and confirm the weights must sum to 100.

