#!/usr/bin/env sh

## convert from shp file content to sql import script 
## shp2pgsql is part of postgres sql toolkit

export CFMLOC="/var/www/html/CFM_web/schema/CFM6/shp"

#CFM6_db
shp2pgsql -I -s GCS_WGS_1984 ${CFMLOC}/CFM6.0_Alt_traces.shp nonblind_trace_tb > CFM6_preferred_traces_nonblind.sql

shp2pgsql -I -s GCS_WGS_1984 ${CFMLOC}/CFM6.0_Alt_blind.shp blind_trace_tb > CFM6_preferred_traces_blind.sql

