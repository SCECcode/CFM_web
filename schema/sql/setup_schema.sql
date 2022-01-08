CREATE TABLE OBJECT_2000m_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   url VARCHAR(300) UNIQUE
);

CREATE TABLE OBJECT_1000m_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   url VARCHAR(300) UNIQUE
);

CREATE TABLE OBJECT_500m_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   url VARCHAR(300) UNIQUE
);

CREATE TABLE OBJECT_native_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   url VARCHAR(300) UNIQUE
);

CREATE TABLE ZONE_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   abb VARCHAR(5) NOT NULL
);

CREATE TABLE AREA_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   abb VARCHAR(5) NOT NULL
);

CREATE TABLE SECTION_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   abb VARCHAR(5) NOT NULL
);

CREATE TABLE FAULT_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL
);

CREATE TABLE TRACE_tb (
   gid serial PRIMARY KEY,
   layer VARCHAR(100) NOT NULL,
   ___isblind int2 DEFAULT 1
);
SELECT AddGeometryColumn('','trace_tb','geom','0','MULTILINESTRING',4);

CREATE TABLE OBJECT_tb (
   gid serial PRIMARY KEY,

   AREA_tb_gid integer DEFAULT NULL,

   ZONE_tb_gid integer DEFAULT NULL,

   SECTION_tb_gid integer DEFAULT NULL,

   FAULT_tb_gid integer DEFAULT NULL,

   TRACE_tb_gid integer ARRAY,

   OBJECT_2000m_tb_gid integer DEFAULT NULL,

   OBJECT_1000m_tb_gid integer DEFAULT NULL,

   OBJECT_500m_tb_gid integer DEFAULT NULL,

   OBJECT_native_tb_gid integer DEFAULT NULL,

   name VARCHAR(100) UNIQUE NOT NULL,
   url VARCHAR(300) UNIQUE,

   alternative VARCHAR(3),
   source_author VARCHAR(20),
   last_update VARCHAR(6),
   descriptor VARCHAR(10),
   avg_strike real DEFAULT 0.0,
   avg_dip real DEFAULT 0.0,
   area_km2 numeric DEFAULT 0,
   exposure VARCHAR(10),
   slip_sense VARCHAR(10),
   ID_comments VARCHAR(300),
   USGS_ID VARCHAR(100),
   fault_strand_model_description VARCHAR(300),
   reference VARCHAR(300)
);

CREATE TABLE EQ_hauksson_tb (
   gid serial PRIMARY KEY,
   EventTime timestamp,
   EventID integer,
   Lon float, 
   Lat float,
   Depth float,
   Mag float,
   Easting float,
   Northing float
);
SELECT AddGeometryColumn('','eq_hauksson_tb','geom','0','POINT',2);

CREATE TABLE EQ_ross_tb (
   gid serial PRIMARY KEY,
   EventTime timestamp,
   EventID integer,
   Lon float, 
   Lat float,
   Depth float,
   Mag float,
   Easting float,
   Northing float
);
SELECT AddGeometryColumn('','eq_ross_tb','geom','0','POINT',2);

CREATE TABLE EQ_historical_tb (
   gid serial PRIMARY KEY,
   EventTime timestamp,
   EventID VARCHAR(20),
   Lon float, 
   Lat float,
   Depth float DEFAULT NULL,
   Mag float,
   Description VARCHAR(300)
);
SELECT AddGeometryColumn('','eq_historical_tb','geom','0','POINT',2);

