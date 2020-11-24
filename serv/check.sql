use sam;

-- desc Software_Suite;
-- desc Software;
-- desc Software_User;
-- desc Workstation;
-- desc Installation;
-- desc License;

-- select * from Software_Suite;




-- select license_id, active_status from license;

-- update license set active_status = 1 where license_id = 12;
-- update license set active_status = 1 where License_ID = 4;
-- -- select active_status from license;
-- -- select * from software;
-- select license_id, active_status from license;
-- select * from software where software_ID = 1;

-- update history set install_status = 'uninstalled' where history_ID = 2;
-- update history set install_status = 'uninstalled' where history_ID = 4;



-- alter table history
-- add install_status varchar(20);
-- select * from history;
-- update history set Discovered = '2020-05-12' where history_id = 6;
-- update history set Discovered = '2020-04-12' where history_id = 7;
-- update history set Discovered = '2020-05-04' where history_id = 8;
-- update history set Discovered = '2020-05-13' where history_id = 9;
-- update history set Discovered = '2020-05-14' where history_id = 10;
-- update history set Discovered = '2020-02-10' where history_id = 11;
-- select * from history;
select * from software_suite;