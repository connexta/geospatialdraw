import * as React from 'react';
import { CoordinateUnit } from 'geospatialdraw/bin/coordinates/units';
declare type Props = {
    /** Lattitude */
    lat: number;
    /** Longitude */
    lon: number;
    /** Coordinate unit */
    unit: CoordinateUnit;
};
declare const CoordinateValue: React.SFC<Props>;
export default CoordinateValue;
