import * as ol from 'openlayers';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from './geo-receiver';
import ModifiableDrawingControl from './modifiable-drawing-control';
import { Shape } from '../shape-utils';
import { GeometryJSON } from '../geometry';
/**
 * Drawing Control for a circle/point radius
 */
declare class PointRadiusDrawingControl extends ModifiableDrawingControl {
    private animationFrameId;
    private animationFrame;
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    onCompleteDrawing(e: any): void;
    onStartDrawing(e: any): void;
    getShape(): Shape;
    getGeoJSONFromCompleteDrawEvent(e: any): GeometryJSON;
    getGeoJSONFromCompleteModifyEvent(e: any): GeometryJSON;
    featureToGeoJSON(inputFeature: ol.Feature): GeometryJSON;
    makeFeature(geoJSON: GeometryJSON): ol.Feature;
    getGeoType(): ol.geom.GeometryType;
    getStaticStyle(_feature: ol.Feature): ol.style.Style | ol.style.Style[];
}
export default PointRadiusDrawingControl;
