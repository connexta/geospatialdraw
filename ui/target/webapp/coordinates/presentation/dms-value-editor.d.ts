import * as React from 'react';
import { DMS } from 'geospatialdraw/bin/coordinates/dms-formatting';
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
