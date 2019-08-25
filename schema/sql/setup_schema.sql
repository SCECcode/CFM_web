CREATE TABLE OBJECT_2000m_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   url VARCHAR(200) UNIQUE
);

CREATE TABLE OBJECT_1000m_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   url VARCHAR(200) UNIQUE
);

CREATE TABLE OBJECT_500m_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   url VARCHAR(200) UNIQUE
);

CREATE TABLE OBJECT_native_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   url VARCHAR(200) UNIQUE
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
   abb VARCHAR(4) NOT NULL
);

CREATE TABLE FAULT_tb (
   gid serial PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   abb VARCHAR(4) NOT NULL
);

CREATE TABLE OBJECT_tb (
   gid serial PRIMARY KEY,

   AREA_tb_gid integer DEFAULT NULL,

   ZONE_tb_gid integer DEFAULT NULL,

   SECTION_tb_gid integer DEFAULT NULL,

   FAULT_tb_gid integer DEFAULT NULL,

   TRACE_tb_gid integer [],

   OBJECT_2000m_tb_gid integer DEFAULT NULL,

   OBJECT_1000m_tb_gid integer DEFAULT NULL,

   OBJECT_500m_tb_gid integer DEFAULT NULL,

   OBJECT_native_tb_gid integer DEFAULT NULL,

   name VARCHAR(100) UNIQUE NOT NULL,
   url VARCHAR(200) UNIQUE,

   alternative VARCHAR(3),
   source_author VARCHAR(20),
   CFM_version VARCHAR(6),
   model_description VARCHAR(100),
   descriptor VARCHAR(10),
   strike real DEFAULT 0.0,
   dip real DEFAULT 0.0,
   area numeric DEFAULT 0,
   exposure VARCHAR(10),
   slip_sense VARCHAR(6),
   reference VARCHAR(100),
   reference_check VARCHAR(6),
   ID_comments VARCHAR(100),
   USGS_ID VARCHAR(100),

   blind integer DEFAULT 0
);
