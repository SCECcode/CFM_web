/****

  gfm_region.js

****/

var GFM_tb={
"regions": [
{"id":1,"name":"Asthenosphere","sliver":0,"state":1,"color":"#786D5F","ucolor":"grey"},
{"id":2,"name":"Upper Mantle","sliver":0,"state":1,"color":"#FF0000","ucolor":"red"},
{"id":3,"name":"Sierra Nevada(E)","sliver":0,"state":1,"color":"#B041FF","ucolor":"purple"},
{"id":4,"name":"Colorado Plateau","sliver":0,"state":1,"color":"#614051","ucolor":"brown"},
{"id":5,"name":"Sierra Nevada(W)","sliver":0,"state":1,"color":"#4A148C","ucolor":"purple"},
{"id":6,"name":"Peninsular Range(W)","sliver":0,"state":1,"color":"#7B1FA2","ucolor":"purple"},
{"id":7,"name":"Basin and Range","sliver":0,"state":1,"color":"#D84315","ucolor":"dark orange"},
{"id":8,"name":"Peninsular Range(W)","sliver":1,"state":1,"color":"#9C27B0","ucolor":"purple"},
{"id":9,"name":"Southern Walker Lane","sliver":0,"state":1,"color":"#FF6F00","ucolor":"dark orange"},
{"id":10,"name":"Peninsular Range(E)","sliver":0,"state":1,"color":"#6A1B9A","ucolor":"purple"},
{"id":11,"name":"Gulf Rifted Margin","sliver":1,"state":1,"color":"#D84315","ucolor":"dark orange"},
{"id":12,"name":"San Gabriel","sliver":1,"state":1,"color":"#3090C7","ucolor":"cyan"},
{"id":13,"name":"Mojavia","sliver":0,"state":1,"color":"#3090C7","ucolor":"cyan"},
{"id":14,"name":"San Gabriel","sliver":1,"state":1,"color":"#3090C7","ucolor":"cyan"},
{"id":15,"name":"San Gabriel","sliver":1,"state":1,"color":"#3090C7","ucolor":"cyan"},
{"id":16,"name":"Salinia","sliver":0,"state":1,"color":"#3090C7","ucolor":"cyan"},
{"id":17,"name":"San Gabriel","sliver":1,"state":1,"color":"#3090C7","ucolor":"cyan"},
{"id":18,"name":"Great Valley","sliver":0,"state":1,"color":"#FFD801","ucolor":"yellow"},
{"id":19,"name":"San Gabriel","sliver":0,"state":1,"color":"#3090C7","ucolor":"cyan"},
{"id":20,"name":"Santa Maria Rift","sliver":0,"state":1,"color":"#FFA62F","ucolor":"light orange"},
{"id":21,"name":"San Gabriel","sliver":1,"state":1,"color":"#3090C7","ucolor":"cyan"},
{"id":22,"name":"Gulf Rifted Margin","sliver":0,"state":1,"color":"#EF6C00","ucolor":"dark orange"},
{"id":23,"name":"Western Transverse Ranges","sliver":0,"state":1,"color":"#FFD801","ucolor":"yellow"},
{"id":24,"name":"Santa Maria Rift","sliver":1,"state":1,"color":"#FFA62F","ucolor":"light orange"},
{"id":25,"name":"Inner Borderland Rift","sliver":0,"state":1,"color":"#FFA62F","ucolor":"light orange"},
{"id":26,"name":"Western Transverse Ranges","sliver":1,"state":1,"color":"#FFD801","ucolor":"yellow"},
{"id":27,"name":"Nicolas Terrane","sliver":0,"state":1,"color":"#FFD801","ucolor":"yellow"},
{"id":28,"name":"Rift Axis 2","sliver":0,"state":1,"color":"#D462FF","ucolor":"violet"},
{"id":29,"name":"San Francisco Bay","sliver":0,"state":1,"color":"#347C17","ucolor":"green"},
{"id":30,"name":"Peninsular Range(E)","sliver":1,"state":1,"color":"#9172EC","ucolor":"purple"},
{"id":31,"name":"Rift Axis 1","sliver":0,"state":1,"color":"#D462FF","ucolor":"violet"},
{"id":32,"name":"Peninsular Range(E)","sliver":1,"state":1,"color":"#7F38EC","ucolor":"purple"},
{"id":33,"name":"Rift Axis 3","sliver":0,"state":1,"color":"#D462FF","ucolor":"violet"},
{"id":34,"name":"Accretionary Prism(S)","sliver":0,"state":1,"color":"#347C17","ucolor":"green"},
{"id":35,"name":"Accretionary Prism(N)","sliver":0,"state":1,"color":"#347C17","ucolor":"green"},
{"id":36,"name":"Oceanic Crust","sliver":0,"state":1,"color":"#6C2DC7","ucolor":"dark purple"},
{"id":37,"name":"San Gabriel","sliver":1,"state":1,"color":"#3090C7","ucolor":"cyan"},
{"id":38,"name":"San Gabriel","sliver":1,"state":1,"color":"#3090C7","ucolor":"cyan"},
{"id":39,"name":"San Gabriel","sliver":1,"state":1,"color":"#3090C7","ucolor":"cyan"},
{"id":40,"name":"San Gabriel","sliver":1,"state":1,"color":"#3090C7","ucolor":"cyan"},
{"id":41,"name":"Above Ground","sliver":0,"state":1,"color":"#FFFFFF","ucolor":"white"} 
],
"descript": [
{'id':'X','label':'X','show':1,'descript':'Input X (longitude or UTM coordinate)'},
{'id':'Y','label':'Y','show':1,'descript':'Input Y (latitude or UTM coordinate)'},
{'id':'Z','label':'Z','show':1,'descript':'Input Z (elevation - meters above sea level. Positive numbers above sea-level)<br>(depth - meters below ground surface. Positive numbers below ground surface)'},
{'id':'utmX','label':'utmX','show':0,'descript':'UTM coordinate (zone 11), easting'},
{'id':'utmY','label':'utmY','show':0,'descript':'UTM coordinate (zone 11), northing'},
{'id':'elevX','label':'elevX','show':0,'descript':'X coordinate of center of the cell which provided data value for elevations'},
{'id':'elevY','label':'elevY','show':0,'descript':'Y coordinate of center of the cell which provided data value for elevations'},
{'id':'topo','label':'topo','show':1,'descript':'Topographic/bathymetric elevation in meters'},
{'id':'mtop','label':'mtop','show':1,'descript':'Top of model in meters, below this depth there are data'},
{'id':'base','label':'base','show':1,'descript':'Basement elevation in meters (generaly negative)'},
{'id':'moho','label':'moho','show':1,'descript':'Moho elevation in meters (always negative)'},
{'id':'src','label':'hr/lr/cm/nr','show':1,'descript':'Flag to indicate whetehr high-resolution(hr), low-resolution(lr) or <br>lower crust.mantle voxet was used(cm); or if no data available(nr)'},
{'id':'cellX','label':'cellX','show':0,'descript':'X coordinate of center of cell which provided velocity data value'},
{'id':'cellY','label':'cellY','show':0,'descript':'Y coordinate of center of cell which provided velocity data value'},
{'id':'cellZ','label':'cellZ','show':0,'descript':'Z coordinate of center of cell which provided velocity data value'},
{'id':'tg','label':'tg','show':0,'descript':'Provenance of data point'},
{'id':'vp','label':'vp','show':1,'descript':'Compressional wave velocity in meters/sec'},
{'id':'vs','label':'vs','show':1,'descript':'Shear wave velocity in meters/sec'},
{'id':'rho','label':'rho','show':1,'descript':'Density in kg/m^3'},
{'id':'regionID','label':'regionID','show':1,'descript':'ID of the geological framework model region name as defined in GFM v1.0 Region Name Table'},
{'id':'temp','label':'temp','show':1,'descript':'GFM v1.0 Temperature in degree Celsius'}
],
"zmodes": [
{'id':1, 'mode name':'Depth', 'value':'d', 'description':'0 at surface and positive depth value'},
{'id':2, 'mode name':'Elevation', 'value':'e', 'description':'0 at sealevel and positive value toward the air and negative value toward the center of the earth'}
],
"fileformats": [
{'id':1, 'format name':'material property data', 'suffix':'json', 'description':'material property'}
]
};

