-----------------------------------------------------------------------------------------------------------------------
2021-03-22
Version 5.3 of the Southern California Earthquake Center (SCEC) Community Fault Model
-----------------------------------------------------------------------------------------------------------------------
MODEL DESCRIPTION
-----------------------------------------------------------------------------------------------------------------------
The SCEC Community Fault Model version 5.3 (CFM5.3) is an object-oriented, three-dimensional representation of active 
faults in southern California and adjacent offshore basins that currently includes 440 complex fault objects in the 
preferred model (Plesch et al., 2020). Including alternative representations, the model incorporates 1186 objects. 
For the preferred fault set (440 surfaces), each fault object includes triangulated surface representations (t-surfs)
in several resolutions, fault traces in several different file formats, and associated complete metadata including 
references used to constrain the surfaces. The CFM faults are defined based on all available data including surface 
traces, seismicity, seismic reflection profiles, wells data, geologic cross sections, and various other types of data
and models. The CFM serves the Southern California Earthquake Center (SCEC) as a unified resource for physics-based
fault systems modeling, strong ground-motion prediction, and probabilistic seismic hazards assessment (e.g., UCERF3).
Together with the Community Velocity Model (CVM-H 15.1.0), the CFM comprises SCEC's Unified Structural 
Representation of the Southern California crust and upper mantle (Shaw et al., 2015).


-----------------------------------------------------------------------------------------------------------------------
REFERENCES
-----------------------------------------------------------------------------------------------------------------------
Plesch, A., Marshall, S. T., Nicholson, C., Shaw, J. H., Maechling, P., Su, M-H. “The Community Fault Model version 5.3
and new web-based tools” Virtual Poster Presentation at the 2020 SCEC Annual Meeting. SCEC Contribution 10547.

Shaw, J. H., Plesch, A., Tape, C., Suess, M., Jordan, T. H., Ely, G., Hauksson, E., Tromp, J., Tanimoto, T., 
Graves, R., Olsen, K., Nicholson, C., Maechling, P. J., Rivero, C., Lovely, P., Brankman, C. M., & Munster, J. (2015). 
Unified Structural Representation of the southern California crust and upper mantle. Earth and Planetary Science 
Letters, 415, 1-15. doi: 10.1016/j.epsl.2015.01.016. SCEC Contribution 2068


-----------------------------------------------------------------------------------------------------------------------
LISTING AND DESCRIPTION OF THE CONTENTS OF THE CFM5.3 ZIP ARCHIVE
-----------------------------------------------------------------------------------------------------------------------
The directory structure is as follows:

doc/
   Documentation and metadata, which includes an MS Excel spreadsheet with detailed metadata about each fault surface,
   an image showing a perspective view of the CFM5.3 model. All faults contain references to the works that helped to
   define the 3D fault surface geometry. More information about the metadata columns is provided in doc/README.txt
   
obj/native/
   The CFM5.3 preferred fault surfaces in gocad tsurf format using the native mesh.
   The native mesh uses a variable mesh resolution. Smaller triangles generally indicate where a fault is 
   well-constrained by data. All tsurf files are provided in UTM zone 11s using the NAD27 datum.
   
obj/500m/
   The CFM5.3 preferred fault surfaces with a semi-regularized mesh of ~500m resolution in gocad tsurf format.
   All tsurf files are provided in UTM zone 11s using the NAD27 datum.
   
obj/1000m/
   The CFM5.3 preferred fault surfaces with a semi-regularized mesh of ~1000m resolution in gocad tsurf format.
   All tsurf files are provided in UTM zone 11s using the NAD27 datum.
   
obj/2000m/
   The CFM5.3 preferred fault surfaces with a semi-regularized mesh of ~2000m resolution in gocad tsurf format.
   All tsurf files are provided in UTM zone 11s using the NAD27 datum.
   
obj/alt/
   Alternative CFM5.3 fault representations not included in the preferred model in gocad tsurf format.
   These alternative representations are provided in the native mesh where smaller triangles generally indicate
   areas of the surface that are well-constrained by data. All tsurf files are provided in UTM zone 11s 
   using the NAD27 datum.
   
obj/traces/
   Fault traces and upper tip lines (for blind faults) of the CFM5.3 preferred faults. While the CFM5.3 is a 
   3D model, it is often useful to make map-based visualizations of the model. The traces and blind faults 
   are provided in several different formats described below.
      gmt/
	     Fault traces and blind faults in Generic Mapping Tools multisegment ASCII format (i.e. plain text).
		 .lonLat - Longitude/Latitude coordinates (WGS84 datum)
		 .utm    - UTM zone 11s (NAD27 datum)
      kml/
	     Fault traces and blind faults in GoogleEarth .kml format (WGS84 datum). 
		 The kml files also contain metadata, which pops up if a fault is clicked on in GoogleEarth.
      shp/
	     Fault traces and blind faults in GIS shapefile format. (WGS84 datum).
	     
