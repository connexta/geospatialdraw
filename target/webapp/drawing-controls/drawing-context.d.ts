import * as ol from 'openlayers';
declare type EventListener = (e: any) => void;
declare type ListenerTarget = 'draw' | 'snap' | 'modify';
declare type ListenerRecord = {
    target: ListenerTarget;
    event: string;
    listener: EventListener;
};
/**
 * Open Layers drawing context provides a layer between the drawing controls
 * and the openlayers map, normalizing interactions with the openlayers map
 * accross all drawing controls.
 */
declare class DrawingContext {
    map: ol.Map;
    drawLayer: ol.layer.Vector;
    bufferLayer: ol.layer.Vector;
    modify: ol.interaction.Modify;
    snap: ol.interaction.Snap;
    draw: ol.interaction.Interaction | null;
    listenerList: ListenerRecord[];
    style: ol.style.Style | ol.StyleFunction | ol.style.Style[];
    geoFormat: ol.format.GeoJSON;
    animationFrameId: number;
    /**
     * Constructs an instance of the drawing context
     * @param map - reference to openlayers map
     * @param drawingStyle - drawingStyle to be used by all drawing controls
     */
    constructor({ map, drawingStyle, }: {
        map: ol.Map;
        drawingStyle: ol.style.Style | ol.StyleFunction | ol.style.Style[];
    });
    getStyle(): ol.style.Style | ol.StyleFunction | ol.style.Style[];
    removeFeature(): void;
    updateFeature(feature: ol.Feature): void;
    updateBufferFeature(feature: ol.Feature): void;
    protected bufferUpdateEvent(): void;
    setDrawInteraction(draw: ol.interaction.Interaction): void;
    setEvent(target: ListenerTarget, event: string, listener: EventListener): void;
    removeListeners(): void;
    addInteractions(): void;
    addInteractionsWithoutModify(): void;
    removeInteractions(): void;
    remakeInteractions(): void;
    setInteractionsActive(active: boolean): void;
    areInteractionsActive(): boolean;
    circleRadiusToMeters(radius: number): number;
}
export default DrawingContext;
