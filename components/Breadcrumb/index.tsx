import React, { useEffect, useState } from 'react'
import styles from './breadcrumb.module.scss'
import { useItem } from '../../context/items/itemState';
import {VscChevronRight} from 'react-icons/vsc'
import ItemType from '../../types/item'

export default function Breadcrumb() {

  // Obtenemos el context y el State global
  const context = useItem();
  const { category } = context;

  const [state, setState] = useState({
    categories: []
  })

  // Escuchamos por algun cambio en las categorias
  useEffect(() => {

    // cargar la categoria en el bread
    if (category && Object.keys(category).length > 0) {
      setState({
        ...state,
        categories: category.path_from_root
      })
    }

    // Si no categorias disponible borrarlo del bread
    if(!category || Object.keys(category).length === 0){
      setState({
        ...state,
        categories: []
      })
    }

  }, [category])


  return (
        <div data-testid="breadcrumb-category" className={styles.breadcrumb}>
          {state.categories && Object.keys(state.categories).length > 0 &&
              state.categories.map((bread:ItemType["data"]["categories"]["path_from_root"], i:number) => (
                <div key={`bread-${i}`}>
                  
                  {Object.keys(state.categories).length === (i+1)?
                  <>
                    <p className={styles.strong}>{bread.name} </p>
                  </>
                  
                  :
                  <>
                  <p>{bread.name} </p>
                  <VscChevronRight/>
                  </>
                  }
                </div>
              ))               
          

          }
            
        </div>
  )
}
