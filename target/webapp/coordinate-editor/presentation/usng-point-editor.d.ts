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
import Props from '../point-editor-props';
import { LatLonDD } from '../coordinate-converter';
declare class USNGPointEditor extends React.Component<Props> {
    unitConverter: {
        isUSNG: (usng: string) => 0 | string;
        USNGtoLL: (usng: 0 | string, getCenter: boolean) => LatLonDD;
    };
    constructor(props: Props);
    render(): JSX.Element;
}
export default USNGPointEditor;
