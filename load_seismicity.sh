#/bin/bash

mkdir -p cfm_data
cd cfm_data
wget https://files.scec.org/s3fs-public/projects/cfm/seismicity/cfm-v7.0-seismicity-utm.tar.gz
tar xvf cfm-v7.0-seismicity-utm.tar.gz
cd ..
mv cfm_data web

#mkdir -p schema_data
#cd schema_data
#wget https://files.scec.org/s3fs-public/projects/cfm/seismicity/cfm-v7.0-seismicity-data.tar.gz
#tar xvf cfm-v7.0-seismicity-data.tar.gz
#cd ..
#mv schema_data/* schema/data
