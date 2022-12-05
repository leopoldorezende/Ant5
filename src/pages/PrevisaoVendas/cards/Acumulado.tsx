import React from 'react'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, Col, Row, Statistic } from 'antd'

const Acumulado: React.FC = () => (
  <div className="site-statistic-demo-card">
    <Row gutter={[
      { xs: 8, sm: 16, md: 24, lg: 24 }, 
      { xs: 8, sm: 16, md: 24, lg: 24 }
    ]}>
      <Col span={24}>
        <Card>
          <Statistic
            title='Acumulado Mensal'
            value={11.28}
            precision={2}
            valueStyle={{ color: '#0faa70' }}
            prefix={<ArrowUpOutlined />}
            suffix='%'
          />
        </Card>
      </Col>
      
      <Col span={24}>
        <Card>
          <Statistic
            title='Acumulado Anual'
            value={9.3}
            precision={2}
            valueStyle={{ color: '#cf1342' }}
            prefix={<ArrowDownOutlined />}
            suffix='%'
          />
        </Card>
      </Col>
    </Row>
  </div>
)

export default Acumulado