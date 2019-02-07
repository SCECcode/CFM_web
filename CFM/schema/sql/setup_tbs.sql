COPY SYSTEM_tb(name, abb)
FROM '/home/postgres/CFM/schema/data/system_tb.csv' DELIMITER ',' CSV HEADER;
COPY REGION_tb(name, abb)
FROM '/home/postgres/CFM/schema/data/region_tb.csv' DELIMITER ',' CSV HEADER;
COPY SECTION_tb(name, abb)
FROM '/home/postgres/CFM/schema/data/section_tb.csv' DELIMITER ',' CSV HEADER;
COPY FAULT_tb(name, abb)
FROM '/home/postgres/CFM/schema/data/fault_tb.csv' DELIMITER ',' CSV HEADER;
COPY OBJECT_1000m_tb(name, url)
FROM '/home/postgres/CFM/schema/data/object_1000m_tb.csv' DELIMITER ',' CSV HEADER;
COPY OBJECT_500m_tb(name, url)
FROM '/home/postgres/CFM/schema/data/object_500m_tb.csv' DELIMITER ',' CSV HEADER;
COPY OBJECT_native_tb(name, url)
FROM '/home/postgres/CFM/schema/data/object_native_tb.csv' DELIMITER ',' CSV HEADER;
