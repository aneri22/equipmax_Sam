-- insert into newsoftware (software_name, software_id) values ('Netbeans 3.1', 3);
-- insert into newsoftware (software_name, software_id) values ('Netbeans 5.1', 3);
-- insert into newsoftware (software_name, software_id) values ('Netbeans beta', 3);

use sam;

-- insert into newsuite (suite_name, software_suite_id, Software_Suite_Version) values ('Xammp 2.0', 1,'pro 2.0');
-- insert into newsuite (suite_name, software_suite_id, Software_Suite_Version) values ('Xammp 3.0', 1,'pro 2.0');
-- insert into newsuite (suite_name, software_suite_id, Software_Suite_Version) values ('Xammp 4.0', 1,'pro 2.0');
-- insert into newsuite (suite_name, software_suite_id, Software_Suite_Version) values ('Adobe suite 2.0', 5,'ultra 2.0');
-- insert into newsuite (suite_name, software_suite_id, Software_Suite_Version) values ('Adobe Suite 2.0', 5,'ultra 2.0');
-- insert into newsuite (suite_name, software_suite_id, Software_Suite_Version) values ('Adobe Premium', 5,'premium');
-- insert into newsuite (suite_name, software_suite_id, Software_Suite_Version) values ('GSuite 2.0', 6,'suite 2.0');
-- insert into newsuite (suite_name, software_suite_id, Software_Suite_Version) values ('GSuite 3,0', 6,'suite 2.0');

-- desc newsoftware;

-- create table newsuite (
--     new_suite_id int primary key auto_increment,
--     suite_name varchar(20),
--     software_suite_id int, 
--     Software_Suite_Version varchar(20),
--     foreign key(software_suite_id) references software_suite(software_suite_id)
-- );
-- Select License.License_ID, ltype.Ltype_Name, ltype.Ltype_ID, License.License_Name, License.License_Key, License.available_count, License.allocated_license  from License,ltype where License.Ltype_ID = ltype.Ltype_ID;

-- select * from newsoftware;
-- select * from license;
-- select l.License_ID, l.Software_ID, s.Software_Name, s.Software_Version, l.Software_Suite_ID, s.Software_ID, l.License_Name, l.License_Key, l.Manufacturer_Name,
--   l.Purchase_Cost, l.Available_Count, l.Vendor_Name, lt.Ltype_Name from license l, Ltype lt, software s
--   where l.Ltype_ID = lt.Ltype_ID and l.Software_ID = s.Software_ID and l.License_ID = 3; 


-- update newsoftware 
-- set Software_Version = "7" where new_software_id = 1;
-- update newsoftware 
-- set Software_Version = "10.1" where new_software_id = 2;
-- update newsoftware 
-- set Software_Version = "SD 2.2" where new_software_id = 3;
-- update newsoftware 
-- set Software_Version = "2.4" where new_software_id = 4;
-- update newsoftware 
-- set Software_Version = "pro 2.3" where new_software_id = 5;
-- update newsoftware 
-- set Software_Version = "ultra 2.0" where new_software_id = 6;
-- update newsoftware 
-- set Software_Version = "2.1.2" where new_software_id = 7;
-- update newsoftware 
-- set Software_Version = "4.1.2" where new_software_id = 8;
-- update newsoftware 
-- set Software_Version = "beta 4.1.1" where new_software_id = 9;
-- update newsoftware 
-- set Software_Version = "super 3.2.0" where new_software_id = 10;
-- update newsoftware 
-- set Software_Version = "3.10.1" where new_software_id = 11;
-- update newsoftware 
-- set Software_Version = "5.10" where new_software_id = 12;
-- update newsoftware 
-- set Software_Version = "beta 2.3.1" where new_software_id = 13;
-- update newsoftware 
-- set Software_Version = "super 10.2.0" where new_software_id = 14;

