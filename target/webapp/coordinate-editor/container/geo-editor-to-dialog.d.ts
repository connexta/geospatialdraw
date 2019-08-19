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
import { GeometryJSON } from '../../geometry';
import { Shape } from '../../shape-utils';
declare type Props = {
    /** Geometry GeoJSON */
    geo: GeometryJSON;
    /** Okay button handler */
    onOk: (geo: GeometryJSON) => void;
};
declare type GeoEditorProps = {
    /** Geometry GeoJSON */
    geo: GeometryJSON;
    /** Coordinate Unit */
    coordinateUnit: CoordinateUnit;
    /** Called when GeoJSON changes */
    onUpdateGeo: (geo: GeometryJSON) => void;
};
declare type GeoEditorComponent = React.ComponentType<GeoEditorProps>;
declare type FinalizeGeo = (geo: GeometryJSON) => GeometryJSON;
declare const geoEditorToDialog: (GeoEditor: React.ComponentType<GeoEditorProps>, defaultShape: Shape, finalizeGeo: FinalizeGeo) => React.ComponentType<Props>;
export { FinalizeGeo, GeoEditorComponent, geoEditorToDialog, GeoEditorProps, Props as GeoEditorDialogProps, };
