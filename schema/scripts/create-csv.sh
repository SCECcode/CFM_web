#!/bin/sh

##
## create data location csv files
##
## object_native_tb.csv object_500m_tb.csv   
## object_1000m_tb.csv object_2000m_tb.csv  
##


echo "running "$0
DATATYPE=$1
. ./common.sh

TYPES="native 500m 1000m 2000m" 

for TT in $TYPES
do 
  echo "name,url" > object_${TT}_tb.csv
## interate through the files in a directory
  FILES="${CFMPATH}obj/${TT}/*.ts"
  for f in $FILES
  do
    fname="${f##*/}"
    fstub="${fname%.*}"
    echo "$fstub,${AWSPATH}/${TT}/$fname" >> object_${TT}_tb.csv
  done
done
