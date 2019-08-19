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
import * as React from 'react';
import * as ol from 'openlayers';
import { Shape } from '../shape-utils';
import { DrawingContext, DrawingControl, UpdatedGeoReceiver } from '../drawing-controls';
import { HTMLAttributes } from '../internal/html';
import { GeometryJSON } from '../geometry';
declare type Props = HTMLAttributes & {
    /** Geometry Shape to draw */
    shape: Shape | null;
    /** Open Layers Map to draw on */
    map: ol.Map;
    /** True if the draw menu should be displayed */
    isActive: boolean;
    /** True if the coordinate editor popup should be displayed */
    showCoordinateEditor?: boolean;
    /** True if the Apply button should be replaced with a Save & Continue button */
    saveAndContinue?: boolean;
    /** Title of Geometry being edited */
    title?: string;
    /** Geometry JSON to edit */
    geometry: GeometryJSON | null;
    /** Called when show coordinate editor button is clicked (should set `showCoordinateEditor` flag) */
    toggleCoordinateEditor?: () => void;
    /** Called when cancel button is clicked */
    onCancel: () => void;
    /** Called when ok button is clicked */
    onOk: () => void;
    /** Called when the shape changes (should set `shape`) */
    onSetShape: (shape: string) => void;
    /** Called when the Geometry JSON is updated */
    onUpdate: UpdatedGeoReceiver;
    /** List of shapes to hide from menu */
    disabledShapes?: Shape[];
    /** Style to apply to geometries drawn on the map */
    mapStyle: ol.StyleFunction | ol.style.Style | ol.style.Style[];
};
declare type DrawingControlMap = Map<Shape, DrawingControl>;
declare class DrawingMenu extends React.Component<Props> {
    drawingContext: DrawingContext;
    controlsMap: DrawingControlMap;
    setShape: (shape: string) => void;
    acceptEdit: () => void;
    cancelClick: () => void;
    constructor(props: Props);
    drawShape(): void;
    cancelShapeDrawing(): void;
    setDrawingActive(active: boolean): void;
    isDrawing(): boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: Props): void;
    renderShapeButton(shape: Shape, icon: any): JSX.Element | null;
    render(): JSX.Element;
}
export default DrawingMenu;
