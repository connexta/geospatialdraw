import * as React from 'react';
import { CoordinateUnit } from 'geospatialdraw/bin/coordinates/units';
import { GeometryJSON } from 'geospatialdraw/bin/geometry/geometry';
import { Shape } from 'geospatialdraw/bin/shapes/shape';
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
declare const geoEditorToDialog: (GeoEditor: React.ComponentType<GeoEditorProps>, defaultShape: Shape) => React.ComponentType<Props>;
export { GeoEditorComponent, geoEditorToDialog, GeoEditorProps, Props as GeoEditorDialogProps, };
