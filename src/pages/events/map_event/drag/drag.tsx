import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const EventsMapEventDrag: FC = () => {
  const [map, setMap] = useState<any>()
  const [dragText, setDragText] = useState('未绑定事件')

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})
        setMap(map)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const startDrag = () => {
    setDragText('开始拖拽')
  }

  const doDrag = () => {
    setDragText('拖拽中')
  }

  const endDrag = () => {
    setDragText('拖拽结束')
  }

  const handleBind = () => {
    if (!map) {
      return
    }

    map.on('dragstart', startDrag)
    map.on('dragging', doDrag)
    map.on('dragend', endDrag)
    setDragText('已绑定事件')
  }

  const handleUnbind = () => {
    if (!map) {
      return
    }

    // 官方提供的off方法无法解绑事件，需要手动更改下面vI属性对应的事件名
    map.vI.dragstart.pop()
    map.vI.dragend.pop()
    delete map.vI.dragging
    setDragText('未绑定事件')
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-tr' style={{ width: '120px' }}>
        {dragText}
      </Card>
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button type='primary' onClick={handleBind}>
            绑定事件
          </Button>
          <Button type='primary' onClick={handleUnbind}>
            解绑事件
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default EventsMapEventDrag
