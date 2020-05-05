#!/usr/bin/env python

## extract region info from json file and expand into sql scripts
##

import sys, os
import json
import pdb

jsonfile="CRM_regions.json"
sqlfile="load_regions.sql"

fin = open(jsonfile, 'r')
jdata = json.load(fin)
fin.close()

fout = open(sqlfile, 'w+')

rlist= jdata["regions"]
for item in rlist :
   id=str(item['id'])
   name=item['name']
   sliver=str(item['sliver'])
   color=item['color']
   state=str(item['state'])

   string="INSERT INTO REGION_tb (\"domain_id\",\"name\",\"sliver\",\"color\",\"state\") VALUES ("+id+",\'" +name+"\'," +sliver+",\'" +color+"\'," +state+");"
   fout.write(string);
   fout.write("\n");

fout.close()

