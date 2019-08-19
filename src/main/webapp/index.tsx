import * as coordinates from './coordinate-editor'
import * as drawing from './drawing-controls'
import _DrawingMenu from './drawing-menu'
import * as geometry from './geometry'
import _Renderer from './renderer'
import * as shapes from './shape-utils'

export namespace renderer {
  export const Renderer = _Renderer
}
export namespace menu {
  export const DrawingMenu = _DrawingMenu
}
export { coordinates, drawing, geometry, shapes }
