import Feature from 'ol/Feature';
import GeometryType from 'ol/geom/GeometryType';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from '../geo-receiver';
import CoordinateListDrawingControl from './coordinate-list-drawing-control';
import { Shape } from '../../shapes/shape';
/**
 * Drawing Control for drawing a polygon on an Open Layers Map
 */
declare class PolygonDrawingControl extends CoordinateListDrawingControl {
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    getShape(): Shape;
    getGeoType(): GeometryType;
    protected makeEmptyFeature(): Feature;
    protected updateLabel(feature: Feature): void;
}
export default PolygonDrawingControl;
