/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
import React from 'react'
import * as turf from '@turf/turf'
import ol from 'openlayers'
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
  tableComponentFactory,
} from '../internal/storybook-helpers'
import DrawingMenu from './drawing-menu'
import styled from 'styled-components'
import { makeEmptyGeometry, KILOMETERS } from '../geometry'

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 45px;
`

const STYLE = feature =>
  new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: feature.get('color'),
      width: 2,
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 0, 0)',
    }),
    image: new ol.style.Circle({
      radius: 4,
      fill: new ol.style.Fill({
        color: feature.get('color'),
      }),
    }),
  })

const TableComponent = tableComponentFactory({
  shape: {
    propType: 'Shape | null',
    required: true,
    description: 'Geometry shape to draw',
  },
  map: {
    propType: 'ol.Map',
    required: true,
    description: 'Open Layers Map to draw on',
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
  mapStyle: {
    propType: 'ol.StyleFunction | ol.style.Style | ol.style.Style[]',
    required: true,
    description: 'Style to apply to geometries drawn on the map',
  },
})

const stories = storiesOf('drawing-menu/DrawingMenu', module)

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

stories.add('full featured', () => {
  const title = text('title', 'Untitled')
  const saveAndContinue = boolean('saveAndContinue', false)
  const isActive = boolean('isActive', true)
  const showCoordinateEditor = boolean('showCoordinateEditor', false)
  const id = 'someID'
  const color = text('color', '#0000FF')
  const shape = select('shape', shapeList, 'Polygon')
  const DrawingMenuWithMap = ({ map }) => (
    <MenuContainer class="menu-container">
      <DrawingMenu
        shape={shape}
        map={map}
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
        mapStyle={STYLE}
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
  const shape = select('shape', shapeList, 'Polygon')
  const geoJSON = makeEmptyGeometry(id, shape)
  switch (shape) {
    case 'Polygon':
      geoJSON.geometry.coordinates = [
        [[-92, 43], [-98, 50], [-103, 39], [-100, 33], [-92, 43]],
      ]
      geoJSON.bbox = turf.bbox(geoJSON)
      break
    case 'Bounding Box':
      geoJSON.bbox = [-107, 40, -90, 30]
      console.log(turf.bboxPolygon(geoJSON.bbox))
      geoJSON.geometry.coordinates = turf.bboxPolygon(
        geoJSON.bbox
      ).geometry.coordinates
      break
    case 'Line':
      geoJSON.geometry.coordinates = [
        [-92, 43],
        [-98, 37],
        [-103, 39],
        [-100, 33],
      ]
      geoJSON.bbox = turf.bbox(geoJSON)
      break
    case 'Point Radius':
      geoJSON.geometry.coordinates = [-92, 43]
      geoJSON.properties.buffer = 600
      geoJSON.properties.bufferUnit = KILOMETERS
      geoJSON.bbox = turf.bbox(
        turf.circle(geoJSON.geometry.coordinates, geoJSON.properties.buffer, {
          units: 'kilometers',
        })
      )
      break
    case 'Point':
      geoJSON.geometry.coordinates = [-92, 43]
      break
    default:
      break
  }
  const DrawingMenuWithMap = ({ map }) => (
    <MenuContainer class="menu-container">
      <DrawingMenu
        shape={shape}
        map={map}
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
        mapStyle={STYLE}
      />
    </MenuContainer>
  )
  DrawingMenuWithMap.displayName = 'DrawingMenu'
  return renderMap(DrawingMenuWithMap)
})

stories.add('simplified', () => {
  const isActive = boolean('isActive', true)
  const id = 'someID'
  const color = text('color', '#0000FF')
  const shape = select('shape', shapeList, 'Polygon')
  const DrawingMenuWithMap = ({ map }) => (
    <MenuContainer class="menu-container">
      <DrawingMenu
        shape={shape}
        map={map}
        isActive={isActive}
        geometry={null}
        onCancel={action('Cancel')}
        onOk={action('Ok')}
        onSetShape={action('setShape')}
        onUpdate={action('update')}
        mapStyle={STYLE}
      />
    </MenuContainer>
  )
  DrawingMenuWithMap.displayName = 'DrawingMenu'
  return renderMap(DrawingMenuWithMap)
})

stories.add('minimal', () => {
  const isActive = boolean('isActive', true)
  const id = 'someID'
  const color = text('color', '#0000FF')
  const shape = select('shape', ['Line', 'Polygon'], 'Polygon')
  const DrawingMenuWithMap = ({ map }) => (
    <MenuContainer class="menu-container">
      <DrawingMenu
        shape={shape}
        map={map}
        disabledShapes={['Bounding Box', 'Point Radius', 'Point']}
        isActive={isActive}
        geometry={null}
        onCancel={action('Cancel')}
        onOk={action('Ok')}
        onSetShape={action('setShape')}
        onUpdate={action('update')}
        mapStyle={STYLE}
      />
    </MenuContainer>
  )
  DrawingMenuWithMap.displayName = 'DrawingMenu'
  return renderMap(DrawingMenuWithMap)
})
