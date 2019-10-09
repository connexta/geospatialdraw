import { BasicDrawingControl } from './basic-drawing-control';
import { Shape } from '../../shape-utils';
declare class BoundingBoxDrawingControl extends BasicDrawingControl {
    private setExtent;
    startDrawing(): void;
    getShape(): Shape;
    setActive(active: boolean): void;
    isActive(): boolean;
}
export default BoundingBoxDrawingControl;
