<?php
require_once("php/navigation.php");
$header = getHeader("Viewer");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Community Fault Model Viewer (Provisional)</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="css/vendor/leaflet.css">
    <link rel="stylesheet" href="css/vendor/bootstrap.min.css">
    <link rel="stylesheet" href="css/vendor/bootstrap-grid.min.css">
    <link rel="stylesheet" href="css/vendor/jquery-ui.css">
    <link rel="stylesheet" href="css/vendor/glyphicons.css">
    <link rel="stylesheet" href="css/vendor/font-awesome.min.css">
    <link rel="stylesheet" href="css/cfm-ui.css?v=1">
    <link rel="stylesheet" href="css/sidebar.css?v=1">

    <script type='text/javascript' src='js/vendor/popper.min.js'></script>
<script>L_PREFER_CANVAS = true;</script>
    <script type="text/javascript" src="js/vendor/leaflet-src.js"></script>
    <script type='text/javascript' src='js/vendor/jquery.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery.csv.js'></script>
    <script type='text/javascript' src='js/vendor/bootstrap.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery-ui.js'></script>
    <script type='text/javascript' src='js/vendor/ersi-leaflet.js'></script>
    <script type='text/javascript' src='js/vendor/FileSaver.js'></script>
    <script type='text/javascript' src='js/vendor/jszip.js'></script>
    <script type='text/javascript' src='js/vendor/jquery.floatThead.min.js'></script>

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
                scrollContainer: function ($table) {
                    return $table.closest('div.cfm-table');
                }
            });

            var $download_queue_table = $('#metadata-viewer');
            $download_queue_table.floatThead({
                scrollContainer: function ($table) {
                    return $table.closest('div#metadata-viewer-container');
                },
            });

        });

    </script>
</head>
<body>
<?php echo $header; ?>

<div class="container">

<div class="main">

    <div class="spinDialog" style="position:absolute;top:40%;left:50%; z-index:9999;">
        <div id="spinIconFor2D" align="center" style="display:none;"><i class="glyphicon glyphicon-cog fa-spin" style="color:red"></i></div>
    </div>

    <div class="row">
        <div class="col-12">
<p>The faults of the <a href="https://www.scec.org/research/cfm">SCEC Community Fault Model (CFM)</a> are three-dimensional and non-planar; however, to simplify browsing the model, the viewer below provides a two-dimensional map-based view of the SCEC CFM version 5.3 preferred fault set. The alternative fault representations are only provided in the complete CFM archive available for download on the <a href="https://www.scec.org/research/cfm">CFM homepage</a>. Here, the viewer allows users to view and download fault geometry data as well as metadata for selected faults rather than downloading the entire CFM model archive. Once faults are selected, the “PLOT3D” button can be used to view the selected faults in a basic CAD-like environment. This site is currently in beta testing. See the user guide for more details and site usage instructions.</p>
        </div>
    </div>

    <div class="row" style="display:none;">
        <div class="col justify-content-end custom-control-inline">
            <div style="display:none;" id="external_leaflet_control"></div>
            <button id="colorBtn" class="btn cfm-top-small-btn" onMouseEnter="expandColorsControl()">
                <span class="glyphicon glyphicon-star"></span></button>
            <div id="colorSelect" class="cfm-control-colors" onMouseLeave="removeColorsControl()"></div>

            <button id="toggleBtn" class="btn cfm-top-small-btn" title="toggle to display all faults"
                    onclick="toggleAll()">
                <span class="glyphicon glyphicon-adjust"></span></button>

            <button id="refreshBtn" class="btn cfm-top-small-btn" title="refresh to initial state"
                    onclick="refreshAll();">
                <span class="glyphicon glyphicon-refresh"></span></button>

            <button id="basketBtn" class="btn cfm-top-small-btn" title="download selected faults metadata"
                    onMouseEnter="expandDownloadControl()">
                <span class="glyphicon glyphicon-download-alt"></span></button>
            <div id="itemCount"></div>
            <div id="downloadSelect" class="cfm-control-download" onMouseLeave="removeDownloadControl()"></div>
        </div>
    </div>

    <div id="controls-container" class="row d-flex mb-1">
        <div class="col-6 mb-2">
             <div class="input-group filters">
                <select id="search-type" class="custom-select">
                    <option value="dismissClick">Search by ...</option>
                    <option value="keywordClick">Keyword</option>
                    <option value="latlonClick">Latitude &amp; Longitude</option>
                    <option disabled>-- Advanced --</option>
                    <option value="areaClick">Area</option>
                    <option value="zoneClick">Zone</option>
                    <option value="sectionClick">Section</option>
                    <option value="nameClick">Name</option>
<!-- WAIT for better strike/dip 
                    <option value="strikeClick">Strike</option>
                    <option value="dipClick">Dip</option>
-->
                </select>
                <div class="input-group-append">
                    <button onclick="refreshAll();" class="btn btn-dark pl-4 pr-4" type="button">Reset</button>
                </div>
            </div>
            <div class="row" style="margin-bottom:-10px;">
                <div class="col input-group">
                    <ul id="sidebar" class="navigation" style="display:none">
                        <li id='area' class='navigationLi ' style="display:none;">
                            <div id='areaMenu' class='menu'>
                                <div class="">
                                    <div class="" style="">

                                        <div class="" id="areaList"></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li id='zone' class='navigationLi ' style="display:none">
                            <div id='zoneMenu' class='menu'>
                                <div class="">
                                    <div class="" style="">

                                        <div class="" id="zoneList"></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li id='section' class='navigationLi ' style="display:none">
                            <div id='sectionMenu' class='menu'>
                                <div class="">
                                    <div class="" style="">

                                        <div class="" id="sectionList"></div>

                                    </div>
                                </div>
                            </div>
                        </li>
                        <li id='name' class='navigationLi ' style="display:none">
                            <div id='nameMenu' class='menu'>
                                <div class="">
                                    <div class="" style="">

                                        <div class="" id="nameList"></div>

                                    </div>
                                </div>
                            </div>
                        </li>

                        <li id='strike' class='navigationLi ' style="display:none">
                            <div id='strikeMenu' class='menu'>
                                <div class="">
                                    <div class="" style="">
                                        <div class="" id="strikeRange"
                                             style="padding-left:10px; padding-right:10px; overflow:hidden;"></div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li id='dip' class='navigationLi ' style="display:none">
                            <div id='dipMenu' class='menu'>
                                <div class="">
                                    <div class="" style="">
                                        <div class="" id="dipRange"
                                             style="padding-left:10px; padding-right:10px; overflow:hidden;"></div>
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
                                               onfocus="this.value=''" style=""/>
                                        <button id="keywordBtn" type="button" title="search with keyword"
                                                class="btn btn-default cfm-small-btn" onclick="searchByKeyword()">
                                            <span class="glyphicon glyphicon-search"></span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </li>
<!-- XXX -->
                        <li id='latlon' class='navigationLi' style="width:600px; display:none">
                            <div id='latlonMenu' class='menu'>
                                <div class="row">
                                    <div class="col-5">
                                        <p>Draw a rectangle on the map or enter latitudes and longitudes.</p>
                                    </div>
                                    <div class="col-2 pl-0 pr-0">
                                        <input type="text"
                                               placeholder="Latitude"
                                               id="firstLatTxt"
                                               title="first lat"
                                               onfocus="this.value=''"
                                               class="form-control">
                                        <input type="text" 
                                               id="firstLonTxt" 
                                               placeholder='Longitude' 
                                               title="first lon"
                                               onfocus="this.value=''" 
                                               class="form-control mt-1">
                                    </div>
                                    <div class="col-2 pl-1 pr-0">
                                        <input type="text"
                                               id="secondLatTxt"
                                               title="optional second lat"
                                               value='optional'
                                               onfocus="this.value=''"
                                               class="form-control">
                                        <input type="text"
                                               id="secondLonTxt"
                                               title="optional second lon"
                                               value='optional'
                                               onfocus="this.value=''"
                                               class="form-control mt-1">
                                    </div>
                                    <div class="col-1 pr-0 align-items-center">
                                        <button id="latlonBtn" type="button" title="search with latlon"
                                                class="btn btn-default cfm-small-btn " onclick="searchByLatlon(0)">
                                            <span class="glyphicon glyphicon-search"></span>
                                        </button>
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
                               <button id="objGidBtn" type="button" title="search with object gid" class="btn btn-default" onclick="getGeoJSONbyObjGid()">
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
        <div class="col-6 d-flex justify-content-end">
            <div class="input-group input-group-sm cfm-input-group mt-2" id="map-controls">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="mapLayer">Select Map Type</label>
                </div>
                <select id="mapLayer" class="custom-select custom-select-sm" style="width:auto;" onchange="switchLayer(this.value);">
                    <option selected value="esri topo">ESRI Topographic</option>
                    <option value="esri NG">ESRI National Geographic</option>
                    <option value="esri imagery">ESRI Imagery</option>
                    <option value="otm topo">OTM Topographic</option>
                    <option value="osm street">OSM Street</option>
                </select>
           </div>

<!-- WAIT for better dip/strike data
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
    </div>


    <div class="row mapData">
        <div class="col-5 button-container d-flex flex-column" style="overflow:hidden;">
            <div id="searchResult" style="overflow:hidden;" class="mb-1">
            </div>
            <div id="geoSearchByObjGidResult" style="display:none"></div>
            <div id="phpResponseTxt"></div>
        </div>
        <div class="col-7 pr-0 pl-2 ">
            <div class="row w-100 mb-1" id='CFM_plot'
                 style="position:relative;border:solid 1px #ced4da; height:576px;"></div>


        </div>
    </div>
    <div class="row">
        <div class="col-12" id="metadata-viewer-container">
            <table id="metadata-viewer">
                <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>Fault</th>
                    <th>Area</th>
                    <th>Zone</th>
                    <th>Section</th>
                    <th>Update</th>
                    <th>Strike</th>
                    <th>Dip</th>
                    <th>Area(km<sup>2</sup>)</th>
                    <th><div class="col text-center">
                            <div class="btn-group download-now">
<!-- MODAL popup button, reuse download-counter -->
                                <button id="plot3d-all" type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false" disabled>
                                    Plot3d <span id="plot-counter"></span>
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
                            &nbsp; &nbsp;
                            <div class="btn-group download-now">
                                <button id="download-all" type="button" class="btn btn-dark dropdown-toggle" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false" disabled>
                                    Download All <span id="download-counter"></span>
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
                        </div></th>
                </tr>
                </thead>
                <tbody>
                <tr id="placeholder-row">
                    <td colspan="11">Metadata for selected faults will appear here. </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="row">&nbsp;</div>
<div id='queryBlock' class="col-6" style="overflow:hidden;display:;"> </div> <!-- query block -->

<div id="dip-strike-key-container" style="display:none;">
    <div id="dip-strike-key" class="row">
        <div class="col text-right">
		<span class="min"></span><span class="ui-slider-range" style="width: 200px;">&nbsp;</span><span class="max"></span>
        </div>
    </div>
</div>

<!--Modal: Name-->
<div class="modal" id="modal3D" tabindex="-1" style="z-index:9999" role="dialog" aria-labelledby="modal3D" aria-hidden="true">
  <div class="modal-dialog modal-xlg full_modal-dialog" id="modal3DDialog" role="document">

    <!--Content-->
    <div class="modal-content full_modal-content" id="modal3DContent">
      <!--Header-->
      <div class="modal-header">
        <button id="view3DToggleReprbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleRepr3Dview(this)">Show Wireframe</button>
        <button id="view3DToggleTracebtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleTrace3Dview(this)">Hide Traces</button>
        <button id="view3DToggleShorebtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleShore3Dview(this)">Hide Coastline</button>
        <button id="view3DToggleBoundsbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleBounds3Dview(this)">Show Bounds</button>
        <button id="view3DToggleLegendbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleLegend3Dview(this)">Hide Legend</button>
        <button id="view3DToggleNorthbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleNorth3Dview(this)">Show Mapview</button>
      </div>

      <!--Body-->
      <div class="modal-body" id="modal3DBody">
        <div id="iframe-container" class="row col-12" style="overflow:hidden">
          <iframe id="view3DIfram" title="SCEC CFM 3D viewer" src="" onload="setIframHeight(this.id)" height="10" width="100%" allowfullscreen></iframe>
        </div>
      </div>

      <div class="modal-footer justify-content-center" id="modal3DFooter">

        <div class="spinDialog" style="position:absolute;top:40%;left:50%; z-index:9999;">
          <div id="spinIconFor3D" align="center" style="display:none;"><i class="glyphicon glyphicon-cog fa-spin" style="color:red"></i></div>
        </div>

        <button type="button" class="btn btn-outline-primary btn-sm" data-dismiss="modal">Close</button>
        <button id="view3DExpandbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="toggleExpand3Dview(this)">Shrink</button>
        <button id="view3DRefreshbtn" class="btn btn-outline-primary btn-sm" type="button" onclick="refresh3Dview()">Reset</button>
        <button id="view3DSavebtn" class="btn btn-outline-primary btn-sm" type="button" onclick="save3Dview()">Save Image</button>
        <button id="view3DHelpbtn" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#modalinfo3d" onclick="$('#modal3D').modal('hide');">Help</button>
        <button id="view3DWarnbtn" class="btn btn-outline-primary btn-sm" style="display:none" data-toggle="modal" data-target="#modalwarn3d"></button>
      </div> <!-- footer -->

    </div> <!--Content-->
  </div>
</div> <!--Modal: Name-->

<!--Modal: ModelType -->
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
</div> <!--Modal: Name-->

<!--Modal: ModelType -->
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
</div> <!--Modal: Name-->
</div>
</body>
</html>
