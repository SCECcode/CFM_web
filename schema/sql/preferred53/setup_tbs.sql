COPY AREA_tb(name, abb)
FROM '/home/postgres/CFM/schema/data/preferred/area_tb.csv' DELIMITER ',' CSV HEADER;
COPY ZONE_tb(name, abb)
FROM '/home/postgres/CFM/schema/data/preferred/zone_tb.csv' DELIMITER ',' CSV HEADER;
COPY SECTION_tb(name, abb)
FROM '/home/postgres/CFM/schema/data/preferred/section_tb.csv' DELIMITER ',' CSV HEADER;
COPY FAULT_tb(name)
FROM '/home/postgres/CFM/schema/data/preferred/fault_tb.csv' DELIMITER ',' CSV HEADER;
COPY OBJECT_1000m_tb(name, url)
FROM '/home/postgres/CFM/schema/data/preferred/object_1000m_tb.csv' DELIMITER ',' CSV HEADER;
COPY OBJECT_2000m_tb(name, url)
FROM '/home/postgres/CFM/schema/data/preferred/object_2000m_tb.csv' DELIMITER ',' CSV HEADER;
COPY OBJECT_500m_tb(name, url)
FROM '/home/postgres/CFM/schema/data/preferred/object_500m_tb.csv' DELIMITER ',' CSV HEADER;
COPY OBJECT_native_tb(name, url)
FROM '/home/postgres/CFM/schema/data/preferred/object_native_tb.csv' DELIMITER ',' CSV HEADER;
COPY EQ_hauksson_tb(EventTime,EventID,Lat,Lon,Depth,Mag,Easting,Northing)
FROM '/home/postgres/CFM/schema/data/eq_Hauksson_1_tb.csv' DELIMITER ',' CSV HEADER;
COPY EQ_hauksson_tb(EventTime,EventID,Lat,Lon,Depth,Mag,Easting,Northing)
FROM '/home/postgres/CFM/schema/data/eq_Hauksson_2_tb.csv' DELIMITER ',' CSV HEADER;
COPY EQ_ross_tb(EventTime,EventID,Lat,Lon,Depth,Mag,Easting,Northing)
FROM '/home/postgres/CFM/schema/data/eq_Ross_1_tb.csv' DELIMITER ',' CSV HEADER;
COPY EQ_ross_tb(EventTime,EventID,Lat,Lon,Depth,Mag,Easting,Northing)
FROM '/home/postgres/CFM/schema/data/eq_Ross_2_tb.csv' DELIMITER ',' CSV HEADER;
COPY EQ_historical_tb(EventTime,EventID,Lat,Lon,Depth,Mag,Description)
FROM '/home/postgres/CFM/schema/data/eq_Historical_tb.csv' DELIMITER ',' CSV HEADER;
