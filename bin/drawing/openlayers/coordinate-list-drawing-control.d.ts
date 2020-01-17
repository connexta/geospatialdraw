import { DrawEvent } from 'ol/interaction/Draw';
import { ModifyEvent } from 'ol/interaction/Modify';
import DrawingContext from './drawing-context';
import UpdatedGeoReceiver from '../geo-receiver';
import ModifiableDrawingControl from './modifiable-drawing-control';
/**
 * Drawing Control for shapes that contain a list of coordinates on an Open Layers Map
 */
declare abstract class CoordinateListDrawingControl extends ModifiableDrawingControl {
    private animationFrameId;
    private animationFrame;
    /**
     * Creates drawing control
     * @param context - Drawing context
     * @param receiver - callback for returning updates to GeometryJSON
     */
    constructor(context: DrawingContext, receiver: UpdatedGeoReceiver);
    onStartDrawing(e: DrawEvent): void;
    onCompleteDrawing(e: DrawEvent): void;
    onStartModify(e: ModifyEvent): void;
    onCompleteModify(e: ModifyEvent): void;
    private startDrawAnimation;
    private stopDrawAnimation;
}
export default CoordinateListDrawingControl;
