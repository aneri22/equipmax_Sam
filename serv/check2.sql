-- use equiapp2;
-- select * from License;

-- use sam;

-- Alter table license;
-- Add active_status boolean;

-- -- -- select * from license;
-- desc license;
-- use sam;
-- Alter table license
-- add FOREIGN KEY (Software_suite_ID) REFERENCES software_suite(Software_suite_ID);

-- select * from license;

-- update license
-- set active_status = 1 ;
-- select Software.Software_ID,Software_suite.Software_suite_ID, Software.Software_Name,Software_suite.Software_suite_Name, License.License_Name,ltype.Ltype_Name, Software.Publisher_Name,Software_suite.Publisher_Name, stype.SType_Name,subtype.SubType_Name, scategory.SCategory_Name from ltype,stype,scategory,subtype,software,software_suite,License where Software.Software_ID = License.Software_ID AND Software_suite.Software_suite_ID=license.Software_suite_ID AND Software.SType_ID = stype.SType_ID AND License.Ltype_ID = ltype.Ltype_ID AND Software.SCategory_ID = scategory.SCategory_ID AND Software.SubType_ID = subtype.SubType_ID;

-- update license
-- set active_status = 1 where License_ID = 1;

use sam;

select Software.Software_ID, Software.Software_Name, License.License_Name,ltype.Ltype_Name, Software.Publisher_Name,stype.SType_Name,subtype.SubType_Name, scategory.SCategory_Name from ltype,stype,scategory,subtype,software,License where Software.Software_ID = License.Software_ID AND Software.SType_ID = stype.SType_ID AND License.Ltype_ID = ltype.Ltype_ID AND Software.SCategory_ID = scategory.SCategory_ID AND Software.SubType_ID = subtype.SubType_ID

UNION ALL

select Software_suite.Software_suite_ID, Software_suite.Software_suite_Name, License.License_Name,ltype.Ltype_Name, Software_suite.Publisher_Name, stype.SType_Name,subtype.SubType_Name, scategory.SCategory_Name from ltype,stype,scategory,subtype,software_suite,License where software_suite.Software_suite_ID =License.Software_suite_ID AND Software_suite.SType_ID = stype.SType_ID AND License.Ltype_ID = ltype.Ltype_ID AND Software_suite.SCategory_ID = scategory.SCategory_ID AND Software_suite.SubType_ID = subtype.SubType_ID;
