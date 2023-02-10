# -*- coding: utf-8 -*-
from odoo import http
from odoo.http import request


class Contratacion(http.Controller):

    @http.route('/api/contratacion/getAll', type="json", auth="public", csrf=True, cors='*')
    def list(self):
        contratacion_rec = request.env['contratacion.contratacion'].sudo().search([])
        contratacion = []
        for rec in contratacion_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
                'imagen': rec.imagen,
                'email': rec.email,
                'contacto': rec.contacto,
                'telefono': rec.telefono,
                'ingresoAnual': rec.ingresoAnual,
                'gastoAnual': rec.gastoAnual,
                'beneficio': rec.beneficio,
            }
            contratacion.append(vals)
        return {'status': 200, 'response': contratacion, 'message': 'Success'}

    @http.route('/api/contratacion/get/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def listOne(self, rec_id):
        model_to_get = request.env['contratacion.contratacion']
        rec = model_to_get.browse(rec_id).sudo().ensure_one()
        val = {
                'id': rec.id,
                'name': rec.name,
                'imagen': rec.imagen,
                'email': rec.email,
                'contacto': rec.contacto,
                'telefono': rec.telefono,
                'ingresoAnual': rec.ingresoAnual,
                'gastoAnual': rec.gastoAnual,
                'beneficio': rec.beneficio,
        }
        data = {'status': 200, 'response': val, 'message': 'Success'}
        return data
    
    @http.route('/api/contratacion/findByName', type="json", auth="public", csrf=True, cors='*')
    def findByName(self, **kw):
        data = kw["data"]
        reg_exp = '%' + data['name'] + '%'
        contratacion_rec = request.env['contratacion.contratacion'].sudo().search([('name', '=ilike', reg_exp)])
        contratacion = []
        for rec in contratacion_rec:
            vals = {
                'id': rec.id,
                'name': rec.name,
                'imagen': rec.imagen,
                'email': rec.email,
                'contacto': rec.contacto,
                'telefono': rec.telefono,
                'ingresoAnual': rec.ingresoAnual,
                'gastoAnual': rec.gastoAnual,
                'beneficio': rec.beneficio,
            }
            contratacion.append(vals)
        return {'status': 200, 'response': contratacion, 'message': 'Success'}

    @http.route('/api/contratacion/create', type='json', auth='public', csrf=True, cors='*')
    def create(self, **kw):
        data = kw["data"]
        model_to_post = request.env["contratacion.contratacion"]
        record = model_to_post.sudo().create(data)
        return record.id
    
    @http.route('/api/contratacion/update/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def update(self, rec_id, **kw):
        data = kw["data"]
        model_to_put = request.env["contratacion.contratacion"]
        rec = model_to_put.browse(rec_id).sudo().ensure_one()
        record = rec.write(data)
        data = {'status': 200, 'response': record, 'message': 'Success'}
        return data

    @http.route('/api/contratacion/remove/<int:rec_id>', type='json', auth='public', csrf=True, cors='*')
    def delete(self, rec_id):
        model_to_del_rec = request.env["contratacion.contratacion"]
        rec = model_to_del_rec.browse(rec_id).sudo().ensure_one()
        is_deleted = rec.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data

    @http.route('/api/contratacion/removeAll', type='json', auth='public', csrf=True, cors='*')
    def deleteAll(self):
        model_to_del = request.env["contratacion.contratacion"].sudo()
        
        # .with_context(active_test=False) to also find inactive records.
        all_bicycles = model_to_del.with_context(active_test=False).search([])
        is_deleted = all_bicycles.unlink()
        res = {
            "result": is_deleted
        }
        data = {'status': 200, 'response': res, 'message': 'Success'}
        return data