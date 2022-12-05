import { theme } from 'antd'

export const themes = function(themeType:string) {
  if(themeType == 'dark') {
    return {
      algorithm: [theme.darkAlgorithm],  // theme.compactAlgorithm
      token: {
        colorPrimary: '#0099ff',
        colorBgBase: '#1d1e1f',
        colorBgContainer: '#262728',
        colorBgLayout: '#1d1e1f',
        colorBorder: '#323435',
        colorBorderSecondary: '#323435',
      },
    }
  }
  else {
    return {
      token: {
        colorPrimary: '#0099ff',
        colorBgBase: '#f0f2f5',
        colorBgContainer: '#fff',
        colorBgLayout: '#f0f2f5',
        colorFillContent: '#fff',
        colorBorder: '#dee2e9',
        colorBorderSecondary: '#dee2e9',
      },
      // components: {
      //   Drawer: {
      //     colorPrimaryBg: '#faa',
      //     colorBgBase: '#faa',
      //     colorBgContainer: '#faa',
      //     colorBgLayout: '#faa',
      //     colorFillContent: '#faa'
      //   },
      // },
    }
  }
}