-- select history.install_status,history.History_ID,history.Discovered,workstation.Work_Name,user.User_Name from history,user,workstation where history.User_ID=user.User_ID and history.work_ID=history.work_ID;


-- select h.install_status, h.History_ID, h.Discovered, w.Work_Name, u.User_Name 
-- from history h
-- inner join  user u on h.User_ID = u.User_ID
-- inner join  workstation w on h.work_ID = w.work_ID;

-- select * from notifications;


-- update license 
-- set license_expiry_date = '2020-06-20' where license_id = 24;
-- select license_expiry_date from license where license_id = 24;
-- truncate table notifications;
-- insert ignore into notifications (
--     license_name, license_expiry_date, difference, license_id
--   )
--   select license_name, license_expiry_date, DATEDIFF(license_expiry_date, NOW()) as difference, license_id from license 
--   where DATEDIFF(license_expiry_date, NOW()) between -1 and 30
use sam;
-- update notifications 
-- set read_status = 'unread' where noid between 1 and 4;
-- select * from notifications;

-- alter table notifications
-- alter read_status set default 'unread';
