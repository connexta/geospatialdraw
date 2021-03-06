import * as React from 'react';
import * as Units from 'geospatialdraw/bin/geometry/units';
declare type LengthUnit = Units.LengthUnit;
declare type Props = {
    /** Length value */
    length: number;
    /** Length unit of measure */
    unit: LengthUnit;
    /** Called when length changes (should update length) */
    setLength: (length: number) => void;
    /** Called when unit changes (should update unit) */
    setUnit: (unit: LengthUnit) => void;
};
declare const LengthEditor: React.SFC<Props>;
export default LengthEditor;
