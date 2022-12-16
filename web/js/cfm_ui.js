/***
   cfm_ui.js
***/

var cfm_select_count=0;
var showing_key = false;

var big_map=0; // 0,1(some control),2(none)

var seismicity_loaded = false;
var seismicity_from_cache = true;


var CFM_DB_tb = {
   'viewers': [
        { 'option': 0, 'name':'CFM6_preferred','db':'CFM6_preferred_db',
          'pathname': 'cfm-viewer', 'port': 8082},
        { 'option': 1, 'name':'CFM6_alternatives','db':'CFM6_alt_db',
          'pathname': 'cfm-alt-viewer', 'port': 8086},
        { 'option': 2, 'name':'CFM6_ruptures','db':'CFM6_rup_db',
          'pathname': 'cfm-rup-viewer', 'port': 8088},
        { 'option': 3, 'name':'CFM53_preferred','db':'CFM53_preferred_db',
          'pathname': 'cfm53-viewer', 'port': 8090}
              ]
};

//  got to another set of data on same host different port
function gotoOtherViewer(option) {
//  http://localhost:8082
//  http://moho.scec.org/cfm-viewer/
  let myoption=$('#myOption').val();
  if(option == myoption) {
    return; // do nothing
  }

  let protocol=window.location.protocol;
  let hostname=window.location.hostname;
  let port=window.location.port;
  let pathname=window.location.pathname;

  var nport;
  var npathname;

  let tb=CFM_DB_tb['viewers'];
  let icnt=tb.length;
  for(let i=0; i<icnt; i++) {
     let item=tb[i];
     if(item['option'] == option) {
        npathname=item['pathname'];
        nport=item['port'];
        break;
     }
  }

  let newLoc;
  if(port === "") {
     newLoc=protocol+"//"+hostname+"/"+npathname+"/";
     } else {
       newLoc=protocol+"//"+hostname+":"+nport;
  }
  window.console.log("new Loc >>"+newLoc);
  location.replace(newLoc);
}

function _toMedView()
{
let elt = document.getElementById('banner-container');
let celt = document.getElementById('top-intro');
let c_height = elt.clientHeight+(celt.clientHeight/2);
let h=576+c_height;

$('#top-intro').css("display", "none");
$('#searchResult').css("display", "none");
$('#CFM_plot').css("height", h);
$('#infoData').removeClass('col-5').addClass('col-0');
$('#top-map').removeClass('col-7').addClass('row');
$('#top-map').removeClass('pl-1').addClass('pl-0');
$('#mapDataBig').addClass('col-12').removeClass('row');
resize_map();
}

function _toMinView()
{
let height=window.innerHeight;
let width=window.innerWidth;

$('#top-control').css("display", "none");
$('#top-select').css("display", "none");
$('.navbar').css("margin-bottom", "0px");
$('.container').css("max-width", "100%");
$('.container').css("padding-left", "0px");
$('.container').css("padding-right", "0px");
// minus the height of the container top 
let elt = document.getElementById('banner-container');
let c_height = elt.clientHeight;
let h = height - c_height-4.5;
let w = width - 15;
//window.console.log( "height: %d, %d > %d \n",height, c_height,h);
//window.console.log( "width: %d, %d  \n",width, w);
$('#CFM_plot').css("height", h);
$('#CFM_plot').css("width", w);
resize_map();
}

function _toNormalView()
{
$('#top-control').css("display", "");
$('#top-select').css("display", "");
$('#CFM_plot').css("height", "576px");
$('#CFM_plot').css("width", "635px");
$('.navbar').css("margin-bottom", "20px");
$('.container').css("max-width", "1140px");
$('.container').css("padding-left", "15px");
$('.container').css("padding-right", "15px");

$('#top-intro').css("display", "");
$('#searchResult').css("display", "");
$('#infoData').addClass('col-5').removeClass('col-0');
$('#top-map').removeClass('row').addClass('col-7');
$('#top-map').removeClass('pl-1').addClass('pl-0');
$('#mapDataBig').removeClass('col-12').addClass('row');
resize_map();
}

function toggleBigMap()
{
  switch (big_map)  {
    case 0:
      big_map=1;
      _toMedView();		   
      break;
    case 1:
      big_map=2;
      _toMinView();		   
      break;
    case 2:
      big_map=0;
      _toNormalView();		   
      break;
  }
}


// dump the quake layer into file
function dumpAllQuakeLayer() {
// TODO -- maybe some webgl page dump ??
// start with hauksson and then ross within
//  dumpQuakeCFMGeo(QUAKE_TYPE_HAUKSSON);
}

// extract all EQ northing/easting info to file 
function toFileAllQuakes() {
  let meta={"size":1,"color":{"r":0,"g":0.61,"b":0}};
  let msg=JSON.stringify(meta); 
  // start with hauksson and then ross within
  quakesAllToFile(QUAKE_TYPE_HAUKSSON,msg);
}

function updatePrograssBar(width) {
  var element = document.getElementById("myProgressBar");   
  element.style.width = width + '%'; 
//  element.innerHTML = width * 1  + '%';
  let elm = $("#eq-progress");
  var n= width * 1  + '%';
  elm.val(n);
}

function loadSeismicity() {
   if(seismicity_loaded == false) {
     initForPixiOverlay(); 
     if( seismicity_from_cache ) {
        loadFromFileMarkerLatlng();
        } else {
// ROSS and HISTORICAL are loaded as side-effect
          getAllQuakes(QUAKE_TYPE_HAUKSSON);  
     }
   }
}

function finishLoadSeismicity() {
    setup_pixi(EQ_HAUKSSON_FOR_DEPTH);
    showSeismicityKey("hauksson_depth");
    addHistoricalEQLayer();
    seismicity_loaded = true;
    $('#showSeismicity').css("display", "");
    $('#loadSeismicity').css("display", "none");
}

function disable_record_btn() {
  $('#recordReferenceBtn').attr("disabled", true);
}

function enable_record_btn() {
  $('#recordReferenceBtn').attr("disabled", false);
}

function disable_last_record_btn() {
  $('#lastRecordedReferenceBtn').attr("disabled", true);
}

function enable_last_record_btn() {
  $('#lastRecordedReferenceBtn').attr("disabled", false);
}


function set_strike_range_color(min,max) {
  let minRGB= makeStrikeRGB(min);
  let maxRGB= makeStrikeRGB(max);
  let myColor="linear-gradient(to right, "+minRGB+","+maxRGB+")";
  $("#slider-strike-range .ui-slider-range" ).css( "background", myColor );
}

// not using the realmin and realmax
function setupStrikeRangeSlider(realmin,realmax) {
window.console.log("setup real Strike Range",realmin," and ",realmax);
// around 0,360
  setup_strike_range_ref(realmin,realmax);

  $( "#slider-strike-range" ).slider({
    range: true,
    step: 1,
    min: 0,
    max: 0,
    values: [ realmin, realmax ],
    slide: function( event, ui ) {
      $("#lowStrikeTxt").val(ui.values[0]);
      $("#highStrikeTxt").val(ui.values[1]);
      set_strike_range_color(ui.values[0],ui.values[1]);
    },
    change: function( event, ui ) {
      $("#lowStrikeTxt").val(ui.values[0]);
      $("#highStrikeTxt").val(ui.values[1]);
      set_strike_range_color(ui.values[0],ui.values[1]);
    },
    stop: function( event, ui ) {
      searchWithStrikeRange();
    },
    create: function() {
      $("#lowStrikeTxt").val(realmin);
      $("#highStrikeTxt").val(realmax);
    }
  });

  $('#slider-strike-range').slider("option", "min", realmin);
  $('#slider-strike-range').slider("option", "max", realmax);
}

function set_dip_range_color(min,max) {
  let minRGB= makeDipRGB(min);
  let maxRGB= makeDipRGB(max);
  let myColor="linear-gradient(to right, "+minRGB+","+maxRGB+")";
  $("#slider-dip-range .ui-slider-range" ).css( "background", myColor );
}

// using the realmin and realmax
function setupDipRangeSlider(realmin,realmax) {
  setup_dip_range_ref(realmin,realmax);
  $( "#slider-dip-range" ).slider({
    range: true,
    step: 1,
    min: 0,
    max: 0,
    values: [ realmin, realmax ],
    change: function( event, ui ) {
      $("#lowDipTxt").val(ui.values[0]);
      $("#highDipTxt").val(ui.values[1]);
      set_dip_range_color(ui.values[0],ui.values[1]);
    },
    slide: function( event, ui ) {
      $("#lowDipTxt").val(ui.values[0]);
      $("#highDipTxt").val(ui.values[1]);
      set_dip_range_color(ui.values[0],ui.values[1]);
    },
    stop: function( event, ui ) {
      searchWithDipRange();
    },
    create: function() {
      $("#lowDipTxt").val(realmin);
      $("#highDipTxt").val(realmax);
    }
  });
  $('#slider-dip-range').slider("option", "min", realmin);
  $('#slider-dip-range').slider("option", "max", realmax);
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
       var name=s['name'];
       var uid=s['uid'];
       cfm_name_list.push( {"uid":uid, "name":name } );
       html=html+"<option value=\"" + uid + "\">"+ name +"</option>";
    }
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

// depth, mag, time
function showSeismicityKey(type) {
    if(type == "hauksson_depth") {
        showColorLegend("hauksson_depth.png");
        return;
    }
    if(type == "hauksson_mag") {
        showColorLegend("hauksson_mag.png");
        return;
    }
    if(type == "hauksson_time") {
        showColorLegend("hauksson_time.png");
        return;
    }
    if(type == "ross_depth") {
        showColorLegend("ross_depth.png");
        return;
    }
    if(type == "ross_mag") {
        showColorLegend("ross_mag.png");
        return;
    }
    if(type == "ross_time") {
        showColorLegend("ross_time.png");
        return;
    }
    if(type == "historical_depth") {
        showColorLegend("historical_depth.png");
        return;
    }
    if(type == "historical_mag") {
        showColorLegend("historical_mag.png");
        return;
    }
    if(type == "historial_time") {
        showColorLegend("historical_time.png");
        return;
    }
    if(type == "none") {
	// do nothing XXX
        return;
    }
}

function removeSeismicityKey() {
    removeColorLegend();    
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
function makeResultTableBody(str)
{
    clear_popup();

    var html="<tbody id=\"cfm-table-body\">";
    var sz=(Object.keys(str).length);
    var tmp="";
    for( var i=0; i< sz; i++) {
       var s=str[i];
       var s = JSON.parse(str[i]);
       var gidstr=s['gid'];
       var gid=parseInt(s['gid']);
       var name=s['name'];
       var t="<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" id=\"button_"+gid+"\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+",0)><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-unchecked\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+")><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td><td><label for=\"button_"+gid+"\">" + name + "</label></td></tr>";
       tmp=tmp+t;
    }
    html=html+ tmp + "</tbody>";

    if (visibleFaults.getBounds().isValid()) {
        viewermap.fitBounds(visibleFaults.getBounds());
    }

    return html;
}

// str=metadata
function makeResultTable(str)
{
    window.console.log("calling makeResultTable..");

    var html="<div class=\"cfm-table\" ><table>";
    html+="<thead><tr><th class='text-center'><button id=\"allBtn\" class=\"btn btn-sm cfm-small-btn\" title=\"select all visible faults\" onclick=\"selectAll();\"><span class=\"glyphicon glyphicon-unchecked\"></span></button></th><th class='text-center'></th><th class='myheader'>CFM Fault Objects</th></tr></thead>";

    var body=makeResultTableBody(str);
    html=html+ body + "</tbody></table></div>";

    return html;
}

// using internal information, existing style_list
function _makeResultTableBodyWithGList(glist)
{
    window.console.log("calling _makeResultTableBodyWithGList..");

    clear_popup();

    var html="<tbody id=\"cfm-table-body\">";

    var sz=glist.length;
    var tmp="";
    for( var i=0; i< sz; i++) {
       var gid=glist[i];
       var t=find_meta_list(gid);
       var meta=t['meta'];
       var name=meta['name'];
       var tt;
       var s= find_style_list(gid);
       var h= s['highlight'];
       var vis=s['visible'];
       if(h) {
         if(vis) {
           tt="<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" id=\"button_"+gid+"\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+",0);><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-check\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td><td><label for=\"button_"+gid+"\">" + name + "</label></td></tr>";
            } else {
            tt="<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" id=\"button_"+gid+"\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+",0);><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-check\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-close\"></span></button></td><td><label for=\"button_"+gid+"\">" + name + "</label></td></tr>";
         }
         tmp=tt+tmp;
         } else {
           if(vis) {
             tt="<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" id=\"button_"+gid+"\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+",0);><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-unchecked\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-open\"></span></button></td><td><label for=\"button_"+gid+"\">" + name + "</label></td></tr>";
             } else {
             tt="<tr id=\"row_"+gid+"\"><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" id=\"button_"+gid+"\" title=\"highlight the fault\" onclick=toggle_highlight("+gid+",0);><span id=\"highlight_"+gid+"\" class=\"glyphicon glyphicon-unchecked\"></span></button></td><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" title=\"toggle on/off the fault\" onclick=toggle_layer("+gid+");><span id=\"toggle_"+gid+"\" class=\"glyphicon glyphicon-eye-close\"></span></button></td><td><label for=\"button_"+gid+"\">" + name + "</label></td></tr>";
           }
           tmp=tt+tmp;
        }
    }
    html=html+tmp+ "</tbody>";
    return html;
}


// using existing gid_list,
function makeResultTableWithList(glist)
{
    window.console.log("calling makeResultTableWithList..");

    if(glist.length > 0) {
      toggle_layer_with_list(glist);
      var newhtml = _makeResultTableBodyWithGList(glist);
      document.getElementById("cfm-table-body").innerHTML = newhtml;
    }
}

// https://www.w3schools.com/howto/howto_js_sort_table.asp
// n is which column to sort-by
// type is "a"=alpha "n"=numerical
function sortMetadataTableByRow(n,type) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("metadata-viewer");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc"; 

window.console.log("Calling sortMetadataTableByRow..",n);

  while (switching) {
    switching = false;
    rows = table.rows;
    if(rows.length < 3) // no switching
      return;

/* loop through except first and last */
    for (i = 1; i < (rows.length - 2); i++) {
      shouldSwitch = false;

      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];

      if (dir == "asc") {
        if(type == "a") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
          } else {
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
              shouldSwitch = true;
              break;
            }
         }
      } else if (dir == "desc") {
        if(type == "a") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
          } else {
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
              shouldSwitch = true;
              break;
            }
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++; 
    } else {

      window.console.log("done switching..");
      if(switchcount != 0) {

      }
     

      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  var id="#sortCol_"+n;
  var t=$(id);
  if(dir == 'asc') {
    t.removeClass("fa-angle-down").addClass("fa-angle-up");
    } else {
      t.removeClass("fa-angle-up").addClass("fa-angle-down");
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
  str=str+'<button class=\"btn btn-xs cfm-small-btn\" title=\"highlight this fault\"><span id=\"detail_'+gid+'\" class=\"glyphicon glyphicon-ok\" onclick=\"toggle_highlight('+gid+',0)\"></span></button>';
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


function addDownloadSelect() {
  var htmlstr="<div class=\"cfm-control-download-list\"><span style=\"font-size:14px;font-weight:bold; text-align:center;\">&nbsp;Select download </span><form onchange=\"changeDownloadSet()\"><div class=\"cfm-control-download-base\"><label> <div><input type=\"radio\" class=\"cfm-control-download-selector\" name=\"cfm-fault-download\" value=\"meta\"><span> metadata</span></div><div><input type=\"radio\" class=\"cfm-control-download-selector\" name=\"cfm-fault-download\" value=\"native\"><span> native + metadata</span></div></label><label><div><input type=\"radio\" class=\"cfm-control-download-selector\" name=\"cfm-fault-download\" value=\"500m\" ><span> 500m + metadata</span></div></label><label><div><input type=\"radio\" class=\"cfm-control-download-selector\" name=\"cfm-fault-download\" value=\"1000m\" ><span> 1000m + metadata</span></div></label></div></form></div>";

   var html_div=document.getElementById('downloadSelect');
   html_div.innerHTML = htmlstr;
}


function saveAsJSONBlobFile(data, timestamp)
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

function saveAsCSVBlobFile(data, timestamp)
{
//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
//   var rnd= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    var fname="CFM_metadata_"+timestamp+".csv";
    var blob = new Blob([data], {
        type: "text/plain;charset=utf-8"
    });
    //FileSaver.js
    saveAs(blob, fname);
}

function saveAsBlobFile(data)
{
    let timestamp = $.now();
    let fname="CFM_link_"+timestamp+".txt";
    let blob = new Blob([data], {
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

