#!/bin/sh
#
##

DATATYPES="preferred53 alternatives6 preferred6 ruptures6"

for DATATYPE in $DATATYPES
do 

  rm -rf ../data/${DATATYPE}
  mkdir -p ../data/${DATATYPE}
  rm -rf ../sql/${DATATYPE}
  mkdir -p ../sql/${DATATYPE}

  ./extract-csv.sh ${DATATYPE}
  mv *.csv ../data/${DATATYPE}

  ./convert-shp.sh ${DATATYPE}
  mv *.sql ../sql/${DATATYPE}

  ./create-csv.sh ${DATATYPE}
  mv *.csv ../data/${DATATYPE}

  ./create-sql.sh ${DATATYPE}
  mv *.sql ../sql/${DATATYPE}
  mv *column_labels ../data/${DATATYPE}

done

DATATYPES7="alternatives7 preferred7 ruptures7"

for DATATYPE in $DATATYPES7
do 

  rm -rf ../data/${DATATYPE}
  mkdir -p ../data/${DATATYPE}
  rm -rf ../sql/${DATATYPE}
  mkdir -p ../sql/${DATATYPE}

  ./extract-csv7.sh ${DATATYPE}
  mv *.csv ../data/${DATATYPE}

  ./convert-shp.sh ${DATATYPE}
  mv *.sql ../sql/${DATATYPE}

  ./create-csv.sh ${DATATYPE}
  mv *.csv ../data/${DATATYPE}

  ./create-sql.sh ${DATATYPE}
  mv *.sql ../sql/${DATATYPE}
  mv *column_labels ../data/${DATATYPE}

done