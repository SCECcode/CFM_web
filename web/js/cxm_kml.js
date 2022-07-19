/**
    cxm_kml_util.c

    manage user uploaded kml being handled as a leaflet overlay layer
**/

// tracking table for a list of kmls

// [ { "layer": layer1, "name" : name1, "visible":1 }, {"layer": layer2, "name": name2, "visible":0 }, ... ]
var kml_layer_list=[];

var visibleKML=null;

//
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
    window.console.log("kml(%d) %s (%d)\n",i, element['name'], element['visible']);	   
  }
}

function addKMLGroup()
{
  let sz=kml_layer_list.length;
  for(let i=0; i<sz; i++) {
    let element=kml_layer_list[i];
    if(element['visibile']==1)	    
      if(visibleKML == null) {
        visibleKML = new L.FeatureGroup(element['layer']);
        } else {
        visibleKML.addLayer(element['layer']);
      }
  }	    
  mymap.addLayer(visibleKML);
}

function removeKMLGroup() {
  if(visibleKML != null) { 
    mymap.removeLayer(visibleKML);
    visibleKML=null;
  }
}


// from an user selected client side file
function uploadKMLFile(urls) {

window.console.log("start HERE...%s",urls[0].name );

  let elm=find_kml_layer(urls[0].name);
  if(elm != null) return;

  var reader = new FileReader();

  reader.onload=function(event) {
    var result =reader.result;
    var kmlLayer = omnivore.kml.parse(result);

/*
    .on('ready', function() {
        map.fitBounds(runLayer.getBounds());
    })
    .addTo(map);
*/
    kml_layer_list.push({"layer":kmlLayer,"name":urls[0].name,"visible":1 });
    mymap.addLayer(kmlLayer);

//    var layer=_kml2leaflet(reader.result);
    // store layer in overlay data base
//    return _layerToMap(trace_list,viewermap);
  };
  reader.readAsText(urls[0]);
}


