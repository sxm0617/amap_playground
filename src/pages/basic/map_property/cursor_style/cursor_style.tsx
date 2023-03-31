import AMapLoader from '@amap/amap-jsapi-loader'
import { Card, Radio, Space } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const BasicMapPropertyCursorStyle: FC = () => {
  const [map, setMap] = useState<any>()
  const [cursorType, setCursorType] = useState('default')

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

  const handleCursorChange = (e: any) => {
    if (!map) {
      return
    }

    setCursorType(e.target.value)
    map.setDefaultCursor(e.target.value)
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <Radio.Group value={cursorType} onChange={handleCursorChange}>
          <Space direction='vertical'>
            <Radio value='default'>箭头</Radio>
            <Radio value='pointer'>手形</Radio>
            <Radio value='move'>十字箭头</Radio>
            <Radio value='crosshair'>十字</Radio>
          </Space>
        </Radio.Group>
      </Card>
    </div>
  )
}

export default BasicMapPropertyCursorStyle
