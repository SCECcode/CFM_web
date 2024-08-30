/**
    cxm_kml.c

    manage uploaded kml being handled as a leaflet overlay layer
**/

// tracking table for a list of kmls

// [ { "idx": idx1, "layer": layer1, "name" : filename1, "visible":1 }, ...]
var kml_layer_list=[];

var visibleKML=null;

// toggle off - turn off all
// toggle on - show the list via modal
function toggleKML() {
   if(kml_layer_list.length == 0)
     return;
   let $elt=$('#eye_kml');
   if($elt.hasClass('glyphicon-eye-open')) {
     _toggle_off_all_kml();
     $elt.removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
     } else {
       // open modal
       $('#modalkmlselect').modal('show')
       $elt.removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
   }
}


function find_kml_layer(target) {
  let sz=kml_layer_list.length;
  for(let i=0; i<sz; i++) {
    let element=kml_layer_list[i];
    if ( element['name'] == target )
      return element;
  }
  return null;
}

function print_kml_layer() {
  let sz=kml_layer_list.length;
  for(let i=0; i<sz; i++) {
    let element=kml_layer_list[i];
    window.console.log("kml(%d) %s (%d)\n",element['idx'], element['name'], element['visible']);	   
  }
}

function addKMLGroup()
{
  let sz=kml_layer_list.length;
  var alist=[];
  for(let i=0; i<sz; i++) {
    let element=kml_layer_list[i];
    let t=element['visible'];
    let tt= (element['visible'] == 1);
    if(tt) {	    
      alist.push(element['layer']);
    }
  }	    
  if(alist.length != 0) {
    visibleKML = new L.FeatureGroup(alist);
    mymap.addLayer(visibleKML);
  }
}

function removeKMLGroup() {
  if(visibleKML != null) { 
    mymap.removeLayer(visibleKML);
    visibleKML=null;
  }
}

function updateKMLSelect() {
  removeKMLGroup();
  addKMLGroup();
}

function _toggle_off_all_kml() {
  let sz=kml_layer_list.length;
  for(let i=0; i<sz; i++) {
    let element = kml_layer_list[i];
    element['visible']= 0;
    let label="kml_"+i;
    let $elt=$(`#${label}`);
    $elt.removeClass('glyphicon-check').addClass('glyphicon-unchecked');
    $elt.css("color","#011638");
  }
  updateKMLSelect();
}


function toggle_kml(label, idx) {
  let element = kml_layer_list[idx];
  let vis = element['visible'];
  let $elt = $(`#${label}`);
  if(vis == 1) {
    element['visible']= 0;
    $elt.removeClass('glyphicon-check').addClass('glyphicon-unchecked');
    $elt.css("color","#011638");
    } else {
      element['visible']= 1;
      $elt.removeClass('glyphicon-unchecked').addClass('glyphicon-check');
      $elt.css("color","#990000");
  }
  updateKMLSelect();
}

function addToKMLSelectTable(fname) {
// first entry ?
  let idx=kml_layer_list.length;
  let t_label="kml_"+idx;
  var html;

  var html_r ="<tr><td style=\"width:25px\"><button class=\"btn btn-sm cfm-small-btn\" title=\"toggle the kml\" onclick=toggle_kml(\""+t_label+"\","+idx+");> <span id=\""+t_label+"\" class=\"glyphicon glyphicon-check\"></span></button> </td> <td><label for=\""+t_label+"\">" + fname + "</label></td></tr>";

  if(idx == 0) {
    html="<div class=\"kml-table\"><table>";
    var html_head ="<tr><td colspan=\"2\">Turn on/off kml/kmz layers</td></tr>";
    html+="<tbody id=\"kml-table-body\">"+html_head+html_r+"</tbody></table></div>";
    document.getElementById("kmlselectTable-container").innerHTML = html;
    } else {
     let tmp= $("#kml-table-body");
     tmp.append(html_r);
  }

  return idx;
}

// from an user selected client side file
function uploadKMLFile(urls) {

  let sz=urls.length;
  for(let i=0; i<sz; i++) { 
// tracking table for a list of kmls
    _readKMLFile(urls,i);
  }
}

function _readKMLFile(urls,idx) {

  let fname= urls[idx].name;

// fname ends in .kml, or .kmz
  let stub = fname.substring(fname.length - 4, fname.length);
  let p=stub.toUpperCase();
  if( (stub.toUpperCase() === ".KML") || (stub.toUpperCase() === ".KMZ") ) {
  // right type of files
    } else {
      window.console.log("uploadKMLFile: incorrect file type\n");
      return;
  }

  let elm=find_kml_layer(fname);
  if(elm != null) return;

  var reader = new FileReader();

  reader.onload=function(event) {
    var result =reader.result;

    var kmlLayer = L.kmzLayer();
    kmlLayer.parse(result, { name: fname, icons: {} });

//  add to kml table
    let tidx=addToKMLSelectTable(fname);

    kml_layer_list.push({"layer":kmlLayer,"name":fname,"visible":1,"idx":tidx });
    $('#kmlSelectBtn').css("display", "");

    removeKMLGroup();
    addKMLGroup();

    // only if kml file type
    if( stub.toUpperCase() === ".KML" ) {
      const bounds = kmlLayer.getBounds();
      mymap.fitBounds(bounds);
    }
  };
  reader.readAsArrayBuffer(urls[idx]);
}


