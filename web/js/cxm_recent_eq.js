/***
   cxm_recent_eq.js

   manage the new earthquakes as a leaflet overlay layer

***/

/**********************************************************/

// for tracking groups of earthquakes for SIGNIFICANT eq dataset
var cxm_recent_quake_layer=null;
// json blob [{'gid':gid, 'size':sz, 'lat':latval, 'lon':lonval, 'description':info}]
var cxm_recent_quake_info=[];
// a gid list of quake layer
var cxm_recent_quake_group_list=[];


/**********************************************************************/

function makeRecentEQLayer() {
   // create a group layer with many marker within..
   //   collect up latlng, description list, "red"
//   cxm_quake_significant_layer2=addMarkerLayerGroup( cxm_quake_significant_latlng, cxm_quake_significant_description, 6);
   cxm_recent_quake_layer=makeLeafletCircleMarker( cxm_recent_quake_info );
};

function setupRecentEQDatalist() {
}

// show which pixiOverlay
function toggleRecentEQLayer() {
}

function toggleSignificant() {
   let $elt=$('#eye_significant');
   if(showing_significant) {
     removeSignificantEQLayer();
     $elt.removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
     } else {
       addSignificantEQLayer();
       $elt.removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
   }
}

function removeSignificantEQLayer() {
    viewermap.removeLayer(cxm_quake_significant_layer);
    showing_significant=false;
}

function addSignificantEQLayer() {
}

