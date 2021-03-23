#!/usr/bin/env sh

## convert from shp file content to sql import script 
## shp2pgsql is part of postgres sql toolkit

#CFM53_db
shp2pgsql -a -I -s GCS_WGS_1984 /Users/mei/scec/CFM/CFM5.3_release_2021/obj/traces/shp/CFM5.3_traces.shp TRACE_tb > CFM53_preferred_traces_nonblind.sql

shp2pgsql -a -I -s GCS_WGS_1984 /Users/mei/scec/CFM/CFM5.3_release_2021/obj/traces/shp/CFM5.3_blind.shp TRACE_tb > CFM53_preferred_traces_blind.sql

#>>MeiPro:CFM5_preferred_traces mei$ ./convert-shp.sh
#>>Shapefile type: ArcZ
#>>Postgis type: MULTILINESTRING[4]

