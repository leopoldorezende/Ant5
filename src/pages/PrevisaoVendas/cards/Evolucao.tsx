import { DualAxes } from '@ant-design/plots'
import { Card } from 'antd'

const DemoDualAxes = () => {
  
  const uvBillData = [
    {
      time: '2019-03',
      total: 350,
      type: 'uv',
    },
    {
      time: '2019-04',
      total: 900,
      type: 'uv',
    },
    {
      time: '2019-05',
      total: 300,
      type: 'uv',
    },
    {
      time: '2019-06',
      total: 450,
      type: 'uv',
    },
    {
      time: '2019-07',
      total: 470,
      type: 'uv',
    },
    {
      time: '2019-03',
      total: 220,
      type: 'bill',
    },
    {
      time: '2019-04',
      total: 300,
      type: 'bill',
    },
    {
      time: '2019-05',
      total: 250,
      type: 'bill',
    },
    {
      time: '2019-06',
      total: 220,
      type: 'bill',
    },
    {
      time: '2019-07',
      total: 662,
      type: 'bill',
    },
  ];

interface myData {
  time: string;
  count: number;
  name: string;
}

  const transformData:Array<myData> = [
    {
      time: '2019-03',
      count: 350,
      name: 'a',
    },
    {
      time: '2019-04',
      count: 400,
      name: 'a',
    },
    {
      time: '2019-05',
      count: 430,
      name: 'a',
    },
    {
      time: '2019-06',
      count: 380,
      name: 'a',
    },
    {
      time: '2019-07',
      count: 520,
      name: 'a',
    },
    {
      time: '2019-03',
      count: 450,
      name: 'b',
    },
    {
      time: '2019-04',
      count: 350,
      name: 'b',
    },
    {
      time: '2019-05',
      count: 450,
      name: 'b',
    },
    {
      time: '2019-06',
      count: 500,
      name: 'b',
    },
    {
      time: '2019-07',
      count: 620,
      name: 'b',
    },
    {
      time: '2019-03',
      count: 300,
      name: 'c',
    },
    {
      time: '2019-04',
      count: 400,
      name: 'c',
    },
    {
      time: '2019-05',
      count: 450,
      name: 'c',
    },
    {
      time: '2019-06',
      count: 600,
      name: 'c',
    },
    {
      time: '2019-07',
      count: 800,
      name: 'c',
    },
  ];
  const config = {
    data: [uvBillData, transformData],
    xField: 'time',
    yField: ['total', 'count'],
    yAxis: {
      total: {
        grid: {
          line: {
            style: {
              stroke: '#888',
              opacity: .2
            }
          }
        }
      },
      count: {
        grid: {
          line: {
            style: {
              opacity: 0
            }
          }
        }
      },
    },
    geometryOptions: [
      {
        geometry: 'column',
        isStack: true,
        seriesField: 'type',
        columnWidthRatio: 0.4,
      },
      {
        geometry: 'line',
        seriesField: 'name',
       lineStyle: ({name}:{name:string}) => {
          if (name === 'a') {
            return {
              lineDash: [1, 4],
              opacity: 1,
            };
          }
          return {
            opacity: 0.5,
          };
        },
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default function Evolucao () {
  return (
    <Card title="Evolução" bordered={true} >
      <div style={{height: 200}}>
        <DemoDualAxes />
      </div>
    </Card>
  )
}
