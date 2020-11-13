import React, {useEffect, useState} from 'react'
import styles from './detail.module.scss'
import ImageDefault from '../Utils/imgDefaultDetail'
import Loading from '../Loader'
import Breadcrumb from '../Breadcrumb'
import ItemType from '../../types/item'

interface DetailProps {
  item: ItemType['data']['item']
}

const Detail: React.FC<DetailProps> = (item) => {


  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if (item.item) setLoading(false)
  },[item.item])

  return (
    
    <>         
        
        {loading &&
          <Loading />
        
        }
        <div className={styles.detail} data-cy='detail'>
          
            {item.item && item.item.picture ? (

              <div className={styles.detail__container} >
                <div className={styles.detail__product}>
                    {item.item.picture?
                      <img src={item.item.picture}  />
                      :
                      <ImageDefault />
                    }
                    
                    <div className={styles.detail__product__text} data-cy='datail-text'>
                        <p>Nuevo - {item.item.sold_quantity?item.item.sold_quantity:'0'} vendidos</p>
                        <h2>{item.item.title? item.item.title: ''}</h2>

                        <h1>$ {
                          item.item.price ? 
                            item.item.price[0].decimals > 0 ?
                              (item.item.price[0].amount + item.item.price[0].decimals).toFixed(2)
                              : item.item.price[0].amount
                            : '0'
                        }</h1>

                        <button>Comprar</button>
                    </div>
                </div>
                <div className={styles.detail__description} data-cy='detail-description'>
                    <h2>Descripción del producto</h2>
                    <p>{item.item.description? item.item.description:'Producto sin Descripción'}</p>
                </div>
              </div>

          ):(
              <Loading />
            )
          }
        </div>
  


    </>
  )
}

export default Detail

