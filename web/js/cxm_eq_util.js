/**
 *  cxm_eq_util.js
 *
 **/


/****************** for handling earthquakes ********************/
function processQuakeResult(type) {
    var eqstr=[];
    var eqarray=[]; // array of json items

    if ( type == 'quakesByDepth') {
       eqstr = $('[data-side="quakesByDepth"]').data('params');
    } else if (type == 'quakesByLatLon') {
       eqstr = $('[data-side="quakesByLatLon"]').data('params');
    } else if (type == 'allQuakesByChunk') {
       eqstr = $('[data-side="allQuakesByChunk"]').data('params');
    } 

    if(eqstr == undefined) {
        window.console.log("processQuakeResult: BAD BAD BAD");
        return;
    }

    var sz=(Object.keys(eqstr).length);
//    window.console.log("Number of eq blobs received from backend ->",sz);
    for( var i=0; i< sz; i++) {
       var tmp= JSON.parse(eqstr[i]);
       eqarray.push(tmp);
    }
    return eqarray;
}

function _processTimeString(t) {
    var str=t.replace(" ","T");
    return str;
}

// Hauksson's
function processQuakeMeta(quake_type) {
    var str = $('[data-side="quake-meta"]').data('params');
    var blob;
    switch (quake_type) {
      case QUAKE_TYPE_HAUKSSON:
        blob=str.Hauksson; // 
        break;
      case QUAKE_TYPE_SIGNIFICANT:
        blob=str.Significant; // 
        break;
    }
    var meta=JSON.parse(blob);

    if(quake_type == QUAKE_TYPE_HAUKSSON) {
      window.console.log("seismicity time >>"+ meta['minTime']+" to "+meta['maxTime']);
      window.console.log("seismicity lon >>"+ meta['minLon']+" to "+meta['maxLon']);
      window.console.log("seismicity lat >>"+ meta['minLat']+" to "+meta['maxLat']);
      window.console.log("seismicity depth >>"+ meta['minDepth']+" to "+meta['maxDepth']);
      window.console.log("seismicity mag >>"+ meta['minMag']+" to "+meta['maxMag']);
      window.console.log("seismicity total >>"+meta['total']);
    }

    // save this to eq_spec..
    eq_spec.push ( { 'name': quake_type, 'meta': meta });
    return meta;
}

function get_EQ_range(quake_type, quake_metric_type) {
    let cnt=eq_spec.length;
    for(let i=0; i<cnt; i++) {
	    // TODO: assume always QUAKE_TYPE_HAUKSSON
      if(eq_spec[i].name==quake_type) {
         let meta=eq_spec[i].meta;
         if(quake_metric_type == EQ_HAUKSSON_FOR_DEPTH) {
            return (meta.minDepth, meta.maxDepth)
         }
         if(quake_metric_type == EQ_HAUKSSON_FOR_MAG) {
            return (meta.minMag, meta.maxMag)
         }
         if(quake_metric_type == EQ_HAUKSSON_FOR_TIME) {
            return (meta.minTime, meta.maxTime)
         }

      }
    }
}

function get_seismicity(sw,ne) {
    quakesByLatlon(sw['lat'],sw['lng'],ne['lat'],ne['lng']);
}

/************************************************************************************/

// dump the quake layer into file
function dumpAllQuakeLayer() {
// TODO -- maybe some webgl page dump ??
// start with hauksson 
//  dumpQuakeGeo(QUAKE_TYPE_HAUKSSON);
//  dumpQuakeGeo(QUAKE_TYPE_SIGNIFICANT);
}

// extract all EQ northing/easting info to utm files 
function toUTMFileAllQuakes() {
  let meta={"size":1,"color":{"r":0,"g":0.61,"b":0}};
  let msg=JSON.stringify(meta); 
  // start with hauksson 
  quakesAllToUTMFile(QUAKE_TYPE_HAUKSSON,msg);
}

function updatePrograssBar(width) {
  var element = document.getElementById("myProgressBar");   
  element.style.width = width + '%'; 
//  element.innerHTML = width * 1  + '%';
  let elm = $("#eq-progress");
  var n= width * 1  + '%';
  elm.val(n);
// window.console.log("Progress bar: update to ", n);
}

function loadSeismicity() {
   if(seismicity_loaded == false) {
     seismicity_loaded=true;
     refresh_map();
// return to initial map view so don't get funny dots
     setupEQDatalist(); 
     if( seismicity_from_cache ) {
        loadFromFileEQMarkerLatlng();
        } else {
// SIGNIFICANT are loaded as side-effect
window.console.log("XXX --> loading from db and then chopped... slowww..");
          getAllQuakes(QUAKE_TYPE_HAUKSSON);  
     }
   }
}

function finishLoadSeismicity() {

    setup_pixi();
    changePixiOverlay("haukssondepth");
    addSignificantEQLayer();

//printEQMarkerLatlngInfo(EQ_HAUKSSON_FOR_DEPTH);
//printEQMarkerLatlngInfo(EQ_HAUKSSON_FOR_MAG);
//printEQMarkerLatlngInfo(EQ_HAUKSSON_FOR_TIME);

    $('#showSeismicity').css("display", "");
    $('#loadSeismicity').css("display", "none");
}


/****************** generate json files for cache ******************/
function toFileMarkerLatlng() {
    var sz=EQ_METRIC_LIST.length;
	// first one
    var ssz=getEQChunks(EQ_METRIC_LIST[0]);
    _toFileLatlngSet(0,sz,0,ssz);
    _toFileLatlngSignificantSet();
}

function _toFileLatlngSignificantSet() {
    var fname="significant_log.json";
    var fdata=cxm_quake_significant_latlng;
    var desc=cxm_quake_significant_description;
    var log={description:desc, latlng:fdata};
    _outputBlob(log,fname);
}

function _toFileLatlngSet(tidx,tsz,sidx,ssz) {
    var ttype=EQ_METRIC_LIST[tidx];
    var list=eqLatlngList[ttype];
    var fname_stub=_eq_fname_stub(ttype);
    var fdata=list.data[sidx]; // arraylist

    // output the log only when tidx is 0
    if(sidx == 0) {
      var sum=0;
      var logname=fname_stub+"log.json";
      var loglist=[]; 
      for(var i=0; i<ssz; i++) {
        var dlist=list.data[i]; //
        var v=dlist.length;
        sum=sum+v;
        loglist.push({id:i,sz:v});
      }
      log={total:sum , list:loglist};
      _outputBlob(log,logname);
    }

    var fname=_eq_fname(ttype,sidx);
    _outputBlob(fdata,fname);
window.console.log(" >>>>  toFileLatlngSet(%s).. (%d)%d\n", fname, sidx, fdata.length);

    if(sidx+1 == ssz) {
      if(tidx+1 == tsz) { // all done 
        } else {
          // switch to new ssz
          var nssz=getEQChunks(EQ_METRIC_LIST[tidx+1]);
          _toFileLatlngSet(tidx+1,tsz,0,nssz);
      }
      } else {
        _toFileLatlngSet(tidx,tsz,sidx+1,ssz);
    }
}

// had to do this manually.. since is is asynchronously
function _outputBlob(obj,fname) {

//window.console.log("writing out blob file >>("+fname+")");
/*  to server solution */
  window.console.log("writing out ..."+fname);
  writeToServerFile(fname,obj); 

/*
  var ostr=JSON.stringify(obj);
  var dload = document.createElement('a');
  dload.href = URL.createObjectURL(new Blob([ostr], {type: 'text/plain'}));
  dload.download = fname;
  dload.style.display='none';
  document.body.appendChild(dload);
  dload.click();
  document.body.removeChild(dload);
  delete dload;
*/

/*
  var link = document.createElement('a');
  link.download = fname;
  let blob = new Blob([ostr], {type: 'text/plain'});
  var rc=link.click();
  URL.revokeObjectURL(link.href);

  var blob = new Blob([ostr],{ type: "text/plain;charset=utf-8" });
  saveAs(blob,fname);
//window.console.log(">>>SSS saving a file.."+fname+" sz "+ostr.length);
*/
}
function _eq_fname_stub(ttype) {

    var fname="NA";
    switch(ttype) {
       case EQ_HAUKSSON_FOR_DEPTH:
         fname="hauksson_depth_";
         break;
       case EQ_HAUKSSON_FOR_MAG:
         fname="hauksson_mag_";
         break;
       case EQ_HAUKSSON_FOR_TIME:
         fname="hauksson_time_";
         break;
    }
    return fname;
}

function _eq_full_fname_stub(ttype) {

    var fname="NA";
    switch(ttype) {
       case EQ_HAUKSSON_FOR_DEPTH:
         fname=SEISMICITY_DIR+"/hauksson_depth_";
         break;
       case EQ_HAUKSSON_FOR_MAG:
         fname=SEISMICITY_DIR+"/hauksson_mag_";
         break;
       case EQ_HAUKSSON_FOR_TIME:
         fname=SEISMICITY_DIR+"/hauksson_time_";
         break;
    }
    return fname;
}

function _eq_fname(ttype,sidx) {
    var stub=_eq_fname_stub(ttype);
    var fname=stub+sidx+".json";
    return fname;
}

function _eq_gzfname(ttype,sidx) {
    var stub=_eq_full_fname_stub(ttype);
    var fname=stub+sidx+".json.gz";
    return fname;
}

function _binArrayToJson(barray)
{
    var str = "";
    for (var i = 0; i < barray.length; i++) {
        str += String.fromCharCode(parseInt(barray[i]));
    }
    return JSON.parse(str);
}


function _decompress2JSON(zdata) {
    var zarray=new Uint8Array(zdata);
    var gunzip = new Zlib.Gunzip(zarray);
    var dzarray = gunzip.decompress();
    var jzdata= _binArrayToJson(dzarray);
    return jzdata;
}

