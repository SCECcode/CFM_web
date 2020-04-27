UPDATE OBJECT_tb 
  SET blinds = 
    ARRAY(
       SELECT blind from OBJECT_tb where gid=259
       UNION ALL
       SELECT blind from OBJECT_tb where gid=258
    )
  WHERE gid=259;
