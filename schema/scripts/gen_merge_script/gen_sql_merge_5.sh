#!/bin/sh


##
## merging of partial traces with same fault object
##

process_for_five() {

scriptfile=./${MERGE_SCRIPT}

/bin/cat >>$scriptfile << EEND5

CREATE TEMP TABLE tmp_x AS 
SELECT ST_Force4D(ST_Union(
  ARRAY(
     SELECT geom from TRACE_tb where gid=${FIRST_TRACE_TB_GID}
     UNION ALL
     SELECT geom from TRACE_tb where gid=${SECOND_TRACE_TB_GID}
     UNION ALL
     SELECT geom from TRACE_tb where gid=${THIRD_TRACE_TB_GID}
     UNION ALL
     SELECT geom from TRACE_tb where gid=${FOURTH_TRACE_TB_GID}
     UNION ALL
     SELECT geom from TRACE_tb where gid=${FIFTH_TRACE_TB_GID}
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

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=${THIRD_TRACE_TB_GID};

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=${FOURTH_TRACE_TB_GID};

UPDATE TRACE_tb 
  SET geom = tmp_x.st_force4d
  from tmp_x
  WHERE TRACE_tb.gid=${FIFTH_TRACE_TB_GID};

DROP TABLE tmp_x;

EEND5
}

input="input_5.txt"
MERGE_SCRIPT="trace_merge.sql"
while IFS= read -r file; do
  arrData=(${file//,/ })
  [[ $arrData =~ ^#.* ]] && continue
  FIRST_TRACE_TB_GID=${arrData[0]}
  SECOND_TRACE_TB_GID=${arrData[1]}
  THIRD_TRACE_TB_GID=${arrData[2]}
  FOURTH_TRACE_TB_GID=${arrData[3]}
  FIFTH_TRACE_TB_GID=${arrData[4]}
  process_for_five
done < "$input"
