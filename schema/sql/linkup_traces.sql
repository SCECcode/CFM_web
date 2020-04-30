UPDATE TRACE_tb
     SET ___isblind = 0
     WHERE ___isblind IS null;

CREATE TEMP TABLE tmp_x AS
     SELECT name, concat(name,'-trace'), gid from OBJECT_tb;

UPDATE OBJECT_tb
    SET TRACE_tb_gid = TRACE_tb.gid
    FROM tmp_x, TRACE_tb
    WHERE TRACE_tb.layer = tmp_x.concat
    AND tmp_x.gid = OBJECT_tb.gid;

UPDATE OBJECT_tb 
    SET blind = 1, blinds = ARRAY [ 1 ]
    FROM tmp_x, TRACE_tb
    WHERE TRACE_tb.layer = tmp_x.concat
    AND tmp_x.gid = OBJECT_tb.gid
    AND TRACE_tb.___isblind = 1;

UPDATE OBJECT_tb 
    SET blind = 2, blinds = ARRAY [ 2 ]
    FROM tmp_x, TRACE_tb
    WHERE TRACE_tb.layer = tmp_x.concat
    AND tmp_x.gid = OBJECT_tb.gid
    AND TRACE_tb.___isblind = 2;

UPDATE OBJECT_tb 
    SET blind = 0, blinds = ARRAY [ 0 ]
    FROM tmp_x, TRACE_tb
    WHERE TRACE_tb.layer = tmp_x.concat
    AND tmp_x.gid = OBJECT_tb.gid
    AND TRACE_tb.___isblind = 0;

DROP TABLE tmp_x;

CREATE TEMP TABLE tmp_x AS
     SELECT concat(name,'-trace'), gid from OBJECT_tb;

CREATE TEMP TABLE tmp_y AS
     SELECT layer, gid, ___isblind from TRACE_tb;

UPDATE OBJECT_tb 
   SET TRACES_tb_gid = TRACES_tb_gid || tmp_y.gid ,
   blinds = blinds || tmp_y.___isblind
   FROM tmp_y, tmp_x
   WHERE tmp_y.layer = tmp_x.concat 
   AND tmp_x.gid = OBJECT_tb.gid;

DROP TABLE tmp_x;
DROP TABLE tmp_y;

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

