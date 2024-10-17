const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('./uom.service');

// routes

router.get('/', getByOrg_id);
router.post('/',  create);
router.put('/:id', updateSchema, update);

module.exports = router;

function create(req, res, next) {
    console.log(req.body.params.tags)
    userService.create(req.body.params.org_id,req.body.params.warehouse,req.body.params.tags)
        .then((result) => res.json({message: result.message }))
        .catch(next);
}

function update(req, res, next) {
    console.log(req.body)
    console.log(req.params.id)
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}
// route functions
function getByOrg_id(req, res, next) {
    console.log(req.query.org_id)
    userService.userCount(req.query.org_id)
        .then(bin => res.json(bin))
        .catch(next);
}


function createSchema(req, res, next) {
    const schema = Joi.object({
        org_id: Joi.string().required(),
        warehouse: Joi.string().required(),
        field_name: Joi.string(),
        edited_name: Joi.string(),
        status: Joi.string(),
        version: Joi.string(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        org_id: Joi.string().empty(''),
        warehouse: Joi.string().empty(''),
        field_name: Joi.string().empty(''),
        edited_name: Joi.string().empty(''),
        status: Joi.string().empty(''),
        version: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}