import * as React from 'react';
import * as Units from 'geospatialdraw/bin/coordinates/units';
import BBoxEditorProps from '../bbox-editor-props';
declare type Props = BBoxEditorProps & {
    unit: Units.CoordinateUnit;
};
/**
 * Edits bounding box for all coordinate units
 */
declare const BBoxEditor: React.SFC<Props>;
export default BBoxEditor;
