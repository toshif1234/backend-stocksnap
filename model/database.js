const  config = {
    user:  'root', // sql user
    password:  '', //sql user password
    server:  '127.0.0.1', // if it does not work try- localhost
    database:  'stock_take',
    options: {
      trustedconnection:  true,
      enableArithAbort:  true,
      instancename:  'SQLEXPRESS'  // SQL Server instance name
    },
    port:  3306
  }

  module.exports = config;