/** @internal */

import * as React from 'react'
import OpenLayersMap from 'ol/Map'
import View from 'ol/View'
import Tile from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import styled from 'styled-components'

type Props = {
  projection: string
  children: React.ReactNode
}

type State = {
  map: OpenLayersMap | null
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
  map: OpenLayersMap
): React.ReactNode =>
  React.Children.map(
    children,
    child =>
      // @ts-ignore (`yarn test` doesn't like this)
      React.isValidElement(child) ? React.cloneElement(child, { map }) : null
  )

class Map extends React.Component<Props, State> {
  setMapDiv: (element: HTMLElement | null) => void
  mapDivElement: HTMLElement
  constructor(props: Props) {
    super(props)
    this.setMapDiv = element => {
      this.mapDivElement = element || document.createElement('div')
    }
    this.state = {
      map: null,
    }
  }

  componentDidMount() {
    const map = new OpenLayersMap({
      layers: [
        new Tile({
          source: new OSM(),
        }),
      ],
      target: this.mapDivElement,
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: this.props.projection,
        rotation: 0,
      }),
    })
    this.mapDivElement
      .querySelectorAll('.ol-overlaycontainer-stopevent, .ol-overlaycontainer')
      .forEach((el: any) => (el.style.display = 'none'))
    this.setState({ map })
  }

  render() {
    const { map } = this.state
    const children = this.props.children
    return (
      <Root>
        {map === null ? null : renderChildren(children, map)}
        <MapContainer>
          <MapDiv ref={this.setMapDiv} className="map" />
        </MapContainer>
      </Root>
    )
  }
}

export default Map
