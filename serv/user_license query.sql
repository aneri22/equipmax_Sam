

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
use sam;
select * from license;


-- update license 
--               set active_status = 1 where license_id = 2;



-- select * from notifications;
-- use sam;
-- truncate table notifications;
--     -- select * from license;
-- insert ignore into notifications ( license_name, license_expiry_date, difference, license_id )
-- select license_name, license_expiry_date, DATEDIFF(license_expiry_date, NOW()) as difference, license_id from license 
-- where DATEDIFF(license_expiry_date, NOW()) between 0 and 30;







 










