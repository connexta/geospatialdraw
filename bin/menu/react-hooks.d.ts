import { DrawingToolbox, UpdatedGeoReceiver } from '../drawing';
import { GeometryJSON } from '../geometry/geometry';
/**
 * React hook for drawing menu functionality.
 * Updates toolbox control with input from react component.
 * @params object - drawing menu props
 */
declare const useDrawingMenu: ({ isActive, showCoordinateEditor, onUpdate, shape, toolbox, geometry, defaultGeoProperties, }: {
    isActive: boolean;
    showCoordinateEditor?: boolean | undefined;
    onUpdate: UpdatedGeoReceiver;
    shape: "Point" | "Polygon" | "Bounding Box" | "Point Radius" | "Line" | null;
    toolbox: DrawingToolbox;
    geometry: GeometryJSON | null;
    defaultGeoProperties?: object | undefined;
}) => void;
export default useDrawingMenu;
