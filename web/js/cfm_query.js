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
