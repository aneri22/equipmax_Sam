


-- select software_id from license where license_name = 'abc';
use sam;
-- select software_name, installations from software;
-- select * from software;

-- select software_suite_id, installations from software_suite;

update software_suite 
set installations = 10 where software_suite_id between 11 and 15;

-- update software 
-- set compliant = 'No' where software_id  between 1 and 35;

-- select s.software_id from software s where s.software_id in ( select l.software_id from license l) order by s.software_id;


-- update software 
-- set compliant = 'Yes' where software_id in (23,24,26,29);

-- delete from software 
-- where software_id = 30;



-- alter table software_suite
-- add column compliant varchar(20);

-- select * from software_suite;

-- update software_suite
-- set compliant = 'No' where software_suite_id between 1 and 13;
