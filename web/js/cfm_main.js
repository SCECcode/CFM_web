var viewermap;

jQuery(document).ready(function() {

  frameHeight=window.innerHeight;
  frameWidth=window.innerWidth;

  viewermap=setup_viewer();

  $("#view3d-all").on('click',function() {
     $('#view3DIfram').attr('src',"http:localhost:9999/?name=[WTRA-USAV-INDH-Indian_Hill_fault-CFM5.stl,WTRA-USAV-SNJH-San_Jose_fault-CFM5.stl,WTRA-USAV-UPLD-Upland_fault_dipslip-CFM1.stl,WTRA-USAV-WLNC-Walnut_Creek_fault-CFM5.stl]&url=[http://localhost:9999/cfm_data/WTRA-USAV-INDH-Indian_Hill_fault-CFM5.stl,http://localhost:9999/cfm_data/WTRA-USAV-SNJH-San_Jose_fault-CFM5.stl,http://localhost:9999/cfm_data/WTRA-USAV-UPLD-Upland_fault_dipslip-CFM1.stl,http://localhost:9999/cfm_data/WTRA-USAV-WLNC-Walnut_Creek_fault-CFM5.stl]");
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
  setup_info3dTable();
  $("#search-type").change(function () {
      var funcToRun = $(this).val();
      if (funcToRun != "") {
          window[funcToRun]();
      }
  });

  $("#search-type").trigger("change");

}); // end of MAIN



