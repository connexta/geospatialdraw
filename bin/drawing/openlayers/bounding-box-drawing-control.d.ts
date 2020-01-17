import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import GeometryType from 'ol/geom/GeometryType';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from '../geo-receiver';
import BasicDrawingControl from './basic-drawing-control';
import { Shape } from '../../shapes/shape';
import { GeometryJSON, Extent } from '../../geometry/geometry';
declare type ExtentEvent = {
    extent: Extent;
};
/**
 * Drawing Control for drawing a bounding box on an Open Layers Map
 */
declare class BoundingBoxDrawingControl extends BasicDrawingControl {
    private drawInteraction;
    private cachedGeo;
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    protected setInputBlocked(value: boolean): void;
    getGeoType(): GeometryType;
    getShape(): Shape;
    getDefaultStaticStyle(): Style | Style[];
    setGeo(geoJSON: GeometryJSON): void;
    startDrawing(): void;
    private startDrawingInteraction;
    extentChanged(e: ExtentEvent): void;
    extentToGeoJSON(bbox: Extent): GeometryJSON;
    protected updateLabel(feature: Feature): void;
}
export default BoundingBoxDrawingControl;
