import React, { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
import Detail from '../../components/Detail'
import Layout from '../../components/Layout'
import { Helmet } from "react-helmet";
import { useItem } from '../../context/items/itemState';
import ErrorPage from '../../components/ErrorPage'
import Loading from '../../components/Loader'
import { GetServerSideProps,InferGetServerSidePropsType } from 'next'

const Item = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {


  const { category } = props.categories || {};
  const { path_from_root } = category || {};

  const { item } = props.item || {};

  const { errorItem, errorCategories } = props;

  const [loading, setLoading] = useState(true);
  const context = useItem();
  const { setItem, setCategories } = context;


  useEffect(() => {
    
    if (item && Object.keys(item).length > 0) { 
      setLoading(false); 
      setItem(item); 
      setCategories(path_from_root); 
    }

    if (errorItem || errorCategories) {
      setLoading(false);
    }

  }, [item])




  if (loading)  return (<Loading />) 

  return (

    
    
    <>
      
          <Helmet>
            <title>Mercado Libre - {`${item && item.title?item.title:'No hay productos'}`}</title>
            <meta name="description" content={`Item ${item && item.title?item.title:'No hay productos'}`} />
          </Helmet>
          <Layout categories={
              item && path_from_root?
                path_from_root
                :
                []

          }>
              <>
                  {errorItem &&
                    <ErrorPage message='No se encontro el producto solicitado' />
                  }

                  {item && path_from_root &&
                 
                 
                    <>
                      <Detail item={item}  />
                    
                    </>
                
                   

                  }
                </>
          </Layout>
   </>
    
  );
}

export default Item



export const getServerSideProps:GetServerSideProps = async ({query}) => {

      let dataItem = {
        item: {
          category_id: null
        } 
      };
      let dataCategories =  {
        category: {
          path_from_root: null          
        }
      }

      let errorItem = false;
      let errorCategories = false;

      try {

          const resp1 = await fetch(`${process.env.BASE_URL}/api/items/${query.id}`);
          dataItem = await resp1.json()
          
          const resp2 = await fetch(`${process.env.BASE_URL}/api/categories/${dataItem?.item?.category_id}`);
          dataCategories = await resp2.json()


      } catch (error) {
          console.log(error);
      }  

      if (dataItem === null) errorItem = true;
      if (dataCategories === null) errorCategories = true;

      console.log(dataItem);

  return {
    props: { 
      item: dataItem,
      categories: dataCategories,
      errorItem: errorItem,
      errorCategories: errorCategories
    }
  }
}