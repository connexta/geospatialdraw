import * as React from 'react';
import { Shape } from '../shape-utils';
import { DrawingToolbox, UpdatedGeoReceiver } from '../drawing-controls';
import { HTMLAttributes } from '../internal/html';
import { GeometryJSON } from '../geometry';
declare type Props = HTMLAttributes & {
    shape: Shape | null;
    toolbox: DrawingToolbox;
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
};
declare class DrawingMenu extends React.Component<Props> {
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
