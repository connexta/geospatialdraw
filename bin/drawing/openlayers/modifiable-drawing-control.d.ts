import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from '../geo-receiver';
import BasicDrawingControl from './basic-drawing-control';
import { GeometryJSON } from '../../geometry/geometry';
declare abstract class ModifiableDrawingControl extends BasicDrawingControl {
    protected constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    getGeoJSONFromCompleteDrawEvent(e: any): GeometryJSON;
    getGeoJSONFromCompleteModifyEvent(e: any): GeometryJSON;
    onCompleteDrawing(e: any): void;
    onStartDrawing(_e: any): void;
    onStartModify(_e: any): void;
    onCompleteModify(e: any): void;
    makeFeature(geoJSON: GeometryJSON): Feature;
    getStaticStyle(feature: Feature): Style | Style[];
    protected abstract makeEmptyFeature(): Feature;
    getDefaultStaticStyle(): Style | Style[];
    setGeo(geoJSON: GeometryJSON): void;
    startDrawing(): void;
    private startDrawingInteraction;
}
export default ModifiableDrawingControl;
