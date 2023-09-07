-----------------------------------------------------------------------------------------------------------------------
2023-09-05
Version 6.1 of the Southern California Earthquake Center (SCEC) Community Fault Model
-----------------------------------------------------------------------------------------------------------------------
MODEL DESCRIPTION
-----------------------------------------------------------------------------------------------------------------------
The SCEC Community Fault Model version 6.1 (CFM6.1) is an object-oriented, three-dimensional representation of active 
faults in southern California and adjacent offshore basins that currently includes 492 complex fault objects and serves
as the latest update to Plesch et al. (2007). New to CFM6.1 are two additional separate and fully-documented sub 
models: the ruptures and alternatives model. In total, CFM6.1 contains the following components:

1) The CFM6.1 Preferred Model: a set of 443 fault objects that constitute the preferred set of active faults in 
southern California.

2) The CFM6.1 Rupture Model: a set of 13 fault objects assembled from the CFM6.1 preferred model that ruptured during
selected significant historic events. These are not earthquake source models, but are representations of the entire 
fault surfaces where a significant historic rupture occurred. This model is intended to indicate which CFM fault 
objects were involved with selected significant historic ruptures.

3) The CFM6.1 Alternatives: a set of 36 alternative representations where structural differences have been proposed 
that could potentially significantly impact fault mechanics and associated seismic hazards. These alternative 
representations were selected based on community rankings following a comprehensive evaluation of the CFM that took 
place in May of 2022.

Including all sub models, the CFM6.1 incorporates 492 fully-documented objects. Each fault object includes triangulated
surface representations (t-surfs) in several resolutions, fault traces in several different file formats, and 
associated complete metadata including references used to constrain the surfaces. The CFM faults are defined based on
all available data including surface traces, seismicity, seismic reflection profiles, well data, geologic cross 
sections, and various other types of data and models. The CFM serves the SCEC as a unified resource for physics-based
fault systems modeling, strong ground-motion prediction, and probabilistic seismic hazards assessment (e.g., UCERF3).
Together, the Community Velocity Model (CVM-H 15.1.0), and CFM comprise SCEC's Unified Structural Representation of 
the Southern California crust and upper mantle (Shaw et al., 2015).

-----------------------------------------------------------------------------------------------------------------------
REFERENCES
-----------------------------------------------------------------------------------------------------------------------
Plesch, A., Marshall, S. T., Nicolae, A., Shaw, J. H., Su, M., Maechling, P. J., Huynh, T. T., & Pauk, E. (2022). 
The SCEC Community Fault Model Version 6.0: additions and updates after community evaluation. Poster Presentation at 
the 2022 SCEC Annual Meeting.

Plesch, A., Shaw, J.H., Benson, C., Bryant, W., Carena, S., Cooke, M.L., Dolan, J.F. Fuis, G., Gath, E., 
Grant Ludwig, L., Hauksson, E., Jordan, T., Kamerling, M., Legg, M., Lindvall, S., Magistrale, H., Nicholson, C., 
Niemi, N., Oskin, M., Yeats, R.S. (2007). Community Fault Model (CFM) for Southern California. The Bulletin of the 
Seismological Society of America. 97. 1793-1802. doi:10.1785/0120050211.

Shaw, J. H., Plesch, A., Tape, C., Suess, M., Jordan, T. H., Ely, G., Hauksson, E., Tromp, J., Tanimoto, T., 
Graves, R., Olsen, K., Nicholson, C., Maechling, P. J., Rivero, C., Lovely, P., Brankman, C. M., & Munster, J. (2015). 
Unified Structural Representation of the southern California crust and upper mantle. Earth and Planetary Science 
Letters, 415, 1-15. doi: 10.1016/j.epsl.2015.01.016. SCEC Contribution 2068.


-----------------------------------------------------------------------------------------------------------------------
CFM6.1 CHANGE LOG
-----------------------------------------------------------------------------------------------------------------------
CFM6.1 differs from CFM6.0 in several ways, as described below.

1) The Southern San Andreas fault was updated to the dipping model based on Fuis et al., (2012) which also contains a 
portion of the Banning fault.
    - SAFS-SAFZ-MULT-Southern_San_Andreas_fault_and_Banning-CFM6 is now the preferred representation. Naming of this
	  object is challenging because this object contains both what is typically referred to as the Southern San 
	  Andreas fault and a portion of the Banning fault. This is included in the metadata comments.
	- SAFS-SAFZ-COAV-Southern_San_Andreas_fault-CFM4 (Steeply dipping) is now an alternative representation, 
	  SAFS-SAFZ-COAV-Southern_San_Andreas_fault-ALT6.

2) The East Shoreline fault has been shortened to not extend north of Mecca Hills. 
    - SAFS-SAFZ-COAV-East_Shoreline_fault-CFM6 is the preferred version (same name in CFM6.0) and now no longer 
	  extends north of Mecca Hills. This is consistent with Janecke et al. (2019) where north of Mecca Hills the 
	  fault presence and location is mapped as speculative.
	- The longer SAFS-SAFZ-COAV-East_Shoreline_fault-CFM5 is now provided as an alternative, 
	  SAFS-SAFZ-COAV-East_Shoreline_fault-ALT6.

3) The Malibu Coast fault (east segment) has been truncated and merges with the Malibu Coast fault (west segment) 
and no longer extends farther to the west. The object name, WTRA-SFFS-SMMT-Malibu_Coast_fault_east-CFM6, remains 
the same.


-----------------------------------------------------------------------------------------------------------------------
LISTING AND DESCRIPTION OF THE CONTENTS OF THE CFM6.1 ZIP ARCHIVE
-----------------------------------------------------------------------------------------------------------------------
The directory structure is as follows:

doc/
Documentation and metadata, which include an MS Excel spreadsheet with detailed metadata about each fault surface. 
Metadata for the preferred, rupture, and alternative models are provided in separate but otherwise identically 
formatted sheets within the file. All faults contain references to the works that helped to define the 3D fault 
surface geometry. More information about the metadata columns is provided in doc/README.txt
   
obj/preferred/
obj/ruptures/
obj/alternatives/
These directories contain the model components for the preferred, rupture, and alternative models, respectively. 
Each model contains an identical directory structure, which is described below using the preferred model as an example.

obj/preferred/native/
The CFM6.1 preferred fault surfaces in gocad tsurf format using the native mesh. The native mesh uses a variable mesh 
resolution. Smaller triangles generally indicate where a fault is well-constrained by data. All tsurf files are 
provided in UTM zone 11 using the NAD27 datum (EPSG:26711).
   
obj/preferred/500m/
The CFM6.1 preferred fault surfaces with a semi-regularized mesh of ~500m resolution in gocad tsurf format. All tsurf 
files are provided in UTM zone 11 using the NAD27 datum (EPSG:26711).

obj/preferred/1000m/
The CFM6.1 preferred fault surfaces with a semi-regularized mesh of ~1000m resolution in gocad tsurf format. All tsurf 
files are provided in UTM zone 11 using the NAD27 datum (EPSG:26711).

obj/preferred/2000m/
The CFM6.1 preferred fault surfaces with a semi-regularized mesh of ~2000m resolution in gocad tsurf format. All tsurf
files are provided in UTM zone 11 using the NAD27 datum (EPSG:26711).
   
obj/preferred/traces/
Fault traces and upper tip lines (for blind faults) of the CFM6.1 preferred faults. While the CFM6.1 is a 3D model, 
it is often useful to make map-based visualizations of the model. The traces and blind faults are provided in several 
different formats described below.
obj/preferred/traces/gmt/
Fault traces and blind faults in Generic Mapping Tools multisegment ASCII format (i.e., plain text).
.lonLat - Longitude/Latitude coordinates (WGS84 datum)
.utm    - UTM zone 11 NAD27 datum (EPSG:26711)

obj/preferred/traces/kml/
Fault traces and blind faults in Google Earth .kml format (WGS84 datum). The kml files also contain selected metadata, 
which pops up if a fault is clicked on in the Google Earth interface.

obj/preferred/traces/shp/
Fault traces and blind faults in GIS shapefile format. Longitude/Latitude coordinates (WGS84 datum).


