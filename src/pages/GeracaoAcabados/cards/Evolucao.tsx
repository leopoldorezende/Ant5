import React from 'react'
import { Column } from '@ant-design/plots'
import { Card } from 'antd'

const DemoColumn = () => {

  const data:any = [
    {
        "product": "CG",
        "value": 3,
        "type": "Lon"
    },
    {
        "product": "LQ",
        "value": 4,
        "type": "Lon"
    },
    {
        "product": "LF",
        "value": 3.5,
        "type": "Lon"
    },
    {
        "product": "BEG",
        "value": 5,
        "type": "Lon"
    },
    {
        "product": "CG",
        "value": 3,
        "type": "Bor"
    },
    {
        "product": "LQ",
        "value": 4,
        "type": "Bor"
    },
    {
        "product": "LF",
        "value": 3.5,
        "type": "Bor"
    },
    {
        "product": "BEG",
        "value": 5,
        "type": "Bor"
    },
  ]
  const config:any = {
    data,
    isStack: true,
    xField: 'product',
    yField: 'value',
    seriesField: 'type',
    color: ['#c4a5df','#5f4595'],
    yAxis: {
      grid: {
        line: {
          style: {
            stroke: '#888',
            opacity: .2
          }
        }
      },
    },
    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
    },
  }
  
  return <Column {...config} />;
}

export default function Evolucao () {
  return (
    <Card title="Produtos" bordered={true} >
      <div style={{height: 160}}>
        <DemoColumn />
      </div>
    </Card>
  )
}
