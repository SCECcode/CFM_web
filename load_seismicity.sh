#/bin/bash

mkdir -p seismicity
cd seismicity
#wget https://files.scec.org/s3fs-public/projects/cfm/Seisimicty/cfm-v7.0-seisimicity-cache.tar.gz
tar xvf /home/mei/CFM_web_target/cfm-v7.0-seisimicity-cache.tar.gz
cd ..
mv seismicity web/data

mkdir -p cfm_data
cd cfm_data
#wget https://files.scec.org/s3fs-public/projects/cfm/Seisimicty/cfm-v7.0-seisimicity-utm.tar.gz
tar xvf /home/mei/CFM_web_target/cfm-v7.0-seisimicity-utm.tar.gz
cd ..
mv cfm_data web

mkdir -p schema_data
cd schema_data
#wget https://files.scec.org/s3fs-public/projects/cfm/Seisimicty/cfm-v7.0-seisimicity-data.tar.gz
tar xvf /home/mei/CFM_web_target/cfm-v7.0-seisimicity-data.tar.gz
cd ..
mv schema_data/* schema/data
rm -rf schema_data


