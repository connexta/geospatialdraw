import Feature from 'ol/Feature';
import { DrawEvent } from 'ol/interaction/Draw';
import { ModifyEvent } from 'ol/interaction/Modify';
import Style from 'ol/style/Style';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from '../geo-receiver';
import BasicDrawingControl from './basic-drawing-control';
import { GeometryJSON } from '../../geometry/geometry';
declare abstract class ModifiableDrawingControl extends BasicDrawingControl {
    protected constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    onStartDrawing(_e: DrawEvent): void;
    onCompleteDrawing(e: DrawEvent): void;
    onStartModify(_e: ModifyEvent): void;
    onCompleteModify(e: ModifyEvent): void;
    makeFeature(geoJSON: GeometryJSON): Feature;
    getStaticStyle(feature: Feature): Style | Style[];
    protected abstract makeEmptyFeature(): Feature;
    getDefaultStaticStyle(): Style | Style[];
    setGeo(geoJSON: GeometryJSON): void;
    startDrawing(): void;
    private startDrawingInteraction;
    protected abstract updateLabel(feature: Feature): void;
}
export default ModifiableDrawingControl;
