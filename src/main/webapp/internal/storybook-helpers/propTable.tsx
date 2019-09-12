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
import styled from 'styled-components'

type PropDefinition = {
  required?: boolean
  propType?: string
  defaultValue?: string
  description?: string
}

interface PropTypes {
  [key: string]: PropDefinition
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: monospace;
  white-space: pre;
  thead tr {
    text-align: left;
    border-bottom: 1px solid black;
  }
`
const Required = styled.span`
  color: red;
`

const tableComponentFactory = (propTypes: PropTypes): React.SFC => () => {
  const propNames = Object.keys(propTypes)
  let tableBody = propNames.map(property => {
    const {
      required = false,
      propType = '-',
      defaultValue = '',
      description = '',
    } = propTypes[property]
    return (
      <tr key={property}>
        <td>
          {property}
          {required ? <Required>*</Required> : null}
        </td>
        <td>{propType}</td>
        <td>{defaultValue}</td>
        <td>{description}</td>
      </tr>
    )
  })
  return (
    <Table>
      <thead>
        <tr>
          <th>name</th>
          <th>type</th>
          <th>default</th>
          <th>description</th>
        </tr>
      </thead>
      <tbody>{tableBody}</tbody>
    </Table>
  )
}

export default tableComponentFactory
