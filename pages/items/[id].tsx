import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Detail from '../../components/Detail'
import Layout from '../../components/Layout'
import { Helmet } from "react-helmet";
import { useItem } from '../../context/items/itemState';
import useMounted from '../../utils/useMounted'
import ErrorPage from '../../components/ErrorPage'
import ItemType from '../../types/item'
import Loading from '../../components/Loader'


const Item = () => {
  const router = useRouter();
  const { query } = router;

  // Obtenemos el context y el State global
  const context = useItem();
  const { item, setCurrentItem, category } = context;

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  // Obtenemos el ID del item
  useEffect(() => {
    if (query.id) { getItemInfo(query.id.toString()); }
    
  }, [query.id]);

  useEffect(() => {
    if(item && item?.error)  setError(item.error);
    
    if (item) setLoading(false)



  }, [item])

  // Pasamos el item al State
  const getItemInfo = async (id:String) => {
    setCurrentItem(id);
  }

  const isMounted = useMounted();

  if (loading)  return (<Loading />) 

  return (

    
    
    <>
      
          <Helmet>
            <title>Mercado Libre - {`${item && item.title?item.title:''}`}</title>
            <meta name="description" content={`Item ${item && item.title?item.title:''}`} />
          </Helmet>
          <Layout>

            {error ?
              <ErrorPage message={error} />
                :
              <> 
                  {item && item.title && category &&
                    <>
                    {isMounted ? (
                      <>
                      
                      <Detail item={item}  />
                      </>
                    ):(
                        <p>Loading ...</p>
                      )
                    }
                    </>
                  }
              </>
            }
          </Layout>
   </>
    
  );
}

export default Item