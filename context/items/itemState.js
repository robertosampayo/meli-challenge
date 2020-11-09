import React, { useReducer, createContext, useContext } from 'react'
import itemReducer from './itemReducer'
import * as types from '../types'
import clienteAxios from '../../config/axios'

const ItemStateContext = createContext()
const ItemDispatchContext = createContext()



export const ItemState = ({children}) => {



    const initialState = {
        items: {}, 
        item: {},
        category: {},
        description: '',
        errorform: false

    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(itemReducer, initialState)


    // Obtenemos los items de la API MELI y los pasamos al State
    const setItems = async (search) => {
        try {

            const items = await clienteAxios.get(`/api/items?q=${search}`);
            dispatch({
                type: types.SET_ITEMS,
                payload: items.data.items
            })

        } catch (error) {
            console.log(error);
        }
    }

    const setCurrentItem = async (id) => {
        try {

            const items = await clienteAxios.get(`/api/items/${id}`);
            dispatch({
                type: types.SET_CURRENT_ITEM,
                payload: items.data.item
            })

        } catch (error) {
            console.log(error);
        }
    }

    const setCategories = async (id) => {
        try {
            
            const resp = await clienteAxios.get(`/api/categories/${id}`);
            dispatch({
                type: types.SET_CATEGORIES,
                payload: resp.data.category || ''
            })

        } catch (error) {
            console.log(error);
        }
    }

    // const mostrarError = () => {
    //     dispatch({
    //         type: types.VALIDAR_FORMULARIO
    //     })
    // }


    return (
    
        <ItemDispatchContext.Provider value={dispatch}>

            <ItemStateContext.Provider
                value={{
                    items: state.items,
                    item: state.item,
                    description: state.description,
                    category: state.category,
                    errorform: state.errorform,
                    setItems,
                    setCurrentItem,
                    setCategories
                    // mostrarError,
                    
                }}
            >
                {children}
            </ItemStateContext.Provider>

        </ItemDispatchContext.Provider>

    )
}


export const useItem = () => useContext(ItemStateContext)