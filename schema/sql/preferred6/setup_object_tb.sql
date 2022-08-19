
COPY OBJECT_tb(name,alternative,source_author,last_update,descriptor,avg_strike,avg_dip,area_km2,exposure,slip_sense,ID_comments,USGS_ID,fault_strand_model_description,reference) FROM '/home/postgres/CFM/schema/data/preferred6/object_tb_base.csv' DELIMITER ',' CSV HEADER;


CREATE TEMP TABLE tmp_x 
         (name VARCHAR(100),
         area VARCHAR(100) , aabb VARCHAR(5),
         zone VARCHAR(100), zabb VARCHAR(5),
         section VARCHAR(100), sabb VARCHAR(5),
         fault VARCHAR(100));


COPY tmp_x(name,area,aabb,zone,zabb,section,sabb,fault)
FROM '/home/postgres/CFM/schema/data/preferred6/object_tb_head.csv' DELIMITER ',' CSV HEADER;

UPDATE OBJECT_tb o SET 
    (AREA_tb_gid, ZONE_tb_gid, SECTION_tb_gid, FAULT_tb_gid)  =
     (
(SELECT gid FROM AREA_tb s WHERE s.name=tmp_x.area and s.abb = tmp_x.aabb),
(SELECT gid FROM ZONE_tb r WHERE r.name=tmp_x.zone and r.abb = tmp_x.zabb),
(SELECT gid FROM SECTION_tb ss WHERE ss.name=tmp_x.section and ss.abb = tmp_x.sabb),
(SELECT gid FROM FAULT_tb f WHERE f.name=tmp_x.fault)
     )
    FROM tmp_x
    WHERE o.name=tmp_x.name;

DROP TABLE tmp_x;
