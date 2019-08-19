# GeospatialDraw
## Geospatial map drawing library

Library of tools to draw geometric shapes on a map.

## Packages

**geometry**
:  GSDraw standardizes on an extension of GeoJSON to communicate geometric shapes. GSDraw extends GeoJSON by adding properties to `Feature` JSON objects. That extended format is defined in geometry package along with methods to facilitate effective use of this format.

**shapes**
: The GSDraw GeoJSON format only supports a limited set of geometric shapes. To aid in identifying the correct GSDraw supported shape a shape detector is provided in the shapes package.

**coordinates**
: GSDraw supports many mapping coordinate formats. The definitions of these formats are in the coordinates package.

**drawing**
: Drawing shapes on the map is supported with drawing tools in the drawing package.

**menu**
: To facilitate a smooth UX with map drawing a map drawing menu is provided in the menu package.

**renderer**
: A renderer is provided in the renderer package that can take an array of GSDraw GeoJSON objects and render them on a map.

## Components Library

Run `yarn storybook` to browse components.
