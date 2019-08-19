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
import { CoordinateUnit } from '../units';
import { HTMLAttributes } from '../../internal/html';
declare type Props = HTMLAttributes & {
    /** Called when ok button is clicked */
    onOk: () => void;
    /** Called when unit changes (should set unit) */
    setUnit: (unit: CoordinateUnit) => void;
    /** Children nodes to display in dialog */
    children: React.ReactNode;
    /** Coordinate unit to display */
    unit: CoordinateUnit;
};
declare const CoordinateEditorDialog: React.SFC<Props>;
export default CoordinateEditorDialog;
