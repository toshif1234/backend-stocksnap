const express = require('express');
const router = express.Router();
const app = express();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('./bin.service');
const multer = require('multer');
const csv = require('csv-parser'); 
const fs = require('fs');



const upload = multer({ dest: './bin/meta_csv/' });  
  
router.post('/imports', upload.single('file'), (req, res) => {  
    const file = req.file;  
    const orgId = req.body.org_id;  
    const warehouse = req.body.warehouse;  
    if(orgId=='' || warehouse==''){
        return res.json({ message: 'Select Warehouse' });
    }
    const csvData = [];  
    fs.createReadStream('./bin/meta_csv/'+file.filename)  
     .pipe(csv())  
     .on('data', (row) => {  
      csvData.push({  
        ...row,  
        org_id: orgId,  
        warehouse: warehouse,  
      });  
     })  
     .on('end', async () => {  
        console.log(csvData)
      const msg = await addrowwise(csvData);  
      res.json({ message: msg.message });  
     });  
  
});
async function addrowwise(csvData) {  
    const results = [];  
    
    // Process each row in the CSV  
    for (const row of csvData) {  
     try {  
      const result = await userService.create(row); // Use the existing create function to add to the database 
      if (result.message) {  
        return {message : result.message};  
      } else {  
        results.push(row);  
      }   
     } catch (error) {  
      console.error(`Error adding entry: ${error}`);  
     }  
    }  
    console.log('CSV import completed.');  
    return results;  
  }

 

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);
router.delete('/', delete_byid);
// router.post('/importcsv', importCSVfile, upload.single('csvFile'));
// router.post('/import', importCSV);
router.post('/warehouseCount', warehouseCount);

module.exports = router;

// route functions
// function importCSV(req, res, next) {
//     userService.importCSV('./bin/meta_csv/sample.csv')
//         .then(bin => res.json(bin))
//         .catch(next);
// }


function getAll(req, res, next) {
    console.log(req.query)
    // console.log(req.body.warehouse)
    userService.getAll(req.query.org_id,req.query.warehouse)
        .then(bin => res.json(bin))
        .catch(next);
}

function delete_byid(req, res, next) {
    const ids = req.body.ids; 
    console.log(ids)
    // console.log(req.body.warehouse)
    userService.delete_byid(ids)
        .then(bin => res.json(bin))
        .catch(next);
}

function warehouseCount(req, res, next) {
    userService.warehouseCount(req.query.org_id)
        .then(bin => res.json(bin))
        .catch(next);
}


function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(bin => res.json(bin))
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Bin created' }))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Bin updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'Bin deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        org_id: Joi.string().required(),
        warehouse: Joi.string().required(),
        bin_id: Joi.string().required(),
        storage_type: Joi.string().required(),
        storage_sec: Joi.string().required(),
        stock_type: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        org_id: Joi.string().empty(''),
        warehouse: Joi.string().empty(''),
        bin_id: Joi.string().empty(''),
        storage_type: Joi.string().empty(''),
        storage_sec: Joi.string().empty(''),
        stock_type: Joi.string().empty(''),
    });
    validateRequest(req, next, schema);
}