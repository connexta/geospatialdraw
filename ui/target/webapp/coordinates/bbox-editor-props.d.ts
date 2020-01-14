import { BBox } from 'geospatialdraw/bin/coordinates/geometry/bbox';
declare type BBoxEditorProps = {
    bbox: BBox;
    setBBox: (bbox: BBox) => void;
};
export default BBoxEditorProps;
