
COPY OBJECT_tb(name, alternative, source_author, CFM_version, model_description, descriptor, strike, dip, area, exposure, final_slip_sense, reference, reference_check, ID_comments, USGS_ID) FROM '/home/postgres/CFM/schema/data/object_tb_base.csv' DELIMITER ',' CSV HEADER;


CREATE TEMP TABLE tmp_x 
         (name VARCHAR(100),
         system VARCHAR(50) , sabb VARCHAR(5),
         area  VARCHAR(50), rabb VARCHAR(5),
         section  VARCHAR(50), ssabb VARCHAR(5),
         fault VARCHAR(60), fabb VARCHAR(5));


COPY tmp_x(name,system,sabb,area,rabb,section,ssabb,fault,fabb)
FROM '/home/postgres/CFM/schema/data/object_tb_head.csv' DELIMITER ',' CSV HEADER;

UPDATE OBJECT_tb o SET 
    (AREA_tb_gid, REGION_tb_gid, SECTION_tb_gid, FAULT_tb_gid)  =
     (
(SELECT gid FROM AREA_tb s WHERE s.name=tmp_x.system and s.abb = tmp_x.sabb),
(SELECT gid FROM REGION_tb r WHERE r.name=tmp_x.area and r.abb = tmp_x.rabb),
(SELECT gid FROM SECTION_tb ss WHERE ss.name=tmp_x.section and ss.abb = tmp_x.ssabb),
(SELECT gid FROM FAULT_tb f WHERE f.name=tmp_x.fault and f.abb = tmp_x.fabb)
     )
    FROM tmp_x
    WHERE o.name=tmp_x.name;

DROP TABLE tmp_x;
