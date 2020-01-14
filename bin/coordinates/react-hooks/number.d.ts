/**
 * Description of numeric boundaries
 */
export declare type NumericConstraints = {
    /** Maximum allowed value */
    maxValue?: number;
    /** Minimum allowed value */
    minValue?: number;
    /** Number of displayed decimal places */
    decimalPlaces?: number;
};
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
declare const useNumberInput: (initValue: number, constraints?: NumericConstraints) => [number | null, string, (text: string) => void, string];
export default useNumberInput;
