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
import { makeLineGeo } from 'geospatialdraw/bin/geometry/shape-factory'
import { METERS } from 'geospatialdraw/bin/geometry/units'
import { LineGeoEditor } from '../'
import {
  coordinateUnitList,
  lengthUnitList,
  tableComponentFactory,
} from '../../internal/storybook-helpers'

const TableComponent = tableComponentFactory({
  geo: {
    propType: 'GeometryJSON',
    required: true,
    description: 'GeometryJSON to edit',
  },
  coordinateUnit: {
    propType: 'CoordinateUnit',
    required: true,
    description: 'Coordinate unit',
  },
  onUpdateGeo: {
    propType: '(geo: GeometryJSON) => void',
    required: true,
    description: 'Called when GeometryJSON changes',
  },
})

const stories = storiesOf('coordinates/LineGeoEditor', module)

stories.addParameters({
  info: {
    TableComponent,
    propTablesExclude: [React.Fragment, Map],
  },
})

coordinateUnitList.forEach(coordinateUnit => {
  stories.add(coordinateUnit, () => {
    const coordinatesText = text(
      'coordinates',
      `
      [
        [10, 15],
        [10.5, 15.8],
        [11, 16],
        [10, 14.925]
      ]
    `
    )
    let coordinates = [[10, 15], [10.5, 15.8], [11, 16], [10, 14.925]]
    try {
      coordinates = JSON.parse(coordinatesText)
    } catch (e) {
      console.log(e)
    }
    const buffer = number('buffer', 0)
    const bufferUnit = select('buffer unit', lengthUnitList, METERS)
    const geometry = makeLineGeo('id', coordinates, buffer, bufferUnit)
    return (
      <LineGeoEditor
        geo={geometry}
        coordinateUnit={coordinateUnit}
        onUpdateGeo={action('onUpdateGeo')}
      />
    )
  })
})
