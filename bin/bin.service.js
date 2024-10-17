const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const fs = require('fs');
const csv = require('csv-parser');
const { Op } = require('sequelize'); 

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete_byid,
    warehouseCount,
    delete: _delete,
    importCSV
};

async function getAll(org_id,warehouse) {
    if(warehouse=='a'){
        return await db.bin.findAll({  
            where: {  
             org_id: org_id,
            }  
          }); 
    }
    else{
        return await db.bin.findAll({  
            where: {  
             org_id: org_id,
             warehouse: warehouse  
            }  
          }); 
    }
   
}

async function getById(id) {
    return await getBin(id);
}

async function delete_byid(ids) {  
    try {  
     const result = await db.bin.destroy({  
      where: {  
        id: {  
         [Op.in]: ids,  
        },  
      },  
     });  
     console.log(result);  
     return { message: 'Users deleted successfully' };  
    } catch (error) {  
     console.error(error);  
     return { message: 'Error deleting users' };  
    }  
  }

async function create(params) {
    if(params.org_id=='' || params.warehouse=='' || params.bin_id ==''){
        return {message: "error"};
    }
    // validate
    if (await db.bin.findOne({ where: { 
        org_id: params.org_id,
        warehouse: params.warehouse,
        bin_id: params.bin_id
     } })) {
        return {message: 'Bin id:'+params.bin_id+' this data already exiest for '+ params.warehouse + ' warehouse' } ;
    }
    // const domainPart = params.user_id.split('@')[1];
    // const orgName = domainPart.split('.')[0];
    // if(orgName != params.org_id){
    //     throw 'user_id "' + params.user_id + '" does not match with org_id';
    // }

    const user = new db.bin(params);
    

    // save user
    await user.save();
}

async function update(id, params) {
    const user = await getBin(id);

    // validate
    // const usernameChanged = params.username && user.username !== params.username;
    // if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
    //     throw 'Username "' + params.username + '" is already taken';
    // }

    // hash password if it was entered
    // if (params.password) {
    //     params.passwordHash = await bcrypt.hash(params.password, 10);
    // }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(id) {
    const user = await getBin(id);
    await user.destroy();
}

// helper functions


async function warehouseCount(org_id) {
    return await db.bin.count({  
        distinct: true,  
        col: 'warehouse',  
        where: {  
         org_id: org_id  
        }  
      }); 
}


async function importCSV(filePath) {
    const results = [];

    // Read the CSV file
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data ))
        .on('end', async () => {
            // Process each row in the CSV
            for (const row of results) {
                try {
                     await create(row); // Use the existing create function to add to the database
                } catch (error) {
                    console.error(`Error adding entry: ${error}`);
                }
            }
            console.log('CSV import completed.');
        });
}