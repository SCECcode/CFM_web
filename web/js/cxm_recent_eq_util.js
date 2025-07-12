/***
   cxm_recent_eq_util.js

   manage the api call to eq service to extract eq info

https://earthquake.usgs.gov/fdsnws/event/1/
color by depth
sz by magnitude
popup info

***/

const reqEQ_host = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';

/**********************************************************************/
function setRecentEQCounter(v) {
  document.getElementById("recentEQ-counter").value=v;
  document.getElementById("recentEQBtn").innerText = `recent EQ(${v})`;
  recent_quake_count=v;
}

var recentEQ_on=false;
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
        recentEQ_off_bounding_rectangle_layer();
        enableSearchFilter();
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
  let min=parseFloat(n);

  document.getElementById("minMagnitudeTxt").value = min;
  document.getElementById("maxMagnitudeTxt").value = '-';
}

// ui
function setRecentEQRegion() {
  let minlat=27.0518;
  let minlon=-129.0751;
  let maxlat=45.639;
  let maxlon=-109.1346;

  document.getElementById("recentEQFirstLonTxt").value=minlon;
  document.getElementById("recentEQFirstLatTxt").value=minlat;
  document.getElementById("recentEQSecondLonTxt").value=maxlon;
  document.getElementById("recentEQSecondLatTxt").value=maxlat;
  document.getElementById("recentEQMinZTxt").value=0.0;//m
  document.getElementById("recentEQMaxZTxt").value=30000;
  recentEQ_add_bounding_rectangle(minlat, minlon, maxlat,maxlon);

  // zoom in
}

// minlat, minlon, maxlat, maxlon
function recentEQ_set_latlons(a,b,c,d) {
  document.getElementById("recentEQFirstLonTxt").value=a;
  document.getElementById("recentEQFirstLatTxt").value=b;
  document.getElementById("recentEQSecondLonTxt").value=c;
  document.getElementById("recentEQSecondLatTxt").value=d;

}

/**********************************************************************/

function recentEQExtractData() {
  if(recent_quake_count != 0) {
    recentEQ_remove_bounding_rectangle_layer()
    clearRecentEQLayer();
  }
  get_RecentEQFromUSGS();
  addRecentEQLayer();
}

function recentEQReset() {
  if(recent_quake_count != null) {
    clearRecentEQLayer();
  }
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
	
// XXX  ??? need to redraw the rectangle..	
	
  let reqEQ_spec;
  if(maxmag == '-') {
    reqEQ_spec='&limit=20000&starttime='+starttime+'&endtime='+endtime+'&minlatitude='+firstlat+'&minlongitude='+firstlon+'&maxlatitude='+secondlat+'&maxlongitude='+secondlon+'&minmagnitude='+minmag;
    } else {
      reqEQ_spec='&limit=20000&starttime='+starttime+'&endtime='+endtime+'&minlatitude='+firstlat+'&minlongitude='+firstlon+'&maxlatitude='+secondlat+'&maxlongitude='+secondlon+'&minmagnitude='+minmag+'&maxmagnitude='+maxmag;
  }
	
window.console.log(reqEQ_spec);
  const reqEQ_url = reqEQ_host+reqEQ_spec;
  _getRecentEQFromUSGS(reqEQ_url);
}

function get_RecentEQFromUSGS_withID(id) {
  let reqEQ_spec = '&eventid=us7000qalq';
  let reqEQ_url = reqEQ_host + reqEQ_spec;

  _getRecentEQFromUSGS(reqEQ_url);
}

async function _getRecentEQFromUSGS(reqEQ) {
  window.console.log("CALLING  EQ from USGS");
  try {
    const response = await fetch(reqEQ);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    window.console.log("Recent Earthquakes (Magnitude ≥ 5):");

    let eq_list = [];
    let eq_cnt=0;

    if("features" in data)  {
// this is for many
        data.features.forEach(eq => {
          let place = eq.properties.place;
          let mag = eq.properties.mag;
          let magtype = eq.properties.magType;
          let ntime = new Date(eq.properties.time).toLocaleString();
          let time = eq.properties.time;
          let coord = eq.geometry.coordinates;
          let id = eq.id;
//          window.console.log(`- ${ntime} | M${mag} | ${place} | ${coord} | ${id}`);
    
          let tmp = { id: id, coord: coord, place: place, mag: mag, magtype: magtype, time: time };
          eq_list.push(tmp);
          eq_cnt++;
        });
// this is just for 1
        } else { 
          let place = data.properties.place;
          let mag = data.properties.mag;
          let magtype = data.properties.magtype;
          let ntime = new Date(data.properties.time).toLocaleString();
          let time = data.properties.time;
          let coord = data.geometry.coordinates;
          let id = data.id;
          window.console.log(`- ${ntime} | M${mag} | ${place} | ${coord} | ${id}`);
    
          let tmp = { id: id, coord: coord, place: place, mag: mag, magtype: magtype,time: time };
          eq_list.push(tmp);
          eq_cnt++;
    }
    
    $("#modalwaitrecenteq").modal('hide');
    // process and store it..
window.console.log("GOT complete LIST");
    for (let i=0; i< eq_cnt; i++) {
        makeARecentEQMarker(eq_list[i]);
    }    
    window.console.log(eq_cnt);
    setRecentEQCounter(eq_cnt);

  } catch (error) {
    $("#modalwaitrecenteq").modal('hide');
    console.error("Error fetching earthquake data from USGS:", error);
  }
}

