/***
   cxm_recent_eq_util.js

   manage the api call to eq service to extract eq info

https://earthquake.usgs.gov/fdsnws/event/1/
color by depth
sz by magnitude
popup info
window.console.log("XXX calling Grey makeRectangleLayer with just corners");

***/

// The USGS Earthquake API uses the WGS84 datum, which stands for World Geodetic System 1984
const reqEQ_host = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';
var recentEQ_on=false;

/**********************************************************************
 from marker list
 cxm_recent_quake_group_list.push( {"id":id, "layer":marker});
 recent_quake_count
 marker.scec_properties = {
                    id: id,
                    loc: loc,
                    longitude: longitude,
                    latitude: latitude,
                    depth: depth,
                    magnitude: mag,
                    magtype: magtype,
                    time:time};
************************************************************************/
function recentEQ_makeIDList() {
	// {"recenteq":["ci40699207","ci41249424"]}
  let idlist=[];
  for(let i=0; i<recent_quake_count; i++) {
    let eq=cxm_recent_quake_group_list[i]["layer"];
    let prop=eq.scec_properties;
    let id= prop['id'];
    if(id == '' || undefined) {
        continue;
    }
    idlist.push(id);
  }
  let blob= { recenteq : idlist }; 
  var jsonstring=JSON.stringify(blob);
  return jsonstring;
}

// needs lat/lon/depth/mag/id
// compose utm data file from the grouplist to be sent to plot3d
function recentEQ_makeUTMBlob() {
  let bloblist=[];
 
  let cnt=0;


window.console.log(" YYY calling recentEQ_makeUTMBlob");

  let expMin=Math.exp(RECENT_EQ_MAG_MIN  * 0.1);
  let expMax=Math.exp(RECENT_EQ_MAG_MAX);
  for(let i=0; i<recent_quake_count; i++) {
if(cxm_recent_quake_group_list[i] == undefined) { window.console.log("BAD"); }
      let eq=cxm_recent_quake_group_list[i]['layer'];
      let prop=eq.scec_properties;      
      let depth= prop['depth(km)'];
      if(depth == '' || undefined) {
        continue;
      }
      var msz=prop['mag_mw'];
      if(msz != 0) {
        let expX=Math.exp(msz);
        msz= 0.5 + ((expX - expMin)/(expMax-expMin)) * (1-0.5);
      }

/* exponential rescale between 0.5 to 1 
 *  xnew = 0.5 + (x-a/b-a)power of 2 * (1-0.5)
 *  a is min
 *  b is max
*/
      if(recent_quake_count==1) {
         msz=0.5;
      }
window.console.log(" XXX msz/mag_mw --> ", msz, " orig ", prop['mag_mw']);

      let nprop = { easting: prop['eastNAD27'],
                    northing: prop['northNAD27'],
	            depth: prop['depth(km)'],
	            mag: prop['magnitude'],
	            magtype: prop['magtype'],
                    id: prop['id'],
	            msz: msz}
        bloblist.push(nprop);
        cnt++;
  }
  if(cnt == 0) return null;

  eqjson= { 'recentEQ': bloblist }; 
  // string it up
  var jsonstring=JSON.stringify(eqjson);
  window.console.log("stringified ..",jsonstring);
  return jsonstring;
}

function downloadRecentEQ() {
  if(recent_quake_count > 0) {
    saveRecentEQCSV();
  }
}

// grab the scec_properites and save it to a file in CSV
function saveRecentEQCSV() {
  let mlist=[];

  for(let i=0; i<recent_quake_count; i++) {
      let eq=cxm_recent_quake_group_list[i]["layer"];
      let prop=eq.scec_properties;      
      mlist.push(prop);
  }

//  let rc=getCSVFromMeta(mlist);
//  downloadCSVMeta(mlist);
  var data;
  var timestamp;
  [data,timestamp]=getCSVFromMeta(mlist);
  saveAsCSVBlobFile("CFM_EQ_", data, timestamp);

//	downloadJSONMeta(mlist);
}

/**********************************************************************/
// toggle cxm_recent_quake_layer on and off
// eye_recentEQ
function showRecentEQ() {
  toggleRecentEQ();
  if(showing_recent_quake) {
    $('#eye_recentEQ').removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
    } else {
      $('#eye_recentEQ').removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
  }
}
/**********************************************************************/
function setRecentEQCounter(v) {
  document.getElementById("recentEQ-counter").value=v;
  document.getElementById("recentEQBtn").innerText = `Search recent EQ(${v})`;

  recent_quake_count=v;
  if(recent_quake_count > 0) {
    $('#showRecentEQ').css("display", "");
    } else {
      $('#showRecentEQ').css("display", "none");
  }
}

function getRecentEQCounter() {
  let v=parseFloat(document.getElementById("recentEQ-counter").value);
  return v;
}

function toggleRecentEQMenu()
{
   if(recentEQ_on == false) {
// special case, just in case sidebar is open
     dismissClick();
     disableSearchFilter();

     $('#recentEQ').css("display", "");
     $('#infoData').css("display", "none");
     recentEQ_on=true;
// show region on map 
     recentEQ_on_bounding_rectangle_layer();
     } else {
        $('#recentEQ').css("display", "none");
        $('#infoData').css("display", "");
        recentEQ_on=false;
// suppress region from map
        enableSearchFilter();
	recentEQ_reset_markLatlon();
   }
}

function setup_recent_eq()
{
  document.getElementById("past7Days").click();
  document.getElementById("twoFivePlusMagnitude").click();
  setRecentEQRegion();

  cxm_recent_quake_layer= make_markerGroup(enableCluster);
}

// ui
function setNdays(n) {
  let now=Date.now();
  let nowMinusNdays= now - (parseFloat(n) * 24 * 60 * 60 * 1000);

  let stopdate=( new Date(now).toISOString() );
  let startdate=( new Date(nowMinusNdays).toISOString() );

  //startTimeTxt
  //endTimeTxt 
  document.getElementById("startTimeTxt").value = startdate;
  document.getElementById("endTimeTxt").value = stopdate;
}

// ui
function setNmagnitude(n) {
  let min=parseInt(n);

  document.getElementById("minMagnitudeTxt").value = min;
  document.getElementById("maxMagnitudeTxt").value = '-';
}

// ui initial region
function setRecentEQRegion() {
  let minlat=27.0518;
  let minlon=-129.0751;
  let maxlat=45.639;
  let maxlon=-109.1346;
/*
  let minlat=32.8657;
  let minlon=-118.8917;
  let maxlat=35.2254;
  let maxlon=-115.8753;
*/

  document.getElementById("recentEQMinZTxt").value=0.0;//m
  document.getElementById("recentEQMaxZTxt").value=30000;
  recentEQ_add_bounding_rectangle(minlat, minlon, maxlat,maxlon);
}

// minlat, minlon, maxlat, maxlon
function recentEQ_set_latlons(a,b,c,d) {
  document.getElementById("recentEQFirstLatTxt").value=a;
  document.getElementById("recentEQFirstLonTxt").value=b;
  document.getElementById("recentEQSecondLatTxt").value=c;
  document.getElementById("recentEQSecondLonTxt").value=d;
}

/**********************************************************************/
// call with a list of usgs id
async function recentEQExtractData_withIDs(id_list) {
  if (recent_quake_count !== 0) {
    clearRecentEQLayer();
    recentEQ_remove_bounding_rectangle_layer();
  }

  RECENT_EQ_MAG_MAX = 0;
  RECENT_EQ_MAG_MIN = 0;

  let promises = id_list.map(id => get_RecentEQFromUSGS_withID(id));
  let result=await Promise.all(promises); // waits for all fetches to complete
window.console.log("  XXX -- result of recentEQExtractData_withIDs  is ",result.length);
  // got how many markers out of this ??
  let eq_cnt=cxm_recent_quake_group_list.length;
  setRecentEQCounter(eq_cnt);
  addRecentEQLayer();
}


// call with region
function recentEQExtractData() {
  if(recent_quake_count != 0) {
    clearRecentEQLayer();
    recentEQ_remove_bounding_rectangle_layer();
  }

  RECENT_EQ_MAG_MAX = 0;
  RECENT_EQ_MAG_MIN = 0;

  $("#modalwaitrecenteq").modal('show');

  get_RecentEQFromUSGS();
  recentEQ_on_bounding_rectangle_layer();
  //toggle, reset the pen only
  recentEQ_reset_markLatlon();

  addRecentEQLayer();
}

function recentEQReset() {
  if(recent_quake_count != null && recent_quake_count !=0) {
    clearRecentEQLayer();
    recentEQ_remove_bounding_rectangle_layer();
  }
  recentEQ_reset_markLatlon();
}

function get_RecentEQFromUSGS() {
  let starttime=document.getElementById("startTimeTxt").value;
  let endtime=document.getElementById("endTimeTxt").value;
  let minmag=document.getElementById("minMagnitudeTxt").value;
  let maxmag=document.getElementById("maxMagnitudeTxt").value;

  let firstlon=document.getElementById("recentEQFirstLonTxt").value;
  let firstlat=document.getElementById("recentEQFirstLatTxt").value;
  let secondlon=document.getElementById("recentEQSecondLonTxt").value;
  let secondlat=document.getElementById("recentEQSecondLatTxt").value;
  let minz=document.getElementById("recentEQMinZTxt").value;
  let maxz=document.getElementById("recentEQMaxZTxt").value;

// ??? make sure latlons are ordered 
  recentEQ_add_bounding_rectangle(firstlat,firstlon,secondlat,secondlon);
	
  let reqEQ_spec;
  if(maxmag == '-') {
    reqEQ_spec='&limit='+RECENT_EQ_COUNT_LIMIT+'&starttime='+starttime+'&endtime='+endtime+'&minlatitude='+firstlat+'&minlongitude='+firstlon+'&maxlatitude='+secondlat+'&maxlongitude='+secondlon+'&minmagnitude='+minmag;

    } else {
      reqEQ_spec='&limit='+RECENT_EQ_COUNT_LIMIT+'&starttime='+starttime+'&endtime='+endtime+'&minlatitude='+firstlat+'&minlongitude='+firstlon+'&maxlatitude='+secondlat+'&maxlongitude='+secondlon+'&minmagnitude='+minmag+'&maxmagnitude='+maxmag;
  }
	
window.console.log(reqEQ_spec);
  const reqEQ_url = reqEQ_host+reqEQ_spec;

  return _getRecentEQFromUSGS(reqEQ_url);
}

function get_RecentEQFromUSGS_withID(id) {
  // example let reqEQ_spec = '&eventid=us7000qalq';
  let reqEQ_spec = '&eventid='+id;
  let reqEQ_url = reqEQ_host + reqEQ_spec;

  return _getRecentEQFromUSGS(reqEQ_url);
}

async function _getRecentEQFromUSGS(reqEQ) {
  window.console.log("CALLING for EQ from USGS");
  try {
    const response = await fetch(reqEQ);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    window.console.log("Recent Earthquakes...:");

    if("features" in data)  { // this is for many
      let fcnt=data.features.length;
      if(fcnt > RECENT_EQ_COUNT_LIMIT) { // cap it
        window.console.log("BAD: service sent back more than"+RECENT_EQ_COUNT_LIMIT);
        fcnt=RECENT_EQ_COUNT_LIMIT; 
      }
      for(let i=0; i<fcnt; i++) {
        let eq=data.features[i];
        let place = eq.properties.place;
        let mag = eq.properties.mag;
        let magtype = eq.properties.magType;
        let ntime = new Date(eq.properties.time).toLocaleString();
        let time = eq.properties.time;
        let coord = eq.geometry.coordinates;
        let id = eq.id;
//window.console.log(`- ${ntime} | M${mag} | ${place} | ${coord} | ${id}`);
        let eqq = { id: id, coord: coord, place: place, mag: mag, magtype: magtype, time: time };
        makeARecentEQMarker(eqq);
      }
      let eq_cnt=cxm_recent_quake_group_list.length;
window.console.log(" -- adding %d: max %f min %f\n", eq_cnt,RECENT_EQ_MAG_MAX,RECENT_EQ_MAG_MIN);
      setRecentEQCounter(eq_cnt);

      } else { // this is just for 1
        let place = data.properties.place;
        let mag = data.properties.mag;
        let magtype = data.properties.magType;
        let ntime = new Date(data.properties.time).toLocaleString();
        let time = data.properties.time;
        let coord = data.geometry.coordinates;
        let id = data.id;
//window.console.log(`- ${ntime} | M${mag} | ${place} | ${coord} | ${id}`);
    
        let eqq = { id: id, coord: coord, place: place, mag: mag, magtype: magtype,time: time };
        makeARecentEQMarker(eqq);
    }
    $("#modalwaitrecenteq").modal('hide');

  } catch (error) {
    $("#modalwaitrecenteq").modal('hide');
    console.error("Error fetching earthquake data from USGS:", error);
  }

  return 0;

}

