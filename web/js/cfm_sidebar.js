/**

  cfm_sidebar.js

**/

var system_sidebar=false;
var region_sidebar=false;
var section_sidebar=false;
var name_sidebar=false;
var keyword_sidebar=false;
var latlon_sidebar=false;
var strike_sidebar=false;
var dip_sidebar=false;
var gid_sidebar=false;

var drawing_rectangle=false;

// initiate a click on the sidebar buttons
// to dismiss the sidebar
function dismiss_sidebar() {
  clear_popup(); 
  if(region_sidebar) regionClick();
  if(section_sidebar) sectionClick();
  if(system_sidebar) systemClick();
  if(name_sidebar) nameClick();
  if(keyword_sidebar) keywordClick();
  if(latlon_sidebar) latlonClick();
  if(strike_sidebar) strikeClick();
  if(dip_sidebar) dipClick();
  if(gid_sidebar) gidClick();
}

// system sidebar js

// slide out
function systemClick() {
  if(!system_sidebar) { dismiss_sidebar(); }

  system_sidebar = !system_sidebar;
  if(system_sidebar) {
    sidebar_system_slideOut();
    $('#systemBtn').addClass('pick');
    } else {
      sidebar_system_slideIn();
      $('#systemBtn').removeClass('pick');
  }
}

function sidebar_system_slideOut() {
  if (jQuery('#system').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#system');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_system_slideIn() {
  if (jQuery('#system').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#system');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}


// region sidebar
// slide out
function regionClick() {
  if(!region_sidebar) { dismiss_sidebar(); }

  region_sidebar = !region_sidebar;
  if(region_sidebar) {
    sidebar_region_slideOut();
    $('#regionBtn').addClass('pick');
    } else {
      sidebar_region_slideIn();
      $('#regionBtn').removeClass('pick');
  }
}

function sidebar_region_slideOut() {
  if (jQuery('#region').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#region');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_region_slideIn() {
  if (jQuery('#region').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#region');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}


// section sidebar js
// slide out
function sectionClick() {
  if(!section_sidebar) { dismiss_sidebar(); }

  section_sidebar = !section_sidebar;
  if(section_sidebar) {
    sidebar_section_slideOut();
    $('#sectionBtn').addClass('pick');
    } else {
      sidebar_section_slideIn();
      $('#sectionBtn').removeClass('pick');
  }
}

function sidebar_section_slideOut() {
  if (jQuery('#section').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#section');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_section_slideIn() {
  if (jQuery('#section').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#section');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}

// name sidebar js
// slide out
function nameClick() {
  if(!name_sidebar) { dismiss_sidebar(); }

  name_sidebar = !name_sidebar;
  if(name_sidebar) {
    sidebar_name_slideOut();
    $('#nameBtn').addClass('pick');
    } else {
      sidebar_name_slideIn();
      $('#nameBtn').removeClass('pick');
  }
}

function sidebar_name_slideOut() {
  if (jQuery('#name').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#name');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_name_slideIn() {
  if (jQuery('#name').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#name');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}


// keyword sidebar js
// slide out
function keywordClick() {
  if(!keyword_sidebar) { dismiss_sidebar(); }

  keyword_sidebar = !keyword_sidebar;
  if(keyword_sidebar) {
    sidebar_keyword_slideOut();
    $('#keywordBtn').addClass('pick');
    } else {
      sidebar_keyword_slideIn();
      $('#keywordBtn').removeClass('pick');
  }
}

function sidebar_keyword_slideOut() {
  if (jQuery('#keyword').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#keyword');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_keyword_slideIn() {
  if (jQuery('#keyword').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#keyword');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}

// strike sidebar js
// slide out
function strikeClick() {
  if(!strike_sidebar) { dismiss_sidebar(); }

  strike_sidebar = !strike_sidebar;
  if(strike_sidebar) {
    sidebar_strike_slideOut();
    $('#strikeBtn').addClass('pick');
    } else {
      sidebar_strike_slideIn();
      $('#strikeBtn').removeClass('pick');
  }
}

function sidebar_strike_slideOut() {
  if (jQuery('#strike').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#strike');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_strike_slideIn() {
  if (jQuery('#strike').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#strike');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}


// dip sidebar js
// slide out
function dipClick() {
  if(!dip_sidebar) { dismiss_sidebar(); }

  dip_sidebar = !dip_sidebar;
  if(dip_sidebar) {
    sidebar_dip_slideOut();
    $('#dipBtn').addClass('pick');
    } else {
      sidebar_dip_slideIn();
      $('#dipBtn').removeClass('pick');
  }
}

function sidebar_dip_slideOut() {
  if (jQuery('#dip').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#dip');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}

function sidebar_dip_slideIn() {
  if (jQuery('#dip').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#dip');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}

// latlon sidebar js
// slide out
function latlonClick() {
  if(!latlon_sidebar) { dismiss_sidebar(); }

  latlon_sidebar = !latlon_sidebar;
  if(latlon_sidebar) {
    sidebar_latlon_slideOut();
    $('#latlonBtn').addClass('pick');
    markLatlon();
    } else {
      // enable the popup on map
      sidebar_latlon_slideIn();
      $('#latlonBtn').removeClass('pick');
  }
}

function set_latlons(firstlat,firstlon,secondlat,secondlon) {
   // need to capture the lat lon and draw a rectangle
   if(latlon_sidebar && drawing_rectangle) {
       $( "#firstLatTxt" ).val(firstlat);
       $( "#firstLonTxt" ).val(firstlon);
       $( "#secondLatTxt" ).val(secondlat);
       $( "#secondLonTxt" ).val(secondlon);
   }
}

function draw_at()
{
   if(latlon_sidebar && drawing_rectangle) {
     drawRectangle();
   }
}

// need to capture the lat lon and draw a rectangle but
// not when in the map-marking mode : drawing_rectangle==true
function chk_and_add_bounding_rectangle() {
  
  if(drawing_rectangle) {
    return;
  }
  var firstlatstr=document.getElementById("firstLatTxt").value;
  var firstlonstr=document.getElementById("firstLonTxt").value;
  var secondlatstr=document.getElementById("secondLatTxt").value;
  var secondlonstr=document.getElementById("secondLonTxt").value;

  if(secondlatstr == "optional" && secondlonstr == "optional") {
    if(firstlatstr && firstlonstr) { // 2 values
       var t1=parseFloat(firstlatstr);
       var t2=parseFloat(firstlonstr);
       park_a=t1-0.001;
       park_b=t2-0.001;
       park_c=t1+0.001;
       park_d=t2+0.001;
       add_bounding_rectangle(park_a,park_b,park_c,park_d);
    } 
    } else {
       if(secondlatstr && secondlonstr) {
         if(firstlatstr && firstlonstr) { // 4 values
           park_a=parseFloat(firstlatstr);
           park_b=parseFloat(firstlonstr);
           park_c=parseFloat(secondlatstr);
           park_d=parseFloat(secondlonstr);
           add_bounding_rectangle(park_a,park_b,park_c,park_d);
         }
       }
  }
}

//dismiss all popup and suppress the popup on map
function sidebar_latlon_slideOut() {
  if (jQuery('#latlon').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#latlon');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}

function markLatlon() {
  if(skipPopup == false) { // enable marking
    clear_popup();
    skipPopup = true;
    drawing_rectangle=true;
    unbind_layer_popup();
    $('#markerBtn').css("color","red");
    } else {
       skipPopup = false;
       drawing_rectangle=false;
       skipRectangle();
       $('#markerBtn').css("color","blue");
       remove_bounding_rectangle_layer();
       rebind_layer_popup();
  }
}

function reset_markLatlon() {
  skipPopup = false;
  $('#markerBtn').css("color","blue");
  drawing_rectangle=false;
  skipRectangle();
  rebind_layer_popup();
  remove_bounding_rectangle_layer();
  reset_select_latlon();
}


// enable the popup on map
function sidebar_latlon_slideIn() {
  if (jQuery('#latlon').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#latlon');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
  reset_markLatlon();
}

// gid sidebar js
// slide out
function gidClick() {
  if(!gid_sidebar) { dismiss_sidebar(); }

  gid_sidebar = !gid_sidebar;
  if(gid_sidebar) {
    sidebar_gid_slideOut();
    $('#gidBtn').addClass('pick');
    } else {
      sidebar_gid_slideIn();
      $('#gidBtn').removeClass('pick');
  }
}

function sidebar_gid_slideOut() {
  if (jQuery('#gid').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#gid');
  var sidebarptr=$('#sidebar');
  panelptr.css("display","");
  sidebarptr.css("display","");
  panelptr.removeClass('fade-out').addClass('fade-in');
}
function sidebar_gid_slideIn() {
  if (jQuery('#gi').hasClass('menuDisabled')) {
    // if this menu is disabled, don't slide
    return;
  }
  var panelptr=$('#gid');
  panelptr.removeClass('fade-in').addClass('fade-out');
  panelptr.css("display","none");
}
