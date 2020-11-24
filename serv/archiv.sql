use sam;
-- CREATE TABLE Software
-- (
--   Software_ID VARCHAR(10) PRIMARY KEY,
--   Software_Name Varchar(100),
--   Software_Type Varchar(50),
--   Software_Subtype varchar(50),
--   Software_Category varchar(50),
--   Publisher_Name varchar(150),
--   Version_no varchar(50),
--   Installation_status varchar(50),
--   License_ID VARCHAR(10)
  
  
-- );
-- ALTER TABLE Software
-- ADD FOREIGN KEY (License_ID) REFERENCES License(License_ID);

-- CREATE TABLE Installation
-- (
--   Installation_ID VARCHAR(10) PRIMARY KEY,
--   Software_ID VARCHAR(10)
-- );

-- CREATE TABLe Software_User
-- (
--   User_ID VARCHAR(10) PRIMARY Key,
--   User_Name Varchar(100),
--   Email_ID Varchar(50),
--   Phone_Num INT,
--   License_ID VARCHAR(10),
--   Workstation_ID VARCHAR(10),
--   Software_ID VARCHAR(10),
--   Suite_ID VARCHAR(10)
-- );
-- CREATE TABLE License
-- ( 
-- License_ID VARCHAR(10) PRIMARY KEY,
-- License_Name Varchar(100),
-- License_Type Varchar(50),
-- License_Key Varchar(50),
-- Vendor varchar(100),
-- Manufacturer_Name Varchar(150),
-- Issued_date Date,
-- Expiry_Date date,
-- Purchase_Cost FLOAT
-- );

-- CREATE TABLE Software_Suite
-- (
--   Suite_ID VARCHAR(10) PRIMARY Key,
--   Suite_Name Varchar(100),
--   Suite_Type Varchar(50),
--   Suite_Subtype varchar(50),
--   Manufacturer_Name Varchar(100),
--   version varchar(50),
--   Suite_category Varchar(50),
--   License_ID VARCHAR(10)
-- );

-- CREATE TABLE Workstation
-- (
--   Workstation_ID VARCHAR(10) PRIMARY KEY,
--   Server_Name Varchar(100),
--   License_ID VARCHAR(10)
-- );

--alter table installation add allocate_license varchar(50);

-- ALTER TABLE Software
-- ADD FOREIGN KEY (License_ID) REFERENCES License(license_id);

-- ALTER TABLE Software_User
-- ADD FOREIGN KEY (License_ID) REFERENCES License(license_id);

-- ALTER TABLE Software_User
-- ADD FOREIGN KEY (workstation_id) REFERENCES Workstation(workstation_id);

-- ALTER TABLE Software_User
-- ADD FOREIGN KEY (Software_ID) REFERENCES Software(Software_ID);

-- ALTER TABLE Software_User
-- ADD FOREIGN KEY (Suite_ID) REFERENCES Software_Suite(Suite_ID);

-- ALTER TABLE Software_Suite
-- ADD FOREIGN KEY (License_ID) REFERENCES License(license_id);

-- ALTER TABLE Workstation
-- ADD FOREIGN KEY (License_ID) REFERENCES License(license_id);

-- ALTER TABLE Installation
-- ADD FOREIGN KEY (Software_ID) REFERENCES Software(Software_ID);

-- INSERT INTO Software VALUES('S001','Adobe Photoshop','Application Software','Shareware','Graphics','Adobe Inc','Photoshop CC(2018)','Authorised','L101');
-- INSERT INTO Software VALUES('S002','Google Chrome','Application Software','Browser','Web Browser','Google','Chrome v79','Authorised','L102');
-- INSERT INTO Software VALUES('S003','NetBeans','Programming Software','Freeware','Development','Oracle Corporation','NetBeans IDE 8.0.2','Authorised','L103');
-- INSERT INTO Software VALUES('S004','MYSQL','Programming Software','Freeware','Database','Microsoft','MySQL 8.0','Authorised','L104');
-- INSERT INTO Software VALUES('S005','VLC Media Player','Application Software','Shareware','Multimedia','VideoLan (Microsoft)','VLC 3.0.8','Unauthorised','L105');
-- INSERT INTO Software VALUES('S006','Tally ERP 9','Application Software','Shareware','Accounting','BPB Publications','ERP 9','Authorised','L106');
-- INSERT INTO Software VALUES('S007','Notepad','Application Software','Freeware','Development','Microsoft','Notepad 2.0','Authorised','L107');
-- INSERT INTO Software VALUES('S008','VMware','System Software','Utility','Others','VirtualM ','VMare 6.7.0','Authorised','L108');
-- INSERT INTO Software VALUES('S009','PUBG','Application Software','Shareware','Gaming','PUBG ','Peace 1.5.8','Unauthorised','L109');
-- INSERT INTO Software VALUES('S010','Bios Driver','System Software','Utility','Others','Garykildall ','2.07','Authorised','L110');
-- INSERT INTO Software VALUES('S011','Free Youtube Downloader','Application Software','Freeware','Internet','Google','Youtube 14.43.55','Authorised','L111');
-- INSERT INTO Software VALUES('S012','Adobe Photoshop','Application Software','Shareware','Graphics','Adobe Inc','Photoshop CC(2018)','Authorised','L112');
-- INSERT INTO Software VALUES('S013','Google Chrome','Application Software','Browser','Web Browser','Google','Chrome v79','Authorised','L113');
-- INSERT INTO Software VALUES('S014','NetBeans','Programming Software','Freeware','Development','Oracle Corporation','NetBeans IDE 8.0.2','Authorised','L114');
-- INSERT INTO Software VALUES('S015','MYSQL','Programming Software','Freeware','Database','Microsoft','MySQL 8.0','Authorised','L115');
-- INSERT INTO Software VALUES('S016','VLC Media Player','Application Software','Shareware','Multimedia','VideoLan (Microsoft)','VLC 3.0.8','Unauthorised','L116');
-- INSERT INTO Software VALUES('S017','Tally ERP 9','Application Software','Shareware','Accounting','BPB Publications','ERP 9','Authorised','L117');
-- INSERT INTO Software VALUES('S018','Notepad','Application Software','Freeware','Development','Microsoft','Notepad 2.0','Authorised','L118');



--  INSERT INTO License VALUES('L101','Chrome Freeware','Site','AGT452FGDT','Google','Google','2020-01-01','2020-09-30','5000');
-- INSERT INTO License VALUES('L102','Apache License','Proprietary','D6G5JHK89G','Apache Foundation','Apache Foundation','2020-01-07','2020-10-15','3000');
-- INSERT INTO License VALUES('L103','Oracle','Perpetual','H5FC7K4OII','Oracle','Oracle','2020-01-13','2020-07-23','8000');
-- INSERT INTO License VALUES('L104','Sublime Text 3','Site','TUY7867NHO','Windows','SublimeHQ','2020-02-03','2020-11-21','6000');
-- INSERT INTO License VALUES('L105','Xampp Apache','GNU','YHF54HG8JK','Apache Friends','Apache Friends','2020-02-17','2020-12-29','4000');
-- INSERT INTO License VALUES('L106','Notepad2.0','EULA','HG785HG8OK','Microsoft','Microsoft','2019-03-07','2020-09-11','2000');
-- INSERT INTO License VALUES('L107','Adobe License','Proprietary','IG021HG9AB','Adobe','Adobe','2019-02-01','2020-11-11','9000');
-- INSERT INTO License VALUES('L108','Blender License','GNU','AP214KG9PQ','Dennis Publishing','Dennis Publishing','2020-01-05','2020-12-21','2000');
-- INSERT INTO License VALUES('L109','WinRaR License','EULA','KA122KG2KG','Microsoft','Microsoft','2018-06-05','2020-06-04','5000');
-- INSERT INTO License VALUES('L110','Pubg.beta.1.0','Concurrent','DC519SM6PO','PUBG Peace','PUBG Peace','2019-01-25','2020-06-14','9000');
-- INSERT INTO License VALUES('L111','VM2.0 License','Workstation','GH105AK2OM','VirtualM','VirtualM','2019-04-11','2020-12-01','8000');
-- INSERT INTO License VALUES('L112','Open-Source License','GNU','JN1BV32CGY','Microsoft','Microsoft','2019-08-15','2020-08-14','9000');
-- INSERT INTO License VALUES('L113','System Builder','Commercial Driver License','BKJA4GF24V','Gary kildall','Gary kildall','2019-09-17','2020-07-15','10000');
-- INSERT INTO License VALUES('L114','VLC Media Player','GNU','C7X8KJARTG','VideoLan (Microsoft)','VideoLan (Microsoft)','2019-10-01','2020-08-20','12000');
-- INSERT INTO License VALUES('L115','MindPlay','Site','BUYT6DSFGH','Judith  (Microsoft)','Judith  (Microsoft)','2019-07-15','2020-12-25','9000');
-- INSERT INTO License VALUES('L116','MYSQL License','Proprietary','HU87IJFGDT','Microsoft','Microsoft','2020-03-20','2021-03-19','4000');
-- INSERT INTO License VALUES('L117','ERP 9 License','Proprietary','JK87IJFGDT','TallyERP','TallyERP','2019-02-02','2021-10-01','9000');
-- INSERT INTO License VALUES('L118','Office 2012 License','EULA','HJ76HG8GDT','Microsoft','Microsoft','2018-04-13','2021-03-12','12000');
-- -- SELECT * FROM License;



-- INSERT INTO Software_Suite VALUES('SS01','Xampp','Programming Software','Browser','Xampp','Xampp 7.4.2','Database','L105');
-- INSERT INTO Software_Suite VALUES('SS02','MS Office','Application Software','Freeware','Microsoft','MS Office 2012','Accounting','L118');
-- INSERT INTO Software_Suite VALUES('SS03','Adobe','Application Software','Utility','Adobe','Adobe Premiere Pro','Others','L107');
-- SELECT * FROM Software_Suite;
-- 
-- create table History(
-- discovered_date date,
-- workstation varchar(50),
-- user varchar(50),
-- installation_status varchar(50)
-- );

-- INSERT INTO History VALUES('2019-01-16','Dell','Sony','installed');

-- INSERT INTO History VALUES('2020-02-10','Mac MiniMac Mini','Vishal','installed');

-- create table Allocation(
-- username varchar(50),
-- workstation varchar(50),
-- server_type varchar(50),
-- emailid varchar(50),
-- phone bigint(10)
-- );
-- select allocation.Alloc_Id ,user.User_Name, workstation.Work_Name, user.Server_Name,user.Email_ID, user.Phone_number from workstation,user, allocation where  allocation.User_ID = user.User_ID AND workstation.work_ID = user.work_ID;

-- insert into Allocation values('Vishal','Dell','Application','	vg@gmail.com',	8765678760);

-- alter table allocation add FOREIGN KEY (User_ID) REFERENCES user(User_ID);
-- desc allocation;


-- Alter table license
-- ADD active_status boolean;

-- select * from license;
select * from software_suite;