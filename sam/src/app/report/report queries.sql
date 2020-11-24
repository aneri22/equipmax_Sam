select s.Software_ID , s.Software_Name as Product_Name, s.ptype, s.installations, l.available_count, l.purchase_cost, l.allocated_license, s.Publisher_Name, l.License_Name, lt.Ltype_Name,
 st.SType_Name, su.SubType_Name, sc.SCategory_Name 
 from software s
 left outer join license l on s.Software_ID = l.Software_ID
 left outer join ltype lt on l.Ltype_ID = lt.Ltype_ID
 left outer join stype st on s.Stype_ID = st.Stype_ID
 left outer join subtype su on s.Subtype_ID = su.Subtype_ID
 left outer join scategory sc on s.SCategory_ID = sc.SCategory_ID
 Union all
 select ss.Software_suite_ID , ss.Software_Suite_Name as Product_Name,  ss.ptype, ss.installations, l.available_count, l.purchase_cost, l.allocated_license, ss.Publisher_Name, l.License_Name, lt.Ltype_Name,
 st.SType_Name, su.SubType_Name, sc.SCategory_Name 
 from software_suite ss
 left outer join license l on ss.Software_Suite_ID = l.Software_Suite_ID
 left outer join ltype lt on l.Ltype_ID = lt.Ltype_ID
 left outer join stype st on ss.Stype_ID = st.Stype_ID
 left outer join subtype su on ss.Subtype_ID = su.Subtype_ID
 left outer join scategory sc on ss.SCategory_ID = sc.SCategory_ID;
 

-- select s.software_id, s.software_name, s.publisher_name, st.stype_name, su.subType_name, sc.SCategory_name  
-- from software s, stype st, subtype su, scategory sc where not exists ( select l.software_id from license l );

-- select s.software_id, s.software_name, s.publisher_name, s.installations, s.ptype
--  from software s  where not exists ( select software_id from license l where s.software_id = l.software_id or l.software_suite_id != null )

select software.software_id from software where software_id in (
    select license.software_id from license 
)






