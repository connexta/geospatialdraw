import { useEffect } from 'react'
import { Shape } from '../shapes'
import { DrawingToolbox, DrawingControl, UpdatedGeoReceiver } from '../drawing'
import { GeometryJSON } from '../geometry/geometry'
import useGeometryJSONMemo from '../geometry/memo'

/**
 * React hook for drawing menu functionality.
 * Updates toolbox control with input from react component.
 * @params object - drawing menu props
 */
const useDrawingMenu = ({
  isActive,
  showCoordinateEditor,
  onUpdate,
  shape,
  toolbox,
  geometry,
  defaultGeoProperties,
}: {
  isActive: boolean
  showCoordinateEditor?: boolean
  onUpdate: UpdatedGeoReceiver
  shape: Shape | null
  toolbox: DrawingToolbox
  geometry: GeometryJSON | null
  defaultGeoProperties?: object
}) => {
  const geometryMemo = useGeometryJSONMemo(geometry)
  useEffect(() => {
    const cancelShapeDrawing = () => {
      toolbox.getToolsList().forEach((control: DrawingControl) => {
        control.cancelDrawing()
      })
    }
    if (shape === null || !toolbox.getToolForShape(shape).isInputBlocked()) {
      cancelShapeDrawing()
      if (isActive && !showCoordinateEditor && shape !== null) {
        const control = toolbox.getToolForShape(shape)
        if (defaultGeoProperties) {
          control.setProperties(defaultGeoProperties)
        }
        control.startDrawing()
        if (geometry !== null) {
          control.setGeo(geometry)
        }
      }
    }
    return cancelShapeDrawing
  }, [geometryMemo, shape, isActive, showCoordinateEditor])
  useEffect(() => {
    toolbox.setListener(onUpdate)
    return () => {
      toolbox.removeListener()
    }
  }, [toolbox])
}

export default useDrawingMenu
