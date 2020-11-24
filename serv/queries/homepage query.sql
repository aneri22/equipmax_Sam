-- select s.Software_ID, s.Software_Name, s.Publisher_Name, l.License_Name, lt.Ltype_Name,
--  st.SType_Name, su.SubType_Name, sc.SCategory_Name 
--  from software s
--  left outer join license l on s.Software_ID = l.Software_ID
--  left outer join ltype lt on l.Ltype_ID = lt.Ltype_ID
--  left outer join stype st on s.Stype_ID = st.Stype_ID
--  left outer join subtype su on s.Subtype_ID = su.Subtype_ID
--  left outer join scategory sc on s.SCategory_ID = sc.SCategory_ID;

use sam;
select s.Software_ID, s.Software_Name, s.Publisher_Name,
    st.SType_Name, su.SubType_Name, sc.SCategory_Name 
    from software s
    left outer join stype st on s.Stype_ID = st.Stype_ID
    left outer join subtype su on s.Subtype_ID = su.Subtype_ID
    left outer join scategory sc on s.SCategory_ID = sc.SCategory_ID
    where s.Software_ID = 1;
 
  
