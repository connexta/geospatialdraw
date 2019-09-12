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
import { makeBBoxGeo } from '../../geometry'
import { BBoxGeoEditor } from '../'
import {
  coordinateUnitList,
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

const stories = storiesOf('map-drawing/coordinate-editor/BBoxGeoEditor', module)

stories.addParameters({
  info: {
    TableComponent,
    propTablesExclude: [React.Fragment, Map],
  },
})

coordinateUnitList.forEach(coordinateUnit => {
  stories.add(coordinateUnit, () => {
    const extent = array('extent', [10, 5, 50, 55])
    const geometry = makeBBoxGeo('id', extent)
    return (
      <BBoxGeoEditor
        geo={geometry}
        coordinateUnit={coordinateUnit}
        onUpdateGeo={action('onUpdateGeo')}
      />
    )
  })
})
