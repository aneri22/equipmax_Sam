use sam;
select s.software_name as sname, s.software_id, s.installation_date, s.installations, l.license_id, l.license_name from software s
left outer join license l on s.software_id = l.software_id 
union all
select ss.software_suite_name as sname, ss.software_suite_id, ss.installation_date, ss.installations, l.license_id, l.license_name from software_suite ss
left outer join license l on ss.software_suite_id = l.software_suite_id  
order by installation_date;


