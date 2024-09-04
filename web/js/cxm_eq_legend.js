
// a layer is always generated with the full set of legend bins
function _legendoptionChecked(label,pixiuid,idx,color,check) {
     var html="<li>";
     if(check) {
       html=html+ "<input type=\"checkbox\" class='legend-label mr-1' title=\"toggle the region\" id=\"pixiLegend_"+idx+"\" onclick=CSM.togglePixiLegend(\""+pixiuid+"\","+idx+",\"pixiLegend_"+idx+"\") style=\"accent-color:"+color+"\" checked >";
       } else {
         html=html+ "<input type=\"checkbox\" class='legend-label mr-1' title=\"toggle the region\" id=\"pixiLegend_"+idx+"\" onclick=CSM.togglePixiLegend(\""+pixiuid+"\","+idx+",\"pixiLegend_"+idx+"\") style=\"accent-color:"+color+"\" >";
     }
     html=html+"<label for=\"pixiLegend_"+idx+"\"><span>"+label+"</span></label></li>";
     return html;
}

// a layer is always generated with the full set of legend bins
function _legendoptioncolor(color) {
     var html="<li><span class=\"color\" style=\"background-color: "+color+"\"></span></li>";
     return html;
}

// a layer is always generated with the full set of legend bins
function _legendoptionlabel(label) {
     var html="<li><label class=\"legend-label\"><span>"+label+"</span></label></li>";
     return html;
}

/*
"haukssondepth" km
"haukssonmag"   mag
"haukssontime"  date

legendinfo:
*/
function setupPixiLegend(pixiuid,metric,legendinfo) {

window.console.log("XXX calling setupPixiLegend for ..");

     if(jQuery.isEmptyObject(legendinfo)) {
        $("#pixi-legend").html("");
alert("empty legend info "+pixiuid);
        return;
     }

     let namelist=legendinfo['names'];
     let lengthlist=legendinfo['counts'];
     let labellist=legendinfo['labels']; // label includes the last extra one
     let colorlist=legendinfo['colors'];
     let checklist=legendinfo['checks'];
     let n=namelist.length;
     let chtml = "";
     let lhtml = "";
     // include the top 'invisible' one
     for(let i=n-1; i>=0; i--) {
         let name=namelist[i];
         let color=colorlist[i];
         let label=labellist[i+1]; // segment's label 
         let length=lengthlist[i];
         let check=checklist[i];
         if(length == 0) {
	    check=0;
         }
         if(i== Math.floor(n/2)) {
	   chtml=_legendoptioncolor(color, 1)+chtml;
           } else {
	     chtml=_legendoptioncolor(color, 0)+chtml;
         }
         lhtml=_legendoptionlabel(label)+lhtml;
     }
      // include the top 'invisible' one
     lhtml=_legendoptionlabel(labellist[0])+lhtml;

     chtml="<ul>"+chtml+"</ul>";
     $("#pixi-legend-color").html(chtml);

     lhtml="<ul>"+lhtml+"</ul>";
     $("#pixi-legend-label").html(lhtml);

     // update the title to pixi legend,
     if(metric == "haukssondepth") {
       $("#pixi-legend-title").html("Depth(km)");
       } else if (metric == "haukssonmag") {
          $("#pixi-legend-title").html("Magnitude()");
       } else {
          $("#pixi-legend-title").html("Time(date)");
     }
     $('#mylegend').css("display", "")
};

function removePixiLegend() {
     $('#mylegend').css("display", "none")
}

function togglePixiLegend(pixiuid, n, label) {
//window.console.log("calling togglePixiLegend.. with ",n,"on pixiuid ",pixiuid);
      let vis=pixiToggleParticleContainer(pixiuid,n);
};

// a layer is always generated with the full set of segments 
// so pop up the pixi segment selector on dashboard
// max n would be 20
function _segmentoption(label,pixiuid,idx,color,check) {
     var html="";
     if(check) {
       html=html+ "<input type=\"checkbox\" class='checkboxk-group mr-1' id=\"pixiSegment_"+idx+"\" onclick=CSM.togglePixiSegment(\""+pixiuid+"\","+idx+") style=\"accent-color:"+color+"\" checked >";
       } else {
         html=html+ "<input type=\"checkbox\" class='checkboxk-group mr-1' id=\"pixiSegment_"+idx+"\" onclick=CSM.togglePixiSegment(\""+pixiuid+"\","+idx+") style=\"accent-color:"+color+"\" >";
     }
     html=html+"<label class='checkbox-group-label mr-2' for=\"pixiSegment_"+idx+"\"><span>"+label+"</span></label>";
      return html;
}

    //seginfo is { names: nlist, counts:clist, labels:llist };
function setupPixiSegmentDebug(pixiuid,seginfo) {

      if(!this.model_debug) return;

//window.console.log("setupPixiSegmentDebug...",pixiuid);
      if(jQuery.isEmptyObject(seginfo)) {
        $("#pixi-segment").html("");
        return;
      }

      let namelist=seginfo['names'];
      let lengthlist=seginfo['counts'];
      let labellist=seginfo['labels'];
      let colorlist=seginfo['colors'];
      let checklist=seginfo['checks'];
      let n=namelist.length;
      let html = "";
      for(let i=0; i<n; i++) {
         let name=namelist[i];
         let color=colorlist[i];
         let label=labellist[i]; // segment's label 
         let length=lengthlist[i];
         let check=checklist[i];
         if(length == 0) {
	    check=0;
         }
         let v=i+1;
         let foo=label+"&nbsp;&nbsp;&nbsp;(n="+length+")";
	 html=_segmentoption(foo,pixiuid,i,color,check)+"<br>"+html;
      }
      $("#pixi-segment").html(html);
}

function togglePixiSegment(pixiuid, n) {
window.console.log("calling togglePixiSegment.. with ",n,"on pixiuid ",pixiuid);
      let vis=pixiToggleParticleContainer(pixiuid,n);
}
