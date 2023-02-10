# -*- coding: utf-8 -*-

from odoo import models, fields, api


class business_smss(models.Model):
    _name = 'smss.business'
    _description = 'smss.business'

    name = fields.Char(required=True)
    description = fields.Text(string="Description")
    logo = fields.Binary(string="Logo")
    email = fields.Text(string="Email", required=True)
    telephone = fields.Char(String="Telephone", required=True)
    direction = fields.Text(string="Direction", required=True)
    annualProfit = fields.Integer(string="Annual Profit")
    annualCost = fields.Integer(string="Annual Cost")
    profit = fields.Integer(string="Profit", compute="_profit", store=True)
    projects = fields.One2many("project.project", "business", string="Projects")


    @api.depends('annualProfit','annualCost')
    def _profit(self):
        for r in self:
            if r.annualProfit > 0:
                r.profit = r.annualProfit-r.annualCost

class smss_project(models.Model):
    _name = 'project.project'
    _inherit = 'project.project'

    @api.model
    def create(self, vals):
        project = super(smss_project, self).create(vals)
        task_vals = [{
            'name': 'Análisis',
            'user_id': 2,'create_uid': 2,'write_uid': 2,
            'project_id': project.id,
        }, {
            'name': 'Diagrama E/R',
            'user_id': 2,'create_uid': 2,'write_uid': 2,
            'project_id': project.id,
        }, {
            'name': 'Casos de uso',
            'user_id': 2,'create_uid': 2,'write_uid': 2,
            'project_id': project.id,
        }, {
            'name': 'Mockups',
            'user_id': 2,'create_uid': 2,'write_uid': 2,
            'project_id': project.id,
        }, {
            'name': 'Despliegue',
            'user_id': 2,'create_uid': 2,'write_uid': 2,
            'project_id': project.id,
        }, {
            'name': 'Manual de usuario',
            'user_id': 2,'create_uid': 2,'write_uid': 2,
            'project_id': project.id,
        }]
        self.env['project.task'].create(task_vals)
        return project

    def _get_default(self):
        ids = self.env["project.task.type"].search([("active", "=", True)])
        return ids
    
    type_ids = fields.Many2many(default=lambda self: self._get_default())

    # def _get_default_type_common(self):
    #     ids = self.env["project.task.type"].search([("active", "=", True)])
    #     return ids
    
    # type_ids = fields.Many2many(default=lambda self: self._get_default_type_common())

    business = fields.Many2one('smss.business', string="Business", ondelete="cascade")

class smss_tasks(models.Model):
    _name = 'project.task'
    _inherit = 'project.task'
    kanban_state = fields.Selection([
        ('normal', 'In Progress'),
        ('done', 'Ready'),
        ('blocked', 'Blocked'),
        ('unassigned', 'Not Assigned'),
        ('delayed','Delayed')], string='Kanban State',
        copy=False, default='normal', required=True)


class smss_tasks_type(models.Model):
    _name = 'project.task.type'
    _inherit = 'project.task.type'

    name = fields.Char(string="Name", required=True)
    legend_unassigned = fields.Char(
        'Kanban Label', default=lambda s:('Not Assigned'), translate=True, required=True,
        help='Override the default value displayed for the blocked state for kanban selection, when the task or issue is in that stage.')
    legend_delayed = fields.Char(
        'Kanban Label', default=lambda s:('Delayed'), translate=True, required=True,
        help='Override the default value displayed for the blocked state for kanban selection, when the task or issue is in that stage.')