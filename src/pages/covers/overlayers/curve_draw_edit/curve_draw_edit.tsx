import AMapLoader from '@amap/amap-jsapi-loader'
import { Button, Card } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { AMAP_APPLICATION_KEY } from '../../../../common/utils'

const CoversOverlayersCurveDrawEdit: FC = () => {
  const [AMap, setAMap] = useState<any>()
  const [map, setMap] = useState<any>()
  const [curve, setCurve] = useState<any>()
  const [curveEditor, setCurveEditor] = useState<any>()
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    AMapLoader.load({
      key: AMAP_APPLICATION_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0.5', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.BezierCurveEditor'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap: any) => {
        const map = new AMap.Map('container', {
          center: [116.397637, 39.900001],
          zoom: 14,
        })
        const curveEditor = new AMap.BezierCurveEditor(map)
        setCurveEditor(curveEditor)
        setAMap(AMap)
        setMap(map)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }, [])

  const handleDraw = () => {
    if (curve) {
      return
    }

    var path = [
      //每个弧线段有两种描述方式
      [116.37, 39.91], //起点
      //第一段弧线
      [116.380298, 39.907771, 116.38, 39.9], //控制点，途经点
      //第二段弧线
      [116.385298, 39.907771, 116.4, 39.9], //控制点，途经点//弧线段有两种描述方式1
      //第三段弧线
      [
        //弧线段有两种描述方式2
        [116.392872, 39.887391], //控制点
        [116.40772, 39.909252], //控制点
        [116.41, 39.89], //途经点
      ],
      //第四段弧线
      [116.423857, 39.889498, 116.422312, 39.899639, 116.425273, 39.902273],
      //控制点，控制点，途经点，每段最多两个控制点
    ]

    const bezierCurve = new AMap.BezierCurve({
      path: path,
      isOutline: true,
      outlineColor: '#ffeeff',
      borderWeight: 3,
      strokeColor: '#3366FF',
      strokeOpacity: 1,
      strokeWeight: 6,
      strokeStyle: 'solid',
      strokeDasharray: [10, 10],
      lineJoin: 'round',
      lineCap: 'round',
      zIndex: 50,
    })

    map.add(bezierCurve)
    map.setFitView()
    setCurve(bezierCurve)
  }

  const handleEdit = () => {
    curveEditor.setTarget(curve)
    curveEditor.open()
    setIsEditing(true)
  }

  const handleStopEdit = () => {
    curveEditor.close()
    setIsEditing(false)
  }

  return (
    <div className='outer-container'>
      <div id='container' className='map-container' />
      <Card className='info-card info-card-br'>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            {curve ? (
              isEditing ? (
                <Button type='primary' onClick={handleStopEdit}>
                  停止编辑
                </Button>
              ) : (
                <Button type='primary' onClick={handleEdit}>
                  编辑曲线
                </Button>
              )
            ) : (
              <Button type='primary' onClick={handleDraw}>
                绘制曲线
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CoversOverlayersCurveDrawEdit
