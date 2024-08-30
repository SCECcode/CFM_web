var viewermap;

function initializeViewer() {
    /** MAIN setup **/

    getGeoTraceList();
    getAllTraces();
    highlight_database_type();
    setupSearch();
    addDownloadSelect();
    setup_info3dTable();
    setup_warn3dTable();
    setup_externalTSList();

}

jQuery(document).ready(function() {

  frameHeight=window.innerHeight;
  frameWidth=window.innerWidth;

  var uagent = navigator.userAgent.toLowerCase();

  window.console.log("WHAT am I !! >>> "+uagent);
  window.console.log("screen width..("+screen.width+") and frame width..",frameWidth);

//if (navigator.userAgentData.mobile) { // do something }

  if( screen.width <= 480 ) {
    window.console.log("OH NO.. I am on Mini.."+screen_width);
    //location.href = '/mobile.html';
  }

  viewermap=setup_viewer();
  let requestedModel = getDBFromRequestParam("model");
  if (requestedModel !== false) {
      currentModel = requestedModel;
  }

/****
  $("#view3d-all").on('click',function() {
     $('#view3DIfram').attr('src',"http:localhost:9999/?name=[WTRA-USAV-INDH-Indian_Hill_fault-CFM5.stl,WTRA-USAV-SNJH-San_Jose_fault-CFM5.stl,WTRA-USAV-UPLD-Upland_fault_dipslip-CFM1.stl,WTRA-USAV-WLNC-Walnut_Creek_fault-CFM5.stl]&url=[http://localhost:9999/cfm_data/WTRA-USAV-INDH-Indian_Hill_fault-CFM5.stl,http://localhost:9999/cfm_data/WTRA-USAV-SNJH-San_Jose_fault-CFM5.stl,http://localhost:9999/cfm_data/WTRA-USAV-UPLD-Upland_fault_dipslip-CFM1.stl,http://localhost:9999/cfm_data/WTRA-USAV-WLNC-Walnut_Creek_fault-CFM5.stl]");
  });

needs to be able to handle this,
http://localhost:8081/?name=["SAFS-SAFZ-MULT-Garnet_Hill_fault_strand-CFM4"]&ts="500m"&ptype="main3d"
&fullFileURL=[data/external/SAFS-SAFZ-SBMT-Garnet_Hill_fault-YULE.ts]&fullName=[Garnet Hill fault YULE]
&state={"trace":true,"shore":true,"legend":true,"seismicity":0,"repr":0,"bounds":0,"full":false}&camera={"pos":[532716.5625,115697.8359375,-3757056.75],"angle":30,"viewup":[0,0,-1],"distance":124405.08505249023,"focal":[532716.5625,-8707.249114990234,-3757056.75]}
****/

// special handle keyword's input completion
  $('#keywordTxt').on("focus", function() {

     $('#keywordTxt').on("blur mouseout", function(event) {
       $('#keywordTxt').off("mouseout");
       $('#keywordTxt').off("blur");
       if( $(this).val() != '' ) {
        searchByKeyword();
       }
       $('#keywordTxt').blur();
     });
  });

  $('.strike-item').on("focus", function() {
     $('.strike-item').on("blur mouseout", function() {
       $('.strike-item').off("mouseout");
       $('.strike-item').off("blur");
       if( $(this).val() != '' ) {
         setupSearchByStrike();
       }
       $(this).blur();
     });
  });

  $('.dip-item').on("focus", function() {
     $('.dip-item').on("blur mouseout", function() {
       $('.dip-item').off("mouseout");
       $('.dip-item').off("blur");
       if( $(this).val() != '' ) {
         setupSearchByDip();
       }
       $(this).blur();
     });
  });

  $('.latlon-item').on("focus", function() {
     $('.latlon-item').on("blur mouseout", function() {
       $('.latlon-item').off("mouseout");
       $('.latlon-item').off("blur");
       if( $(this).val() != '' ) {
         searchByLatlon(0);
       }
       $(this).blur();
     });
  });

  $("#search-filter-type").change(function () {
      var funcToRun = $(this).val();
      if (funcToRun != "") {
          window[funcToRun]();
      }
  });

/*
  $('#modalkmlselect').on('hide.bs.modal', function (e) {
window.console.log(" >>> kml select's modal closed...");
// do something when the modal closes
//    kml_btn_blur();
  });
*/


// call modal, when sharelink-container got changed
//  const watchShareLink = document.getElementById("shareLink-container");
//  const shareObserver = new MutationObserver(function() {
//       console.log('callback that runs when observer is triggered');
//       $('#modalshare').modal('show');
//  });
//  shareObserver.observe(watchShareLink, {subtree: true, childList: true});

  $("#search-filter-type").trigger("change");

  $("form#id_select_dataset input").bind('click', function(e){
      switchModel($(this).data("db-name"));
  });


  initializeViewer();

}); // end of MAIN



