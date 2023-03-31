import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const LayersSelfDataHeatMap: FC = () => {
  const [heatMap, setHeatMap] = useState<any>()

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.HeatMap'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})
        const heatMap = new AMap.HeatMap(map, {
          radius: 25,
          opactity: [0, 0.8],
        })
        const heatMapData = Array(200)
          .fill(1)
          .map(() => {
            return {
              lng: 113.88 + 0.3 * Math.random(),
              lat: 22.52 + 0.1 * Math.random(),
              count: Math.round(Math.random() * 100),
            }
          })
        heatMap.setDataSet({
          data: heatMapData,
          max: 100,
        })
        setHeatMap(heatMap)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const handleDisplay = () => {
    heatMap.show()
  }

  const handleHide = () => {
    heatMap.hide()
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Button type='primary' onClick={handleDisplay}>
            显示热力图
          </Button>
          <Button type='primary' onClick={handleHide}>
            隐藏热力图
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default LayersSelfDataHeatMap
