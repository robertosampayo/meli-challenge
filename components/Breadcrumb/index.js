import React, { useEffect } from 'react'
import styles from './breadcrumb.module.scss'
import { useItem } from '../../context/items/itemState';
import {VscChevronRight} from 'react-icons/vsc'
import useSWR from 'swr'
import { useRouter } from 'next/router'

export default function Breadcrumb() {

  const router = useRouter();
  const { id } = router.query;

  const context = useItem();
  const { item, setCategories, category, setCurrentItem } = context;






  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: result, error } = useSWR(`https://api.mercadolibre.com/categories/${item.category_id}`, fetcher)


  // useEffect(() => {
  //   if (item.category_id) {
  //     setCategories(item.category_id);

  //   }
  // }, [item])




  return (
        <div className={styles.breadcrumb}>
          {result && result.path_from_root &&
              result.path_from_root.map((bread, i) => (
                <>
                  <p>{bread.name} </p>
                  {result.path_from_root.length === (i+1)?
                  ''
                  :
                  <VscChevronRight/>
                  }
                </>
              ))               
          

          }
            
        </div>
  )
}
