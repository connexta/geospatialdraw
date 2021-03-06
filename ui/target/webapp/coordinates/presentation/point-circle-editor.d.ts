import * as React from 'react';
import { CoordinateUnit } from 'geospatialdraw/bin/coordinates/units';
import { LengthUnit } from 'geospatialdraw/bin/geometry/units';
declare type PointProps = {
    /** Coordinate Unit to display */
    coordinateUnit: CoordinateUnit;
    /** Latitude degrees */
    lat: number;
    /** Longitued degrees */
    lon: number;
    /** Set coordinate in lat/lon degrees */
    setCoordinate: (lat: number, lon: number) => void;
};
declare type CircleProps = PointProps & {
    /** Radius */
    radius: number;
    /** Radius unit of measure */
    radiusUnit: LengthUnit;
    /** Set radius */
    setRadius: (buffer: number) => void;
    /** Set radius unit of measure */
    setRadiusUnit: (unit: LengthUnit) => void;
};
declare const FixedHeightPointEditor: React.SFC<PointProps>;
declare const CircleEditor: React.SFC<CircleProps>;
export { FixedHeightPointEditor, CircleEditor };
