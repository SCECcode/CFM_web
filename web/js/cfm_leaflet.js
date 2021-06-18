/***
   cfm_leaflet.js

This is leaflet specific utilities

***/

var init_map_zoom_level = 7;
var seisimicity_map_zoom_level = 9;

var enable_seisimicity=0; // retrieve local seisimicity on zoom demand
var fault_width_change=0;

var scecAttribution ='<a href="https://www.scec.org">SCEC</a>';

var rectangle_options = {
       showArea: false,
         shapeOptions: {
              stroke: true,
              color: "red",
              weight: 3,
              opacity: 0.5,
              fill: true,
              fillColor: null, //same as color by default
              fillOpacity: 0.1,
              clickable: false
         }
};
var rectangleDrawer;
var mymap, baseLayers, layerControl, currentLayer;
var mylegend;
var visibleFaults = new L.FeatureGroup();

function clear_popup()
{
  viewermap.closePopup();
}

function refresh_map()
{
  if (viewermap == undefined) {
    window.console.log("refresh_map: BAD BAD BAD");
    } else {
      viewermap.setView([34.3, -118.4], init_map_zoom_level);
  }
}

function set_map(center,zoom)
{
  if (viewermap == undefined) {
    window.console.log("set_map: BAD BAD BAD");
    } else {
      viewermap.setView(center, zoom);
  }
}

function get_bounds()
{
   var bounds=viewermap.getBounds();
   return bounds;
}

function get_map()
{
  var center=[34.3,-118.4];
  var zoom=7;
  if (viewermap == undefined) {
    window.console.log("get_map: BAD BAD BAD");
    } else {
      center=viewermap.getCenter();
      zoom=viewermap.getZoom();
  }
  return [center, zoom];
}

function setup_viewer()
{
// esri
  var esri_topographic = L.esri.basemapLayer("Topographic");
  var esri_imagery = L.esri.basemapLayer("Imagery");
  var esri_ng = L.esri.basemapLayer("NationalGeographic");

// otm topo
  var topoURL='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
  var topoAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreeMap</a> contributors,<a href=http://viewfinderpanoramas.org"> SRTM</a> | &copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a>(CC-BY-SA)';
  L.tileLayer(topoURL, { detectRetina: true, attribution: topoAttribution, maxZoom:18 })

  var otm_topographic = L.tileLayer(topoURL, { detectRetina: true, attribution: topoAttribution, maxZoom:18});

// osm street
  var openURL='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var openAttribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  var osm_street=L.tileLayer(openURL, {attribution: openAttribution, maxZoom:18});

  baseLayers = {
    "esri topo" : esri_topographic,
    "esri NG" : esri_ng,
    "esri imagery" : esri_imagery,
    "otm topo": otm_topographic,
    "osm street" : osm_street
  };
  var overLayer = {};
  var basemap = L.layerGroup();
  currentLayer = esri_topographic;

// ==> mymap <==
  mymap = L.map('CFM_plot', { drawControl:false, layers: [esri_topographic, basemap], zoomControl:true} );
  mymap.setView([34.3, -118.4], init_map_zoom_level);
  mymap.attributionControl.addAttribution(scecAttribution);

// basemap selection
  var ctrl_div=document.getElementById('external_leaflet_control');

// ==> layer control <==
// add and put it in the customized place
//  L.control.layers(baseLayers, overLayer).addTo(mymap);
  layerControl = L.control.layers(baseLayers, overLayer,{collapsed: true });
  layerControl.addTo(mymap);
  var elem= layerControl._container;
  elem.parentNode.removeChild(elem);

  ctrl_div.appendChild(layerControl.onAdd(mymap));
  // add a label to the leaflet-control-layers-list
  var forms_div=document.getElementsByClassName('leaflet-control-layers-list');
  var parent_div=forms_div[0].parentElement;
  var span = document.createElement('span');
  span.style="font-size:14px;font-weight:bold;";
  span.className="leaflet-control-layers-label";
  span.innerHTML = 'Select background';
  parent_div.insertBefore(span, forms_div[0]);

// ==> scalebar <==
  L.control.scale({metric: 'false', imperial:'false', position: 'bottomleft'}).addTo(mymap);

/* ==> watermark <== 
  L.Control.Watermark = L.Control.extend({
    onAdd: function (map) {
      var img=L.DomUtil.create('img');
      img.src = './img/sceclogo_transparent.png';
      img.style.width ='200px';
      return img;
    },
    onRemove: function(map) {
       // no-op
    }
  });
  L.Control.watermark= function(opts) {
     return new L.Control.Watermark(opts);
  }
  var myWatermark=L.Control.watermark({ position: 'topright' }).addTo(mymap);

  to remove,
  mymap.removeControl(myWatermark);
*/

//==> seisimicity legend <==  
  mylegend=L.control( {position:'bottomleft'});

  mylegend.onAdd = function (map) {
    this._div = L.DomUtil.create('div'); 
    this.update();
    return this._div;
  };

  mylegend.update = function (props, param=null) {
     window.console.log("XXX calling mylegend "+param);
     if(param == null) {
       this._div.innerHTML="";
       return;
     }
     this._div.innerHTML='<img src="./img/'+param+'" style="width:100px; margin-left:-5px; border:2px solid green" >';
  }

  mylegend.addTo(mymap);
  //mylegend.update({}, "cfm-viewer.png");
  //to remove,
  //mymap.removeControl(mylegend);


// ==> mouse location popup <==
//   var popup = L.popup();
  // function onMapClick(e) {
  //   if(!skipPopup) { // suppress if in latlon search ..
  //     popup
  //       .setLatLng(e.latlng)
  //       .setContent("You clicked the map at " + e.latlng.toString())
  //       .openOn(mymap);
  //   }
  // }
  // mymap.on('click', onMapClick);

  function onMapMouseOver(e) {
    if(drawing_rectangle) {
      draw_at();
    }
  }
  mymap.on('mouseover', onMapMouseOver);

  function onMapZoom(e) {
    var zoom=mymap.getZoom();
    if(zoom >= seisimicity_map_zoom_level && enable_seisimicity) {
      window.console.log("map got zoomed..>>",zoom);
      removeSeisimicityLayer();
      var bounds=get_bounds();
      var sw=bounds.getSouthWest();
      var ne=bounds.getNorthEast();
      window.console.log("map's bounds..>>", sw,ne);
      if(enable_seisimicity) {
         get_seisimicity(sw,ne);   
         enable_seisimicity=0; // do it only once
      }
    }
//window.console.log("map got zoomed..>>",zoom);
    if( fault_width_change && zoom > default_zoom_threshold) {
       change_fault_weight(default_weight); // change width to 2px
//window.console.log("change weight back to"+default_weight);
       fault_width_change=0;
    }
    if(zoom <= default_zoom_threshold) {
//window.console.log("changing weight size.."+(default_weight/2 ));
       change_fault_weight(default_weight/2); // half the width
       fault_width_change=1;
    } 

  }
  mymap.on('zoomend dragend', onMapZoom);

// ==> rectangle drawing control <==
/*
  var drawnItems = new L.FeatureGroup();
  mymap.addLayer(drawnItems);
  var drawControl = new L.Control.Draw({
       draw: false,
       edit: { featureGroup: drawnItems }
  });
  mymap.addControl(drawControl);
*/
  rectangleDrawer = new L.Draw.Rectangle(mymap, rectangle_options);
  mymap.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
        layer = e.layer;
    if (type === 'rectangle') {  // only tracks rectangles
        // get the boundary of the rectangle
        var latlngs=layer.getLatLngs();
        // first one is always the south-west,
        // third one is always the north-east
        var loclist=latlngs[0];
        var sw=loclist[0];
        var ne=loclist[2];
        add_bounding_rectangle_layer(layer,sw['lat'],sw['lng'],ne['lat'],ne['lng']);
        mymap.addLayer(layer);
// XX CHECK, the rectangle created on the mapview does not seem to 'confirm'
// like hand inputed rectangle. Maybe some property needs to be set
// For now, just make the rectangle to be redrawn
        searchByLatlon(0);
    }
  });


// finally,
  return mymap;
}

function removeColorLegend() {
  mylegend.update();
}
function showColorLegend(param) {
  mylegend.update({}, param);
}

function drawRectangle(){
  rectangleDrawer.enable();
}
function skipRectangle(){
  rectangleDrawer.disable();
}

// ==> feature popup on each layer <==
function popupDetails(layer) {
   layer.openPopup(layer);
}

function closeDetails(layer) {
   layer.closePopup();
}

function addGeoToMap(cfmTrace, mymap) {

   var geoLayer=L.geoJSON(cfmTrace, {
     filter: function (feature, layer) {
            if (feature.properties) {
                var tmp=feature.properties.show_on_map != undefined ? !feature.properties.show_on_map : true;
                return tmp;
            }
            return false;
     },
     style: function(feature) {
        var tmp=feature.properties.style;
        if(feature.properties.style != undefined) {
            return feature.properties.style;
        } else {
            return {color: "#0000ff", "weight":2}
        }
     },
     onEachFeature: bindPopupEachFeature
   }).addTo(mymap);
   visibleFaults.addLayer(geoLayer);

   // var layerPopup;
   // geoLayer.on('mouseover', function(e){
/* not used..
    // array of array
    var coordinates = e.layer.feature.geometry.coordinates;
    // pick the middle one
    var s=Math.floor((coordinates.length)/2);
    var tmp_coords=coordinates[s][0];
    var swapped_coordinates = [tmp_coords[1], tmp_coords[0]];  //Swap Lat and Lng
*/
// leaflet-popup-close-button -- location
//     if (mymap && !skipPopup) {
//        var tmp=e.layer.feature.properties;
//        var level1=tmp.popupMainContent;
// //       layerPopup = L.popup({ autoClose: false, closeOnClick: false })
//        layerPopup = L.popup()
//            .setLatLng(e.latlng)
//            .setContent(level1)
//            .openOn(mymap);
//     }
//   });
/*** XXX
  geoLayer.on('mouseout', function (e) {
    window.console.log("moues out..layer#"+e.layer.feature.id)
    if (layerPopup && mymap) {
        mymap.closePopup(layerPopup);
        layerPopup = null;
    }
  });
***/

    geoLayer.on('mouseover', function(e){
        if (mymap && !drawing_rectangle) {
            e.layer.setStyle({weight: 5});
        }
   });

   geoLayer.on('mouseout', function(e){
       if (mymap && !drawing_rectangle) {
           e.layer.setStyle({weight: 2});
       }
   });

  addOne2GeoCounter();
  return geoLayer;
}


// binding the 'detail' fault content
function bindPopupEachFeature(feature, layer) {
    var popupContent="";

    // if (feature.properties != undefined  && feature.properties.popupContent != undefined ) {
    //   popupContent += feature.properties.popupContent;
    // }
    // layer.bindPopup(popupContent);
    layer.on({
        click: function(e) {
            let clickedFaultID = feature.id;
            toggle_highlight(clickedFaultID,1);
        },
    })
}

// https://gis.stackexchange.com/questions/148554/disable-feature-popup-when-creating-new-simple-marker
function unbindPopupEachFeature(layer) {
    layer.unbindPopup();
    layer.off('click');
}

function addRectangleLayer(latA,lonA,latB,lonB) {
/*
  var pointA=L.point(latA,lonA);
  var pointB=L.point(latB,lonB);
  var bounds=L.latLngBounds(viewermap.containerPointToLatLng(pointA),
                                  viewermap.containerPointToLatLng(pointB));
*/
  var bounds = [[latA, lonA], [latB, lonB]];
  var layer=L.rectangle(bounds).addTo(viewermap);
  return layer;
}

// make it without adding to map
function makeRectangleLayer(latA,lonA,latB,lonB) {
  var bounds = [[latA, lonA], [latB, lonB]];
  var layer=L.rectangle(bounds);
  return layer;
}

function setupSeisimicityLayer() {
  if(cfm_quake_group != null) {
    removeSeisimicityLayer();
  }
  cfm_quake_group = new L.FeatureGroup();
  mymap.addLayer(cfm_quake_group);
}

function removeSeisimicityLayer() {
  if(cfm_quake_group != null) {
      cfm_quake_group.clearLayers();
      mymap.removeLayer(cfm_quake_group);
      cfm_quake_group=null;
  }
}


function addLeafletMarkerLayer(lat,lon) {
  var bounds = [lat, lon];
  var layer = new L.marker(bounds,point_options).addTo(viewermap);
  return layer;
}

function makeLeafletMarker(bounds,cname,size,color) {
var sz=size;
var hsz=-0.5*sz;

const markerHtmlStyles = `
  background: ${color};
  width: ${sz}rem;
  height: ${sz}rem;
  display: block;
  left: ${hsz}rem;
  top: ${hsz}rem;
  position: relative;
  border-radius: ${sz}rem ${sz}rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`;

const localIcon = L.divIcon({
  className: '',
  iconAnchor: [0, 0],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
  html: `<span style="${markerHtmlStyles}" />`
});

  var myIcon = L.divIcon({className:cname});
  var myOptions = { icon : myIcon};
//  var myOptions = { icon : localIcon};

  var layer = L.marker(bounds, myOptions);
  var icon = layer.options.icon;
  icon.options.iconSize = [size,size];
  layer.setIcon(icon);
  return layer;
}

// color has 20 different colors
function addPointsLayerGroup(lats,lngs,clist) {
  var cnt=lats.length;
  if(cnt < 1)
    return null;
  var layers=[];
  var zoom=mymap.getZoom();
  var sz=getQuakeSize(zoom,cnt);
  window.console.log("using sz for points >>", sz);
  for(var i=0;i<cnt;i++) {
     var lat=lats[i];
     var lon=lngs[i];
     var bounds = [lat,lon];
     var cclass=clist[i];
     var cstr=cclass+" default-point-icon";
     var layer=makeLeafletMarker(bounds,cstr,sz,'black');
     layers.push(layer);
  }
  var group = new L.FeatureGroup(layers);
  mymap.addLayer(group);
  return group;
}

function switchLayer(layerString) {
    mymap.removeLayer(currentLayer);
    mymap.addLayer(baseLayers[layerString]);
    currentLayer = baseLayers[layerString];

}


