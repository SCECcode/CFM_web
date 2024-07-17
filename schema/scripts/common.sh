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

PWD=`pwd`

## CFM5.3_latest/doc/CFM5.3_Metadata.xlsx
## CFM61/doc/CFM6.1_Metadata.xlsx
#

case $DATATYPE in
   "preferred53")
       echo "  --setup for "$DATATYPE
       CFMPATH=${PWD}"/../CFM5.3_latest"

       CFMSHP=${CFMPATH}"/obj/traces/shp"
       CFMLOC=${CFMSHP}"/CFM5.3_traces"
       CFMLOC_BLIND=${CFMSHP}"/CFM5.3_blind"

       CFMTS=${CFMPATH}"/obj"

       CFMTYPE="CFM53_preferred"
       EXCEL_NM="CFM5.3_Metadata"
       DATATYPE="preferred53"
       EXCEL_NM_SHEET="CFM5.3 Preferred"
       EXCEL_NM_FILE=${CFMPATH}"/doc/CFM5.3_Metadata.xlsx"
       EXCEL_NM_CSV=${CFMPATH}"/doc/"$EXCEL_NM".csv"

       AWSPATH="https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM5/CFM53_preferred"
       ;;
## CFM6_alternatives/doc/CFM6.1_Metadata_Alt.csv
   "alternatives6")
       echo "  --setup for "$DATATYPE
       CFMPATH=${PWD}"/../CFM61"

       CFMSHP=${CFMPATH}"/obj/alternatives/traces/shp"
       CFMLOC=${CFMSHP}"/CFM6.1_traces_ALT"
       CFMLOC_BLIND=${CFMSHP}"/CFM6.1_blind_ALT"

       CFMTS=${CFMPATH}"/obj/alternatives"

       CFMTYPE="CFM6_alternatives"
       EXCEL_NM="CFM6.1_Metadata_Alt"
       EXCEL_NM_SHEET="CFM6.1 Alternatives"
       EXCEL_NM_FILE=${CFMPATH}"/doc/CFM6.1_Metadata.xlsx"
       EXCEL_NM_CSV=${CFMPATH}"/doc/"$EXCEL_NM".csv"

       AWSPATH="https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM6/6.1/CFM6_Alternatives"
       ;;
## CFM61/doc/CFM6.1_Metadata.csv
   "preferred6")
       echo "  --setup for "$DATATYPE
       CFMPATH=${PWD}"/../CFM61"

       CFMSHP=${CFMPATH}"/obj/preferred/traces/shp"
       CFMLOC=${CFMSHP}"/CFM6.1_traces"
       CFMLOC_BLIND=${CFMSHP}"/CFM6.1_blind"

       CFMTS=${CFMPATH}"/obj/preferred"

       CFMTYPE="CFM6_preferred"
       EXCEL_NM="CFM6.1_Metadata"
       EXCEL_NM_SHEET="CFM6.1 Preferred"
       EXCEL_NM_FILE=${CFMPATH}"/doc/CFM6.1_Metadata.xlsx"
       EXCEL_NM_CSV=${CFMPATH}"/doc/"$EXCEL_NM".csv"

       AWSPATH="https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM6/6.1/CFM6_Preferred"

       ;;
## CFM6_ruptures/doc/CFM6.1_Metadata_Rup.csv
   "ruptures6")
       echo "  --setup for "$DATATYPE
       CFMPATH=${PWD}"/../CFM61"

       CFMSHP=${CFMPATH}"/obj/ruptures/traces/shp"
       CFMLOC=${CFMSHP}"/CFM6.1_traces_Rup"
       CFMLOC_BLIND=${CFMSHP}"/CFM6.1_blind_Rup"

       CFMTS=${CFMPATH}"/obj/ruptures"

       CFMTYPE="CFM6_ruptures"
       EXCEL_NM="CFM6.1_Metadata_Rup"
       EXCEL_NM_SHEET="CFM6.1 Ruptures"
       EXCEL_NM_FILE=${CFMPATH}"/doc/CFM6.1_Metadata.xlsx"
       EXCEL_NM_CSV=${CFMPATH}"/doc/"$EXCEL_NM".csv"

       AWSPATH="https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM6/6.1/CFM6_Ruptures"

       ;;
   "alternatives7")
       echo "  --setup for "$DATATYPE
       CFMPATH=${PWD}"/../CFM7"

       CFMSHP=${CFMPATH}"/obj/alternatives/traces/shp"
       CFMLOC=${CFMSHP}"/CFM7.0_traces_ALT"
       CFMLOC_BLIND=${CFMSHP}"/CFM7.0_blind_ALT"

       CFMTS=${CFMPATH}"/obj/alternatives"

       CFMTYPE="CFM7_alternatives"
       EXCEL_NM="CFM7.0_Metadata_Alt"
       EXCEL_NM_SHEET="CFM7.0 Alternatives"
       EXCEL_NM_FILE=${CFMPATH}"/doc/CFM7.0_Metadata.xlsx"
       EXCEL_NM_CSV=${CFMPATH}"/doc/"$EXCEL_NM".csv"

       AWSPATH="https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM7/7.0/CFM7_Alternatives"
       ;;
   "preferred7")
       echo "  --setup for "$DATATYPE
       CFMPATH=${PWD}"/../CFM7"

       CFMSHP=${CFMPATH}"/obj/preferred/traces/shp"
       CFMLOC=${CFMSHP}"/CFM7.0_traces"
       CFMLOC_BLIND=${CFMSHP}"/CFM7.0_blind"

       CFMTS=${CFMPATH}"/obj/preferred"

       CFMTYPE="CFM7_preferred"
       EXCEL_NM="CFM7.0_Metadata"
       EXCEL_NM_SHEET="CFM7.0 Preferred"
       EXCEL_NM_FILE=${CFMPATH}"/doc/CFM7.0_Metadata.xlsx"
       EXCEL_NM_CSV=${CFMPATH}"/doc/"$EXCEL_NM".csv"

       AWSPATH="https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM7/7.0/CFM7_Preferred"

       ;;
   "ruptures7")
       echo "  --setup for "$DATATYPE
       CFMPATH=${PWD}"/../CFM7"

       CFMSHP=${CFMPATH}"/obj/ruptures/traces/shp"
       CFMLOC=${CFMSHP}"/CFM7.0_traces_Rup"
       CFMLOC_BLIND=${CFMSHP}"/CFM7.0_blind_Rup"

       CFMTS=${CFMPATH}"/obj/ruptures"

       CFMTYPE="CFM7_ruptures"
       EXCEL_NM="CFM7.0_Metadata_Rup"
       EXCEL_NM_SHEET="CFM7.0 Ruptures"
       EXCEL_NM_FILE=${CFMPATH}"/doc/CFM7.0_Metadata.xlsx"
       EXCEL_NM_CSV=${CFMPATH}"/doc/"$EXCEL_NM".csv"

       AWSPATH="https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM7/7.0/CFM7_Ruptures"

       ;;
esac
