<?php
require_once("php/navigation.php");
$header = getHeader("User Guide");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="css/vendor/font-awesome.min.css" rel="stylesheet">

    <link rel="stylesheet" href="css/vendor/bootstrap.min.css">
    <link rel="stylesheet" href="css/vendor/bootstrap-grid.min.css">
    <link rel="stylesheet" href="css/vendor/jquery-ui.css">
    <link rel="stylesheet" href="css/vendor/glyphicons.css">
    <link rel="stylesheet" href="css/cfm-ui.css">
    <link rel="stylesheet" href="css/sidebar.css">

    <script type='text/javascript' src='js/vendor/popper.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery.min.js'></script>
    <script type='text/javascript' src='js/vendor/bootstrap.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery-ui.js'></script>
    <title>Community Fault Model Viewer: User Guide</title>
</head>
<body>
<?php echo $header; ?>

<div class="container info-page-container scec-main-container guide">

    <h1>CFM Viewer User Guide</h1>

    <div class="row">
        <div class="col-12">
            <figure class="cfm-interface figure float-lg-right">
                <img src="img/cfm-viewer.png" class="figure-img img-fluid" alt="Screen capture of CFM Viewer interface">
                <figcaption class="figure-caption">Screen capture of CFM Viewer interface</figcaption>
            </figure>
            <h4><strong>Community Fault Model (CFM) Viewer Overview</strong></h4>

            <p>The CFM Viewer provides interactive map-based and 3D views of the <a
               href="https://www.scec.org/research/cfm">CFM version 5.3</a> preferred
               faults. The viewer allows users to view faults, associated metadata, and
               download selected fault data without having to download the entire CFM
               model archive. The pages on this site include the 
               <a href="<?php echo $host_site_actual_path; ?>">CFM viewer page</a>, 
               this user guide, <a href="disclaimer">a disclaimer</a>, and a 
               <a href="contact">contact information</a> page.</p>

            <p>The main interface is on the <a href="<?php echo $host_site_actual_path; ?>">
               Viewer Page</a>. When first loaded, all CFM5.3 preferred faults are listed 
               on the left side of 
               the screen. Users can click on the checkboxes in the fault table to select faults 
               or click on faults on the map. (See <strong>Viewing and Downloading Metadata</strong>
               below for more details.) Click on the eye icon 
               (<span class="glyphicon glyphicon-eye-open"></span>) to hide/show a fault.</p>

            <p>
                The interactive map on the right displays the geographic extent of each fault, 
                with dashed lines indicating blind faults. In top right corner of the interactive 
                map, there is a pull-down menu that allows the base map to be changed. By default, 
                the map shown is 
                <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">
                ESRI Topographic</a>. The other map types are: 
                <a href="https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer">ESRI National Geographic</a>,
                <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">ESRI Imagery</a>,
                <a href="https://opentopomap.org">OTM Topographic</a>, and
                <a href="https://www.openstreetmap.org">OSM Street</a>.</p>

            <p><i>To report any bugs or issues, please see the <a href="contact">contact page</a>.</i></p>

            <h4><strong>Searching/Querying the CFM</strong></h4>

            <p> The CFM viewer web tool provides a number of search criteria, including keyword,
                latitude/longitude, fault area, fault zone, section, and name. Users can also filter
                results by the average strike and/or dip of fault objects. Once a search type is selected,
                controls will appear below in the form of another dropdown, text input boxes, or sliders.
                Because CFM faults are non-planar, the average strike and dip values are calculated from 
                the area-weighted normal vectors for all triangles comprising a given surface. 
                Area weighting accounts for the differing triangular element sizes/shapes.</p>

            <p> When performing a latitude/longitude search, there are two search methods.  Users can either
                enter the latitude/longitude values of the bottom left and top right corners of a bounding 
                rectangle into the text boxes, or simply click and drag on the map to draw a bounding rectangle.
                In either case, any portion of a fault that lies within the bounding rectangle will appear in
                the search results. Once a search is submitted, the matching faults appear on the map and are 
                listed in the list on the left side of the interface.</p>

            <p> If a user wishes to filter based on multiple criteria, the record button can be used to lock 
                in the currently selected set, and then additional filter(s) can be applied, each time clicking
                on the record button after each filter is applied.</p>

            <p> To return to the initial view showing all the faults, click the "RESET" button.</p>

            <h4><strong>Viewing and Downloading Data</strong></h4>

            <p> Metadata files in CSV format and tsurf(.ts) files are available for download from this site. 
                First, select the desired faults by clicking on the fault displayed on the map or clicking 
                on fault listed in the list on the left side of the interface. Selected faults are 
                highlighted in <span style="color:#cc0000">red</span> on the map. Metadata for the 
                selected fault(s) appear in the table at the bottom of the interface. 
                Click on the links on the rightmost column of the metadata table to download data for one fault.
                Click on the black "DOWNLOAD" button to download data for all selected faults. The download 
                options are: metadata only, or metadata along with tsurf files in native, 500m, 1000m, 2000m,
                or "All of the Above", in a ZIP archive file. </p>

            <h4><strong>Viewing in 3D and the Plot3D tool</strong></h4>

            <p> This "Plot3D" option is intended to provide potential CFM users with a quick and convenient way
                to view CFM fault surfaces in their native 3D environment (UTM zone 11s). This tool is not 
                designed to replace fully-functional CAD software. Refer to the 
                <a href="https://www.scec.org/research/cfm">CFM homepage</a> for information about recommended
                software. This tool currently does not have the ability to plot 3D axes, and a map scale in 3D
                is not useful because any scale would only be valid at one given distance from the viewer. 
                For reference, faults in the CFM extend to the approximate base of the seismogenic zone
                (max depth of earthquakes), which is approximately 15 – 20 km depth in most southern
                California regions.</p>

             <p> For location purposes, the 3D viewer shows all CFM fault traces in pink, blind fault upper 
                 tip lines in orange, and the coastline and state boundaries in black. In the bottom right 
                 corner, the green arrow points North, pink points East, and yellow points up vertically.</p>

             <p> 3D navigation instructions are provided in a pop-up when the plot3D tool is clicked on.
                 Learning to navigate in 3D takes some practice, so if you get lost or disoriented, try 
                 clicking on the “Show Mapview” button in the top right corner to reset to the original 
                 mapview.</p>

            <h4><strong>Model Projection and Datum</strong></h4>

             <p> 3D fault representations in Gocad tsurf format are provided in Universal Transverse 
                Mercator projection (UTM) zone 11S, North American datum 1927 (NAD27).</p>

            <h4><strong>Viewing Relocated Seismicity</strong></h4>

             <p> In the top left corner of the map interface, there is a “Load relocated seismicity” 
                 button that allows users to visualize two different relocated seismicity catalogs in
                 the map interface. These are large datasets, so loading the relocated seismicity may
                 take a minute or more depending on your connection speed. The default relocated seismicity 
                 catalog shown is the Hauksson et al. (2012) catalog, which is available for download 
                 <a href="https://scedc.caltech.edu/data/alt-2011-dd-hauksson-yang-shearer.html">here</a>.
                 The pull-down menu at the top left of the interface also allows for visualization
                 of the Ross et al. (2019) catalog, which is available for downlod
                 <a href="https://scedc.caltech.edu/eq-catalogs/qtm.html">here</a>. Epicenters are
                 colored by depth by default, but the pull-down menu at the top left of the interface 
                 provides options to color by depth, magnitude, or time, for either the Hauksson et al. (2012),
                 or Ross et al. (2019). The Hauksson et al. (2012) catalog contains ~700k events from 
                 1981-2019, while the Ross et al. (2019) catalog contains ~900k events from 2008-2017.
             <p> The Hauksson et al. (2012) or Ross et al. (2019) relocated catalogs can also be viewed
                 in 3D using the plot3D option. Once faults have been selected on the map interface and
                 the plot3D button is clicked, the 3D interface loads. There is a button labeled 
                 “Relocated Seismicity Off” at the top that can be clicked on to display the hypocenters
                 of the Hauksson et al. (2012) or Ross et al. (2019) relocated catalogs. 
                 Hauksson et al. (2012) hypocenters are shown in green while the Ross et al. (2019) 
                 hypocenters are shown in blue. Many of the CFM surfaces are based partly on relocated 
                 seismicity, so this feature allows users to see how the CFM faults relate to seismicity
                 in a 3D interactive environment.</p>

            <h4><strong>Hierarchical Naming Structure</strong></h4>

             <p> Fault object are named based on a hierarchical naming structure. To facilitate users 
                 that wish to automate identification of CFM fault objects, each portion of the hierarchical
                 naming structure is separated by a hyphen (-), and all names contain the five components 
                 listed below. For example,</p>
             
             <dl>
                 Object name: SAFS-SAFZ-MULT-Banning_fault_strand-CFM4
                 <dt><li>Fault area: SAFS</li>
                     <li>Fault zone: SAFZ</li>
                     <li>Fault section: MULT</li>
                     <li>Fault name: Banning fault strand</li>
                     <li>CFM Version when added or last updated: CFM4</li>
                  </dt>
             </dl>


            <h4><strong>Browser Requirements</strong></h4>
            <p>This site supports the latest versions of <a href="https://www.mozilla.org/en-US/firefox/">Firefox</a>, <a href="https://www.google.com/chrome/">Chrome</a>, <a href="https://www.apple.com/safari/">Safari</a>, and <a href="https://www.microsoft.com/en-us/windows/microsoft-edge">Microsoft Edge</a>.</p>

            <h4><strong>About the SCEC Community Fault Model (CFM)</strong></h4>

            <figure class="cfm-perspective-view figure float-lg-right">
                <img src="img/CFM5.3_View.png" class="figure-img img-fluid"
                        alt="Perspective view of the CFM5.3, with fault surfaces colored by strike. Relocated seismicity is colored by time (calendar year).">
                <figcaption class="figure-caption">Perspective view of the CFM5.3, with fault surfaces colored by strike. Relocated seismicity is colored by time (calendar year).
                </figcaption>
            </figure>

            <p>The SCEC Community Fault Model (CFM) is an object-oriented, three-dimensional representation of 
               active faults in southern California (Plesch et al., 2007). The model is organized into 
               440 fault objects each of which include triangulated surface (t-surfs) and surface trace 
               representations and associated meta-data including references. The 3D t-surfs are defined from 
               a variety of data including
               surface traces, seismicity, seismic reflection profiles, wells, geologic cross-sections and 
               models. The model includes alternative representations of many faults, with preferred
               versions established based on community evaluations by the SCEC community. To facilitate 
               modeling of the CFM, the model t-surfs are provided in several semi-regularized
               mesh resolutions. </p>

            <p> The model serves the Southern California Earthquake Center (SCEC) as a unified resource for
                physics-based fault systems modeling, strong ground-motion prediction, and probabilistic 
                seismic hazards assessment (e.g., UCERF3).  Together with the Community Velocity
                Model(CVM-H 15.1.0), the CFM comprises SCEC's Unified Structural Representation of the Southern 
                California crust and upper mantle (Shaw et al., 2015).</p>

            <p> The latest release of the CFM is version 5.3, which includes many new and revised fault 
                representations, mainly in the Ridgecrest and offshore regions (Plesch et al., 2020). 
                In addition, CFM5.3 has greatly expanded and improved metadata, including references, 
                USGS Quaternary fault (QFault) ID (when available), last update (by CFM version), 
                expected sense of slip, average strike/dip, and surface areas for each model object. 
                The various filenames, hierarchical naming structures, fault orientations, and surface 
                areas are now automatically checked for consistency by automated scripts.
                This ensures the internal consistency and maintainability of the model. 
                The hierarchical naming system enables model users to easily filter the model into a 
                region of interest. Sense of slip for each fault object is now provided as metadata,
                but is meant only as approximate, and in the absence of other data, sense of slip is 
                based solely on the 3D surface orientation.</p>

            <p> More information about the CFM, including a complete model archive, can be found at:
                <a href="https://www.scec.org/research/cfm">https://www.scec.org/research/cfm</a>.</p>

            <h4><strong>References</strong></h4>
            <ul class="references">
                <li>Hauksson, E., W. Yang and P.M. Shearer, "Waveform Relocated Earthquake Catalog for 
                                                               Southern California (1981 to 2011)";
                                                               Bull. Seismol. Soc. Am., Vol. 102, No. 5, pp.2239-2244,
                                                               October 2012, doi: 10.1785/0120120010</li>
                <li> <a href="https://www.scec.org/user/plesch">Plesch, A.</a>, <a
                            href="https://www.scec.org/user/nicholson">Nicholson, C.</a>, <a
                            href="https://www.scec.org/user/jshaw">Shaw, J. H.</a>, <a 
                            href="https://www.scec.org/user/maechlin">Maechling, P. J.</a>, <a
                            href="https://www.scec.org/user/mei">Su, M-H.</a> (2020). “The Community Fault Model version 5.3 and new web-based tools” Virtual Poster Presentation at the 2020 SCEC Annual Meeting. <a 
                            href="https://www.scec.org/publication/10547">SCEC Contribution 10547</a></li>
                <li><a href="https://www.scec.org/user/plesch">Plesch, A.</a>, et al. (2007). "Community Fault Model
                                                                             (CFM)
                                                                             for
                                                                             Southern California." Bulletin of the
                                                                             Seismological Society of America 97:
                                                                             1793-1802. <a
                            href="https://www.scec.org/publication/1134">SCEC Contribution 1134</a></li>
                <li>Ross, Z.E., Trugman, D.T., Hauksson, E. and Shearer P.M. "Searching for hidden earthquakes 
                                                               in Southern California";
                                                               Science Vol. 364, No. 6442, pp. 767-771, 
                                                               2019, doi: 10.1126/science.aaw6888 </li>
                <li><a href="https://www.scec.org/user/jshaw">Shaw, J. H.</a>, <a
                            href="https://www.scec.org/user/plesch">Plesch,
                                                                    A.</a>, <a
                            href="https://www.scec.org/user/carltape">Tape, C.</a>, Suess, M., <a
                            href="https://www.scec.org/user/tjordan">Jordan, T. H.</a>, <a
                            href="https://www.scec.org/user/gely">Ely, G.</a>, <a
                            href="https://www.scec.org/user/hauksson">Hauksson,
                                                                      E.</a>,&nbsp;<a
                            href="https://www.scec.org/user/jtromp">Tromp, J.</a>, <a
                            href="https://www.scec.org/user/toshiro">Tanimoto, T.</a>, <a
                            href="https://www.scec.org/user/rgraves">Graves, R.</a>, <a
                            href="https://www.scec.org/user/kbolsen">Olsen, K.</a>, <a
                            href="https://www.scec.org/user/nicholson">Nicholson, C.</a>, <a
                            href="https://www.scec.org/user/maechlin">Maechling, P. J.</a>, <a
                            href="https://www.scec.org/user/rivero">Rivero, C.</a>, <a
                            href="https://www.scec.org/user/plovely">Lovely,
                                                                     P.</a>, <a
                            href="https://www.scec.org/user/brankman">Brankman, C. M.</a>, &amp; Munster, J. (2015).
                                                                             Unified Structural Representation of the
                                                                             southern California crust and upper mantle.
                                                                             Earth and Planetary
                                                                             Science Letters, 415, 1-15. <a
                            href="https://dx.doi.org/10.1016/j.epsl.2015.01.016">doi:
                                                                                 10.1016/j.epsl.2015.01.016</a>. <a
                            href="https://www.scec.org/publication/2068">SCEC Contribution
                                                                         2068</a></li>
            </ul>


            </p>
        </div>
    </div>
</body>
</html>
