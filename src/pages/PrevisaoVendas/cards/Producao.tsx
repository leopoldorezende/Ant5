import { Card, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import React from 'react'

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  street: string;
  building: string;
  number: number;
  companyAddress: string;
  companyName: string;
  action: string;
  children?: DataType[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 120,
    fixed: 'left',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'John',
        value: 'John',
      },
    ],
    //onFilter: (value: string, record) => record.name.indexOf(value) === 0,
  },
  {
    title: 'Other',
    children: [
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: 50,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: 'Street',
        dataIndex: 'street',
        key: 'street',
        width: 100,
      },
      {
        title: 'Block',
        children: [
          {
            title: 'Building',
            dataIndex: 'building',
            key: 'building',
            width: 60,
          },
          {
            title: 'Door No.',
            dataIndex: 'number',
            key: 'number',
            width: 60,
          },
        ],
      },
    ],
  },
  {
    title: 'Company',
    children: [
      {
        title: 'Company Address',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
        width: 90,
      },
      {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
        width: 70,
      },
    ],
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 50,
    render: () => <a>Info</a>,
  },
];

const data: DataType[] = [];

for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    action: 'M',
    children: [
      {
        key: i+1000,
        name: 'Leopoldo Rezende',
        age: i + 1001,
        street: 'Rua das Gaivotas',
        building: 'A',
        number: 109,
        companyAddress: 'Avenida do Lago',
        companyName: 'AntDesign',
        action: 'L',
      },
      {
        key: i+1002,
        name: 'Leopoldo Rezende',
        age: i + 1002,
        street: 'Rua das Gaivotas',
        building: 'A',
        number: 109,
        companyAddress: 'Avenida do Lago',
        companyName: 'AntDesign',
        action: 'L',
      }
    ]
  });
}

export default function Producao () {  
  return (
    <Card title="Produção" bordered={true}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        size="small"
        scroll={{ x: 'calc(700px + 50%)', y: 280 }}
      />
    </Card>
  )
}