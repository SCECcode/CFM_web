function getCRMAllTraces() {
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
            var str=processCRMTraceMeta("metaByAllTraces");
/****
            $.event.trigger({
                type: "tableLoadCompleted",
                "message": "completed",
            })
***/
        }
    };
    xmlhttp.open("GET","php/getCRMAllTraces.php",true);
    xmlhttp.send();
}

function getCRMGeoJSONbyObjGid(gidstr, meta) {
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
            var geoJSONList=grabCRMGeoJSONList();
            var gid=parseInt(gidstr);
            var trace=makeCRMGeoJSONFeature(geoJSONList, geoBlindList, gid, meta);
            if(trace != undefined)
              addGeoToMap(trace, viewermap);  //add straight
        }     
    };  
    xmlhttp.open("GET","php/getCRMGeoJSONbyObjGid.php?domain_gid="+gidstr,true);
    xmlhttp.send();
}   
