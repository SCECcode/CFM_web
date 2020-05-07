/***
   crm_layer.js
***/

// all region gid ==> gid from region_tb
//  [ { "gid": gid1,  "meta": mmm1 }, {  "gid": gid2, "meta": mmm2 }, ... }
var crm_region_meta_list=[];

// gid is regiongid, trace is leaflet feature (1 per layer)
// [ {"gid": gid1, "trace": trace1 }, {"gid":gid2, "trace":trace2}... ], only with geo
var crm_trace_list=[];

function find_crm_name_by_gid(gid) {
   var found=0;
   crm_region_meta_list.forEach(function(meta) {
     if ( meta['gid'] == gid )
        found=meta['name'];
        return found;
   });
   return found;
}

// create a feature with a geoJSON or a geoJSONList, 
function makeCRMGeoJSONFeature(geoJSON, gid, meta) {

  var blob=[];

  if(geoJSON == undefined) {
    window.console.log("makeCRMGeoJSONFeature, geoJSON is null for ", gid);
    return undefined;
  }

  if(Array.isArray(geoJSON)) { // parse each term
     geoJSON.forEach(function(s) {
        blob.push(JSON.parse(s));
     });
    } else {
      blob= [ geoJSON ];
  }
  

  var color= meta['color'];

  var a_trace={"type":"FeatureCollection", "features":[]};

  var cnt=blob.length;
  for(var i=0; i<cnt; i++) {
    var style= { "weight":2,
                 "opacity":0.8,
                 "color": color
                };
    var g=blob[i];

    var tmp= { "id":gid,
               "type":"Feature", 
               "properties": {
                   "metadataRow": getMetadataRowForDisplay(meta),
                   "style": style
               },
               "geometry": g 
             };

    a_trace.features.push(tmp);
  }
  crm_trace_list.push({"gid":gid, "trace":a_trace});

  return a_trace;
}
