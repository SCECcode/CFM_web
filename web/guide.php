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
    <title>Community Fault Model Explorer: User Guide</title>
</head>
<body>
<?php echo $header; ?>

<div class="container info-page-container scec-main-container guide">

    <h1>CFM Explorer User Guide</h1>

    <div class="row">
        <div class="col-12">
            <figure class="cfm-interface figure float-lg-right">
                <img src="img/cfm-explorer.png" class="figure-img img-fluid" alt="Screen capture of CFM Explorer interface">
                <figcaption class="figure-caption">Screen capture of CFM Explorer interface</figcaption>
            </figure>
            <h4><strong>Community Fault Model (CFM) Explorer Overview</strong></h4>

            <p>The CFM Explorer provides interactive map-based and 3D views of the <a
               href="https://www.scec.org/research/cfm">CFM version 7.0, 6.1 and 5.3</a>
	       faults. The explorer allows users to select the model of interest (using
	       the buttons at the top of the interface), view faults,
	       associated metadata, and download selected fault data without having 
	       to download the entire CFM model archive. The pages on this site 
               include the 
               <a href="<?php echo $host_site_actual_path; ?>">CFM explorer page</a>, 
               this user guide, <a href="cite">citing usage of this dataset</a>, <a href="disclaimer">a disclaimer</a>, and a
               <a href="contact">contact information</a> page.</p>

            <p>The main interface is on the <a href="<?php echo $host_site_actual_path; ?>">
               Explorer Page</a>. When first loaded, all CFM6.1 preferred faults are listed 
               on the left side of 
               the screen. Users can click on the checkboxes in the fault table to select faults 
               or click on faults on the map. (See <strong>Viewing and Downloading Metadata</strong>
               below for more details.) Click on the eye icon 
               (<span class="glyphicon glyphicon-eye-open"></span>) to hide/show a fault.</p>

            <p>
                The interactive map on the right displays the geographic extent of each fault, 
                with dashed lines indicating blind faults. In the top right corner of the interactive 
                map, there is a pull-down menu that allows the base map to be changed. By default, 
                the map shown is 
                <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">
                ESRI Topographic</a>. The other map types are: 
                <a href="https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer">ESRI National Geographic</a>,
                <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">ESRI Imagery</a>,
                <a href="https://opentopomap.org">OTM Topographic</a>, and
                <a href="https://www.openstreetmap.org">OSM Street</a>.</p>
	    <p>The map interface has a small default size, but the map interface can be resized 
	       by clicking on the black dashed square icon located in the bottom right corner of 
	       the interface. Three size options are available, small (default), medium, and 
	       full-screen. The medium and full-screen sizes hide some of the tools, so these 
	       options are provided for visualization purposes and are not intended to be used 
               when querying the model for download</p>

            <p><i>To report any bugs or issues, please see the <a href="contact">contact page</a>.</i></p>

            <h4><strong>Searching/Querying the CFM</strong></h4>

            <p> The CFM explorer web tool provides a number of search criteria, including keyword,
                latitude/longitude, fault area, fault zone, section, and name. Users can also filter
                results by the average strike and/or dip of fault objects. Once a search type is selected,
                controls will appear below in the form of another dropdown, text input boxes, or sliders.
                Because CFM faults are non-planar, the average strike and dip values are calculated from 
                the area-weighted normal vectors for all triangles comprising a given surface. 
		Area weighting accounts for the differing triangular element sizes/shapes. The average 
		strike and dip values therefore do not completely describe the non-planar CFM fault 
                surfaces and are only provided for searching/sorting purposes.</p>

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

            <p> Metadata files in CSV format and tsurf (.ts) files are available for download from this site. 
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
                to view CFM fault surfaces in their native 3D environment (UTM zone 11, NAD27 datum). This tool is not
                designed to replace fully-functional CAD software. Refer to the 
                <a href="https://www.scec.org/research/cfm">CFM homepage</a> for information about recommended
                software. This tool currently does not have the ability to plot 3D axes, and a map scale in 3D
                is not very useful because any scale would only be valid at one given distance from the viewer. 
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
                Mercator projection (UTM) zone 11, North American datum 1927 (NAD27).</p>

            <h4><strong>Viewing Relocated Seismicity</strong></h4>

             <p> In the top of the 2D map interface, there is a “Load relocated seismicity” 
		 button that allows users to visualize seismicity catalogs in the map interface. 
		 These are large datasets, so loading the relocated seismicity may take a minute or 
                 more depending on your connection speed.

		 The seismicity consists of a combination of the Hauksson et al. (2012, and updates) 
		 and Waldhauser (2009) catalogs. The catalogs have been cropped to avoid any overlap. 
		 Once loaded, you can color the relocated seismicity by depth.
		 Significant historic earthquakes (M6+) will be shown on the map interface with red dots.
		 If you mouse over the dots, the year and magnitude will be displayed. The significant 
		 earthquakes can be toggled on/off by clicking on the eyeball icon next to the seismicity
                 pull down menu at the top of the map interface.

             <p> The Hauksson et al. (2012) and Waldhauser (2009) relocated catalogs can also be viewed
                 in 3D using the plot3D option. Once faults have been selected on the map interface and
                 the plot3D button is clicked, the 3D interface loads. There is a button labeled 
                 “Relocated Seismicity Off” at the top that can be clicked on to display the hypocenters
		 of the Hauksson et al. (2012) and Waldhauser (2009( relocated catalogs.  Many of the CFM
                 surfaces are based partly on relocated 
                 seismicity, so this feature allows users to see how the CFM faults relate to seismicity
                 in a 3D interactive environment.</p>

             <p> The Hauksson et al. (2012) catalogs are available at:
		 <a href="https://scedc.caltech.edu/data/alt-2011-dd-hauksson-yang-shearer.html">https://scedc.caltech.edu/data/alt-2011-dd-hauksson-yang-shearer.html</a>.<br>
                 The Waldhauser (2009) catalogs are available at:
		 <a href="https://nocaldd.ldeo.columbia.edu/">https://nocaldd.ldeo.columbia.edu/</a>.</p>

            <h4><strong>KML/KMZ Uploader</strong></h4>
	     <p>Users can now upload their own Google Earth kml/kmz files for display on the 2D map
		interface. This is intended to allow users to compare their own data to the CFM. 
                The kml/kmz uploader currently supports point/line data (kml/kmz) and image overlays (kmz only). 
	       If you discover a kml/kmz file that will not display correctly, please contact us
               at <nobr>scec-cfm-l@usc.edu</nobr>.</p>

            <h4><strong>Hierarchical Naming Structure</strong></h4>

             <p> Fault objects are named based on a hierarchical naming structure. To facilitate users 
                 that wish to automate identification of CFM fault objects, each portion of the hierarchical
                 naming structure is separated by a hyphen (-), and all names contain the five components 
                 listed below. For example,</p>
             
             <dl>
                 Object name: SAFS-SAFZ-CHLM-San_Andreas_fault-CFM6
                 <ul>
                 <li>Fault area: SAFS</li>
                 <li>Fault zone: SAFZ</li>
                 <li>Fault section: CHLM(Cholame)</li>
                 <li>Fault name: San Andreas Fault</li>
                 <li>CFM Version when added or last updated: CFM6</li>
                 </ul>
             </dl>

            <h4><strong>Browser Requirements</strong></h4>
            <p>This site supports the latest versions of <a href="https://www.mozilla.org/en-US/firefox/">Firefox</a>, <a href="https://www.google.com/chrome/">Chrome</a>, <a href="https://www.apple.com/safari/">Safari</a>, and <a href="https://www.microsoft.com/en-us/windows/microsoft-edge">Microsoft Edge</a>.</p>

            <p> More information including a complete model archive; can be found at:
                <a href="https://www.scec.org/research/cfm">https://www.scec.org/research/cfm</a>.</p>

            </p>
        </div>
    </div>
</body>
</html>
