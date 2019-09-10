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
import * as Units from '../../geometry'
import styled from 'styled-components'
import NumberInput from './number-input'
import * as Common from './common-styles'

const LENGTH_PRECISION = 3

type LengthUnit = Units.LengthUnit

type Props = {
  /** Length value */
  length: number
  /** Length unit of measure */
  unit: LengthUnit
  /** Called when length changes (should update length) */
  setLength: (length: number) => void
  /** Called when unit changes (should update unit) */
  setUnit: (unit: LengthUnit) => void
}

const Root = Common.Row
const LengthValue = styled(NumberInput)`
  margin-right: ${props => props.theme.minimumSpacing};
  width: 8rem;
`
const UnitContainer = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  font-size: ${props => props.theme.minimumFontSize};
`

type SelectEvent = React.FormEvent<HTMLSelectElement>

const renderLengthUnitOption = (unit: LengthUnit) => (
  <option value={unit} key={unit}>
    {unit}
  </option>
)

const LengthEditor: React.SFC<Props> = ({
  length,
  unit,
  setLength,
  setUnit,
}) => (
  <Root>
    <LengthValue
      type="text"
      value={length}
      decimalPlaces={LENGTH_PRECISION}
      onChange={(value: number) => setLength(value)}
    />
    <UnitContainer>
      <select
        onChange={({ currentTarget: { value } }: SelectEvent) =>
          setUnit(value as LengthUnit)
        }
        value={unit}
      >
        {renderLengthUnitOption(Units.METERS)}
        {renderLengthUnitOption(Units.KILOMETERS)}
        {renderLengthUnitOption(Units.MILES)}
        {renderLengthUnitOption(Units.NAUTICAL_MILES)}
        {renderLengthUnitOption(Units.YARDS)}
        {renderLengthUnitOption(Units.FEET)}
      </select>
    </UnitContainer>
  </Root>
)

export default LengthEditor
