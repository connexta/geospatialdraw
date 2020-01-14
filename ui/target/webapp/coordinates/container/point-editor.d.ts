import * as React from 'react';
import * as Units from 'geospatialdraw/bin/coordinates/units';
declare type Props = {
    /** Latitude degrees */
    lat: number;
    /** Longitude degrees */
    lon: number;
    /** Called when the coordinates change (should update lat & lon) */
    setCoordinate: (lat: number, lon: number) => void;
    /** Coordinate Unit to display */
    unit: Units.CoordinateUnit;
};
/**
 * Edits point in all coordinate units
 */
declare const PointEditor: React.SFC<Props>;
export default PointEditor;
