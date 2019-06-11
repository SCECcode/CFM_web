/***
   cfm_util.js

***/

var select_all_flag=0;

// strike range is from 5 to 359
var strike_range_min = 0;
var strike_range_max = 360;

// dip range is from ? to ?? 
var strike_range_min = 0;
var strike_range_max = 0;

function reset_strike_range()
{
  $( "#strike-range" ).val( strike_range_min + " - " + strike_range_max );
  $( "#slider-strike-range" ).slider("option", "values" ,[strike_range_min, strike_range_max]);
}

function setup_strike_range(min,max)
{
   strike_range_min=min;
   strike_range_max=max;
}

function reset_dip_range()
{
  $( "#dip-range" ).val( dip_range_min + " - " + dip_range_max );
  $( "#slider-dip-range" ).slider("option", "values" ,[dip_range_min, dip_range_max]);
}

function setup_dip_range(min,max)
{
   dip_range_min=min;
   dip_range_max=max;
}

function reset_select_region() {
  document.getElementById('selectRegion').selectedIndex=0;
}

function reset_select_section() {
  document.getElementById('selectSection').selectedIndex = 0;
}

function reset_select_system() {
  document.getElementById('selectSystem').selectedIndex = 0;
}

function reset_select_name() {
  document.getElementById('selectName').selectedIndex = 0;
}

function reset_select_keyword() {
  document.getElementById("keywordTxt").value = '';
}

function reset_select_latlon() {
  document.getElementById("firstLatTxt").value = '';
  document.getElementById("firstLonTxt").value = '';
  document.getElementById("secondLatTxt").value = 'optional';
  document.getElementById("secondLonTxt").value = 'optional';
}

// download meta data of selected highlighted faults 
// mlist should not be null
function downloadMeta(mlist) {
   var data;
   var timestamp;
   [data,timestamp]=getJSONFromMeta(mlist);
   saveAsBlobFile(data, timestamp);
}

function expandColorsControl() {
   if ( $('#colorSelect').hasClass('cfm-control-colors-expanded') ) {
     window.console.log("already expanded...");
     } else {
       $('#colorSelect').addClass('cfm-control-colors-expanded');
//      element = document.getElementById('colorSelect');
//      element.addEventListener('mouseleave', removeColorsControl);
   }
}

function removeColorsControl() {
   if ( $('#colorSelect').hasClass('cfm-control-colors-expanded') ) {
     $('#colorSelect').removeClass('cfm-control-colors-expanded');
//    element = document.getElementById('colorSelect');
//    element.removeEventListener('mouseleave', removeColorsControl);
     } else {
        window.console.log("hum.. not yet expanded...");
   }
}

// default -- all black
// by strike
// by dip
function changeFaultColor(type) {
    // val=$('input[name=cfm-fault-colors]:checked').val()
    use_fault_color=type;
    reset_fault_color();
    if (type == "") {
       removeKey();
       highlight_style.color = default_highlight_color;
    } else {
        showKey(type);
        highlight_style.color = alternate_highlight_color;
    }

    // switch
    $("#searchResult table tr.row-selected").each(function(){
        var gid = $(this).attr("id").split("_")[1];
        var l=find_layer_list(gid);
        var geolayer=l['layer'];
        geolayer.eachLayer(function(layer) {
            layer.setStyle(highlight_style);
        });
    });
}


// for native, 500m, 1000m
// with added metadata file
// mlist should not be null
function downloadURLsAsZip(mlist) {
  var data;
  var timestamp;
  var url;
  var dname;

  [data,timestamp]=getJSONFromMeta(mlist);
  var nzip=new JSZip();

  // put in the metadata
  var fname="CFM_metadata_"+timestamp+".json"; 
  nzip.file(fname, data);
  var cnt=mlist.length;

  for(var i=0; i<cnt; i++) {
    var meta=mlist[i];
    var gid=meta['gid'];
    if (use_download_set == 'native') {
      if(in_native_gid_list(gid)) {
        url=url_in_native_list(gid);
        if(url) {
          dname=url.substring(url.lastIndexOf('/')+1);
          var promise = $.get(url);
          nzip.file(dname,promise);
        }
      }
      continue;
    }
    if (use_download_set == '500m') {
      if(in_500m_gid_list(gid)) {
        url=url_in_500m_list(gid);
        if(url) {
          dname=url.substring(url.lastIndexOf('/')+1);
          var promise = $.get(url);
          nzip.file(dname,promise);
        }
      }
      continue;
    }
    if (use_download_set == '1000m') {
      if(in_1000m_gid_list(gid)) {
        url=url_in_1000m_list(gid);
        if(url) {
          dname=url.substring(url.lastIndexOf('/')+1);
          var promise = $.get(url);
          nzip.file(dname,promise);
        }
      }
      continue;
    }
  }

  var zipfname="CFM_"+timestamp+".zip"; 
  nzip.generateAsync({type:"blob"}).then(function (content) {
    // see FileSaver.js
    saveAs(content, zipfname);
  })
}


function expandDownloadControl() {
   if ( $('#downloadSelect').hasClass('cfm-control-download-expanded') ) {
     window.console.log("already expanded...");
     } else {
       $('#downloadSelect').addClass('cfm-control-download-expanded');
   }
}

function removeDownloadControl() {
    var divs=document.getElementsByClassName('cfm-control-download-selector');
    for(var i = 0; i < divs.length; i++)
    {
      var div=divs[i];
      if(div.checked == true) {
         div.checked=false;
         reset_download_set();
         return;
      }
    }
   if ( $('#downloadSelect').hasClass('cfm-control-download-expanded') ) {
     $('#downloadSelect').removeClass('cfm-control-download-expanded');
     } else {
        window.console.log("hum.. not yet expanded...");
   }
}

function changeDownloadSet() {
    var val=$('input[name=cfm-fault-download]:checked').val() 
    use_download_set=val;
    startDownload();
}

function executeDownload(type) {
    use_download_set = type;
    startDownload();
}

function startDownload()
{
  // collect up the meta data from the highlighted set of traces
  var hlist=get_highlight_list();
  var mlist=get_meta_list(hlist);
  var cnt=mlist.length;
  if(cnt == 0) {
    alert("No fault selected"); 
    return;
  }
  if (use_download_set == 'meta') {
    downloadMeta(mlist);
    } else {
      downloadURLsAsZip(mlist);
  }
}

function plotAll() {
//  load_geo_list_layer();
  load_trace_list();
}

function toggleAll() {
  cfm_toggle_plot= !cfm_toggle_plot;
  if(cfm_toggle_plot) {
// make every layer visible ignoring highlight changes
// preserve all visibility state
    toggle_on_all_layer()
    makeResultTableWithList(cfm_gid_list);
    } else {
      clear_popup();
      toggle_off_all_layer()
      // need to revert to the current search result
      makeResultTableWithList(cfm_active_gid_list);
  }
}

function selectAll() {
  if(select_all_flag == 0) {
    select_all_flag=1;
    select_layer_list();
      $('#allBtn span').removeClass("glyphicon-unchecked").addClass("glyphicon-check");
    } else {
       reset_layer_list();
       select_all_flag=0;
      $('#allBtn span').removeClass("glyphicon-check").addClass("glyphicon-unchecked");
  }
} 
function refreshAll() {
  reset_select_region();
  reset_select_section();
  reset_select_system();
  reset_select_name();
  reset_strike_range();
  reset_dip_range();
  reset_select_keyword();
  reset_select_latlon();
  document.getElementById("geoSearchByObjGidResult").innerHTML = "";
  document.getElementById("searchResult").innerHTML = "";
  document.getElementById("phpResponseTxt").innerHTML = "";
  $("#search-type").val("");
//  document.getElementById("objGidTxt").value = '';
  refresh_map();
  dismiss_sidebar();
  clear_popup();
  reset_geo_plot();
}

// building up the content for the popup window on plot
function _item(meta,str,type,name) {
    if(meta[type] == undefined || meta[type] == "") {
       str = str + name + ": NA";
       } else {
         str = str + name+ ": "+meta[type];
    }
    return str;
}

function getMainContentFromMeta(meta) {
    var content=meta['fault'];
    content=content+"<hr>";
    content=content+"SYSTEM: "+meta['system'];
    content=content+"<br>REGION: "+meta['region'];
    content=content+"<br>SECTION: "+meta['section'];
    content=content+"<br><br>";
    content=_item(meta,content,'source_Author','AUTHOR');
    content=content+"<br>VERSION: "+meta['CFM_version'];
    content=content+"<br>USGS_ID: "+meta['USGS_ID'];
    content=content+"<br><br>";
    content=add_details_btn(meta,content);
    content=add_highlight_btn(meta,content);
    return content;
}

function getMetadataRowForDisplay(meta) {
   let downloadButtons = get_downloads_btn(meta);
   var area = "";
   if (meta['area'] > 0) {
       area = parseInt(meta['area']).toExponential();
   }

   var content = `
   <tr id="metadata-${meta['gid']}">
       <td>${meta['fault']}</td>
       <td>${meta['system']}</td>
       <td>${meta['region']}</td>
       <td>${meta['section']}</td>
       <td>${meta['CFM_version']}</td>
       <td>${meta['strike']}</td>
       <td>${meta['dip']}</td>
       <td>${area}</td>
       <td class="download-link">${downloadButtons}</td>
   </tr>
   `;
   return content;
}

function show_details(gid)
{
   var l=find_layer_list(gid);
   if(l) {
      geoLayer=l['layer'];
      geoLayer.eachLayer(function(layer) {
        popupDetails(layer);
      });
   }
}


function getSecondaryContentFromMeta(meta) {
// get info on this..
    var content=meta['fault'];
    content=content+"<hr>";
    content=_item(meta,content,'strike','STRIKE');
    content=content+"<br>";
    content=_item(meta,content,'dip','DIP');
    content=content+"<br>";
    content=_item(meta,content,'area','AREA');
    content=content+"<br>";
    content=_item(meta,content,'exposure','EXPOSURE');
    content=content+"<br>";
    content=_item(meta,content,'final_slip_sense','FINAL_SLIP_SENSE');
    content=content+"<br><br>";
    content=add_downloads_btn(meta,content);
    return content;
}

function getLevel3ContentFromMeta(meta) {
// get info on this..
    var content=meta['fault'];
    content=content+"<hr>";
    content=_item(meta,content,'alternative','ALTERNATIVE');
    content=_item(meta,content,'model_description','MODEL_DESCRIPTION');
    content=_item(meta,content,'descriptor','DESCRIPTOR');
    content=_item(meta,content,'reference','REFERENCE');
    content=_item(meta,content,'reference_check','REFERENCE_CHECK');
    content=_item(meta,content,'ID_comments','ID_COMMENTS');
    return content;
}


// build up json format for output metadata
// mlist = [ meta1, meta2 ]
// JSON = { "timestamp":date,"metadata":[ { fault1-meta }, {fault2-meta} ..] }
function getJSONFromMeta(mlist) {
    var timestamp = $.now(); //https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
    var data={"timestamp":timestamp, "metadata":mlist };
    var jsonblob=JSON.stringify(data);
//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    return [jsonblob,timestamp];
}

function getGidFromMeta(meta) {
   var gid=meta['gid'];
   return gid;
}

function getColorFromMeta(meta) {

    var color="black";
    var strike=meta['strike'];
    var dip=meta['dip'];

    if(use_fault_color=="strike" && strike != undefined && strike != "") {
        v=parseInt(strike);
        v=(v-strike_range_min)/(strike_range_max-strike_range_min);
        blue = Math.round(255 * v);
        green = 0;
        red = Math.round((1-v)*255);
        color="RGB(" + red + "," + green + "," + blue + ")";
     } 

    if(use_fault_color=="dip" && dip != undefined && dip != "") {
        v=parseInt(dip);
        v=(v-dip_range_min)/(dip_range_max-dip_range_min);
        blue = Math.round(255 * v);
        green = 0;
        red = Math.round((1-v)*255);
        color="RGB(" + red + "," + green + "," + blue + ")";
     } 

     return color;
}


function processGeoList() {
    geostr = $('[data-side="allGeoList"]').data('params');
    nogeostr = $('[data-side="allNoGeoList"]').data('params');
    if(geostr == undefined || nogeostr == undefined) {
        window.console.log("processGeoList: BAD BAD BAD");
        return;
    }

    var sz=geostr.length;
    window.console.log("Number of geo gid from backend ->",sz);
    for( var i=0; i< sz; i++) {
       var gidstr=geostr[i];
       var gid=parseInt(gidstr);
       cfm_gid_list.push(gid);
    }

    sz=nogeostr.length;
    window.console.log("Number of no geo gid from backend ->",sz);
    for( var i=0; i< sz; i++) {
       var gidstr=nogeostr[i];
       var gid=parseInt(gidstr);
       cfm_gid_list.push(gid);
       cfm_nogeo_gid_list.push(gid);
    }
    window.console.log("total mixed geo..", cfm_gid_list.length);

}

// extract meta data blob from php backend, extract object_tb's gid and 
// use that to grab the matching geoJson
function processTraceMeta(metaList) {
    var str="";

    if (metaList == 'metaByAllTraces') {
        str = $('[data-side="allTraces"]').data('params');
    }

    if(str == undefined) {
       window.console.log("processTraceMeta: BAD BAD BAD");
       return;
    }

    var sz=(Object.keys(str).length);
    window.console.log("Number of meta blobs received from backend ->",sz);
    // iterate through the list and grab the geo info and update leaflet feature
    // structure one by one
    for( var i=0; i< sz; i++) {
       var t=str[i];
       var meta = JSON.parse(str[i]);
       var gidstr=meta['gid'];
       var gid=parseInt(gidstr);
       if(metaList == 'metaByAllTraces') {
         cfm_fault_meta_list.push({"gid":gid, "meta": meta });
         if( !in_nogeo_gid_list(gid)) {
           getGeoJSONbyObjGid(gidstr,meta);
         }
         } else {
           window.console.log("BAD ??");
       }
    }
    return str;
}

function processSearchResult(rlist) {
    cfm_search_gid_list=[];
    var str="";
    if (rlist == 'searchByFaultObjectName') {
        str = $('[data-side="resultByFaultObjectName"]').data('params');
    }
    if (rlist == 'searchByLatLon') {
        str = $('[data-side="resultByLatLon"]').data('params');
    }
    if (rlist == 'searchByKeyword') {
        str = $('[data-side="resultByKeyword"]').data('params');
    }
    if (rlist == 'searchBySystem') {
        str = $('[data-side="resultBySystem"]').data('params');
    }
    if (rlist == 'searchByRegion') {
        str = $('[data-side="resultByRegion"]').data('params');
    }
    if (rlist == 'searchBySection') {
        str = $('[data-side="resultBySection"]').data('params');
    }
    if (rlist == 'searchByName') {
        str = $('[data-side="resultByName"]').data('params');
    }
    if (rlist == 'searchByStrikeRange') {
        str = $('[data-side="resultByStrikeRange"]').data('params');
    }
    if (rlist == 'searchByDipRange') {
        str = $('[data-side="resultByDipRange"]').data('params');
    }

    if(str == undefined) {
       window.console.log("processSearchResult: BAD BAD BAD");
       return;
    }

    // gid, name
    var sz=(Object.keys(str).length);
    window.console.log("Number of gid blobs received from backend ->",sz);
    for( var i=0; i< sz; i++) {
       var tmp= JSON.parse(str[i]);
       var gid=parseInt(tmp['gid']);
       cfm_active_gid_list.push(gid);
       if( ! in_nogeo_gid_list(gid)) {
          toggle_layer(gid);
       }
   
    }
    return (str);
}

function gotAllGeoJSON() {
  if (cfm_fault_meta_list.length == cfm_trace_list.length)
    return 1;
  return 0;
}

// extract the geo json blob from the backend php
function getGeoJSON() {
    var alist = $('[data-side="geo-json"]').data('params');
    if(alist == undefined) {
      window.console.log("EROR -- geometry is empty");
      return "";
    }
    var str=alist[0];
    return str;
}

function getStrikeRangeMinMax() {
    str= $('[data-side="strike-range"]').data('params');
    rMin=parseInt(str.min);
    rMax=parseInt(str.max);
    return [rMin, rMax];
}

function getDipRangeMinMax() {
    str= $('[data-side="dip-range"]').data('params');
    rMin=parseInt(str.min);
    rMax=parseInt(str.max);
    return [rMin, rMax];
}

function makeNativeList() {
    var str = $('[data-side="objNative"]').data('params');
    if (str == undefined)
      return "";

    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var gid=parseInt(s['gid']);
       var name=s['name'];
       var url=s['url'];
       var objgid=parseInt(s['objgid']);
       cfm_native_list.push( {"gid":gid, "name":name, "url":url, "objgid":objgid } );
       cfm_native_gid_list.push(objgid);
    }
}

function make500mList() {
    var str = $('[data-side="obj500m"]').data('params');
    if (str == undefined)
      return "";

    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var gid=parseInt(s['gid']);
       var name=s['name'];
       var url=s['url'];
       var objgid=parseInt(s['objgid']);
       cfm_500m_list.push( {"gid":gid, "name":name, "url":url, "objgid":objgid } );
       cfm_500m_gid_list.push( objgid );
    }
}

function make1000mList() {
    var str = $('[data-side="obj1000m"]').data('params');
    if (str == undefined)
      return "";

    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var gid=parseInt(s['gid']);
       var name=s['name'];
       var url=s['url'];
       var objgid=parseInt(s['objgid']);
       cfm_1000m_list.push( {"gid":gid, "name":name, "url":url, "objgid":objgid } );
       cfm_1000m_gid_list.push(objgid);
    }
}
