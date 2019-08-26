CREATE TEMP TABLE tmp_y AS
     SELECT layer, trim(layer,'-trace'), gid from TRACE_tb;

UPDATE OBJECT_tb
 SET TRACE_tb_gid = array_append(TRACE_tb_gid, tmp_y_gid)
WHERE
 tmp_y_gid IN (
   SELECT gid FROM tmp_y
      LEFT JOIN tmp_y ON OBJECT_tb.name = tmp_y.btrim
)

DROP TABLE tmp_y;

CREATE TEMP TABLE tmp_x AS
     SELECT name, concat(name,'-trace'), gid from OBJECT_tb;

UPDATE OBJECT_tb 
    SET blind = 1
    FROM tmp_x, TRACE_tb
    WHERE TRACE_tb.layer = tmp_x.concat
    AND tmp_x.gid = OBJECT_tb.gid
    AND TRACE_tb.___isblind = 1;

DROP TABLE tmp_x;

CREATE TEMP TABLE tmp_x AS
     SELECT name, concat(name,'_m2000'), gid from OBJECT_tb;

UPDATE OBJECT_tb 
    SET OBJECT_2000m_tb_gid = OBJECT_2000m_tb.gid
    FROM tmp_x, OBJECT_2000m_tb
    WHERE OBJECT_2000m_tb.name = tmp_x.concat
    AND tmp_x.gid = OBJECT_tb.gid;

DROP TABLE tmp_x;

CREATE TEMP TABLE tmp_x AS
     SELECT name, concat(name,'_m1000'), gid from OBJECT_tb;

UPDATE OBJECT_tb 
    SET OBJECT_1000m_tb_gid = OBJECT_1000m_tb.gid
    FROM tmp_x, OBJECT_1000m_tb
    WHERE OBJECT_1000m_tb.name = tmp_x.concat
    AND tmp_x.gid = OBJECT_tb.gid;

DROP TABLE tmp_x;

CREATE TEMP TABLE tmp_x AS
     SELECT name, concat(name,'_m500'), gid from OBJECT_tb;

UPDATE OBJECT_tb 
    SET OBJECT_500m_tb_gid = OBJECT_500m_tb.gid
    FROM tmp_x, OBJECT_500m_tb
    WHERE OBJECT_500m_tb.name = tmp_x.concat
    AND tmp_x.gid = OBJECT_tb.gid;

DROP TABLE tmp_x;

CREATE TEMP TABLE tmp_x AS
     SELECT name, concat(name,''), gid from OBJECT_tb;

UPDATE OBJECT_tb 
    SET OBJECT_native_tb_gid = OBJECT_native_tb.gid
    FROM tmp_x, OBJECT_native_tb
    WHERE OBJECT_native_tb.name = tmp_x.concat
    AND tmp_x.gid = OBJECT_tb.gid;

DROP TABLE tmp_x;

