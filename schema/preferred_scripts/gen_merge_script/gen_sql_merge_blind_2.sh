#!/bin/sh


##
## blind merging of partial traces with same fault object
##

process_for_two() {

scriptfile=./${MERGE_SCRIPT}

/bin/cat >>$scriptfile << EEND2

UPDATE OBJECT_tb 
  SET blinds = 
    ARRAY(
       SELECT ___isblind from Trace_tb where gid=${FIRST_TRACE_TB_GID}
       UNION ALL
       SELECT ___isblind from Trace_tb where gid=${SECOND_TRACE_TB_GID}
    )
  WHERE TRACE_tb_gid=${FIRST_TRACE_TB_GID} OR TRACE_tb_gid=${SECOND_TRACE_TB_GID};

EEND2
}

input="input_2.txt"
MERGE_SCRIPT="blind_merge.sql"
while IFS= read -r file; do
  arrData=(${file//,/ })
  [[ $arrData =~ ^#.* ]] && continue
  FIRST_TRACE_TB_GID=${arrData[0]}
  SECOND_TRACE_TB_GID=${arrData[1]}
  process_for_two
done < "$input"
