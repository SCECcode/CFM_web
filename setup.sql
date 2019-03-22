  CREATE EXTENSION postgis;
  SELECT PostGIS_Version();

  \i '/home/postgres/CFM/schema/sql/CFM5_preferred_traces.sql';
  \i '/home/postgres/CFM/schema/sql/setup_schema.sql';
  \i '/home/postgres/CFM/schema/sql/setup_tbs.sql';
  \i '/home/postgres/CFM/schema/sql/setup_object_tb.sql';
  \i '/home/postgres/CFM/schema/sql/linkup_traces.sql';
  \i '/home/postgres/CFM/schema/sql/add_foreign_key.sql';

  DROP ROLE webonly;
  CREATE ROLE webonly WITH LOGIN PASSWORD 'scec';
  GRANT SELECT ON ALL TABLES IN SCHEMA public TO webonly;
  REVOKE CREATE ON SCHEMA public FROM PUBLIC;

  SELECT UpdateGeometrySRID('trace_tb','geom',26711);

  \dp
  \q
