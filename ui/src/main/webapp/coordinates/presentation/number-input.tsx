import * as React from 'react'
import { HTMLAttributes } from '../../internal/html'
import useNumberInput, {
  NumericConstraints,
} from 'geospatialdraw/bin/coordinates/react-hooks/number'

type Props = HTMLAttributes &
  NumericConstraints & {
    /** Numeric value */
    value: number | null
    /** Called on change */

    onChange: (value: number) => void
  }

type FormEvent = React.FormEvent<HTMLInputElement>

/**
 * Number input field
 */
const NumberInput: React.SFC<Props> = ({
  value,
  onChange,
  maxValue,
  minValue,
  decimalPlaces,
  ...rest
}) => {
  const [number, text, setText, formattedText] = useNumberInput(value, {
    maxValue,
    minValue,
    decimalPlaces,
  })
  return (
    <input
      type="text"
      value={text}
      onChange={({ currentTarget: { value: textValue } }: FormEvent) => {
        setText(textValue)
      }}
      onBlur={() => {
        setText(formattedText)
        if (number !== null) {
          onChange(number)
        }
      }}
      {...rest}
    />
  )
}

export default NumberInput
