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
import * as React from 'react'
import * as ol from 'openlayers'
import {
  storiesOf,
  action,
  select,
  array,
  text,
  number,
  boolean,
} from '../../internal/storybook'
import { makeEmptyGeometry } from '../../geometry'
import { AllShapesEditorDialog } from '../'
import {
  shapeList,
  tableComponentFactory,
} from '../../internal/storybook-helpers'

const TableComponent = tableComponentFactory({
  geo: {
    propType: 'GeometryJSON',
    required: true,
    description: 'GeometryJSON to edit',
  },
  onOk: {
    propType: '(geo: GeometryJSON) => void',
    required: true,
    description: 'Okay button handler',
  },
  shape: {
    propType: 'Shape',
    required: true,
    description: 'Geometry shape to edit',
  },
})

const stories = storiesOf(
  'map-drawing/coordinate-editor/AllShapesEditorDialog',
  module
)

stories.addParameters({
  info: {
    TableComponent,
  },
})

const makeGeometry = shape => makeEmptyGeometry('id', shape)

stories.add('basic', () => {
  const shape = select('shape', shapeList, 'Polygon')
  const geo = makeGeometry(shape)
  return <AllShapesEditorDialog geo={geo} onOk={action('onOk')} shape={shape} />
})
