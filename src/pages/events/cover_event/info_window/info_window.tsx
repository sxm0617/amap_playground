import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const EventsCoverEventInfoWindow: FC = () => {
  const [map, setMap] = useState<any>()
  const [infoWindow, setInfoWindow] = useState<any>()
  const [windowText, setWindowText] = useState('未打开信息窗口')

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})
        const infoWindow = new AMap.InfoWindow({
          content: `
            <div>高德地图</div>
            <div>电话： 010-84107000 邮编：100102</div>
            <div>地址：北京市朝阳区望京阜荣街10号首开广场4层</div>
          `,
        })
        infoWindow.on('open', () => {
          setWindowText('已打开信息窗口')
        })
        infoWindow.on('close', () => {
          setWindowText('未打开信息窗口')
        })
        setMap(map)
        setInfoWindow(infoWindow)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const handleWindowOpen = () => {
    infoWindow.open(map, map.getCenter())
  }

  const handleWindowClose = () => {
    infoWindow.close()
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-tr' style={{ width: '150px' }}>
        {windowText}
      </Card>
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button type='primary' onClick={handleWindowOpen}>
            打开信息窗口
          </Button>
          <Button type='primary' onClick={handleWindowClose}>
            关闭信息窗口
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default EventsCoverEventInfoWindow
