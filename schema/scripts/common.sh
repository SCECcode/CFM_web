#####  processing schema/data
#####  cp target_data's  doc/target.csv here
#####  unmark the data type at the bottom
#####
#####    ./extract-csv.sh
#####        mv *.csv to  schema/data/target
#####    ./convert-shp.sh
#####        mv *.sql to  schema/sql/target
#####    ./create-csv.sh
#####        mv *.csv to  schema/data/target
#####    ./create-sql.sh
#####        mv *.sql to  schema/sql/target
#####

TOGGLE_P5=0
TOGGLE_P6=1
TOGGLE_A6=0
TOGGLE_R6=0

PWD=`pwd`

## CFM5.3_latest/doc/CFM5.3_Metadata.xlsx
## CFM6/doc/CFM6.0_Metadata.xlsx
#EXCEL_XLSX_NM

if [ $TOGGLE_P5 == 1 ]
then
  CFMPATH=${PWD}"/../CFM5.3_latest/"
  CFMLOC=${CFMPATH}"shp/CFM5.3"
  CFMTYPE="CFM53_preferred"
  EXCEL_NM="CFM5.3_Metadata"
  DATATYPE="preferred53"
  EXCEL_NM_SHEET="CFM5.3 Preferred"
  EXCEL_NM_FILE=${CFMPATH}"doc/CFM5.3_Metadata.xlsx"
  AWSPATH="https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM5/CFM53_preferred"
fi

## CFM6_alternatives/doc/CFM6.0_Metadata_Alt.csv
if [ $TOGGLE_A6 == 1 ]
then
  CFMPATH=${PWD}"/../CFM6_alternatives/"
  CFMLOC=${CFMPATH}"shp/CFM6.0_traces_Alt"
  CFMLOC_BLIND=${CFMPATH}"shp/CFM6.0_blind_Alt"
  CFMTYPE="CFM6_alternatives"
  EXCEL_NM="CFM6.0_Metadata_Alt"
  EXCEL_NM_SHEET="CFM6.0 Alternatives"
  EXCEL_NM_FILE=${PWD}"/../CFM6/doc/CFM6.0_Metadata.xlsx"
  DATATYPE="alternatives6"
  AWSPATH="https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM6/CFM6_Alternatives"
fi

## CFM6/doc/CFM6.0_Metadata.csv
if [ $TOGGLE_P6 == 1 ]
then
  CFMPATH=${PWD}"/../CFM6/"
  CFMLOC=${CFMPATH}"shp/CFM6.0_traces"
  CFMLOC_BLIND=${CFMPATH}"shp/CFM6.0_blind.kml"
  CFMTYPE="CFM6_preferred"
  EXCEL_NM="CFM6.0_Metadata"
  EXCEL_NM_SHEET="CFM6.0 Preferred"
  EXCEL_NM_FILE=${PWD}"/../CFM6/doc/CFM6.0_Metadata.xlsx"
  DATATYPE="preferred6"
  AWSPATH="https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM6/CFM6_Preferred"
fi

## CFM6_ruptures/doc/CFM6.0_Metadata_Rup.csv
if [ $TOGGLE_R6 == 1 ] 
then
  CFMPATH=${PWD}"/../CFM6_ruptures/"
  CFMLOC=${CFMPATH}"shp/CFM6.0_traces_Rup"
  CFMLOC_BLIND=${CFMPATH}"shp/CFM6.0_blind_Rup"
  CFMTYPE="CFM6_ruptures"
  EXCEL_NM="CFM6.0_Metadata_Rup"
  EXCEL_NM_SHEET="CFM6.0 Ruptures"
  EXCEL_NM_FILE=${PWD}"/../CFM6/doc/CFM6.0_Metadata.xlsx"
  DATATYPE="ruptures6"
  AWSPATH="https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM6/CFM6_Ruptures"
fi
