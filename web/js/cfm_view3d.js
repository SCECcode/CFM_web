/***
   cfm_view3d.js
***/

var VIEW3D_tb = {
  "3dview": [
       { 'id':1,
         'name': '3D Navigation',
         'description': '<b>Rotate in 3D:</b> left click<br><b>Translate:</b> shift key+left click<br> <b>Zoom in/out:</b> mouse scroll wheel'},
       { 'id':2,
         'name': 'Show Wireframe',
         'description': 'Selects the rendering mode for fault surfaces: Solid Surface, Wireframe or Surface with Wireframe overlay'},
       { 'id':3,
         'name': 'Hide Traces',
         'description': 'Show/Hide Fault traces and upper tiplines of Blind faults'},
       { 'id':4,
         'name': 'Hide Coastline',
         'description': 'Show/Hide California outline and coastline'},
       { 'id':5,
         'name': 'Hide Bounding Box',
         'description': 'Show/Hide Bounding Box around the selected faults'},
       { 'id':6,
         'name': 'Legend',
         'description': 'Show/Hide the Legend<br>Colored boxes in the legend can be clicked on to change surface color<br>Slider bar controls opacity from 0.1 to 1.0<br>Click on the fault name in the legend to toggle on/off surface visibility'},
       { 'id':7,
         'name': 'Show Mapview',
         'description': 'Return to the original mapview orientation zoomed to selected faults'},
       { 'id':8,
         'name': 'Close',
         'description': 'Close the 3D view'},
       { 'id':9,
         'name': 'Shrink',
         'description': 'Shrink to a smaller screen view'},
       { 'id':10,
         'name': 'Reset',
         'description': 'Refresh the 3D view to the default mapview orientation' },
       { 'id':11,
         'name': 'Save',
         'description': 'Save a copy of 3D view (no legend)' },
       { 'id':12,
         'name': 'Help',
         'description': 'Display this information table'},
       { 'id':13,
         'name': 'Orientation Marker',
         'description': 'Green arrow points toward the North<br>Pink points east'},
       { 'id':14,
         'name': 'Disclaimer',
         'description': '<p>This viewer is intended to provide potential CFM users with a quick and convenient way to view CFM fault surfaces in their native 3D environment (UTM zone 11s). This tool not designed to replace fully functional CAD software. Refer to the <a href="https://www.scec.org/research/cfm">CFM homepage</a> for information about recommended software.</p><p>This tool currently does not have the ability to plot 3D axes, and a map scale in 3D is not useful because any scale would only be valid at one given distance from the viewer. Faults in the CFM extend to the approximate base of the seismogenic zone (max depth of earthquakes), which is approximately 15 – 20 km depth in most southern California regions.</p><p>For location purposes, the 3D viewer shows all CFM fault traces in pink, blind fault upper tip lines in orange, and the coastline and state boundaries in black. In the bottom right corner, the green arrow points North, pink points East, and yellow points up vertically.</p><p>Learning to navigate in 3D takes some practice, so if you get lost or disoriented, try clicking on the “Show Mapview” button in the top right corner to reset to the original mapview.</p>'},
        ]
};

function setup_info3dTable() {
   var tb=VIEW3D_tb['3dview'];
   var cnt=tb.length-1;
   var i;
   var tbhtml="<div class=\"ucvm-table\"><table>";
   tbhtml=tbhtml+"<thead><tr><th style=\"width:8vw\">Name</th><th style=\"width:40vw\"><b>Description</b></th></tr></thead><tbody>";

   for( i=0; i<cnt; i++) {
     var item=tb[i];
     var mname=item['name'];
     var descript=item['description'];
     var t="<tr><td style=\"width:6vw\">"+mname+"</td><td style=\"width:40vw\">"+descript+"</td></tr>";
     tbhtml=tbhtml+t;
   }
   tbhtml=tbhtml+"</tbody></table></div>";

   var html=document.getElementById('info3dTable-container');
   html.innerHTML=tbhtml;
}

var skip_warning=false;
function setup_warn3dTable() {
   var tb=VIEW3D_tb['3dview'];
   var last=tb.length-1;
   var tbhtml="<div class=\"ucvm-table\"><table>";
   tbhtml=tbhtml+"<thead></thead><tbody>";

   // grab from first, and last
   var item=tb[0];
   var mname=item['name'];
   var descript=item['description'];
   var t="<tr><td style=\"width:60vw;\"><b>3D Navigation Instructions</b><br>"+descript+"</td></tr>";
   tbhtml=tbhtml+t;

   var item=tb[last];
   var mname=item['name'];
   var descript=item['description'];
   var t="<tr><td style=\"width:30vw\"><b>Intended Uses and Limitations</b><br>"+descript+"</td></tr>";
   tbhtml=tbhtml+t;

   tbhtml=tbhtml+"</tbody></table></div>";

   var html=document.getElementById('warn3dTable-container');
   html.innerHTML=tbhtml;
}


/*** iframe housekeeping ***/
/* viewerType=viewerType&fileURL=[file1, file2]&name=[name1, name2]&filePATH=[path] */
function set_PARAMS(params) {
  $('#params3D').attr('src',params);
}
function get_PARAMS() {
  var pparams=$('#params3D').attr('src');
  return pparams;
}

function show3dView(urls,nstr,path) {
  reset_search_selection();

  resetLegend3Dview();
  resetRepr3Dview();
  resetBounds3Dview();
  resetExpand3Dview();
  resetShore3Dview();
  resetTrace3Dview();

  $('#modal3D').modal('show');

// urls causing problem when it is too large
  var params;
  if(path == undefined) {
     params= "viewerType="+viewerType+"&fileURL="+urls+"&name="+nstr;
     } else {
       params="viewerType="+viewerType+"&fileURL="+urls+"&name="+nstr+"&filePATH="+path;
  }
  set_PARAMS(params);

  if(params.length > 1000) {
    $('#view3DIfram').attr('src',"cfm_3d.html?2Long");
    } else {
      $('#view3DIfram').attr('src',"cfm_3d.html?"+params);
  }
}

function sendParams3Dview() {
    var params=get_PARAMS();
    var iwindow=document.getElementById('view3DIfram').contentWindow;
    var eparams=encodeURI(params);
    window.console.log("service, sending a message to iframe.");
    iwindow.postMessage({call:'fromSCEC',value:eparams},"*");
}


window.addEventListener("DOMContentLoaded", function () {

  window.addEventListener('message', function(event) {

    window.console.log(" SERVER Side>>>> got a message..");
    var origin = event.origin;
    if (origin != "http://localhost" && origin != "http://asperity.scec.org" && origin != "https://www.scec.org") {
        window.console.log("service, bad message origin:", origin);
        return;
    }

    if (typeof event.data == 'object' && event.data.call=='from3DViewer') {
        if(event.data.value == "send params") {
          sendParams3Dview();
          return;
        }
        if(event.data.value == "done with loading") {
          window.console.log(" SERVER, turn off load spinner");
          document.getElementById('spinIconFor3D').style.display = "none";
          return;
        }
        if(event.data.value == "start loading") {
          document.getElementById('spinIconFor3D').style.display = "block";
          window.console.log(" SERVER, turn on loading spinner");
          return;
        }
        if(event.data.value == "ready") {
          window.console.log(" SERVER, 3d viewer is ready");
          return;
        }
        window.console.log("service, what the heck ..",event.data.value);
      } else {
      window.console.log("service, what the heck 2 ..",event.data);
    }
 })
}, false);

function showPlot3dWarning() {
  if(!skip_warning) {
    skip_warning=true;
    let elt=document.getElementById("view3DWarnbtn");
    elt.click();
  }
}

// should be able to track the initial state and then return to it
function refresh3Dview() {
  resetLegend3Dview();
  resetRepr3Dview();
  resetBounds3Dview();
  resetExpand3Dview();
  resetShore3Dview();
  resetTrace3Dview();

  var params=get_PARAMS();

  if(params.length > 1000) {
//    $('#view3DIfram').attr('src',"cfm_3d.html?2Long");
    $('#view3DIfram').attr('src',"cfm_3d.html?"+fixparam);
    } else {
      $('#view3DIfram').attr('src',"cfm_3d.html?"+params);
  }
}

// move current popup modal to a new tab
function move3Dview() {
  var yourDOCTYPE = "<!DOCTYPE html>"; // your doctype declaration
  var copyPreview = window.open('about:blank', 'new copy', "resizable=yes,scrollbars=yes,status=yes");
  var newCopy = copyPreview.document;
  newCopy.open();
  // remove copy and new tab buttons
  document.getElementById("view3DClosebtn").style.display="none";
  document.getElementById("view3DMovebtn").style.display="none";
  var newInner=document.documentElement.innerHTML;
  newCopy.write(yourDOCTYPE+"<html>"+ newInner+ "</html>");
  newCopy.close();
  document.getElementById("view3DClosebtn").style.display="block";
  document.getElementById("view3DMovebtn").style.display="block";
  document.getElementById("view3DClosebtn").click();
}

var track_trace=initial_track_trace; // 1 is on 0 is off
function toggleTrace3Dview(elt) {
  document.getElementById("view3DIfram").contentDocument.getElementById("Tracebtn").click();
  
  track_trace = !track_trace;
  if(track_trace) {
    elt.innerHTML=initial_trace_html;
    } else {
      elt.innerHTML=initial_not_trace_html;
  }
}

function resetTrace3Dview() {
  let elt=document.getElementById("view3DToggleTracebtn");
  var track_trace=initial_track_trace;
  elt.innerHTML=initial_trace_html;
}


var track_shore=1; // 1 is on 0 is off
function toggleShore3Dview(elt) {
  document.getElementById("view3DIfram").contentDocument.getElementById("Shorebtn").click();
  
  track_shore = !track_shore;
  if(track_shore) {
    elt.innerHTML="Hide Coastline";
    } else {
      elt.innerHTML="Show Coastline";
  }
}

function resetShore3Dview() {
  let elt=document.getElementById("view3DToggleShorebtn");
  var track_shore=1; // 1 is on 0 is off
  elt.innerHTML="Hide Coastline";
}

var track_legend=1; // 1 is on 0 is off
function toggleLegend3Dview(elt) {
  document.getElementById("view3DIfram").contentDocument.getElementById("Legendbtn").click();
  
  track_legend = !track_legend;
  if(track_legend) {
    elt.innerHTML="Hide Legend";
    } else {
      elt.innerHTML="Show Legend";
  }
}

function resetLegend3Dview() {
  let elt=document.getElementById("view3DToggleLegendbtn");
  var track_legend=1; // 1 is on 0 is off
  elt.innerHTML="Hide Legend";
}

function toggleNorth3Dview(elt) {
  document.getElementById("view3DIfram").contentDocument.getElementById("Northbtn").click();
}

var track_representation=0; // 1 is wireframe 0 is surface 2 is surface + edge
//publicAPI.toggle
function toggleRepr3Dview(elt) {
  document.getElementById("view3DIfram").contentDocument.getElementById("Reprbtn").click();
  
  track_representation = ( track_representation + 1 ) % 3;
  switch( track_representation ) {
    case 0:
      elt.innerHTML="Show Wireframe";
      break;
    case 1:
      elt.innerHTML="Show Wireframe & Surface";
      break;
    case 2:
      elt.innerHTML="Show Surface";
      break;
  }
}

function resetRepr3Dview() {
  track_representation=0;
  let elt=document.getElementById("view3DToggleReprbtn")
  elt.innerHTML="Show Wireframe";
}

var track_bounds=0; // 0 is final 1 is local 2 is none
//publicAPI.toggle
function toggleBounds3Dview(elt) {
  document.getElementById("view3DIfram").contentDocument.getElementById("Boundsbtn").click();

  track_bounds = ( track_bounds + 1 ) % 3;
  switch( track_bounds ) {
    case 0:
      elt.innerHTML="Show All Bounds";
      break;
    case 1:
      elt.innerHTML="Hide Bounds";
      break;
    case 2:
      elt.innerHTML="Show Bounds";
      break;
  }
}

function resetBounds3Dview() {
  track_bounds=0;
  let elt=document.getElementById("view3DToggleBoundsbtn");
  elt.innerHTML="Show All Bounds";
}

// footer is about 58px
function setIframHeight(id) {
  let top = document.documentElement.clientHeight;
  var f_h=58;
  var height=top -(f_h* 4);
  document.getElementById(id).height = height;
}

var track_full=0; // 1 is on 0 is off
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
      var c=document.getElementById("modal3DContent");
      var f=document.getElementById("modal3DFooter");
      var c_h=c.scrollHeight;
      var f_h=f.scrollHeight;
      var n_h=c_h -(f_h* 2.5);
      document.getElementById("view3DIfram").height = n_h;
  }
}

function resetExpand3Dview() {
  let elt=document.getElementById("view3DExpandbtn");
  if(track_full == 1) {
    track_full=0;
    elt.innerHTML="Shrink";
    $('#modal3DDialog').addClass('full_modal-dialog');
    $('#modal3DContent').addClass('full_modal-content');
    var c=document.getElementById("modal3DContent");
    var f=document.getElementById("modal3DFooter");
    var c_h=c.scrollHeight;
    var f_h=f.scrollHeight;
    var n_h=c_h -(f_h* 2.5);
    document.getElementById("view3DIfram").height = n_h;
  }
}

function save3Dview() {
  document.getElementById("view3DIfram").contentDocument.getElementById("Downloadbtn").click();
}


