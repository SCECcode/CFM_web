#!/usr/bin/env sh

## convert from shp file content to sql import script 
## shp2pgsql is part of postgres sql toolkit

#CFM53_db
shp2pgsql -I -s GCS_WGS_1984 /users/mei/scec/CFM_web/schema/CFM5_release_2021/shp/CFM5.3_traces.shp nonblind_trace_tb > CFM53_preferred_traces_nonblind.sql

shp2pgsql -I -s GCS_WGS_1984 /users/mei/scec/CFM_web/schema/CFM5_release_2021/shp/CFM5.3_blind.shp blind_trace_tb > CFM53_preferred_traces_blind.sql


#>>MeiPro:CFM5_preferred_traces mei$ ./convert-shp.sh
#>>Shapefile type: ArcZ
#>>Postgis type: MULTILINESTRING[4]

