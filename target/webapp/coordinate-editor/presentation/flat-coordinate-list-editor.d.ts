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
declare type Props = {
    /** Buffer */
    buffer: number;
    /** Buffer unit of measure */
    bufferUnit: LengthUnit;
    /** Array of coordinates in lon/lat */
    coordinateList: [number, number][];
    /** Coordinate unit */
    coordinateUnit: CoordinateUnit;
    /** Lattiude of current selected coordinate */
    lat: number;
    /** Longitude of current selected coordinate */
    lon: number;
    /** Sets buffer */
    setBuffer: (buffer: number) => void;
    /** Sets buffer unit of measure */
    setUnit: (unit: LengthUnit) => void;
    /** Sets coordinate at selected point */
    setCoordinate: (lat: number, lon: number) => void;
    /** Adds new coordinate at selected point */
    addCoordinate: () => void;
    /** Deletes coordiante from selected point */
    deleteCoordinate: () => void;
    /** Selects coordinate at index (should update selectedIndex) */
    selectCoordinate: (index: number) => void;
    /** Selected coordinate index */
    selectedIndex: number;
};
declare const FlatCoordinateListEditor: React.SFC<Props>;
export default FlatCoordinateListEditor;
