/**
    cfm_misc_util.c

a) export 'active' fault's geo out into an external file CFM_geoJson.txt
b) import external geoJson.txt and create a groupLayer with optional name popup
c) import external latlon.csv with 'name' and create a group Layerof mulitple groups of points with different color 
**/

// *** specifically for CFM_web ***
function _trim_metadataRow(atrace) {
  var tmp = JSON.parse(JSON.stringify(atrace));
  var ttmp = tmp.features;
  var tttmp = ttmp[0].properties;
  var ttttmp = tttmp["metadataRow"];
  if(ttttmp != undefined) { 
    ((tmp.features)[0].properties)["metadataRow"]="{}";
  }
  return tmp;
}

// create CFM_geoJson.txt json file from cfm_trace_list.json
function dumpActiveCFMGeo() {
  var tracelist = [];
  var labellist = [];
  var fname="CFM_geoJson.txt";

  var csz=cfm_active_gid_list.length; // there is a search list result
  var tsz=cfm_trace_list.length;
  for(var i=0; i< tsz; i++) {
    var titem=cfm_trace_list[i];
    var gid=titem['gid'];
    var tracename=find_cfm_name_by_gid(gid);
    var atrace=titem['trace'];
    // either all, or has a active list
    if(!csz || in_active_gid_list(gid)) {
      labellist.push(tracename);
      var btrace=_trim_metadataRow(atrace);
      tracelist.push(btrace);
    }
  }
  if(tracelist.length) {
    dumpActiveGeo(fname, tracelist, labellist);
  }
}

function dumpActiveCRMGeo() {
  var tracelist = [];
  var labellist = [];
  var fname="CRM_geoJson.txt";

  var tsz=crm_trace_list.length;
  for(var i=0; i< tsz; i++) {
    var titem=crm_trace_list[i];
    var gid=titem['gid'];
    var tracename=find_crm_name_by_gid(gid);
    var atrace=titem['trace'];
    // either all, or has a active list
    labellist.push(tracename);
    tracelist.push(atrace);
  }

  if(tracelist.length) {
     dumpActiveGeo(fname, tracelist, labellist);
  }
}

function dumpActiveCTMGeo() {
  var tracelist = [];
  var labellist = [];
  var fname="CTM_geoJson.txt";

  var tsz=ctm_trace_list.length;
  for(var i=0; i< tsz; i++) {
    var titem=ctm_trace_list[i];
    var gid=titem['gid'];
    var tracename=find_ctm_name_by_gid(gid);
    var atrace=titem['trace'];
    //window.console.log("dumping ctm..",tracename);
    // either all, or has a active list
    labellist.push(tracename);
    tracelist.push(atrace);
  }
  if(tracelist.length) {
    dumpActiveGeo(fname, tracelist, labellist);
  }
}

function dumpActiveGeo(dumpname, trace_list, label_list) {

  var tsz=trace_list.length;
  var tlist=[];
  var i;
  for(var i=0; i< tsz; i++) {
    var atrace=trace_list[i];
    var tracename=label_list[i];
    var fsz=atrace.features.length;
    for(var j=0;j<fsz;j++) {
      atrace.features[j].properties.name=tracename;
    }
    tlist.push(atrace);
  }
  
  var dump={ 'trace_list': tlist }; 
  var dumpstring=JSON.stringify(dump);
  var dumpblob = new Blob([dumpstring], { type: "text/plain;charset=utf-8" });
  saveAs(dumpblob,dumpname);
}

// from a local file
function readLocalAndProcessActiveCFMGeo() {
  var url="data/CFM5.3.2_geoJson.txt";
  var blob=ckExist(url);
  var jblob=JSON.parse(blob);

  var trace_list= jblob["trace_list"];
  var cnt=trace_list.length;
  var i;
  for(i=0;i<cnt;i++) { 
     var atrace=trace_list[i];

// change the color
     var tcnt=atrace.features.length;
     for(var j=0; j<tcnt; j++) {
       atrace.features[j].properties.style.color="black";
       atrace.features[j].properties.style.weight=1;
     }
// SPECIAL CASE
//   atrace.features[0].properties.style.color="red"; // the first one in all traces
     var name= atrace.features[0].properties.name;
     window.console.log("adding trace.. ",name);
  }
  return _makeGeoGroup(trace_list);
}


// from an user selected client side file
function readAndProcessActiveGeo(urls) {
  var reader = new FileReader();

  reader.onload=function(event) {
    var evt = event.target.result; 
    var jblob= JSON.parse(reader.result);
    var trace_list= jblob["trace_list"];
    var cnt=trace_list.length;
    var i;
    for(i=0;i<cnt;i++) { 
       var atrace=trace_list[i];

       // change the color
       var tcnt=atrace.features.length;
       for(var j=0; j<tcnt; j++) {
         atrace.features[j].properties.style.color="orange";
       }
       var name= atrace.features[0].properties.name;
       window.console.log("adding trace.. ",name);
    }
//XX    return _makeGeoGroup(trace_list);
    return _addGeoGroupToMap(trace_list,viewermap);
  };
  reader.readAsText(urls[0]);
}

function _addGeoGroupToMap(traceList, mymap) {
   var group=_makeGeoGroup(traceList);
   mymap.addLayer(group);
   return group;
}

function _makeGeoGroup(traceList) {
   var cnt=traceList.length;
   window.console.log("number of importing traces ",cnt);
   var group = L.layerGroup();
   for(var i=0; i< cnt; i++) {
     var trace=traceList[i];
       var geoLayer=L.geoJSON(trace, {
         filter: function (feature, layer) {
           if (feature.properties) {
             var tmp=feature.properties.show_on_map != undefined ? !feature.properties.show_on_map : true;
             return tmp;
           }
           return false;
         },
         style: function(feature) {
           var tmp=feature.properties.style;
           if(feature.properties.style != undefined) {
             return feature.properties.style;
             } else {
               return {color: "#0000ff", "weight":2}
           }
         },
         onEachFeature: _bindPopupEachFeatureName
     });
     group.addLayer(geoLayer);
   } 
   return group;
}


// binding the 'detail' fault content
function _bindPopupEachFeatureName(feature, layer) {
    var popupContent="";
    layer.on({
        mouseover: function(e) {
          layer.setStyle({weight: 5});
        },
        mouseout: function(e) {
          layer.setStyle({weight: 1});
        },
        click: function(e) {
          if (feature.properties != undefined) {
            popupContent = feature.properties.name;
          }
          layer.bindPopup(popupContent);
        },
    });
}

// from a local file
function readLocalAndProcessActiveCRMGeo() {
  var url="data/CRM_geoJson.txt";
  var blob=ckExist(url);
  var jblob=JSON.parse(blob);

  var trace_list= jblob["trace_list"];
  var cnt=trace_list.length;
  var i;
  for(i=0;i<cnt;i++) { 
     var atrace=trace_list[i];
     var tcnt=atrace.features.length;
     for(var j=0; j<tcnt; j++) {
// make it lighter
       atrace.features[j].properties.style.weight=0.3;
     }
     var name= atrace.features[0].properties.name;
     window.console.log("adding trace.. ",name);
  }
  return _makeGeoGroup(trace_list);
}

function loadCRMRegions() {
  getCRMAllTraces();
}

function loadCTMRegions() {
  getCTMAllTraces();
}

//domain,xcoord,ycoord
//Peninsular Range (E),-114.53244,29.43361
function readAndLoadActiveLatlon(urls) {
  var reader = new FileReader();

  reader.onload=function(event) {
    var evt = event.target.result; 
    var ffline = reader.result.split('\n');
    var cnt=ffline.length;
    var fdata=[];
    if(cnt == 0) {
      window.console.log("ERROR, can not process the upload file ");
      return;
    }
    var is_csv=0;
    if(ffline[0].includes(","))
      is_csv=1;

    // skip the first one
    for(i=1;i<cnt;i++) {
       var fline=ffline[i];

       if(is_csv) {
         $.csv.toArray(fline, {}, function(err, data) {
           var v=data;
           if( v != "" ) {
             fdata.push(v);
           }
         });
       } else {
// space separated format
           var v=fline.split(' ');
           if( v != "" ) {
             fdata.push(v);
           } 
       }   
    }  
    let group=_makeRawLatlonGroup(fdata, 1);
    mymap.addLayer(group);
    return group;
  };
  reader.readAsText(urls[0]);
}

function readAndLoadLocalActiveLatlon() {

  var url="data/CRM_polygons_points_with_corrected_Rift_names_Mar112019.csv";
  var blob=ckExist(url);
  var ffline = blob.split('\n');
  var cnt=ffline.length;
  var fdata=[];
  if(cnt == 0) {
    window.console.log("ERROR, can not process the upload file ");
    return;
  }
  var is_csv=0;
  if(ffline[0].includes(","))
    is_csv=1;

  // skip the first one
  for(i=1;i<cnt;i++) {
     var fline=ffline[i];

     if(is_csv) {
       $.csv.toArray(fline, {}, function(err, data) {
         var v=data;
         if( v != "" ) {
           fdata.push(v);
         }
       });
     } else {
// space separated format
         var v=fline.split(' ');
         if( v != "" ) {
           fdata.push(v);
         } 
     }   
  }  
  let group=_makeRawLatlonGroup(fdata, 0);
  mymap.addLayer(group);

  return group;
}

/***???
function _addRawLatlonGroupToMap(fdataList, mymap) {
   var group=_makeRawLatlonGroup(fdataList, 0);
   mymap.addLayer(group);
   return group;
}
***/

function _makeRawLatlonGroup(fdataList, isheat) {
   var cnt=fdataList.length;
   window.console.log("number of importing points ",cnt);
   var group = L.layerGroup();

   for(var i=0; i<cnt;i++) {
     var item=fdataList[i];

     var name=item[0];
     var lon=parseFloat(item[1]);
     var lat=parseFloat(item[2]);
    
     var color=getHeatRegionColorWithName(name);
     if( isheat) {
       var color=getHeatRegionColorWithName(name);
       } else {
         var color=getRegionColorWithName(name);
     }
     if(color == undefined) {
        window.console.log("BAD -- no color for ", name);
        continue;
     }

const myCustomColour = '#583470'

const markerHtmlStyles = `
  background-color: ${color};
  width: 0.2rem;
  height: 0.2rem;
  display: block;
  opacity: 80%;
  position: relative;
  border-radius: 50%;
  border: 1px solid ${color};
  transform: rotate(45deg)`

const newIcon = L.divIcon({
  className: '',
  html: `<span style="${markerHtmlStyles}" />`
})


     var small_point_options = { icon : newIcon};

     var bounds = [lat,lon ];
     var marker = L.marker(bounds, small_point_options);

     var icon = marker.options.icon;
     icon.options.iconSize = [5, 5];
     marker.setIcon(icon);

     group.addLayer(marker);

   } 
   return group;
}


// >>Synchronous XMLHttpRequest on the main thread is deprecated
// >>because of its detrimental effects to the end user's experience.
//     url=http://localhost/data/synapse/segments-dummy.csv
function ckExist(url) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
 // okay
    }
  }
  http.open("GET", url, false);
  http.send();
  if(http.status !== 404) {
    return http.responseText;
    } else {
      return null;
  }
}


