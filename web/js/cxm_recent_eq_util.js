/***
   cxm_recent_eq_util.js

   manage the api call to eq service to extract eq info

https://earthquake.usgs.gov/fdsnws/event/1/
color by depth
sz by magnitude
popup info

***/

const reqEQ_host = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';

/**********************************************************/

// for query params
// magnitude - (min max)
// date (start end)
//          YYYY-MM-DD HR:MIN:SEC
// region (start lat, end lon, min depth, max depth)
//

/**********************************************************************/
function setup_recent_eq()
{
  document.getElementById("past7Days").click();
  document.getElementById("twoFivePlusMagnitude").click();

  cxm_recent_quake_layer= make_markerGroup(enableCluster);

  getRecentEQFromUSGS();

}

// ui
function getNdays(n) {
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
function getNmagnitude(n) {
  let min=parseFloat(n);
  let max=min+10;

  document.getElementById("minMagnitudeTxt").value = min;
  document.getElementById("maxMagnitudeTxt").value = max;
}

/**********************************************************************/

function recentEQExtractData()
{
	addRecentEQLayer();
}

//recentEqResetAll()

//
function get_RecentEQFromUSGS() {
  let reqEQ_spec='&limit=20000&starttime=2025-07-01&endtime=2025-07-09&minlatitude=27.0518&minlongitude=-129.0751&maxlatitude=45.639&maxlongitude=-109.1346&minmagnitude=3.0';
  const reqEQ_url = reqEQ_host+req_spec;

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
          let ntime = new Date(eq.properties.time).toLocaleString();
          let time = eq.properties.time;
          let coord = eq.geometry.coordinates;
          let id = eq.id;
          window.console.log(`- ${ntime} | M${mag} | ${place} | ${coord} | ${id}`);
    
          let tmp = { id: id, coord: coord, place: place, mag: mag, time: time };
          eq_list.push(tmp);
          eq_cnt++;
        });
// this is just for 1
        } else { 
          let place = data.properties.place;
          let mag = data.properties.mag;
          let ntime = new Date(data.properties.time).toLocaleString();
          let time = data.properties.time;
          let coord = data.geometry.coordinates;
          let id = data.id;
          window.console.log(`- ${ntime} | M${mag} | ${place} | ${coord} | ${id}`);
    
          let tmp = { id: id, coord: coord, place: place, mag: mag, time: time };
          eq_list.push(tmp);
          eq_cnt++;
    }
    
    $("#modalwaitrecenteq").modal('hide');
    // process and store it..
window.console.log("GOT complete LIST");
    for (let i=0; i< eq_cnt; i++) {
        makeARecentEQMarker(eq_list[i]);
    }    

  } catch (error) {
    $("#modalwaitrecenteq").modal('hide');
    console.error("Error fetching earthquake data from USGS:", error);
  }
}

