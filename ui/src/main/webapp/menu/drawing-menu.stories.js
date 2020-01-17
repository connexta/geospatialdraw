import * as React from 'react'
import * as turf from '@turf/turf'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Circle from 'ol/style/Circle'
import Stroke from 'ol/style/Stroke'
import Text from 'ol/style/Text'
import {
  storiesOf,
  action,
  select,
  array,
  text,
  number,
  boolean,
} from '../internal/storybook'
import { decodeHtml } from '../internal/html'
import {
  Map,
  shapeList,
  lengthUnitList,
  tableComponentFactory,
} from '../internal/storybook-helpers'
import DrawingToolbox from 'geospatialdraw/bin/drawing/openlayers/drawing-toolbox'
import DrawingMenu from './drawing-menu'
import styled from 'styled-components'
import {
  HIDDEN_CLASSNAME,
  LABEL_CLASSNAME,
} from 'geospatialdraw/bin/geometry/geometry'
import { makeEmptyGeometry } from 'geospatialdraw/bin/geometry/utilities'
import { KILOMETERS, METERS } from 'geospatialdraw/bin/geometry/units'
import {
  POLYGON,
  POINT,
  POINT_RADIUS,
  LINE,
  BOUNDING_BOX,
} from 'geospatialdraw/bin/shapes/shape'

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 45px;
`

const featureHasClass = (feature, className) =>
  (feature.get('class') || []).includes(className)

const featureColor = feature =>
  featureHasClass(feature, HIDDEN_CLASSNAME)
    ? 'rgba(0, 0, 0, 0)'
    : feature.get('color') || 'blue'

const STYLE = feature =>
  featureHasClass(feature, LABEL_CLASSNAME)
    ? new Style({
        text: new Text({
          text: feature.get('text'),
          font: 'bold 14px/1 verdana',
          offsetY: 18,
          placement: 'point',
          textBaseline: 'middle',
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 1)',
            width: 1.2,
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 1)',
          }),
        }),
      })
    : new Style({
        stroke: new Stroke({
          color: featureColor(feature),
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 0, 0)',
        }),
        image: new Circle({
          radius: 4,
          fill: new Fill({
            color: featureColor(feature),
          }),
        }),
      })

const TableComponent = tableComponentFactory({
  shape: {
    propType: 'Shape | null',
    required: true,
    description: 'Geometry shape to draw',
  },
  toolbox: {
    propType: 'DrawingToolbox',
    required: true,
    description: 'Toolbox of drawing tools to use for drawing menu',
  },
  isActive: {
    propType: 'bool',
    required: true,
    description: 'True if the draw menu should be displayed',
  },
  showCoordinateEditor: {
    propType: 'bool',
    required: false,
    description: 'True if the coordinate editor popup is displayed',
  },
  saveAndContinue: {
    propType: 'bool',
    required: false,
    description:
      'True if the Apply button should be replacedwith a Save & Continue button',
  },
  title: {
    propType: 'string',
    required: false,
    description: 'Title of geometry being edited',
  },
  geometry: {
    propType: 'GeometryJSON | null',
    required: true,
    description: 'GeometryJSON to edit',
  },
  toggleCoordinateEditor: {
    propType: '() => void',
    required: false,
    description:
      'Called when show coordinate editor button is clicked (should set `showCoordinateEditor` flag)',
  },
  onCancel: {
    propType: '() => void',
    required: true,
    description: 'Called when cancel button is clicked',
  },
  onOk: {
    propType: '() => void',
    required: true,
    description: 'Called when ok button is clicked',
  },
  onSetShape: {
    propType: '(shape: Shape) => void',
    required: true,
    description: 'Called when the shape changes (should set `shape`)',
  },
  onUpdate: {
    propType: '(geoJSON: GeometryJSON) => void',
    required: true,
    description: 'Called when the Geometry JSON is updated ',
  },
  disabledShapes: {
    propType: 'Shape[]',
    required: false,
    description: 'List of shapes to hide from menu',
  },
  iconColor: {
    propType: 'string',
    required: false,
    description: 'Icon color for menu buttons',
  },
  defaultGeoProperties: {
    propType: 'object',
    required: false,
    description:
      'Hash of properties to assign to new Geometry JSON objects created by drawing',
  },
})

const stories = storiesOf(`menu/DrawingMenu`, module)

stories.addParameters({
  info: {
    TableComponent,
    propTablesExclude: [React.Fragment, Map],
  },
})

const renderMap = DrawingMenuWithMap => (
  <React.Fragment>
    <Map
      getOlMap={olMap => {
        map = olMap
      }}
      projection="EPSG:4326"
    >
      <DrawingMenuWithMap />
    </Map>
  </React.Fragment>
)

const makeToolbox = map => new DrawingToolbox({ map, drawingStyle: STYLE })

stories.add('full featured', () => {
  const title = text('title', 'Untitled')
  const saveAndContinue = boolean('saveAndContinue', false)
  const isActive = boolean('isActive', true)
  const showCoordinateEditor = boolean('showCoordinateEditor', false)
  const id = 'someID'
  const shape = select('shape', shapeList, POLYGON)
  const DrawingMenuWithMap = ({ map }) => (
    <MenuContainer class="menu-container">
      <DrawingMenu
        shape={shape}
        toolbox={makeToolbox(map)}
        isActive={isActive}
        showCoordinateEditor={showCoordinateEditor}
        saveAndContinue={saveAndContinue}
        title={title}
        geometry={null}
        toggleCoordinateEditor={action('toggleCoordinateEditor')}
        onCancel={action('Cancel')}
        onOk={action('Ok')}
        onSetShape={action('setShape')}
        onUpdate={action('update')}
        iconColor="#FFFFFF"
      />
    </MenuContainer>
  )
  DrawingMenuWithMap.displayName = 'DrawingMenu'
  return renderMap(DrawingMenuWithMap)
})

stories.add('editing a geo', () => {
  const title = text('title', 'Untitled')
  const saveAndContinue = boolean('saveAndContinue', false)
  const isActive = boolean('isActive', true)
  const showCoordinateEditor = boolean('showCoordinateEditor', false)
  const id = 'someID'
  const color = text('color', '#0000FF')
  const width = number('buffer', 0)
  const unit = select('bufferUnit', lengthUnitList, METERS)
  const shape = select('shape', shapeList, POLYGON)
  const geoJSON = makeEmptyGeometry(id, shape)
  switch (shape) {
    case POLYGON:
      geoJSON.geometry.coordinates = [
        [[-92, 43], [-98, 50], [-103, 39], [-100, 33], [-92, 43]],
      ]
      geoJSON.bbox = turf.bbox(geoJSON)
      geoJSON.properties.buffer = { width, unit }
      break
    case BOUNDING_BOX:
      geoJSON.bbox = [-107, 40, -90, 30]
      geoJSON.geometry.coordinates = turf.bboxPolygon(
        geoJSON.bbox
      ).geometry.coordinates
      geoJSON.properties.buffer = { width: 0, unit }
      break
    case LINE:
      geoJSON.geometry.coordinates = [
        [-92, 43],
        [-98, 37],
        [-103, 39],
        [-100, 33],
      ]
      geoJSON.bbox = turf.bbox(geoJSON)
      geoJSON.properties.buffer = { width, unit }
      break
    case POINT_RADIUS:
      geoJSON.geometry.coordinates = [-92, 43]
      geoJSON.properties.buffer = { width: 600, unit: KILOMETERS }
      geoJSON.bbox = turf.bbox(
        turf.circle(
          geoJSON.geometry.coordinates,
          geoJSON.properties.buffer.width,
          {
            units: 'kilometers',
          }
        )
      )
      break
    case POINT:
      geoJSON.geometry.coordinates = [-92, 43]
      break
    default:
      break
  }
  geoJSON.properties.color = color
  const DrawingMenuWithMap = ({ map }) => (
    <MenuContainer class="menu-container">
      <DrawingMenu
        shape={shape}
        toolbox={makeToolbox(map)}
        isActive={isActive}
        showCoordinateEditor={showCoordinateEditor}
        saveAndContinue={saveAndContinue}
        title={title}
        geometry={geoJSON}
        toggleCoordinateEditor={action('toggleCoordinateEditor')}
        onCancel={action('Cancel')}
        onOk={action('Ok')}
        onSetShape={action('setShape')}
        onUpdate={action('update')}
        iconColor="#FFFFFF"
        defaultGeoProperties={{
          color,
        }}
      />
    </MenuContainer>
  )
  DrawingMenuWithMap.displayName = 'DrawingMenu'
  return renderMap(DrawingMenuWithMap)
})

stories.add('simplified', () => {
  const isActive = boolean('isActive', true)
  const id = 'someID'
  const shape = select('shape', shapeList, POLYGON)
  const DrawingMenuWithMap = ({ map }) => (
    <MenuContainer class="menu-container">
      <DrawingMenu
        shape={shape}
        toolbox={makeToolbox(map)}
        isActive={isActive}
        geometry={null}
        onCancel={action('Cancel')}
        onOk={action('Ok')}
        onSetShape={action('setShape')}
        onUpdate={action('update')}
        iconColor="#FFFFFF"
      />
    </MenuContainer>
  )
  DrawingMenuWithMap.displayName = 'DrawingMenu'
  return renderMap(DrawingMenuWithMap)
})

stories.add('minimal', () => {
  const isActive = boolean('isActive', true)
  const id = 'someID'
  const shape = select('shape', [LINE, POLYGON], POLYGON)
  const DrawingMenuWithMap = ({ map }) => (
    <MenuContainer class="menu-container">
      <DrawingMenu
        shape={shape}
        toolbox={makeToolbox(map)}
        disabledShapes={[BOUNDING_BOX, POINT_RADIUS, POINT]}
        isActive={isActive}
        geometry={null}
        onCancel={action('Cancel')}
        onOk={action('Ok')}
        onSetShape={action('setShape')}
        onUpdate={action('update')}
        iconColor="#FFFFFF"
      />
    </MenuContainer>
  )
  DrawingMenuWithMap.displayName = 'DrawingMenu'
  return renderMap(DrawingMenuWithMap)
})

stories.add('default properties', () => {
  const isActive = boolean('isActive', true)
  const id = 'someID'
  const shape = select('shape', shapeList, POLYGON)
  const color = select(
    'color',
    ['red', 'green', 'blue', 'orange', 'purple'],
    'red'
  )
  const DrawingMenuWithMap = ({ map }) => (
    <MenuContainer class="menu-container">
      <DrawingMenu
        shape={shape}
        toolbox={makeToolbox(map)}
        isActive={isActive}
        geometry={null}
        onCancel={action('Cancel')}
        onOk={action('Ok')}
        onSetShape={action('setShape')}
        onUpdate={action('update')}
        iconColor="#FFFFFF"
        defaultGeoProperties={{
          exampleProperty: 'example value',
          color,
        }}
      />
    </MenuContainer>
  )
  DrawingMenuWithMap.displayName = 'DrawingMenu'
  return renderMap(DrawingMenuWithMap)
})
