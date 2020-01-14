import Map from 'ol/Map';
import { StyleLike } from 'ol/style/Style';
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
    constructor({ map, drawingStyle }: {
        map: Map;
        drawingStyle: StyleLike;
    });
}
export default OpenLayersDrawingToolbox;
