import * as Cesium from 'cesium';
import UpdatedGeoReceiver from '../geo-receiver';
import DrawingControl from '../drawing-control';
import { Shape } from '../../shape-utils';
import { Geometry, GeometryJSON, GeometryJSONProperties, Extent } from '../../geometry';
declare type GeoProps = GeometryJSONProperties & {
    [index: string]: any;
};
declare type CoordinateListener = (coordinate: [number, number]) => void;
declare type ExtentListener = (extent: Extent) => void;
declare abstract class BasicDrawingControl implements DrawingControl {
    protected mapViewer: Cesium.Viewer;
    protected receiver: UpdatedGeoReceiver;
    protected mouseDragActive: boolean;
    protected drawingActive: boolean;
    protected properties: GeoProps;
    protected removeEventListeners: () => void;
    abstract startDrawing(): void;
    abstract getShape(): Shape;
    abstract setActive(active: boolean): void;
    abstract isActive(): boolean;
    protected constructor(mapViewer: Cesium.Viewer, receiver: UpdatedGeoReceiver);
    setProperties(properties: GeoProps): void;
    getProperties(): GeoProps;
    cancelDrawing(): void;
    isMouseDragActive(): boolean;
    isDrawing(): boolean;
    setGeo(geoJSON: GeometryJSON): void;
    protected geometryToGeoJSON(geometry: Geometry): GeometryJSON;
    protected updateGeo(geoJSON: GeometryJSON, notify: boolean): void;
    protected abstract geoJSONToLine(geoJSON: GeometryJSON): [number, number][];
    protected clientCoordinatesToMapCoordinates(x: number, y: number): [number, number] | false;
    protected addCoordinateClickListener(listener: CoordinateListener): void;
    protected addCoordinateDoubleClickListener(listener: CoordinateListener): void;
    protected addExtentListener(listener: ExtentListener): void;
    protected addCanvasEventListener(eventType: string, listener: EventListener): void;
}
export { BasicDrawingControl, CoordinateListener, ExtentListener };
