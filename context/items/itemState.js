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
                payload: items.data.results
            })

        } catch (error) {
            console.log(error);
        }
    }

    const setCurrentItem = async (id) => {
        try {

            const items = await clienteAxios.get(`/api/items/${id}`);
            console.log(items);
            dispatch({
                type: types.SET_CURRENT_ITEM,
                payload: items.data
            })

        } catch (error) {
            console.log(error);
        }
    }

    const setCurrentDescription = async (id) => {
        try {

            const items = await clienteAxios.get(`/api/items/${id}/description`);
            dispatch({
                type: types.SET_CURRENT_DESCRIPTION,
                payload: items.data.plain_text
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
                    errorform: state.errorform,
                    setItems,
                    setCurrentItem,
                    setCurrentDescription
                    // mostrarError,
                    
                }}
            >
                {children}
            </ItemStateContext.Provider>

        </ItemDispatchContext.Provider>

    )
}


export const useItem = () => useContext(ItemStateContext)