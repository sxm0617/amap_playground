import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const EventsOtherEventCustom: FC = () => {
  const [AMap, setAMap] = useState<any>()
  const [map, setMap] = useState<any>()
  const [eventText, setEventText] = useState('未绑定事件')

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})
        // 自定义markerremove事件
        map.on('markerremove', (e: any) => {
          map.remove(e.marker)
        })
        setAMap(AMap)
        setMap(map)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const handleBind = () => {
    map.on('click', handleClick)
    setEventText('已绑定事件，点击地图可添加标记点')
  }

  const handleClick = (e: any) => {
    const { lng, lat } = e.lnglat
    const marker = new AMap.Marker({
      map: map,
      icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
      position: [lng, lat],
    })
    // 点击时触发map自定义的markerremove事件
    marker.on('click', () => {
      map.emit('markerremove', { marker })
    })
    map.setFitView()
  }

  const handleUnbind = () => {
    // 官方提供的off方法无法解绑事件，需要手动更改下面vI属性对应的事件名
    map.vI.click.pop()
    setEventText('未绑定事件')
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-tr' style={{ width: '280px' }}>
        {eventText}
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

export default EventsOtherEventCustom
