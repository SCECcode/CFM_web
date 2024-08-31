/***
   cfm_util.js

***/

var select_all_flag=0;

// This is for plot3d PRESET MODE
// if there are too many faults, don't show the share link
// cut-and-paste size limit might exceed.
var PLOT3D_PRESET_NAMELIST_MAX=50;
var PLOT3D_PRESET_MODE = 0;
var PLOT3D_PRESET_CAMERA = 0;
var PLOT3D_PRESET_STATE = 0;
var PLOT3D_PRESET_NAMELIST=[];  // bare name list

// from the whole fault object set
var strike_range_min_ref=0;
var strike_range_max_ref=360;
var strike_range_min = 0;
var strike_range_max = 0;
// from the whole set
var dip_range_min_ref = 0;
var dip_range_max_ref = 0;
var dip_range_min = 0;
var dip_range_max = 0;

function getRnd() {
//https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
    var timestamp = $.now();
    var rnd="CFM_"+timestamp;
    return rnd;
}

function switchModalWaitEQLabel(quake_type) {
  var p = document.getElementById("modalwaiteqLabel");
  var p2 = document.getElementById("modalwaiteqLabel2");
  switch (quake_type) {
     case QUAKE_TYPE_HAUKSSON: 
       p.textContent="Retrieving relocated seismicity";
       p2.textContent="Please wait: with ~1.6m events, this may take a few minutes"; break;
     case QUAKE_TYPE_SIGNIFICANT:
       p.textContent="Retrieving events 1900-2021 > M6.0";
       p2.textContent="Should be very quick"; break;
  }
}

var eq_counter_cnt;
// track the eq-counter
function startQuakeCounter(quake_meta) {
  let elm = $("#eq-expected");
  elm.val(parseInt(quake_meta['total']));
  elm = $("#eq-total");
  elm.val(0);
  eq_counter_cnt=0;
  $("#modalwaiteq").modal({ backdrop: 'static', keyboard: false });
}
function doneQuakeCounter() { 
  $("#modalwaiteq").modal('hide');
}

function add2QuakeCounter(v) {
//window.console.log("V: adding more EQs: %d(%d)",v, eq_counter_cnt);
  eq_counter_cnt++;
  let elm = $("#eq-total");
  let o=parseInt(elm.val());
  let n=o+v; 
  elm.val(n);
  let maxelm  = $("#eq-expected");
  let max = parseInt(maxelm.val());
  var width = Math.floor((n/max) * 100);
  updatePrograssBar(width);
}

// buckets starts with 36 
var eq_valcounter_cnt;
function startQuakeCounterWithVal(buckets) {
  let elm = $("#eq-expected");
  elm.val(buckets);
  elm = $("#eq-total");
  elm.val(0);
  eq_valcounter_cnt=0;
  $("#modalwaiteq").modal({ backdrop: 'static', keyboard: false });
}
function doneQuakeCounterWithVal() {
  $("#modalwaiteq").modal('hide');
}
function add2QuakeCounterWithVal(v) {
//window.console.log("B: adding more EQs: and now has %d",eq_valcounter_cnt);
  let elm = $("#eq-total");
  let o=parseInt(elm.val());
  eq_valcounter_cnt++;
  let n=o+v;
  elm.val(n);
  let maxelm  = $("#eq-expected");
  let max = parseInt(maxelm.val());
  var width = Math.floor((n/max) * 100);
  updatePrograssBar(width);
}


// track the geo-counter
function setGeoTargetValue(v) {
  $("#modalwait").modal({ backdrop: 'static', keyboard: false });
  let elm = $("#geo-total");
  elm.val(v);
}
function addOne2GeoCounter() { 
  let elm = $("#geo-counter");
  let v = parseInt(elm.val())+1;
  let maxelm = $("#geo-total");
  let max = parseInt(maxelm.val());
  elm.val(v);
  if (v == max) { // turn off spinner
window.console.log("Finished loading faults..");
    $("#modalwait").modal('hide')
    return 1;
  }
  return 0;
}

// clone the initial geo list or the active searched list
// into a reference list
function recordReferenceSet(glist) {
   cfm_reference_gid_list = [].concat(glist);
   window.console.log(">>>recording number of reference faults..",cfm_reference_gid_list.length);
}

// from landing page
function recordActiveReference() {
   recordReferenceSet(cfm_active_gid_list);
   enable_last_record_btn();
   var elm=document.getElementById("search-filter-type");
   elm.selectedIndex=0;
   dismiss_sidebar();
   [cfm_reference_map_center, cfm_reference_map_zoom] = get_map();
}

//need to revert to the current search result
function resetLastRecordReference() {
  cfm_active_gid_list=cfm_reference_gid_list;

  clear_popup();
  toggle_off_all_layer()
  toggle_layer_with_list(cfm_active_gid_list);
  makeResultTableWithList(cfm_active_gid_list);

  var elm=document.getElementById("search-filter-type");
  elm.selectedIndex=0;
  dismiss_sidebar();
  set_map(cfm_reference_map_center, cfm_reference_map_zoom);
}

function resetRecordReference() {
  disable_record_btn();
  disable_last_record_btn();
  recordReferenceSet(cfm_gid_list);
}

function set_current_strike_range_slider()
{
  [min, max]=get_current_strike_range();
  strike_range_min=min;
  strike_range_max=max;
//  set_strike_range_color(min,max);
  $( "#slider-strike-range" ).slider("option", "values" ,[min, max]);
}
function setup_strike_range_ref(min,max)
{
   strike_range_min_ref=strike_range_min=min;
   strike_range_max_ref=strike_range_max=max;
}
function reset_select_strike()
{
  $( "#slider-strike-range" ).slider("option", "values" ,[strike_range_min_ref, strike_range_max_ref]);
  set_strike_range_color(strike_range_min_ref,strike_range_max_ref)
}

function set_current_dip_range_slider()
{
  [min, max]=get_current_dip_range(); 
  dip_range_min=min;
  dip_range_max=max;
//  set_dip_range_color(min,max);
  $( "#slider-dip-range" ).slider("option", "values" ,[min, max]);
}
function setup_dip_range_ref(min,max)
{
   dip_range_min_ref=dip_range_min=min;
   dip_range_max_ref=dip_range_max=max;
}
function reset_select_dip()
{
  $( "#slider-dip-range" ).slider("option", "values" ,[dip_range_min_ref, dip_range_max_ref]);
  set_dip_range_color(dip_range_min_ref,dip_range_max_ref);
}

function makeDipRGB(val) {
    var v=val;
    v=(v-dip_range_min_ref)/(dip_range_max_ref-dip_range_min_ref);
    let blue = Math.round(255 * v);
    let green = 0;
    let red = Math.round((1-v)*255);
    let color="RGB(" + red + "," + green + "," + blue + ")";
    return color;
}

function makeStrikeRGB(val) {
    var v=val;
    v=(v-strike_range_min_ref)/(strike_range_max_ref-strike_range_min_ref);
    let blue = Math.round(255 * v);
    let green = 0;
    let red = Math.round((1-v)*255);
    let color="RGB(" + red + "," + green + "," + blue + ")";
    return color;
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

// default -- all black --> ""
// by avg_strike --> "strike"
// by avg_dip    --> "dip"
// change the fault color in the map view 
function changeFaultColor(type) {
    // val=$('input[name=cfm-fault-colors]:checked').val()
    use_fault_color=type;
    reset_fault_color();
    if (type == "") {
       removeKey();
       set_fault_color_default();
    } else {
        showKey(type);
        set_fault_color_alternate();
    }

    // change color of all the highlighted layers..
    // to the other default highlight color now that the fault
    // color got changed
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
window.console.log("number of entry to download..."+cnt);
  if(cnt == 0) {
    alert("startDownload: No fault selected"); 
    return;
  }
  if (use_download_set == 'meta') {
    downloadCSVMeta(mlist);
  } else {
    downloadURLsAsZip(mlist);
  }
}

function executePlot3d(type) {
    use_download_set = type;
    startPlot3d();
    showPlot3dWarning();
}

function startPlot3d()
{
  // collect up the meta data from the highlighted set of traces
  var hlist=get_highlight_list();
  var mlist=get_meta_list(hlist);
  var cnt=mlist.length;
  if(cnt == 0) {
    alert("startPlot3d: No fault selected"); 
    return;
  }

  collectURLsFor3d(mlist);
  var nstr=get_MODAL_TS_NAME();
  var str=get_MODAL_TS_LIST();
  var pstr=get_MODAL_TS_PATH();
  var nlstr=JSON.stringify(PLOT3D_PRESET_NAMELIST);
  show3dView(str,nstr,pstr,nlstr);
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

// function changeFaultColor(type) {

function selectAll() {
  if(select_all_flag == 0) {
    select_all_flag=1;
    select_layer_list();
    $('#allBtn span').removeClass("glyphicon-unchecked").addClass("glyphicon-check");
    if(use_fault_color == "strike" || use_fault_color == "dip") { 
       removeKey();
    }
    } else {
       reset_layer_list(); // style is in original color
       if(use_fault_color == "strike" || use_fault_color == "dip") {
          showKey(use_fault_color);
       } 
       select_all_flag=0;
       $('#allBtn span').removeClass("glyphicon-check").addClass("glyphicon-unchecked");
  }
} 

/* reset all the layers and inner to be a fresh start */
function refreshAll() {
  reset_select_external();
  reset_select_zone();
  reset_select_section();
  reset_select_area();
  reset_select_name();
  reset_select_keyword();
  reset_select_latlon();
  reset_select_strike();
  reset_select_dip();

  resetRecordReference();

  document.getElementById("geoSearchByObjGidResult").innerHTML = "";
// only cfm-table-body part needs to be refreshed
  document.getElementById("cfm-table-body").innerHTML = "";
  document.getElementById("phpResponseTxt").innerHTML = "";
  $("#search-filter-type").val("dismissClick");
//  document.getElementById("objGidTxt").value = '';
  $('#allBtn span').removeClass("glyphicon-check").addClass("glyphicon-unchecked");

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

   var content = ` 
   <tr id="metadata-${meta['gid']}">
       <td><button class=\"btn btn-sm cfm-small-btn\" id=\"button_meta_${meta['gid']}\" title=\"remove the fault\" onclick=toggle_highlight("${meta['gid']}");><span id=\"highlight_meta_${meta['gid']}\" class=\"glyphicon glyphicon-trash\"></span></button></td>
       <td class="meta_td" >${meta['fault']}</td>
       <td class="meta_td" >${meta['area']}</td>
       <td class="meta_td" >${meta['zone']}</td>
       <td class="meta_td" >${meta['section']}</td>
       <td class="meta_td" >${meta['last_update']}</td>
       <td class="meta_td" >${meta['avg_strike']}</td>
       <td class="meta_td" >${meta['avg_dip']}</td>
       <td class="meta_td" >${meta['area_km2']}</td>
       <td class="download-link" ><div class=\"row\" style=\"display:flex; justify-content:center;\">${downloadButtons}</div></td>
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
    content=_item(meta,content,'fault_strand_model_description','MODEL_DESCRIPTION');
    content=_item(meta,content,'ID_comments','ID_COMMENTS');
    content=_item(meta,content,'reference','REFERENCE');
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
    var jlen=keys.length;
    var csvblob = keys.join(",");
    csvblob +='\n';
    for(i=0; i< len; i++) {
       var j=0;
       meta=mlist[i];
       var values=Object.values(meta)
       var vblob=JSON.stringify(values[0]);
       for(j=1; j< jlen; j++) {
          var vv=values[j];
          if(vv != null) {
            if(isNaN(vv)) {
              vblob=vblob+","+ JSON.stringify(vv);
              } else {
                vblob=vblob+","+vv;
            }
            } else {
              vblob=vblob+",";
          }
       }
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

    var color=default_color;
    var strike=meta['avg_strike'];
    var dip=meta['avg_dip'];

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


// initial set from the backend
function processGeoList() {
    var geostr = $('[data-side="allGeoList"]').data('params');
    if(geostr == undefined) {
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

    window.console.log("total mixed geo..", cfm_gid_list.length);
    recordReferenceSet(cfm_gid_list);
}


// extract meta data blob from php backend, extract object_tb's gid and 
// use that to grab the matching geoJson
function processTraceMeta(metaList) {
    var str="";

    if (metaList == 'metaByAllTraces') {
        str = $('[data-side="allTraces"]').data('params');
    }

    if(str == undefined || str.length == 0) {
       window.console.log("processTraceMeta: BAD BAD BAD");
       return;
    }

    var sz=(Object.keys(str).length);
    // iterate through the list and grab the geo info and update leaflet feature
    // structure one by one
    var tmp_gid_list=[];
    var tmp_meta_list=[];
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
         tmp_gid_list.push(gidstr);
         tmp_meta_list.push(meta);
         } else {
            window.console.log("BAD ??");
       }
    }
    getGeoJSONbyObjGid(tmp_gid_list,tmp_meta_list);
    window.console.log("Number of faults meta blobs received from backend ->",sz);
/* this is number of geoJson coming in from the back end.. */

    setGeoTargetValue(sz);
    return str;
}

function processSearchResult(rlist) {
    var str=[];
    var strarray=[];  
    if (rlist == 'searchByFaultObjectName') {
        str = $('[data-side="resultByFaultObjectName"]').data('params');
    } else if (rlist == 'searchByLatLon') {
        str = $('[data-side="resultByLatLon"]').data('params');
    } else if (rlist == 'searchByKeyword') {
        str = $('[data-side="resultByKeyword"]').data('params');
    } else if (rlist == 'searchByArea') {
        str = $('[data-side="resultByArea"]').data('params');
    } else if (rlist == 'searchByZone') {
        str = $('[data-side="resultByZone"]').data('params');
    } else if (rlist == 'searchBySection') {
        str = $('[data-side="resultBySection"]').data('params');
    } else if (rlist == 'searchByName') {
        str = $('[data-side="resultByName"]').data('params');
    } else if (rlist == 'searchByStrikeRange') {
        str = $('[data-side="resultByStrikeRange"]').data('params');
    } else if (rlist == 'searchByDipRange') {
        str = $('[data-side="resultByDipRange"]').data('params');
    }

    if(str == undefined) {
       window.console.log("processSearchResult: BAD BAD BAD");
       return str;
    }

    // gid, name
    cfm_active_gid_list=[];

    var sz=(Object.keys(str).length);
    window.console.log("Number of gid blobs received from backend ->",sz);
    for( var i=0; i< sz; i++) {
       var tmp= JSON.parse(str[i]);
       var gid=parseInt(tmp['gid']);
        
// if filterBy and not in reference list, skip
       if(!in_reference_gid_list(gid)) {
         continue;
       }

       cfm_active_gid_list.push(gid);
       toggle_layer(gid);
       strarray.push(str[i]);
    }
 
    enable_record_btn();
    return (strarray);
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

function grabGeoJSONDataList() {
    var datalist = $('[data-side="geo-json"]').data('params');
    if(datalist == undefined) {
      window.console.log("EROR -- geometry term is empty");
      return "";
    }
   return datalist;
}

// extract the geo json blob from the backend php
function grabGeoJSONList(gdata) {
    var glist=gdata['geoms'];
    return glist;
}

// extract the blind list from the backend php
function grabTraceBlindList(gdata) {
//    var tlist=gdata['tgids'];
//    var olist=gdata['ogids'];
    var blist=gdata['blinds'];
    return blist;
}


function getStrikeRangeMinMax() {
    let str= $('[data-side="strike-range"]').data('params');
    let rMin=parseInt(str.min);
    let rMax=parseInt(str.max);
    return [rMin, rMax];
}

function getDipRangeMinMax() {
    let str= $('[data-side="dip-range"]').data('params');
    let rMin=parseInt(str.min);
    let rMax=parseInt(str.max);
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
  PLOT3D_PRESET_NAMELIST=[];

  var cnt=mlist.length;
  for(var i=0; i<cnt; i++) {
    var meta=mlist[i];
    var gid=meta['gid'];

    if(cnt < PLOT3D_PRESET_NAMELIST_MAX) { /* do not even try to store it */
      PLOT3D_PRESET_NAMELIST.push(meta['name']);
    }

    if (use_download_set == 'native' || use_download_set =='all') {
      if(in_native_gid_list(gid)) {
        url=url_in_native_list(gid);
        if(url) {
          save_MODAL_TS_LIST(meta['fault'],url);
        }
      }
      if( use_download_set != 'all')
        continue;
    } 
    if (use_download_set == '500m' || use_download_set == 'all') {
      if(in_500m_gid_list(gid)) {
        url=url_in_500m_list(gid);
        if(url) {
          save_MODAL_TS_LIST(meta['fault'],url);
        }
      }
      if( use_download_set != 'all')
        continue;
    } 
    if (use_download_set == '1000m' || use_download_set == 'all') {
      if(in_1000m_gid_list(gid)) {
        url=url_in_1000m_list(gid);
        if(url) {
          save_MODAL_TS_LIST(meta['fault'],url);
        }
      }
      if( use_download_set != 'all')
        continue;
    } 
    if (use_download_set == '2000m' || use_download_set == 'all') {
      if(in_2000m_gid_list(gid)) {
        url=url_in_2000m_list(gid);
        if(url) {
          save_MODAL_TS_LIST(meta['fault'],url);
        }
      }
      if( use_download_set != 'all')
        continue;
    }
  }

}


/****************** for handling parameters ********************/
// url : to start with limit of =1
// action: 
//    note - no setup, return a status something
//    main - setup mapview only
//    main+plot3d - setup mapview and also invoke plot3d
// url: list of fault objects

/*
$('#view3DIfram').attr('src',"http:localhost:9999/?
  "viewUID="+viewUID+
  &viewerType="+viewerType+"
  &fileURL="+urls+"
  &name="+nstr;
or
  "viewUID="+viewUID+"
  &viewerType="+viewerType+
  "&fileURL="+urls+
  "&name="+nstr+
  "&filePATH="+path;

--> CFM name :
myCFMname=MJVA-CRSF-BCYL-Bicycle_Lake_fault-CFM5
BCLF => "Bicycle Lake fault"

myCFMabb="BCLF"
myTSname="native/500m/1000m/2000m/none"
myPtype="note/main/main3d/"


calling plot3D >> myParams is 
"?viewUID=1631744479&viewerType=CFM&
fileURL=[500m/WTRA-USAV-USAV-Indian_Hill_fault-CFM5_500m.ts]
&name=[Indian Hill fault]
&filePATH=[https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM5/CFM53_preferred/]

http://localhost:8081/?name=["ETRA-NFTS-DTMT-Deep_detachment-CFM5"]&ts="500m"&ptype="main3d"&
state={"trace":true,"shore":true,"legend":true,"seismicity":0,"repr":0,"bounds":0,"full":false}
&camera={"pos":[619060.371522678,430381.3872969348,-3282431.9564900324],"angle":30,
"viewup":[0.04456568509340286,0.7218788266181946,-0.6905829310417175],"distance":685550.3640744094,
"focal":[466533.134765625,-26700,-3770070.5]}
*/

function inPresetMode() {
  let param = window.location.search.substring(1);
  if(param == "") {
    return 0;
  }
  PLOT3D_PRESET_MODE = 1;
  PLOT3D_PRESET_CAMERA = 0;
  PLOT3D_PRESET_STATE = 0;
  PLOT3D_PRESET_NAMELIST=[];  // bare name list
  return 1;
}
    
/**
http://localhost:8081?abb=["BCLF","EQVE"]&ts="native"&ptype="main"
http://localhost:8081?abb=["SSNF"]&ts="2000m"&ptype="main"
http://localhost:8081?abb=["INHF"]&ts="native"&ptype="main"
http://localhost:8081/?name=["WTRA-USAV-USAV-San_Jose_fault-CFM5"]&ts="1000m"&
ptype="main3d"&camera={"pos":[486326.6875,69849.9453125,-3838326.5],"angle":30,
"viewup":[-0.19568131864070892,-0.5419068336486816,-0.8173406720161438],
"distance":116818.2594697855,"focal":[426630.109375,-6666.62158203125,-3773303.125]}
fullname=[...]
fullfileurl=[...]
**/
function getPresetMode() {
  skip_warning=true; // skip 3d warning
  let param = window.location.search.substring(1);
  let myAbb=0;
  let myTS=0;
  let myPtype=0;
  let myName=0;
  let myCamera=0;
  let myState=0;

  let myFullName=0;
  let myFullFileURL=0;

  // if there are '&amp' 
  let qArray;
  if(param.search("&amp;") != -1 ) {
    qArray = param.split("&amp;"); //get key-value pairs
    } else { 
      qArray = param.split('&'); //get key-value pairs
  }
  for (var i = 0; i < qArray.length; i++)
  {
     let pArr = qArray[i].split('='); //split key and value

//window.console.log(pArr[1]);
     let dd=decodeURI(pArr[1]);
     switch (pArr[0]) {
        case "fullFileURL":
             myFullFileURL=dd;
             break;
        case "fullName":
             myFullName=dd;
             break;
        case "abb":
             myAbb=JSON.parse(dd);
             break;
        case "name":
             myName=JSON.parse(dd);
             break;
        case "ts":
             myTS=JSON.parse(dd);
             break;
        case "ptype":
             myPtype=JSON.parse(dd);
             break;
        case "camera":
             myCamera=dd; // keep it as a string
             break;
        case "state":
             myState=dd; // keep it as a string
             break;
        default: // do nothing
             break;
     }
  }

  if(myFullName !=0 && myFullFileURL !=0) {
    setExternalTS(myFullName, myFullFileURL);
  }
  return [myPtype, myAbb, myName, myTS, myCamera, myState];
}


function setupPresetMode() {
  if(inPresetMode()) {
    let ptype=0;
    let ts=0;
    let name=0;
    let camera=0;
    let state=0;

    [ptype, abb, name, ts, camera, state]=getPresetMode();
    PLOT3D_PRESET_CAMERA=camera;
    PLOT3D_PRESET_STATE=state;

    // preset_type: note, main, main+plot3d
    window.console.log("PresetMode >>>>got "+abb+" "+name+" "+ts+" "+ptype);
    if(ts==0 || ptype == 0)
      return;
    if(name != 0) {
      findByNameInPreset(name,ptype,ts);
      return;
    }
  }
}

// name => array of fault name
// no need to go to server,
function findByNameInPreset(name, ptype, ts) {
    let sz=name.length;
    if(sz == 0) {
      return; 
      } else {
        for(let i=0; i < sz; i++) {
          let gid=find_gid_by_name(name[i]);
          toggle_highlight(gid,1);
          window.console.log("name >>"+name[i]);
        }
        switch (ptype) {
          case "main":
            // do nothing
            break;
          case "main3d":
            setTimeout(executePlot3d(ts), 3000);
            break;
          case "note":
            window.console.log("NOTE type: not sure what to do..");
            //  TODO
            break;
          default:
            // do nothing
            break;
        };
    }
}

function presetPlot3d_first()
{
    if(PLOT3D_PRESET_CAMERA) {
// delayed alittled
       setTimeout(sendCamera3Dview(PLOT3D_PRESET_CAMERA), 3000);
    }
}

// set the state to what was requested
//{"trace":1,"shore":1,"legend":1,"seismicity":0,"repr":0,"bounds":0,"full":0}
function presetPlot3d_second()
{
    if(PLOT3D_PRESET_STATE) {
      let state=JSON.parse(PLOT3D_PRESET_STATE);
      let trace=state['trace'];
      if(trace != track_trace) { toggleTrace3Dview(); }
      let shore=state['shore'];
      if(shore != track_shore) { toggleShore3Dview(); }
      let legend=state['legend'];
      if(legend != track_legend) { toggleLegend3Dview(); }
      let seismicity=state['seismicity'];
      if(seismicity != track_seismicity) { setQuake3Dview(seismicity); }
      let repr=state['repr'];
      while(repr != track_representation) { toggleRepr3Dview(); }
      let bounds=state['bounds'];
      while(bounds != track_bounds) { toggleBounds3Dview(); }
      let full=state['full'];
      if(full != track_full) { toggleExpand3Dview(); }
      sendDone3Dview("done for presetPlot3d");
    }
}





