#!/usr/bin/env sh

## convert from shp file content to sql import script 
## shp2pgsql is part of postgres sql toolkit

echo "running "$0
DATATYPE=$1
. ./common.sh

shp2pgsql -I -s GCS_WGS_1984 ${CFMLOC}.shp nonblind_trace_tb > ${CFMTYPE}_traces_nonblind.sql
shp2pgsql -I -s GCS_WGS_1984 ${CFMLOC_BLIND}.shp blind_trace_tb > ${CFMTYPE}_traces_blind.sql

#cp $CFMPATH/doc/*.xlsx .


#>>MeiPro:CFM5_preferred_traces mei$ ./convert-shp.sh
#>>Shapefile type: ArcZ
#>>Postgis type: MULTILINESTRING[4]

