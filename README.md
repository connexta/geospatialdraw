# GeospatialDraw
## Geospatial map drawing library

Library of tools to draw and edit geometric shapes on a map.

**Note** To enable links run `yarn docs`

## Packages

**geometry**
:  GeospatialDraw extends GeoJSON to communicate geometric shapes by adding properties to `Feature` JSON objects. That format is defined in the geometry package.

 * Geometry
   * [GeometryJSON](./target/docs/modules/_geometry_geometry_.html#geometryjson)
   * [GeometryJSONProperties](./target/docs/modules/_geometry_geometry_.html#geometryjsonproperties)
   * [Geometry](./target/docs/modules/_geometry_geometry_.html#geometry)
   * [BufferShape](./target/docs/modules/_geometry_geometry_.html#buffershape)
   * [Extent](./target/docs/modules/_geometry_geometry_.html#extent)
   * [BUFFER_SHAPE_PROPERTY](./target/docs/modules/_geometry_geometry_.html#buffer_shape_property)
   * [CIRCLE_BUFFER_PROPERTY_VALUE](./target/docs/modules/_geometry_geometry_.html#circle_buffer_property_value)
   * [POLYGON_LINE_BUFFER_PROPERTY_VALUE](./target/docs/modules/_geometry_geometry_.html#polygon_line_buffer_property_value)
 * Utilities
   * [bboxToExtent](./target/docs/modules/_geometry_utilities_.html#bboxtoextent)
   * [geoToExtent](./target/docs/modules/_geometry_utilities_.html#geotoextent)
   * [makeGeometry](./target/docs/modules/_geometry_utilities_.html#makegeometry)
   * [makeBufferedGeo](./target/docs/modules/_geometry_utilities_.html#makebufferedgeo)
   * [makeEmptyGeometry](./target/docs/modules/_geometry_utilities_.html#makeemptygeometry)
 * Units
   * [LengthUnit](./target/docs/modules/_geometry_units_.html#lengthunit)
   * [FEET](./target/docs/modules/_geometry_units_.html#feet)
   * [KILOMETERS](./target/docs/modules/_geometry_units_.html#kilometers)
   * [METERS](./target/docs/modules/_geometry_units_.html#meters)
   * [MILES](./target/docs/modules/_geometry_units_.html#miles)
   * [NAUTICAL_MILES](./target/docs/modules/_geometry_units_.html#nautical_miles)
   * [YARDS](./target/docs/modules/_geometry_units_.html#yards)
 * Shape Factory
   * [makeBBoxGeo](./target/docs/modules/_geometry_shape_factory_.html#makebboxgeo)
   * [makeLineGeo](./target/docs/modules/_geometry_shape_factory_.html#makelinegeo)
   * [makePointGeo](./target/docs/modules/_geometry_shape_factory_.html#makepointgeo)
   * [makePointRadiusGeo](./target/docs/modules/_geometry_shape_factory_.html#makepointradiusgeo)
   * [makePolygonGeo](./target/docs/modules/_geometry_shape_factory_.html#makepolygongeo)

**shapes**
: The GeospatialDraw GeoJSON format only supports a limited set of geometric shapes. To aid in identifying the correct geometric shape a shape detector is provided in the shapes package.

 * [Shape](./target/docs/classes/modules/_shape_utils_shape_.html#shape)
 * [ShapeDetector](./target/docs/classes/_shape_utils_shape_detector_.shapedetector.html)

**coordinates**
: In addition to drawing geometries on the map GeospatialDraw also has a library of components for editing the coordinates of these geometries directly. These components are in the coordinates package.

*For docs see: [Components Library](#components-library)*

**drawing**
: Drawing shapes on the map is supported with drawing tools in the drawing package.

 * [UpdatedGeoReceiver](./target/docs/modules/_drawing_controls_geo_receiver_.html#updatedgeoreceiver)
 * [DrawingContext](./target/docs/classes/_drawing_controls_drawing_context_.drawingcontext.html)
 * [DrawingControl](./target/docs/interfaces/_drawing_controls_drawing_control_.drawingcontrol.html)
 * [BoundingBoxDrawingControl](./target/docs/classes/_drawing_controls_bounding_box_drawing_control_.boundingboxdrawingcontrol.html)
 * [LineDrawingControl](./target/docs/classes/_drawing_controls_line_drawing_control_.linedrawingcontrol.html)
 * [PointDrawingControl](./target/docs/classes/_drawing_controls_point_drawing_control_.pointdrawingcontrol.html)
 * [PointRadiusDrawingControl](./target/docs/classes/_drawing_controls_point_radius_drawing_control_.pointradiusdrawingcontrol.html)
 * [PolygonDrawingControl](./target/docs/classes/_drawing_controls_polygon_drawing_control_.polygondrawingcontrol.html)

**menu**
: To facilitate a smooth UX with map drawing a map drawing menu is provided in the menu package.

*For docs see: [Components Library](#components-library)*

**renderer**
: A renderer is provided in the renderer package that can take an array of GeospatialDraw GeoJSON objects and render them on a map.

 * [Renderer](./target/docs/classes/_renderer_renderer_.renderer.html)

## Components Library

Run `yarn storybook` to browse components.
