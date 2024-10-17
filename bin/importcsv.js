const csvtojson = require('csvtojson'); 
const mysql = require('mysql2/promise');


const fileName = "./meta_csv/sample.csv"; 
  
csvtojson().fromFile(fileName).then(source => { 
  
    // Fetching the data from each row  
    // and inserting to the table "sample" 
    for (var i = 0; i < source.length; i++) { 
        var org_id = source[i]["org_id"], 
        warehouse = source[i]["warehouse"], 
            bin_id = source[i]["bin_id"], 
            storahe_type = source[i]["storahe_type"] ,
            storahe_sec = source[i]["storahe_sec"] 
  
        var insertStatement =  
        `INSERT INTO bins values(?, ?, ?, ?)`; 
        var items = [org_id, warehouse, bin_id, storahe_type, storahe_sec]; 
  
        // Inserting data of current row 
        // into database 
        con.query(insertStatement, items,  
            (err, results, fields) => { 
            if (err) { 
                console.log( 
    "Unable to insert item at row ", i + 1); 
                return console.log(err); 
            } 
        }); 
    } 
    console.log( 
"All items stored into database successfully"); 
}); 