import AMapLoader from '@amap/amap-jsapi-loader'
import { Card, Switch } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const BasicMapPropertyActionControl: FC = () => {
  const [map, setMap] = useState<any>()
  const [showIndoorMap, setShowIndoorMap] = useState(false)
  const [dragEnable, setDragEnable] = useState(false)
  const [keyboardEnable, setKeyboardEnable] = useState(false)
  const [doubleClickZoom, setDoubleClickZoom] = useState(false)
  const [zoomEnable, setZoomEnable] = useState(false)
  const [rotateEnable, setRotateEnable] = useState(false)

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})
        const {
          showIndoorMap,
          dragEnable,
          keyboardEnable,
          doubleClickZoom,
          zoomEnable,
          rotateEnable,
        } = map.getStatus()
        setShowIndoorMap(showIndoorMap)
        setDragEnable(dragEnable)
        setKeyboardEnable(keyboardEnable)
        setDoubleClickZoom(doubleClickZoom)
        setZoomEnable(zoomEnable)
        setRotateEnable(rotateEnable)
        setMap(map)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const handleShowIndoorChange = (value: boolean) => {
    map.setStatus({
      showIndoorMap: value,
    })
    setShowIndoorMap(value)
  }

  const handleDragEnableChange = (value: boolean) => {
    map.setStatus({
      dragEnable: value,
    })
    setDragEnable(value)
  }

  const handleKeybaordEnableChange = (value: boolean) => {
    map.setStatus({
      keyboardEnable: value,
    })
    setKeyboardEnable(value)
  }

  const handleDoubleClickZoomChange = (value: boolean) => {
    map.setStatus({
      doubleClickZoom: value,
    })
    setDoubleClickZoom(value)
  }

  const handleZoomEnableChange = (value: boolean) => {
    map.setStatus({
      zoomEnable: value,
    })
    setZoomEnable(value)
  }

  const handleRotateEnableChange = (value: boolean) => {
    map.setStatus({
      rotateEnable: value,
    })
    setRotateEnable(value)
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Switch
              checked={showIndoorMap}
              onClick={(value: boolean) => handleShowIndoorChange(value)}
            />
            {showIndoorMap ? '禁用室内地图' : '启用室内地图'}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Switch
              checked={dragEnable}
              onClick={(value: boolean) => handleDragEnableChange(value)}
            />
            {dragEnable ? '禁用拖拽' : '启用拖拽'}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Switch
              checked={keyboardEnable}
              onClick={(value: boolean) => handleKeybaordEnableChange(value)}
            />
            {keyboardEnable ? '禁用键盘' : '启用键盘'}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Switch
              checked={doubleClickZoom}
              onClick={(value: boolean) => handleDoubleClickZoomChange(value)}
            />
            {doubleClickZoom ? '禁用双击缩放' : '启用双击缩放'}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Switch
              checked={zoomEnable}
              onClick={(value: boolean) => handleZoomEnableChange(value)}
            />
            {zoomEnable ? '禁用缩放' : '启用缩放'}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Switch
              checked={rotateEnable}
              onClick={(value: boolean) => handleRotateEnableChange(value)}
            />
            {rotateEnable ? '禁用旋转' : '启用旋转'}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default BasicMapPropertyActionControl
