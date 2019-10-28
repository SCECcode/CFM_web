/***
   cfm_ui.js
***/

var cfm_select_count=0;
var showing_key = false;

// not using the realmin and realmax
function setupStrikeRangeSlider(realmin,realmax) {
  var min=0;
  var max=360;
  setup_strike_range(min,max);
  $( "#slider-strike-range" ).slider({
    range: true,
    min: 0,
    max: 500,
    step: 0.001,
    values: [ min, max ],
    slide: function( event, ui ) {
      $( "#strike-range" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
    }
  });
  $( "#strike-range" ).val( $( "#slider-strike-range" ).slider( "values", 0 ) + " - " + $( "#slider-strike-range" ).slider( "values", 1 ) );

  $('#slider-strike-range').slider("option", "min", min);
  $('#slider-strike-range').slider("option", "max", max);
  $( "#strike-range" ).val( min + " - " + max );
}

// using the realmin and realmax
function setupDipRangeSlider(min,max) {
  setup_dip_range(min,max);
  $( "#slider-dip-range" ).slider({
    range: true,
    min: 0,
    max: 500,
    step: 0.001,
    values: [ min, max ],
    slide: function( event, ui ) {
      $( "#dip-range" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
    }
  });
  $( "#dip-range" ).val( $( "#slider-dip-range" ).slider( "values", 0 ) + " - " + $( "#slider-dip-range" ).slider( "values", 1 ) );

  $('#slider-dip-range').slider("option", "min", min);
  $('#slider-dip-range').slider("option", "max", max);
  $( "#dip-range" ).val( min + " - " + max );
}

function queryByType(type)
{
  if(type == "area") { getAreaList(); }
  if(type == "zone") { getZoneList(); }
  if(type == "section") { getSectionList(); }
  if(type == "name") { getNameList(); }
}

// use the zone list from php backend, generate the form html
function makeZoneList() {
    var str = $('[data-side="zones"]').data('params');
    if (str == undefined)
      return "";

    var html= "<form autocomplete=\"off\"> <select class=\"custom-select\"  id=\"selectZone\" onchange=\"searchByZone(this.value)\"> <option value=\"\">  Select... </option>";

    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var abb=s['abb'];
       var name=s['name'];
       cfm_zone_list.push( {"abb":abb, "name":name } );
       html=html+"<option value=\"" + abb + "\">"+ name +"</option>";
    }
    return html;
}

// use the section list from php backend, generate the form html
function makeSectionList() {
    var str = $('[data-side="sections"]').data('params');
    if (str == undefined)
      return "";

    var html= "<form autocomplete=\"off\"><select class=\"custom-select\"  id=\"selectSection\" onchange=\"searchBySection(this.value)\"> <option value=\"\">  Select...</option>";

    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var abb=s['abb'];
       var name=s['name'];
       cfm_section_list.push( {"abb":abb, "name":name } );
       html=html+"<option value=\"" + abb + "\">"+ name +"</option>";
    }
    return html;
}

// use the area list from php backend, generate the form html
function makeAreaList() {
    var str = $('[data-side="areas"]').data('params');
    if (str == undefined)
      return "";

    var html= "<form autocomplete=\"off\"> <select class=\"custom-select\"  id=\"selectArea\" onchange=\"searchByArea(this.value)\"> <option value=\"\">  Select...</option>";

    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var abb=s['abb'];
       var name=s['name'];
       cfm_area_list.push( {"abb":abb, "name":name } );
       html=html+"<option value=\"" + abb + "\">"+ name +"</option>";
    }
    return html;
}

// use the fault list from php backend, generate the form html
function makeNameList() {
    var str = $('[data-side="names"]').data('params');
    if (str == undefined)
      return "";

    var html= "<form autocomplete=\"off\"> <select class=\"custom-select\"  id=\"selectName\" onchange=\"searchByName(this.value)\"> <option value=\"\">  Select...</option>";

    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s = JSON.parse(str[i]);
       var abb=s['abb'];
       var name=s['name'];
       cfm_name_list.push( {"abb":abb, "name":name } );
       html=html+"<option value=\"" + abb + "\">"+ name +"</option>";
    }
    return html;
}

function makeStrikeSlider()
{
    var html="Strike range: <input type=\"text\" id=\"strike-range\" readonly style=\"border:0; color:orange; text-align:center;\"><button id=\"strikeBtn\" type=\"button\" title=\"search with strike range\" class=\"btn btn-default cfm-small-btn\" style=\"border:0; color:blue\" onclick=\"searchWithStrikeRange()\"><span class=\"glyphicon glyphicon-search\"></span></button></div><div id=\"slider-strike-range\"></div><br>";
    return html;
} 

function makeDipSlider()
{
    var html="Dip range: <div><input type=\"text\" id=\"dip-range\" readonly style=\"border:0; color:orange; text-align:center;\"><button id=\"dipBtn\" type=\"button\" title=\"search with dip range\" class=\"btn btn-default cfm-small-btn\" style=\"border:0; color:blue\" onclick=\"searchWithDipRange()\"><span class=\"glyphicon glyphicon-search\"></span></button></div><div id=\"slider-dip-range\"></div></div><br>";
    return html;
}

function showKey(type) {
    var min = 0;
    var max = 0;

    if (showing_key) {
        removeKey();
    } else {
        showing_key = true;
    }

    if (type == "dip") {
        min = dip_range_min;
        max = dip_range_max;
    } else if (type == "strike") {
        min = strike_range_min;
        max = strike_range_max;
    }
    $("#CFM_plot").prepend($("#dip-strike-key-container").html());
    $("#dip-strike-key span.min").html(min);
    $("#dip-strike-key span.max").html(max);
}

function removeKey() {
    $("#CFM_plot #dip-strike-key").remove();
    showing_key = false;
}


function nullTableEntry(target) {
   // disable the toggle and highlight button
   t_btn="#toggle_"+target;
   h_btn="#highlight_"+target; 
   $(t_btn).attr("disabled", true);
   $(h_btn).attr("disabled", true);
}

function glistFromMeta(str) {
    var glist=[];
    var sz=(Object.keys(str).length);
    for( var i=0; i< sz; i++) {
       var s=str[i];
       var s = JSON.parse(str[i]);
       var gidstr=s['gid'];
       var gid=parseInt(s['gid']);
       glist.push(gid);
    }
    return glist;
}


// str=metadata
function makeResultTable(str)
{
    clear_popup();
    // clear the highlight count..

    // var html="<table><tr><th style=\"border:1px solid white;\">CFM5.2 Fault Objects<button id=\"allBtn\" class=\"btn cfm-small-btn\" title=\"select all visible faults\" onclick=\"selectAll()\"><span class=\"glyphicon glyphicon-unchecked\"></span></button></th></tr></table>";
    var html = "";
    html=html+"<div class=\"cfm-table\" ><table>";
    html+="<thead><tr><th class='text-center'><button id=\"allBtn\" class=\"btn btn-sm cfm-small-btn\" title=\"select all visible faults\" onclick=\"selectAll();\"><span class=\"glyphicon glyphicon-unchecked\"></span></button></th><th class='text-center'></th><th>CFM5.2 Fault Objects</th></tr></thead><tbody>";
    var sz=(Object.keys(str).length);
    var tmp="";
    for( var i=0; i< sz; i++) {
       var s=str[i];
       var s = JSON.parse(str[i]);
       var gidstr=s['gid'];
       var gid=parseInt(s['gid']);
       var name=s['name'];
       if(!in_nogeo_gid_list(gid)) {
         var s= find_style_list(gid);
         if(s && s['highlight']==1) {
           var t= "<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" id=\"button_"+gid+"\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+");><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-check\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td><td><label for=\"button_"+gid+"\">" + name + "</label></td></tr>";
           } else {
             var t= "<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" id=\"button_"+gid+"\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+");><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-unchecked\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td><td><label for=\"button_"+gid+"\">" + name + "</label></td></tr>";
         }
         tmp=t+tmp;
        } else {
          var t="<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" id=\"button_"+gid+"\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+") disabled><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-unchecked\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+") disabled><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td><td><label for=\"button_"+gid+"\">" + name + "</label></td></tr>";
          tmp=tmp+t;
      }
    }
    html=html+ tmp + "</tbody></table></div>";

    if (visibleFaults.getBounds().isValid()) {
        viewermap.fitBounds(visibleFaults.getBounds());
    }
    return html;
}

// using internal information, existing style_list
function _makeResultTableWithGList(glist)
{
    clear_popup();
    // var html="<table><tr><th style=\"border:1px solid white\">CFM5.2 Fault Objects<button id=\"allBtn\" class=\"btn cfm-small-btn\" title=\"select all visible faults\" onclick=\"selectAll()\"><span class=\"glyphicon glyphicon-unchecked\"></span></button></th></tr></table>";
    var html = "";
    html=html+"<div class=\"cfm-table\" ><table>";
    html+="<thead><tr><th class='text-center'><button id=\"allBtn\" class=\"btn btn-sm cfm-small-btn\" title=\"select all visible faults\" onclick=\"selectAll();\"><span class=\"glyphicon glyphicon-unchecked\"></span></button></th><th class='text-center'></th><th>CFM5.2 Fault Objects</th></tr></thead><tbody>";

    var sz=glist.length;
    var tmp="";
    for( var i=0; i< sz; i++) {
       var gid=glist[i];
       var t=find_meta_list(gid);
       var meta=t['meta'];
       var name=meta['name'];
       var tt;
       if(!in_nogeo_gid_list(gid)) {
         var s= find_style_list(gid);
         var h= s['highlight'];
         var vis=s['visible'];
         if(h) {
           if(vis) {
             tt="<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" id=\"button_"+gid+"\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+");><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-check\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td><td><label for=\"button_"+gid+"\">" + name + "</label></td></tr>";
              } else {
             tt="<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" id=\"button_"+gid+"\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+");><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-check\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-close\"></span></button></td><td><label for=\"button_"+gid+"\">" + name + "</label></td></tr>";
           }
           tmp=tt+tmp;
           } else {
             if(vis) {
             tt="<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" id=\"button_"+gid+"\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+");><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-unchecked\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td><td><label for=\"button_"+gid+"\">" + name + "</label></td></tr>";
             } else {
             tt="<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" id=\"button_"+gid+"\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+");><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-unchecked\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-close\"></span></button></td><td><label for=\"button_"+gid+"\">" + name + "</label></td></tr>";
           }
           tmp=tt+tmp;
        }
        } else {
         tt="<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" id=\"button_"+gid+"\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+") disabled><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-unchecked\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+") disabled><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td><td><label for=\"button_"+gid+"\">" + name + "</label></td></tr>";
         tmp=tmp+tt;
       }
    }
    html=html+tmp+ "</tbody></table></div>";
    return html;
}


// using existing gid_list,
function makeResultTableWithList(glist)
{
    // reset it first
    document.getElementById("searchResult").innerHTML ="";

    if(glist.length > 0) {
      toggle_layer_with_list(glist);
      var newhtml = _makeResultTableWithGList(glist);
      document.getElementById("searchResult").innerHTML = newhtml;
    }
}

// add details button
function add_details_btn(meta,str) {
  var gid=meta['gid'];
  str=str+'<button class=\"btn btn-xs cfm-small-btn\" title=\"show more fault details\"><span id=\"detail_'+gid+'\" class=\"glyphicon glyphicon-menu-hamburger\" onclick=\"show_details('+gid+')\"></span></button>';
  return str;
}

// add details button
function add_highlight_btn(meta,str) {
  var gid=meta['gid'];
  str=str+'<button class=\"btn btn-xs cfm-small-btn\" title=\"highlight this fault\"><span id=\"detail_'+gid+'\" class=\"glyphicon glyphicon-ok\" onclick=\"toggle_highlight('+gid+')\"></span></button>';
  return str;
}

// for native, 500m, 1000m, 2000m
function add_downloads_btn(meta,str) {
  var gid=meta['gid'];
  if(in_native_gid_list(gid)) {
    var url=url_in_native_list(gid);
    if(url) {
      str=str+'<a href=\"'+url+'\" download> <button class=\"btn btn-xs cfm-btn\" title=\"download native tsurf file\"><span id=\"download_native_'+gid+'\" class=\"glyphicon glyphicon-download\"></span>native</button></a>';
    }
  }
  if(in_500m_gid_list(gid)) {
    var url=url_in_500m_list(gid);
    if(url) {
      str=str+'<a href=\"'+url+'\" download> <button class=\"btn btn-xs cfm-btn\" title=\"download 500m tsurf file\"><span id=\"download_500m_'+gid+'\" class=\"glyphicon glyphicon-download\"></span>500m</button></a>';
    }
  }

  if(in_1000m_gid_list(gid)) {
    var url=url_in_1000m_list(gid);
    if(url) {
       str=str+'<a href=\"'+url+'\" download> <button class=\"btn btn-xs cfm-btn\" title=\"download 1000m tsurf file\"><span id=\"download_1000m_'+gid+'\" class=\"glyphicon glyphicon-download\"></span>1000m</button></a>';
    }
  }
  if(in_2000m_gid_list(gid)) {
    var url=url_in_2000m_list(gid);
    if(url) {
       str=str+'<a href=\"'+url+'\" download> <button class=\"btn btn-xs cfm-btn\" title=\"download 2000m tsurf file\"><span id=\"download_2000m_'+gid+'\" class=\"glyphicon glyphicon-download\"></span>2000m</button></a>';
    }
  }
  return str;
}

function get_downloads_btn(meta) {
    var str = "";
    var gid=meta['gid'];

    if(in_native_gid_list(gid)) {
        var url=url_in_native_list(gid);
        if(url) {
            str=str+'<a href=\"'+url+'\" download> <button class=\"btn btn-xs cfm-btn\" title=\"download native tsurf file\"><span id=\"download_native_'+gid+'\" class=\"glyphicon glyphicon-download\"></span>native</button></a>';
        }
    }
    if(in_500m_gid_list(gid)) {
        var url=url_in_500m_list(gid);
        if(url) {
            str=str+'<a href=\"'+url+'\" download> <button class=\"btn btn-xs cfm-btn\" title=\"download 500m tsurf file\"><span id=\"download_500m_'+gid+'\" class=\"glyphicon glyphicon-download\"></span>500m</button></a>';
        }
    }

    if(in_1000m_gid_list(gid)) {
        var url=url_in_1000m_list(gid);
        if(url) {
            str=str+'<a href=\"'+url+'\" download> <button class=\"btn btn-xs cfm-btn\" title=\"download 1000m tsurf file\"><span id=\"download_1000m_'+gid+'\" class=\"glyphicon glyphicon-download\"></span>1000m</button></a>';
        }
    }

    if(in_2000m_gid_list(gid)) {
        var url=url_in_2000m_list(gid);
        if(url) {
            str=str+'<a href=\"'+url+'\" download> <button class=\"btn btn-xs cfm-btn\" title=\"download 2000m tsurf file\"><span id=\"download_1000m_'+gid+'\" class=\"glyphicon glyphicon-download\"></span>2000m</button></a>';
        }
    }

    return str;
}


// very lazy way to inject this into html
function addFaultColorsSelect() {
  var htmlstr="<div class=\"cfm-control-colors-list\"><span style=\"font-size:14px;font-weight:bold;text-align:center;\">&nbsp;Select faults color </span><form onchange=\"changeFaultColor()\"><div class=\"cfm-control-colors-base\"><label><div><input type=\"radio\" class=\"cfm-control-colors-selector\" name=\"cfm-fault-colors\" value=\"default\" checked=\"checked\"><span> default</span></div></label><label><div><input type=\"radio\" class=\"cfm-control-colors-selector\" name=\"cfm-fault-colors\" value=\"strike\" ><span> by strike</span></div></label><label><div><input type=\"radio\" class=\"cfm-control-colors-selector\" name=\"cfm-fault-colors\" value=\"dip\" ><span> by dip</span></div></label></div></form></div>";

   var html_div=document.getElementById('colorSelect');
   html_div.innerHTML = htmlstr;
}

function addDownloadSelect() {
  var htmlstr="<div class=\"cfm-control-download-list\"><span style=\"font-size:14px;font-weight:bold; text-align:center;\">&nbsp;Select download </span><form onchange=\"changeDownloadSet()\"><div class=\"cfm-control-download-base\"><label> <div><input type=\"radio\" class=\"cfm-control-download-selector\" name=\"cfm-fault-download\" value=\"meta\"><span> metadata</span></div><div><input type=\"radio\" class=\"cfm-control-download-selector\" name=\"cfm-fault-download\" value=\"native\"><span> native + metadata</span></div></label><label><div><input type=\"radio\" class=\"cfm-control-download-selector\" name=\"cfm-fault-download\" value=\"500m\" ><span> 500m + metadata</span></div></label><label><div><input type=\"radio\" class=\"cfm-control-download-selector\" name=\"cfm-fault-download\" value=\"1000m\" ><span> 1000m + metadata</span></div></label></div></form></div>";

   var html_div=document.getElementById('downloadSelect');
   html_div.innerHTML = htmlstr;
}


function saveAsBlobFile(data, timestamp)
{
//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
//   var rnd= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var fname="CFM_metadata_"+timestamp+".json";
    var blob = new Blob([data], {
        type: "text/plain;charset=utf-8"
    });
    //FileSaver.js
    saveAs(blob, fname);
}

function saveAsURLFile(gid,url) {
  var dname=url.substring(url.lastIndexOf('/')+1);
  var dload = document.createElement('a');
  dload.href = url;
  dload.download = dname;
  dload.type="application/octet-stream";
  dload.style.display='none';
  document.body.appendChild(dload);
  dload.click();
  document.body.removeChild(dload);
  delete dload;
}

/*** iframe housekeeping ***/
/* fileURL=[file1, file2]&filePATH=[path] */
function show3dView(urls) {
  $('#modal3D').modal('show');
//  $('#view3DIfram').attr('src',"cfm_3d.html?background=1&fileURL="+urls);
  $('#view3DIfram').attr('src',"cfm_3d.html?fileURL="+urls);
}

// should be able to track the initial state and then return to it
function refresh3Dview() {
  var urls=get_MODAL_TS_LIST();
  $('#view3DIfram').attr('src',"");
//  $('#view3DIfram').attr('src',"cfm_3d.html?background=1&fileURL="+urls);
  $('#view3DIfram').attr('src',"cfm_3d.html?fileURL="+urls);
}

var track_legend=1; // 1 is on 0 is off
//publicAPI.toggleControllerVisibility
function toggleUI3Dview(elt) {
  document.getElementById("view3DIfram").contentDocument.getElementById("UIbtn").click();
  
  track_legend = !track_legend;
  if(track_legend) {
    elt.innerHTML="Hide Legend";
    } else {
      elt.innerHTML="Show Legend";
  }
}

var track_full=1; // 1 is on 0 is off
function toggleExpand3Dview(elt) {
  
  track_full = !track_full;
  if(track_full) {
    elt.innerHTML="Expand";
    $('#modal3DDialog').removeClass('full_modal-dialog');
    $('#modal3DContent').removeClass('full_modal-content');
    document.getElementById("view3DIfram").height = "400";
    } else {
      elt.innerHTML="Shrink";
      $('#modal3DDialog').addClass('full_modal-dialog');
      $('#modal3DContent').addClass('full_modal-content');
      var body=document.getElementById("modal3DBody");
      var body_height=body.scrollHeight;
      document.getElementById("view3DIfram").height = body_height-5;
  }
}


