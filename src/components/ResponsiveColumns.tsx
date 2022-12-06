import React from 'react'
import { StoreContext } from '../store'

export default function ResponsiveColumns (columns:any) {  

  const { store } = React.useContext(StoreContext);

  const responsiveColumns:any = columns.map((col:any) => {
    if(store.responsiveSize != 'desktop' && (col.fixed == 'left' || col.fixed == 'right')) {
      return {...col, fixed: false}
    }
    else {
      return col
    }
  })

  return responsiveColumns
}