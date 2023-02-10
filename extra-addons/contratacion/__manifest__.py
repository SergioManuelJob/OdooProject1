# -*- coding: utf-8 -*-
{
    'name': "Contratacion",

    'summary': """
        Módulo para organizar proyectos encargados de empresas""",

    'description': """
        Long description of module's purpose
    """,

    'author': "Jordan",
    'website': "https://github.com/JordanJTY",

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
        'reports/contratacion_report.xml',
        'reports/contratacion_report_view.xml',
        'security/contratacion_reglas_registro.xml',
        'data/tags_data.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],

    'application': 'True',
}

