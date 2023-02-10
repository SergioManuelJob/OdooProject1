# -*- coding: utf-8 -*-
{
    'name': "SMSS",

    'summary': """
        Módulo de empresas SMSS""",

    'description': """
        Gestión de proyectos para una empresa de software
    """,

    'author': "Sergio Manuel Suárez",
    'website': "https://github.com/SergioManuelJob",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'project'],

    # always loaded
    'data': [
        'views/views.xml',
        'views/templates.xml',
        'security/security.xml',
        'security/ir.model.access.csv',
        'reports/business_report.xml',
        'reports/business_report_view.xml',
        'data/project_task_type.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],

    'application': 'True',
}
