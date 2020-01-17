import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import GeometryType from 'ol/geom/GeometryType';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from '../geo-receiver';
import DrawingControl from '../drawing-control';
import { Shape } from '../../shapes/shape';
import { GeometryJSON, GeometryJSONProperties } from '../../geometry/geometry';
declare type GeoProps = GeometryJSONProperties & {
    [index: string]: any;
};
declare abstract class BasicDrawingControl implements DrawingControl {
    protected context: DrawingContext;
    protected receiver: UpdatedGeoReceiver;
    protected geoFormat: GeoJSON;
    protected inputBlocked: boolean;
    protected drawingActive: boolean;
    protected properties: GeoProps;
    abstract setGeo(geoJSON: GeometryJSON): void;
    abstract startDrawing(): void;
    abstract getShape(): Shape;
    protected constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    setProperties(properties: GeoProps): void;
    getProperties(): GeoProps;
    protected applyPropertiesToFeature(feature: Feature): void;
    protected abstract getGeoType(): GeometryType;
    protected featureToGeo(feature: Feature): GeometryJSON;
    protected writeExtendedGeoJSON(feature: Feature): GeometryJSON;
    cancelDrawing(): void;
    isInputBlocked(): boolean;
    isDrawing(): boolean;
    protected formatLabelNumber(n: number): string;
}
export default BasicDrawingControl;
