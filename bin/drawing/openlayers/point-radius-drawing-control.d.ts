import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import GeometryType from 'ol/geom/GeometryType';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from '../geo-receiver';
import BasicDrawingControl from './basic-drawing-control';
import { Shape } from '../../shapes/shape';
import { GeometryJSON } from '../../geometry/geometry';
declare type DrawingFeatures = {
    feature: Feature;
    bufferFeature: Feature;
};
/**
 * Drawing Control for a circle/point radius on an Open Layers Map
 */
declare class PointRadiusDrawingControl extends BasicDrawingControl {
    private animationFrameId;
    private animationFrame;
    private initalCenter;
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    private startDrawAnimation;
    private stopDrawAnimation;
    private reorientRadiusLineFeature;
    onCompleteDrawing(e: any): void;
    onStartDrawing(e: any): void;
    onStartModify(e: any): void;
    onCompleteModify(e: any): void;
    makeFeatures(geoJSON: GeometryJSON): DrawingFeatures;
    private makeRadiusLineFromPoint;
    private pointsEqual;
    private toLine;
    private toPoint;
    private updatePointFromRadiusLine;
    private getFeatureFromDrawEvent;
    private getFeatureModifyEvent;
    setGeo(geoJSON: GeometryJSON): void;
    getStaticStyle(): Style | Style[];
    startDrawing(): void;
    private startDrawingInteraction;
    getShape(): Shape;
    getGeoType(): GeometryType;
    cancelDrawing(): void;
}
export default PointRadiusDrawingControl;
