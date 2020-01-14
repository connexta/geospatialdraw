import { GeometryJSON } from '../geometry/geometry'
import { Shape } from '../shapes/shape'

/**
 * Drawing controls create drawing interactions and provides
 * a standard for managing the life-cycle of drawing interactions to
 * facilitate use in React applications.
 */
interface DrawingControl {
  /**
   * Sets the geometry to be rendered in the drawing control allowing the user to modify an existing geometry.
   * Note: This will call startDrawing() if it hasn't already been called.
   * @param geoJSON - GeometryJSON to render
   */
  setGeo(geoJSON: GeometryJSON): void

  /**
   * Starts drawing interaction
   */
  startDrawing(): void

  /**
   * Cancels drawing interaction
   */
  cancelDrawing(): void

  /**
   * Sets properties to geometry rendered by DrawingControl
   * @param properties - hash of property values
   */
  setProperties(properties: object): void

  /**
   * @returns true modification of the drawing geometry is currently being blocked by an active user interaction
   */
  isInputBlocked(): boolean

  /**
   * @returns true if the drawing interaction has been started
   */
  isDrawing(): boolean

  /**
   * @returns shape that drawing tool applies too
   */
  getShape(): Shape
}

export default DrawingControl
