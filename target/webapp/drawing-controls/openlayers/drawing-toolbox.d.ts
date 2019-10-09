import * as ol from 'openlayers';
import BasicDrawingToolbox from '../basic-drawing-toolbox';
/**
 * Open Layers drawing toolbox
 */
declare class OpenLayersDrawingToolbox extends BasicDrawingToolbox {
    private drawingContext;
    /**
     * Constructs an instance of Open Layers drawing toolbox
     * @param map - reference to openlayers map
     * @param drawingStyle - drawingStyle to be used by all drawing controls
     */
    constructor({ map, drawingStyle, }: {
        map: ol.Map;
        drawingStyle: ol.style.Style | ol.StyleFunction | ol.style.Style[];
    });
}
export default OpenLayersDrawingToolbox;
