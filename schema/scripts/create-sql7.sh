#!/bin/sh

##
## create db specific sql files
##
## add_foreign_key.sql linkup_traces.sql setup_object_tb.sql setup_schema.sql setup_tbs.sql
##

echo "running "$0
DATATYPE=$1
. ./common.sh

## no changes
cat sql_template/add_foreign_key.sql > add_foreign_key.sql
cat sql_template/linkup_traces.sql > linkup_traces.sql
cat sql_template/setup_schema7.sql > setup_schema.sql

cat sql_template/setup_object_tb7.sql | sed "s/DATATYPE/${DATATYPE}/" > setup_object_tb.sql
cat sql_template/setup_tbs.sql | sed "s/DATATYPE/${DATATYPE}/" > setup_tbs.sql

