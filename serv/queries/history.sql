use sam;


select l.license_name, l.software_id, l.active_status, l.license_expiry_date, u.user_name, w.work_name 
from license l
left join user_license ul on l.license_id = ul.license_id
left join user u on ul.user_id = u.user_id
left join workstation w on u.work_id = w.work_id
where software_id = 14 and active_status = 0;

-- select license_name,active_status, license_expiry_date from license where software_id = 1 and active_status = 0;


