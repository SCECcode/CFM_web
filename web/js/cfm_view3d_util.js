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
{'url':'data/external/SAFS-SAFZ-MULT-Banning_fault-YULE.ts',
      'name':'ALT: Banning fault', 'selected':0 },
{'url':'data/external/SAFS-SAFZ-MULT-San_Andreas_fault-FUIS-CFM3.ts',
      'name':'ALT: San Andreas fault', 'selected':0},
{'url':'data/external/SAFS-SAFZ-SBMT-Garnet_Hill_fault-YULE.ts',
      'name':'ALT: Garnet Hill fault', 'selected':0},
{'url':'data/external/SAFS-SGRP-SGPS-San_Gorgonio_Pass_fault-YULE.ts',
      'name':'ALT: San Gorgonio Pass fault', 'selected':0}];

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
       html=html+ "<button class=\"btn btn-small cfm-small-btn\" title=\"select this fault\" onclick=\"selectExternalTS("+i+")\"> " +"<span id=\""+label+"\" class=\"glyphicon glyphicon-unchecked\"></span></button>"+name+"<br>";
    }
    document.getElementById("externalTSList").innerHTML =html;
}


// force not to use evaluation color schema (gold/blue)
function disableEvalColorMode() {
    let $btn=$(`#evalBtn`);
    EXTERNAL_COLOR_MODE = !EXTERNAL_COLOR_MODE;
    if(EXTERNAL_COLOR_MODE) {
      $btn.css( "color", "#990000" );
      } else {
        $btn.css( "color", "black" );
    }
}

function reset_select_external() {
    EXTERNAL_COLOR_MODE=1;
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

  window.console.log("HERE..");

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

    var lines = result.split('\n');
    var sz=lines.length;
    if(sz== 0) { return; }

    for(let i=0;i<sz;i++) {
      if(lines[i].length > 0) {
        let data=lines[i].split(',');
      }
    }
  };
  reader.readAsText(_file);

/*
  EXTERNAL_TS_LIST.push("data/external/SAFS-SAFZ-MULT-Banning_fault-YULE.ts");
  EXTERNAL_TS_LIST.push("data/external/SAFS-SAFZ-MULT-San_Andreas_fault-FUIS-CFM3.ts");
  EXTERNAL_TS_LIST.push("data/external/SAFS-SAFZ-SBMT-Garnet_Hill_fault-YULE.ts");
  EXTERNAL_TS_LIST.push("data/external/SAFS-SGRP-SGPS-San_Gorgonio_Pass_fault-YULE.ts");
  
  EXTERNAL_TS_NAME.push('Banning fault YULE');
  EXTERNAL_TS_NAME.push('San Andreas fault FUIS');
  EXTERNAL_TS_NAME.push('Garnet Hill fault YULE');
  EXTERNAL_TS_NAME.push('San Gorgonio Pass fault YULE');
*/
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
