import * as React from 'react';
import { Shape } from 'geospatialdraw/bin/shapes/shape';
import { GeometryJSON } from 'geospatialdraw/bin/geometry/geometry';
declare type Props = {
    /** Geometry GeoJSON */
    geo: GeometryJSON;
    /** Okay button handler */
    onOk: (geo: GeometryJSON) => void;
    /** Geometry shape */
    shape: Shape;
};
declare const AllShapesEditorDialog: React.SFC<Props>;
export default AllShapesEditorDialog;
