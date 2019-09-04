import React, { PureComponent, Fragment } from 'react';
import { PanelProps, PanelPlugin } from '@grafana/ui';
import { StaticMap } from 'react-map-gl';
import {ScatterplotLayer} from '@deck.gl/layers';
import {DataFilterExtension} from '@deck.gl/extensions';
import DeckGL from 'deck.gl';
import { any } from 'prop-types';

export interface Props extends PanelProps {
  radius?: number;
  upperPercentile?: number;
  coverage?: number;
  mapStyle?: string;
  onHover?: Function;
}
const MAPBOX_TOKEN = 'pk.eyJ1Ijoiemhhbmd1Y2FuIiwiYSI6ImNqZ2t4d2hybTFoczEzM3BxZHNiZmx5ODEifQ.cRxbqbN3MrW454UdMfoc6w';
// const DATA_URL =
//   'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'; // eslint-disable-line

const INITIAL_VIEW_STATE = {
  latitude: 36.5,
  longitude: -120,
  zoom: 5.5,
  pitch: 0,
  bearing: 0
};  

const MS_PER_DAY = 8.64e7; // milliseconds in a day

const dataFilter = new DataFilterExtension({filterSize: 1});




export class MyPanel extends PureComponent<Props> {

  timeRange = this._getTimeRange(this.props.data);
  state = {
    x: any,
    y: any,
    timeRange: this.timeRange,
    filterValue: this.timeRange,
    hoveredObject: null
  };
  _getTimeRange(data: any) {
    if (!data) {
      return null;
    }
    return data.reduce( 
      (range: any, d: any) => {
        const t = d.timestamp / MS_PER_DAY;
        range[0] = Math.min(range[0], t);
        range[1] = Math.max(range[1], t);
        return range;
      },
      [Infinity, -Infinity]
    );
  }

  _onHover({x, y, object} :any) {
    this.setState({x, y, hoveredObject: object});
  }

  _renderLayers() {
    const {data} = this.props;
    const {filterValue} = this.state;

    return [
      data &&
        new ScatterplotLayer({
          id: 'earthquakes',
          data,
          opacity: 0.8,
          radiusScale: 100,
          radiusMinPixels: 1,
          wrapLongitude: true,
          getPosition: (d:any) => [d.longitude, d.latitude, -d.depth * 1000],
          getRadius: (d:any) => Math.pow(2, d.magnitude),
          getFillColor: (d:any) => {
            const r = Math.sqrt(Math.max(d.depth, 0));
            return [255 - r * 15, r * 5, r * 10];
          },
          getFilterValue: (d:any) => d.timestamp / MS_PER_DAY, // in days
          filterRange: [filterValue[0], filterValue[1]],
          filterSoftRange: [
            filterValue[0] * 0.9 + filterValue[1] * 0.1,
            filterValue[0] * 0.1 + filterValue[1] * 0.9
          ],
          extensions: [dataFilter],

          pickable: true,
          onHover: this._onHover
        })
    ];
  }

  _formatLabel(t: number) {
    const date = new Date(t * MS_PER_DAY);
    return `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}`;
  }

  // _renderLayers2() {
  //   const { radius = 50, upperPercentile = 100, coverage = 0.7 } = this.props;
  //   const data = this.props.data;
  //   const coordinate = [];
  //   for (const item of data.series) {
  //     if (item.rows[0]) {
  //       const row = item.rows[0];
  //       if (row[0]) {
  //         const gson = JSON.parse(row[0]);
  //         if (gson.wgs84Lng && gson.wgs84Lat) {
  //           coordinate.push([Number(gson.wgs84Lng), Number(gson.wgs84Lat)]);
  //         }
  //       }
  //     }
  //   }
  //   console.log(coordinate);
  //   return [
  //     new HexagonLayer({
  //       id: 'heatmap',
  //       colorRange,
  //       coverage,
  //       data: coordinate,
  //       elevationRange: [0, 3000],
  //       elevationScale: this.state.elevationScale,
  //       extruded: true,
  //       getPosition: (d: any) => d,
  //       onHover: this.props.onHover,
  //       opacity: 1,
  //       pickable: Boolean(this.props.onHover),
  //       radius,
  //       upperPercentile,
  //       material,
  //     }),
  //   ];
  // }
  // _renderTooltip() {
  //   const {x, y, hoveredObject} = this.state;
  //   return (
  //     hoveredObject && (
  //       <div className="tooltip" style={{top: y, left: x}}>
  //         <div>
  //           <b>Time: </b>
  //           <span>{new Date(hoveredObject.timestamp).toUTCString()}</span>
  //         </div>
  //         <div>
  //           <b>Magnitude: </b>
  //           <span>{hoveredObject.magnitude}</span>
  //         </div>
  //         <div>
  //           <b>Depth: </b>
  //           <span>{hoveredObject.depth} km</span>
  //         </div>
  //       </div>
  //     )
  //   );
  // }

  render() {
    const {mapStyle = 'mapbox://styles/mapbox/light-v9'} = this.props;
    // const {timeRange, filterValue} = this.state;
    return (
      <Fragment>
        <DeckGL
          layers={this._renderLayers()}
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
        >
          <StaticMap
            width="100%" height="100%"
            reuseMaps
            mapStyle={mapStyle}
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        </DeckGL>
      </Fragment>
    );
  }
}

export const plugin = new PanelPlugin(MyPanel);
