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
    <title>Community Fault Model Viewer (Provisional): User Guide</title>
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
            <p>The CFM Viewer provides a map-based view of the <a
                        href="https://www.scec.org/research/cfm">CFM version 5.3</a> preferred
               faults. It allows users to view faults and metadata and download data on selected faults rather than downloading the entire CFM
               model archive. The pages on this site include the <a href="<?php echo $host_site_actual_path; ?>">CFM viewer
                    page</a>, this user guide, <a href="disclaimer">a disclaimer</a>, and a <a href="contact">contact
                     information</a> page.
            </p>

            <p>The main interface is on the <a href="<?php echo $host_site_actual_path; ?>">Viewer Page</a>. When it is
               first loaded, all available faults are listed on the left side of the screen. Users can click on the checkboxes in the fault table
               to select faults or click on faults on the map. (See <strong>Viewing and Downloading Metadata</strong>
               below for more details.) Click on the eye icon (<span class="glyphicon glyphicon-eye-open"></span>) to
               hide/show a fault. </p>
            <p>
                The map on the right displays each fault in its geographic location, with blind faults appearing as dashed lines. On top of the map, there is a
                control that allows the base map to be changed. By default, the map shown is <a
                        href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ESRI Topographic</a>.
                The other map types are: <a
                        href="https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer">ESRI National Geographic</a>, <a
                        href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">ESRI Imagery</a>, <a
                        href="https://opentopomap.org">OTM Topographic</a>, and <a href="https://www.openstreetmap.org">OSM Street</a>.</p>

            <p><i>This site is provisional and is undergoing active testing and review by the CFM community. To report any bugs or issues, please see the <a href="contact">contact page</a>.</i></p>

            <h4><strong>Search</strong></h4>
            <p>
                The site provides a number of search criteria, primarily keyword and latitude/longitude but also
                the following advanced search criteria: fault area, fault zone, section, and name. Once a
                search type is selected, controls will appear below in the form of another dropdown, text input
                boxes, or sliders. </p>

            <p> The site provides a number of search criteria, including keyword, latitude/longitude, fault area,
                fault zone, section, and name. Users can also filter results by the average strike and/or dip of
                fault objects. Once a search type is selected, controls will appear below in the form of another
                dropdown, text input boxes, or sliders. Note that CFM faults are non-planar. The average strike
                and dip values are calculated from the area-weighted normal vectors for a given surface. 
                Area weighting accounts for the differing triangular element sizes/shapes.</p>

            <p> When performing a latitude/longitude search, there are two search methods.  Users can either
                enter the latitude/longitude values of the bottom left and top right corners of a bounding 
                rectangle into the text boxes, or simply click and drag on the map to draw a bounding rectangle.
                In either case, any portion of a fault that lies within the bounding rectangle will appear in
                the search results. Once a search is submitted, the matching faults appear on the map and are 
                listed in the box* to the left. </p>

            <p> If a user wants to filter based on multiple criteria, the record button can be used to lock 
                in the currently selected set, and then additional filter(s) can be applied, each time clicking
                on the record button after each filter is applied. </p>

            <p> To return to the initial view showing all the faults, click the "RESET" button.</p>

            <h4><strong>Viewing and Downloading Data</strong></h4>

            <p> Metadata files in CSV format and tsurf files are available for download from this site. First,
                select the desired faults by clicking on the fault displayed on the map or clicking on fault 
                listed in the box* to the left of the map. The selected faults are highlighted in red** on the
                map. The selected faults' metadata appear in the metadata table* at the bottom of the page. 
                Click on the links on the rightmost column of the metadata table to download data for one fault.
                Click on the "DOWNLOAD ALL" button to download data for all selected faults. The download 
                options are: metadata only, or metadata along with tsurf files in native, 500m, 1000m, 2000m,
                or "All of the Above", in a ZIP archive file. </p>

            <p>* The scrollable boxes on this site can contain more data than is visible at one time. </p>

            <h4><strong>Viewing in 3D and the Plot3D tool</strong></h4>

            <p> This “Plot3D” option is intended to provide potential CFM users with a quick and convenient way
                to view CFM fault surfaces in their native 3D environment (UTM zone 11s). This tool is not 
                designed to replace fully-functional CAD software. Refer to the 
                <a href="https://www.scec.org/research/cfm">CFM homepage</a> for information about recommended
                software. This tool currently does not have the ability to plot 3D axes, and a map scale in 3D
                is not useful because any scale would only be valid at one given distance from the viewer. 
                Faults in the CFM extend to the approximate base of the seismogenic zone (max depth of 
                earthquakes), which is approximately 15 – 20 km depth in most southern California regions.</p>

             <p> For location purposes, the 3D viewer shows all CFM fault traces in pink, blind fault upper 
                 tip lines in orange, and the coastline and state boundaries in black. In the bottom right 
                 corner, the green arrow points North, pink points East, and yellow points up vertically.</p>

             <p> Learning to navigate in 3D takes some practice, so if you get lost or disoriented, try 
                 clicking on the “Show Mapview” button in the top right corner to reset to the original 
                 mapview.</p>

            <h4><strong>Notes</strong></h4>
            <ul>
                <li>
                    Projections: 3D fault representations in gocad format are provided in Universal Transverse Mercator projection (UTM zone 11S, North American datum 1927).</li>
<!--                <li>Strike and dip are weighted averages. The true fault surface is non-planar.</li>-->
                <li>The fault object names are comprised of metadata for each fault. For example,
                    "SAFS-SAFZ-MULT-Banning_fault_strand-CFM4" represents:
                    <ul>
                        <li>Fault Area: SAFS</li>
                        <li>Fault Zone: SAFZ</li>
                        <li>Fault Section: MULT</li>
                        <li>Fault Name: Banning fault strand</li>
                        <li>CFM Version when added: CFM4</li>
                    </ul>
                </li>
            </ul>

            <h4><strong>Browser Requirements</strong></h4>
            <p>This site supports the latest versions of <a href="https://www.mozilla.org/en-US/firefox/">Firefox</a>, <a href="https://www.google.com/chrome/">Chrome</a>, <a href="https://www.apple.com/safari/">Safari</a>, and <a href="https://www.microsoft.com/en-us/windows/microsoft-edge">Microsoft Edge</a>.</p>

            <h4><strong>About the SCEC Community Fault Model (CFM)</strong></h4>

            <figure class="cfm-perspective-view figure float-lg-right">
                <img src="img/cfm52_perspective.png" class="figure-img img-fluid"
                        alt="Perspective view of CFM 5.2 showing strike-slip (green), thrust/reverse (red), and normal (blue) faults that comprise the preferred model.">
                <figcaption class="figure-caption">Perspective view of CFM 5.2 showing strike-slip (green), thrust/reverse (red), and normal (blue) faults that comprise the preferred model.
                </figcaption>
            </figure>

            <p>The SCEC Community Fault Model (CFM) is an object-oriented, three-dimensional representation of 
               active faults in southern California (Plesch et al., 2007). The model is organized into 
               438 fault objects each of which include triangulated surface (t-surfs) and surface trace 
               representations and associated meta-data including references. The 3D t-surfs are defined from 
               surface traces, seismicity, seismic reflection profiles, wells, geologic cross-sections and 
               models. The model includes alternative representations of many faults, with preferred
               versions established based on community evaluations by the SCEC community. To faciliate 
               modeling of the CFM, the model t-surfs are provided in a number of semi-regularized
               mesh resolutions. </p>

            <p> The model serves the Southern California Earthquake Center (SCEC) as a unified resource for
                physics-based fault systems modeling, strong ground-motion prediction, and probabilistic 
                seismic hazards assessment (e.g., UCERF3).  Together with the Community Velocity Model (
                CVM-H 15.1.0), the CFM comprises SCEC's Unified Structural Representation of the Southern 
                California crust and upper mantle (Shaw et al., 2015).</p>

            <p> The latest release of the CFM is version 5.3, which includes many new and revised fault 
                representations, mainly in the Ridgecrest and offshore regions (Plesch et al., 2020). 
                In addition, CFM5.3 has greatly expanded and improved metadata, including references, 
                average strike/dip, and surface areas for each model object. The various filenames and 
                heirarchical naming structures are now automatically checked for consistency by scripts.
                This ensures the internal consistency and maintainability of the model. This hierarchical 
                naming system enables model users to easily filter the model into a region of interest. 
                In addition, the expanded CFM metadata now includes fields last update (by CFM version number), 
                references, and when available, the corresponding USGS Quaternary fault (Qfault) ID.
                Sense of slip for each fault object is now provided, but is meant only as approximate, and 
                in the absence of other data, sense of slip is based solely on the 3D surface orientation. 
                Automated scripts now ensure that the metadata database is synchronized and consistent 
                with the latest catalog of individual, t-surf CFM fault representations.</p>

            <p>More information about the CFM, including a complete model archive, can be found at: <a
                        href="https://www.scec.org/research/cfm">https://www.scec.org/research/cfm</a>.

            <h4><strong>References</strong></h4>
            <ul class="references">
                <li> <a href="https://www.scec.org/user/plesch">Plesch, A.</a>, <a
                            href="https://www.scec.org/user/marshallst">Marshall, S. T.</a>, <a 
                            href="https://www.scec.org/user/nicholson">Nicholson, C.</a>, <a
                            href="https://www.scec.org/user/jshaw">Shaw, J. H.</a>, <a 
                            href="https://www.scec.org/user/maechlin">Maechling, P. J.</a>, <a
                            href="https://www.scec.org/user/mei">Su, M-H.</a>. (2020). “The Community Fault Model version 5.3 and new web-based tools” Virtual Poster Presentation at the 2020 SCEC Annual Meeting. <a 
                            href="https://www.scec.org/publication/10547">SCEC Contribution 10547</a></li>
                <li><a href="https://www.scec.org/user/plesch">Plesch, A.</a>, et al. (2007). "Community Fault Model
                                                                             (CFM)
                                                                             for
                                                                             Southern California." Bulletin of the
                                                                             Seismological Society of America 97:
                                                                             1793-1802. <a
                            href="https://www.scec.org/publication/1134">SCEC Contribution 1134</a></li>
                <li><a href="https://www.scec.org/user/plesch">Plesch, A.</a>, <a
                            href="https://www.scec.org/user/nicholson">Nicholson,
                                                                       C.</a>. <a
                            href="https://www.scec.org/user/sorlien">Sorlien, C.</a>, <a
                            href="https://www.scec.org/user/jshaw">Shaw, J. H.</a> and <a
                            href="https://www.scec.org/user/hauksson">Hauksson, E.</a>, CFM Version 5.1: New and revised
                                                                             3D
                                                                             fault representations and an improved
                                                                             database, 2016 SCEC Annual Meeting
                                                                             Proceedings &amp; Abstracts,
                                                                             XXVI,
                                                                             poster 003, p.222-223 (2016).&nbsp; <a
                            href="https://www.scec.org/publication/6768">SCEC Contribution
                                                                         6768</a></li>
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
