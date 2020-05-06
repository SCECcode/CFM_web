/**
   cfm_util.js

***/

var select_all_flag=0;

// this is to collect up all the names used
// in composing the selected faults
// for modal popup
var MODAL_TS_LIST=[];
var MODAL_TS_PATH=null;
function clear_MODAL_TS_LIST()
{
  MODAL_TS_LIST=[];
  MODAL_TS_PATH=null;
}

function save_MODAL_TS_LIST(url)
{
// https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM5/CFM52_preferred/500m/CRFA-BPPM-WEST-Big_Pine_fault-CFM2_m500.ts
  var n;
  var path;
  var file;

  n=url.indexOf('/500m/');
  if(n == -1) {
    n=url.indexOf('/1000m/');
    if( n == -1) {
      n=url.indexOf('/2000m/');
      if( n == -1) {
        n=url.indexOf('/native/');
      }
    }
  }
  if( n != -1) {
    path=url.substring(0,n+1);
    file=url.substring(n+1);
    MODAL_TS_PATH=path;
    MODAL_TS_LIST.push(file);
    } else {
      MODAL_TS_LIST.push(url);
  }
}

function get_MODAL_TS_LIST()
{
   var str=MODAL_TS_LIST.toString();
   if(MODAL_TS_PATH != null) {
     var pstr=MODAL_TS_PATH.toString();
     var ppstr="&filePATH=["+pstr+"]";
     return "["+str+"]"+ppstr;
   }
   return "["+str+"]";
}

/********************************************************/

// strike range is from 5 to 359
var strike_range_min = 0;
var strike_range_max = 360;

// dip range is from ? to ?? 
var dip_range_min = 0;
var dip_range_max = 0;

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

function reset_select_zone() {
  document.getElementById('selectZone').selectedIndex=0;
}

function reset_select_section() {
  document.getElementById('selectSection').selectedIndex = 0;
}

function reset_select_area() {
  document.getElementById('selectArea').selectedIndex = 0;
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
function downloadJSONMeta(mlist) {
   var data;
   var timestamp;
   [data,timestamp]=getJSONFromMeta(mlist);
   saveAsJSONBlobFile(data, timestamp);
}

// download meta data of selected highlighted faults 
// mlist should not be null
function downloadCSVMeta(mlist) {
   var data;
   var timestamp;
   [data,timestamp]=getCSVFromMeta(mlist);
   saveAsCSVBlobFile(data, timestamp);
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
       blind_highlight_style.color = default_highlight_color;
    } else {
        showKey(type);
        highlight_style.color = alternate_highlight_color;
        blind_highlight_style.color = alternate_highlight_color;
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


// for native, 500m, 1000m, 2000m
// with added metadata file
// mlist should not be null
function downloadURLsAsZip(mlist) {
  var data;
  var timestamp;
  var url;
  var dname;

  [data,timestamp]=getCSVFromMeta(mlist);
  var nzip=new JSZip();

  // put in the metadata
  var fname="CFM_metadata_"+timestamp+".csv"; 
  nzip.file(fname, data);

  var cnt=mlist.length;
  for(var i=0; i<cnt; i++) {
    var meta=mlist[i];
    var gid=meta['gid'];
    if (use_download_set == 'native' || use_download_set =='all') {
      if(in_native_gid_list(gid)) {
        url=url_in_native_list(gid);
        if(url) {
          dname=url.substring(url.lastIndexOf('/')+1);
          var promise = $.get(url);
          nzip.file(dname,promise);
        }
      }
      if( use_download_set != 'all')
        continue;
    }
    if (use_download_set == '500m' || use_download_set == 'all') {
      if(in_500m_gid_list(gid)) {
        url=url_in_500m_list(gid);
        if(url) {
          dname=url.substring(url.lastIndexOf('/')+1);
          var promise = $.get(url);
          nzip.file(dname,promise);
        }
      }
      if( use_download_set != 'all')
        continue;
    }
    if (use_download_set == '1000m' || use_download_set == 'all') {
      if(in_1000m_gid_list(gid)) {
        url=url_in_1000m_list(gid);
        if(url) {
          dname=url.substring(url.lastIndexOf('/')+1);
          var promise = $.get(url);
          nzip.file(dname,promise);
        }
      }
      if( use_download_set != 'all')
        continue;
    }
    if (use_download_set == '2000m' || use_download_set == 'all') {
      if(in_2000m_gid_list(gid)) {
        url=url_in_2000m_list(gid);
        if(url) {
          dname=url.substring(url.lastIndexOf('/')+1);
          var promise = $.get(url);
          nzip.file(dname,promise);
        }
      }
      if( use_download_set != 'all')
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
  window.console.log("number of entry to download...");
  window.console.log(cnt);
  if(cnt == 0) {
    alert("No fault selected"); 
    return;
  }
  if (use_download_set == 'meta' || use_download_set == 'all') {
    downloadCSVMeta(mlist);
  }

  if(use_download_set != 'meta') {
    downloadURLsAsZip(mlist);
  }
}

function executePlot3d(type) {
    use_download_set = type;
    startPlot3d();
}

function startPlot3d()
{
  // collect up the meta data from the highlighted set of traces
  var hlist=get_highlight_list();
  var mlist=get_meta_list(hlist);
  var cnt=mlist.length;
  if(cnt == 0) {
    alert("No fault selected"); 
    return;
  }

  collectURLsFor3d(mlist);
  var str=get_MODAL_TS_LIST();
  show3dView(str);
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
  reset_select_zone();
  reset_select_section();
  reset_select_area();
  reset_select_name();
  reset_strike_range();
  reset_dip_range();
  reset_select_keyword();
  reset_select_latlon();
  document.getElementById("geoSearchByObjGidResult").innerHTML = "";
  document.getElementById("searchResult").innerHTML = "";
  document.getElementById("phpResponseTxt").innerHTML = "";
  $("#search-type").val("dismissClick");
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

function getMetadataRowForDisplay(meta) {
   let downloadButtons = get_downloads_btn(meta);
   var area_m2 = "";
   if (meta['area_m2'] > 0) {
       area_m2 = parseInt(meta['area_m2']).toExponential();
   }

   var content = `
   <tr id="metadata-${meta['gid']}">
       <td>${meta['fault']}</td>
       <td>${meta['area']}</td>
       <td>${meta['zone']}</td>
       <td>${meta['section']}</td>
       <td>${meta['CFM_version']}</td>
      <!-- <td>${meta['strike']}</td>
       <td>${meta['dip']}</td>
       <td>${area_m2}</td> -->
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

// build up csv format for output metadata
// CSV < fault1-meta , fault2-meta ..
function getCSVFromMeta(mlist) {

    var timestamp = $.now(); //https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript

    var data={"timestamp":timestamp, "metadata":mlist };
    var len=mlist.length;  // each data is a meta data format
    // grab the first meta data and generate the title..
    var i=0;
    if(len < 1) {
        return [ "", timestamp ];
    } 
    var last=len-1;
    var meta=mlist[0];
    var keys=Object.keys(meta);
    var kblob=keys.join(",");
    var csvblob = keys.join(",");
    csvblob +='\n';
    for(i=0; i< len; i++) {
       meta=mlist[i];
       var values=Object.values(meta)
       var vblob=values.join(",");
       csvblob += vblob;
       if(i != last) {
         csvblob +='\n';
       }
   }
//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
    return [csvblob,timestamp];
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

       // update Traces_tb_gid to be array
       var t=meta['TRACE_tb_gid']; 
       var nt=t.replace('{','[');
       var nnt=nt.replace('}',']');
       var trace_tb_gid=JSON.parse(nnt);
       meta['TRACE_tb_gid']=trace_tb_gid;

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
    if (rlist == 'searchByArea') {
        str = $('[data-side="resultByArea"]').data('params');
    }
    if (rlist == 'searchByZone') {
        str = $('[data-side="resultByZone"]').data('params');
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
function grabGeoJSON() {
    var alist = $('[data-side="geo-json"]').data('params');
    if(alist == undefined) {
      window.console.log("EROR -- geometry is empty");
      return "";
    }
    var str=alist[0];
    return str;
}

// extract the geo json blob from the backend php
function grabGeoJSONList() {
    var gdata = $('[data-side="geo-json"]').data('params');
    if(gdata == undefined) {
      window.console.log("EROR -- geometry is empty");
      return "";
    }
    var glist=gdata['geoms'];
    return glist;
}

// extract the blind list from the backend php
function grabTraceBlindList() {
    var gdata = $('[data-side="geo-json"]').data('params');
    if(gdata == undefined) {
      window.console.log("EROR -- geo-json is empty");
      return "";
    }
//    var tlist=gdata['tgids'];
//    var olist=gdata['ogids'];
    var blist=gdata['blinds'];
    return blist;
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

function make2000mList() {
    var str = $('[data-side="obj2000m"]').data('params');
    if (str == undefined)
      return "";

    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var gid=parseInt(s['gid']);
       var name=s['name'];
       var url=s['url'];
       var objgid=parseInt(s['objgid']);
       cfm_2000m_list.push( {"gid":gid, "name":name, "url":url, "objgid":objgid } );
       cfm_2000m_gid_list.push(objgid);
    }
}

/****************************************************/
function collectURLsFor3d(mlist) {
  var url;
  var dname;
  clear_MODAL_TS_LIST();

  var cnt=mlist.length;
  for(var i=0; i<cnt; i++) {
    var meta=mlist[i];
    var gid=meta['gid'];
    if (use_download_set == 'native' || use_download_set =='all') {
      if(in_native_gid_list(gid)) {
        url=url_in_native_list(gid);
        if(url) {
          save_MODAL_TS_LIST(url);
        }
      }
      if( use_download_set != 'all')
        continue;
    }
    if (use_download_set == '500m' || use_download_set == 'all') {
      if(in_500m_gid_list(gid)) {
        url=url_in_500m_list(gid);
        if(url) {
          save_MODAL_TS_LIST(url);
        }
      }
      if( use_download_set != 'all')
        continue;
    }
    if (use_download_set == '1000m' || use_download_set == 'all') {
      if(in_1000m_gid_list(gid)) {
        url=url_in_1000m_list(gid);
        if(url) {
          save_MODAL_TS_LIST(url);
        }
      }
      if( use_download_set != 'all')
        continue;
    }
    if (use_download_set == '2000m' || use_download_set == 'all') {
      if(in_2000m_gid_list(gid)) {
        url=url_in_2000m_list(gid);
        if(url) {
          save_MODAL_TS_LIST(url);
        }
      }
      if( use_download_set != 'all')
        continue;
    }
  }

}
