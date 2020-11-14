import Products from '../../components/Products'
import Layout from '../../components/Layout'
import { Helmet } from "react-helmet";
import { GetServerSideProps,InferGetServerSidePropsType } from 'next'


const Items = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {


  const { items } = props

  return (
    <>

      <Helmet>
        <title>Mercado Libre</title>
        <meta name="description" content="Mercado Libre App" />
      </Helmet>


      <Layout categories={
        items && 
        items?.categories && 
        items?.categories?.path_from_root ?
        
          items.categories?.path_from_root
          :
          []
      }> 
          <Products items={items} />    
      </Layout>



    </>
  )
}

export default Items;

export const getServerSideProps:GetServerSideProps = async ({query}) => {

  let dataItems = {};


  try {

      const resp = await fetch(`${process.env.BASE_URL}/api/items?q=${query.search}`);
      dataItems = await resp.json()   


  } catch (error) {
      console.log(error);
  }  

  return {
    props: { 
      items: dataItems,
    }
  }
}