import { GeometryJSON } from './geometry';
declare type GeometryJSONMemo = {
    coordinates: [number, number][];
    properties: string;
};
declare type PropertiesToString = (properties: object) => string;
/**
 * React hook for memoizing GeometryJSON
 * so that changes to GeometryJSON objects can
 * be tracked more efficiently than using JSON.stringify
 * @params geometry - GeometryJSON value
 * @params propertiesToString - function for serializing
 * properties on the GeometryJSON. This defaults to JSON.stringify
 * @returns memo
 */
declare const useGeometryJSONMemo: (geometry: GeometryJSON | null, propertiesToString?: PropertiesToString) => GeometryJSONMemo;
export default useGeometryJSONMemo;
