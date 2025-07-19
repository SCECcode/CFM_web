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

window.console.log("XXX", recentEQ_on);

  if(skipPopup == false) { // enable marking
window.console.log("XXX HERE..false>>", recentEQ_on);
    clear_popup();
    skipPopup = true;
    drawing_rectangle=true;
    drawRectangle();
    unbind_layer_popup();
    $('#markerEQBtn').css("color","red");
    } else {
window.console.log("XXX HERE.. true>>", recentEQ_on);
       skipPopup = false;
       drawing_rectangle=false;
       skipRectangle();
       $('#markerEQBtn').css("color","blue");
       recentEQ_remove_bounding_rectangle_layer();
       rebind_layer_popup();
  }
}

function recentEQ_reset_markLatlon() {
  skipPopup = false;
  $('#markerEQBtn').css("color","blue");
  drawing_rectangle=false;
  skipRectangle();
  rebind_layer_popup();
  recentEQ_remove_bounding_rectangle_layer();
  setRecentEQRegion();
}

function recentEQ_remove_bounding_rectangle_layer() {
window.console.log(" === removing it");
   if(recent_eq_region != null) {
     let layer=recent_eq_region["layer"];
     viewermap.removeLayer(layer);
     recent_eq_region=null;
   }
}

function recentEQ_add_bounding_rectangle(a,b,c,d) {
window.console.log(" === adding on");
  // remove old one and add a new one
  recentEQ_remove_bounding_rectangle_layer();
  var layer=makeRectangleLayer(a,b,c,d);
  recent_eq_region={"layer":layer, "latlngs":[{"lat":a,"lon":b},{"lat":c,"lon":d}]};
}

// just not showing it
function recentEQ_off_bounding_rectangle_layer() {
window.console.log(" === turning off");
   if(recent_eq_region != null) {
     let layer=recent_eq_region["layer"];
     viewermap.removeLayer(layer);
   }
}

function recentEQ_on_bounding_rectangle_layer() {
window.console.log(" ===  turning on");
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
window.console.log(" ===  calling recentEQ_add_bounding_rectangle_layer with layer");
  recentEQ_remove_bounding_rectangle_layer();
  recent_eq_region={"layer":layer, "latlngs":[{"lat":a,"lon":b},{"lat":c,"lon":d}]};
  recentEQ_set_latlons(a,b,c,d);
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

  let marker = makeLeafletEQCircleMarker([latitude, longitude], eq_marker_style.normal);

  let eq_info = `${id}`;

  marker.bindTooltip(eq_info).openTooltip();

  marker.bindPopup("<strong>Recent Earthquake</strong><br><strong>Location: </strong>"+loc+"<br><strong>When: </strong>"+ new Date(time).toLocaleString() +"<br><strong>Magnitude: </strong>"+mag+" ("+magtype+")<br><strong>Depth: </strong>"+depth+" (km)<br><strong>Location: </strong> ("+longitude+", "+latitude+")<br><strong>ID: </strong>"+id,{maxWidth: 500});


  marker.scec_properties = {
                    id: id,
                    longitude: longitude,
                    latitude: latitude,
                    "depth(km)": depth,
                    magnitude: mag,
                    magtype: magtype,
	            loc: loc,
                    time: time,
	            utmeasting: utmEasting,
	            utmnorthing: utmNorthing,
	            utmzonenumber: utmZoneNum,
	            utmzoneletter: utmZoneLetter };

  marker.on('mouseover', function (e) {
      let normal=3;
      let target = normal;
      let zoom = get_zoom();
      if(zoom > 6)  {
        target = (zoom > 9) ? 7 : (zoom - 6)+target;
      }
      target = target *2;
      window.console.log(" marker mouseover", target);
      this.setStyle( {radius:target});
  });

  marker.on('mouseout', function (e) {
      let normal=3;
      let target = normal;
      let zoom = get_zoom();
      if(zoom > 6)  {
        target = (zoom > 9) ? 7 : (zoom - 6)+target;
      }
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
      setRecentEQCounter(0);
      cxm_recent_quake_layer= make_markerGroup(enableCluster);
      cxm_recent_quake_group_list=[];
      recent_quake_count=0;
      showing_recent_quake=false;
    }
}

function zoom2RecentEQ(){
 if (recent_quake_count > 1 && cxm_recent_quake_layer.getBounds().isValid()) {
   let t=cxm_recent_quake_layer.getBounds();
   zoom2Bounds(t);
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
