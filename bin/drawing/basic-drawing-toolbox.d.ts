import DrawingToolbox from './drawing-toolbox';
import DrawingControl from './drawing-control';
import { Shape } from '../shapes/shape';
import UpdatedGeoReceiver from './geo-receiver';
declare type DrawingControlMap = Map<Shape, DrawingControl>;
declare class BasicDrawingToolbox implements DrawingToolbox {
    protected toolbox: DrawingControlMap;
    protected listener: UpdatedGeoReceiver | null;
    protected toolboxListener: UpdatedGeoReceiver;
    constructor();
    getToolForShape(shape: Shape): DrawingControl;
    getToolsList(): DrawingControl[];
    setListener(listener: UpdatedGeoReceiver): void;
    removeListener(): void;
}
export default BasicDrawingToolbox;
