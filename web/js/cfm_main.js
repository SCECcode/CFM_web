var viewermap;

jQuery(document).ready(function() {

  frameHeight=window.innerHeight;
  frameWidth=window.innerWidth;

  viewermap=setup_viewer();

  $("#view3d-all").on('click',function() {
     $('#view3DIfram').attr('src',"http:localhost:9999/?name=[WTRA-USAV-INDH-Indian_Hill_fault-CFM5.stl,WTRA-USAV-SNJH-San_Jose_fault-CFM5.stl,WTRA-USAV-UPLD-Upland_fault_dipslip-CFM1.stl,WTRA-USAV-WLNC-Walnut_Creek_fault-CFM5.stl]&url=[http://localhost:9999/cfm_data/WTRA-USAV-INDH-Indian_Hill_fault-CFM5.stl,http://localhost:9999/cfm_data/WTRA-USAV-SNJH-San_Jose_fault-CFM5.stl,http://localhost:9999/cfm_data/WTRA-USAV-UPLD-Upland_fault_dipslip-CFM1.stl,http://localhost:9999/cfm_data/WTRA-USAV-WLNC-Walnut_Creek_fault-CFM5.stl]");
  });

// special handle keyword's input completion
  $('#keywordTxt').on("focus", function() {
     $('#keywordTxt').on("mouseout", function() {
       window.console.log("XXX in keyword input after mouseout ->", $(this).val());
       if( $(this).val() != '' ) {
        searchByKeyword();
       }
       $('#keywordTxt').off("mouseout");
       $('#keywordTxt').blur();
     });
  });

  $('.strike-item').on("focus", function() {
     $('.strike-item').on("mouseout", function() {
       if( $(this).val() != '' ) {
         setupSearchByStrike();
       }
       $('.strike-item').off("mouseout");
       $(this).blur();
     });
  });

  $('.dip-item').on("focus", function() {
     $('.dip-item').on("mouseout", function() {
       if( $(this).val() != '' ) {
         setupSearchByDip();
       }
       $('.dip-item').off("mouseout");
       $(this).blur();
     });
  });

  $('.latlon-item').on("focus", function() {
     $('.latlon-item').on("mouseout", function() {
       if( $(this).val() != '' ) {
         searchByLatlon(0);
       }
       $('.latlon-item').off("mouseout");
       $(this).blur();
     });
  });
  
  
  getGeoTraceList();
  getAllTraces();
  setupSearch();
//XXX no need for this..  addFaultColorsSelect();
  addDownloadSelect();
  setup_info3dTable();
  setup_warn3dTable();

  $("#search-filter-type").change(function () {
      var funcToRun = $(this).val();
      if (funcToRun != "") {
          window[funcToRun]();
      }
  });

  $("#search-filter-type").trigger("change");

}); // end of MAIN



