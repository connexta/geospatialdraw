import Map from 'ol/Map';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import Modify from 'ol/interaction/Modify';
import Interaction from 'ol/interaction/Interaction';
import { StyleLike } from 'ol/style/Style';
declare type EventHandler = (e: any) => void;
declare type ListenerTarget = 'draw' | 'snap' | 'modify' | 'map';
/**
 * Open Layers drawing context provides a layer between the drawing controls
 * and the openlayers map, normalizing interactions with the openlayers map
 * accross all drawing controls.
 */
declare class DrawingContext {
    private map;
    private drawLayer;
    private bufferLayer;
    private modify;
    private snap;
    private draw;
    private listenerList;
    private style;
    private geoFormat;
    private animationFrameId;
    /**
     * Constructs an instance of the drawing context
     * @param map - reference to openlayers map
     * @param drawingStyle - drawingStyle to be used by all drawing controls
     */
    constructor({ map, drawingStyle }: {
        map: Map;
        drawingStyle: StyleLike;
    });
    getStyle(): StyleLike;
    removeFeature(): void;
    updateFeature(feature: Feature): void;
    updateBufferFeature(feature: Feature, animate?: boolean): void;
    protected bufferUpdateEvent(): void;
    setModifyInteraction(modify: Modify): void;
    getSource(): VectorSource;
    setDrawInteraction(draw: Interaction): void;
    setEvent(target: ListenerTarget, event: string, handler: EventHandler): void;
    removeListener(target: ListenerTarget, event: string, handler: EventHandler): void;
    removeListeners(): void;
    addInteractions(): void;
    addInteractionsWithoutModify(): void;
    removeInteractions(): void;
    remakeInteractions(): void;
    circleRadiusToMeters(radius: number): number;
}
export default DrawingContext;
