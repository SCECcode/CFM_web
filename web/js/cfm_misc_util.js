
/**
    cfm_misc_util.c

a) export 'active' fault's geo out into an external file CFM5.2_geoJson.txt
b) import external geoJson.txt and create a groupLayer with optional name popup
c) import external latlon.csv with 'name' and create a group Layerof mulitple groups of points with different color 
**/

// create 2 json files cfm_style_list.json, cfm_trace_list.json
// of current active faults on the leaflet map
function dumpActiveGeo() {
  var f = new Date().getTime();
  var ff= f.toString();
  var dumpname="CFM5.2_geoJson.txt"; 

  var csz=cfm_active_gid_list.length;

  var tsz=cfm_trace_list.length;
  var i;
  var tlist=[];
  var cnt=0;
  for(i=0; i< tsz; i++) {
    var titem=cfm_trace_list[i];
    var gid=titem['gid'];
    var tracename=find_name_by_gid(gid);
    var atrace=titem['trace'];
    // either all, or has a active list
    if(!csz || in_active_gid_list(gid)) {
      cnt=cnt+1;
      atrace.features[0].properties.name=tracename;
      tlist.push(atrace);
    }
  }
  if(cnt == 0) { // no active faults
    return;
  }
  
  var dump={ 'cfm_trace_list': tlist }; 
  var dumpstring=JSON.stringify(dump);
  var dumpblob = new Blob([dumpstring], { type: "text/plain;charset=utf-8" });
  saveAs(dumpblob,dumpname);
}

function readAndProcessActiveGeo(urls) {

  var reader = new FileReader();

  reader.onload=function(event) {
    var evt = event.target.result; 
    var jblob= JSON.parse(reader.result);
    var trace_list= jblob["cfm_trace_list"];
    var cnt=trace_list.length;
    var i;
    for(i=0;i<cnt;i++) { 
       var atrace=trace_list[i];

       // change the color
       atrace.features[0].properties.style.color="orange";
       var name= atrace.features[0].properties.name;
       window.console.log("adding trace.. ",name);
    }
    addGeoGroupToMap(trace_list, viewermap);
  };
  reader.readAsText(urls[0]);
}

function addGeoGroupToMap(cfmTraceList, mymap) {
   var cnt=cfmTraceList.length;
   window.console.log("number of importing faults ",cnt);
   var group = L.layerGroup();
   for(var i=0; i< cnt; i++) {
     var cfmTrace=cfmTraceList[i];
       var geoLayer=L.geoJSON(cfmTrace, {
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
         onEachFeature: bindPopupEachFeatureName
     });
     group.addLayer(geoLayer);
   } 
   mymap.addLayer(group);
}

// binding the 'detail' fault content
function bindPopupEachFeatureName(feature, layer) {
    var popupContent="";
    layer.on({
        click: function(e) {
          if (feature.properties != undefined) {
            popupContent = feature.properties.name;
          }
          layer.bindPopup(popupContent);
        },
    });
}

//domain,xcoord,ycoord
//Peninsular Range (E),-114.53244,29.43361
function readAndProcessActiveLatlon(urls) {
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
    addRawLatlonGroupToMap(fdata, viewermap);

  };
  reader.readAsText(urls[0]);
}

//domain,xcoord,ycoord
//Peninsular Range (E),-114.53244,29.43361
function addRawLatlonGroupToMap(fdataList, mymap) {
   var cnt=fdataList.length;
   window.console.log("number of importing points ",cnt);
   var group = L.layerGroup();

   for(var i=0; i<cnt;i++) {
     var item=fdataList[i];

     var name=item[0];
     var lon=parseFloat(item[1]);
     var lat=parseFloat(item[2]);
    
     var color=getRegionColorWithName(name);
     if(color == undefined) {
        window.console.log("BAD -- no color for ", name);
        continue;
     }

const myCustomColour = '#583470'

const markerHtmlStyles = `
  background-color: ${color};
  width: 0.4rem;
  height: 0.4rem;
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
   mymap.addLayer(group);
}


