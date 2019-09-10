/**
 * Copyright (c) Codice Foundation
 *
 * This is free software: you can redistribute it and/or modify it under the terms of the GNU Lesser
 * General Public License as published by the Free Software Foundation, either version 3 of the
 * License, or any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details. A copy of the GNU Lesser General Public License
 * is distributed along with this program and can be found at
 * <http://www.gnu.org/licenses/lgpl.html>.
 *
 **/
import { GeometryJSON } from '../geometry';
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
    setGeo(geoJSON: GeometryJSON): void;
    /**
     * Starts drawing interaction
     */
    startDrawing(): void;
    /**
     * Cancels drawing interaction
     */
    cancelDrawing(): void;
    /**
     * Pauses and un-pauses the drawing interaction while continuing to render the drawn geometries
     */
    setActive(active: boolean): void;
    /**
     * @returns true if the drawing interaction is actively listening to user input
     */
    isActive(): boolean;
    /**
     * Sets properties to geometry rendered by DrawingControl
     * @param properties - hash of property values
     */
    setProperties(properties: object): void;
    /**
     * @returns true if mouse movement is being tracked for a dragging event.
     */
    isMouseDragActive(): boolean;
    /**
     * @returns true if the drawing interaction has been started
     */
    isDrawing(): boolean;
}
export default DrawingControl;
