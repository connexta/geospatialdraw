import { BBox } from 'geospatialdraw/bin/coordinates/geometry/bbox'

type BBoxEditorProps = {
  bbox: BBox
  setBBox: (bbox: BBox) => void
}

export default BBoxEditorProps
