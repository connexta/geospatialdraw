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
import { LineEditorDialog } from '../'
import { tableComponentFactory } from '../../internal/storybook-helpers'

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

const stories = storiesOf(
  'coordinate-editor/LineEditorDialog',
  module
)

stories.addParameters({
  info: {
    TableComponent,
  },
})

const makeGeometry = () => makeEmptyGeometry('id', 'Line')

stories.add('basic', () => {
  const geo = makeGeometry()
  return <LineEditorDialog geo={geo} onOk={action('onOk')} />
})
