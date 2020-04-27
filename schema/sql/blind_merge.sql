
CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT blind from TRACE_tb where gid=259
     UNION ALL
     SELECT blind from TRACE_tb where gid=258
  )
));

UPDATE TRACE_tb 
  SET blinds = 
    ARRAY(
       SELECT blind from TRACE_tb where gid=259
       UNION ALL
       SELECT blind from TRACE_tb where gid=258
    )
  WHERE gid=259;

