/** @internal */
import * as React from 'react';
declare type PropDefinition = {
    required?: boolean;
    propType?: string;
    defaultValue?: string;
    description?: string;
};
interface PropTypes {
    [key: string]: PropDefinition;
}
declare const tableComponentFactory: (propTypes: PropTypes) => React.FunctionComponent<{}>;
export default tableComponentFactory;
