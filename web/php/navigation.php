<?php

/**
 * Generate the navigation bar for all our pages
 */
function getHeader($this_page) {
	$all_pages = [
		"viewer" => "Viewer",
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
            <a class="navbar-brand" href="index.php"><img class="scec-logo" src="img/sceclogo_transparent.png">
                &nbsp;Community Fault Model Viewer</a>
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