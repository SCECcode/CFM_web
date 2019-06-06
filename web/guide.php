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

    <h1>User Guide</h1>


    <h4>About the SCEC Community Fault Model (CFM) </h4>

    <figure class="figure">
        <img src="img/cfm52_perspective.png" class="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure.">
        <figcaption class="figure-caption">Perspective view of CFM 5.2 showing strike-slip (green), thrust/reverse (red), and normal (blue) faults that comprise the preferred model. Earthquake locations (Hauksson, 2003, updated 2016) are shown by year. Scale is in meters.</figcaption>
    </figure>

    <p>The SCEC Community Fault Model (CFM) is an object-oriented, three-dimensional representation of more than 150
        active faults in southern California (Plesch et al., 2007). The model is organized into more than 350 fault
        objects which include triangulated surface representations (t-surfs) of these faults and associated meta data.
        The t-surfs are defined from surfaces traces, seismicity, seismic reflection profiles, wells, geologic
        cross-sections and models. The model includes alternative representations of many faults, with preferred
        versions established by a CFM working group in SCEC. A subset of the model is provided in a number of mesh
        resolutions.
    </p>

    <p> The model serves the Southern California Earthquake Center (SCEC) as a unified resource for physics-based fault
        systems modeling, strong ground-motion prediction, and probabilistic seismic hazards assessment (e.g., UCERF3).
        Together with the Community Velocity Model (CVM-H 15.1.0), the CFM comprised SCEC's Unified Structural
        Representation of the Southern California crust and upper mantle (Shaw et al., 2015).</p>

    <p> The latest release of the CFM is version 5.2, which includes many new and revised fault representations
        (Nicholson et al., 2017). In addition, the new model expands and improves the database component of CFM to help
        ensure the internal consistency and maintainability of the model. This hierarchical name and numbering system
        enables model users to access and assess the full richness of the various fault systems, 3D fault models, and 3D
        fault components in CFM. In addition to fault area, fault system, fault section and fault name, the expanded CFM
        database now includes fields for alternate and CFM version number, source, descriptor, references, USGS
        Quaternary fault (Qfault) ID, and fault attributes of average strike, dip, area, and faulting style. Care was
        taken to insure that the database is synchronized with the latest catalog of individual, t-surf CFM fault
        representations.
    </p>

    <p>More information about the CFM, including a complete model archive, can be found at: <a href="https://www.scec.org/research/cfm">https://www.scec.org/research/cfm</a>.

    <h4>Using This Website</h4>

    <p>The CFM Viewer website provides a map-based view of <a
                href="https://www.scec.org/research/cfm">CFM version 5.2</a> preferred faults. It allows users to view faults and metadata and download data on selected faults rather than downloading the entire CFM model archive. The site provides a number of search criteria, such as keyword and latitude/longitude. Additionally, the advanced search criteria are: system, region, section, name, strike, and dip.</p>

    <p>The main interface of this site is on the <a href="viewer">Viewer Page</a>. When it is first loaded, all available faults are listed in the box on the left and displayed in their geographic location on the map to the right. Please note that the listing of faults on the left is a scrollable box, and thus can contain more fault
        objects than are visible at one time.</p>

    <p>The pages on this site are the <a href="viewer">CFM viewer page</a>, this user guide, <a href="disclaimer">a
            disclaimer</a>, and a <a href="contact">contact information</a> page. </p>

    <h4>Downloading Metadata and... </h4>

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum. Donec elementum ligula eu sapien consequat eleifend. Donec nec dolor erat, condimentum</p>

    <h4>Projections</h4>
    <p>Fault representations are provided in Universal Transverse Mercator projection (UTM zone 11 N, North American datum 1927).</p>

    <h4>References</h4>
    <ul class="references">
        <li><a href="https://www.scec.org/user/nicholson">Nicholson, C.</a>, <a href="https://www.scec.org/user/plesch">Plesch,
                A.</a>, &amp; <a href="https://www.scec.org/user/jshaw">Shaw, J. H.</a> (2017, 08). Community Fault
            Model Version 5.2: Updating &amp; expanding the CFM 3D fault set and its associated fault database. Poster
            Presentation at 2017 SCEC Annual Meeting.&nbsp; <a href="https://www.scec.org/publication/7735">SCEC
                Contribution 7735</a></li>
        <li><a href="https://www.scec.org/user/plesch">Plesch, A.</a>, et al. (2007). "Community Fault Model (CFM) for
            Southern California." Bulletin of the Seismological Society of America 97: 1793-1802. <a
                    href="https://www.scec.org/publication/1134">SCEC Contribution 1134</a></li>
        <li><a href="https://www.scec.org/user/plesch">Plesch, A.</a>, <a href="https://www.scec.org/user/nicholson">Nicholson,
                C.</a>. <a href="https://www.scec.org/user/sorlien">Sorlien, C.</a>, <a
                    href="https://www.scec.org/user/jshaw">Shaw, J. H.</a> and <a
                    href="https://www.scec.org/user/hauksson">Hauksson, E.</a>, CFM Version 5.1: New and revised 3D
            fault representations and an improved database, 2016 SCEC Annual Meeting Proceedings &amp; Abstracts, XXVI,
            poster 003, p.222-223 (2016).&nbsp; <a href="https://www.scec.org/publication/6768">SCEC Contribution
                6768</a></li>
        <li><a href="https://www.scec.org/user/jshaw">Shaw, J. H.</a>, <a href="https://www.scec.org/user/plesch">Plesch,
                A.</a>, <a href="https://www.scec.org/user/carltape">Tape, C.</a>, Suess, M., <a
                    href="https://www.scec.org/user/tjordan">Jordan, T. H.</a>, <a
                    href="https://www.scec.org/user/gely">Ely, G.</a>, <a href="https://www.scec.org/user/hauksson">Hauksson,
                E.</a>,&nbsp;<a href="https://www.scec.org/user/jtromp">Tromp, J.</a>, <a
                    href="https://www.scec.org/user/toshiro">Tanimoto, T.</a>, <a
                    href="https://www.scec.org/user/rgraves">Graves, R.</a>, <a
                    href="https://www.scec.org/user/kbolsen">Olsen, K.</a>, <a
                    href="https://www.scec.org/user/nicholson">Nicholson, C.</a>, <a
                    href="https://www.scec.org/user/maechlin">Maechling, P. J.</a>, <a
                    href="https://www.scec.org/user/rivero">Rivero, C.</a>, <a href="https://www.scec.org/user/plovely">Lovely,
                P.</a>, <a href="https://www.scec.org/user/brankman">Brankman, C. M.</a>, &amp; Munster, J. (2015).
            Unified Structural Representation of the southern California crust and upper mantle. Earth and Planetary
            Science Letters, 415, 1-15. <a href="https://dx.doi.org/10.1016/j.epsl.2015.01.016">doi:
                10.1016/j.epsl.2015.01.016</a>. <a href="https://www.scec.org/publication/2068">SCEC Contribution
                2068</a></li>
    </ul>


    </p>
</div>
</body>
</html>