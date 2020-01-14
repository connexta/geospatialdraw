import { GeometryJSON } from 'geospatialdraw/bin/geometry/geometry';
import { CoordinateUnit } from 'geospatialdraw/bin/coordinates/units';
declare type Props = {
    /** Geometry GeoJSON */
    geo: GeometryJSON;
    /** Coordinate Unit */
    coordinateUnit: CoordinateUnit;
    /** Called when GeoJSON changes */
    onUpdateGeo: (geo: GeometryJSON) => void;
};
export default Props;
