import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const EventsCoverEventCoverClick: FC = () => {
  const [coverText, setCoverText] = useState('未绑定事件')
  const [marker, setMarker] = useState<any>()
  const [polygon, setPolygon] = useState<any>()

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})
        const marker = new AMap.Marker({
          map: map,
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: [113.943307, 22.549001],
        })
        const polygon = new AMap.Polygon({
          map: map,
          path: [
            [113.935322, 22.543255],
            [113.942703, 22.530555],
            [113.933292, 22.525353],
            [113.921846, 22.524365],
          ], //设置多边形边界路径
          strokeColor: '#FF33FF', //线颜色
          strokeOpacity: 0.2, //线透明度
          strokeWeight: 3, //线宽
          fillColor: '#1791fc', //填充色
          fillOpacity: 0.35, //填充透明度
        })
        map.setFitView()
        setMarker(marker)
        setPolygon(polygon)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const markerClick = () => {
    setCoverText('点击了标记点')
  }

  const polygonClick = () => {
    setCoverText('点击了多边形')
  }

  const markerOver = () => {
    setCoverText('移入了标记点')
  }

  const polygonOver = () => {
    setCoverText('移入了多边形')
  }

  const markerOut = () => {
    setCoverText('移出了标记点')
  }

  const polygonOut = () => {
    setCoverText('移出了多边形')
  }

  const handleBind = () => {
    marker.on('click', markerClick)
    polygon.on('click', polygonClick)

    marker.on('mouseover', markerOver)
    polygon.on('mouseover', polygonOver)

    marker.on('mouseout', markerOut)
    polygon.on('mouseout', polygonOut)
    setCoverText('已绑定事件')
  }

  const handleUnbind = () => {
    // 官方提供的off方法无法解绑事件，需要手动更改下面vI属性对应的事件名
    delete marker.vI.click
    delete marker.vI.mouseover
    delete marker.vI.mouseout

    delete polygon.vI.click
    delete polygon.vI.mouseover
    delete polygon.vI.mouseout

    setCoverText('未绑定事件')
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-tr' style={{ width: '150px' }}>
        {coverText}
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

export default EventsCoverEventCoverClick
