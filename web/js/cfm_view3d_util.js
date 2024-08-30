/**
   cfm_view3d_util.js

***/

var viewerType="CFM";
var viewUID=0;

function reset_search_selection() {
   $("#search-filter-type").val("dismissClick");
   dismiss_sidebar();
}

/*********************************/
// this is for the external ts files

var EXTERNAL_TS_LIST=[];
var EXTERNAL_TS_NAME=[];
var EXTERNAL_COLOR_MODE=1; // default true

var STOCK_EXTERNAL_TS_LIST = [
{'url':'data/external/BNRA-BMFZ-MULT-Black_Mountain_fault.ts', 'name':'2: Black Mountain fault', 'selected':0},
{'url':'data/external/BNRA-SDVZ-MULT-Southern_Death_Valley_fault-low_dip-CFM2.ts', 'name':'2: Southern Death Valley fault low dip', 'selected':0},
{'url':'data/external/ETRA-NFTS-EAST-Eastern_North_Frontal_fault-vertical-CFM5.ts', 'name':'2: Eastern North Frontal fault vertical', 'selected':0},
{'url':'data/external/ETRA-NFTS-EAST-North_Frontal_fault-west-steep-CFM5.ts', 'name':'2: North Frontal fault west steep', 'selected':0},
{'url':'data/external/ETRA-NFTS-WEST-North_Frontal_Thrust_fault-steep-CFM5.ts', 'name':'2: North Frontal Thrust fault steep', 'selected':0},
{'url':'data/external/OCBA-IBFS-SMBY-Santa_Monica_Bay_fault_west-CFM5.ts', 'name':'2: Santa Monica Bay fault west', 'selected':0},
{'url':'data/external/OCBA-OCSD-OCNS-Oceanside_detachment-RVRO-CFM1.ts','name':'2: Oceanside detachment RVRO', 'selected':0},
{'url':'data/external/OCBA-PVFZ-MULT-Palos_Verdes_fault-WOLFE-CFM5.ts', 'name':'2: Palos Verdes fault WOLFE', 'selected':0},
{'url':'data/external/OCBA-SMBS-RDNC-Redondo_Canyon_fault-WOLFE-CFM5.ts','name':'2: Redondo Canyon fault WOLFE', 'selected':0},
{'url':'data/external/OCBA-SMCS-SONO-San_Onofre-Carlsbad_fault-RVRO-CFM1.ts','name':'2: San Onofre Carlsbad fault RVRO', 'selected':0},
{'url':'data/external/PNRA-ELSZ-WHIT-Whittier_fault-CFM2.ts','name':'2: Whittier fault', 'selected':0},
{'url':'data/external/SAFS-SAFZ-MULT-Banning_fault-YULE.ts','name':'2: Banning fault YULE', 'selected':0},
{'url':'data/external/SAFS-SAFZ-MULT-San_Andreas_fault-FUIS-CFM3.ts','name':'2: San Andreas fault FUIS', 'selected':0},
{'url':'data/external/SAFS-SAFZ-SBMT-Garnet_Hill_fault-YULE.ts','name':'2: Garnet Hill fault YULE', 'selected':0},
{'url':'data/external/SAFS-SGPR-MTSJ-Potatochip1_blind_fault-extended-CRNA-CFM5.ts','name':'2: Potatochip1 blind fault extended CRNA', 'selected':0},
{'url':'data/external/SAFS-SGPR-MTSJ-Potatochip2_blind_fault-extended-CRNA-CFM5.ts','name':'2: Potatochip2 blind fault extended CRNA', 'selected':0},
{'url':'data/external/SAFS-SGPR-SGPS-San_Gorgonio_Pass_thrust+NPS-CRNA-CFM5.ts','name':'2: San Gorgonio Pass thrust CRNA', 'selected':0},
{'url':'data/external/SAFS-SGRP-SGPS-San_Gorgonio_Pass_fault-YULE.ts','name':'2: San Gorgonio Pass fault YULE', 'selected':0},
{'url':'data/external/SNFA-PMVZ-MULT-Panamint_Valley_fault-lowdip-CFM2.ts','name':'2: Panamint Valley fault lowdip', 'selected':0},
{'url':'data/external/WTRA-NCVS-PPTV-Pitas_Point_Ventura_fault_link-DON-CFM5.ts','name':'2: Pitas Point Ventura fault link DON', 'selected':0},
{'url':'data/external/WTRA-NCVS-PPTV-Pitas_Point_fault-east-DON-CFM5.ts','name':'2: Pitas Point fault east DON', 'selected':0},
{'url':'data/external/WTRA-NCVS-PPTV-Pitas_Point_fault-east-HBRD-CFM5.ts','name':'2: Pitas Point fault east HBRD', 'selected':0},
{'url':'data/external/WTRA-NCVS-PPTV-Pitas_Point_fault-east-splay-DON-CFM5.ts','name':'2: Pitas Point fault east splay DON', 'selected':0},
{'url':'data/external/WTRA-NCVS-RDMT-Red_Mountain-Rincon_fault-HBRD-CFM5.ts','name':'2: Red Mountain Rincon fault HBRD', 'selected':0},
{'url':'data/external/WTRA-NCVS-VNTB-Southern_San_Cayetano_fault-HBRD-CFM5.ts', 'name':'2: Southern San Cayetano fault HBRD', 'selected':0},
{'url':'data/external/WTRA-NCVS-VNTB-Ventura_fault-DON-CFM5.ts','name':'2: Ventura fault DON', 'selected':0},
{'url':'data/external/WTRA-ORFZ-OFFS-Mid_Channel_fault-DON-CFM5.ts','name':'2: Mid Channel fault DON', 'selected':0},
{'url':'data/external/WTRA-SBTS-SMMT-Santa_Monica_thrust_fault-CFM1.ts','name':'2: Santa Monica thrust fault', 'selected':0},
{'url':'data/external/WTRA-SCFZ-MULT-San_Cayetano_fault-60dip-CFM5.ts','name':'2: San Cayetano fault 60dip', 'selected':0},
{'url':'data/external/WTRA-SFFS-SMMT-Malibu_Coast_fault-CFM4.ts','name':'2: Malibu Coast fault', 'selected':0},
{'url':'data/external/WTRA-SFNS-VRDM-Eagle_Rock_fault-south-dip-CFM2.ts','name':'2: Eagle Rock fault south dip', 'selected':0},
{'url':'data/external/WTRA-SFNS-VRDM-Verdugo_fault-lowdip-CFM4.ts','name':'2: Verdugo fault lowdip', 'selected':0},
{'url':'data/external/WTRA-SMFZ-CCMG-Cucamonga_fault-alt1-CFM4.ts','name':'2: Cucamonga fault alt1', 'selected':0},
{'url':'data/external/WTRA-SMFZ-SMDS-Sierra-Madre_fault-steep-CFM4.ts', 'name':'2: Sierra Madre fault steep', 'selected':0},
{'url':'data/external/WTRA-SPJD-SPMT-Sisar_detachment-CFM5.ts', 'name':'2: Sisar detachment', 'selected':0},
{'url':'data/external/WTRA-SSRZ-MULT-Simi-Santa_Rosa_fault-steep-CFM5.ts','name':'2: Simi Santa Rosa fault steep', 'selected':0},
{'url':'data/external/WTRA-SYFZ-MULT-Santa_Ynez_fault-60dip-CFM5.ts', 'name':'2: Santa Ynez fault 60dip', 'selected':0}];


function toggleTSList() {
    let elt=document.getElementById("externalTSList");
    if(elt.style.display == 'none') {
       elt.style.display='block';
       } else {
          elt.style.display='none';
    }
}

// use the fault list from php backend, generate the form html
function setup_externalTSList() {
    var html= "";
    let sz=STOCK_EXTERNAL_TS_LIST.length;
    for( let i=0; i< sz; i++) {
       let s=STOCK_EXTERNAL_TS_LIST[i];
       let name=s['name'];
       let label="TS_id_"+i;
       html=html+ "<button class=\"btn btn-small cfm-small-btn\" title=\"select this fault\" onclick=\"selectExternalTS("+i+")\"> " +"<span id=\""+label+"\" class=\"glyphicon glyphicon-unchecked\"></span></button>&nbsp"+name+"<br>";
    }
    document.getElementById("externalTSList").innerHTML =html;
}


// force not to use evaluation color schema (gold/blue)
function disableEvalColorMode() {
    let $btn=$(`#evalBtn`);
    EXTERNAL_COLOR_MODE = !EXTERNAL_COLOR_MODE;
    if(EXTERNAL_COLOR_MODE) {
      $btn.css( "color", "#C22B48" );
      } else {
        $btn.css( "color", "black" );
    }
}

function reset_select_external() {
    EXTERNAL_COLOR_MODE=1;
    let $btn=$(`#evalBtn`);
    $btn.css( "color", "#C22B48" );
    let sz=STOCK_EXTERNAL_TS_LIST.length;
    for( let i=0; i< sz; i++) {
       let s=STOCK_EXTERNAL_TS_LIST[i];
       let name=s['name'];
       if(s['selected'] == 1) {
         selectExternalTS(i);
         // uncheck all
         let label="TS_id_"+i;
         let $chk=$(`#${label}`);
         if($chk.hasClass('glyphicon-check')) {
           $chk.removeClass('glyphicon-check').addClass('glyphicon-unchecked');
         }
       }
    }
}

// from external json file
// format, 'fault name','fault url'
function setExternalTSFile(_files) {

  // only use the first one 
  if( _files == undefined ) {
    throw new Error("local file must be a File object type!");
  }
  let _file=_files[0];
  if(!( _file instanceof File)) {
    throw new Error("local file must be a File object type!");
  } 

  var reader = new FileReader();

  reader.onload=function(event) {
    var result= reader.result;
    EXTERNAL_TS_NAME.push(_file.name);

    window.console.log("HERE uploaded filename is ",_file.name);

// 



  };
  reader.readAsText(_file);
}

function collectExternalTS() {
  EXTERNAL_TS_LIST=[];
  EXTERNAL_TS_NAME=[];
  let sz= STOCK_EXTERNAL_TS_LIST.length;
  for(let i=0; i<sz; i++) {
    let s= STOCK_EXTERNAL_TS_LIST[i];
    if(s['selected'] == 1) {
      EXTERNAL_TS_LIST.push(s['url']);
      EXTERNAL_TS_NAME.push(s['name']);
    }
  }
}

function selectExternalTS(idx) {
  let s=STOCK_EXTERNAL_TS_LIST[idx];
  let label="TS_id_"+idx;

  let $chk=$(`#${label}`);
  if($chk.hasClass('glyphicon-check')) {
    $chk.removeClass('glyphicon-check').addClass('glyphicon-unchecked');
    } else if($chk.hasClass('glyphicon-unchecked')) {
      $chk.removeClass('glyphicon-unchecked').addClass('glyphicon-check');
  }

  if(s['selected']== 0) {
     s['selected']=1;
     } else { 
        s['selected']=0;
  }

}

function selectExternalTSByName(name) {
  let sz= STOCK_EXTERNAL_TS_LIST.length;
  for(let i=0; i<sz; i++) {
    let s= STOCK_EXTERNAL_TS_LIST[i];
    if(s['name'] == name) {
      selectExternalTS(i);
    }
  }
}

// from commandline via PresetMode commandline..
//  "[..,..]"
function setExternalTS(fullname, fullfileurl) {

   let nn=fullname.substring(1,fullname.length-1);
   let ff=fullfileurl.substring(1,fullfileurl.length-1);

   let local_ts_list=ff.split(',');
   let local_name_list=nn.split(',');
   let sz= local_name_list.length;
   for(let i=0; i<sz; i++) {
     let name=local_name_list[i];
     selectExternalTSByName(name);
   }
}

function get_external_TS() { 
  let tsstr;
  let nmstr; 

  collectExternalTS();

  if(EXTERNAL_TS_LIST.length == 0 || EXTERNAL_TS_NAME.length == 0) {
    return 0;
  }
  if(EXTERNAL_TS_LIST.length > 0) {
     var str=EXTERNAL_TS_LIST.toString();
     tsstr="["+str+"]";
  }
  if(EXTERNAL_TS_NAME.length > 0) {
     var str=EXTERNAL_TS_NAME.toString();
     nmstr="["+str+"]";
  }

  let estr="&fullFileURL="+tsstr+"&fullName="+nmstr;
  if(EXTERNAL_COLOR_MODE) {
    estr=estr+"&eval=1";
  }
  return estr;
}


/*********************************/
// this is to collect up all the names used
// in composing the selected faults
// for modal popup
var MODAL_TS_LIST=[];
var MODAL_TS_NAME=[];
var MODAL_TS_PATH=null;

function clear_MODAL_TS_LIST()
{
  MODAL_TS_LIST=[];
  MODAL_TS_NAME=[];
  MODAL_TS_PATH=null;
}

function save_MODAL_TS_LIST(name,url)
{
// https://s3-us-west-2.amazonaws.com/files.scec.org/s3fs-public/projects/cfm/CFM5/CFM52_preferred/500m/CRFA-BPPM-WEST-Big_Pine_fault-CFM2_m500.ts
  var n;
  var path;
  var file;

  n=url.indexOf('/500m/');
  if(n == -1) {
    n=url.indexOf('/1000m/');
    if( n == -1) {
      n=url.indexOf('/2000m/');
      if( n == -1) {
        n=url.indexOf('/native/');
      }
    }
  }
  if( n != -1) {
    path=url.substring(0,n+1);
    file=url.substring(n+1);
    MODAL_TS_PATH=path;
    MODAL_TS_LIST.push(file);
    MODAL_TS_NAME.push(name);
    } else {
      MODAL_TS_LIST.push(url);
      MODAL_TS_NAME.push(name);
  }
}

function get_MODAL_TS_LIST()
{
   if(MODAL_TS_LIST.length > 0) {
     var str=MODAL_TS_LIST.toString();
     return "["+str+"]";
   }
   return undefined;
}

function get_MODAL_TS_NAME()
{
   if(MODAL_TS_NAME.length > 0) {
     var str=MODAL_TS_NAME.toString();
     return "["+str+"]";
   }
   return undefined;
}

function get_MODAL_TS_PATH()
{
   if(MODAL_TS_PATH != null) {
     var pstr=MODAL_TS_PATH.toString();
     return "["+pstr+"]";
   }
   return undefined;
}
