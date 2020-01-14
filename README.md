# GeospatialDraw

## Geospatial map drawing library

Library of tools to draw and edit geometric shapes on a map.

GeospatialDraw standardizes on *GeometryJSON* (see documentation below) as the format for all geometric data. Type definitions and methods for manipulating GeometryJSON are located in `lib/geometry`

Tools for creating drawing interactions for geometric shapes on a map are provided using OpenLayers 6.x in the `lib/drawing`

Boilerplate code for generating UI components for manipulating GeometryJSON is provided in `lib/coordinates`

Boilerplate code for generating a drawing menu to draw GeometryJSON on a map is provided in `lib/menu`

An OpenLayers GeometryJSON renderer is offered in `lib/renderer`

Shape manipulation methods are provided in `lib/shapes`

## Documentation

Documentation: https://unpkg.com/geospatialdraw@0.5.3/docs/index.html

## UI Components

See `ui` folder and `geospatialdraw-ui` package for example UI Components.

## Installation

`npm install geospatialdraw`

## Development

`yarn build:all`

## Deploy

**Note:** Be certain to update version number in `package.json` and `README.md` documentation link.

`yarn publish`
