import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Menu } from '../components'
import './app.css'
import {
  BasicLifeCycleCreate,
  BasicLifeCycleDestroy,
  BasicLifeCycleLoaded,
  BasicLifeCycleLoadingAsync,
} from './basic/life_cycle'
import {
  BasicMapComponentCover,
  BasicMapComponentFunctionControl,
  BasicMapComponentLayer,
} from './basic/map_component'
import {
  BasicMapPropertyActionControl,
  BasicMapPropertyCenter,
  BasicMapPropertyGetLngLatByClick,
  BasicMapPropertyHotSpotInfo,
  BasicMapPropertyMove,
  BasicMapPropertyRange,
} from './basic/map_property'
import {
  CoversInfoWindowsBatchAddWindow,
  CoversInfoWindowsCustomStyleWindow,
  CoversInfoWindowsDefaultStyleWindow,
  CoversInfoWindowsInfoWindowEvents,
} from './covers/info_windows'
import { CoversMarkerTrackReplay } from './covers/marker'
import {
  CoversMassMarkersCluster,
  CoversMassMarkersClusterIndex,
  CoversMassMarkersClusterWeight,
} from './covers/mass_markers'
import {
  CoversOverlayersBatchUpdate,
  CoversOverlayersCircleDrawEdit,
  CoversOverlayersCurveDrawEdit,
  CoversOverlayersCustomDraw,
  CoversOverlayersEllipseDrawEdit,
  CoversOverlayersPolygonDrawEdit,
  CoversOverlayersPolylineArrow,
  CoversOverlayersPolylineDrawEdit,
  CoversOverlayersRectangleDrawEdit,
} from './covers/overlayers'
import {
  EventsCoverEventCoverClick,
  EventsCoverEventCoverDrag,
  EventsCoverEventInfoWindow,
} from './events/cover_event'
import {
  EventsMapEventDrag,
  EventsMapEventLoad,
  EventsMapEventMouse,
  EventsMapEventMove,
  EventsMapEventZoom,
} from './events/map_event'
import {
  EventsOtherEventCustom,
  EventsOtherEventDom,
} from './events/other_event'
import { GeometricsRelationsPointInPolygon } from './geometrics/relations'
import { LayersSelfDataHeatMap } from './layers/self_data'

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <Menu />
      <Routes>
        <Route path='/' element={<Navigate to='/basic/life-cycle/create' />} />
        {
          //#region 地图
        }
        <Route
          path='/basic'
          element={<Navigate to='/basic/life-cycle/create' />}
        />
        {
          //#region 地图 - 生命周期
        }
        <Route
          path='/basic/life-cycle'
          element={<Navigate to='/basic/life-cycle/create' />}
        />
        <Route
          path='/basic/life-cycle/create'
          element={<BasicLifeCycleCreate />}
        />
        <Route
          path='/basic/life-cycle/loaded'
          element={<BasicLifeCycleLoaded />}
        />
        <Route
          path='/basic/life-cycle/destroy'
          element={<BasicLifeCycleDestroy />}
        />
        <Route
          path='/basic/life-cycle/loading-async'
          element={<BasicLifeCycleLoadingAsync />}
        />
        {
          //#endregion
        }
        {
          //#region 地图 - 地图属性
        }
        <Route
          path='/basic/map-property'
          element={<Navigate to='/basic/map-property/center' />}
        />
        <Route
          path='/basic/map-property/center'
          element={<BasicMapPropertyCenter />}
        />
        <Route
          path='/basic/map-property/range'
          element={<BasicMapPropertyRange />}
        />
        <Route
          path='/basic/map-property/move'
          element={<BasicMapPropertyMove />}
        />
        <Route
          path='/basic/map-property/action-control'
          element={<BasicMapPropertyActionControl />}
        />
        <Route
          path='/basic/map-property/get-lng-lat-by-click'
          element={<BasicMapPropertyGetLngLatByClick />}
        />
        <Route
          path='/basic/map-property/hot-spot-info'
          element={<BasicMapPropertyHotSpotInfo />}
        />
        {
          //#endregion
        }
        {
          //#region 地图 - 覆盖物与图层管理
        }
        <Route
          path='/basic/map-component'
          element={<Navigate to='/basic/map-component/cover' />}
        />
        <Route
          path='/basic/map-component/cover'
          element={<BasicMapComponentCover />}
        />
        <Route
          path='/basic/map-component/layer'
          element={<BasicMapComponentLayer />}
        />
        <Route
          path='/basic/map-component/function-control'
          element={<BasicMapComponentFunctionControl />}
        />
        {
          //#endregion
        }
        {
          //#endregion
        }
        {
          //#region 事件系统
        }
        <Route
          path='/events'
          element={<Navigate to='/events/map-event/map-load' />}
        />
        {
          //#region 事件系统 - 地图事件
        }
        <Route
          path='/events/map-event'
          element={<Navigate to='/events/map-event/map-load' />}
        />
        <Route
          path='/events/map-event/map-load'
          element={<EventsMapEventLoad />}
        />
        <Route
          path='/events/map-event/map-move'
          element={<EventsMapEventMove />}
        />
        <Route
          path='/events/map-event/map-zoom'
          element={<EventsMapEventZoom />}
        />
        <Route
          path='/events/map-event/mouse-related'
          element={<EventsMapEventMouse />}
        />
        <Route
          path='/events/map-event/map-drag'
          element={<EventsMapEventDrag />}
        />
        {
          //#endregion
        }
        {
          //#region 事件系统 - 覆盖物系统
        }
        <Route
          path='/events/cover-event'
          element={<Navigate to='/events/cover-event/cover-click' />}
        />
        <Route
          path='/events/cover-event/cover-click'
          element={<EventsCoverEventCoverClick />}
        />
        <Route
          path='/events/cover-event/cover-drag'
          element={<EventsCoverEventCoverDrag />}
        />
        <Route
          path='/events/cover-event/info-window'
          element={<EventsCoverEventInfoWindow />}
        />
        {
          //#endregion
        }
        {
          //#region 事件系统 - 其他事件
        }
        <Route
          path='/events/other-event'
          element={<Navigate to='/events/other-event/dom' />}
        />
        <Route
          path='/events/other-event/dom'
          element={<EventsOtherEventDom />}
        />
        <Route
          path='/events/other-event/custom'
          element={<EventsOtherEventCustom />}
        />
        {
          //#endregion
        }
        {
          //#endregion
        }
        {
          //#region 图层
        }
        <Route
          path='/layers'
          element={<Navigate to='/layers/self-data/heat-map' />}
        />
        {
          //#region 图层 - 自有数据图层
        }
        <Route
          path='/layers/self-data'
          element={<Navigate to='/layers/self-data/heat-map' />}
        />
        <Route
          path='/layers/self-data/heat-map'
          element={<LayersSelfDataHeatMap />}
        />
        {
          //#endregion
        }
        {
          //#endregion
        }
        {
          //#region 覆盖物
        }
        <Route
          path='/covers'
          element={<Navigate to='/covers/marker/track-replay' />}
        />
        {
          //#region 覆盖物 - 点标记
        }
        <Route
          path='/covers/marker'
          element={<Navigate to='/covers/marker/track-replay' />}
        />
        <Route
          path='/covers/marker/track-replay'
          element={<CoversMarkerTrackReplay />}
        />
        {
          //#endregion
        }
        {
          //#region 覆盖物 - 海量点标记
        }
        <Route
          path='/covers/mass-markers'
          element={<Navigate to='/covers/mass-markers/cluster' />}
        />
        <Route
          path='/covers/mass-markers/cluster'
          element={<CoversMassMarkersCluster />}
        />
        <Route
          path='/covers/mass-markers/cluster-weight'
          element={<CoversMassMarkersClusterWeight />}
        />
        <Route
          path='/covers/mass-markers/cluster-index'
          element={<CoversMassMarkersClusterIndex />}
        />
        {
          //#endregion
        }
        {
          //#region 覆盖物 - 矢量图形
        }
        <Route
          path='/covers/overlayers'
          element={<Navigate to='/covers/overlayers/polyline-draw-edit' />}
        />
        <Route
          path='/covers/overlayers/polyline-draw-edit'
          element={<CoversOverlayersPolylineDrawEdit />}
        />
        <Route
          path='/covers/overlayers/curve-draw-edit'
          element={<CoversOverlayersCurveDrawEdit />}
        />
        <Route
          path='/covers/overlayers/polygon-draw-edit'
          element={<CoversOverlayersPolygonDrawEdit />}
        />
        <Route
          path='/covers/overlayers/rectangle-draw-edit'
          element={<CoversOverlayersRectangleDrawEdit />}
        />
        <Route
          path='/covers/overlayers/circle-draw-edit'
          element={<CoversOverlayersCircleDrawEdit />}
        />
        <Route
          path='/covers/overlayers/ellipse-draw-edit'
          element={<CoversOverlayersEllipseDrawEdit />}
        />
        <Route
          path='/covers/overlayers/custom-draw'
          element={<CoversOverlayersCustomDraw />}
        />
        <Route
          path='/covers/overlayers/batch-update'
          element={<CoversOverlayersBatchUpdate />}
        />
        <Route
          path='/covers/overlayers/polyline-arrow'
          element={<CoversOverlayersPolylineArrow />}
        />
        {
          //#endregion
        }
        {
          //#region 覆盖物 - 信息窗体
        }
        <Route
          path='/covers/info-windows'
          element={<Navigate to='/covers/info-windows/default-style-window' />}
        />
        <Route
          path='/covers/info-windows/default-style-window'
          element={<CoversInfoWindowsDefaultStyleWindow />}
        />
        <Route
          path='/covers/info-windows/custom-style-window'
          element={<CoversInfoWindowsCustomStyleWindow />}
        />
        <Route
          path='/covers/info-windows/info-window-events'
          element={<CoversInfoWindowsInfoWindowEvents />}
        />
        <Route
          path='/covers/info-windows/batch-add-window'
          element={<CoversInfoWindowsBatchAddWindow />}
        />
        {
          //#endregion
        }
        {
          //#endregion
        }
        {
          //#region 几何计算
        }
        <Route
          path='/geometrics'
          element={<Navigate to='/geometrics/relations/point-in-polygon' />}
        />
        {
          //#region 关系判断
        }
        <Route
          path='/geometrics/relations'
          element={<Navigate to='/geometrics/relations/point-in-polygon' />}
        />
        <Route
          path='/geometrics/relations/point-in-polygon'
          element={<GeometricsRelationsPointInPolygon />}
        />
        {
          //#endregion
        }
        {
          //#endregion
        }
      </Routes>
    </div>
  )
}

export default App
