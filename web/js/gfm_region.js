/****

  gfm_region.js

****/

var GFM_tb={
"descript": [
{'id':'X','label':'X','descript':'Input X (longitude or UTM coordinate)'},
{'id':'Y','label':'Y','descript':'Input Y (latitude or UTM coordinate)'},
{'id':'Z','label':'Z','descript':'Input Z (elevation - meters above sea level. Positive numbers above sea-level)<br>(depth - meters below ground surface. Positive numbers below ground surface)'},
{'id':'utmX','label':'utmX','descript':'UTM coordinate (zone 11), easting'},
{'id':'utmY','label':'utmY','descript':'UTM coordinate (zone 11), northing'},
{'id':'elevX','label':'elevX','descript':'X coordinate of center of the cell which provided data value for elevations'},
{'id':'elevY','label':'elevY','descript':'Y coordinate of center of the cell which provided data value for elevations'},
{'id':'topo','label':'topo','descript':'Topographic/bathymetric elevation in meters'},
{'id':'mtop','label':'mtop','descript':'Top of model in meters, below this depth there are data'},
{'id':'base','label':'base','descript':'Basement elevation in meters (generaly negative)'},
{'id':'moho','label':'moho','descript':'Moho elevation in meters (always negative)'},
{'id':'src','label':'hr/lr/cm/nr','descript':'Flag to indicate whetehr high-resolution(hr), low-resolution(lr) or <br>lower crust.mantle voxet was used(cm); or if no data available(nr)'},
{'id':'cellX','label':'cellX','descript':'X coordinate of center of cell which provided velocity data value'},
{'id':'cellY','label':'cellY','descript':'Y coordinate of center of cell which provided velocity data value'},
{'id':'cellZ','label':'cellZ','descript':'Z coordinate of center of cell which provided velocity data value'},
{'id':'tg','label':'tg','descript':'Provenance of data point'},
{'id':'vp','label':'vp','descript':'Compressional wave velocity in meters/sec'},
{'id':'vs','label':'vs','descript':'Shear wave velocity in meters/sec'},
{'id':'rho','label':'rho','descript':'Density in kg/m^3'},
{'id':'regionID','label':'regionID','descript':'ID of the geological framework model region name as defined in GFM v1.0 Region Name Table'},
{'id':'temp','label':'temp','descript':'GFM v1.0 Temperature in degree Celsius'}
]};

// read in the json properties for regions from external file data/CRM_regions.json
function setupCRMRegions() {
  var url="data/CRM_regions.json";
  var blob=ckExist(url);
  var jblob=JSON.parse(blob);
  GFM_tb['regions']=jblob['regions'];
}

function makeParametersTable() {
   var tb=GFM_tb['descript'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><th style=\"border:1px solid white;\">CVMH+GFM v1.0 Parameters Table</th></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"gfm-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><td style=\"width:10vw\">Parameter</td><td style=\"width:45vw\">Description</td></tr>";
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var label=item['id'];
     var descript=item['descript'];
     var t="<tr><td style=\"width:10vw\">"+label+"</td><td style=\"width:45vw\">"+descript+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}


function makeRegionsTable() {
   if(!('regions' in GFM_tb)) { 
     setupCRMRegions();
   }
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   var tbhtml="<table><tbody><tr><th style=\"border:1px solid white;\">GFM v1.0 Region Name Table</th></tr></tbody></table>";
   tbhtml=tbhtml+"<div class=\"gfm-table\"><table><tbody>";
   tbhtml=tbhtml+"<tr><td style=\"width:5vw\">ID</td><td style=\"width:30vw\">Region Name</td><td style=\"width:8vw\">sliver</td></tr>";
   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var id=item['id']
     var name=item['name'];
     var sliver=item['sliver'];
     var t="<tr><td style=\"width:5vw\">"+id+"</td><td style=\"width:30vw\">"+name+"</td><td style=\"width:8vw\">"+sliver+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";
   return tbhtml;
}

function getRegionNameWithID(id) {
   if(!('regions' in GFM_tb)) { 
     setupCRMRegions();
   }
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['id'] == id) {
        var n= region['name']+'['+id+']';
        if(region['sliver'])
            n=n+"*";
        return n;
      }
   }
   return undefined;
}

function getRegionNameWithID2(id) {
   if(!('regions' in GFM_tb)) { 
     setupCRMRegions();
   }
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['id'] == id) {
        var n= region['name'];
        return n;
      }
   }
   return undefined;
}

function getRegionColorWithID(id) {
   if(!('regions' in GFM_tb)) { 
     setupCRMRegions();
   }
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['id'] == id) 
        return region['color'];
   }
   return undefined;
}

function getRegionColorWithName(name) {
   if(!('regions' in GFM_tb)) { 
     setupCRMRegions();
   }
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['name'] == name) 
        return region['color'];
   }
   return undefined;
}

function getRegionStateWithID(id) {
   if(!('regions' in GFM_tb)) { 
     setupCRMRegions();
   }
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['id'] == id) 
        return region['state'];
   }
   return undefined;
}

function setRegionStateWithID(id,state) {
   if(!('regions' in GFM_tb)) { 
     setupCRMRegions();
   }
   var tb=GFM_tb['regions'];
   var cnt=tb.length;
   var i;
   for(i=0; i<cnt;i++) {
      var region=tb[i];
      if(region['id'] == id) 
        region['state']=state;
   }
}


function getDescriptWithLabel(label) {
   var tb=GFM_tb['descript'];
   var cnt=tb.length;
   var i;
   for(i=0; i< cnt; i++) {
       var u=tb[i];
       if(u['id']==label) {
          var n=u['descript'];
          if(n == 'NA') 
            return undefined;
          return n;
       }
   }
   window.console.log("ERROR: can not find label %s",label);
   return undefined;
}

function getDescriptWithLabelAndVal(label,val) {
   var tb=GFM_tb['descript'];
   var cnt=tb.length;
   var i;
   // special case for regionID
   if(label == 'regionID') {
      var n=getRegionNameWithID2(val);
      return n;
   }
   for(i=0; i< cnt; i++) {
       var u=tb[i];
       if(u['id']==label) {
          var n=u['descript'];
          if(n == 'NA') 
            return undefined;
          return n;
       }
   }
   window.console.log("ERROR: can not find label %s",label);
   return undefined;
}
