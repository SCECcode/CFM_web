#!/bin/sh


##
## merging of partial traces with same fault object
##

process_for_two() {

scriptfile=./${MERGE_SCRIPT}

/bin/cat >>$scriptfile << EEND2

CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=${FIRST_TRACE_TB_GID}
     UNION ALL
     SELECT geom from TRACE_tb where gid=${SECOND_TRACE_TB_GID}
  )
));

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=${FIRST_TRACE_TB_GID};

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=${SECOND_TRACE_TB_GID};

DROP TABLE tmp_x;

EEND2
}

input="input_2.txt"
MERGE_SCRIPT="trace_merge.sql"
while IFS= read -r file; do
  arrData=(${file//,/ })
  [[ $arrData =~ ^#.* ]] && continue
  FIRST_TRACE_TB_GID=${arrData[0]}
  SECOND_TRACE_TB_GID=${arrData[1]}
  process_for_two
done < "$input"
