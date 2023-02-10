# -*- coding: utf-8 -*-

from odoo import models, fields, api


class contratacion(models.Model):
    _name = 'contratacion.contratacion'
    _description = 'contratacion.contratacion'
    
    empresa = fields.Char()
    name = fields.Char(string="Nombre")
    imagen = fields.Binary(string="Logo de la empresa")
    email = fields.Char(string="Email")
    contacto = fields.Char(string="Contacto")
    telefono = fields.Char(string="Teléfono")
    ingresoAnual = fields.Integer(string="Ingreso anual")
    gastoAnual = fields.Integer(string="Gasto anual")
    beneficio = fields.Integer(string="Beneficio", compute="_beneficio", store=True)
    project = fields.One2many("project.project", "empresas" ,string="Proyectos")

    @api.depends('ingresoAnual', 'gastoAnual')
    def _beneficio(self):
        for r in self:
            if r.ingresoAnual > 0:
                r.beneficio = r.ingresoAnual-r.gastoAnual

class contratacion_proyecto(models.Model):
    _name = 'project.project'
    _inherit = 'project.project'

    empresas = fields.Many2one("contratacion.contratacion", string="Empresa", ondelete="cascade")

class contratacion_tareas(models.Model):
    _name = 'project.task'
    _inherit = 'project.task'
