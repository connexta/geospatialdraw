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
import * as ol from 'openlayers';
declare type EventListener = (e: any) => void;
declare type ListenerTarget = 'draw' | 'snap' | 'modify';
declare type ListenerRecord = {
    target: ListenerTarget;
    event: string;
    listener: EventListener;
};
declare class DrawingContext {
    map: ol.Map;
    drawLayer: ol.layer.Vector;
    bufferLayer: ol.layer.Vector;
    modify: ol.interaction.Modify;
    snap: ol.interaction.Snap;
    draw: ol.interaction.Interaction | null;
    listenerList: ListenerRecord[];
    style: ol.style.Style | ol.StyleFunction | ol.style.Style[];
    geoFormat: ol.format.GeoJSON;
    animationFrameId: number;
    constructor({ map, drawingStyle, }: {
        map: ol.Map;
        drawingStyle: ol.style.Style | ol.StyleFunction | ol.style.Style[];
    });
    getStyle(): ol.style.Style | ol.StyleFunction | ol.style.Style[];
    updateFeature(feature: ol.Feature): void;
    updateBufferFeature(feature: ol.Feature): void;
    protected bufferUpdateEvent(): void;
    setDrawInteraction(draw: ol.interaction.Interaction): void;
    setEvent(target: ListenerTarget, event: string, listener: EventListener): void;
    removeListeners(): void;
    addInteractions(): void;
    addInteractionsWithoutModify(): void;
    removeInteractions(): void;
    remakeInteractions(): void;
    setInteractionsActive(active: boolean): void;
    areInteractionsActive(): boolean;
    circleRadiusToMeters(radius: number): number;
}
export default DrawingContext;
