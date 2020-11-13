import React, { useReducer, createContext, useContext } from 'react'
import itemReducer from './itemReducer'
import * as types from '../types'
import clienteAxios from '../../config/axios'

export const ItemStateContext = createContext()
export const ItemDispatchContext = createContext()



export const ItemState = ({children}) => {



    const initialState = {
        items: {}, 
        item: {},
        category: {}
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(itemReducer, initialState)


    // Obtenemos los items de la API MELI y los pasamos al State
    const setItems = async (items) => {

            dispatch({
                type: types.SET_ITEMS,
                payload: items.slice(0,4)
            })
        
    }

    const setItem = async (item) => {


                dispatch({
                    type: types.SET_CURRENT_ITEM,
                    payload:item
                })
     


    }

    const setCategories = async (categories) => {
            
            dispatch({
                type: types.SET_CATEGORIES,
                payload: categories || ''
            })

  
    }


    return (
    
        <ItemDispatchContext.Provider value={dispatch}>

            <ItemStateContext.Provider
                value={{
                    items: state.items,
                    item: state.item,
                    categories: state.categories,
                    setItems,
                    setItem,
                    setCategories

                    
                }}
            >
                {children}
            </ItemStateContext.Provider>

        </ItemDispatchContext.Provider>

    )
}


export const useItem = () => useContext(ItemStateContext)