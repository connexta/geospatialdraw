import * as ol from 'openlayers';
import DrawingToolbox from '../drawing-toolbox';
import DrawingControl from '../drawing-control';
import { Shape } from '../../shape-utils';
import UpdatedGeoReceiver from '../geo-receiver';
/**
 * Open Layers drawing toolbox
 */
declare class OpenLayersDrawingToolbox implements DrawingToolbox {
    private drawingContext;
    private toolbox;
    private listener;
    private toolboxListener;
    /**
     * Constructs an instance of Open Layers drawing toolbox
     * @param map - reference to openlayers map
     * @param drawingStyle - drawingStyle to be used by all drawing controls
     */
    constructor({ map, drawingStyle, }: {
        map: ol.Map;
        drawingStyle: ol.style.Style | ol.StyleFunction | ol.style.Style[];
    });
    getToolForShape(shape: Shape): DrawingControl;
    getToolsList(): DrawingControl[];
    setListener(listener: UpdatedGeoReceiver): void;
    removeListener(): void;
}
export default OpenLayersDrawingToolbox;
