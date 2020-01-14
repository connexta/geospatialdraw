import * as React from 'react'
import {
  storiesOf,
  action,
  select,
  array,
  text,
  number,
  boolean,
} from '../../internal/storybook'
import { makeEmptyGeometry } from 'geospatialdraw/bin/geometry/utilities'
import { POLYGON } from 'geospatialdraw/bin/shapes/shape'
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

const stories = storiesOf('coordinates/AllShapesEditorDialog', module)

stories.addParameters({
  info: {
    TableComponent,
  },
})

const makeGeometry = shape => makeEmptyGeometry('id', shape)

stories.add('basic', () => {
  const shape = select('shape', shapeList, POLYGON)
  const geo = makeGeometry(shape)
  return <AllShapesEditorDialog geo={geo} onOk={action('onOk')} shape={shape} />
})
