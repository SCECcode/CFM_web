COPY AREA_tb(name, abb)
FROM '/home/postgres/CFM/schema/data/preferred7/area_tb.csv' DELIMITER ',' CSV HEADER;
COPY ZONE_tb(name, abb)
FROM '/home/postgres/CFM/schema/data/preferred7/zone_tb.csv' DELIMITER ',' CSV HEADER;
COPY SECTION_tb(name, abb)
FROM '/home/postgres/CFM/schema/data/preferred7/section_tb.csv' DELIMITER ',' CSV HEADER;
COPY FAULT_tb(name)
FROM '/home/postgres/CFM/schema/data/preferred7/fault_tb.csv' DELIMITER ',' CSV HEADER;
COPY OBJECT_1000m_tb(name, url)
FROM '/home/postgres/CFM/schema/data/preferred7/object_1000m_tb.csv' DELIMITER ',' CSV HEADER;
COPY OBJECT_2000m_tb(name, url)
FROM '/home/postgres/CFM/schema/data/preferred7/object_2000m_tb.csv' DELIMITER ',' CSV HEADER;
COPY OBJECT_500m_tb(name, url)
FROM '/home/postgres/CFM/schema/data/preferred7/object_500m_tb.csv' DELIMITER ',' CSV HEADER;
COPY OBJECT_native_tb(name, url)
FROM '/home/postgres/CFM/schema/data/preferred7/object_native_tb.csv' DELIMITER ',' CSV HEADER;


COPY EQ_hauksson_tb(EventTime,EventID,Lat,Lon,Depth,Mag,Easting,Northing,Description)
FROM '/home/postgres/CFM/schema/data/eq_HaukssonWaldhauser_1_tb.csv' DELIMITER ',' CSV HEADER;
COPY EQ_hauksson_tb(EventTime,EventID,Lat,Lon,Depth,Mag,Easting,Northing,Description)
FROM '/home/postgres/CFM/schema/data/eq_HaukssonWaldhauser_2_tb.csv' DELIMITER ',' CSV HEADER;
COPY EQ_hauksson_tb(EventTime,EventID,Lat,Lon,Depth,Mag,Easting,Northing,Description)
FROM '/home/postgres/CFM/schema/data/eq_HaukssonWaldhauser_3_tb.csv' DELIMITER ',' CSV HEADER;
COPY EQ_hauksson_tb(EventTime,EventID,Lat,Lon,Depth,Mag,Easting,Northing,Description)
FROM '/home/postgres/CFM/schema/data/eq_HaukssonWaldhauser_4_tb.csv' DELIMITER ',' CSV HEADER;

COPY EQ_significant_tb(EventTime,EventID,Lat,Lon,Depth,Mag,Description)
FROM '/home/postgres/CFM/schema/data/eq_Significant_tb.csv' DELIMITER ',' CSV HEADER;
