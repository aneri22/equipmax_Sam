

-- drop table notifications;


-- create table notifications ( 
-- noid int primary key auto_increment,
-- license_id int,
-- license_name varchar(20),
-- license_expiry_date date,
-- difference int
-- );


-- update license 
-- set license_expiry_date = '2020-06-18' where license_id = 16;

-- update license
-- set active_status = 1 where license_expiry_date = subdate(current_date, 1);
-- use sam;
-- select * from license where license_id = 16;



-- alter table notifications 
-- add UNIQUE INDEX(license_id, license_name);

-- truncate table notifications;






-- alter table notifications 
-- add column difference int;

-- alter table notifications 
-- add 


-- select active_status from license ;

-- select * from license;
use sam;
-- select * from user_license;
-- delete from user_license where userli_id = 56;


-- update license 
--               set active_status = 1 where license_id = 2;

-- CREATE UNIQUE INDEX uq_userlicense
--   ON sam.user_license(user_id, license_id);


-- select u.user_name, s.software_id, l.license_name, l.consume_status, lt.ltype_name, ul.license_id, u.email_id, u.phone_number, l.license_key, w.server_name, w.no_of_instal, w.licen_no_instal, w.unlicen_no_instal, w.work_name
--   from user u
--   join user_license ul on u.user_id = ul.user_id
--   join license l on ul.license_id = l.license_id
--   join workstation w on u.work_id = w.work_id 
--   join software s on l.software_id = s.software_id 
--   join ltype lt on l.ltype_id = lt.ltype_id
--   where s.software_id = 1;

-- select * from user_license;

-- select * from notifications;
-- use sam;
-- truncate table notifications;
--     -- select * from license;
-- insert ignore into notifications ( license_name, license_expiry_date, difference, license_id )
-- select license_name, license_expiry_date, DATEDIFF(license_expiry_date, NOW()) as difference, license_id from license 
-- where DATEDIFF(license_expiry_date, NOW()) between 0 and 30;


-- select * from license where active_status = 0;



-- select count(*),license_id from user_license group by license_id;



-- update license 
-- set allocated_license = 0
-- where license_id = 27;

-- update license 
-- set allocated_license = 0
-- where license_id = 30;
-- update license 
-- set allocated_license = 0
-- where license_id = 31;
-- update license 
-- set allocated_license = 0
-- where license_id = 32;

-- update license 
-- set allocated_license = 0
-- where license_id = 33;
-- update license 
-- set allocated_license = 0
-- where license_id = 34;
-- update license 
-- set allocated_license = 0
-- where license_id = 35;
-- update license 
-- set allocated_license = 0
-- where license_id = 36;
-- update license 
-- set allocated_license = 0
-- where license_id = 37;
-- update license 
-- set allocated_license = 0
-- where license_id = 38;
-- update license 
-- set allocated_license = 0
-- where license_id = 40;
-- update license 
-- set allocated_license = 0
-- where license_id = 45;
-- update license 
-- set allocated_license = 0
-- where license_id = 45;
-- update license 
-- set allocated_license = 0
-- where license_id = 49;

-- update license 
-- set allocated_license = 0
-- where license_id = 50;
-- update license 
-- set allocated_license = 0
-- where license_id = 51;
-- update license 
-- set allocated_license = 0
-- where license_id = 52;
-- update license 
-- set allocated_license = 0
-- where license_id = 53;
-- update license 
-- set allocated_license = 0
-- where license_id = 54;

-- update license 
-- set allocated_license = 0
-- where license_id = 55;
-- update license 
-- set allocated_license = 0
-- where license_id = 57;
-- update license 
-- set allocated_license = 0
-- where license_id = 58;
-- update license 
-- set allocated_license = 0
-- where license_id = 59;

-- update license 
-- set allocated_license = 0
-- where license_id = 60;
-- update license 
-- set allocated_license = 0
-- where license_id = 61;
-- update license 
-- set allocated_license = 0
-- where license_id = 63;
-- update license 
-- set allocated_license = 0
-- where license_id = 64;

-- update license 
-- set allocated_license = 0
-- where license_id = 46;
 

-- select license_id, available_count, allocated_license from license;


-- select * from user_license where license_id = 5;



-- select s.software_name from software s left join 
-- license l on s.software_id = l.software_id where l.license_id = 24;


-- update license 
-- set available_count = 5
-- where license_id = 1;

-- update license 
-- set available_count = 0
-- where license_id = 2;

-- update license 
-- set available_count = 3
-- where license_id = 3;

-- update license 
-- set available_count = 10
-- where license_id = 5;

-- update license 
-- set available_count = 4
-- where license_id = 6;

-- update license 
-- set available_count = 3
-- where license_id = 7;

-- update license 
-- set available_count = 2
-- where license_id = 8;

-- update license 
-- set available_count = 4
-- where license_id = 10;

-- select license_id, purchase_cost from license;

-- update license 
-- set purchase_cost = 10000 
-- where license_id = 51;


-- update license 
-- set purchase_cost = 50000 
-- where license_id = 36;
-- select allocated_license from license where license_id = 33;


-- update license
-- set allocated_license = allocated_license + 1
-- where license_id = 33;





select license_id, allocated_license, available_count from license;



