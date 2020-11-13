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
        category: {},
        description: '',
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(itemReducer, initialState)


    // Obtenemos los items de la API MELI y los pasamos al State
    const setItems = async (search) => {
        try {

            const result = await clienteAxios.get(`/api/items?q=${search}`).then(async(resp) =>{
                return await resp
            }).then((itemsResponse) => {

                let items = {}

                if (itemsResponse.data && 
                    itemsResponse.data.categories && 
                    itemsResponse.data.categories.path_from_root &&
                    Object.keys(itemsResponse.data.items).length > 0) {

                    items = {
    
                        result :  itemsResponse.data.items.slice(0,4) || {},
                        categories :  itemsResponse.data.categories.path_from_root || {}
                    }

                    dispatch({
                        type: types.SET_CATEGORIES,
                        payload: itemsResponse.data.categories|| {}
                    })
        

                } else {

                    items = {
        
                        result :  {},
                        categories :  {},
                        error: 'No se encontraron productos en la busqueda'
                    }

                    dispatch({
                        type: types.SET_CATEGORIES,
                        payload: {}
                    })
        

                }



    
    
    
                dispatch({
                    type: types.SET_ITEMS,
                    payload: items
                })

            });
      

        } catch (error) {
            console.log(error);
        }
    }

    const setCurrentItem = async (id) => {
        try {

            const resp = await clienteAxios.get(`/api/items/${id}`);

            if (resp.data && resp.data.item) {

                if(resp.data.item.category_id) {
                    // Cargamos las categorias para el breadcrumb
                    setCategories(resp.data.item.category_id);
                }
                
                dispatch({
                    type: types.SET_CURRENT_ITEM,
                    payload: resp.data.item || {}
                })
                


            }else {

                const item  = {
                    error: 'No se encontro el producto'
                }

                dispatch({
                    type: types.SET_CURRENT_ITEM,
                    payload:item
                })
            }



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

                    
                }}
            >
                {children}
            </ItemStateContext.Provider>

        </ItemDispatchContext.Provider>

    )
}


export const useItem = () => useContext(ItemStateContext)