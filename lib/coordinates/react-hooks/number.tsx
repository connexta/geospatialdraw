import { useState, useEffect } from 'react'

/**
 * Description of numeric boundaries
 */
export type NumericConstraints = {
  /** Maximum allowed value */
  maxValue?: number
  /** Minimum allowed value */
  minValue?: number
  /** Number of displayed decimal places */
  decimalPlaces?: number
}

/** @internal */
const constrainNumber = (
  value: number | null,
  {
    maxValue = Number.POSITIVE_INFINITY,
    minValue = Number.NEGATIVE_INFINITY,
  }: NumericConstraints
): number | null => {
  if (value === undefined || value === null || isNaN(value)) {
    return null
  } else {
    let constrained = value
    if (maxValue !== undefined && !isNaN(maxValue)) {
      constrained = Math.min(constrained, maxValue)
    }
    if (minValue !== undefined && !isNaN(minValue)) {
      constrained = Math.max(constrained, minValue)
    }
    return constrained
  }
}

/** @internal */
const constrainString = (
  value: number | null,
  constraints: NumericConstraints
): string => {
  const decimalPlaces = constraints.decimalPlaces || 0
  const n = constrainNumber(value, constraints)
  if (n === null) {
    return ''
  } else {
    if (decimalPlaces === undefined || isNaN(decimalPlaces)) {
      return n.toString()
    } else {
      return n.toFixed(decimalPlaces)
    }
  }
}

/**
 * Use numeric input state for a numeric input field
 * where the users text value is unconstrained allowing users to type freely
 * as they actively edit the value only applying numeric constraints when the
 * user is finished typing.
 * Example usage:
 * ```
 * const [number, text, setText, formattedText] = useNumberInput(value, {
 *   maxValue,
 *   minValue,
 *   decimalPlaces,
 * })
 * return (
 *   <input
 *     type="text"
 *     value={text}
 *     onChange={({ currentTarget: { value: textValue } }: FormEvent) => {
 *       setText(textValue)
 *     }}
 *     onBlur={() => {
 *       setText(formattedText)
 *       if (number !== null) {
 *         onChange(number)
 *       }
 *     }}
 *     {...rest}
 *   />
 * )
 * ```
 * @param initValue - initial numeric value
 * @param constraints - numeric constraints
 * @returns [value, text, setText, formattedText]
 *
 */
const useNumberInput = (
  initValue: number,
  constraints: NumericConstraints = {}
): [number | null, string, (text: string) => void, string] => {
  const [text, setText] = useState(constrainString(initValue, constraints))
  const value = constrainNumber(parseFloat(text), constraints)
  const formattedText = constrainString(value, constraints)
  useEffect(() => {
    setText(formattedText)
  }, [constraints.decimalPlaces, constraints.maxValue, constraints.minValue])
  useEffect(() => {
    if (initValue !== value) {
      setText(constrainString(initValue, constraints))
    }
  }, [initValue])
  return [value, text, setText, formattedText]
}

export default useNumberInput
