import { Shape } from '../shapes/shape';
import DrawingControl from './drawing-control';
import UpdatedGeoReceiver from './geo-receiver';
/**
 * Drawing Toolbox maintains a collection of shape specific drawing tools
 * for a given mapping implementation.
 */
interface DrawingToolbox {
    getToolForShape(shape: Shape): DrawingControl;
    getToolsList(): DrawingControl[];
    setListener(listener: UpdatedGeoReceiver): void;
    removeListener(): void;
}
export default DrawingToolbox;
