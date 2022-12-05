import React from 'react'
import Page from '../../components/Page'
import Filters from '../../components/Filters'
import { Col, Layout, Row } from 'antd'
import { StoreContext } from '../../store'

// Cards
import CardProducao from './cards/Producao'
import CardEvolucao from './cards/Evolucao'
import CardAcumulado from './cards/Acumulado'

export default function Producao () {  

  const { store } = React.useContext(StoreContext);
  const [ dataFilters, setDataFilters ] = React.useState<any>(null);

  React.useEffect(() => {

    fetch('http://localhost:4000/filtersProducao.json', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    }).then(r => r.json())
    .then(setDataFilters) 
    .catch(err => {console.error('Failed retrieving information', err)})

  }, []);

  if(dataFilters) {
    return (
      <Page 
        title="Produção"
        filtersHeader={<Filters position='header' dataFilters={dataFilters} />} 
        filtersDrawer={<Filters position='drawer' dataFilters={dataFilters} />}
        selectedFilters={store[dataFilters.id]}
      >
        <Row gutter={[
          { xs: 8, sm: 16, md: 24, lg: 24 }, 
          { xs: 16, sm: 16, md: 24, lg: 24 }
        ]}>

          <Col xs={24} lg={16} >
            <CardEvolucao />
          </Col>

          <Col xs={24} lg={8} >
            <CardAcumulado />
          </Col>

          <Col xs={24} lg={24} >
            <CardProducao />
          </Col>

        </Row>
      </Page>
    )
  }
  else return (
    <Layout>
      <Layout.Content className='layout-content-page'>
        <div className="page-loading-container">
        <div className="page-loading"></div>
        </div>
      </Layout.Content>
    </Layout>
  )
}