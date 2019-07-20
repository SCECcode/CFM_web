#!/bin/sh

## extract csv files from user supplied xlsx file
##
## in2csv and csvcut are from https://csvkit.readthedocs.io/en/latest/index.html
##
## sudo pip install csvkit

EXCEL_NM="CFM5.2-Fault_ID_preferred_final"

rm -f *.csv
in2csv ${EXCEL_NM}.xlsx 2> ${EXCEL_NM}.err |csvcut -c 1-27 > ${EXCEL_NM}_raw.csv
grep -vf skip_subtitles ${EXCEL_NM}_raw.csv |sed "s/  / /g" | sed "s/, E/,E/"  > ${EXCEL_NM}.csv
csvcut -n ${EXCEL_NM}.csv > ${EXCEL_NM}_column_labels

#name,abb
csvcut -c 'Fault Name','Code_4' ${EXCEL_NM}.csv |csvcut -K 1 | sort |uniq | sed "1i\\
name,abb
"> fault_tb.csv 

#name,abb
csvcut -c 'Fault Zone/Region','Code_2' ${EXCEL_NM}.csv |csvcut -K 1 | sort |uniq | sed "1i\\
name,abb
"> zone_tb.csv

#name,abb
csvcut -c 'CFM5.2 Fault Object Name','Fault Section','Code_3' ${EXCEL_NM}.csv |csvcut -K 1 | sort |uniq | sed "1i\\
name,abb
"> section_tb.csv

#name,abb
csvcut -c 'Fault Area/Major Fault System','Code' ${EXCEL_NM}.csv |csvcut -K 1|sort |uniq | sed "1i\\
name,abb
"> area_tb.csv

#name,area,aabb,zone,zabb,section,sabb,fault,fabb
csvcut -c 'CFM5.2 Fault Object Name','Fault Area/Major Fault System','Code','Fault Zone/Region','Code_2','Fault Section','Code_3','Fault Name','Code_4' ${EXCEL_NM}.csv |csvcut -K 1|sort |uniq | sed "1i\\
name,area,aabb,zone,zabb,section,sabb,fault,fabb
"> object_tb_head.csv

#name,Alternative,source author,CFM Version,model description,Descriptor,strike,dip,Area,Exposure,final slip sense,reference,Reference check,ID comments,USGS ID
csvcut -c 'CFM5.2 Fault Object Name','Alternative','Source/Author','CFM Version','Fault Strand/Model Description','Descriptor','Strike','Dip','Area[m^2]','Exposure','Slip Sense','References','Reference Check','ID comments','USGS ID' ${EXCEL_NM}.csv |csvcut -K 1|sort |uniq | sed "1i\\
name,Alternative,source author,CFM Version,model description,Descriptor,Strike,Dip,Area,Exposure,Slip Sense,Reference,Reference Check,ID comments,USGS ID
"> object_tb_base.csv 
