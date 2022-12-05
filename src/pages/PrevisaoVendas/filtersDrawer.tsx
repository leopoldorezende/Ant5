import React from 'react'
import { Button, Drawer, Radio, Select, Space } from 'antd'
import { RadioChangeEvent } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { StoreContext } from '../../store'

export default function FiltersDrawer () {  

  const { setStore } = React.useContext(StoreContext);
  const [ unidade, setUnidade ] = React.useState('ton');
  const [ childrenDrawer, setChildrenDrawer ] = React.useState(false);

  const filterProduto = [
    {key: 1, value: '*', label: 'Todos'},
    {key: 2, value: 'CG', label: 'Chapa Grossa'},
    {key: 3, value: 'LQ', label: 'Laminado a Quente'},
    {key: 4, value: 'LF', label: 'Laminado a Frio'},
  ]
  
  const filterUnidade = [
    { value: 'qtd', label: 'Quantidade'},
    { value: 'ton', label: 'Tonelada'},
  ]
  
  const handleProduto = (selected: string) => {

    const index = filterProduto.findIndex(o => o.value === selected)
    const item = filterProduto[index]

    setStore({
      type: 'FILTER_PREVISAOVENDAS', 
      value: { filterName: 'Prod.', filterObj: item }
    })
  }

  const handleUnidade = ({ target: { value } }: RadioChangeEvent) => {

    const index = filterUnidade.findIndex(o => o.value === value)
    const item = filterUnidade[index]

    setUnidade(value);
    setStore({
      type: 'FILTER_PREVISAOVENDAS', 
      value: { filterName: 'Unid.', filterObj: item }
    })
  }

  return (
    <Space direction={'vertical'} size={'middle'} style={{width: '100%'}}>
      
      <div>
        <h5>Produto:</h5>
        <Select key="f3"  defaultValue="*" onChange={handleProduto}  style={{width: '100%'}}>
          {filterProduto.map((item) => (
            <Select.Option value={item.value} key={item.key}>{item.label}</Select.Option>
          ))}
        </Select>
      </div>

      <div>
        <h5>Unidade:</h5>
        <Radio.Group key="f9" options={filterUnidade} onChange={handleUnidade} value={unidade} optionType="button" />
      </div>

      <Button type="primary" onClick={() => setChildrenDrawer(true)}>
        Filtrar Clientes
      </Button>

      <Drawer
        title="Clientes"
        width={280}
        closable={false}
        onClose={() => setChildrenDrawer(false)}
        open={childrenDrawer}
        extra={
          <Button onClick={() => {setChildrenDrawer(false)}} className='close-drawer-button'>
            <CloseOutlined />
          </Button>
        }
      >
        Lista de clientes
      </Drawer>

    </Space>
  )
}