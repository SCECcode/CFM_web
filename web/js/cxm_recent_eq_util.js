/***
   cxm_recent_eq_util.js

   manage the api call to eq service to extract eq info

https://earthquake.usgs.gov/fdsnws/event/1/
color by depth
sz by magnitude
popup info

***/

/**********************************************************/

// for query params
// magnitude - (min max)
// date (start end)
//          YYYY-MM-DD HR:MIN:SEC
// region (start lat, end lon, min depth, max depth)
//

/**********************************************************************/

function getNdays(n) {
  var now=Date.now()
  var nowAddNdays= now - (n * 24 * 60 * 60 * 1000)

  print ( new Date(now).toString() );
  print ( new Date(nowAddNdays).toString() );
}


//function retrieveRecentEQ() {
//   cxm_recent_quake_layer=makeLeafletCircleMarker( cxm_recent_quake_info );
//}
