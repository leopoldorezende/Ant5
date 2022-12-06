import React from 'react'

interface states {
  theme: string;
  sidebarCollapsed: boolean;
  sidebarCollapsedMobile: boolean;
  responsiveSize: string;

  [name: string]: any;
}

const keepCloseInitialFilter: string[] = [];

export const storeInitialValues:states = {
  theme: 'light',
  sidebarCollapsed: false,
  sidebarCollapsedMobile: true,
  responsiveSize: 'desktop',
  keepCloseInitialFilter: [],
}

export const storeReducer = (state:states, action:{type: string, value?: any}) => {

  function filterManager(item:any) { 
    if(!state[item.page]) state = {...state, [item.page]: []}

    const filterIndex = state[item.page].findIndex((o: { filterName: any }) => o.filterName === item.filterName)

    if(filterIndex > -1) {
      state[item.page][filterIndex].filterObj = item.filterObj;
      return {...state};
    }
    else {
      return {...state, [item.page]: [...state[item.page], item]};
    }
  }

  switch (action.type) {
    
    case 'SWITCH_THEME':
      return {...state, theme: action.value};

    case 'COLLAPSE_SIDEBAR':
      return {...state, sidebarCollapsed: !state.sidebarCollapsed};
  
    case 'COLLAPSE_SIDEBAR_MOBILE':
      return {...state, sidebarCollapsedMobile: !state.sidebarCollapsedMobile};
    
    case 'RESPONSIVE_SIZE':
      return {...state, responsiveSize: action.value};

    case 'KEEP_CLOSE_INITIAL_FILTER':
      keepCloseInitialFilter.push(action.value)
      return {...state, keepCloseInitialFilter: keepCloseInitialFilter};

    case 'FILTERS':
      return filterManager(action.value)

    default:
      return {...state, [action.type]: action.value};
  }
}

export const StoreContext = React.createContext<{store: states, setStore: Function}>({
    store: storeInitialValues,
    setStore: () => {},
})