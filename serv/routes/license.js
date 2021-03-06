const express=require('express');
const PORT=3000;
const app=express();

const license=[{
  
    "id": 1,
    "license_no": 1,
    "license_type": "EULA License",
    "license_name": "Apache ",
    "license_key": "Eula32.1-c",
    "active": true
  },
  {
    "id": 2,
    "license_no": 2,
    "license_type": "GNU public License ",
    "license_name": "MIT",
    "license_key": "GNUpublic32.1-c",
    "active": true
  },
  {
    "id": 3,
    "license_no": 3,
    "license_type": "Proprietry License",
    "license_name": "Eclipse Public",
    "license_key": "Proprietary32.1-c",
    "active": true
  },
  {
    "id": 4,
    "license_no": 4,
    "license_type": "Trial License",
    "license_name": "BSD 3-clause",
    "license_key": "Eula32.1-c",
    "active": false
  },
  {
    "id": 5,
    "license_no": 5,
    "license_type": "Named License",
    "license_name": "Apache 2.0",
    "license_key": "Named License 1-d",
    "active": true
  },
  {
    "id": 6,
    "license_no": 6,
    "license_type": "Site License",
    "license_name": "Common Public",
    "license_key": "SiteLicense32.1-d",
    "active": false
  },
  {
    "license_no": 10,
    "license_name": "Mozilla Public",
    "manufacturer_name": null,
    "license_type": "EULA",
    "license_key": "dsdfds2",
    "vendor_name": "Agg Softwares",
    "picker": "2020-01-06T18:30:00.000Z",
    "picker2": "2020-01-29T18:30:00.000Z",
    "purchase_cost": 999,
    "department": "Accounts",
    "allocate_location": "Bangalore",
    "Description": "Software for editing",
    "id": 7,
    "active": false
  },
  {
    "license_no": 2121,
    "license_name": "vbvbvb",
    "manufacturer_name": "vbcvbvc",
    "license_type": "EULA",
    "license_key": "vcbvbvb",
    "vendor_name": "vbvbvb",
    "picker": "2020-02-17T18:30:00.000Z",
    "picker2": "2020-02-18T18:30:00.000Z",
    "purchase_cost": 3434,
    "department": "IT",
    "allocate_location": "Chennai",
    "id": 8,
    "active": false
  
}]

var router = express.Router();

router.get('/api/licenses', function(req, res){
   res.send({license});
   console.log('Function executed!');
});
const database=[];
// router.post('/', function(req, res){
//    res.send('POST route on things.');
// });

module.exports = router;
