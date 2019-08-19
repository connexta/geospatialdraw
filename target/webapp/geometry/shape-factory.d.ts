import { GeometryJSON } from './geometry';
import { LengthUnit } from './units';
declare const makePointGeo: (id: string, lat: number, lon: number) => GeometryJSON;
declare const makePointRadiusGeo: (id: string, lat: number, lon: number, radius: number, radiusUnit: LengthUnit) => GeometryJSON;
declare const makePolygonGeo: (id: string, lonLatCoordinateList: [number, number][], buffer: number, bufferUnit: LengthUnit) => GeometryJSON;
declare const makeLineGeo: (id: string, lonLatCoordinateList: [number, number][], buffer: number, bufferUnit: LengthUnit) => GeometryJSON;
declare const makeBBoxGeo: (id: string, extent: [number, number, number, number]) => GeometryJSON;
export { makeBBoxGeo, makeLineGeo, makePointGeo, makePointRadiusGeo, makePolygonGeo, };
