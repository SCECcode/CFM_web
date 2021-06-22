/***
   cfm_query.js
***/

const DATA_CHUNK_COUNT=20;

function searchByStrikeRange(min,max) {
    if (min == undefined || max == undefined) {
        document.getElementById("cfm-table-body").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                toggle_off_all_layer();
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str = processSearchResult("searchByStrikeRange");
                document.getElementById("cfm-table-body").innerHTML = makeResultTableBody(str);
            }
        };
        xmlhttp.open("GET","php/faultsByStrikeRange.php?min="+min+"&max="+max,true);
        xmlhttp.send();
    }
}


function setupSearchByStrike() {
  var lowstrikestr=document.getElementById("lowStrikeTxt").value;
  var highstrikestr=document.getElementById("highStrikeTxt").value;
  var lowval=parseFloat(lowstrikestr);
  var highval=parseFloat(highstrikestr);
  var minval= $( "#slider-strike-range" ).slider("option", "min");
  var maxval= $( "#slider-strike-range" ).slider("option", "max");
  /* bad case.. reset to all */
  if( lowval < minval || lowval > maxval || highval < minval || highval > maxval ||
          highval < lowval ) {
    window.console.log("BAD user input for strike range");
    lowval=minval;
    highval=maxval;
  }

  $("#slider-strike-range" ).slider( "option", "values", [lowval, highval]);
  searchByStrikeRange(lowval,highval);
}

function searchWithStrikeRange() {

  //grab the min and max from the slider..
  var vals = $( "#slider-strike-range" ).slider("option", "values");
  searchByStrikeRange(vals[0],vals[1]);
}


function searchByDipRange(min,max) {
    if (min == undefined || max == undefined) {
        document.getElementById("cfm-table-body").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                toggle_off_all_layer();
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str = processSearchResult("searchByDipRange");
                document.getElementById("cfm-table-body").innerHTML = makeResultTableBody(str);
            }
        };
        xmlhttp.open("GET","php/faultsByDipRange.php?min="+min+"&max="+max,true);
        xmlhttp.send();
    }
}

function setupSearchByDip() {
  var lowdipstr=document.getElementById("lowDipTxt").value;
  var highdipstr=document.getElementById("highDipTxt").value;
  var lowval=parseFloat(lowdipstr);
  var highval=parseFloat(highdipstr);
  var minval= $( "#slider-dip-range" ).slider("option", "min");
  var maxval= $( "#slider-dip-range" ).slider("option", "max");
  /* bad case.. reset to all */
  if( lowval < minval || lowval > maxval || highval < minval || highval > maxval ||
          highval < lowval ) {
    window.console.log("BAD user input for dip range");
    lowval=minval;
    highval=maxval;
  }

  $("#slider-dip-range" ).slider( "option", "values", [lowval, highval]);
  searchByDipRange(lowval,highval);
}

function searchWithDipRange() {
  //grab the min and max from the slider..
  vals = $( "#slider-dip-range" ).slider("option", "values");
  searchByDipRange(vals[0],vals[1]);
}


function searchByFaultObjectName() {
    str=document.getElementById("faultNameTxt").value;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            toggle_off_all_layer();
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var str=processSearchResult("searchByFaultName");
            document.getElementById("cfm-table-body").innerHTML = makeResultTableBody(str);
        }
    };
    xmlhttp.open("GET","php/faultsByFaultObjectName.php?q="+str,true);
    xmlhttp.send();
}
function searchByKeyword() {
    str=document.getElementById("keywordTxt").value;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            toggle_off_all_layer();
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var str=processSearchResult("searchByKeyword");
            document.getElementById("cfm-table-body").innerHTML = makeResultTableBody(str);
        }
    };
    xmlhttp.open("GET","php/faultsByKeyword.php?q="+str,true);
    xmlhttp.send();
}

// takes 2 or 4 entries
function searchByLatlon(frommap) {
    var firstlatstr=document.getElementById("firstLatTxt").value;
    var firstlonstr=document.getElementById("firstLonTxt").value;
    var secondlatstr=document.getElementById("secondLatTxt").value;
    var secondlonstr=document.getElementById("secondLonTxt").value;
    if(secondlatstr == "optional")
        secondlatstr="0";
    if(secondlonstr == "optional")
        secondlonstr="0";

// if in hand input mode, need to add the marker+retangle..
    if(!frommap) {
      chk_and_add_bounding_rectangle();
    }
    
    if (firstlatstr == "" || firstlonstr=="") {
        document.getElementById("cfm-table-body").innerHTML = "";
        return;
    } else {

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                toggle_off_all_layer();
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchByLatLon");
                document.getElementById("cfm-table-body").innerHTML = makeResultTableBody(str);
            }
        }
        xmlhttp.open("GET","php/faultsByLatlon.php?firstlat="+firstlatstr+"&secondlat="+secondlatstr+"&firstlon="+firstlonstr+"&secondlon="+secondlonstr,true);
        xmlhttp.send();
    }
}

function searchByZone(str) {
    if (str == "") {
        document.getElementById("cfm-table-body").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                toggle_off_all_layer();
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchByZone");
                document.getElementById("cfm-table-body").innerHTML = makeResultTableBody(str);
            }
        };
        xmlhttp.open("GET","php/faultsByZone.php?q="+str,true);
        xmlhttp.send();
    }
}

function searchBySection(str) {
    if (str == "") {
        document.getElementById("cfm-table-body").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                toggle_off_all_layer();
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchBySection");
                document.getElementById("cfm-table-body").innerHTML = makeResultTableBody(str);
            }
        };
        xmlhttp.open("GET","php/faultsBySection.php?q="+str,true);
        xmlhttp.send();
    }
}

function searchByArea(str) {
    if (str == "") {
        document.getElementById("cfm-table-body").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                toggle_off_all_layer();
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchByArea");
                document.getElementById("cfm-table-body").innerHTML = makeResultTableBody(str);
            }

        };
        xmlhttp.open("GET","php/faultsByArea.php?q="+str,true);
        xmlhttp.send();
    }
}


function searchByName(str) {
    if (str == "") {
        document.getElementById("cfm-table-body").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                toggle_off_all_layer();
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchByName");
                document.getElementById("cfm-table-body").innerHTML = makeResultTableBody(str);
            }
        };
        xmlhttp.open("GET","php/faultsByName.php?q="+str,true);
        xmlhttp.send();
    }
}


// returning 2 lists, one is gid list where each gid has a geo/shapefile
//                    one is nogid list where no gid has a geo/shapefile
function getGeoTraceList() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
//            window.console.log(this.responseText);
            processGeoList();
        }
    };
    xmlhttp.open("GET","php/getGeoTraceList.php",true);
    xmlhttp.send();
}


function getAllTraces() {
window.console.log("calling getAllTraces..");
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var str=processTraceMeta("metaByAllTraces");
            document.getElementById("searchResult").innerHTML = makeResultTable(str);
            $.event.trigger({
                type: "tableLoadCompleted",
                "message": "completed",
            })
        }
    };
    xmlhttp.open("GET","php/getAllFaultTraces.php",true);
    xmlhttp.send();
}

function getZoneList() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            document.getElementById("zoneList").innerHTML = makeZoneList();
        }
    };
    xmlhttp.open("GET","php/getZoneList.php",true);
    xmlhttp.send();
}

function getSectionList() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            document.getElementById("sectionList").innerHTML = makeSectionList();
        }
    };
    xmlhttp.open("GET","php/getSectionList.php",true);
    xmlhttp.send();
}

function getNameList() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            document.getElementById("nameList").innerHTML = makeNameList();
        }
    };
    xmlhttp.open("GET","php/getNameList.php",true);
    xmlhttp.send();
}


function getAreaList() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            document.getElementById("areaList").innerHTML = makeAreaList();
        }
    };
    xmlhttp.open("GET","php/getAreaList.php",true);
    xmlhttp.send();
}

function getNativeList() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            makeNativeList();
        }
    };
    xmlhttp.open("GET","php/getNativeList.php",true);
    xmlhttp.send();
}

function get500mList() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            make500mList();
        }
    };
    xmlhttp.open("GET","php/get500mList.php",true);
    xmlhttp.send();
}

function get1000mList() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            make1000mList();
        }
    };
    xmlhttp.open("GET","php/get1000mList.php",true);
    xmlhttp.send();
}


function get2000mList() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            make2000mList();
        }
    };
    xmlhttp.open("GET","php/get2000mList.php",true);
    xmlhttp.send();
}

function getStrikeRange() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            [rangeMin, rangeMax]=getStrikeRangeMinMax();
            setupStrikeRangeSlider(rangeMin, rangeMax);
        }
    };
    xmlhttp.open("GET","php/getStrikeRange.php",true);
    xmlhttp.send();
}

function getDipRange() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            [rangeMin, rangeMax]=getDipRangeMinMax();
            setupDipRangeSlider(rangeMin, rangeMax);
        }
    };
    xmlhttp.open("GET","php/getDipRange.php",true);
    xmlhttp.send();
}


function getGeoJSONbyObjGid(gidarray, metaarray) {
    // if gidarray is not set look for it in the input field
    if(typeof gidarray == 'undefined') {    
        let tmp=document.getElementById("objGidTxt").value;
        gidarray= [ tmp ];
    }
    var gidarraystr=gidarray.toString();
        
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }   
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("geoSearchByObjGidResult").innerHTML = this.responseText;      
            // grab the geoJSON
            var geoDataList=grabGeoJSONDataList();
            var gcount=geoDataList.length;
            for(var i=0;i<gcount;i++) {
              var geom=geoDataList[i];
              var geoJSONList=grabGeoJSONList(geom);
              var geoBlindList=grabTraceBlindList(geom);
            
              var gid=parseInt(gidarray[i]);
              var trace=makeGeoJSONFeature(geoJSONList, geoBlindList, gid, metaarray[i]);
              if(trace != undefined)
                load_a_trace(gid,trace);
            }
        }     
    };  
    xmlhttp.open("GET","php/getGeoJSONbyObjGid.php?obj_gid="+gidarraystr,true);
    xmlhttp.send();
}   


function setupSearch()
{
   queryByType("area");
   queryByType("zone");
   queryByType("section");
   queryByType("name");
   getStrikeRange();
   getDipRange();
   getNativeList();
   get1000mList();
   get2000mList();
   get500mList();
}

/****************** for handling earthquakes ********************/
// to retrieve all is too big, and so going to make multiple calls with range
// make it to match with multiples of DATA_CHUNK_COUNT
function getAllEarthQuakesByChunk(quake_type,quake_meta) {
   if(quake_meta == null) { 
     window.console.log("BADD.. need to get metadata for seisimicity first..");
     return;
   }
   var total = parseInt(quake_meta['total']);
   var chunk_step;
   var chunks;
   switch (quake_type) {
      case QUAKE_TYPE_HAUKSSON : chunks=DATA_CHUNK_COUNT*2; break;
      case QUAKE_TYPE_ROSS : chunks=DATA_CHUNK_COUNT*2; break;
      case QUAKE_TYPE_HISTORICAL : chunks=1; break;
   }

   var chunk_step = Math.floor(total / chunks);
   var leftover=total - (chunk_step * chunks);

   startQuakeCounter(quake_meta);
   switchModalWaitEQLabel(quake_type);

   if(leftover > 0) {
      var startpoint= chunk_step * chunks;
      var endpoint= startpoint + leftover;
      _getLastQuakesByChunk(quake_type, startpoint, endpoint, chunk_step);
      } else {
        _getAllQuakesByChunk(quake_type, 0, chunks, chunk_step);
   } 
}

function _getAllQuakesByChunk(quake_type, current_chunk, total_chunk, chunk_step) {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var startpoint= chunk_step * current_chunk;
    var endpoint= startpoint + chunk_step;

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var eqarray=processQuakeResult("allQuakesByChunk");
            add2QuakeValue(eqarray.length);
            var next_chunk=current_chunk+1;

            if(next_chunk == total_chunk) { // got last chunk 
              add2QuakePoints(quake_type,eqarray);
              doneQuakeCounter();
              if(quake_type == QUAKE_TYPE_HAUKSSON) { // load ROSS next 
                 getAllQuakes(QUAKE_TYPE_ROSS);
              }
              if(quake_type == QUAKE_TYPE_ROSS) {
                 getAllQuakes(QUAKE_TYPE_HISTORICAL);
              }
              // display the hauksson depth for the initial setup after evertying comes in
              if(quake_type == QUAKE_TYPE_HISTORICAL) {
                  showQuakePoints(EQ_HAUKSSON_FOR_DEPTH,eqarray); // show it after adding last chunk
              } 
              } else{
                add2QuakePointsChunk(quake_type, eqarray,next_chunk, total_chunk, chunk_step);
            }
        }
    };
window.console.log("  calling php, current_chunk "+current_chunk+" start"+startpoint+" end"+endpoint);
    xmlhttp.open("GET","php/getAllQuakesByChunk.php?quake_type="+quake_type+"&startpoint="+startpoint+"&endpoint="+endpoint,true);
    xmlhttp.send();
}


function _getLastQuakesByChunk(quake_type, startpoint, endpoint, chunk_step) {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var eqarray=processQuakeResult("allQuakesByChunk");
            add2QuakeValue(eqarray.length);
            add2QuakePoints(quake_type,eqarray);
            // start earlier set
            var chunks = (quake_type == QUAKE_TYPE_HISTORICAL) ? 1 : (DATA_CHUNK_COUNT *2);
            _getAllQuakesByChunk(quake_type, 0, chunks, chunk_step);
//            _getAllQuakesByChunk(quake_type, 0, 2, 1000);
        }
    };
window.console.log(" calling php on the leftover.."+"start"+startpoint+" end"+endpoint);
    // need to include the last point..
    xmlhttp.open("GET","php/getAllQuakesByChunk.php?quake_type="+quake_type+"&startpoint="+startpoint+"&endpoint="+endpoint,true);
    xmlhttp.send();
}


// get meta first and then get all info in chunks
function getAllQuakes(quake_type) {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            cfm_quake_meta=processQuakeMeta(quake_type);
            getAllEarthQuakesByChunk(quake_type,cfm_quake_meta);
        }
    };
    xmlhttp.open("GET","php/getQuakeMeta.php?quake_type="+quake_type,true);
    xmlhttp.send();
}

function quakesByLatlon(quake_meta,swLat,swLon,neLat,neLon) {
    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // turn on data retrieval spiner..
    startQuakeCounter(quake_meta);
    switchModalWaitEQLabel(QUAKE_TYPE_HAUKSSON);

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var eqarray=processQuakeResult("quakesByLatLon");
            add2QuakeValue(eqarray.length);
            showQuakePointsAndBound(eqarray,swLat,swLon,neLat,neLon);
            doneQuakeCounter();
        }
    }
    xmlhttp.open("GET","php/quakesByLatlon.php?swlat="+swLat+"&swlon="+swLon+"&nelat="+neLat+"&nelon="+neLon,true);
    xmlhttp.send();
}
