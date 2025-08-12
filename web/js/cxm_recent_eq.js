/***
   cxm_recent_eq.js

   recent eq layer extracted from USGS service

***/

/**********************************************************/

// for tracking groups of recent earthquakes 
// this holds the points layers as one
var cxm_recent_quake_layer=null;
// json {'id':eq_id, 'layer':layer }
var cxm_recent_quake_group_list=[];

var showing_recent_quake=false;
var recent_quake_count=0;
var enableCluster=false;
var use_markerCluster=0;

var RECENT_EQ_COUNT_LIMIT = 2000;
// in magtype == ml, conver on mw if within 3.5/6.5 range
var RECENT_EQ_MAG_MAX = 0;
var RECENT_EQ_MAG_MIN = 0;
var RECENT_EQ_COUNT = 0;

// recent_eq_region={"layer":layer, "latlngs":[{"lat":a,"lon":b},{"lat":c,"lon":d}]};
// this holds the layer that has the 'region boundary'
var recent_eq_region=null;

var eq_marker_colors = {
    //normal: '#006E90', // original
    normal: '#FF4207', // original
    selected: '#B02E0C',
    abnormal: '#00FFFF',
};

var eq_marker_style = {
    normal: {
        color: "white",
        fillColor: eq_marker_colors.normal,
        fillOpacity: 1,
        radius: 3,
        riseOnHover: true,
        weight: 1,
    },
    selected: {
        color: "white",
        fillColor: eq_marker_colors.selected,
        fillOpacity: 1,
        radius: 3,
        riseOnHover: true,
        weight: 1,
    },
    hover: {
        fillOpacity: 1,
        radius: 10,
        weight: 2,
    },
};


/**********************************************************************/

function recentEQ_markLatlon() {

  if(skipPopup == false) { // enable marking
    clear_popup();
    skipPopup = true;
    drawing_rectangle=true;
    drawRectangle();
    unbind_layer_popup();
    $('#markerEQBtn').css("color","red");
    } else {
       skipPopup = false;
       drawing_rectangle=false;
       skipRectangle();
       $('#markerEQBtn').css("color","blue");
       rebind_layer_popup();
  }
}

// turn off markLatlon 
function recentEQ_off_markLatlon() {
  if(drawing_rectangle) {
    skipPopup = false;
    $('#markerEQBtn').css("color","blue");
    drawing_rectangle=false;
    skipRectangle();
    rebind_layer_popup();
  }
  recentEQ_on_bounding_rectangle_layer();
}


function recentEQ_remove_bounding_rectangle_layer() {
   if(recent_eq_region != null) {
     let layer=recent_eq_region["layer"];
     viewermap.removeLayer(layer);
     recent_eq_region=null;
   }
}

function recentEQ_add_bounding_rectangle(a,b,c,d) {
  // remove old one and add a new one
  recentEQ_remove_bounding_rectangle_layer();
  var layer=makeRectangleLayer(a,b,c,d);
  recent_eq_region={"layer":layer, "latlngs":[{"lat":a,"lon":b},{"lat":c,"lon":d}]};
  recentEQ_set_latlons(a,b,c,d);
}

// just not showing it
function recentEQ_off_bounding_rectangle_layer() {
   if(recent_eq_region != null) {
     let layer=recent_eq_region["layer"];
     viewermap.removeLayer(layer);
   }
}

function recentEQ_on_bounding_rectangle_layer() {
   if(recent_eq_region != null) {
     let layer=recent_eq_region["layer"];
     viewermap.addLayer(layer);
// put it at the very back
     layer.bringToBack();	  

     if (layer.getBounds().isValid()) {
       zoom2Bounds(layer.getBounds());
     }
   }
}

function recentEQ_add_bounding_rectangle_layer(layer, a,b,c,d) {
  // remove old one and add a new one
  recentEQ_remove_bounding_rectangle_layer();
  recentEQ_add_bounding_rectangle(a,b,c,d); // add the gray one
  recentEQ_on_bounding_rectangle_layer();
}


/**********************************************************************/
function makeARecentEQMarker(data) {
  let longitude=data.coord[0];
  let latitude= data.coord[1];
  let depth=data.coord[2];
  let time=data.time;
  let mag=data.mag;
  let magtype=data.magtype;
  let loc=data.place;                                          
  let id=data.id;

  let utmCoords=fromLatLon(latitude, longitude);
  let utmEasting=utmCoords.easting.toFixed(2);
  let utmNorthing=utmCoords.northing.toFixed(2);
  let utmZoneNum=utmCoords.zoneNum;
  let utmZoneLetter=utmCoords.zoneLetter;

  let sourceZ=utmZoneNum+utmZoneLetter;
  
  let marker = makeLeafletEQCircleMarker([latitude, longitude], eq_marker_style.normal);
  let eq_info = `${id}`;
  marker.bindTooltip(eq_info).openTooltip();
  let tmp=new Date(time).toLocaleString();


  marker.bindPopup("<strong>Recent Earthquake</strong><br><strong>Location: </strong>"+loc+"<br><strong>When: </strong>"+ tmp +"<br><strong>Magnitude: </strong>"+mag+" ("+magtype+")<br><strong>Depth: </strong>"+depth+" (km)<br><strong>Location: </strong> ("+longitude+", "+latitude+")<br><strong>ID: </strong> <a href=\"https://earthquake.usgs.gov/earthquakes/eventpage/"+id+"/executive\" target=\"_blank\">"+id+"</a>",{maxWidth: 500});

 // marker.bindPopup("<strong>Recent Earthquake</strong><br><strong>Location: </strong>"+loc+"<br><strong>When: </strong>"+ tmp +"<br><strong>Magnitude: </strong>"+mag+" ("+magtype+")<br><strong>Depth: </strong>"+depth+" (km)<br><strong>Location: </strong> ("+longitude+", "+latitude+")<br><strong>ID: </strong>"+id,{maxWidth: 500});

  marker.scec_properties = {
                    time: tmp,
                    longitude: longitude,
                    latitude: latitude,
                    "depth(km)": depth,
                    magnitude: mag,
                    magtype: magtype,
	            loc: loc,
	            utmeasting: utmEasting,
	            utmnorthing: utmNorthing,
	            utmzonenumber: utmZoneNum,
	            utmzoneletter: utmZoneLetter,
	            id: id
                  };
	

/* convert to mw for everything
   (for california)
    Mw = 0.85 Ml + 0.33
    Mw = 0.67 Md + 1.14

   SKIP conversion and use given as comparable equals

  let tmp_mag=parseFloat(mag);
  let tmp_magtype= magtype;
  { 
    if(tmp_magtype == "ml") {
       tmp_mag= (0.85 * tmp_mag)+ 0.33;
       tmp_magtype = "mw";
    } 
    if(tmp_magtype == "md") {
       tmp_mag= (0.67 * tmp_mag)+ 1.14;
       tmp_magtype = "mw";
    } 
    if(tmp_magtype == "mw") {
      if(RECENT_EQ_MAG_MIN == 0 || tmp_mag < RECENT_EQ_MAG_MIN) { RECENT_EQ_MAG_MIN=tmp_mag; }
      if(tmp_mag > RECENT_EQ_MAG_MAX) {	RECENT_EQ_MAG_MAX=tmp_mag; }
      marker.scec_properties.mag_mw=tmp_mag;  // magnitude in ml
      } else {
        window.console.log("  XXX can not process %s due to magtype\n",id); 
        marker.scec_properties.mag_mw=0;  // magnitude in ???
    }
  }
  ***********/
  let tmp_mag=parseFloat(mag);
  if(RECENT_EQ_MAG_MIN == 0 || tmp_mag < RECENT_EQ_MAG_MIN) { RECENT_EQ_MAG_MIN=tmp_mag; }
  if(tmp_mag > RECENT_EQ_MAG_MAX) { RECENT_EQ_MAG_MAX=tmp_mag; }

  if(sourceZ == "10S" || sourceZ == "10T" ) {
    (async () => {
      try {
          const [eastNAD27, northNAD27] = await proj2NAD27(latitude, longitude);
          marker.scec_properties.eastNAD27=eastNAD27; 
          marker.scec_properties.northNAD27=northNAD27; 
          marker.scec_properties.id=id; 
      } catch (error) {
        window.console.log("BAD BAD", id," ",latitude," ", longitude);
        window.console.log("Error in calling proj2NAD27", error);
      }
    })();
    } else {
      marker.scec_properties.eastNAD27=utmEasting; 
      marker.scec_properties.northNAD27=utmNorthing; 
      marker.scec_properties.id=id; 
  }

  marker.on('mouseover', function (e) {
      let normal=3;
      let target = normal;
      let zoom = get_zoom();
      if(zoom > 6)  {
        target = (zoom > 9) ? 7 : (zoom - 6)+target;
      }
      target = target *2;
      window.console.log(" marker mouseover", target, "base zoom", zoom);
      this.setStyle( {radius:target});
  });


	/*
function updateRadius() {
  const currentZoom = map.getZoom();
  const scaleFactor = Math.pow(2, currentZoom - baseZoom);
  marker.setRadius(baseRadius * scaleFactor);
}
         */

  marker.on('mouseout', function (e) {
      let normal=3;
      let target = normal;
      let zoom = get_zoom();
      if(zoom > 6)  {
        target = (zoom > 9) ? 7 : (zoom - 6)+target;
      }
      window.console.log(" marker mouseout", target, "base zoom", zoom);
      this.setStyle( {radius:target});
  });

  cxm_recent_quake_layer.addLayer(marker);
  cxm_recent_quake_group_list.push( {"id":id, "layer":marker});
}

function recentEQ_Zoomed(zoom) {
  if(recent_quake_count == 0) return;

  let normal=3;
  let target = normal;
  if(zoom > 6)  {
    target = (zoom > 9) ? 7 : (zoom - 6)+target;
  }
  if(eq_marker_style.normal.radius == target) { // no changes..
    return;
  }
  eq_marker_style.normal.radius=target;
  eq_marker_style.selected.radius=target;
  eq_marker_style.hover.radius = (target *2);

//window.console.log(" RESIZE: marker zoom("+zoom+") radius "+target);
  cxm_recent_quake_layer.eachLayer(function(layer){
              layer.setRadius(target);
  })
}

function toggleRecentEQ() {
   if(showing_recent_quake) {
     viewermap.removeLayer(cxm_recent_quake_layer);
     showing_recent_quake=false;
     // 
     } else {
       viewermap.addLayer(cxm_recent_quake_layer);
       showing_recent_quake=true;
   }
}

function addRecentEQLayer() {

    if(cxm_recent_quake_layer==null) {
      window.console.log("BAD: addRecentEQLayer, cxm_recent_quake_layer should not be null");
      //get_RecentEQFromUSGS();
      } else {
        viewermap.addLayer(cxm_recent_quake_layer);
        zoom2RecentEQ();
    }
    showing_recent_quake=true;
}

function clearRecentEQLayer() {
    if(cxm_recent_quake_layer!=null) {
      viewermap.removeLayer(cxm_recent_quake_layer);
      cxm_recent_quake_layer= make_markerGroup(enableCluster);
      cxm_recent_quake_group_list=[];
      recent_quake_count=0;
      setRecentEQCounter(0);
      showing_recent_quake=false;
    }
}

function zoom2RecentEQ(){
  if(cxm_recent_quake_layer.getBounds().isValid()) {
     if(recent_quake_count > 1) {
        zoom2Bounds(cxm_recent_quake_layer.getBounds());
        } else {
          let latlng=cxm_recent_quake_layer.getBounds().getCenter();
	  const lat = latlng.lat; 
          const lng = latlng.lng;
          const offset = 0.3; // small offset to create bounds
          const bounds = [[lat - offset, lng - offset],
                          [lat + offset, lng + offset]];
          zoom2Bounds(bounds);
     }
 }
}


/**********************************************************************/
function refresh_markerGroup(markers) {
   if(use_markerCluster) {
     markers.refreshClusters();
   }
}

function refresh_markerGroupCluster(myMarkerGroup, myMarker) {
  if(use_markerCluster) {
    let cluster = myMarkerGroup.getVisibleParent(myMarker);
    if(cluster != null) {
      myMarkerGroup.refreshClusters(cluster);
    }
  }
}
function _unbindClusterTooltip(ev) {
  ev.propagatedFrom.unbindTooltip();
//window.console.log("CLOSE tooltip for a cluster..");
}

function make_markerGroup(enableCluster=true) {

  window.console.log(" ===> a new markerGroup =====");
  if(enableCluster && !force_no_markerCluster) {
    use_markerCluster=true;
    } else {
      use_markerCluster=false;
      window.console.log(" ==== creating a marker feature group ===");
      var group=new L.FeatureGroup();
      group.cluster_cnt=0;
      return group;
  }

  window.console.log(" ==== creating a marker cluster group ===");
  let iconsize=7;
  var group=new L.markerClusterGroup(
        {
         maxClusterRadius: 1,
	/* default: marker-cluster-small, marker-cluster  */
         iconCreateFunction: function(cluster) {

           let zoom=mymap.getZoom();		   
           if(zoom < 5) {
	     iconsize=6;
	     } else {
                if(zoom > 10) {
                   iconsize=16;
                   } else {
                      let t=(0.2637 * zoom * zoom) - (1.978 * zoom) + 9.4032;
                      iconsize= (Math.round( t * 100))/100; 
                }
           }
//window.console.log( "I am a cluster at >>"+marker_cluster_cnt++);
           let markerlist=cluster.getAllChildMarkers();
           let sz=markerlist.length;
           let selected=false;
           for(let i=0; i<sz; i++) {
	      let marker=markerlist[i];	 
              if( marker.scec_properties.selected == true) {
                selected=true;
                break;
              }
           }

           var clusterIcon;
           if(selected) {
             var classname="cfm-cluster-highlight cfm-cluster-"+marker_cluster_uid;
             clusterIcon=L.divIcon(
		{
		 html: '',
	  	 className: classname,
		 iconSize: L.point(iconsize,iconsize)
		});
             } else {
               var classname="cfm-cluster cfm-cluster-"+marker_cluster_uid;
               clusterIcon=L.divIcon(
                {
                html: '',
		className: classname,
		iconSize: L.point(iconsize,iconsize)
		});
           }
           marker_cluster_uid++;
           return clusterIcon;
         },
//	 disableClusteringAtZoom: 8,
//       spiderfyOnMaxZoom: false,
         showCoverageOnHover: false,
//       zoomToBoundsOnClick: false
        });

//	ev=event
	group.on('clustermouseover',
		function(ev) { 
                    var myev=ev;
                    let cluster=myev.layer;
//refreshIconOptions(options, directlyRefreshClusters)
//cluster.refreshiconOptions( { iconsize:L.point(20,20) }, true);
                    let desc = "contains "+cluster.getAllChildMarkers().length + " slip rate sites,<br>click to expand";
                    myev.propagatedFrom.bindTooltip(desc,{sticky:true}).openTooltip();
//window.console.log("OPEN tooltip for a cluster..");
		    setTimeout(function() {_unbindClusterTooltip(myev)},1000);
                    });
         group.on('clustermouseout', 
		 function(ev) {
                    var myev=ev;
                    let cluster=myev.layer;
                    //myev.propagatedFrom.unbindTooltip();
                    });

   return group;
}

/**********************************************************/
