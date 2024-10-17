const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const nodemailer = require('nodemailer');


module.exports = {
  create,
  update,
};

async function create(org_id, warehouse, tags) {  
  // validate  
  // console.log(org_id)  
  // console.log(warehouse)  
  // console.log(formData)  
  // console.log(checkedFields)  
  const dataToSave = Object.keys(tags).map(key => ({  
   org_id: org_id,  
   warehouse: warehouse,  
   uom: tags[key]// or whatever status you want to set  
  }));  
  
  if (await db.uom.count({ where: {  
   org_id: org_id,  
   warehouse: warehouse,  
  } })>0) {  
   return db.uom.destroy({   
    where: {   
     org_id: org_id,   
     warehouse: warehouse   
    }   
   })   
   .then(() => {   
    return db.uom.bulkCreate(dataToSave)   
    .then(() => {   
      return { message: 'Data saved successfully' };   
    })   
    .catch(error => {   
      console.error(error);   
      return { message: 'Error saving data' };   
    });  
   })   
   .catch(error => {   
    console.error(error);   
    return { message: 'Error deleting data' };   
   });  
  }else{  
  
  return db.uom.bulkCreate(dataToSave)   
  .then(() => {   
   return { message: 'Data saved successfully' };   
  })   
  .catch(error => {   
   console.error(error);   
   return { message: 'Error saving data' };   
  });  
  }  
  // hash password  
//  user.password = await bcrypt.hash(params.password, 10);  
  
  // save user  
}


async function update(id, params) {
 

  await uom.save();
}
