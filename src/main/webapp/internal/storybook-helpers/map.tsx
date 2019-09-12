import * as React from 'react'
import * as ol from 'openlayers'
import styled from 'styled-components'

type Props = {
  projection: string
  children: React.ReactNode
}

type State = {
  id: string
  map: ol.Map | null
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`
const MapContainer = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
`

const MapDiv = styled.div`
  width: 900px;
  height: 500px;
`

const renderChildren = (
  children: React.ReactNode,
  map: ol.Map
): React.ReactNode =>
  React.Children.map(
    children,
    child =>
      // @ts-ignore (`yarn test` doesn't like this)
      React.isValidElement(child) ? React.cloneElement(child, { map }) : null
  )

class Map extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      map: null,
      id: 'id' + Math.random(),
    }
  }

  componentDidMount() {
    const map = new ol.Map({
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      target: this.state.id,
      view: new ol.View({
        center: [0, 0],
        zoom: 2,
        projection: this.props.projection,
        rotation: 0,
      }),
    })
    this.setState({ map })
  }

  render() {
    const { id, map } = this.state
    const children = this.props.children
    return (
      <Root>
        {map === null ? null : renderChildren(children, map)}
        <MapContainer>
          <MapDiv id={id} className="map" />
        </MapContainer>
      </Root>
    )
  }
}

export default Map
