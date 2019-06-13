#!/bin/sh

## extract csv files from user supplied xlsx file
##
## in2csv and csvcut are from https://csvkit.readthedocs.io/en/latest/index.html
##
## sudo pip install csvkit

rm -f *.csv
in2csv CFM5.2-Fault_ID_preferred.xlsx 2> CFM5.2-Fault_ID_preferred.err |csvcut -c 1-27 > CFM5.2-Fault_ID_preferred.csv
csvcut -n CFM5.2-Fault_ID_preferred.csv > CFM5.2-Fault_ID_preferred_column_labels

#name,abb
csvcut -c 'Fault Name','Name Abb' CFM5.2-Fault_ID_preferred.csv |csvcut -K 1 | sort |uniq | sed "1i\\
name,abb
"> fault_tb.csv 

#name,abb
csvcut -c 'Fault Zone/Region','Region Abb' CFM5.2-Fault_ID_preferred.csv |csvcut -K 1 | sort |uniq | sed "1i\\
name,abb
"> region_tb.csv

#name,abb
csvcut -c 'Fault Section','Section Abb' CFM5.2-Fault_ID_preferred.csv |csvcut -K 1 | sort |uniq | sed "1i\\
name,abb
"> section_tb.csv

#name,abb
csvcut -c 'Fault Area/Major Fault System','System Abb' CFM5.2-Fault_ID_preferred.csv |csvcut -K 1|sort |uniq | sed "1i\\
name,abb
"> area_tb.csv

#name,area,sabb,region,rabb,section,ssabb,fault,fabb
csvcut -c 'CFM5.2 Fault Object Name','Fault Area/Major Fault System','System Abb','Fault Zone/Region','Region Abb','Fault Section','Section Abb','Fault Name','Name Abb' CFM5.2-Fault_ID_preferred.csv |csvcut -K 1|sort |uniq | sed "1i\\
name,area,sabb,region,rabb,section,ssabb,fault,fabb
"> object_tb_head.csv

#name,Alternative,source author,CFM Version,model description,Descriptor,strike,dip,Area,Exposure,final slip sense,reference,Reference check,ID comments,USGS ID
csvcut -c 'CFM5.2 Fault Object Name','Alternative','Source/Author','CFM Version','Fault Strand/Model Description','Descriptor','strike','dip','Area[m^2]','Exposure','final slip sense','References','Reference check','ID comments','USGS ID' CFM5.2-Fault_ID_preferred.csv |csvcut -K 1|sort |uniq | sed "1i\\
name,Alternative,source author,CFM Version,model description,Descriptor,strike,dip,Area,Exposure,final slip sense,reference,Reference check,ID comments,USGS ID
"> object_tb_base.csv 
