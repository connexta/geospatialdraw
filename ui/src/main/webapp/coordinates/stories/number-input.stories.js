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
import { NumberInput } from '../'
import { tableComponentFactory } from '../../internal/storybook-helpers'

const TableComponent = tableComponentFactory({
  value: {
    propType: 'number',
    required: true,
    description: 'Numeric value',
  },
  maxValue: {
    propType: 'number',
    required: false,
    description: 'Maximum allowed value',
  },
  minValue: {
    propType: 'number',
    required: false,
    description: 'Minimum allowed value',
  },
  decimalPlaces: {
    propType: 'number',
    required: false,
    description: 'Number of displayed decimal places',
  },
  onChange: {
    propType: '(value: number) => void',
    required: true,
    description: 'Called on change',
  },
})

const stories = storiesOf('coordinates/NumberInput', module)

stories.addParameters({
  info: {
    TableComponent,
  },
})

stories.add('all options', () => {
  const value = number('value', 0)
  const maxValue = number('max value', 100)
  const minValue = number('min value', -100)
  const decimalPlaces = number('decimal places', 3)
  return (
    <NumberInput
      value={value}
      maxValue={maxValue}
      minValue={minValue}
      decimalPlaces={decimalPlaces}
      onChange={action('onChange')}
    />
  )
})

stories.add('minimal', () => {
  const value = number('value', 0)
  return <NumberInput value={value} onChange={action('onChange')} />
})

stories.add('1 - 100', () => {
  const value = number('value', 0)
  return (
    <NumberInput
      value={value}
      maxValue={100}
      minValue={1}
      onChange={action('onChange')}
    />
  )
})

stories.add('latitude', () => {
  const value = number('value', 45.123456)
  return (
    <NumberInput
      value={value}
      maxValue={90}
      minValue={-90}
      decimalPlaces={6}
      onChange={action('onChange')}
    />
  )
})
