import {
    DesktopOutlined, 
    FileOutlined, 
    PieChartOutlined, 
    TeamOutlined, 
    UserOutlined
} from '@ant-design/icons'

export const profile = {
  name: 'Leopoldo Rezende',
  nameInitials: 'LR',
  sector: 'Gerência Sistemas de Gestão',
  avatar: './src/assets/img/avatar.jpeg'
}

export const itemsMenu = [
    {
      text: 'Flash',
      icon: <PieChartOutlined />,
      children: [
        {
          text: 'Produção',
          link: '/Producao'
        },
        {
          text: 'Geração de Acabados',
          link: '/GeracaoAcabados'
        },
        {
          text: 'Previsão de Vendas',
          link: '/PrevisaoVendas'
        }
      ]
    },
    {
      text: 'Segurança',
      link: '/seguranca',
      icon: <UserOutlined />
    },
    {
      text: 'Escarfagem',
      icon: <DesktopOutlined />,
      children: [
        {
          text: 'Item 1',
          link: '/item1'
        },
        {
          text: 'Item 2',
          link: '/item2'
        },
        {
          text: 'Item 3',
          link: '/item3'
        },
      ]
    },
    {
      text: 'Tiras a Quente',
      link: '/tirasquente',
      icon: <TeamOutlined />
    },
    {
      text: 'Laminação',
      link: '/laminacao',
      icon: <FileOutlined />
    }
  ]