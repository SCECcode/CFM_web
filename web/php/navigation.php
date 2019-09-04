<?php
// this site will be hosted by reverse proxy so for some links we need to know
// the path we're actually hosted on
$host_site_actual_path = "/";
if (isset($_SERVER['HTTP_X_FORWARDED_SERVER'])) {
	// check that we're behind a proxy
	$host_site_actual_path = "/research/cfm-viewer/";
}


/**
 * Generate the navigation bar for all our pages
 */
function getHeader($this_page) {
	global $host_site_actual_path;

	$all_pages = [
		$host_site_actual_path => "Viewer",
		"guide" => "User Guide",
		"disclaimer" => "Disclaimer",
		"contact" => "Contact"
	];

	$page_links_html = "";
	foreach($all_pages as $url => $page) {
		$active = "";
		if (stripos($page, $this_page) !== false) {
			$active = "active";
		}
		$page_links_html .= <<<_END
		 <li class="nav-item $active">
			<a class="nav-link" href="${url}">${page}</a>
		</li>
_END;
	}
	$header = <<<_END
<div class="banner-container">
    <div class="container top">
        <nav class="navbar navbar-expand-lg navbar-dark  scec-header">
            <a class="navbar-brand" href="$host_site_actual_path"><img class="scec-logo" src="img/sceclogo_transparent.png">
                &nbsp;Community Fault Model Viewer (Beta)</a>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                $page_links_html
                </ul>
            </div>
        </nav>
    </div>
</div>
_END;

	return $header;
}


?>
