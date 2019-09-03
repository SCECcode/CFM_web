
CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=259
     UNION ALL
     SELECT geom from TRACE_tb where gid=258
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=259;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=258;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=85
     UNION ALL
     SELECT geom from TRACE_tb where gid=86
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=85;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=86;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=279
     UNION ALL
     SELECT geom from TRACE_tb where gid=280
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=279;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=280;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=24
     UNION ALL
     SELECT geom from TRACE_tb where gid=25
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=24;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=25;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=15
     UNION ALL
     SELECT geom from TRACE_tb where gid=16
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=15;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=16;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=451
     UNION ALL
     SELECT geom from TRACE_tb where gid=453
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=451;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=453;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=106
     UNION ALL
     SELECT geom from TRACE_tb where gid=107
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=106;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=107;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=363
     UNION ALL
     SELECT geom from TRACE_tb where gid=366
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=363;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=366;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=29
     UNION ALL
     SELECT geom from TRACE_tb where gid=30
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=29;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=30;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=389
     UNION ALL
     SELECT geom from TRACE_tb where gid=391
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=389;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=391;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=76
     UNION ALL
     SELECT geom from TRACE_tb where gid=77
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=76;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=77;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=217
     UNION ALL
     SELECT geom from TRACE_tb where gid=218
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=217;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=218;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=49
     UNION ALL
     SELECT geom from TRACE_tb where gid=50
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=49;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=50;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=89
     UNION ALL
     SELECT geom from TRACE_tb where gid=90
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=89;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=90;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=354
     UNION ALL
     SELECT geom from TRACE_tb where gid=356
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=354;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=356;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=358
     UNION ALL
     SELECT geom from TRACE_tb where gid=359
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=358;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=359;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=370
     UNION ALL
     SELECT geom from TRACE_tb where gid=367
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=370;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=367;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=263
     UNION ALL
     SELECT geom from TRACE_tb where gid=264
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=263;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=264;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=261
     UNION ALL
     SELECT geom from TRACE_tb where gid=262
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=261;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=262;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=136
     UNION ALL
     SELECT geom from TRACE_tb where gid=135
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=136;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=135;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=403
     UNION ALL
     SELECT geom from TRACE_tb where gid=404
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=403;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=404;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=82
     UNION ALL
     SELECT geom from TRACE_tb where gid=83
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=82;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=83;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=395
     UNION ALL
     SELECT geom from TRACE_tb where gid=396
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=395;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=396;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=426
     UNION ALL
     SELECT geom from TRACE_tb where gid=428
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=426;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=428;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=58
     UNION ALL
     SELECT geom from TRACE_tb where gid=59
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=58;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=59;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=319
     UNION ALL
     SELECT geom from TRACE_tb where gid=320
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=319;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=320;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=348
     UNION ALL
     SELECT geom from TRACE_tb where gid=349
     UNION ALL
     SELECT geom from TRACE_tb where gid=477
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=348;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=349;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=477;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=281
     UNION ALL
     SELECT geom from TRACE_tb where gid=282
     UNION ALL
     SELECT geom from TRACE_tb where gid=283
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=281;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=282;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=283;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=92
     UNION ALL
     SELECT geom from TRACE_tb where gid=93
     UNION ALL
     SELECT geom from TRACE_tb where gid=91
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=92;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=93;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=91;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=26
     UNION ALL
     SELECT geom from TRACE_tb where gid=27
     UNION ALL
     SELECT geom from TRACE_tb where gid=28
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=26;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=27;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=28;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=147
     UNION ALL
     SELECT geom from TRACE_tb where gid=148
     UNION ALL
     SELECT geom from TRACE_tb where gid=149
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=147;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=148;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=149;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=470
     UNION ALL
     SELECT geom from TRACE_tb where gid=469
     UNION ALL
     SELECT geom from TRACE_tb where gid=471
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=470;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=469;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=471;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=109
     UNION ALL
     SELECT geom from TRACE_tb where gid=110
     UNION ALL
     SELECT geom from TRACE_tb where gid=111
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=109;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=110;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=111;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=102
     UNION ALL
     SELECT geom from TRACE_tb where gid=103
     UNION ALL
     SELECT geom from TRACE_tb where gid=104
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=102;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=103;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=104;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=295
     UNION ALL
     SELECT geom from TRACE_tb where gid=296
     UNION ALL
     SELECT geom from TRACE_tb where gid=297
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=295;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=296;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=297;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=205
     UNION ALL
     SELECT geom from TRACE_tb where gid=206
     UNION ALL
     SELECT geom from TRACE_tb where gid=207
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=205;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=206;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=207;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=336
     UNION ALL
     SELECT geom from TRACE_tb where gid=459
     UNION ALL
     SELECT geom from TRACE_tb where gid=460
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=336;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=459;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=460;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=122
     UNION ALL
     SELECT geom from TRACE_tb where gid=123
     UNION ALL
     SELECT geom from TRACE_tb where gid=124
     UNION ALL
     SELECT geom from TRACE_tb where gid=125
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=122;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=123;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=124;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=125;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=342
     UNION ALL
     SELECT geom from TRACE_tb where gid=343
     UNION ALL
     SELECT geom from TRACE_tb where gid=344
     UNION ALL
     SELECT geom from TRACE_tb where gid=345
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=342;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=343;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=344;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=345;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=183
     UNION ALL
     SELECT geom from TRACE_tb where gid=184
     UNION ALL
     SELECT geom from TRACE_tb where gid=185
     UNION ALL
     SELECT geom from TRACE_tb where gid=186
     UNION ALL
     SELECT geom from TRACE_tb where gid=187
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=183;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=184;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=185;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=186;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=187;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=462
     UNION ALL
     SELECT geom from TRACE_tb where gid=464
     UNION ALL
     SELECT geom from TRACE_tb where gid=465
     UNION ALL
     SELECT geom from TRACE_tb where gid=466
     UNION ALL
     SELECT geom from TRACE_tb where gid=467
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=462;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=464;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=465;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=466;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=467;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=142
     UNION ALL
     SELECT geom from TRACE_tb where gid=143
     UNION ALL
     SELECT geom from TRACE_tb where gid=144
     UNION ALL
     SELECT geom from TRACE_tb where gid=145
     UNION ALL
     SELECT geom from TRACE_tb where gid=146
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=142;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=143;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=144;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=145;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=146;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=208
     UNION ALL
     SELECT geom from TRACE_tb where gid=209
     UNION ALL
     SELECT geom from TRACE_tb where gid=210
     UNION ALL
     SELECT geom from TRACE_tb where gid=211
     UNION ALL
     SELECT geom from TRACE_tb where gid=212
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=208;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=209;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=210;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=211;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=212;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=337
     UNION ALL
     SELECT geom from TRACE_tb where gid=338
     UNION ALL
     SELECT geom from TRACE_tb where gid=339
     UNION ALL
     SELECT geom from TRACE_tb where gid=340
     UNION ALL
     SELECT geom from TRACE_tb where gid=341
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=337;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=338;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=339;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=340;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=341;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=69
     UNION ALL
     SELECT geom from TRACE_tb where gid=70
     UNION ALL
     SELECT geom from TRACE_tb where gid=71
     UNION ALL
     SELECT geom from TRACE_tb where gid=72
     UNION ALL
     SELECT geom from TRACE_tb where gid=73
     UNION ALL
     SELECT geom from TRACE_tb where gid=74
     UNION ALL
     SELECT geom from TRACE_tb where gid=75
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=69;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=70;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=71;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=72;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=73;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=74;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=75;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=196
     UNION ALL
     SELECT geom from TRACE_tb where gid=194
     UNION ALL
     SELECT geom from TRACE_tb where gid=195
     UNION ALL
     SELECT geom from TRACE_tb where gid=192
     UNION ALL
     SELECT geom from TRACE_tb where gid=193
     UNION ALL
     SELECT geom from TRACE_tb where gid=197
     UNION ALL
     SELECT geom from TRACE_tb where gid=198
     UNION ALL
     SELECT geom from TRACE_tb where gid=199
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=196;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=194;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=195;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=192;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=193;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=197;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=198;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=199;

DROP TABLE tmp_x;


CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=234
     UNION ALL
     SELECT geom from TRACE_tb where gid=235
     UNION ALL
     SELECT geom from TRACE_tb where gid=236
     UNION ALL
     SELECT geom from TRACE_tb where gid=237
     UNION ALL
     SELECT geom from TRACE_tb where gid=238
     UNION ALL
     SELECT geom from TRACE_tb where gid=239
     UNION ALL
     SELECT geom from TRACE_tb where gid=240
     UNION ALL
     SELECT geom from TRACE_tb where gid=241
     UNION ALL
     SELECT geom from TRACE_tb where gid=252
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=234;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=235;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=236;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=237;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=238;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=239;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=240;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=241;

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=252;

DROP TABLE tmp_x;

