

-- insert into user 
-- ( user_name , email_id , phone_number , work_id)
-- values 
-- ( 'Amit Shah', 'shah@gmail.com', 2345672392,3);

-- insert into user 
-- ( user_name , email_id , phone_number , work_id)
-- values 
-- ( 'Jignesh Patel', 'patel@gmail.com', 9845678492,4);

-- insert into user 
-- ( user_name , email_id , phone_number , work_id)
-- values 
-- ( 'Mahesh Mistry', 'mistry@gmail.com', 7745678492,6);

-- insert into user 
-- ( user_name , email_id , phone_number , work_id)
-- values 
-- ( 'Ajay Gupta', 'ajay@gmail.com', 3445678492,5);

-- insert into user 
-- ( user_name , email_id , phone_number , work_id)
-- values 
-- ( 'Mukesh Sharma', 'mukesh@gmail.com', 4445678492,2);

-- insert into user 
-- ( user_name , email_id , phone_number , work_id)
-- values 
-- ( 'Anand Kulkarni', 'anand@gmail.com', 6745678492,1);

-- select * from user;


-- create table user_license (
--     userli_id int primary key auto_increment,
--     user_id int,
--     license_id int,
--     foreign key (user_id) references user(user_id),
--     foreign key (license_id) references license(license_id)
-- );

-- select ul.user_id, ul.license_id, u.user_name, l.license_name, w.work_name, w.server_name, u.email_id, l.license_key
-- from  user_license ul left outer join user u on 
-- ul.user_id = u.user_id
-- left outer  join license  l on 
-- ul.license_id = l.license_id 
-- left outer join workstation w on 
-- u.work_id = w.work_id where l.license_id=1;


-- //Latest Query/
-- use sam;
-- select u.user_name, s.software_id, l.license_name, ul.license_id, u.email_id, u.phone_number, l.license_key, w.server_name, w.no_of_instal, w.licen_no_instal, w.unlicen_no_instal, w.work_name
-- from user u
-- join user_license ul on u.user_id = ul.user_id
-- join license l on ul.license_id = l.license_id
-- join workstation w on u.work_id = w.work_id 
-- join software s on l.software_id = s.software_id 
-- where s.software_id = 1;


-- use sam;
-- select * from license;


use sam;


select license_id, available_count, allocated_license, remaining from license;


















