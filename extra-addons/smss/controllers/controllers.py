from odoo import http
from odoo.http import request

class Tasks(http.Controller):

    @http.route('/api/tasks/getAll', type="json", auth="public", csrf=True, cors='*')
    def list(self):
        tasks_rec = request.env['project.task'].sudo().search([])
        tasks = []
        for rec in tasks_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
                'project': rec.project_id.name,
                'user': rec.user_id.name,
                'stage_id': rec.stage_id,
                'stage': rec.stage_id.name,
                'kanban_state': rec.kanban_state_label,
                'description': rec.description,
            }
            tasks.append(vals)
        return {'status': 200, 'response': tasks, 'message': 'Success'}

    @http.route('/api/tasks/getAllProjects', type="json", auth="public", csrf=True, cors='*')
    def listProjects(self):
        tasks_rec = request.env['project.project'].sudo().search([])
        tasks = []
        for rec in tasks_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
            }
            tasks.append(vals)
        return {'status': 200, 'response': tasks, 'message': 'Success'}

    @http.route('/api/tasks/getAllStages', type="json", auth="public", csrf=True, cors='*')
    def listStages(self):
        tasks_rec = request.env['project.task.type'].sudo().search([])
        tasks = []
        for rec in tasks_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
            }
            tasks.append(vals)
        return {'status': 200, 'response': tasks, 'message': 'Success'}

    @http.route('/api/tasks/getAllUsers', type="json", auth="public", csrf=True, cors='*')
    def listUsers(self):
        tasks_rec = request.env['res.users'].sudo().search([])
        tasks = []
        for rec in tasks_rec:
            vals = {
                'id': rec.id,
                'email': rec.login,
            }
            tasks.append(vals)
        return {'status': 200, 'response': tasks, 'message': 'Success'}

    @http.route('/api/tasks/get/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def listOne(self, rec_id):
        model_to_get = request.env['project.task']
        rec = model_to_get.browse(rec_id).sudo().ensure_one()
        val = {
            'id': rec.id,
            'name': rec.name,
            'project': rec.project_id.name,
            'user': rec.user_id.name,
            'stage_id': rec.stage_id,
            'stage': rec.stage_id.name,
            'status': rec.kanban_state_label,
            'description': rec.description,
        }
        data = {'status': 200, 'response': val, 'message': 'Success'}
        return data
    
    @http.route('/api/tasks/findByTask', type="json", auth="public", csrf=True, cors='*')
    def findByTask(self, **kw):
        data = kw["data"]
        reg_exp = '%' + data['name'] + '%'
        tasks_rec = request.env['project.task'].sudo().search([('name', '=ilike', reg_exp)])
        tasks = []
        for rec in tasks_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
                'project': rec.project_id.name,
                'user': rec.user_id.name,
                'stage_id': rec.stage_id,
                'stage': rec.stage_id.name,
                'status': rec.kanban_state_label,
                'description': rec.description,
            }
            tasks.append(vals)
        return {'status': 200, 'response': tasks, 'message': 'Success'}

    @http.route('/api/tasks/create', type='json', auth='public', csrf=True, cors='*')
    def create(self, **kw):
        data = kw["data"]
        model_to_post = request.env["project.task"]
        record = model_to_post.sudo().create(data)
        return record.id
    
    @http.route('/api/tasks/update/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def update(self, rec_id, **kw):
        data = kw["data"]
        model_to_put = request.env["project.task"]
        rec = model_to_put.browse(rec_id).sudo().ensure_one()
        record = rec.write(data)
        data = {'status': 200, 'response': record, 'message': 'Success'}
        return data

    @http.route('/api/tasks/remove/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def delete(self, rec_id):
        model_to_del_rec = request.env["project.task"]
        rec = model_to_del_rec.browse(rec_id).sudo().ensure_one()
        is_deleted = rec.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data

    @http.route('/api/tasks/removeAll', type='json', auth='public', csrf=True, cors='*')
    def deleteAll(self):
        model_to_del = request.env["project.task"].sudo()
        
        # .with_context(active_test=False) to also find inactive records.
        all_tasks = model_to_del.with_context(active_test=False).search([])
        is_deleted = all_tasks.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data
