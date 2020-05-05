
CREATE TABLE POINT_tb (
     gid serial PRIMARY KEY,
     REGION_tb_gid integer ARRAY,

     lat FLOAT, 
     lon FLOAT,
     description VARCHAR(200)
);

CREATE TABLE REGION_tb (
     gid serial PRIMARY KEY,
     TRACE_tb_gid integer ARRAY,

     domain_id INTEGER,
     name VARCHAR(100),
     sliver INTEGER,
     state INTEGER,
     color VARCHAR(50),
     ucolor VARCHAR(50),
     description VARCHAR(200)
);



