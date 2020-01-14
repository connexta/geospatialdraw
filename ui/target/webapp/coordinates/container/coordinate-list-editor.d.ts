import * as React from 'react';
import { LengthUnit } from 'geospatialdraw/bin/geometry/units';
import { CoordinateUnit } from 'geospatialdraw/bin/coordinates/units';
declare type Props = {
    /** Coordinate List */
    coordinateList: [number, number][];
    /** Coordinate Unit */
    coordinateUnit: CoordinateUnit;
    /** Buffer Width */
    buffer: number;
    /** Buffer Unit */
    bufferUnit: LengthUnit;
    /** Called when shape changes */
    onChange: (coordinateList: [number, number][], buffer: number, bufferUnit: LengthUnit) => void;
};
declare const CoordinateListEditorContainer: React.SFC<Props>;
export default CoordinateListEditorContainer;
