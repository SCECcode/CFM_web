#!/usr/bin/env sh

## convert from shp file content to sql import script 
## shp2pgsql is part of postgres sql toolkit

shp2pgsql -I -s NAD_1927_UTM_Zone_11N /Users/mei/scec/cfm/CFM5_release_2017/obj/CFM5_preferred_traces/CFM5_preferred_traces.shp TRACE_tb > CFM5_preferred_traces.sql

#>>MeiPro:CFM5_preferred_traces mei$ ./convert-shp.sh
#>>Shapefile type: ArcZ
#>>Postgis type: MULTILINESTRING[4]

