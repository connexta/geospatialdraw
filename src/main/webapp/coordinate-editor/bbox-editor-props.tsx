import { Extent } from '../geometry'

type BBox = {
  north: number
  south: number
  east: number
  west: number
}

const bboxToExtent = ({ west, south, east, north }: BBox): Extent => [
  west,
  south,
  east,
  north,
]

const extentToBBox = ([west, south, east, north]: Extent): BBox => ({
  west,
  south,
  east,
  north,
})

type BBoxEditorProps = BBox & {
  setBBox: (bbox: BBox) => void
}

export { BBox, bboxToExtent, extentToBBox, BBoxEditorProps }
