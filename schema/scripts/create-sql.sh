#!/bin/sh

##
## create db specific sql files
##
## add_foreign_key.sql linkup_traces.sql setup_object_tb.sql setup_schema.sql setup_tbs.sql
##

. ./common.sh

## no changes
cat sql_template/add_foreign_key.sql > add_foreign_key.sql
cat sql_template/linkup_traces.sql > linkup_traces.sql
cat sql_template/setup_schema.sql > setup_schema.sql

cat sql_template/setup_object_tb.sql | sed "s/DATATYPE/${DATATYPE}/" > setup_object_tb.sql
cat sql_template/setup_tbs.sql | sed "s/DATATYPE/${DATATYPE}/" > setup_tbs.sql

