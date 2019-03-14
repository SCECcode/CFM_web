# Community Fault Model 

### https://www.scec.org/research/cfm

## CFM viewer

A 2D viewer based on Leaflet, an open-source JavaScript library for interactive maps,
https://leafletjs.com, map data services from OpenStreetMap, https://www.openstreetmap.org,
OpenTopoMap, https://www.opentopomap.org and leaflet esri plugin,
https://esri.github.io/esri-leaflet, for Ersi basemap from ArcGIS and the CFM 
CFM5_release_2017 release from https://www.scec.org/research/cfm

### Hosted at http://asperity.scec.org/CFM/web/cfm_view.html

![](doc/cfm_demo.png) 


## CFM data service

Software stack at the backend server node when postgres and postgis are
being built from source:

      git

      gcc
      readline-develp
      zlib-devel
      json-c
      autoconf
      libxml2-devel
      libtool

      postgres version a10.5
        
      proj5
      gdal

      postgis version 2.5.1

      apache web service

      install cfm viewer from git to /var/www/html 

Instructions to stand up the cfm viewer on a micro node reserved from AWS cloud service
are in doc/

    `run-as-me`, for the installer who is installing the software stack

    `run-as-postgres`, for user, postgres, who is bringing up the postgres server

    `run-as-httpd`, for installing and starting up the web service


Data preprocessing instructions are in doc/run-preprocess-data, xlsx file is in 
schema/CFM5_release_2017 and the scripts are in schema/scripts 


### Layout 

Server Side 
       
    Postgres/Postgis database
    TS/SHP data files
    PHP scripts for accessing database
    Apache web service to manage incoming
       and outgoing instruction/data

Client Side 

    JS scripts to process and manage data product
    Html web page for graphics display and user dashboard
       

        
