# GeospatialDraw
## Geospatial map drawing library

Library of tools to draw and edit geometric shapes on a map.

**Note** To enable links run `yarn docs`

## Packages

**geometry**
:  GeospatialDraw extends GeoJSON to communicate geometric shapes by adding properties to `Feature` JSON objects. That format is defined in the geometry package.

 * Geometry
   * [GeometryJSON](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_geometry_.html#geometryjson)
   * [GeometryJSONProperties](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_geometry_.html#geometryjsonproperties)
   * [Geometry](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_geometry_.html#geometry)
   * [BufferShape](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_geometry_.html#buffershape)
   * [Extent](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_geometry_.html#extent)
   * [BUFFER_SHAPE_PROPERTY](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_geometry_.html#buffer_shape_property)
   * [CIRCLE_BUFFER_PROPERTY_VALUE](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_geometry_.html#circle_buffer_property_value)
   * [POLYGON_LINE_BUFFER_PROPERTY_VALUE](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_geometry_.html#polygon_line_buffer_property_value)
 * Utilities
   * [bboxToExtent](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_utilities_.html#bboxtoextent)
   * [geoToExtent](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_utilities_.html#geotoextent)
   * [makeGeometry](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_utilities_.html#makegeometry)
   * [makeBufferedGeo](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_utilities_.html#makebufferedgeo)
   * [makeEmptyGeometry](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_utilities_.html#makeemptygeometry)
 * Units
   * [LengthUnit](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_units_.html#lengthunit)
   * [FEET](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_units_.html#feet)
   * [KILOMETERS](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_units_.html#kilometers)
   * [METERS](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_units_.html#meters)
   * [MILES](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_units_.html#miles)
   * [NAUTICAL_MILES](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_units_.html#nautical_miles)
   * [YARDS](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_units_.html#yards)
 * Shape Factory
   * [makeBBoxGeo](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_shape_factory_.html#makebboxgeo)
   * [makeLineGeo](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_shape_factory_.html#makelinegeo)
   * [makePointGeo](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_shape_factory_.html#makepointgeo)
   * [makePointRadiusGeo](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_shape_factory_.html#makepointradiusgeo)
   * [makePolygonGeo](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_geometry_shape_factory_.html#makepolygongeo)

**shapes**
: The GeospatialDraw GeoJSON format only supports a limited set of geometric shapes. To aid in identifying the correct geometric shape a shape detector is provided in the shapes package.

 * [Shape](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_shape_utils_shape_.html#shape)
 * [ShapeDetector](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/classes/_shape_utils_shape_detector_.shapedetector.html)

**coordinates**
: In addition to drawing geometries on the map GeospatialDraw also has a library of components for editing the coordinates of these geometries directly. These components are in the coordinates package.

*For docs see: [Components Library](#components-library)*

**drawing**
: Drawing shapes on the map is supported with drawing tools in the drawing package.

 * [UpdatedGeoReceiver](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/modules/_drawing_controls_geo_receiver_.html#updatedgeoreceiver)
 * [DrawingContext](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/classes/_drawing_controls_drawing_context_.drawingcontext.html)
 * [DrawingControl](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/interfaces/_drawing_controls_drawing_control_.drawingcontrol.html)
 * [BoundingBoxDrawingControl](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/classes/_drawing_controls_bounding_box_drawing_control_.boundingboxdrawingcontrol.html)
 * [LineDrawingControl](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/classes/_drawing_controls_line_drawing_control_.linedrawingcontrol.html)
 * [PointDrawingControl](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/classes/_drawing_controls_point_drawing_control_.pointdrawingcontrol.html)
 * [PointRadiusDrawingControl](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/classes/_drawing_controls_point_radius_drawing_control_.pointradiusdrawingcontrol.html)
 * [PolygonDrawingControl](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/classes/_drawing_controls_polygon_drawing_control_.polygondrawingcontrol.html)

**menu**
: To facilitate a smooth UX with map drawing a map drawing menu is provided in the menu package.

*For docs see: [Components Library](#components-library)*

**renderer**
: A renderer is provided in the renderer package that can take an array of GeospatialDraw GeoJSON objects and render them on a map.

 * [Renderer](https://unpkg.com/@connexta/geospatialdraw@0.3.2/docs/classes/_renderer_renderer_.renderer.html)

## Components Library

Browse components in [Storybook](https://unpkg.com/@connexta/geospatialdraw@0.3.2/.storybook/index.html)
