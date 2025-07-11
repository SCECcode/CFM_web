<?php
require_once("php/navigation.php");
$header = getHeader("Explorer");
require_once("php/util.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Community Fault Model Explorer</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/vendor/font-awesome.min.css">
    <link rel="stylesheet" href="css/vendor/bootstrap.min.css">
    <link rel="stylesheet" href="css/vendor/bootstrap-grid.min.css">
    <link rel="stylesheet" href="css/vendor/leaflet.awesome-markers.css">
    <link rel="stylesheet" href="css/vendor/leaflet.css">
    <link rel="stylesheet" href="css/vendor/jquery-ui.css">
    <link rel="stylesheet" href="css/vendor/glyphicons.css">
    <link rel="stylesheet" href="css/vendor/all.css">
    <link rel="stylesheet" href="css/cfm-ui.css?v=1">
    <link rel="stylesheet" href="css/sidebar.css?v=1">

    <script type="text/javascript" src="js/vendor/leaflet-src.js"></script>
    <script type='text/javascript' src='js/vendor/leaflet.awesome-markers.min.js'></script>
    <script type='text/javascript' src='js/vendor/popper.min.js'></script>
 
    <script type='text/javascript' src='js/vendor/jquery.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery.csv.js'></script>
    <script type='text/javascript' src='js/vendor/bootstrap.min.js'></script>

    <script type='text/javascript' src='js/vendor/jquery-ui.js'></script>
    <script type='text/javascript' src='js/vendor/esri-leaflet.js'></script>
    <script type='text/javascript' src='js/vendor/esri-leaflet-vector.js' crossorigin=""></script>

    <script type='text/javascript' src='js/vendor/FileSaver.js'></script>
    <script type='text/javascript' src='js/vendor/jszip.js'></script>
    <script type='text/javascript' src='js/vendor/zlib.min.js'></script>
    <script type='text/javascript' src='js/vendor/zlib-util.js'></script>
    <script type='text/javascript' src='js/vendor/gunzip.min.js'></script>
    <script type='text/javascript' src='js/vendor/unzip.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery.floatThead.js'></script>

    <script type='text/javascript' src='js/vendor/togeojson.js'></script>
    <script type='text/javascript' src='js/vendor/leaflet-kmz-src.js'></script>

    <!--
    https://leaflet.github.io/Leaflet.draw/docs/Leaflet.draw-latest.html#l-draw
    this is for including the Leaflet.draw plugin
    -->
    <link rel="stylesheet" href="plugin/Leaflet.draw/leaflet.draw.css">
    <script type='text/javascript' src="plugin/Leaflet.draw/Leaflet.draw.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/Leaflet.Draw.Event.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/Toolbar.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/Tooltip.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/GeometryUtil.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/LatLngUtil.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/LineUtil.Intersect.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/Polygon.Intersect.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/Polyline.Intersect.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/ext/TouchEvents.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/DrawToolbar.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Feature.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.SimpleShape.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Polyline.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Marker.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Circle.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.CircleMarker.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Polygon.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/draw/handler/Draw.Rectangle.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/EditToolbar.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/EditToolbar.Edit.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/EditToolbar.Delete.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/Control.Draw.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Poly.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.SimpleShape.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Rectangle.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Marker.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.CircleMarker.js"></script>
    <script type='text/javascript' src="plugin/Leaflet.draw/edit/handler/Edit.Circle.js"></script>

    <!-- cfm js -->
       <script type="text/javascript">
           const defaultModel = `<?php echo DEFAULT_DB; ?>`;
       </script>
    <script type="text/javascript" src="js/debug.js?v=1"></script>
    <script type="text/javascript" src="js/cfm_leaflet.js?v=1"></script>
    <script type="text/javascript" src="js/cfm_layer.js?v=1"></script>
    <script type="text/javascript" src="js/cfm_util.js?v=1"></script>
    <script type="text/javascript" src="js/cfm_ui.js?v=1"></script>
    <script type="text/javascript" src="js/cfm_main.js?v=1"></script>
    <script type="text/javascript" src="js/cfm_query.js?v=1"></script>
    <script type="text/javascript" src="js/cfm_sidebar.js?v=1"></script>
    <script type="text/javascript" src="js/cfm_view3d_util.js?v=1"></script>
    <script type="text/javascript" src="js/cfm_view3d.js?v=1"></script>
    <script type="text/javascript" src="js/cxm_recent_eq_util.js?v=1"></script>
    <script type="text/javascript" src="js/cxm_recent_eq.js?v=1"></script>

    <script type="text/javascript" src="js/cxm_kml.js?v=1"></script>
   
    <!-- pixi pixiOverlay -->
    <script type="text/javascript" src="js/vendor/pixi.js"></script>
    <script type="text/javascript" src="js/vendor/pixiOverlay/L.PixiOverlay.js"></script>
    <script src="js/cxm_eq_util.js"></script>
    <script src="js/cxm_eq.js"></script>
    <script src="js/cxm_pixi.js"></script>
    <script src="js/cxm_eq_pixi_util.js"></script>
    <script src="js/cxm_eq_legend.js"></script>

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-495056-12"></script>
    <script type="text/javascript">
        $ = jQuery;
        var tableLoadCompleted = false;
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }

        gtag('js', new Date());

        gtag('config', 'UA-495056-12');

        $(document).on("tableLoadCompleted", function () {
            tableLoadCompleted = true;

            var $table = $('div.cfm-table table');
            $table.floatThead({
                autoReflow: true,
                scrollContainer: function ($table) {
                    return $table.closest('div.cfm-table');
                }
            });

            var $download_queue_table = $('#metadata-table');
            $download_queue_table.floatThead({
                autoReflow: true,
                scrollContainer: function ($table) {
                    return $table.closest('div#metadata-table-container');
                },
            });

        });

    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet">
</head>
<body>
<?php echo $header ?>
<div class="container">

<div class="main" id="cfmMain">
<!-- trace dumping buttons -->
    <div style="display:none">
      <script type="text/javascript" src="js/cfm_misc_util.js?v=1"></script>
      <button id="dumpCFMGeoBtn" class="btn cfm-small-btn"  onClick="dumpActiveCFMGeo()">
                <span class="glyphicon glyphicon-share-alt"></span> Export CFM geoJson</button>
<!-- chunked latlong groups used by explorer for caching --> 
      <button id="dumpMarkerLatlngBtn" class="btn cfm-small-btn" onClick="toFileMarkerLatlng()">
                <span class="glyphicon glyphicon-share"></span> Export EQ Marker Latlng</button>
<!-- utm files used by the VTK -->
      <button id="filterSeismicityBtn" class="btn cfm-small-btn" onClick="toUTMFileAllQuakes()">
                <span class="glyphicon glyphicon-share"></span> Export EQ utm </button>
      <button id="dumpSeismicityLayerBtn" class="btn cfm-small-btn" onClick="dumpAllQuakeLayer()">
                <span class="glyphicon glyphicon-share"></span> Export EQ Geo layer</button>
    </div>

<!-- housekeeping buttons -->
    <div style="display:none">
      <input type="text" id="geo-total" value="0">
      <input type="text" id="geo-counter" value="0">
    </div>

<!-- top-intro -->
    <div id="top-intro" class="row">
        <div class="col-1 links d-none d-md-block align-self-end">
            <div>
                <a href="https://www.scec.org/about">About SCEC</a>
                <a href="https://www.scec.org/science/cem">About CEM</a>
            </div>
        </div>
<p class="col-11 intro-text">
    The <a href="https://doi.org/10.5281/zenodo.4651667">SCEC Community Fault Model (CFM)</a> includes complex, three-dimensional faults. This CFM explorer provides a simplified two-dimensional map view.  It currently supports multiple CFM versions and allows users to view and download fault geometry data without accessing the <a href="https://doi.org/10.5281/zenodo.4651667">entire CFM model</a> archive. Selected faults can be visualized in a basic 3D format using the "PLOT3D" button. For detailed instructions, refer to the  <a href="guide">user guide</a>.
</p>
    </div>

<!-- leaflet control -->
    <div class="row" style="display:none;">
        <div class="col justify-content-end custom-control-inline">
            <div style="display:none;" id="external_leaflet_control"></div>

            <button id="colorBtn" class="btn cfm-small-btn" onMouseEnter="expandColorsControl()">
                <span class="glyphicon glyphicon-star"></span></button>
            <div id="downloadSelect" class="cfm-control-download" onMouseLeave="removeDownloadControl()"></div>
        </div>
    </div>

<!-- top-control -->
    <div id="top-control">
      <div id="controls-container" class="row d-flex mb-0" style="display:" >

<div id="top-control-row-1"  class="col-12">
 <div class="row pl-4" style="display:;">
   <form id="id_select_dataset">
     <label for="dataset"> Choose CFM Model : </label>
     <label><input type="radio" id="dataset0" name=dataset data-db-name="CFM7_preferred_db">
            <span>7.0 PREFERRED</span></label>
     <label><input type="radio" id="dataset1" name=dataset data-db-name="CFM7_alt_db">
            <span>7.0 ALTERNATIVES</span></label>
     <label><input type="radio" id="dataset2" name=dataset data-db-name="CFM7_rup_db">
            <span>7.0 RUPTURES</span></label>
     <label><input type="radio" id="dataset3" name=dataset data-db-name="CFM6_preferred_db">
            <span>6.1 PREFERRED</span></label>
     <label><input type="radio" id="dataset4" name=dataset data-db-name="CFM6_alt_db">
            <span>6.1 ALTERNATIVES</span></label>
     <label><input type="radio" id="dataset5" name=dataset data-db-name="CFM6_rup_db">
            <span>6.1 RUPTURES</span></label>
     <label><input type="radio" id="dataset6" name=dataset data-db-name="CFM53_preferred_db">
            <span>5.3 PREFERRED</span></label>
   </form>

 </div>
</div>
<div id="top-control-row-2" class="col-3">
        <div class="row">
 <div class="pl-3">
<!-- RESET -->
             <div class="input-group filters" style="min-width:85%">
                <select id="search-filter-type" class="custom-select custom-select-sm">
                    <option value="dismissClick">Search by </option>
                    <option value="keywordClick">Keyword</option>
                    <option value="latlonClick">Latitude &amp; Longitude</option>
                    <option value="areaClick">Area</option>
                    <option value="zoneClick">Zone</option>
                    <option value="sectionClick">Section</option>
                    <option value="nameClick">Name</option>
                    <option disabled>-- Advanced --</option>
                    <option value="strikeClick">Average Strike</option>
                    <option value="dipClick">Average Dip</option>
                </select>
                <div class="input-group-append">
                    <button id="refreshBtn" type="button" onclick="refreshAll()" class="btn btn-dark" >Reset</button>
                </div>

                <div>
                  <button id="recordReferenceBtn" title="Record a reference fault set"
                      class="btn btn-default cfm-small-btn pl-2" style="margin-top:0.3rem;" onclick="recordActiveReference()" disabled>
                      <span class="glyphicon glyphicon-record"></span>
                  </button>
                  <button id="lastRecordedReferenceBtn" title="Refresh to last recorded reference fault set"
                      class="btn btn-default cfm-small-btn" style="padding:0rem;margin-right:0.2rem" onclick="resetLastRecordReference()" disabled>
                      <span class="fas fa-step-backward"></span>
                  </button>
                </div>
            </div>
            <div class="row">
                <div class="col input-group">
                    <ul id="sidebar" class="navigation" style="display:none">
                        <li id='area' class='navigationLi' style="display:none;">
                            <div id='areaMenu' class='menu'>
                                <div class="" id="areaList"></div>
                            </div>
                        </li>
                        <li id='zone' class='navigationLi' style="display:none">
                            <div id='zoneMenu' class='menu'>
                                <div class="" id="zoneList"></div>
                            </div>
                        </li>
                        <li id='section' class='navigationLi' style="display:none">
                            <div id='sectionMenu' class='menu'>
                                <div class="" id="sectionList"></div>
                            </div>
                        </li>
                        <li id='name' class='navigationLi' style="display:none">
                            <div id='nameMenu' class='menu'>
                                <div class="" id="nameList"></div>
                            </div>
                        </li>

			<li id='strike' class='navigationLi' style="width:600px;display:none">
                            <div id='strikeMenu' class='menu'>
                                <div class="row">
                                    <div class="col-5">
                                        <p>Select an average strike range on the slider or enter the two boundaries</p>
                                    </div>
                                    <div class="row col-5">
                                       <div class="col-5 pl-0 pr-0">
                                           <input type="text"
                                                  id="lowStrikeTxt"
                                                  title="min strike"
                                                  onfocus="this.value=''"
                                                  class="strike-item form-control">
                                       </div>
                                       <div class="col-5 pl-1 pr-0">
                                           <input type="text"
                                                  id="highStrikeTxt"
                                                  title="max strike"
                                                  onfocus="this.value=''"
                                                  class="strike-item form-control">
                                       </div>
<!--
                                       <div class="col-2 pr-0 align-items-center">
                                           <button id="strikeBtn" type="button" title="Search with strike range"
                                                   class="btn btn-default cfm-small-btn " onclick="setupSearchByStrike()">
                                               <span class="glyphicon glyphicon-search"></span>
                                           </button>
                                       </div>
-->
                                       <div class="col-10 mt-1 mb-0">
                                          <div id="slider-strike-range" style="border:2px solid black">
				          <div id="min-strike-handle" class="ui-slider-handle"></div>
				          <div id="max-strike-handle" class="ui-slider-handle"></div>
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </li>

			<li id='dip' class='navigationLi' style="width:600px;display:none">
                            <div id='dipMenu' class='menu'>
                                <div class="row">
                                    <div class="col-5">
                                        <p>Select an average dip range on the slider or enter the two boundaries</p>
                                    </div>
                                    <div class="row col-5">
                                       <div class="col-5 pl-0 pr-0">
                                           <input type="text"
                                                  id="lowDipTxt"
                                                  title="min dip"
                                                  onfocus="this.value=''"
                                                  class="dip-item form-control">
                                       </div>
                                       <div class="col-5 pl-1 pr-0">
                                           <input type="text"
                                                  id="highDipTxt"
                                                  title="max dip"
                                                  onfocus="this.value=''"
                                                  class="dip-item form-control">
                                       </div>
<!--
                                       <div class="col-2 pr-0 align-items-center">
                                           <button id="dipBtn" type="button" title="Search with an average dip range"
                                                   class="btn btn-default cfm-small-btn " onclick="setupSearchByDip()">
                                               <span class="glyphicon glyphicon-search"></span>
                                           </button>
                                       </div>
-->
                                       <div class="col-10 mt-1 mb-0">
                                          <div id="slider-dip-range" style="border:2px solid black">
				          <div id="min-dip-handle" class="ui-slider-handle"></div>
				          <div id="max-dip-handle" class="ui-slider-handle"></div>
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li id='keyword' class='navigationLi ' style="display:none">
                            <div id='keywordMenu' class='menu row justify-content-center'>
                                <div class="col-12">
                                    <div class="d-flex">
                                        <input placeholder="Enter Keyword" type="text" id="keywordTxt"
                                               class="form-control"
					       onfocus="this.value=''" 
                                               onkeypress="javascript:if (event.key == 'Enter') $('#keywordTxt').mouseout();"
                                               style=""/>
                                    </div>
                                </div>

                            </div>
                        </li>
                        <li id='latlon' class='navigationLi' style="width:600px; display:none">
                            <div id='latlonMenu' class='menu'>
                                <div class="row">
                                    <div class="col-5">
                                        <p class="mb-0">Draw a rectangle on the map or enter latitudes and longitudes.</p>
                                    </div>
                                    <div class="col-2 pl-0 pr-0">
                                        <input type="text"
                                               placeholder="Latitude"
                                               id="firstLatTxt"
                                               title="first lat"
onkeypress="javascript:if (event.key == 'Enter') $('#firstLatTxt').mouseout();"
                                               class="latlon-item form-control">
                                        <input type="text" 
                                               id="firstLonTxt" 
                                               placeholder='Longitude' 
                                               title="first lon"
onkeypress="javascript:if (event.key == 'Enter') $('#firstLonTxt').mouseout();"
                                               class="latlon-item form-control mt-1">
                                    </div>
                                    <div class="col-2 pl-1 pr-0">
                                        <input type="text"
                                               id="secondLatTxt"
                                               title="Optional Latitude"
                                               value='optional'
onkeypress="javascript:if (event.key == 'Enter') $('#secondLatTxt').mouseout();"
                                               class="latlon-item form-control">
                                        <input type="text"
                                               id="secondLonTxt"
                                               title="Optional Longitude"
                                               value='optional'
onkeypress="javascript:if (event.key == 'Enter') $('#secondLonTxt').mouseout();"
                                               class="latlon-item form-control mt-1">
                                    </div>
                                </div>
                            </div>
                        </li>
<!-- debug purpose
                          <li id='gid' class='navigationLi ' style="display:none">
                            <div id='gidMenu' class='menu'>
                              <div id='gidLabel' class='menuLabel' style="margin-left:20px;font-size:14px;font-weight:bold">Query for GEO JSON Object by object_tb_gid:<button class="pull-right" title="dismiss" onclick="gidClick()" style="border:none;background-color:transparent"><span class="glyphicon glyphicon-remove"></span>
                        </button>
                              </div>
                              <div class="">
                                   <div class="" style="margin-left:20px; margin-top:10px">

                              <div class=""> Object gid:&bsp;<input type="text" id="objGidTxt" onfocus="this.value=''" style="right-margin:10px; border:1px solid black; color:orange; text-align:center;">
                               <button id="objGidBtn" type="button" title="Search with object gid" class="btn btn-default" onclick="getGeoJSONbyObjGid()">
                                    <span class="glyphicon glyphicon-search"></span>
                               </button>
                             </div>
                                   </div>
                               </div>
                            </div>
                          </li>
-->
                    </ul> <!-- sidebar pull-out --> 
                </div>
            </div>
 </div>

</div> <!-- row --> 
        </div>

	<div class="col-9">
<div class="row" style="margin-left:0px;">

  <button id="recentEQBtn" class="btn btn-sm cfm-small-btn" onclick="toggleRecentEQMenu()">recent EQ(0)</button>
  <input type="text" id="recentEQ-counter" value="0" style="display:none">

 <div class="col-2">
<!-- XX upload KML/KMZ overlay -->
      <div class="row" style="display:">
             <input id="fileKML" type='file' multiple onchange='uploadKMLFile(this.files)' style='display:none;'></input>
             <button id="kmlBtn" class="btn" onclick='javascript:document.getElementById("fileKML").click();' title="Upload your own kml/kmz file to be displayed on the map interface. We currently support points, lines, paths, polygons, and image overlays (kmz only)." style="color:#395057;background-color:#f2f2f2;border:1px solid #ced4da;border-radius:0.2rem;padding:0.15rem 0.5rem;"><span>Upload kml/kmz</span></button>
<!--
	     <button id="toggleKMLBtn" class="btn btn-sm cfm-small-btn" title="Show/Hide uploaded kml/kmz files" onclick="toggleKML()"><span id="eye_kml"  class="glyphicon glyphicon-eye-open"></span></button>
-->
             <button id="kmlSelectBtn" class="btn cfm-small-no-btn" title="Show/Hide uploaded kml/kmz files" style="display:none;" data-toggle="modal" data-target="#modalkmlselect"><span id="eye_kml"  class="glyphicon glyphicon-eye-open"></span></button>
       </div> <!-- kml-row -->
 </div>

 <div class="col-3" style="display:;">
<!-- XX Sesimicity -->
             <div id="loadSeismicity" class="row" style="width:20rem;">
	       <button id="quakesBtn" class="btn" onClick="loadSeismicity()" title="The seismicity that is loading consists of a combination of the Hauksson et al. (2012, and updates) and Waldhauser (2009) catalogs. The catalogs have been cropped to avoid any overlap. Once loaded, you can color the relocated seismicity by depth. Significant historic earthquakes (M6+) will be shown on the map interface with red dots. If you mouse over the dots, the year and magnitude will be displayed. The significant earthquakes can be toggled on/off by clicking on the eyeball icon next to the seismicity pull down menu at the top of the map interface." style="color:#395057;background-color:#f2f2f2;border:1px solid #ced4da;border-radius:0.2rem;padding:0.15rem 0.5rem;display:;">Load relocated seismicity</button>
             </div>

             <div id="showSeismicity" class="row" style="width:20rem; display:none;">
                <select id="seismicitySelect" onchange="changePixiOverlay(this.value)"
                class="custom-select custom-select-sm" style="width:auto;min-width:14rem;">
		   <option value="none">Hide relocated seismicity</option>
                   <option selected value="haukssondepth">Color seismicity by depth</option>
<!--
                   <option value="haukssonmag">Color seismicity by magnitude</option>
                   <option value="haukssontime">Color seismicity by time</option>
-->
                </select>
                <button id="toggleSignificantBtn" class="btn btn-sm cfm-small-btn" title="Show/Hide significant historic earthquakes (M6+) since 1900" onclick="toggleSignificant()"><span id="eye_significant" class="glyphicon glyphicon-eye-open"></span></button>
             </div>
 </div>


 <div class="col-6">
<!-- XX Map Select -->
	    <div class="input-group input-group-sm cfm-input-group" id="map-controls">
                <div class="input-group-prepend" title="Change the basemap imagery"">
                    <label class="input-group-text" for="mapLayer">Select Map Type</label>
                </div>
                <select id="mapLayer" class="custom-select custom-select-sm" style="width:auto;min-width:14rem;"
onchange="switchLayer(this.value);">
                  <option selected value="esri topo">ESRI Topographic</option>
                  <option value="esri imagery">ESRI Imagery</option>
                  <option value="jawg light">Jawg Light</option>
                  <option value="jawg dark">Jawg Dark</option>
                  <option value="osm streets relief">OSM Streets Relief</option>
                  <option value="otm topo">OTM Topographic</option>
                  <option value="osm street">OSM Street</option>
                  <option value="esri terrain">ESRI Terrain</option>
<!--
                  <option value="cybershake">Cybershake</option>
                  <option value="v3 etree">V3 Etree</option>
-->
                </select>
            </div>

<!--
            <div class="input-group input-group-sm ml-md-2 ml-sm-0">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="highlight-faults">Highlight Faults By</label>
                </div>
                <select id="highlight-faults" class="custom-select custom-select-sm"
                        onchange="changeFaultColor(this.value);">
                    <option value="">Default</option>
                    <option value="strike">Strike</option>
                    <option value="dip">Dip</option>
                </select>
            </div>
-->
 </div>
</div> <!-- row -->
        </div>
  </div> <!-- control-container -->
</div> <!-- top-control -->


    <div id="mapDataBig" class="row mapData mt-1">
        <ul class="navigation col-5 mb-0" style="margin-top:0px">       
          <li id="infoData" class='navigationLi' style="display:;">
  	    <div id="infoDataMenu" class="col-12 button-container d-flex flex-column pr-1" style="overflow:hidden">
                <div id="searchResult" style="overflow:hidden; display:" class="mb-1"></div>
                <div id="geoSearchByObjGidResult" style="display:none"></div>
                <div id="phpResponseTxt"></div>
            </div>
          </li>
          <li id='recentEQ' class='navigationLi ml-3 mr-2' style="display:none;background:whitesmoke;border:0px solid green">
              <div id='recentEQMenu' class='menu'>

                  <div class="row">
                      <div class="col-12 mt-3">
			  <p style="text-align:center;font-size:15px"><b style="font-size:22px">Search Recent Earthquakes</b>
                        <br>Data from USGS ComCat. Results are limited to 20K events</p>
                      </div>
                  </div>

                  <div class="row d-flex">
                      <div class="col-5 pr-0 ml-2">
                          <p class="mb-1"><b style="font-size:15px">Magnitude</b></p>
			  <input type="radio" id="twoFivePlusMagnitude" name="magnitude" 
			      value="2.5" onclick="setNmagnitude(this.value);"> <label for="html">2.5+</label><br>
			  <input type="radio" id="fourFivePlusMagnitude" name="magnitude" 
                              value="4.5" onclick="setNmagnitude(this.value);"> <label for="html">4.5+</label><br>
			  <input type="radio" id="customMagnitude" name="magnitude"
                              value="custom" onclick="setNmagnitude(6);"> <label for="html">custom</label><br>
                          <input type="text"
                                 id="minMagnitudeTxt" 
                                 placeholder='Min Magnitude'
                                 title="min magnitude"
                                 onfocus="this.value=''" 
                                 class="form-control">

                          <input type="text"
                                 id="maxMagnitudeTxt"
                                 title="max Magnitude"
                                 placeholder='Max Magnitude'
                                 onfocus="this.value=''"
                                 class="form-control mt-1">
                      </div>
                      <div class="col-5 pr-0">
                          <p class="mb-1"><b style="font-size:15px">Date & Time</b></p>
			  <input type="radio" id="past7Days" name="durationTime" 
                                 value="7" onclick="setNdays(this.value);">
                          <label for="html">Past 7 Days</label><br>
			  <input type="radio" id="past30Days" name="durationTime" 
                                 value="30" onclick="setNdays(this.value);">
                          <label for="html">Past 30 Days</label><br>
			  <input type="radio" id="customDuration" name="durationTime" 
                                 value="custom" onclick="setNdays(10);">
                          <label for="html">custom</label><br>
                          <input type="text"
                                 placeholder="Start Time (UTC)"
                                 id="startTimeTxt"
                                 title="start Time"
                                 onfocus="this.value=''"
                                 class="form-control">
                          <input type="text"
                                 id="endTimeTxt"
                                 title="end Time"
                                 placeholder="End Time (UTC)"
                                 onfocus="this.value=''"
                                 class="form-control mt-1">
                      </div>
                  </div>
                     
                  <div class="row mt-3">
                      <div class="col-12">
			  <p class="ml-2" style="margin-bottom:5px"><b style="font-size:15px">Geographic Region</b><button id="markerBtn" class="btn cfm-small-btn ml-2" style="color:red"><span class="glyphicon glyphicon-pencil"></span></button><br>Draw a rectangle (click and drag) on the map or enter coordinates below</p>
                      </div>
                  </div>

                  <div class="row d-flex ">
                      <div class="col-5 pr-0 ml-2">
                          <input type="text"
                                 id="recentEQFirstLonTxt" 
                                 placeholder='Begin Longitude'
                                 title="first lon"
                                 onfocus="this.value=''" 
                                 class="form-control">
                          <input type="text"
                                 id="recentEQSecondLonTxt"
                                 title="second lon"
                                 placeholder='End Longitude'
                                 onfocus="this.value=''"
                                 class="form-control mt-1">
                          <input type="text"
                                 id="recentEQMinZTxt"
                                 placeholder="Min Depth (m)"
                                 title="recentEQMinZTxt"
                                 onfocus="this.value=''"
                                 class="form-control mt-1">
                      </div>
                      <div class="col-5 pr-0">
                          <input type="text"
                                 placeholder="Begin Latitude"
                                 id="recentEQFirstLatTxt"
                                 title="first lat"
                                 onfocus="this.value=''"
                                 class="form-control">
                          <input type="text"
                                 id="recentEQSecondLatTxt"
                                 title="second lat"
                                 placeholder='End Latitude'
                                 onfocus="this.value=''"
                                 class="form-control mt-1">
                          <input type="text"
				 id="recentEQMaxZTxt"
				 placeholder="Max Depth (m)"
                                 title="recentEQMaxZTxt"
                                 onfocus="this.value=''"
                                 class="form-control mt-1">
                      </div>
                  </div>
                  <div class="row d-flex mt-1">
                      <div class="col-5 pr-0 ml-2">
                          <div class="col-12" style="padding:5px 0px 10px 0px">
                              <button id="recentEQResetBtn" class="btn btn-dark" 
	                      onclick="recentEQReset()" style="width:100%;border-radius:0.25rem;padding:0.375rem 0.75rem">Reset All</button>
                          </div>
                      </div>
                      <div class="col-5 pr-0">
                          <div class="col-12" style="padding:5px 0px 10px 0px">
			      <button id="recentEqExtractDataBtn" class="btn btn-dark" 
                              onclick="recentEQExtractData()" style="width:100%;border-radius:0.25rem;padding:0.375rem 0.75rem">Extract Data</button>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="row">
                  <div class="col-12">
		      <p class="ml-2" style="margin-bottom:5px"><b>Extracted data will be visible on the 2D and Plot3D options.</b></p>
                  </div>
              </div>
              <div class="row">
                  <div class="col-12">
		      <p class="ml-2 mr-4" style="margin-right: 10px" >Data courtesy of: U.S. Geological Survey, Earthquake Hazards Program, 2017. Advanced National Seismic System (ANSS) Comprehensive Catalog of Earthquake Events and Products: Various, <a href="https://doi.org/10.5066/F7MS3QZH">https://doi.org/10.5066/F7MS3QZH</a></p>

                  </div>
              </div>
          </li>
        </ul>
        <div id="top-map" class="col-7 pl-0">
            <div class="w-100 mb-1" id='CFM_plot'
		 style="position:relative;border:solid 1px #ced4da; height:576px;">

<!-- spinner -->
               <div class="spinDialog" style="position:absolute;top:40%;left:50%; z-index:9999;">
                 <div id="cfm-wait-spin" align="center" style="display:none;"><i class="glyphicon glyphicon-cog fa-spin" style="color:red"></i></div>
               </div>

<!-- legend -->
               <div id="mylegend" class="main-legend geometry top center" style="bottom:10%;background-color: rgba(255,255,255,0.6);display:none">
                 <div class="col">
                    <div class="row" style="margin:0px 2px 0px -16px">
                      <div class="legend mt-2" id="pixi-legend-color"></div>
                      <div class="legend" id="pixi-legend-label"></div>
                    </div>
                    <div id="pixi-legend-title" align="center" class="legend content mt-1" style="border-top:2px solid grey">Depth(km)</div>
                 </div>
	       </div> <!--legend -->
            </div>
        </div> <!-- top-map -->
    </div>
    <div id="top-select" class="row mb-2">
      <div class="col-12">
        <div id="metadata-table-container" style="border:solid 1px #ced4da;overflow-x:hidden">
            <table id="metadata-table">
                <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th class="hoverColor" onClick="sortMetadataTableByRow(1,'a')">Fault<span id='sortCol_1' class="fas fa-angle-down"></span></th>
                    <th class="hoverColor" onClick="sortMetadataTableByRow(2,'a')">Area<span id='sortCol_2' class="fas fa-angle-down"></span></th>
                    <th class="hoverColor" onClick="sortMetadataTableByRow(3,'a')">Zone<span id='sortCol_3' class="fas fa-angle-down"></span></th>
                    <th class="hoverColor" onClick="sortMetadataTableByRow(4,'a')">Section<span id='sortCol_4' class="fas fa-angle-down"></span></th>
                    <th class="hoverColor" onClick="sortMetadataTableByRow(5,'a')">Last<br>Update<span id='sortCol_5' class="fas fa-angle-down"></span></th>
		    <th class="hoverColor" onClick="sortMetadataTableByRow(6,'n')" title="The average strike values represent weighted average orientations of each fault object in 3D and may be misleading for multi-segment or significantly nonplanar faults.">Avg<br>Strike<span id='sortCol_6' class="fas fa-angle-down"></span></th>
                    <th class="hoverColor" onClick="sortMetadataTableByRow(7,'n')" title="The average dip values represent weighted average orientations of each fault object in 3D and may be misleading for multi-segment or significantly nonplanar faults.">Avg<br>Dip<span id='sortCol_7' class="fas fa-angle-down"></span></th>
                    <th class="hoverColor" onClick="sortMetadataTableByRow(8,'n')">Area<br>(km<sup>2</sup>)<span id='sortCol_8' class="fas fa-angle-down"></span></th>
                    <th><div class="row" style="display:flex; justify-content:center;">
			    <div class="btn-group download-now">
                                <button id="plot3d-all" type="button" title="Plots the selected faults in an interactive 3D environment" class="btn btn-dark dropdown-toggle" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false" disabled>
                                    Plot3d<span id="plot-counter"></span>
                                </button>
				<div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button" value="native"
                                            onclick="executePlot3d(this.value);">Native
                                    </button>
                                    <button class="dropdown-item" type="button" value="500m"
                                            onclick="executePlot3d(this.value);">500m
                                    </button>
                                    <button class="dropdown-item" type="button" value="1000m"
                                            onclick="executePlot3d(this.value);">1000m
                                    </button>
                                    <button class="dropdown-item" type="button" value="2000m"
                                            onclick="executePlot3d(this.value);">2000m
                                    </button>
<!--
                                    <button class="dropdown-item" type="button" value="all"
                                          onclick="executePlot3d(this.value);">All of the Above
                                    </button>
-->
                                </div>
                            </div>
                            &nbsp
			    <div class="btn-group download-now">
                                <button id="download-all" type="button" title="Download options for the selected fault objects" class="btn btn-dark dropdown-toggle" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false" disabled>
                                    Download<span id="download-counter"></span>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <button class="dropdown-item" type="button" value="meta"
                                            onclick="executeDownload(this.value);">Metadata
                                    </button>
                                    <button class="dropdown-item" type="button" value="native"
                                            onclick="executeDownload(this.value);">Native + Metadata
                                    </button>
                                    <button class="dropdown-item" type="button" value="500m"
                                            onclick="executeDownload(this.value);">500m + Metadata
                                    </button>
                                    <button class="dropdown-item" type="button" value="1000m"
                                            onclick="executeDownload(this.value);">1000m + Metadata
                                    </button>
                                    <button class="dropdown-item" type="button" value="2000m"
                                            onclick="executeDownload(this.value);">2000m + Metadata
                                    </button>
                                    <button class="dropdown-item" type="button" value="all"
                                          onclick="executeDownload(this.value);">All of the Above
                                    </button>
                                </div>
                            </div>
                            &nbsp
<!--  THESE buttons was used for CFM fault review -->
<!-- For IMPORT server ts files 
                            <button id="externalBtn" class="btn btn-sm" style="background:transparent;" data-toggle="modal" data-target="#modalexternal">
                                    <span class="fas fa-caret-up"></span>
                            </button>
-->
<!-- For IMPORT local ts files, 
<input class="form-control" id='fileBtn' type='file' onchange='setExternalTSFile(this.files)' style='display:none;'></input> 
<button class="btn cfm-small-btn" onClick='javascript:document.getElementById("fileBtn").click();'><span class="fas fa-caret-up"></span></button>
-->
                        </div> 
</th>
                </tr>
                </thead>
                <tbody>
                <tr id="placeholder-row">
<!--- altered from 11 -->
                    <td colspan="10">Metadata for selected faults will appear here. </td>
                </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div> <!-- top-select -->
</div>

<div id='queryBlock' class="col-6" style="overflow:hidden;display:;"> </div> <!-- query block -->

<div id="dip-strike-key-container" style="display:none;">
    <div id="dip-strike-key" class="row" style="opacity:0.8">
        <div class="col text-left" style="width:110px;height:24px;">
           <span class="min"></span>
           <span class="ui-slider-range" style="border:1px solid grey; width:60px;height:20px;"></span>
           <span class="max"></span>
        </div>
    </div>
</div> 

<div id="expand-view-key-container" style="display:none;">
  <div id="expand-view-key" class="row" style="opacity:0.8; height:1.4rem;">
    <button id="bigMapBtn" class="btn cfm-small-btn" title="Expand into a larger map" style="color:black;padding: 0rem 0.3rem 0rem 0.3rem" onclick="toggleBigMap()"><span class="fas fa-expand"></span>
    </button>
  </div>
</div> 



<!--Modal: Model (modal3D)-->
<div class="modal" id="modal3D" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="modal3D" aria-hidden="true">
  <div class="modal-dialog modal-full" id="modal3DDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modal3DContent">
      <!--Header-->
      <div class="modal-header">
        <!-- Park instance Data here --> 
        <button id="view3DToggleReprbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleRepr3Dview()">Show Wireframe</button>
        <button id="view3DToggleQuakebtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleQuake3Dview()">No EQ</button>
        <button id="view3DToggleTracebtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleTrace3Dview()">Hide Traces</button>
        <button id="view3DToggleShorebtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleShore3Dview()">Hide Coastline</button>
        <button id="view3DToggleBoundsbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleBounds3Dview()">Show Bounds</button>
        <button id="view3DToggleLegendbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleLegend3Dview()">Hide Legend</button>
        <button id="view3DToggleNorthbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleNorth3Dview()">Show Mapview</button>
	<button id="view3DClosebtn" class="btn btn-sm" type="button" style="background-color:transparent" onclick="close3Dview()"><span class="glyphicon glyphicon-remove"></span></button>
      </div>

      <!--Body-->
      <div class="modal-body" id="modal3DBody">
        <div id="iframe-container" class="row col-12" style="overflow:hidden">
          <iframe id="view3DIfram" title="SCEC CFM 3D viewer" src="" onload="setIframHeight(this.id)" height="10" width="100%" allowfullscreen></iframe>
        </div>
        <div id="params3D" value="" style="display:none"></div>
        <div id="params3Dshare" value="" style="display:none"></div>
      </div>

      <div class="modal-footer justify-content-center" id="modal3DFooter">

        <div class="spinDialog" style="position:absolute;top:40%;left:50%; z-index:9999;">
          <div id="spinIconFor3D" align="center" style="display:none;"><i class="glyphicon glyphicon-cog fa-spin" style="color:red"></i></div>
        </div>
<!--
        <button id="view3DClosebtn" class="btn btn-outline-primary btn-sm" data-dismiss="modal" onclick="close3Dview()">Close</button>
-->
        <button id="view3DExpandbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleExpand3Dview()">Shrink</button>
        <button id="view3DRefreshbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="refresh3Dview()">Reset</button>
        <button id="view3DMovebtn" class="btn btn-outline-primary btn-sm" type="button" onclick="move3Dview()">New Window</button>
        <button id="view3DWarnbtn" class="btn btn-outline-primary btn-sm" style="display:none" data-toggle="modal" data-target="#modalwarn3d"></button>
        <button id="view3DSavebtn" class="btn btn-outline-primary btn-sm" type="button" onclick="save3Dview()">Save Image</button>
        <button id="view3DSharebtn" class="btn btn-outline-primary btn-sm" onclick="share3Dview()">Copy Link</button>
        <button id="view3DHelpbtn" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#modalinfo3d" onclick="$('#modal3D').modal('hide');">Help</button>
      </div> <!-- footer -->

    </div> <!--Content-->
  </div>
</div> <!--Modal: modal3D-->

<!--Modal: Model (modalwaiteq)-->
<div class="modal" id="modalwaiteq" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style="width:45%" id="modalwaiteqDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalwaiteqContent">
      <!--Body-->
      <div class="modal-body" id="modalwaiteqBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden; font-size:10pt">
           <div class="row">
           <p id="modalwaiteqLabel" style="text-align:center;font-size:25px"> Retrieving relocated seismicity datasets
                <div class="row" style="display:none" >

                <input type="text" style="margin-left:50px;width:100px;" id="eq-total" value="0">
                <input type="text" style="width:100px;margin-right:50px;" id="eq-expected" value="0">
                </div>
                <input type="text" style="text-align:center;width:60px;margin-right:50px;margin-left:20px;padding:0px" id="eq-progress" value="0%" disabled>
                <div class="row" id="myProgress" style="border:2px solid grey"><div id="myProgressBar"></div>
                </div>
           </p>
           </div>
           <div class="row mt-2" style="border:0px solid blue">
             <p id="modalwaiteqLabel2" style="text-align:center;font-size:10px; margin-left:3px; margin-right:6px; border:0px solid red">Please wait:  with ~1600k events, this may take a few minutes. If earthquakes are not displayed after loading, please click and drag the map or zoom in/out.</p>
<div>
	     <p style="font-size:14px; text-align:left;border:0px solid green;margin-left:3px;margin-right:6px">The seismicity that is loading consists of a combination of the Hauksson et al. (2012, and updates) and Waldhauser (2009) catalogs. The catalogs have been cropped to avoid any overlap. Once loaded, you can color the relocated seismicity by depth. Significant historic earthquakes (M6+) will be shown on the map interface with red dots.&nbsp;&nbsp;If you mouse over the dots, the year and magnitude will be displayed. The significant earthquakes can be toggled on/off by clicking on the eyeball icon next to the seismicity pull down menu at the top of the map interface.<br><br>
The Hauksson et al. (2012) catalogs are available <a href="https://scedc.caltech.edu/data/alt-2011-dd-hauksson-yang-shearer.html">here</a>.<br>
The Waldhauser (2009) catalogs are available <a href="https://nocaldd.ldeo.columbia.edu/">here</a>.</p>
</div>
           </div>
        </div>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: modalwaiteq-->

<!--Modal: Model (modalwaitpixi) -->
<div class="modal" id="modalwaitpixi" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" id="modalwaitpixiDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalwaitpixiContent">
      <!--Body-->
      <div class="modal-body" id="modalwaitpixiBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden; font-size:10pt">
           <p style="font-size:25px">Please wait for the EQ layer to be made &nbsp;
                <i class="glyphicon glyphicon-cog fa-spin" style='color:#990000'></i>
           </p>
        </div>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: modalwaitpixi-->

<!--Modal: Model (modalwait) -->
<div class="modal" id="modalwait" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" id="modalwaitDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalwaitContent">
      <!--Body-->
      <div class="modal-body" id="modalwaitBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden; font-size:10pt">
           <p style="font-size:25px">Please wait for the model to load &nbsp;
                <i class="glyphicon glyphicon-cog fa-spin" style='color:#C22B48'></i>
           </p>
        </div>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: modalwait-->

<!--Modal: Model (modalwaitrecenteq) -->
<div class="modal" id="modalwaitrecenteq" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" id="modalwaitrecenteqDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalwaitrecenteqContent">
      <!--Body-->
      <div class="modal-body" id="modalwaitrecenteqBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden; font-size:10pt">
           <p style="font-size:25px">Please wait for the recent earthquake to load &nbsp;
                <i class="glyphicon glyphicon-cog fa-spin" style='color:#C22B48'></i>
           </p>
        </div>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: modalwaitrecenteq-->

<!--Modal: Model (modalwarn3d) -->
<div class="modal" id="modalwarn3d" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" id="modalwarn3dDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalwarn3dContent">
      <!--Body-->
      <div class="modal-body" id="modalwarn3dBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">
          <div class="col-12" id="warn3dTable-container"></div>
        </div>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-outline-primary btn-md" data-dismiss="modal">Close</button>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: modalwarn3d-->

<!--Modal: Model (modalinfo3d) -->
<div class="modal" id="modalinfo3d" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xlg" id="modalinfo3dDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalinfo3dContent">
      <!--Body-->
      <div class="modal-body" id="modalinfo3dBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">
          <div class="col-12" id="info3dTable-container"></div>
        </div>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-outline-primary btn-md" data-dismiss="modal" onclick="$('#modal3D').modal('show');"
>Close</button>
      </div>
    </div> <!--Content-->
  </div>
</div> <!--Modal: modalinfo3d-->

<!--Modal: Model(modalshare) -->
<div class="modal" id="modalshare" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg" id="modalshareDialog" role="document">
    <!--Content-->
    <div class="modal-content" id="modalshareContent">
      <!--Body-->
      <div class="modal-body" id="modalshareBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">
          <div class="col-12" style="font-size:14pt">
	    <h4>Copy-and-Paste below command to share : 
<!--
&nbsp;&nbsp;
<button id="toClip" class="btn cfm-small-btn"  onClick="toClipBoard()">
<span class="glyphicon glyphicon-share-alt"></span></button>
-->
<br>
<br>
</h4>
            <p id="shareLink-container">...A LINK...</p>
          </div>
        </div>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-outline-primary btn-md" data-dismiss="modal">Close</button>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: modalshare-->

<!--Modal: Model(modalinotify) -->
<div class="modal" id="modalnotify" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-small" id="modalnotifyDialog" role="document">
    <!--Content-->
    <div class="modal-content" id="modalnotifyContent">
      <!--Body-->
      <div class="modal-body" id="modalnotifyBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">
          <div class="col-12" style="font-size:14pt">
            <p id="notify-container">blah blah</p>
          </div>
        </div>
      </div>
    </div> <!--Content-->
  </div>
</div> <!--Modal: modalnotify-->

<!--Modal: Model (modalexternal) -->
<div class="modal" id="modalexternal" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-small" id="modalexternalDialog" role="document">
    <!--Content-->
    <div class="modal-content" id="modalexternalContent">
      <!--Body-->
      <div class="modal-body" id="modalexternalBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden">
          <div class="row col-md-12 ml-0" style="font-size:14pt;">
            <div id='externalTSList'></div>
            <div class="col">
              <button class="btn cfm-small-btn pull-right" title="Disable Evaluation Mode color schema" onclick="disableEvalColorMode()"><span class="fas fa-caret-up" id="evalBtn"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-outline-primary btn-md" data-dismiss="modal">Close</button>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: modalexternal-->




<!--Modal: Model (modalkmlselect) -->
<div class="modal" id="modalkmlselect" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-small" id="modalkmlselectDialog" role="document">

    <!--Content-->
    <div class="modal-content" id="modalkmlselectContent">
      <!--Body-->
      <div class="modal-body" id="modalkmlselectBody">
        <div class="row col-md-12 ml-auto" style="overflow:hidden;">
          <div class="col-12" id="kmlselectTable-container" style="font-size:14pt"></div>
        </div>
      </div>
      <div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-outline-primary btn-md" data-dismiss="modal">Close</button>
      </div>

    </div> <!--Content-->
  </div>
</div> <!--Modal: modalkmlselect-->


</div>
</body>
</html>
