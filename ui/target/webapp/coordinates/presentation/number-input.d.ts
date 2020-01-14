import * as React from 'react';
import { HTMLAttributes } from '../../internal/html';
import { NumericConstraints } from 'geospatialdraw/bin/coordinates/react-hooks/number';
declare type Props = HTMLAttributes & NumericConstraints & {
    /** Numeric value */
    value: number | null;
    /** Called on change */
    onChange: (value: number) => void;
};
/**
 * Number input field
 */
declare const NumberInput: React.SFC<Props>;
export default NumberInput;
