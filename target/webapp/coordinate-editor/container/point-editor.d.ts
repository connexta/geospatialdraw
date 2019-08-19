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
import * as Units from '../units';
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
declare const PointEditor: React.SFC<Props>;
export default PointEditor;
