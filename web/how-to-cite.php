<?php
require_once("php/navigation.php");
$header = getHeader("cite");
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

    <script type='text/javascript' src='js/vendor/popper.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery.min.js'></script>
    <script type='text/javascript' src='js/vendor/bootstrap.min.js'></script>
    <script type='text/javascript' src='js/vendor/jquery-ui.js'></script>
    <title>Community Fault Model Explorer: How to Cite</title>

    <style>
        ul.dois li {
            list-style: outside;
        }
    </style>
</head>
<body>
<?php echo $header; ?>

<div class="container info-page-container scec-main-container">

    <h1>How to Cite</h1>

    <div>
        <p>
  To ensure proper credit for the development and use of SCEC Community Earth Models, we kindly request that you cite the specific model(s) you utilize in your research or for other applications. This helps track usage and acknowledge the contributions of the many model developers and researchers, who have invested significant effort and expertise to advance SCEC Community Earth Models.
Most models have Digital Object Identifiers (DOIs) on Zenodo.  The citation is typically located in a gray box labeled "Citation" on the right side of the Zenodo page. Use the links below to find the appropriate citation:

        </p>
        <ul class="dois">
<li><a target="_blank" href="https://doi.org/10.5281/zenodo.4651667">Community Fault Model (CFM) </a></li>
<li><a target="_blank" href="https://zenodo.org/doi/10.5281/zenodo.4926527">Community Geodetic Model (CGM)</a></li>
<li><a target="_blank" href="https://zenodo.org/doi/10.5281/zenodo.4579626">Community Rheology Model (CRM)</a></li>
<li><a target="_blank" href="https://zenodo.org/doi/10.5281/zenodo.8270630">Community Stress Model (CSM)</a></li>
<li><a target="_blank" href="https://zenodo.org/doi/10.5281/zenodo.4010833">Community Thermal Model (CTM)</a></li>
<li><a target="_blank" href="https://zenodo.org/doi/10.5281/zenodo.5651276">Community Velocity Model (CVM)</a></li>
<li><a target="_blank" href="https://zenodo.org/doi/10.5281/zenodo.5651276">Unified Community Velocity Model (UCVM)</a></li>
        </ul>

    </div>


</div>

<p>&nbsp;</p>
</body>
</html>
