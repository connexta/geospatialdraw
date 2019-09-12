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
    shape: Shape | null;
    map: ol.Map;
    isActive: boolean;
    showCoordinateEditor?: boolean;
    saveAndContinue?: boolean;
    title?: string;
    geometry: GeometryJSON | null;
    toggleCoordinateEditor?: () => void;
    onCancel: () => void;
    onOk: () => void;
    onSetShape: (shape: Shape) => void;
    onUpdate: UpdatedGeoReceiver;
    disabledShapes?: Shape[];
    mapStyle: ol.StyleFunction | ol.style.Style | ol.style.Style[];
};
declare type DrawingControlMap = Map<Shape, DrawingControl>;
declare class DrawingMenu extends React.Component<Props> {
    drawingContext: DrawingContext;
    controlsMap: DrawingControlMap;
    setShape: (shape: Shape) => void;
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
