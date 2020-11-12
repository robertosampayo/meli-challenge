import { IResolvers } from "apollo-server-micro";
import axios from "axios";
import fetch from "isomorphic-fetch";

interface itemAPI {

  
  id: string,
  title: string,
  price: string,
  currency_id: string,
  thumbnail: string,
  condition: string,
  free_shipping: boolean,
  category_id:string,
  city_name: string
  shipping: {
    free_shipping: boolean
  },
  address: {
    city_name: string
  }


}



export const resolvers:IResolvers = {

  Query: {
    author: (_,) => {

        return {

            name: "Roberto",
            lastname: "Sanchez"
        }
    },
    item: (_, args) => {
      try {
          //MLA841301780
        const itemPromise = fetch(`${process.env.MELI_API}/items/${args.id}`);
        const description = fetch(`${process.env.MELI_API}/items/${args.id}/description`);


        return Promise.all([itemPromise, description]).then(async ([itemP, descriptionP]) => {

            const item = await itemP.json();
            const description = await descriptionP.json();


            return [item, description]
            
        }).then( ([item, description]) => {

            const price = item.price || 0;
            const decimals = (price % 1).toFixed(2) || 0;
    
    
            
    

            return {

                "id": item.id || "",
                "title": item.title || "",
                "category_id": item.category_id || "",
                "price": [
                    {
                        "currency":item.currency_id || "",
                        "amount":parseInt(price,10),
                        "decimals":decimals
    
                    }
                ],
                "picture": item.pictures[0].secure_url || "",
                "condition": item.condition || "",
                "free_shipping": item.shipping.free_shipping,
                "sold_quantity": parseInt(item.sold_quantity) || "",
                
                "description": description.plain_text || "",


            }






        }).catch((error) => {
          if (error) throw new Error(error);
          console.log(error);
        });











      } catch (error) {
        throw error;
      }
    },
    items: async (_, args) => {
        try {



          return await fetch(`${process.env.MELI_API}/sites/MLA/search?q=${args.q}`).then(async(resp)=>{
            const respuesta= await resp.json();
            
            return respuesta?.results ? respuesta?.results : {}
                  
          }).then((results)=> {
            if (results && Object.keys(results).length > 0) {

              return results.map((item:itemAPI) => ({
                "id": item.id || "",
                "title": item.title || "",
                "price": [
                    {
                        "currency":item.currency_id || "",
                        "amount":parseInt(item.price,10) || 0,
                        "decimals":(parseInt(item.price,10) % 1).toFixed(2) || 0
    
                    }
                ],
                "picture": item.thumbnail || "",
                "condition": item.condition || "",
                "free_shipping": item.shipping.free_shipping,
                "category_id": item.category_id,
                "city": item.address.city_name
              }));

            }else {
              return {}
            }
  
            
          })




          


  

  
        } catch (error) {
          throw error;
        }
      },

      category: async (_, args) => {
        try {
            const category = await axios.get(`${process.env.MELI_API}/categories/${args.id}`);
            return {                      
         

                
                "id": category.data.id || "",
                "name": category.data.name || "",
                "permalink": category.data.permalink || "",
                "path_from_root": category.data.path_from_root

            
            }


  

  
        } catch (error) {
          throw error;
        }
      },

      description: async (_, args) => {
        try {
            const description = await axios.get(`${process.env.MELI_API}/items/${args.id}/description`);


            return {                      
         

                "plain_text": description.data.plain_text || "",  

            
            }


  

  
        } catch (error) {
          throw error;
        }
      },
      categories: async (_, args) => {
        try {
            return await fetch(`${process.env.MELI_API}/sites/MLA/search?q=${args.q}`).then(async(resp)=>{
              const respuesta= await resp.json();
              return respuesta.filters[0].values[0].path_from_root
            }).then((path)=> {
                return {                      
            
    
                    "path_from_root": path || [],  
    
                
                }
            })




  

  
        } catch (error) {
          throw error;
        }
      },

  }
};