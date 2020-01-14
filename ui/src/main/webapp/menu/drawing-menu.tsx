import * as React from 'react'
import styled from 'styled-components'
import {
  Shape,
  LINE,
  POLYGON,
  BOUNDING_BOX,
  POINT,
  POINT_RADIUS,
} from 'geospatialdraw/bin/shapes/shape'
import { transparentize, readableColor } from 'polished'
import {
  BboxIcon,
  CircleIcon,
  LineIcon,
  PolygonIcon,
  PointIcon,
  EditCoordinatesIcon,
} from './icons'
import BaseProps from './props'
import useDrawingMenu from 'geospatialdraw/bin/menu/react-hooks'

type Props = BaseProps & {
  iconColor?: string
}

const InvisibleBackground = styled.div`
  display: none;
`
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-shrink: 1;
  height: 100%;
  font-size: ${props => props.theme.largeFontSize};
`
const TitleLabel = styled.div`
  color: ${props => readableColor(props.theme.positiveColor)};
  align-self: center;
  padding-left: ${props => props.theme.largeSpacing};
  padding-right: ${props => props.theme.minimumSpacing};
  flex: 0 0 auto;
`
const Title = styled.div`
  color: ${props => readableColor(props.theme.positiveColor)};
  font-weight: bold;
  align-self: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 0 1 auto;
`
const ShapeMenu = styled.div`
  height: 100%;
  display: flex;
  border-right: 1px solid ${props => props.theme.backgroundSlideout};
  border-left: 1px solid ${props => props.theme.backgroundSlideout};
  font-size: ${props => props.theme.minimumFontSize};
`
const ToolMenu = styled.div`
  height: 100%;
  display: flex;
  font-size: ${props => props.theme.minimumFontSize};
`
const ControlsGroup = styled.div`
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: right;
  flex: 0 0 auto;
`
const Button = styled.div<{
  isSubmit: boolean
  onClick: () => void
  buttonType: 'primaryColor' | 'positiveColor'
}>`
  height: 100%;
  font-size: ${props => props.theme.largeFontSize};
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: ${props => props.theme.minimumButtonSize};
  padding: 0;
  margin: 0;
  opacity: ${props => props.theme.minimumOpacity};
  cursor: pointer;
  color: ${props => readableColor(props.theme[props.buttonType])};
  width: 5em;
  background-color: ${props => props.theme[props.buttonType]};
  :hover {
    opacity: 1;
  }
`
const SelectableButton = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(${({ theme }) => theme.largeFontSize} * 1.5);
  padding: ${({ theme }) => theme.mediumSpacing};
  opacity: ${props => (props.isSelected ? 1 : props.theme.minimumOpacity)};
  cursor: pointer;
  color: ${props => readableColor(props.theme.positiveColor)};
  border: 1px solid
    ${props =>
      props.isSelected
        ? readableColor(props.theme.positiveColor)
        : 'transparent'};
  :hover {
    opacity: 1;
    border: 1px solid ${props => readableColor(props.theme.positiveColor)};
  }
`
const DrawingBackground = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 100%;
  background-color: ${props => transparentize(0.2, props.theme.positiveColor)};
`

const DrawingMenu: React.SFC<Props> = ({
  toolbox,
  shape,
  isActive,
  geometry,
  onCancel,
  onOk,
  onSetShape,
  onUpdate,
  title,
  saveAndContinue,
  showCoordinateEditor,
  toggleCoordinateEditor,
  disabledShapes,
  defaultGeoProperties,
  iconColor = '#FFFFFF',
  ...rest
}) => {
  useDrawingMenu({
    toolbox,
    shape,
    isActive,
    geometry,
    onUpdate,
    showCoordinateEditor,
    defaultGeoProperties,
  })
  const renderShapeButton = (renderedShape: Shape, icon: any) => {
    return disabledShapes && disabledShapes.includes(renderedShape) ? null : (
      <SelectableButton
        isSelected={shape === renderedShape}
        onClick={() => onSetShape(renderedShape)}
        title={`Draw ${renderedShape}`}
      >
        {icon}
      </SelectableButton>
    )
  }
  const Background = isActive ? DrawingBackground : InvisibleBackground
  const acceptEditButton = saveAndContinue ? 'Next' : 'Apply'
  const acceptEditAlt = saveAndContinue
    ? 'Save And Continue Drawing'
    : 'Accept Edit'
  return (
    <Background {...rest}>
      <TitleContainer>
        {title === undefined ? null : (
          <React.Fragment>
            <TitleLabel>Editing Shape:</TitleLabel>
            <Title>{title}</Title>
          </React.Fragment>
        )}
      </TitleContainer>
      <ControlsGroup>
        <ShapeMenu>
          {renderShapeButton(LINE, <LineIcon color={iconColor} />)}
          {renderShapeButton(POLYGON, <PolygonIcon color={iconColor} />)}
          {renderShapeButton(BOUNDING_BOX, <BboxIcon color={iconColor} />)}
          {renderShapeButton(POINT_RADIUS, <CircleIcon color={iconColor} />)}
          {renderShapeButton(POINT, <PointIcon color={iconColor} />)}
        </ShapeMenu>
        {showCoordinateEditor === undefined ||
        toggleCoordinateEditor === undefined ? null : (
          <ToolMenu>
            <SelectableButton
              isSelected={showCoordinateEditor}
              onClick={toggleCoordinateEditor}
              title="Edit Coordinates"
            >
              <EditCoordinatesIcon color={iconColor} />
            </SelectableButton>
          </ToolMenu>
        )}
        <Button
          isSubmit={false}
          buttonType="positiveColor"
          onClick={onCancel}
          title="Cancel Edit"
        >
          Cancel
        </Button>
        <Button
          isSubmit={false}
          buttonType="primaryColor"
          onClick={onOk}
          title={acceptEditAlt}
        >
          {acceptEditButton}
        </Button>
      </ControlsGroup>
    </Background>
  )
}

export default DrawingMenu
