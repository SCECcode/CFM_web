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

    <h1>User Guide <i>(DRAFT)</i></h1>

    <div class="row">
        <div class="col-12">
            <figure class="cfm-interface figure float-lg-right">
                <img src="img/cfm-viewer.jpg" class="figure-img img-fluid" alt="Screen capture of CFM Viewer interface">
                <figcaption class="figure-caption">Screen capture of CFM Viewer interface</figcaption>
            </figure>
            <h4>Community Fault Model (CFM) Viewer Overview</h4>
            <p>The CFM Viewer provides a map-based view of <a
                        href="https://www.scec.org/research/cfm">CFM version 5.2</a> preferred
               faults. It allows users to view faults and metadata and download data on selected faults rather than downloading the entire CFM
               model archive. The pages on this site are the <a href="<?php echo $host_site_actual_path; ?>">CFM viewer
                    page</a>, this user guide, <a href="disclaimer">a disclaimer</a>, and a <a href="contact">contact
                     information</a> page.
            </p>

            <p>The main interface is on the <a href="<?php echo $host_site_actual_path; ?>">Viewer Page</a>. When it is
               first loaded, all available faults are listed in the box* on the left. Click on the checkboxes in the fault table
               to select faults or click on faults on the map. (See <strong>Viewing and Downloading Metadata</strong>
               below for more details.) Click on the eye icon (<span class="glyphicon glyphicon-eye-open"></span>) to
               hide or show a fault. </p>
            <p>
                The map on the right displays each fault in its geographic location. On top of the map, there are two
                controls. The first allows the base map to be changed. By default, the map shown is <a
                        href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ESRI Topographic</a>.
                The other map types are: <a
                        href="https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer">ESRI National Geographic</a>, <a
                        href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">ESRI Imagery</a>, <a
                        href="https://opentopomap.org">OTM Topographic</a>, and <a href="https://www.openstreetmap.org">OSM Street</a>. The other available control highlights the displayed faults by their strike or dip in a color spectrum from red (low values) to blue (high values). </p>

            <h4>Search</h4>
            <p>
                The site provides a number of search criteria, primarily keyword and latitude/longitude but also the
                following advanced search criteria: fault area, fault system, section, name, strike, and dip. Once a
                search type is selected, controls will appear below in the form of another dropdown, text input boxes, or
                sliders. </p>
            <p>
                When performing a latitude/longitude search, there are two search methods. The first method is to
                enter the latitude/longitude values of the bottom left and top right corners of a bounding rectangle into the
                text boxes, then clicking the search icon <span style="white-space: nowrap;">(<span
                            style="color:#53A2BE;" class="glyphicon glyphicon-search"></span>).</span>
                The second method is to click and drag on the map to draw a bounding rectangle. In either case, any portion of a fault that lies within the bounding rectangle will appear in the search results. Once a search is submitted, the matching faults appear on the map and are listed in the box* to the left. </p>
            <p>To return to the initial view showing all the faults, click the "RESET" button.</p>

            <h4>Viewing and Downloading Data</h4>

            <p>
                Metadata files in JSON format and tsurf files are available for download from this site. First, select the desired faults by clicking on the fault displayed on the map or clicking on fault listed in the box* to the left of the map. The selected faults are highlighted in red** on the map. The selected faults' metadata appear in the metadata table* at the bottom of the page. Click on the links on the rightmost column of the metadata table to download data for one fault. Click on the "DOWNLOAD ALL" button to download data for all selected faults. The download options are: metadata only, or metadata along with tsurf files in native, 500m, or 1000m resolution in a ZIP archive file. </p>


            <p>* The scrollable boxes on this site can contain more data than is visible at one time.
                <br/>
               ** When highlighting faults by strike or slip, selected faults appear turquoise rather than red. This is
               to avoid confusion with the strike/slip color scale. </p>


            <h4>Notes</h4>
            <ul>
                <li>
                    Projections: Fault representations are provided in Universal Transverse Mercator projection (UTM zone 11 S, North American datum 1927). </li>
                <li>Strike and dip are weighted averages. The true fault surface is non-planar.</li>
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

            <h4>Browser Requirements</h4>
            <p>This site supports the latest versions of <a href="https://www.mozilla.org/en-US/firefox/">Firefox</a>, <a href="https://www.google.com/chrome/">Chrome</a>, <a href="https://www.apple.com/safari/">Safari</a>, and <a href="https://www.microsoft.com/en-us/windows/microsoft-edge">Microsoft Edge</a>.</p>

            <h4>About the SCEC Community Fault Model (CFM) </h4>

            <figure class="cfm-perspective-view figure float-lg-right">
                <img src="img/cfm52_perspective.png" class="figure-img img-fluid"
                        alt="Perspective view of CFM 5.2 showing strike-slip (green), thrust/reverse (red), and normal (blue) faults that comprise the preferred model.">
                <figcaption class="figure-caption">Perspective view of CFM 5.2 showing strike-slip (green), thrust/reverse (red), and normal (blue) faults that comprise the preferred model.
                </figcaption>
            </figure>

            <p>The SCEC Community Fault Model (CFM) is an object-oriented, three-dimensional representation of more than
               150 active faults in southern California (Plesch et al., 2007). The model is organized into more than 350
               fault objects which include triangulated surface representations (t-surfs) of these faults and associated meta
               data. The t-surfs are defined from surfaces traces, seismicity, seismic reflection profiles, wells, geologic
               cross-sections and models. The model includes alternative representations of many faults, with preferred
               versions established by a CFM working group in SCEC. A subset of the model is provided in a number of
               mesh resolutions. </p>

            <p> The model serves the Southern California Earthquake Center (SCEC) as a unified resource for
                physics-based fault systems modeling, strong ground-motion prediction, and probabilistic seismic hazards assessment (e.g., UCERF3).
                Together with the Community Velocity Model (CVM-H 15.1.0), the CFM comprised SCEC's Unified Structural
                Representation of the Southern California crust and upper mantle (Shaw et al., 2015).</p>

            <p> The latest release of the CFM is version 5.2, which includes many new and revised fault representations
                (Nicholson et al., 2017). In addition, the new model expands and improves the database component of CFM
                to help ensure the internal consistency and maintainability of the model. This hierarchical name and numbering system enables model users to access and assess the full richness of the various fault systems, 3D fault models, and 3D fault components in CFM. In addition to fault area, fault system, fault section and fault name, the expanded CFM database now includes fields for alternate and CFM version number, source, descriptor, references, USGS Quaternary fault (Qfault) ID, and fault attributes of average strike, dip, area, and faulting style. Care was taken to insure that the database is synchronized with the latest catalog of individual, t-surf CFM fault representations. </p>

            <p>More information about the CFM, including a complete model archive, can be found at: <a
                        href="https://www.scec.org/research/cfm">https://www.scec.org/research/cfm</a>.

            <h4>References</h4>
            <ul class="references">
                <li><a href="https://www.scec.org/user/nicholson">Nicholson, C.</a>, <a
                            href="https://www.scec.org/user/plesch">Plesch,
                                                                    A.</a>, &amp; <a
                            href="https://www.scec.org/user/jshaw">Shaw, J. H.</a> (2017, 08). Community Fault
                                                                                   Model Version 5.2: Updating &amp;
                                                                                   expanding the CFM 3D fault set and
                                                                                   its associated fault database.
                                                                                   Poster
                                                                                   Presentation at 2017 SCEC Annual
                                                                                   Meeting.&nbsp; <a
                            href="https://www.scec.org/publication/7735">SCEC
                                                                         Contribution 7735</a></li>
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