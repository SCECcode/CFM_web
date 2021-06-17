/***
   cfm_util.js

***/

var select_all_flag=0;

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


// track the eq-counter
function startQuakeCounter() {
  $("#modalwaiteq").modal({ backdrop: 'static', keyboard: false });
}
function doneQuakeCounter() { 
  $("#modalwaiteq").modal('hide');
}
function add2QuakeValue(v) {
window.console.log("adding more EQs: "+v);
  let elm = $("#eq-total");
  let o=parseInt(elm.val());
  let n=o+v; 
  elm.val(n);
  let maxelm  = $("#eq-expected");
  let max = parseInt(maxelm.val());
  var width = Math.floor((n/max) * 100);
window.console.log("n"+n+" max"+max+" width"+width);
window.console.log("width of progress bar.."+width);
  updatePrograssBar(width);
}

function setQuakeExpectedValue(v) {
  let elm = $("#eq-expected");
  elm.val(v);
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
  }
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
  window.console.log("number of entry to download...");
  window.console.log(cnt);
  if(cnt == 0) {
    alert("No fault selected"); 
    return;
  }
  if (use_download_set == 'meta' || use_download_set == 'all') {
    downloadCSVMeta(mlist);
  } else if(use_download_set != 'meta') {
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
    alert("No fault selected"); 
    return;
  }

  collectURLsFor3d(mlist);
  var nstr=get_MODAL_TS_NAME();
  var str=get_MODAL_TS_LIST();
  var pstr=get_MODAL_TS_PATH();
  show3dView(str,nstr,pstr);
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
    content=_item(meta,content,'fault_strand_model_description','MODEL_DESCRIPTION');
    content=_item(meta,content,'descriptor','DESCRIPTOR');
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

    var color="black";
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
    recordReferenceSet(cfm_gid_list);
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
         if( !in_nogeo_gid_list(gid)) {
           tmp_gid_list.push(gidstr);
           tmp_meta_list.push(meta);
         
         }
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
       if( ! in_nogeo_gid_list(gid)) {
        toggle_layer(gid);
       }
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

  var cnt=mlist.length;
  for(var i=0; i<cnt; i++) {
    var meta=mlist[i];
    var gid=meta['gid'];
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
    window.console.log("Number of eq blobs received from backend ->",sz);
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

function add2QuakePoints(eqarray) {
    eqarray.forEach(function(marker) {
        var lat=parseFloat(marker['Lat']);
        var lng=parseFloat(marker['Lon']);
        var depth=parseFloat(marker['Depth']);
        var mag=parseFloat(marker['Mag']);
// from backend always get: "1981-01-01 01:49:29.504"
// but need it to be in :"1981-01-01T01:49:29.504"
        var t=_processTimeString(marker['Time']);
        var otime=new Date(t);
        var didx=getRangeIdx(EQ_FOR_DEPTH, depth);
        updateMarkerLatlng(EQ_FOR_DEPTH,didx,lat,lng);
        var midx= getRangeIdx(EQ_FOR_MAG, mag);
        updateMarkerLatlng(EQ_FOR_MAG,midx,lat,lng);
        var tidx= getRangeIdx(EQ_FOR_TIME, otime);
        updateMarkerLatlng(EQ_FOR_TIME,tidx,lat,lng);
    });
}

function add2QuakePointsChunk(eqarray, next_chunk, total_chunk, step) {
    add2QuakePoints(eqarray);
    // get next chunk
    _getAllQuakesByChunk(next_chunk, total_chunk, step);
}
// default showing depth
function showQuakePoints(forType, eqarray) {
   add2QuakePoints(eqarray);
   setup_pixi(forType);
}

// default to depth
function showQuakePointsAndBound(eqarray,swlat,swlon,nelat,nelon) {
   // XX should grab type from the UI
   showQuakePoints(EQ_FOR_DEPTH,eqarray);
   // create a bounding area and add to the layergroup
   var layer=makeRectangleLayer(swlat,swlon,nelat,nelon);
   cfm_quake_group.addLayer(layer);
}

function showQuakePoints1(eqarray) {
  var layer=undefined;
  var trace=makeQuakeGeoJSONFeature(1,eqarray,5,"red");
  if( trace != undefined ) {
    layer=addGeoToMap(trace, viewermap);
  }
  return layer;
}


// baseOn : time, depth, mag
function getQuakeColor( group, val ) {
   if(group == "time") {
      var step=(cfm_quake_meta['maxTime'] - cfm_quake_meta['minTime'])/20;
      var idx=Math.floor((val - cfm_quake_meta['minTime'])/step);
      return "quake-color-"+idx;
   } 
   if(group == "depth") {
      var step=(cfm_quake_meta['maxDepth'] - cfm_quake_meta['minDepth'])/20;
      var idx=Math.floor((val - cfm_quake_meta['minDepth'])/step);
      return "quake-color-"+idx;
   }
   if(group == "mag") {
      var step=(cfm_quake_meta['maxMag'] - cfm_quake_meta['minMag'])/20;
      var idx=Math.floor((val - cfm_quake_meta['minMag'])/step);
      return "quake-color-"+idx;
   }
}

// zoom value : 7 -> sz =1
// zoom value : 11 return 3
function getQuakeSize( level, count ) {
   if(count > 1000) 
      return 2;
   if(count > 100)
      return 3;
   return 5;
}

function processQuakeMeta() {
    var str = $('[data-side="quake-meta"]').data('params');

    let minTime = str.minTime; let maxTime = str.maxTime;
    let minLon = str.minLon; let maxLon = str.maxLon;
    let minLat = str.minLat; let maxLat = str.maxLat;
    let minDepth = str.minDepth; let maxDepth = str.maxDepth;
    let minMag = str.minMag; let maxMag = str.maxMag;
    let total = str.total;
    
    window.console.log("seisimicity time >>"+ minTime+" to "+maxTime);
    window.console.log("seisimicity lon >>"+ minLon+" to "+maxLon);
    window.console.log("seisimicity lat >>"+ minLat+" to "+maxLat);
    window.console.log("seisimicity depth >>"+ minDepth+" to "+maxDepth);
    window.console.log("seisimicity mag >>"+minMag+" to "+maxMag);
    window.console.log("seisimicity total >>"+total);
    setQuakeExpectedValue(total);
    var meta = { "total": total, "minTime":minTime, "maxTime":maxTime, "minLon":minLon, "maxLon":maxLon, "minLat":minLat, "maxLat":maxLat, "minDepth":minDepth, "maxDepth":maxDepth, "minMag":minMag, "maxMag":maxMag };
    return meta;
}


function get_seisimicity(sw,ne) {
    quakesByLatlon(sw['lat'],sw['lng'],ne['lat'],ne['lng']);
}

