#!/usr/bin/env sh

## convert from shp file content to sql import script 
## shp2pgsql is part of postgres sql toolkit

#CFM5_db
#shp2pgsql -I -s NAD_1927_UTM_Zone_11N /Users/mei/scec/cfm/CFM5_release_2017/obj/CFM5_preferred_traces/CFM5_preferred_traces.shp TRACE_tb > CFM5_preferred_traces.sql

#CFM52_db
shp2pgsql -I /Users/mei/scec/cfm/CFM5_release_2017/obj/CFM52_preferred_traces/CFM52_preferred_traces_nonblind.shp TRACE_tb > CFM52_preferred_traces_nonblind.sql

shp2pgsql -a -I /Users/mei/scec/cfm/CFM5_release_2017/obj/CFM52_preferred_traces/CFM52_preferred_traces_blind.shp TRACE_tb > CFM52_preferred_traces_blind.sql

#>>MeiPro:CFM5_preferred_traces mei$ ./convert-shp.sh
#>>Shapefile type: ArcZ
#>>Postgis type: MULTILINESTRING[4]

