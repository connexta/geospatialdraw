/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
import * as React from 'react';
import { CoordinateUnit } from '../units';
import { LengthUnit } from '../../geometry';
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
