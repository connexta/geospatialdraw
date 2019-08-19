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
import { DMS } from '../dms-formatting';
declare type BaseProps = {
    /** DMS value */
    value: DMS;
    /** Called on change */
    setValue: (value: DMS) => void;
};
declare type Props = BaseProps & {
    maxDegrees: number;
    negativeHeadingTooltip: string;
    positiveHeadingTooltip: string;
    negativeHeadingName: string;
    positiveHeadingName: string;
};
declare const DMSValueEditor: React.SFC<Props>;
declare const DMSLatitudeEditor: React.SFC<BaseProps>;
declare const DMSLongitudeEditor: React.SFC<BaseProps>;
export { DMSLatitudeEditor, DMSLongitudeEditor, DMSValueEditor };
