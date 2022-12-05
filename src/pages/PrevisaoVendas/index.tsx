import React from 'react'
import Page from '../../components/Page'
import FiltersDrawer from './filtersDrawer'
import FiltersHeader from './filtersHeader'
import CardProducao from './cards/Producao'
import CardEvolucao from './cards/Evolucao'
import CardAcumulado from './cards/Acumulado'
import { StoreContext } from '../../store'

import {
  Col, 
  Row,
} from 'antd'

export default function PrevisaoVendas () {  

  const { store } = React.useContext(StoreContext);

  return (
    <Page 
      title="Previsão de Vendas" 
      filtersHeader={<FiltersHeader />} 
      filtersDrawer={<FiltersDrawer />}
      selectedFilters={store.filtersPrevisaoVendas}
    >
      <Row gutter={[
        { xs: 8, sm: 16, md: 24, lg: 24 }, 
        { xs: 8, sm: 16, md: 24, lg: 24 }
      ]}>

        <Col xs={24} lg={7} >
          <CardAcumulado />
        </Col>

        <Col xs={24} lg={17} >
          <CardProducao />
        </Col>

      </Row>
    </Page>
  )
}