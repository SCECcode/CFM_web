INSERT INTO TRACE_tb (layer, ___isblind, geom)
   SELECT name, 1, geom 
   FROM blind_trace_tb;

INSERT INTO TRACE_tb (layer, ___isblind, geom)
   SELECT name, 0, geom 
   FROM nonblind_trace_tb;

CREATE INDEX ON TRACE_tb USING GIST ("geom");

UPDATE EQ_hauksson_tb SET geom = ST_SetSRID(ST_MakePoint(lon, lat),4326); 
CREATE INDEX ON EQ_hauksson_tb USING GIST ("geom");

UPDATE EQ_ross_tb SET geom = ST_SetSRID(ST_MakePoint(lon, lat),4326); 
CREATE INDEX ON EQ_ross_tb USING GIST ("geom");

UPDATE EQ_historical_tb SET geom = ST_SetSRID(ST_MakePoint(lon, lat),4326); 
CREATE INDEX ON EQ_historical_tb USING GIST ("geom");

CREATE TEMP TABLE tmp_x AS
     SELECT name, gid from OBJECT_tb;

CREATE TEMP TABLE tmp_y AS
     SELECT layer, gid from TRACE_tb;

UPDATE OBJECT_tb 
     SET TRACE_tb_gid =
      ( SELECT ARRAY(
        SELECT tmp_y.gid 
          FROM tmp_y, tmp_x
          WHERE tmp_y.layer = tmp_x.name 
          AND tmp_x.gid = OBJECT_tb.gid 
      ));

DROP TABLE tmp_x;
DROP TABLE tmp_y;

CREATE TEMP TABLE tmp_x AS
     SELECT name, concat(name,'_2000m'), gid from OBJECT_tb;

UPDATE OBJECT_tb 
    SET OBJECT_2000m_tb_gid = OBJECT_2000m_tb.gid
    FROM tmp_x, OBJECT_2000m_tb
    WHERE OBJECT_2000m_tb.name = tmp_x.concat
    AND tmp_x.gid = OBJECT_tb.gid;

DROP TABLE tmp_x;

CREATE TEMP TABLE tmp_x AS
     SELECT name, concat(name,'_1000m'), gid from OBJECT_tb;

UPDATE OBJECT_tb 
    SET OBJECT_1000m_tb_gid = OBJECT_1000m_tb.gid
    FROM tmp_x, OBJECT_1000m_tb
    WHERE OBJECT_1000m_tb.name = tmp_x.concat
    AND tmp_x.gid = OBJECT_tb.gid;

DROP TABLE tmp_x;

CREATE TEMP TABLE tmp_x AS
     SELECT name, concat(name,'_500m'), gid from OBJECT_tb;

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

