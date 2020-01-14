import Feature from 'ol/Feature';
import GeometryType from 'ol/geom/GeometryType';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from '../geo-receiver';
import ModifiableDrawingControl from './modifiable-drawing-control';
import { Shape } from '../../shapes/shape';
/**
 * Drawing Control for drawing a line on an Open Layers Map
 */
declare class LineDrawingControl extends ModifiableDrawingControl {
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    getShape(): Shape;
    getGeoType(): GeometryType;
    protected makeEmptyFeature(): Feature;
}
export default LineDrawingControl;
