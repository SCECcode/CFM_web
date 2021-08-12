<?php
require_once("php/navigation.php");
$header = getHeader("Introduction");
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
    <title>Community Fault Model Viewer: Introduction</title>
</head>
<body>
<?php echo $header; ?>

<div class="container info-page-container scec-main-container">

    <h1>Introduction</h1>

    <div>
		<p> The faults of the <a href="https://www.scec.org/research/cfm">SCEC Community Fault Model (CFM)</a> are three-dimensional and non-planar; however, to simplify browsing the model, the viewer provides a two-dimensional map-based view of the SCEC CFM version 5.3 preferred fault set. The alternative fault representations are only provided in the complete CFM archive available for download on the <a href="https://www.scec.org/research/cfm">CFM homepage</a>. The viewer allows users to view and download fault geometry data as well as metadata for selected faults rather than downloading the entire CFM model archive. Once faults are selected, the “PLOT3D” button can be used to view the selected faults in a basic CAD-like environment. See the user guide for more details and site usage instructions.
               </p>
    </div>
</div>
</body>
</html>
