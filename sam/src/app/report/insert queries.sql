use sam;
-- select * from software;

-- select * from license;
-- desc software;
-- insert into software (software_name, software_version, manufacturer_name, publisher_name, stype_id, subtype_id, scategory_id, installation_date, ptype, installations)
-- values ('SQL Server', '2.0.2', 'SF softwares', 'Microsoft', 2,3,4, '2019-04-22','software',34);

-- insert into software (software_name, software_version, manufacturer_name, publisher_name, stype_id, subtype_id, scategory_id, installation_date, ptype, installations)
-- values ('Visio', '10.2.3', 'Visio softwares', 'Adobe', 1,2,5, '2020-04-21','software',22);

-- insert into software (software_name, software_version, manufacturer_name, publisher_name, stype_id, subtype_id, scategory_id, installation_date, ptype, installations)
-- values ('Professional Windows', 'pro 2.3', 'Microsoft Corporation', 'Microsoft', 1,4,6, '2019-04-20','software',55);

-- insert into software (software_name, software_version, manufacturer_name, publisher_name, stype_id, subtype_id, scategory_id, installation_date, ptype, installations)
-- values ('Red Hat', 'Version 20', 'Red Hat distributions', 'IBM', 3,2,2, '2020-05-11','software',150);

-- insert into software (software_name, software_version, manufacturer_name, publisher_name, stype_id, subtype_id, scategory_id, installation_date, ptype, installations)
-- values ('Citrix Systems', 'alpha 2.3.3', 'Oracle', 'Oracle', 3,4,7, '2018-02-21','software',65);

-- insert into software (software_name, software_version, manufacturer_name, publisher_name, stype_id, subtype_id, scategory_id, installation_date, ptype, installations)
-- values ('Mail Chimp', '2.2', 'Mozilla corp', 'Mozilla', 1,2,4, '2019-07-20','software',14);

-- insert into software (software_name, software_version, manufacturer_name, publisher_name, stype_id, subtype_id, scategory_id, installation_date, ptype, installations)
-- values ('Zoom', '14.2.2', 'Zoom softwares', 'Suntech', 3,3,2, '2017-08-22','software',54);

-- insert into software (software_name, software_version, manufacturer_name, publisher_name, stype_id, subtype_id, scategory_id, installation_date, ptype, installations)
-- values ('SAP', '64 bit 7.0.2', 'ERP softwares', 'SAP', 1,4,5, '2016-01-21','software',134);


-- select * from software_suite;
-- insert into software_suite (software_suite_name, software_suite_version, manufacturer_name, publisher_name, stype_id, subtype_id, scategory_id, installation_date, ptype, installations)
-- values ('Mac suite', '11.0.2', 'Apple', 'Apple', 1,3,4, '2016-02-25','software_suite',24);

-- insert into software_suite (software_suite_name, software_suite_version, manufacturer_name, publisher_name, stype_id, subtype_id, scategory_id, installation_date, ptype, installations)
-- values ('Oracle office pack', '13.0.2', 'Oracle', 'Oracle', 1,4,8, '2017-11-22','software_suite',44);

-- update license 
-- set allocated_license = 14 where license_id = 1;
-- update license 
-- set allocated_license = 50 where license_id = 2;
-- update license 
-- set allocated_license = 20 where license_id = 3;
-- update license 
-- set allocated_license = 63 where license_id = 4;
-- update license 
-- set allocated_license = 45 where license_id = 10;
-- update license 
-- set allocated_license = 16 where license_id = 11;
-- update license 
-- set allocated_license = 21 where license_id = 12;
-- update license 
-- set allocated_license = 25 where license_id = 13;
-- update license 
-- set allocated_license = 78 where license_id = 14;
-- update license 
-- set allocated_license = 32 where license_id = 15;
-- update license 
-- set allocated_license = 25 where license_id = 16;
-- update license 
-- set allocated_license = 36 where license_id = 17;
-- update license 
-- set allocated_license = 78 where license_id = 18;
-- update license 
-- set allocated_license = 10 where license_id = 19;

-- desc license;
-- id, name, key, vendor_name, Manufacturer_name, issue_date, License_expiry_date purchase cost, purchase_for, available_count, software_id, loc_id, ltype_id, active_status, software_suite_id, allocated_license;
-- insert into license (License_ID,License_Name, License_Key, vendor_name, Manufacturer_name, issue_date, License_expiry_date, purchase_cost, purchase_for, available_count, loc_id, ltype_id, active_status, software_suite_id, allocated_license)
-- values (6,'BSD 2 Clause','ADSFCccS', 'Just Tech licenses','JT licenses', '2019-03-13', '2020-06-05',7000,'FINANCE', 56,2,7,1,6,67);
-- insert into license (License_ID,License_Name, License_Key, vendor_name, Manufacturer_name, issue_date, License_expiry_date, purchase_cost, purchase_for, available_count, loc_id, ltype_id, active_status, software_suite_id, allocated_license)
-- values (7,'MIT License','XCVXCSFCS', 'Just Tech licenses','MIT licenses', '2016-08-13', '2020-07-09',12000,'HR', 36,2,6,1,7,47);
-- insert into license (License_ID,License_Name, License_Key, vendor_name, Manufacturer_name, issue_date, License_expiry_date, purchase_cost, purchase_for, available_count, loc_id, ltype_id, active_status, software_suite_id, allocated_license)
-- values (8,'Mozilla Public','ADSFCccS', 'Just Tech licenses','JT licenses', '2018-06-13', '2020-06-05',4000,'FINANCE', 66,2,3,1,7,57);

-- use sam;
-- select * from software_suite;




-- update license 
-- set available_count = 56 where license_id = 4;
-- update license 
-- set available_count = 32 where license_id = 10;
-- update license 
-- set available_count = 14 where license_id = 11;
-- update license 
-- set available_count = 36 where license_id = 12;
-- update license 
-- set available_count = 45 where license_id = 13;
-- update license 
-- set available_count = 66 where license_id = 14;
-- update license 
-- set available_count = 48 where license_id = 15;
-- update license 
-- set available_count = 25 where license_id = 16;
-- update license 
-- set available_count = 36 where license_id = 17;
-- update license 
-- set available_count = 47 where license_id = 18;
-- update license 
-- set available_count = 14 where license_id = 19;


select * from license;




-- update software_suite 
-- set installations = 300 where software_suite_Id = 1;
-- update software_suite 
-- set installations = 140 where software_suite_Id = 4;
-- update software_suite 
-- set installations = 130 where software_suite_Id = 5;

--     update software 
--     set installations = 15 where software_Id = 4;
--     update software 
--     set installations = 26 where software_Id = 5;
--     update software 
--     set installations = 45 where software_Id = 6;
--     update software 
--     set installations = 23 where software_Id = 7;
--     update software 
--     set installations = 56 where software_Id = 8;
--     update software 
--     set installations = 41 where software_Id = 9;
--     update software 
--     set installations = 30 where software_Id = 10;
--     update software 
--     set installations = 66 where software_Id = 11;
--     update software 
--     set installations = 100 where software_Id = 13;
--     update software 
--     set installations = 10 where software_Id = 14;


-- desc software;



