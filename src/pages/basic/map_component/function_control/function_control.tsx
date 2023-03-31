import AMapLoader from '@amap/amap-jsapi-loader'
import { Card, Checkbox } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const BasicMapComponentFunctionControl: FC = () => {
  const [scale, setScale] = useState<any>()
  const [toolbar, setToolbar] = useState<any>()
  const [compass, setCompass] = useState<any>()
  const [thumbnail, setThumbnail] = useState<any>()

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [
        'AMap.Scale',
        'AMap.ControlBar',
        'AMap.ToolBar',
        'AMap.HawkEye',
      ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {})
        const scale = new AMap.Scale()
        const compass = new AMap.ControlBar({
          position: {
            top: '10px',
            right: '10px',
          },
        })
        const toolbar = new AMap.ToolBar({
          position: {
            top: '110px',
            right: '40px',
          },
        })
        const thumbnail = new AMap.HawkEye({
          opened: false,
        })
        map.addControl(scale)
        map.addControl(compass)
        map.addControl(toolbar)
        map.addControl(thumbnail)
        setScale(scale)
        setCompass(compass)
        setToolbar(toolbar)
        setThumbnail(thumbnail)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const handleScaleChange = (e: any) => {
    if (e.target.checked) {
      scale.show()
    } else {
      scale.hide()
    }
  }

  const handleToolbarChange = (e: any) => {
    if (e.target.checked) {
      toolbar.show()
    } else {
      toolbar.hide()
    }
  }

  const handleCompassChange = (e: any) => {
    if (e.target.checked) {
      compass.show()
    } else {
      compass.hide()
    }
  }

  const handleThumbnailChange = (e: any) => {
    if (e.target.checked) {
      thumbnail.show()
    } else {
      thumbnail.hide()
    }
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-tl'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div>
            <Checkbox defaultChecked onChange={handleScaleChange}>
              比例尺
            </Checkbox>
          </div>
          <div>
            <Checkbox defaultChecked onChange={handleCompassChange}>
              指南针
            </Checkbox>
          </div>
          <div>
            <Checkbox defaultChecked onChange={handleToolbarChange}>
              工具条
            </Checkbox>
          </div>
          <div>
            <Checkbox defaultChecked onChange={handleThumbnailChange}>
              缩略图
            </Checkbox>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default BasicMapComponentFunctionControl
