/***
   cxm_recent_eq.js

   recent eq layer extracted from USGS service

***/

/**********************************************************/

// for tracking groups of recent earthquakes 
var cxm_recent_quake_layer=null;

// json {'id':eq_id, 'layer':layer }
var cxm_recent_quake_group_list=[];

var showing_recent_quake=false;
var recent_quake_count=0;
var enableCluster=false;
var use_markerCluster=0;

// recent_eq_region={"layer":layer, "latlngs":[{"lat":a,"lon":b},{"lat":c,"lon":d}]};
var recent_eq_region=null;

var site_colors = {
    //normal: '#006E90', // original
    normal: '#FF4207', // original
    selected: '#B02E0C',
    abnormal: '#00FFFF',
};

var site_marker_style = {
    normal: {
        color: "white",
        fillColor: site_colors.normal,
        fillOpacity: 1,
        radius: 3,
        riseOnHover: true,
        weight: 1,
    },
    selected: {
        color: "white",
        fillColor: site_colors.selected,
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
    unbind_layer_popup();
    $('#markerBtn').css("color","red");
    } else {
       skipPopup = false;
       drawing_rectangle=false;
       skipRectangle();
       $('#markerBtn').css("color","blue");
       recentEQ_remove_bounding_rectangle_layer();
       rebind_layer_popup();
  }
}

function recentEQ_reset_markLatlon() {
  skipPopup = false;
  $('#markerBtn').css("color","blue");
  drawing_rectangle=false;
  skipRectangle();
  rebind_layer_popup();
  recentEQ_remove_bounding_rectangle_layer();
  recentEQ_reset_select_latlon();
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
       viewermap.fitBounds(layer.getBounds());
     }
   }
}

function recentEQ_add_bounding_rectangle_layer(layer, a,b,c,d) {
  // remove old one and add a new one
  recentEQ_remove_bounding_rectangle_layer();
  recent_eq_region={"layer":layer, "latlngs":[{"lat":a,"lon":b},{"lat":c,"lon":d}]};
  recentEQ_set_latlons(a,b,c,d);
}


/**********************************************************************/

function makeRecentEQLayer() {

window.console.log("CALLING makeRecentEQLayer");

//  let reqEQ = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=20000&starttime=2025-07-01&endtime=2025-07-09&minlatitude=27.0518&minlongitude=-129.0751&maxlatitude=45.639&maxlongitude=-109.1346&minmagnitude=3.0';

let reqEQ = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&eventid=us7000qalq';

  getRecentEQFromUSGS(reqEQ);

}

function makeARecentEQMarker(data) {
  let latitude= data.coord[1];
  let longitude=data.coord[0];
  let depth=data.coord[2];
  let time=data.time;
  let mag=data.mag;
  let magtype=data.magtype;
  let loc=data.place;                                          
  let id=data.id;

  let marker = makeLeafletEQCircleMarker([latitude, longitude], site_marker_style.normal);

  let eq_info = `${id}`;

  marker.bindTooltip(eq_info).openTooltip();

  marker.bindPopup("<strong>Location: </strong>"+loc+"<br><strong>When: </strong>"+ new Date(time).toLocaleString() +"<br><strong>Magnitude: </strong>"+mag+" ("+magtype+")<br><strong>Depth: </strong>"+depth+" (km)<br><strong>Location: </strong> ("+longitude+", "+latitude+")<br><strong>ID: </strong>"+id,{maxWidth: 500});

  marker.scec_properties = {
                    id: id,
	            loc: loc,
                    longitude: longitude,
                    latitude: latitude,
                    depth: depth,
                    magnitude: mag,
                    magtype: magtype,
                    time:time};

  cxm_recent_quake_layer.addLayer(marker);
  cxm_recent_quake_group_list.push( {"id":id, "layer":marker});
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
      get_RecentEQFromUSGS();
      } else {
        viewermap.addLayer(cxm_recent_quake_layer);
    }
    showing_recent_quake=true;
}

function clearRecentEQLayer() {
    if(cxm_recent_quake_layer!=null) {
      recentEQ_remove_bounding_rectangle_layer();
      setRecentEQCounter(0);
      cxm_recent_quake_layer= make_markerGroup(enableCluster);
    }
}

function zoom2RecentEQ(){
 if (cxm_recent_quake_layer.getBounds().isValid()) {
   viewermap.fitBounds(cxm_recent_quake_layer.getBounds());
 }
}


/**********************************************************************/

// let marker = L.circleMarker([latitude, longitude], site_marker_style.normal);
function makeLeafletEQCircleMarker(latlng, opt, cname=undefined) {

  if(cname != undefined) {
    opt.className=cname;
  }
  let marker= L.circleMarker(latlng, opt);
  return marker;
}

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
