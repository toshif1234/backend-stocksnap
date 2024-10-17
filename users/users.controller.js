const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('./user.service');

// routes

router.get('/', getByOrg_id);
router.get('/warehouse', getWarehouseC);
router.get('/:id', getById);
// router.get('/:org_id', getByOrg_id);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);
router.post('/userCount', userCount);

module.exports = router;

// route functions
function userCount(req, res, next) {
    console.log(req.query.org_id)
    userService.userCount(req.query.org_id)
        .then(bin => res.json(bin))
        .catch(next);
}

function getWarehouseC(req, res, next) {
    console.log(req.query.org_id)
    userService.getWarehouseC(req.query.org_id)
        .then(bin => res.json(bin))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}
function getByOrg_id(req, res, next) {
    // console.log(req.query.org_id)
    userService.getByOrg_id(req.query.org_id)
        .then(user => res.json(user))
        .catch(next);
}
function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

function update(req, res, next) {
    console.log(req.body)
    console.log(req.params.id)
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        org_id: Joi.string().required(),
        warehouse: Joi.string().required(),
        email: Joi.string().required(),
        user_id: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.Operator, Role.Manager).required(),
        status: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        org_id: Joi.string().empty(''),
        warehouse: Joi.string().empty(''),
        email: Joi.string().empty(''),
        user_id: Joi.string().empty(''),
        password: Joi.string().empty(''),
        role: Joi.string().valid(Role.Admin, Role.Operator, Role.Manager).empty(''),
        status: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}