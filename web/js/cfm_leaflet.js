/***
   cfm_leaflet.js

This is leaflet specific utilities

***/

var init_map_zoom_level = 5.5;
var init_map_coordinates = [38, -120.0];
var seismicity_map_zoom_level = 9;

var enable_seismicity=0; // retrieve local seismicity on zoom demand
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

function resize_map()
{
  viewermap.invalidateSize();
}

function refresh_map()
{
  if (viewermap == undefined) {
    window.console.log("refresh_map: BAD BAD BAD");
    } else {
      window.console.log("refresh_map: calling setView");
      viewermap.setView( init_map_coordinates , init_map_zoom_level);
  }
}

function set_map(center,zoom)
{
  if (viewermap == undefined) {
    window.console.log("set_map: BAD BAD BAD");
    } else {
      window.console.log("set_map: calling setView");
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
  var center=init_map_coordinates;
  var zoom=init_map_zoom_level;
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

// web@scec.org  - ArcGIS apiKey, https://leaflet-extras.github.io/leaflet-providers/preview/
// https://www.esri.com/arcgis-blog/products/developers/developers/open-source-developers-time-to-upgrade-to-the-new-arcgis-basemap-layer-service/

  var esri_apiKey = "AAPK2ee0c01ab6d24308b9e833c6b6752e69Vo4_5Uhi_bMaLmlYedIB7N-3yuFv-QBkdyjXZZridaef1A823FMPeLXqVJ-ePKNy";
  var esri_topographic = L.esri.Vector.vectorBasemapLayer("ArcGIS:Topographic", {apikey: esri_apiKey});
  var esri_imagery = L.esri.Vector.vectorBasemapLayer("ArcGIS:Imagery", {apikey: esri_apiKey});
  var osm_streets_relief= L.esri.Vector.vectorBasemapLayer("OSM:StreetsRelief", {apikey: esri_apiKey});
  var esri_terrain = L.esri.Vector.vectorBasemapLayer("ArcGIS:Terrain", {apikey: esri_apiKey});

// otm topo
  var topoURL='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
  var topoAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreeMap</a> contributors,<a href=http://viewfinderpanoramas.org"> SRTM</a> | &copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a>(CC-BY-SA)';
  var otm_topographic = L.tileLayer(topoURL, { detectRetina: true, attribution: topoAttribution, maxZoom:16});

  var jawg_dark = L.tileLayer('https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 16,
        accessToken: 'hv01XLPeyXg9OUGzUzaH4R0yA108K1Y4MWmkxidYRe5ThWqv2ZSJbADyrhCZtE4l'});

  var jawg_light = L.tileLayer('https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 16,
        accessToken: 'hv01XLPeyXg9OUGzUzaH4R0yA108K1Y4MWmkxidYRe5ThWqv2ZSJbADyrhCZtE4l' });

// osm street
  var openURL='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var openAttribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
  var osm_street=L.tileLayer(openURL, {attribution: openAttribution, maxZoom:16});
  var white = L.tileLayer("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX///+nxBvIAAAAH0lEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAAAAA5wIhAAAB9aK9BAAAAABJRU5ErkJggg==", {minZoom: 6, maxZoom: 9});

// With a png file, Create georeferenced tif image with QGIS 
//   >>QGIS dashboard-load openstreet map-georeferencer-pick coordinates from map to referencer-export tiff image 
// Create tiles from the georeferenced image with gdal2tiles: (pip install gdal2tiles)
//     gdal2tiles.py -e  --zoom=6-16  georeference_image.tif output_folder
	
  var lyr = L.tileLayer('./data/cybershake22_12/{z}/{x}/{y}.png', {tms: 1, opacity: 1, attribution:scecAttribution, minZoom: 5, maxZoom: 13});
  var lyr2 = L.tileLayer('./data/vs30_2022_v2/{z}/{x}/{y}.png', {tms: 1, opacity: 1, attribution:scecAttribution, minZoom: 5, maxZoom: 10});

  baseLayers = {
    "esri topo" : esri_topographic,
    "esri imagery" : esri_imagery,
    "jawg light" : jawg_light,
    "jawg dark" : jawg_dark,
    "osm streets relief" : osm_streets_relief,
    "otm topo": otm_topographic,
    "osm street" : osm_street,
    "esri terrain": esri_terrain,
    "cybershake":lyr,
    "v3 etree":lyr2
  };

  var overLayer = {};
  var basemap = L.layerGroup();
  currentLayer = esri_topographic;

// ==> mymap <==
  mymap = L.map('CFM_plot', { zoomSnap: 0.25, drawControl:false, layers: [esri_topographic, basemap], zoomControl:true} );
  mymap.setView( init_map_coordinates , init_map_zoom_level);
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

//==> seismicity legend <==  
  mylegend=L.control( {position:'bottomleft'});

  mylegend.onAdd = function (map) {
    this._div = L.DomUtil.create('div'); 
    this.update();
    return this._div;
  };

  mylegend.update = function (props, param=null) {
     if(param == null) {
       this._div.innerHTML="";
       return;
     }
     this._div.innerHTML='<img src="./img/'+param+'" style="width:200px; margin-left:-5px;" >';
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

  function onMapZoom(e) { // change fault weight
    var zoom=mymap.getZoom();
window.console.log("map got zoomed..>>",zoom);
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

// enable the expand view key
$("#CFM_plot").prepend($("#expand-view-key-container").html());
let tmp=$(".leaflet-control-attribution");
// should  only have 1, adjust the attribution's location
let v= document.getElementsByClassName("leaflet-control-attribution")[0];
v.style.right="1.5rem";
v.style.height="1.4rem";
v.style.width="35rem";

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

// if doen=1, all traces are done, else 0
  let done=addOne2GeoCounter();
  return [geoLayer, done];
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


function makeLeafletMarker3(bounds,size) {
  var leafIcon = L.icon({
    iconUrl: 'img/star_icon.png',
    iconSize:     [10, 10], 
    iconAnchor:   [0, 0], 
    popupAnchor:  [-3, -5] // point from which the popup should open relative to the iconAnchor
  });
  var myOptions = { icon : leafIcon};

  var layer = L.marker(bounds, myOptions);
  var icon = layer.options.icon;
  var opt=icon.options;
  icon.options.iconSize = [size,size];
  layer.setIcon(icon);
  return layer;
}

function makeLeafletMarker(bounds,cname,size) {
  var myIcon = L.divIcon({className:cname});
  var myOptions = { icon : myIcon};

  var layer = L.marker(bounds, myOptions);
  var icon = layer.options.icon;
  var opt=icon.options;
  icon.options.iconSize = [size,size];
  layer.setIcon(icon);
  return layer;
}

function makeLeafletMarker2(bounds,size) {
  
  var myAwesomeIcon = L.divIcon({
    html: '<i class="fas fa-sun fa-xs" aria-hidden="true"></i>',
    iconSize: [size, size],
    className: 'awesome-icon' 
  }); 
  var myOptions = { icon : myAwesomeIcon};
  
  var layer = L.marker(bounds, myOptions);
  var icon = layer.options.icon;
  var opt=icon.options; 
  icon.options.iconSize = [size,size];
  layer.setIcon(icon);
  return layer;
}


// icon size 8 
function addMarkerLayerGroup(latlng,description,sz) {
  var cnt=latlng.length;
  if(cnt < 1)
    return null;
  var markers=[];
  for(var i=0;i<cnt;i++) {
     var bounds = latlng[i];
     var desc = description[i];
     var cname="quake-color-historical default-point-icon";
     var marker=makeLeafletMarker(bounds,cname,sz);
     marker.bindTooltip(desc);
     markers.push(marker);
  }
  var group = new L.FeatureGroup(markers);
  mymap.addLayer(group);
  return group;
}


function switchLayer(layerString) {
    mymap.removeLayer(currentLayer);
    mymap.addLayer(baseLayers[layerString]);
    currentLayer = baseLayers[layerString];

}


