import * as React from 'react';
import * as ol from 'openlayers';
declare type Props = {
    projection: string;
    children: React.ReactNode;
};
declare type State = {
    id: string;
    map: ol.Map | null;
};
declare class Map extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element;
}
export default Map;
