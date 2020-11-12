const { createApolloFetch } = require('apollo-fetch');
import { NextApiRequest, NextApiResponse } from 'next'
import ItemType from '../../types/item'


// /api/items?q=remeras
const handler = async (req:NextApiRequest, res:NextApiResponse) => {


    return new Promise((resolve, _reject) => {


        const fetch = createApolloFetch({
          uri: `${process.env.BASE_URL}/api/graphql`,
        });
    
        fetch({
          query: `
                query($q: String!){
                    author {
                        name
                        lastname
                    },
                    categories(q:$q) {
                        path_from_root {
                            id
                            name
                          }
                      },
                      items(q:$q){
                          id
                          title
                          price {
                              currency
                              amount
                              decimals
                          }
                          picture
                          condition
                          free_shipping
                          category_id
                          city
                  
                    },
                
                }
            `,
            variables : {q: req.query.q}
        }).then((response:ItemType) => {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'max-age=180000');
          res.end(JSON.stringify(response.data))
          resolve();
    
        }).catch((error:NextApiResponse) => {
            res.json(error);
            res.status(405).end();
            resolve()
          });

    });


}

export default handler;


