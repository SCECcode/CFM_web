/***
   cfm_layer.js
***/
// control whether the main mouseover popup should be active or not
var skipPopup=false;

var default_color = "black";
var default_highlight_color = "red";
var default_weight = 2;
var default_zoom_threshold=5; 

//neon green var alternate_highlight_color = "#39FF14";
var alternate_highlight_color = "#FF9636";
var blind_dash_value = 6;

var original_style = {
    'color': default_color,
    'opacity':0.8,
    'weight': default_weight,
};

var highlight_style = {
    'color': default_highlight_color,
    'opacity':1,
    'weight': default_weight,
};

var blind_highlight_style = {
    'color': default_highlight_color,
    'opacity':1,
    'weight': default_weight,
    'dashArray': blind_dash_value
};


// for toggleAll option
var cfm_toggle_plot=1;

/***
   tracking data structure
***/
var use_fault_color = "default";
var use_download_set = "";

// [ { "abb": abb1, "name" : name1 }, {"abb": abb2, "name": name2 }, ... ]
var cfm_zone_list=[];

// [ { "abb": abb1, "name" : name1 }, {"abb": abb2, "name": name2 }, ... ]
var cfm_area_list=[];

// [ { "abb": abb1, "name" : name1 }, {"abb": abb2, "name": name2 }, ... ]
var cfm_section_list=[];

// abb for fault_tb is not reliable, use gid as unique id
// [ { "uid": gid1, "name" : name1 }, { "uid":gid2, "name": name2 }, ... ]
var cfm_name_list=[];

// [{ gid, name, url, objgid}, {gid, name, url, objgid}, ... ] gid that is from native list
var cfm_native_list=[];

// gid is objgid
// {gid, gid, ...}
var cfm_native_gid_list=[];

// [{ gid, name, url, objgid}, {gid, name, url, objgid}, ... ], gid that is from 500m list
var cfm_500m_list=[];

// gid is objgid
// {gid, gid, ...}
var cfm_500m_gid_list=[];

// [{ gid, name, url, objgid }, {gid, name, url, objgid}, ... ], gid that is from 1000m list
var cfm_1000m_list=[];

// gid is objgid
// {gid, gid, ...}
var cfm_1000m_gid_list=[];

// [{ gid, name, url, objgid }, {gid, name, url, objgid}, ... ], gid that is from 2000m list
var cfm_2000m_list=[];

// gid is objgid
// {gid, gid, ...}
var cfm_2000m_gid_list=[];

// gid is objgid
// { gid1, gid2, ... }, all objects 
var cfm_gid_list=[];

// all objgid ==> gid from object_tb, all objects
//  [ { "gid": gid1,  "meta": mmm1 }, {  "gid": gid2, "meta": mmm2 }, ... } 
var cfm_fault_meta_list=[];

// gid is objgid, trace is leaflet feature (1 per layer)
// [ {"gid": gid1, "trace": trace1 }, {"gid":gid2, "trace":trace2}... ], only with geo
var cfm_trace_list=[];

// gid is objgid, layer is geoLayer made from geoJSON with trace-feature 
// by leaflet
// [ {"gid": gid1, "layer": layer1 }, {"gid":gid2, "layer":layer2}...], only with geo
var cfm_layer_list=[];

// tracking original style state
// gid is objgid
// [ {"gid": gid1, "color": c1, "visible": vis1, "highlight": hl1 },...], only with geo
var cfm_style_list=[];

// gid is objgid
// { gid1, gid2, ... }, tracking current active search result, from all objects
var cfm_active_gid_list=[];

// gid is objgid
// { gid1, gid2, ... }, a copy of active_gid_list from the previous, for 'filter by'
var cfm_reference_gid_list=[]; 
// tracking map's zoom/position when the reference set is stored
var cfm_reference_map_center=[34.3,-118.4];
var cfm_reference_map_zoom=7;

// a set of bounding box composed of  2 lat lon locations
// for now, expect there is just 1 area only
// [ {"layer":layer1, "latlngs":[ {latA,lonA}, {latB,lonB}]},...];
var cfm_latlon_area_list=[];

// gid is obgid,
// { gid1, gid2, ... }, tracking which object is 'blind'
var cfm_blind_gid_list=[];

/*********************************************************
*********************************************************/
// quake_type,  Hauksson=1, Ross=2, Historical=3

const QUAKE_TYPE_HAUKSSON=1;
const QUAKE_TYPE_ROSS=2;
const QUAKE_TYPE_HISTORICAL=3;
const QUAKE_TYPE_BUCKET=4;

var showing_historical=0; // 0(none),1(large),2(small)

// for tracking groups of earthquakes for HISTORICAL dataset
var cfm_quake_historical_layer=null;
var cfm_quake_historical_latlng=[];
var cfm_quake_historical_description=[];

// Not USED
var cfm_quake_group=null;
// {"group_id":groupid, "trace":a_trace}
var cfm_quake_group_list=[];
   
/*********************************************************
*********************************************************/

function reset_geo_plot() {
  // can not really 'destroy' layer and so need to reuse..
  cfm_active_gid_list=[];
  reset_layer_list();  // unhighlight the layers and remove highlighted
                       // off the download queue and allfirst
  // reset_style_list();
  // generate the result table according to the style_list..
  // remove all the layer
  // redraw the layers
  cfm_toggle_plot=0;
  toggleAll();
}

// create a feature with a geoJSON or a geoJSONList, 
// per object_tb's gid
function makeGeoJSONFeature(geoJSON, blinds, gid, meta) {

  var blob=[];

  if(in_trace_list(gid)) {
    return undefined;
  }

  if(geoJSON == undefined) {
    window.console.log("makeGeoJSONFeature, geoJSON is null for ", gid);
    return undefined;
  }

  if(Array.isArray(geoJSON)) { // parse each term
     geoJSON.forEach(function(s) {
        blob.push(JSON.parse(s));
     });
    } else {
      blob= geoJSON;
  }
  
  var color=getColorFromMeta(meta);

//   if(color != "black") { window.console.log("special color...",gid,color); }

  var a_trace={"type":"FeatureCollection", "features":[]};
  var cnt=blinds.length;

  var geolist= makeGeoListFromBlob(blob, cnt);

  for(var i=0; i<cnt; i++) {
    var b=blinds[i];
    var style= { "weight": default_weight,
                 "opacity":0.8,
                 "color": color
                };
    if(b != 0 ) { 
      style.dashArray = blind_dash_value;
    }
    var g=geolist[i];

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

  cfm_trace_list.push({"gid":gid, "trace":a_trace});
  cfm_style_list.push({"gid":gid, "color":color ,"visible": 0, "highlight":0});

  return a_trace;
}

/* 1 set
[ {"type":"MultiLineString","coordinates":
[
[[-119.822286421156,34.5605513323743,548],[-119.829713797196,34.5616307222088,416],[-119.834759166436,34.5667231936276,548],[-119.837042048869,34.5681075432669,440
]]
]
}]
*/
function makeGeoListFromBlob(blob, cnt) {
   if(cnt == 1) {
     if(Array.isArray(blob)) {
       return blob;
     }
     return [ blob ];
   }

   if(!Array.isArray(blob)) { // it is merged coordinates
     if('type' in blob) {
         var newblob=[];
         var type=blob["type"];
         var coordinates=blob["coordinates"];
         for(var i=0; i<cnt; i++) {
            var citem=coordinates[i];
          var nblob= { "type": type, "coordinates": [citem] };
            newblob.push(nblob);
         }
         return newblob;
     } 
     } else { // do nothing and return the blob
     return blob;
   }
}


/* return true if target is in the trace list */
function find_style_list(target) {
   var found=0;
   cfm_style_list.forEach(function(element) {
     if ( element['gid'] == target )
        found=element;
   });
   return found;
}

// reset to style with new weight in all layer   
function change_fault_weight(nval) {
  cfm_layer_list.forEach(function(element) {
    var gid=element['gid'];
    var gstyle=find_style_list(gid);
    var gcolor=gstyle['color'];
    var geolayer=element['layer'];
    geolayer.eachLayer(function(layer) {
      layer.setStyle({weight:nval});
    });
  });
}

// reset to style with new color
// in both cfm_style_list and also in all layer -- but not
// the highlighted one
function reset_fault_color() {
  // reset fault color in the style list
  var new_cfm_style_list=[];
  cfm_style_list.forEach(function(element) {
    var gid=element['gid'];
    var gmeta=find_meta_list(gid);
    var newcolor=getColorFromMeta(gmeta['meta']);
    var vis=element['visible'];
    var hl=element['highlight'];
    new_cfm_style_list.push({"gid":gid, "color":newcolor, "visible": vis, "highlight":hl})
  });
  cfm_style_list=new_cfm_style_list;

  cfm_layer_list.forEach(function(element) {
    var gid=element['gid'];
    var gstyle=find_style_list(gid);
    var gcolor=gstyle['color'];
    var v=gstyle['visible'];
    var h=gstyle['highlight'];
    if(!h) {
      var geolayer=element['layer'];
      geolayer.eachLayer(function(layer) {
      layer.setStyle({color:gcolor});
      }); 
      } else {
        gstyle['dirty_style']=true;
    }
  });
}

function set_fault_color_alternate() {
  var tmp=highlight_style;
  highlight_style.color = alternate_highlight_color;
  blind_highlight_style.color = alternate_highlight_color;
}

function set_fault_color_default() {
  var tmp=highlight_style;
  highlight_style.color = default_highlight_color;
  blind_highlight_style.color = default_highlight_color;
}

function reset_style_list() {
   cfm_style_list.forEach(function(element) {
     element['visible ']=1;
     element['highlight']=0;
   });
}

function remove_layer_list() {
  cfm_layer_list.forEach(function(element) {
      var l=element['layer'];
      viewermap.removeLayer(l);
  });
}


function get_feature(gid) {
  var cnt=cfm_trace_list.length;
  for(var i=0; i<cnt; i++) {
    var element=cfm_trace_list[i];
    var g=element['gid'];
    if (gid == element['gid']) {
       var trace=element["trace"];
       return trace;
    }
  }
  return {};
}

//layer.bindPopup(layer.feature.properties.name);

// unbind layer's popup on detail content
function unbind_layer_popup() {
  cfm_layer_list.forEach(function(element) {
    var geolayer=element['layer'];
    geolayer.eachLayer(function(layer) {
       unbindPopupEachFeature(layer);
    });
  });
}

// rebind layer's popup on detail content
function rebind_layer_popup() {
  cfm_layer_list.forEach(function(element) {
    var geolayer=element['layer'];
    geolayer.eachLayer(function(layer) {
       var feature=layer.feature;
       bindPopupEachFeature(feature,layer);
     }); 
  });
}

// supply a name, find the uid from cfm_name_list
function find_uid_by_name(target) {
   var found=[];
   let sz=cfm_name_list.length;
   for(let i=0; i<sz; i++) { 
     let item=cfm_name_list[i];
     if(item['name'] == target) {
       found.push(item['uid']);
     }
   }
   return found; 
}

function find_name_by_uid(target) {
   var found=[];
   let sz=cfm_name_list.length;
   for(let i=0; i<sz; i++) { 
     let item=cfm_name_list[i];
     if(item['uid'] == target) {
       found.push(item['name']);
     }
   }
   return found;

}

function find_dip_by_gid(target) {
   var found="NA";
   var item=find_meta_list(target);
   if(item) {
      var meta=item['meta'];
      found=parseFloat(meta['avg_dip']);
   } 
   return found;
}

function find_strike_by_gid(target) {
   var found="NA";
   var item=find_meta_list(target);
   if(item) {
      var meta=item['meta'];
      found=parseFloat(meta['avg_strike']);
   } 
   return found;
}

function find_name_by_gid(target) {
   var found="NA";
   var item=find_meta_list(target);
   if(item) {
      var meta=item['meta'];
      found=meta['name'];
   } 
   return found;
}

function find_gid_by_fault(target) {
   let sz= cfm_fault_meta_list.length;
   for(let i=0; i<sz; i++) {
     let element=cfm_fault_meta_list[i];
     let meta=element['meta'];
     if ( meta['fault'] == target ) {
        return element['gid'];
     }
   }
   return -1;
}

function find_gid_by_name(target) {
   let sz= cfm_fault_meta_list.length;
   for(let i=0; i<sz; i++) {
     let element=cfm_fault_meta_list[i];
     let meta=element['meta'];
     if ( meta['name'] == target ) {
        return element['gid'];
     }
   }
   return -1;
}


function find_pretty_name_by_gid(target) {
   var found="NA";
   var item=find_meta_list(target);
   if(item) {
      var meta=item['meta'];
      found=meta['fault'];
   } 
   return found;
}
   

/* return true if target is in the meta list */
function find_meta_list(target) {
   let sz=cfm_fault_meta_list.length;
   for(let i=0; i<sz; i++) {
     let element=cfm_fault_meta_list[i];
     if ( element['gid'] == target )
        return element;
   }
   return 0;
}

/* return true if target is visible on map */
function is_vis_by_gid(target) {
   var found=0;
   var s=find_style_list(target);
   if( s['visible']==1 ) {
     found=1;
   }
   return found;
}


function reset_download_set()
{
   use_download_set = "";
}

function get_meta_list(gidlist) {
   var mlist=[];
   gidlist.forEach(function(gid) {
     var m=find_meta_list(gid);
     mlist.push(m['meta']);
   });
   return mlist;
}

/* return true if target is in the trace list */
function in_trace_list(target) {
   var found=0;
   cfm_trace_list.forEach(function(element) {
     if ( element['gid'] == target )
        found=1;
   });
   return found;
}

/* return true if target is in the active list */
function in_active_gid_list(target) {
   var found=0;

   if(cfm_active_gid_list.length == 0)
     return found;

   cfm_active_gid_list.forEach(function(element) {
     if ( element == target )
        found=1;
   });
   return found;
}

/* return true if target is in the reference active list */
function in_reference_gid_list(target) {
   var found=0;

   if(cfm_reference_gid_list.length == 0)
     return found;

   cfm_reference_gid_list.forEach(function(element) {
     if ( element == target )
        found=1;
   });
   return found;
}


function get_current_strike_range() {
   let len=cfm_gid_list.length;
   let i;
   // init to opposite
   var active_max=strike_range_min_ref;
   var active_min=strike_range_max_ref;
   for( i=0; i<len; i++) {
      var gid=cfm_gid_list[i];
      // use if only if the gid is visible
      if( is_vis_by_gid(gid) ) {
        var strike=find_strike_by_gid(gid);
        if(strike > active_max)
           active_max=strike;
        if(strike < active_min)
           active_min=strike;
      }
   }
   return [active_min, active_max];
} 

function get_current_dip_range() {
   let len=cfm_gid_list.length;
   let i;
   var active_max=dip_range_max;
   var active_min=dip_range_min;
   for( i=0; i<len; i++) {
      var gid=cfm_gid_list[i];
      if( is_vis_by_gid(gid) ) {
        var dip=find_dip_by_gid(gid);
        if(dip > active_max)
          active_max=dip;
        if(dip < active_min)
          active_min=dip;
      }
   }
   return [active_min, active_max];
} 

// find a layer from the layer list
function find_layer_list(target) { 
   let sz=cfm_layer_list.length;
   for(let i=0; i<sz; i++) {
     let element=cfm_layer_list[i];
     if ( element['gid'] == target )
        return element;
   }
   return null;
}

// just in case the layer's color got set to highlight
function reset_layer_list() { 
   cfm_layer_list.forEach(function(element) {
     var gid=element['gid'];
     var s=find_style_list(gid);
     if( s['highlight']==1 && s['visible']==1 ) {
       toggle_highlight(gid,0);
       addRemoveFromDownloadQueue(gid);
       addRemoveFromMetadataTable(gid);
     }
     var l=find_layer_list(gid);
     var geolayer=l['layer'];
     var s=find_style_list(gid);
     var style=s['style'];
     geolayer.eachLayer(function(layer) {
             layer.setStyle(style);
     });
   });
}

// select every layer
function select_layer_list() {
   cfm_layer_list.forEach(function(element) {
     var gid=element['gid'];
     var s=find_style_list(gid);
     if( s['highlight']==0 && s['visible']==1 ) {
       toggle_highlight(gid,0);
     }
   });
}

function find_style_list(target) { 
   var found="";
   cfm_style_list.forEach(function(element) {
     if ( element['gid'] == target )
        found=element;
   });
   return found;
}

function get_highlight_list() {
   var hlist=[];
   cfm_style_list.forEach(function(element) {
     if( element['highlight']==1 ) {
       hlist.push(element['gid']);
     }
   });
   return hlist;
}


function toggleOnDownloadQueue(event) {
    let rowElem = $(this).parents("tr");
    let gid_string = rowElem.attr("id");
    let gid_string_components = gid_string.split("_");
    let gid = gid_string_components[1];
    addRemoveFromDownloadQueue(gid);

}

function addRemoveFromDownloadQueue(gid) {
    // let downloadQueueElem = $("#download-queue");
    // let downloadCounterElem = $("#download-counter");
    // let faultName = $("#row_"+gid).find("td:nth-child(3) label").html();
    // var s = find_style_list(gid);
    // var h = s['highlight'];
    // if (h == 0) {
    //     // exists, remove it
    //     let elemToRemove = downloadQueueElem.find("li[data-fault-id=" + gid + "]");
    //     elemToRemove.remove();
    // } else {
    //     downloadQueueElem.prepend("<li data-fault-id='" + gid + "' >" + faultName + "</li>");
    // }

    let downloadCounterElem = $("#download-counter");
    let plotCounterElem = $("#plot-counter");
    let buttonElem = $("#download-all");
    let button2Elem = $("#plot3d-all"); // linked with download-all
    let placeholderTextElem = $("#placeholder-row");
    if (cfm_select_count <= 0) {
        downloadCounterElem.hide();
        plotCounterElem.hide();
        buttonElem.prop("disabled", true);
        button2Elem.prop("disabled", true);
        placeholderTextElem.show();
    } else {
       downloadCounterElem.show();
       plotCounterElem.show();
       buttonElem.prop("disabled", false);
       button2Elem.prop("disabled", false);
       placeholderTextElem.hide();
    }
    downloadCounterElem.html("(" + cfm_select_count + ")");
    plotCounterElem.html("(" + cfm_select_count + ")");
}

function addRemoveFromMetadataTable(gid) {
    var targetElem = $("#metadata-"+gid);
    var s = find_style_list(gid);
    var h = s['highlight'];
    let features_object = get_feature(gid);
    let metadataRow = features_object.features[0].properties.metadataRow;

    if (h == 0) {
        // exists, remove it
        targetElem.remove();
    } else {
        $("#metadata-viewer tbody").prepend(metadataRow);
        $("#metadata-viewer").trigger('reflow');
        if (!select_all_flag) {
            $(`#metadata-viewer tbody tr#metadata-${gid}`).effect("highlight", {}, 1000);
        }
    }
}

function toggle_highlight(gid,auto=0) {
   var s=find_style_list(gid);
   if (s == '') {
      return;
   }

   var h=s['highlight'];
   let $star=$(`#highlight_${gid}`);
   let $rowSelected = $(`#row_${gid}`);
   let $itemCount = $("#itemCount");

   if ($rowSelected.hasClass("layer-hidden")) {
       return;
   }

   if(h==0) {

     if(auto) { // autoscroll the table
       var id = "row_"+gid;
       var elm = document.getElementById(id);
       var prev = elm.previousElementSibling;
       if(prev) {
         prev.scrollIntoView(true);
       }
     }

     $rowSelected.addClass("row-selected");
     $star.removeClass('glyphicon-unchecked').addClass('glyphicon-check');
     s['highlight']=1;
     var l=find_layer_list(gid);
     var geolayer=l['layer'];

     geolayer.eachLayer(function(layer) {
       layer.setStyle({color: highlight_style.color});
     });
     cfm_select_count++;
     // adjust width if needed
     $itemCount.html(cfm_select_count).show();
/* get actual rendered font/width
     var fs = $('#itemCount').html(cfm_select_count).css('font-size');
     var width = $('#itemCount').html(cfm_select_count).css('width');
*/
     if(cfm_select_count == 100)
        $itemCount.html(cfm_select_count).css("width","30px");
     } else {
       $star.removeClass('glyphicon-check').addClass('glyphicon-unchecked');
       $rowSelected.removeClass("row-selected");
       if(cfm_select_count == 99) // reset font size
         $itemCount.html(cfm_select_count).css("width","20px");
       cfm_select_count--;
       if(cfm_select_count == 0) {
         $itemCount.html(cfm_select_count).hide();
         } else {
           $itemCount.html(cfm_select_count).show();
       }
       s['highlight']=0;
       var l=find_layer_list(gid);
       var geolayer=l['layer'];
       var v=s['visible'];
       var ocolor=s['color'];
       if(v) {
          geolayer.eachLayer(function(layer) {
            layer.setStyle({color:ocolor});
          }); 
       }
   }

    addRemoveFromDownloadQueue(gid);
    addRemoveFromMetadataTable(gid);
}

function get_leaflet_id(layer) {
   var id=layer['layer']._leaflet_id;
   return id;
}

function find_trace_list(gid) { 
   let sz=cfm_trace_list.length; 
   for(let i=0; i<sz; i++) {
     let element=cfm_trace_list[i];
     if ( element['gid'] == gid )
        return element;
   }
   return undefined;
}

function load_a_trace(gid,trace) {

  let layer, done=0;

  var t=find_layer_list(gid);
  if(t) {
    window.console.log("already plotted this layer", gid);
    return;
  }
  [layer, done]=addGeoToMap(trace, viewermap);
  var s =find_style_list(gid);
  if( s == undefined ) {
     window.console.log("BAD!! load_a_trace..", gid);
     return;
  }
  cfm_layer_list.push({"gid":gid, "layer":layer}); 
  s['visible']=1; // turn it on
  if(done) { setupPresetMode(); }
}

function load_trace_list()
{
  let layer, done=0;
  var sz=cfm_trace_list.length;
  for (var i=0; i<sz; i++) {
     var c=cfm_trace_list[i];
     var gid=c['gid'];
     var trace =c['trace'];
     // if it is there already, don't add
     var t=find_layer_list(gid);
     if(t) {
        window.console.log("already plotted this layer", gid);
        continue;
     }
     [layer, done]=addGeoToMap(trace, viewermap);
     cfm_layer_list.push({"gid":gid, "layer":layer}); 
     var s =find_style_list(gid);
     s['visible']=1; // turn it on
     if(done) { setupPresetMode(); }
  }
}

function in_500m_gid_list(target) {
   let sz=cfm_500m_gid_list.length;
   for(let i=0; i<sz; i++) {
     if (cfm_500m_gid_list[i]==target) {
       return 1;
     }
   }
   return 0;
}

function url_in_500m_list(target) {
   let sz=cfm_500m_list.length; 
   for(let i=0; i<sz; i++) {
      let element=cfm_500m_list[i];
      if(element['objgid']==target) {
        return element['url'];
      }
   }
   return null;
}

function in_1000m_gid_list(target) {
   let sz=cfm_1000m_gid_list.length;
   for(let i=0; i<sz; i++) {
     if( cfm_1000m_gid_list[i] == target) {
        return 1;
     }
   }
   return 0;
}

function in_2000m_gid_list(target) {
   let sz=cfm_2000m_gid_list.length;
   for(let i=0; i<sz; i++) {
     if( cfm_2000m_gid_list[i] == target) {
        return 1;
     }
   }
   return 0;
}

function url_in_1000m_list(target) {
   let sz=cfm_1000m_list.length;
   for(let i=0; i<sz; i++) {
     let element=cfm_1000m_list[i];
     if(element['objgid']==target) {
       return element['url'];
     }
   }
   return null;
}

function url_in_2000m_list(target) {
   let sz=cfm_2000m_list.length;
   for(let i=0; i<sz; i++) {
     let element=cfm_2000m_list[i];
     if(element['objgid']==target) {
       return element['url'];
     }
   }
   return null;
}

function in_native_gid_list(target) {
   let sz=cfm_native_gid_list.length;
   for(let i=0; i<sz; i++) {
     if(cfm_native_gid_list[i]== target) {
       return 1;
     }
   }
   return 0;
}

function url_in_native_list(target) {
   let sz=cfm_native_list.length;
   for(let i=0; i<sz; i++) {
     let element=cfm_native_list[i];
     if(element['objgid']==target) {
       return element['url'];
     }
   }
   return null;
}

// toggle off everything except if there
// is a set of search result..
function toggle_off_all_layer()
{
  var sz=cfm_style_list.length;
  if (sz==0) return;
  for (var i=0; i<sz; i++) {
     var s=cfm_style_list[i];
     var vis=s['visible'];
     var gid=s['gid'];
     if(vis == 1) { 
        toggle_layer(gid) 
     }
  }
  cfm_toggle_plot=0;
  // turn off the btn --
  $('#allBtn span').removeClass("glyphicon-check").addClass("glyphicon-unchecked");
}

function toggle_layer_with_list(glist)
{
  var sz=glist.length;
  if (sz==0) return;
  for (var i=0; i<sz; i++) {
     var gid=glist[i];
     var s=find_style_list(gid);
     if(s == undefined)
        continue;
     var vis=s['visible'];
     var gid=s['gid'];
     if(vis == 0) { 
         toggle_layer(gid) 
     }
  }
}

// make every layer visible
function toggle_on_all_layer()
{
  var sz=cfm_style_list.length;
  if (sz==0) return;
  for (var i=0; i<sz; i++) {
     var s=cfm_style_list[i];
     var vis=s['visible'];
     var gid=s['gid'];
     if(vis == 0) { 
       toggle_layer(gid); 
          // mark only in active search list
       if(in_active_gid_list(gid)==1) { 
          s['dirty_visible']=true;
       }
     }
  }
}

function toggle_layer(gid)
{
  var c=find_layer_list(gid);
  var s=find_style_list(gid);
  var t=find_trace_list(gid);
  var geolayer=c['layer'];
  var vis=s['visible'];
  var eye='#'+"toggle_"+gid;
  let toggledRow = '#row_'+gid;

  if(vis == 1) {
      if ($(toggledRow).hasClass("row-selected")) {
            toggle_highlight(gid);
      }

    $(eye).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
    $(toggledRow).addClass("layer-hidden");
    viewermap.removeLayer(geolayer);
    visibleFaults.removeLayer(geolayer);
    s['visible'] = 0;
    } else {
      $(toggledRow).removeClass("layer-hidden");
      if( s['dirty_visible'] != undefined ){ // do nothing
        s['dirty_visible'] = undefined;
        return;
      }
      s['visible'] = 1;
      $(eye).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
      viewermap.addLayer(geolayer);
      visibleFaults.addLayer(geolayer);
// if style is dirty, needs to be updated from the stylelist..
      if( s['dirty_style'] !=  undefined ) {
        var style=s['style'];
        geolayer.eachLayer(function(layer) {
          layer.setStyle(style);
        }); 
        s['dirty_style']=undefined;
      }
  }
}

function add_bounding_rectangle(a,b,c,d) {
  // remove old one and add a new one
  remove_bounding_rectangle_layer();
  var layer=addRectangleLayer(a,b,c,d);
  var tmp={"layer":layer, "latlngs":[{"lat":a,"lon":b},{"lat":c,"lon":d}]};
  cfm_latlon_area_list.push(tmp);
}

function remove_bounding_rectangle_layer() {
   if(cfm_latlon_area_list.length == 1) {
     var area=cfm_latlon_area_list.pop();
     var l=area["layer"]; 
     viewermap.removeLayer(l);
   }
}

function add_bounding_rectangle_layer(layer, a,b,c,d) {
  // remove old one and add a new one
  remove_bounding_rectangle_layer();
  var tmp={"layer":layer, "latlngs":[{"lat":a,"lon":b},{"lat":c,"lon":d}]};
  set_latlons(a,b,c,d);
  cfm_latlon_area_list.push(tmp);
}

/*********************************************************
 42 of them, significant historic earthquakes (>M6) since 1900
*********************************************************/
function makeHistoricalEQLayer() {
   // create a group layer with many marker within..
   //   collect up latlng, description list, "red"
   cfm_quake_historical_layer=addMarkerLayerGroup(
                           cfm_quake_historical_latlng,
                           cfm_quake_historical_description, 6);
};

function toggleHistorical() {
   if(showing_historical) {
     removeHistoricalEQLayer();
     } else {
       addHistoricalEQLayer();
   }
}

function removeHistoricalEQLayer() {
    viewermap.removeLayer(cfm_quake_historical_layer);
    showing_historical=false;
}

function addHistoricalEQLayer() {
    if(showing_historical)
      return;

    if(cfm_quake_historical_layer==null) {
      makeHistoricalEQLayer();
      } else {
        viewermap.addLayer(cfm_quake_historical_layer);
    }
    showing_historical=true;
}

// NOT USED:
// with array of quake info in JSONs
// groupping can be by mag, by date, or by depth
function makeQuakeGeoJSONFeature(groupid,quakeJSONArray,pointSize,pointColor) {

  if(quakeJSONArray == undefined) {
    window.console.log("makeQuakeGeoJSONFeature, quakeJSONArray is null");
    return undefined;
  }

  if(!Array.isArray(quakeJSONArray)) { // parse each term
    window.console.log("makeQuakeGeoJSONFeature, quakeJSONArray should be an array");
    return undefined;
  }
     
  var a_trace={"type":"FeatureCollection", "features":[]};
  var cnt=quakeJSONArray.length;

  var eventid=[];
  var mag=[];
  var event=[];
  var depth=[];
  var eventtime=[];
  var latlngs=[];
  
  for(var i=0; i<cnt; i++) {
    let json=quakeJSONArray[i];
    mag.push(json['Mag']);
    depth.push(json['Depth']);
    eventtime.push(json['EventTime']);
    eventid.push(json['EventID']);
    var lat=parseFloat(json['Lat']);
    var lon=parseFloat(json['Lon']);
    latlngs.push([lon,lat]);
  }

  var g=makeMultiPointGeo(latlngs);

  var style= { "weight":pointSize,
                 "opacity":0.6,
                 "color":pointColor
                };

  var tmp= { "id":groupid,
               "type":"Feature", 
               "properties": {
                   "meta": { "eventid": eventid,"mag":mag, "eventtime":eventtime,"depth":depth,"latlng":latlngs },
                   "style": style
               },
               "geometry": g 
            };

  a_trace.features.push(tmp);

  cfm_quake_group_list.push({"group_id":groupid, "trace":a_trace});

  return a_trace;
}

/* 1 set
[ {"type":"MultiPoint","coordinates":
[[-119.822286421156,34.5605513323743,548],[-119.829713797196,34.5616307222088,416],[-119.834759166436,34.5667231936276,548],[-119.837042048869,34.5681075432669,440
]]
}]
*/
function makeMultiPointGeo(latlngs) {
  var geo= { "type":"MultiPoint", "coordinates": latlngs };
  return geo;
}
