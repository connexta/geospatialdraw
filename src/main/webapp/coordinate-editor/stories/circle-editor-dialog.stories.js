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
import { CircleEditorDialog } from '../'
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

const stories = storiesOf('coordinate-editor/CircleEditorDialog', module)

stories.addParameters({
  info: {
    TableComponent,
  },
})

const makeGeometry = () => makeEmptyGeometry('id', 'Point Radius')

stories.add('basic', () => {
  const geo = makeGeometry()
  return <CircleEditorDialog geo={geo} onOk={action('onOk')} />
})
