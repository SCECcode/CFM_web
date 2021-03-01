function searchByStrikeRange(min,max) {
    if (min == undefined || max == undefined) {
        document.getElementById("searchResult").innerHTML = "";
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
                cfm_active_gid_list=[];
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str = processSearchResult("searchByStrikeRange");
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        };
        xmlhttp.open("GET","php/byStrikeRange.php?min="+min+"&max="+max,true);
        xmlhttp.send();
    }
}


function searchWithStrikeRange() {
  //grab the min and max from the slider..
  vals = $( "#slider-strike-range" ).slider("option", "values");
window.console.log("search with strike range..  ",vals[0],vals[1]);
  searchByStrikeRange(vals[0],vals[1]);
}


function searchByDipRange(min,max) {
    if (min == undefined || max == undefined) {
        document.getElementById("searchResult").innerHTML = "";
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
                cfm_active_gid_list=[];
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str = processSearchResult("searchByDipRange");
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        };
        xmlhttp.open("GET","php/byDipRange.php?min="+min+"&max="+max,true);
        xmlhttp.send();
    }
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
            cfm_active_gid_list=[];
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var str=processSearchResult("searchByFaultName");
            document.getElementById("searchResult").innerHTML = makeResultTable(str);
        }
    };
    xmlhttp.open("GET","php/byFaultObjectName.php?q="+str,true);
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
            cfm_active_gid_list=[];
            document.getElementById("phpResponseTxt").innerHTML = this.responseText;
            var str=processSearchResult("searchByKeyword");
            document.getElementById("searchResult").innerHTML = makeResultTable(str);
        }
    };
    xmlhttp.open("GET","php/byKeyword.php?q="+str,true);
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
        document.getElementById("searchResult").innerHTML = "";
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
                cfm_active_gid_list=[];
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchByLatLon");
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        }
        xmlhttp.open("GET","php/byLatlon.php?firstlat="+firstlatstr+"&secondlat="+secondlatstr+"&firstlon="+firstlonstr+"&secondlon="+secondlonstr,true);
        xmlhttp.send();
    }
}

function searchByZone(str) {
    if (str == "") {
        document.getElementById("searchResult").innerHTML = "";
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
                cfm_active_gid_list=[];
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchByZone");
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        };
        xmlhttp.open("GET","php/byZone.php?q="+str,true);
        xmlhttp.send();
    }
}

function searchBySection(str) {
    if (str == "") {
        document.getElementById("searchResult").innerHTML = "";
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
                cfm_active_gid_list=[];
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchBySection");
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        };
        xmlhttp.open("GET","php/bySection.php?q="+str,true);
        xmlhttp.send();
    }
}

function searchByArea(str) {
    if (str == "") {
        document.getElementById("searchResult").innerHTML = "";
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
                cfm_active_gid_list=[];
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchByArea");
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        };
        xmlhttp.open("GET","php/byArea.php?q="+str,true);
        xmlhttp.send();
    }
}


function searchByName(str) {
    if (str == "") {
        document.getElementById("searchResult").innerHTML = "";
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
                cfm_active_gid_list=[];
                document.getElementById("phpResponseTxt").innerHTML = this.responseText;
                var str=processSearchResult("searchByName");
                document.getElementById("searchResult").innerHTML = makeResultTable(str);
            }
        };
        xmlhttp.open("GET","php/byName.php?q="+str,true);
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
    xmlhttp.open("GET","php/getAllTraces.php",true);
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


function getGeoJSONbyObjGid(gidstr, meta) {
    // if gidstr is not set look for it in the input field
    if(typeof gidstr == 'undefined')    
        gidstr=document.getElementById("objGidTxt").value;
        
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
            var geoJSONList=grabGeoJSONList();
            var geoBlindList=grabTraceBlindList();
            var gid=parseInt(gidstr);
            var trace=makeGeoJSONFeature(geoJSONList, geoBlindList, gid, meta);
            if(trace != undefined)
              load_a_trace(gid,trace);
        }     
    };  
    xmlhttp.open("GET","php/getGeoJSONbyObjGid.php?obj_gid="+gidstr,true);
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
