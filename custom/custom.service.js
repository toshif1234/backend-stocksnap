const bcrypt = require("bcryptjs");
const db = require("_helpers/db");
const nodemailer = require('nodemailer');


module.exports = {
  create,
  update,
};

async function create(org_id, warehouse, formData, checkedFields) {  
  // validate  
  // console.log(org_id)  
  // console.log(warehouse)  
  // console.log(formData)  
  // console.log(checkedFields)  
  const dataToSave = Object.keys(formData).map(key => ({  
   org_id: org_id,  
   warehouse: warehouse,  
   field_name: key,  
   edited_name: formData[key],  
   status: checkedFields[key]// or whatever status you want to set  
  }));  
  
  if (await db.custom.count({ where: {  
   org_id: org_id,  
   warehouse: warehouse,  
  } })>0) {  
   return db.custom.destroy({   
    where: {   
     org_id: org_id,   
     warehouse: warehouse   
    }   
   })   
   .then(() => {   
    return db.custom.bulkCreate(dataToSave)   
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
  
  return db.custom.bulkCreate(dataToSave)   
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
 

  await custom.save();
}
