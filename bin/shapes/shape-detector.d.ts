import Feature from 'ol/Feature';
import { GeometryJSON } from '../geometry/geometry';
import { Shape } from './shape';
/**
 * Detects shapes of GeometryJSON objects by evaluating their geometric contents
 */
declare class ShapeDetector {
    private geoFormat;
    /**
     * Constructs an instance of the ShapeDetector
     */
    constructor();
    /**
     * Gets the shape of GeometryJSON object
     * @param geoJSON - GeometryJSON object
     * @returns Shape of geometry
     */
    shapeFromGeoJSON(geoJSON: GeometryJSON): Shape;
    /**
     * Gets the shape of an Open Layers feature
     * @param feature - Open Layers feature
     * @returns Shape of geometry
     */
    shapeFromFeature(feature: Feature): Shape;
    private getGeometryType;
    private getFeatureBufferWidth;
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a line
     */
    isLineFeature(feature: Feature): boolean;
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a point
     */
    isPointFeature(feature: Feature): boolean;
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a bounding box
     */
    isBoundingBoxFeature(feature: Feature): boolean;
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a point radius
     */
    isPointRadiusFeature(feature: Feature): boolean;
    /**
     * Checks if feature matches shape
     * @param feature - Open Layers feature
     * @returns true if geometry is a polygon
     */
    isPolygonFeature(feature: Feature): boolean;
}
export default ShapeDetector;
