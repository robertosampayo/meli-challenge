
const { createApolloFetch } = require('apollo-fetch');
import ItemType from '../../../types/item'
import { NextApiRequest, NextApiResponse } from 'next'





// /api/items/MLA841301780/
const itemHandler = async (req:NextApiRequest, res:NextApiResponse) => {

    return new Promise((resolve, _reject) => {


        const fetch = createApolloFetch({
          uri: `${process.env.BASE_URL}/api/graphql`,
        });
    
        fetch({
          query: `
                query($id: String!){
                  item(id:$id){
                        id
                        title
                        category_id
                        price {
                          currency
                          amount
                          decimals
                        }
                        sold_quantity
                      description
                      free_shipping
                      picture
                      
                
                      
                      
                  },
                  author {
                    name
                    lastname
                  }
                
                }
            `,
            variables : {id: req.query.id}
        }).then(async (response:ItemType) => {

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'max-age=180000');
            res.end(JSON.stringify(response.data))
            resolve();
          
        })
                
        .catch((error:NextApiResponse) => {
            res.json(error);
            res.status(405).end();
            resolve()
          });

    });


  }

export default itemHandler;

