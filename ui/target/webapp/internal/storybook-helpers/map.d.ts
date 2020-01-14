/** @internal */
import * as React from 'react';
import OpenLayersMap from 'ol/Map';
declare type Props = {
    projection: string;
    children: React.ReactNode;
};
declare type State = {
    map: OpenLayersMap | null;
};
declare class Map extends React.Component<Props, State> {
    setMapDiv: (element: HTMLElement | null) => void;
    mapDivElement: HTMLElement;
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element;
}
export default Map;
