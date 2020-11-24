
const mysql = require('mysql');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const port = 5000;
const app=express();
const schedule = require('node-schedule');




app.use(bodyParser.json());

app.use(cors());

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept");
  next();
});


// let mysqlConnection2 = mysql.createConnection({
//   host: '172.17.96.154',
//   user:'root',
//   password: 'root',
//   database: 'sam',
//   multipleStatements: true

// })

let db_config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sam2',
  multipleStatements: true
}

let mysqlConnection2

function handleDisconnect() {
  mysqlConnection2 = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  mysqlConnection2.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
  localhost = 'http://10.207.54.204:5000/'
  console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }
    else{
      console.log('Database Connected!');
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  mysqlConnection2.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();


function afterDelete(id){
  let sql = `delete from notifications where license_id = ${id}`;
  mysqlConnection2.query(sql,(err,rows,fields)=>{
    if(!err){
      console.log('Data deleted Successfully!');
    }
    else{
      console.log('There is no such license');
    }
})
}


function checkExpiry() {
//   let truncate = `truncate table notifications`;
//   mysqlConnection2.query(truncate,(err,rows,fields)=>{
//     if(!err){
//       console.log('Data Removed Successfully!');
//     }
//     else{
//       console.log(err);
//     }
// })
  let sql = `insert ignore into notifications (
    license_name, license_expiry_date, difference, license_id
  )
  select license_name, license_expiry_date, DATEDIFF(license_expiry_date, NOW()) as difference, license_id from license 
  where DATEDIFF(license_expiry_date, NOW()) between -1 and 30`;
  mysqlConnection2.query(sql,(err,rows,fields)=>{
              if(!err){
                console.log('Data inserted Successfully!');
              }
              else{
                console.log(err);
              }
  })

}

// var j = schedule.scheduleJob('00 00 * * * *', function(){
//   checkExpiry();
//   // let sql = `insert ignore into notifications ( license_name, license_expiry_date, difference, license_id )
//   // select license_name, license_expiry_date, DATEDIFF(license_expiry_date, NOW()) as difference, license_id from license 
//   // where DATEDIFF(license_expiry_date, NOW()) between -1 and 30`;
//   // mysqlConnection2.query(sql,(err,rows,fields)=>{
//   //             if(!err){
//   //               console.log('Data inserted Successfully!');
//   //             }
//   //             else{
//   //               console.log(err);
//   //             }
//   // })
// });

var k = schedule.scheduleJob('00 00 * * * *', function(){
  let sql = `select license_name, license_id, license_expiry_date from license where license_expiry_date = curdate();`;
  mysqlConnection2.query(sql,(err,rows,fields)=>{
              if(!err){
                const licenses = rows;
              }
              else{
                console.log(err);
              }
  })

  let sql2 = `update license 
  set active_status = 0 where license_expiry_date = subdate(current_date, 1);
  ;`;
              mysqlConnection2.query(sql2,(err,rows,fields)=>{
                if(!err){
                  console.log('license has been expired');
                }
                else{
                  console.log(err);
                }
    
    })
    checkExpiry();
});

function afterRenew(id){
  let diff = 0;
  let sql = `select DATEDIFF(license_Expiry_date, NOW()) as differnece from license where license_id = ${id};`;
  let sql2 = `delete from notifications where license_id = ${id};`;
  mysqlConnection2.query(sql,(err,rows,fields)=>{
    if(!err){
      diff = rows;
      console.log(diff);
    }
    else{
      console.log(err);
    }
})
mysqlConnection2.query(sql2,(err,rows,fields)=>{
  if(!err){
    console.log('license has been removed from notification table');
  }
  else{
    console.log(err);
  }

});
if(diff < 31){
  checkExpiry();
}

}
















// mysqlConnection2.connect((err)=>{
//   if(!err){
//     console.log('DB connection successful!');
//   }
//   else{
//     console.log('Db Connection Failed : ' + JSON.stringify(err,undefined,2));
//   }
// })




app.get('/api/stypes', (req,res)=>{
  mysqlConnection2.query('Select * from SType',(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
})

app.get('/api/subtypes', (req,res)=>{
  mysqlConnection2.query('Select * from SubType',(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
})

app.get('/api/scategory', (req,res)=>{
  mysqlConnection2.query('Select * from SCategory',(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
})



app.get('/api/softwares', (req,res)=>{
  mysqlConnection2.query(`select s.Software_ID as sid, s.Software_Name as sname, s.Publisher_Name,s.ptype, s.compliant, l.License_Name, l.available_count, l.allocated_license, lt.Ltype_Name,
  st.SType_Name, su.SubType_Name, sc.SCategory_Name 
  from software s
  left outer join license l on s.Software_ID = l.Software_ID
  left outer join ltype lt on l.Ltype_ID = lt.Ltype_ID
  left outer join stype st on s.Stype_ID = st.Stype_ID
  left outer join subtype su on s.Subtype_ID = su.Subtype_ID
  left outer join scategory sc on s.SCategory_ID = sc.SCategory_ID
  group by sid
  union all
  select ss.Software_Suite_ID as sid, ss.Software_Suite_Name as sname, ss.Publisher_Name, ss.ptype,  ss.compliant, l.License_Name, l.available_count, l.allocated_license, lt.Ltype_Name,
  st.Stype_Name, su.SubType_Name, sc.SCategory_Name
  from software_suite ss
  left outer join license l on ss.Software_Suite_ID = l.Software_Suite_ID
  left outer join ltype lt on l.Ltype_ID = lt.Ltype_ID
  left outer join stype st on ss.Stype_ID = st.Stype_ID
  left outer join subtype su on ss.Subtype_ID = su.Subtype_ID
  left outer join scategory sc on ss.SCategory_ID = sc.SCategory_ID
  group by sid;
  ;
 `,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
});

app.get('/api/alloc', (req,res)=>{
  mysqlConnection2.query('select allocation.Alloc_Id ,user.User_Name, workstation.Work_Name, user.Server_Name,user.Email_ID, user.Phone_number from workstation,user, allocation where  allocation.User_ID = user.User_ID AND workstation.work_ID = user.work_ID;',(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
});


app.get('/api/User', (req,res)=>{
  mysqlConnection2.query('select user.User_ID ,user.User_Name, workstation.Work_Name, user.Email_ID, user.Phone_number from workstation,user where workstation.work_ID = user.work_ID;',(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
});

app.get('/api/Workstn', (req,res)=>{
  mysqlConnection2.query('select workstation.work_ID,workstation.Work_Name,workstation.Server_Name,user.User_Name,workstation.no_of_instal,workstation.licen_no_instal,workstation.unlicen_no_instal from user,workstation where workstation.work_ID = user.work_ID; ',(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
});
app.get('/api/instal', (req,res)=>{
  mysqlConnection2.query('select installation.installation_ID, workstation.Work_Name, user.User_Name,  license.License_Key,ltype.Ltype_Name,license.License_Name from user, workstation,license,ltype,installation where installation.work_ID = workstation.work_ID And installation.User_ID= user.User_ID and license.Ltype_ID=ltype.Ltype_ID And installation.License_ID= license.License_ID ;',(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
});
app.get('/api/history', (req,res)=>{
  let sql = `select h.install_status, h.History_ID, h.Discovered, w.Work_Name, u.User_Name 
  from history h
  inner join  user u on h.User_ID = u.User_ID
  inner join  workstation w on h.work_ID = w.work_ID;
  `;
  mysqlConnection2.query(sql,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
});


app.get('/api/slhistory/:id', (req,res)=>{
  let sql = `select l.license_name, l.license_expiry_date,  
  where software_id = ${id};
  `;
  mysqlConnection2.query(sql,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
});

app.get('/api/sslhistory/:id', (req,res)=>{
  let sql = `select license_name, license_expiry_date, issue_date, uninstallation_status from ssexpiredlicense 
  where software_suite_id = ${id};
  `;
  mysqlConnection2.query(sql,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
});






app.get('/api/ssoft/:id', (req, res) => {
  let id = req.params.id;
  mysqlConnection2.query(
    `select s.Software_ID, s.Software_Name, s.Publisher_Name, s.Manufacturer_Name, s.Software_Version, s.installations, s.Installation_Date,
  st.SType_Name, su.SubType_Name, sc.SCategory_Name 
  from software s
  left outer join stype st on s.Stype_ID = st.Stype_ID
  left outer join subtype su on s.Subtype_ID = su.Subtype_ID
  left outer join scategory sc on s.SCategory_ID = sc.SCategory_ID
  where s.Software_ID = ?;`,
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.get('/api/ssuite/:id', (req, res) => {
  let id = req.params.id;
  mysqlConnection2.query(
    `select ss.Software_suite_ID, ss.Software_Suite_Name, ss.Publisher_Name, ss.Manufacturer_Name, ss.Software_Suite_Version, ss.installations, ss.Installation_Date,
  st.SType_Name, su.SubType_Name, sc.SCategory_Name 
  from software_suite ss
  left outer join stype st on ss.Stype_ID = st.Stype_ID
  left outer join subtype su on ss.Subtype_ID = su.Subtype_ID
  left outer join scategory sc on ss.SCategory_ID = sc.SCategory_ID
  where ss.Software_suite_ID = ${id};`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.get('/api/slicense/:id',(req,res)=>{
  let id = req.params.id;
  mysqlConnection2.query(`select l.License_ID, l.Software_ID, s.Software_Name, s.Software_Version, l.Software_Suite_ID, s.Software_ID, l.License_Name, l.License_Key, l.Manufacturer_Name,
  l.Purchase_Cost, l.Available_Count, l.Vendor_Name, lt.Ltype_Name from license l, Ltype lt, software s
  where l.Ltype_ID = lt.Ltype_ID and l.Software_ID = s.Software_ID and l.License_ID = ${id};`,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
  
})



app.get('/api/sslicense/:id',(req,res)=>{
  let id = req.params.id;
  mysqlConnection2.query(`select l.License_ID, l.Software_Suite_ID, ss.Software_Suite_Name, ss.Software_Suite_Version, l.Software_Suite_ID, l.License_Name, l.License_Key, l.Manufacturer_Name,
  l.Purchase_Cost, l.Available_Count, l.Vendor_Name, lt.Ltype_Name from license l, Ltype lt, software_suite ss
  where l.Ltype_ID = lt.Ltype_ID and l.Software_Suite_ID = ss.Software_Suite_ID and l.License_ID = ${id};`,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })

})


app.get('/api/singlesoft/:id',(req,res)=>{
  let id = req.params.id;
 
  mysqlConnection2.query(`select * from software where software_ID = ${id};`,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
})


app.get('/api/singlesuite/:id',(req,res)=>{
  let id = req.params.id;
  mysqlConnection2.query(`select * from software_suite where Software_Suite_ID = ${id};`,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
})




app.get('/api/license', (req,res)=>{
    mysqlConnection2.query('Select License.License_ID, ltype.Ltype_Name, ltype.Ltype_ID, License.License_Name, License.License_Key, License.available_count, License.allocated_license  from License,ltype where License.Ltype_ID = ltype.Ltype_ID;',(err,rows,fields)=>{
      if(!err){
        res.send(rows);
      }
      else{
        console.log(err);
      }
    })
});


app.get('/api/lilist/:id',(req,res)=>{
  let id = req.params.id;
  mysqlConnection2.query('Select License.License_ID, License.License_Name, Ltype.Ltype_Name, License.License_Key, License.active_status, License.License_Expiry_date from License,Ltype where Ltype.Ltype_ID=License.Ltype_ID AND License.Software_ID = ?;',[id],(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
})

app.get('/api/sulist/:id',(req,res)=>{
  let id = req.params.id;
  mysqlConnection2.query('Select License.License_ID, License.License_Name, Ltype.Ltype_Name, License.License_Key, License.active_status from License,Ltype where Ltype.Ltype_ID=License.Ltype_ID AND License.Software_Suite_ID = ?;',[id],(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
})





app.get('/api/locationtype1', (req,res)=>{
  mysqlConnection2.query('Select * from Locationtype',(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
});


app.get('/api/licensetype1', (req,res)=>{
  mysqlConnection2.query('Select * from ltype',(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
});


app.get('/api/singlelicense/:id', (req,res)=>{
  let id = req.params.id;
  mysqlConnection2.query('Select * from license where License_ID=?',[id],(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
});

app.get('/api/lastid',(req,res)=>{
  mysqlConnection2.query(`select MAX(Software_ID) as id from software;`,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })

})

app.get('/api/last1id',(req,res)=>{
  mysqlConnection2.query(`select MAX(Software_Suite_ID) as id from software_suite;`,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
})

app.get('/api/publishers',(req,res)=>{
  mysqlConnection2.query(`select distinct Publisher_Name from software;`,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })

})

app.get('/api/totalsoftwares',(req,res)=>{
  mysqlConnection2.query(`select sum(ts.totalsoftwares) from 
  (
    select count(*) as totalsoftwares from software
    UNION ALL
    select count(*) as totalsoftwares from software_suite
  )ts;`,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })

})




app.put('/api/renew/:id',(req,res)=>{
  let id = req.params.id;
  let licensedate = req.body.License_Expiry_date;

  mysqlConnection2.query(`UPDATE License SET  License_Expiry_date = ${mysqlConnection2.escape(licensedate)} WHERE License_ID = ${id};`,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
      afterRenew(id);
    }
    else{
      console.log(err);
    }
  })
});

app.put('/api/upgrade/:id', (req, res) => {
  let id = req.params.id;
  let sname = req.body.Product_Name;
  let manufacture = req.body.Manufacturer_Name;
  let publisher = req.body.Publisher_Name;
  let category = req.body.Software_Category;
  let stype = req.body.Software_Type;
  let subtype = req.body.Subtype;
  let version = req.body.Version;
  let installations = req.body.Installations;
  let date = new Date();

  let updatesql = `UPDATE Software SET Software_Name = '${sname}', Manufacturer_Name = '${manufacture}'
  , Publisher_Name = '${publisher}', SCategory_ID = '${category}', SType_ID = ${stype}, SubType_ID = ${subtype},
  Software_Version = ${version}, Installation_Date = ${mysqlConnection2.escape(
    date
  )}, installations = '${installations}' where Software_ID = ${id};`;
  mysqlConnection2.query(updatesql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

app.put('/api/upgradeSuite/:id', (req, res) => {
  let id = req.params.id;
  let sname = req.body.Product_Name;
  let manufacture = req.body.Manufacturer_Name;
  let publisher = req.body.Publisher_Name;
  let category = req.body.Software_Category;
  let stype = req.body.Software_Type;
  let subtype = req.body.Subtype;
  let version = req.body.Version;
  let installations = req.body.Installations;
  let date = new Date();

  let updatesql = `UPDATE Software_Suite SET Software_Suite_Name = '${sname}', Manufacturer_Name = '${manufacture}'
  , Publisher_Name = '${publisher}', SCategory_ID = '${category}', SType_ID = ${stype}, SubType_ID = ${subtype},
  Software_Suite_Version = ${version}, Installation_Date = ${mysqlConnection2.escape(
    date
  )}, installations = '${installations}' where Software_Suite_ID = ${id};`;
  mysqlConnection2.query(updatesql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});



app.put('/api/deletelicense/:id',(req,res)=>{
  let id = req.params.id;
  let value = 0;

  mysqlConnection2.query(`UPDATE License SET active_status = ${value} where License_ID = ${id};`,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
      afterDelete(id);
    }
    else{
      console.log(err);
    }
  })
})


app.post('/api/oldsoftware', (req, res) => {
  let sname = req.body.osname;
  let version = req.body.oversion;
  let oldate = req.body.oinstalldate;
  let date = new Date();
  let sid = req.body.sid;
  let sql = `insert into oldsoftware (oldsoftware_name, oldsoftware_version, Installation_Date, Upgrade_Date, software_ID)
  values ( '${sname}', ${version}, ${mysqlConnection2.escape(oldate)}, ${mysqlConnection2.escape(date)}, ${sid});`;
  mysqlConnection2.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

app.post('/api/oldsuite', (req, res) => {
  let sname = req.body.osname;
  let version = req.body.oversion;
  let date = new Date();
  let sid = req.body.sid;
  let sql = `insert into oldsuite (oldsuite_name, oldsuite_version, Upgrade_Date, software_suite_id)
  values ( '${sname}', ${version}, ${mysqlConnection2.escape(date)}, ${sid});`;
  mysqlConnection2.query(sql, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});






app.post('/api/add',(req,res)=>{
  let name = req.body.Product_Name;
  let type = req.body.Software_Type;
  let subtype = req.body.Subtype;
  let category = req.body.Software_Category;
  let pname = req.body.Publisher_Name;
  let mname = req.body.manufacturer_name
  let version = req.body.Version;
  let desc = req.body.Description;
  let date = new Date();
  
  mysqlConnection2.query(`INSERT INTO Software (Software_Name, Software_Version, Manufacturer_Name, Publisher_Name, SType_ID, SubType_ID, SCategory_ID, SDescription, Installation_Date, ptype, compliant) VALUES ('${name}', '${version}', '${mname}', '${pname}', '${type}', '${subtype}', '${category}', '${desc}', ${mysqlConnection2.escape(date)}, 'software', 'Yes');`, (err,rows)=>{
    if(err) {
      throw err
    }
    else{
      res.status(200).send({"message":"Data Received"});
    }
  })
})

app.post('/api/addSuite',(req,res)=>{
  let name = req.body.suite_name;
  let version = req.body.version;
  let category = req.body.Software_category;
  let mname = req.body.manufacturer_name;
  let pname = req.body.publisher_name;
  let type = req.body.Software_Type;
  let subtype = req.body.Software_subtype;
  let date = new Date();

  mysqlConnection2.query(`INSERT INTO Software_suite (Software_suite_Name, Software_suite_Version, SCategory_ID, Manufacturer_Name, Publisher_Name, SType_ID, SubType_ID, Installation_Date, ptype, compliant) VALUES ('${name}', '${version}', '${category}', '${mname}', '${pname}', '${type}', '${subtype}', ${mysqlConnection2.escape(date)}, 'software_suite', 'Yes');`, (err,rows)=>{
    if(err) {
      throw err
    }
    else{
      res.status(200).send({"message":"Data Received"});
    }
  })
})




app.post('/api/addlicen',(req,res)=>{
  let softid = req.body.id;
  let lname = req.body.license_name;
  let lmanufacture = req.body.manufacturer_name;
  let lkey= req.body.license_key;
  let lvendor = req.body.vendor_name;
  let lissue_date = req.body.picker;
  let lexp = req.body.picker2;
  let lcost = req.body.purchase_cost;
  let lpurc = req.body.department;
  let locid = req.body.allocate_location;
  let ltypeid = req.body.license_type;
  let available_count = req.body.Total_License;
 

  mysqlConnection2.query(`INSERT INTO License (License_Name,License_Key, Vendor_Name,
     Manufacturer_Name, Issue_date, License_Expiry_date,
    Purchase_Cost,Purchase_For,Software_ID,Loc_ID,Ltype_ID,active_status, Available_Count, allocated_license, remaining) values
     ('${lname}', '${lkey}', '${lvendor}', '${lmanufacture}', '${lissue_date}', '${lexp}',
     '${lcost}', '${lpurc}', '${softid}','${locid}','${ltypeid}',1, ${available_count},0, ${available_count});`, (err,rows)=>{
    if(err) {
      throw err
    }
    else{
      res.status(200).send({"message":"Data Received"});
      checkExpiry();
    }
   
  })

})

app.post('/api/addSuitelicen',(req,res)=>{
  let suiteid = req.body.id;
  let lname = req.body.license_name;
  let lmanufacture = req.body.manufacturer_name;
  let lkey= req.body.license_key;
  let lvendor = req.body.vendor_name;
  let lissue_date = req.body.picker;
  let lexp = req.body.picker2;
  let lcost = req.body.purchase_cost;
  let lpurc = req.body.department;
  let locid = req.body.allocate_location;
  let ltypeid = req.body.license_type;
  let available_count = req.body.Total_License;
  mysqlConnection2.query(`INSERT INTO License (License_Name,License_Key, Vendor_Name,
     Manufacturer_Name, Issue_date, License_Expiry_date,
    Purchase_Cost,Purchase_For,Software_Suite_ID,Loc_ID,Ltype_ID,active_status,Available_Count, allocated_license, remaining) values
     ('${lname}', '${lkey}', '${lvendor}', '${lmanufacture}', '${lissue_date}', '${lexp}',
     '${lcost}', '${lpurc}', '${suiteid}','${locid}','${ltypeid}',1, ${available_count},0, ${available_count});`, (err,rows)=>{
    if(err) {
      throw err
    }
    else{
      res.status(200).send({"message":"Data Received"});
      checkExpiry();
    }
   
  })

})


app.get('/api/newsoftware/:id', (req,res)=>{
  let id = req.params.id;
  mysqlConnection2.query(`select * from newsoftware where software_id=${id};`,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
});


app.get('/api/newsuite/:id', (req,res)=>{
  let id = req.params.id;
  mysqlConnection2.query(`select * from newsuite where software_suite_id=${id};`,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
});


app.listen(port,()=>{
  console.log(`Server Started at Port number ${port}`);
});




app.get('/api/reports/', (req,res)=>{
  let sql = `select s.Software_ID , s.Software_Name as Product_Name, s.ptype, s.installations, l.available_count, l.purchase_cost, l.allocated_license, l.remaining, s.Publisher_Name, l.License_Name, lt.Ltype_Name,
  st.SType_Name, su.SubType_Name, sc.SCategory_Name 
  from software s
  left outer join license l on s.Software_ID = l.Software_ID
  left outer join ltype lt on l.Ltype_ID = lt.Ltype_ID
  left outer join stype st on s.Stype_ID = st.Stype_ID
  left outer join subtype su on s.Subtype_ID = su.Subtype_ID
  left outer join scategory sc on s.SCategory_ID = sc.SCategory_ID
  Union all
  select ss.Software_suite_ID , ss.Software_Suite_Name as Product_Name,  ss.ptype, ss.installations, l.available_count, l.purchase_cost, l.allocated_license, l.remaining, ss.Publisher_Name, l.License_Name, lt.Ltype_Name,
  st.SType_Name, su.SubType_Name, sc.SCategory_Name 
  from software_suite ss
  left outer join license l on ss.Software_Suite_ID = l.Software_Suite_ID
  left outer join ltype lt on l.Ltype_ID = lt.Ltype_ID
  left outer join stype st on ss.Stype_ID = st.Stype_ID
  left outer join subtype su on ss.Subtype_ID = su.Subtype_ID
  left outer join scategory sc on ss.SCategory_ID = sc.SCategory_ID;`
  mysqlConnection2.query(sql,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
})


app.get('/api/livsunli',(req,res)=>{
  let sql = `
select s.software_name as sname, s.software_id, s.installation_date, s.installations, l.license_id, l.license_name from software s
left outer join license l on s.software_id = l.software_id 
union all
select ss.software_suite_name as sname, ss.software_suite_id, ss.installation_date, ss.installations, l.license_id, l.license_name from software_suite ss
left outer join license l on ss.software_suite_id = l.software_suite_id  
order by installation_date;`;
mysqlConnection2.query(sql,(err,rows,fields)=>{
  if(!err){
    res.send(rows);
  }
  else{
    console.log(err);
  }
})
})


app.get('/api/notifications',(req,res)=>{
  let sql = `select license_name, license_expiry_date, difference, license_id, read_status from notifications;`;
  mysqlConnection2.query(sql,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
})



app.get('/api/uwi/:id',(req,res)=>{
  let id = req.params.id;
  let sql = `select u.user_name, s.software_id, l.license_name, lt.ltype_name, l.consume_status, ul.license_id, u.email_id, u.phone_number, l.license_key, w.server_name, w.no_of_instal, w.licen_no_instal, w.unlicen_no_instal, w.work_name
  from user u
  join user_license ul on u.user_id = ul.user_id
  join license l on ul.license_id = l.license_id
  join workstation w on u.work_id = w.work_id 
  join software s on l.software_id = s.software_id 
  join ltype lt on l.ltype_id = lt.ltype_id
  where s.software_id = ${id};`;
  mysqlConnection2.query(sql,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
})

app.get('/api/ssuwi/:id',(req,res)=>{
  let id = req.params.id;
  let sql = `select u.user_name, ss.software_suite_id, l.license_name, lt.ltype_name, ul.license_id, u.email_id, u.phone_number, l.license_key, w.server_name, w.no_of_instal, w.licen_no_instal, w.unlicen_no_instal, w.work_name
  from user u
  join user_license ul on u.user_id = ul.user_id
  join license l on ul.license_id = l.license_id
  join workstation w on u.work_id = w.work_id 
  join software_suite ss on l.software_suite_id = ss.software_suite_id 
  join ltype lt on l.ltype_id = lt.ltype_id
  where ss.software_suite_id = ${id};`;
  mysqlConnection2.query(sql,(err,rows,fields)=>{
    if(!err){
      res.send(rows);
    }
    else{
      console.log(err);
    }
  })
})


app.get('/api/users', (req, res) => {
  mysqlConnection2.query('Select * from user', (err, rows, fields) => {
  if (!err) {
  res.send(rows);
  }
  else {
  console.log(err);
  }
  })
  })
  
  
  
  app.get('/api/alloclicense', (req, res) => {
  mysqlConnection2.query('Select * from license', (err, rows, fields) => {
  if (!err) {
  res.send(rows);
  }
  else {
  console.log(err);
  }
  })
  })



  app.get('/api/softwarehistory/:id', (req, res) => {
    let id = req.params.id;
    let sql = `select * from oldsoftware where software_id = ${id};`;
    mysqlConnection2.query(sql,(err,rows,fields)=>{
      if(!err){
        res.send(rows);
      }
      else{
        console.log(err);
      }
    })
  })


  app.get('/api/suitehistory/:id', (req, res) => {
    let id = req.params.id;
    let sql = `select oldsuite_name as oldsoftware_name, oldsuite_version as oldsoftware_version, Installation_date, Upgrade_date from oldsuite where software_suite_id = ${id};`;
    mysqlConnection2.query(sql,(err,rows,fields)=>{
      if(!err){
        res.send(rows);
      }
      else{
        console.log(err);
      }
    })
  })


  app.put('/api/updateread/:id', (req, res) => {
    let id = req.params.id;
    console.log('license id clicked is ', id);
    let sql = `update notifications set read_status = 'read' where license_id = ${id};`;
    mysqlConnection2.query(sql, (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });


  app.get('/api/userlicense', (req,res) => {
    let sql =  `select * from user_license;`;
    mysqlConnection2.query(sql, (err,rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  })



  app.post('/api/insertuserlicense', (req,res) => {
    let uid = req.body.userid;
    let lid = req.body.licenseid;
    let sql = `insert into user_license (user_id, license_id) values ( ${uid}, ${lid});`;
    mysqlConnection2.query(sql, (err,rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  })


  app.put('/api/updatecompliant/:id', (req,res) => {
    let id = req.params.id;
    let sql = `update software set compliant='No' where software_id = ${id};`;
    mysqlConnection2.query(sql, (err,rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  })
  

  app.put('/api/updatecompliantsuite/:id', (req,res) => {
    let id = req.params.id;
    let sql = `update software_suite set compliant='No' where software_suite_id = ${id};`;
    mysqlConnection2.query(sql, (err,rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  })
  
  


app.put('/api/updateallocation/:id', (req,res) => {
  let id = req.params.id;
  let sql = `update license set allocated_license = allocated_license + 1 where license_id = ${id}`;
  mysqlConnection2.query(sql, (err,rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
})


app.put('/api/updateavailablecount/:id', (req,res) => {
  let id = req.params.id;
  let sql = `update license set remaining = remaining - 1 where license_id = ${id} and remaining > 0;`;
  mysqlConnection2.query(sql, (err,rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
})





