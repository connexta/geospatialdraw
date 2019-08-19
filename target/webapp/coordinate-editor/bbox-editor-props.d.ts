declare type BBox = {
    north: number;
    south: number;
    east: number;
    west: number;
};
declare const bboxToExtent: ({ west, south, east, north }: BBox) => [number, number, number, number];
declare const extentToBBox: ([west, south, east, north]: [number, number, number, number]) => BBox;
declare type BBoxEditorProps = BBox & {
    setBBox: (bbox: BBox) => void;
};
export { BBox, bboxToExtent, extentToBBox, BBoxEditorProps };
