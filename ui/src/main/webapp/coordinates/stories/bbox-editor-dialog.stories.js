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
import { BBoxEditorDialog } from '../'
import { tableComponentFactory } from '../../internal/storybook-helpers'
import { BOUNDING_BOX } from 'geospatialdraw/bin/shapes/shape'

const TableComponent = tableComponentFactory({
  geo: {
    propType: 'GeometryJSON',
    required: true,
    description: 'GeometryJSON to edit',
  },
  onOk: {
    propType: '(geo: GeometryJSON) => void',
    required: true,
    description: 'Ok button handler',
  },
})

const stories = storiesOf('coordinates/BBoxEditorDialog', module)

stories.addParameters({
  info: {
    TableComponent,
  },
})

const makeGeometry = () => makeEmptyGeometry('id', BOUNDING_BOX)

stories.add('basic', () => {
  const geo = makeGeometry()
  return <BBoxEditorDialog geo={geo} onOk={action('onOk')} />
})
