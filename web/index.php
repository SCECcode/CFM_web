<?php
require_once("php/navigation.php");
$header = getHeader("Viewer");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Community Fault Model Viewer (Beta)</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<?php echo $header; ?>

<div class="main">
<!-- TEST -->
    <div style="border:solid 1px green;background:red">
    <img class="scec-logo" src="img/sceclogo_transparent.png">
    </div>
    <div style="height:100%; width:100%; position: absolute; cursor: default;">
        <div style="position:absolute; top:0;left:10%;width:10%;height:10%;">
           <svg style="background:#f4f4f4;border:3px solid green;">
              <g>
                 <image class="scec-logo" width="60" height="40" href="img/sceclogo_transparent.png">
              </g>
           </svg>
        </div>
        <div style="position:absolute; top:100;left:0;width:50%;height:50%; border:solid 3px red">
          <svg style="position:absolute; top:30%; right:10%;width: 20%;height:20%; border:solid 2px red" version="1.1" baseProfile="full" width="150" height="150" viewBox="0 0 150 150">
              <g>
    <text x="10" y="10" dy="22" dx="12" id="11" fill="green">SCEC</text>
              </g>
          </svg>
        </div>
    </div>

</div>
</body>
</html>
