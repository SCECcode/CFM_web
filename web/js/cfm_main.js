var viewermap;

jQuery(document).ready(function() {

  frameHeight=window.innerHeight;
  frameWidth=window.innerWidth;

  viewermap=setup_viewer();

p $("#view3d-all").on('click'), function {
     $('#view3DIfram').attr('src',"https://kitware.github.io/paraview-glance/app/?name=202-t.glance&url=https://raw.githubusercontent.com/Kitware/paraview-glance/v3.0.1/data/202-t.glance");
  });

// special handle keyword's input completion
  $("#keywordTxt").keyup(function(event) {
        if (event.keyCode === 13) {
            searchByKeyword();
        }
  });     

// special handling latlon's input completion
  $("#firstLonTxt").keyup(function(event) {
        if (event.keyCode === 13) {
           var firstlatstr=document.getElementById("firstLatTxt").value;
           var firstlonstr=document.getElementById("firstLonTxt").value;
           if(firstlatstr && firstlonstr) {
               entered_latlon_by_hand();
           }
        }
  });     
  $("#firstLatTxt").keyup(function(event) {
        if (event.keyCode === 13) {
           var firstlatstr=document.getElementById("firstLatTxt").value;
           var firstlonstr=document.getElementById("firstLonTxt").value;
           if(firstlatstr && firstlonstr) {
               entered_latlon_by_hand();
           }
        }
  });     

  $("#secondLonTxt").keyup(function(event) {
        if (event.keyCode === 13) {
           var secondlatstr=document.getElementById("secondLatTxt").value;
           var secondlonstr=document.getElementById("secondLonTxt").value;
           if(secondlatstr && secondlonstr) {
               entered_latlon_by_hand();
           }
        }
  });     
  $("#secondLatTxt").keyup(function(event) {
        if (event.keyCode === 13) {
           var secondlatstr=document.getElementById("secondLatTxt").value;
           var secondlonstr=document.getElementById("secondLonTxt").value;
           if(secondlatstr && secondlonstr) {
               entered_latlon_by_hand();
           }
        }
  });     

  getGeoTraceList();
  getAllTraces();
  setupSearch();
  addFaultColorsSelect();
  addDownloadSelect();
    $("#search-type").change(function () {
        var funcToRun = $(this).val();
        if (funcToRun != "") {
            window[funcToRun]();
        }
    });

    $("#search-type").trigger("change");
}); // end of MAIN



