
## after chop off the comment lines and turn to a valid csv file
## with delimiter=comma, use this to generate base input for eq tables
#
#==> base_csv <==
#EventTime,EventID,Lat,Lon,Depth,Mag,Easting,Northing,Description
#2010-09-01T13:01:47.759,10790541,32.92295,-116.23240,9.152,1.45,571849.89,3642810.52,Hauk
#
#==> HaukssonWaldhauserEQs.txt <==
#lon,lat,easting,northing,depth,mag,GMT_dateTime,id,source
#
csvcut -c "7,8,2,1,5,6,3,4,9"  HaukssonWaldhauserEQs.txt > base_csv 
