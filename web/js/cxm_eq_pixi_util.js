/***
   cxm_eq_pixi_util.js

   manage the relocated seismicity (earthquakes)
   as pixi overlay layer

   manage the significant historic earthquakes > M6.0
   as a leaflet overlay layer
***/

/* there could be 3 different particleTextures set.. */
/* one for depth, one for mag, one for time */

const CXM_EQ_TEXTURE_SETS= 3;
var particleTexturesSet0=[];
var particleTexturesSet1=[];
var particleTexturesSet2=[];


// metric depth, magnitude, time
var cxm_eq_pixi_cmap_tb = {
   data_rgb: [
   { type: EQ_HAUKSSON_FOR_DEPTH,
     node: "for Depth",
     rgbs: [ 
"rgb(233,213,117)",
"rgb(198,220,100)",
"rgb(161,227,95)",
"rgb(161,227,95)",
"rgb(124,231,103)",
"rgb(93,229,120)",
"rgb(71,223,145)",
"rgb(60,210,172)",
"rgb(60,210,172)",
"rgb(59,192,197)",
"rgb(69,170,215)",
"rgb(84,146,223)",
"rgb(103,123,220)",
"rgb(103,123,220)",
"rgb(121,102,207)",
"rgb(135,85,185)",
"rgb(143,72,157)",
"rgb(143,64,127)",
"rgb(143,64,127)",
"rgb(135,59,97)"
     ]},
   { type: EQ_HAUKSSON_FOR_MAG,
     node: "for Magnitude",
     rgbs: [ 
"rgb(233,213,117)",
"rgb(198,220,100)",
"rgb(161,227,95)",
"rgb(161,227,95)",
"rgb(124,231,103)",
"rgb(93,229,120)",
"rgb(71,223,145)",
"rgb(60,210,172)",
"rgb(60,210,172)",
"rgb(59,192,197)",
"rgb(69,170,215)",
"rgb(84,146,223)",
"rgb(103,123,220)",
"rgb(103,123,220)",
"rgb(121,102,207)",
"rgb(135,85,185)",
"rgb(143,72,157)",
"rgb(143,64,127)",
"rgb(143,64,127)",
"rgb(135,59,97)"
     ]},
   { type: EQ_HAUKSSON_FOR_TIME,
     node: "for Time",
     rgbs: [
"rgb(233,213,117)",
"rgb(198,220,100)",
"rgb(161,227,95)",
"rgb(161,227,95)",
"rgb(124,231,103)",
"rgb(93,229,120)",
"rgb(71,223,145)",
"rgb(60,210,172)",
"rgb(60,210,172)",
"rgb(59,192,197)",
"rgb(69,170,215)",
"rgb(84,146,223)",
"rgb(103,123,220)",
"rgb(103,123,220)",
"rgb(121,102,207)",
"rgb(135,85,185)",
"rgb(143,72,157)",
"rgb(143,64,127)",
"rgb(143,64,127)",
"rgb(135,59,97)"
     ]},
  ]
};


/*********************************************************
*********************************************************/
function cxm_eq_init_pixi() {

  pixi_cmap_tb= cxm_eq_pixi_cmap_tb;
  //PIXI_DEFAULT_DATA_SEGMENT_COUNT=CXM_DEFAULT_DATA_SEGMENT_COUNT;

// setup textures depth/mag/time
  let rgblist=getSegmentParticleRGBList(EQ_HAUKSSON_FOR_DEPTH);
  for(let i =0; i< rgblist.length; i++) {

	  /*
{ 
    let name="particleSet0_"+i;
    let rgb=rgblist[i];
    var texture=pixiCreateBaseTexture(rgb,name);
    particleTexturesSet0.push(texture);
}
   */

/*  using icon.png, trying marker20_icon.png 
 */
{
    let idx=i+1;
    let fname="img/marker"+idx+"_icon.png";
    var texture=PIXI.Texture.from(fname);
    particleTexturesSet0.push(texture);
}
/* */

/*
{
    var circle=new PIXI.GraphicsContext().circle(100,100,50).fill(rgb);
    let texture=renderer.genreateTexture(circle);
    particleTexturesSet0.push(texture);
}
*/

  }
  rgblist=getSegmentParticleRGBList(EQ_HAUKSSON_FOR_MAG);
  for(let i =0; i< rgblist.length; i++) {
    let name="particleSet1_"+i;
    let rgb=rgblist[i];
    let texture=pixiCreateBaseTexture(rgb,name);
    particleTexturesSet1.push(texture);
  }
  rgblist=getSegmentParticleRGBList(EQ_HAUKSSON_FOR_TIME);
  for(let i =0; i< rgblist.length; i++) {
    let name="particleSet2_"+i;
    let rgb=rgblist[i];
    let texture=pixiCreateBaseTexture(rgb,name);
    particleTexturesSet2.push(texture);
  }
}

// rgb_set == quake_metric_type
function getSegmentParticleRGBList(rgb_set) {
  let cmaps=cxm_eq_pixi_cmap_tb.data_rgb;
  let cmap=cmaps[rgb_set];
  return cmap.rgbs;
}

function getParticleTextures(rgb_set) {
    switch(rgb_set)  {
      case 0:
        return particleTexturesSet0;
      case 1:
        return particleTexturesSet1;
      case 2:
        return particleTexturesSet2;
      default:
        window.console.log("BAD..");
        return null;
    }
}

function getRGBset(quake_metric_type) {
   let cmaps=cxm_eq_pixi_cmap_tb.data_rgb;
   let cnt=cmaps.length;
   for(let i=0; i< cnt; i++) {
     if(quake_metric_type == cmaps[i].type) {
       let rgbs=cmaps[i].rgbs;
       return rgbs;
     }	       
   }
   return null;
}
