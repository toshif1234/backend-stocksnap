const db = require("_helpers/db");


module.exports = {
  checkLogin,
};



async function checkLogin(params) {
  // validate
  if (!await db.User.findOne({ where: { user_id: params.user_id, org_id: params.org_id, password: params.password } })) {  
    return { success: false, message: 'wrong credentials' };  
  }  
    
  const user = await db.User.findOne({ where: { user_id: params.user_id, org_id: params.org_id, password: params.password } });  
  const role = user.role;  
    
  return { success: true, message: 'Login successful', org_id: params.org_id, user_id: params.user_id, role: role };
   
  }
 


