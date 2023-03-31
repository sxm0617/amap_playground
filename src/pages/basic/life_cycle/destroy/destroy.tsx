import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card, message } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

/**
 * 销毁地图
 * 注意：请尽量不要进行地图的销毁和重新创建，如果有图层的隐藏和显示需求，请使用图层的 show/hide 方法。
 */
const BasicLifeCycleDestroy: FC = () => {
  const [AMap, setAMap] = useState<any>()
  const [map, setMap] = useState<any>()

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        setAMap(AMap)
        const amap = new AMap.Map('container', {
          zoom: 5,
          center: [105.602725, 37.076636],
        })
        setMap(amap)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  useEffect(() => {
    if (!map) {
      return
    }

    map.on('complete', () => {
      message.success('地图已创建')
    })
  }, [map])

  const handleCreate = () => {
    if (!AMap) {
      return
    }

    const newMap = new AMap.Map('container', {
      zoom: 5,
      center: [105.602725, 37.076636],
    })
    setMap(newMap)
  }

  const handleDestroy = () => {
    if (!map) {
      return
    }

    map.destroy()
    message.success('地图已销毁')
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Button type='primary' onClick={handleCreate}>
            创建地图
          </Button>
          <Button type='primary' onClick={handleDestroy}>
            销毁地图
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default BasicLifeCycleDestroy
