#!/bin/sh

## extract csv files from user supplied xlsx file
##
## in2csv and csvcut are from https://csvkit.readthedocs.io/en/latest/index.html
##
## sudo pip install csvkit
#


echo "running "$0
DATATYPE=$1
. ./common.sh

rm -f *.csv

##  in2csv --sheet "${EXCEL_NM_SHEET}" ${EXCEL_NM_FILE} | csvcut -c 1-26 > ${EXCEL_NM}_raw.csv
cat ${EXCEL_NM_CSV} | csvcut -c 1-24 > ${EXCEL_NM}_raw.csv
grep ",,,,,,,,$"  ${EXCEL_NM}_raw.csv > skip_subtitles
grep -vf skip_subtitles ${EXCEL_NM}_raw.csv |sed "s/  / /g" | sed "s/, E/,E/"  > ${EXCEL_NM}.csv
csvcut -n ${EXCEL_NM}.csv > ${EXCEL_NM}_column_labels

#name,abb >> Fault Name
csvcut -c "8" ${EXCEL_NM}.csv |csvcut -K 1 | sort |uniq | sed "1i\\
name
"> fault_tb.csv 

#name,abb >> Fault Zone/Region
csvcut -c "4,5" ${EXCEL_NM}.csv |csvcut -K 1 | sort |uniq | sed "1i\\
name,abb
"> zone_tb.csv

#name,abb >> Fault Section
csvcut -c "6,7" ${EXCEL_NM}.csv |csvcut -K 1 | sort |uniq | sed "1i\\
name,abb
"> section_tb.csv

#name,abb >> Fault Area/Major Fault System
csvcut -c "2,3" ${EXCEL_NM}.csv |csvcut -K 1|sort |uniq | sed "1i\\
name,abb
"> area_tb.csv

#name,area,aabb,zone,zabb,section,sabb,fault
csvcut -c "1,2,3,4,5,6,7,8" ${EXCEL_NM}.csv |csvcut -K 1|sort |uniq | sed "1i\\
name,area,aabb,zone,zabb,section,sabb,fault
"> object_tb_head.csv

#name,
csvcut -c "1,9,10,11,12,13,14,15,16,17,18,19" ${EXCEL_NM}.csv |csvcut -K 1|sort |uniq | sed "1i\\
name,Source/Author,Last Update,wAvgStrike,wAvgDip,TotalArea(km^2),Exposure,Slip Sense,ID Comments,USGS ID,Fault Strand/Model Description,References
"> object_tb_base.csv 