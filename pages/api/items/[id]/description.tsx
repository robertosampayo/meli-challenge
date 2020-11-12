const { createApolloFetch } = require('apollo-fetch');  
import ItemType from '../../../../types/item';
import { NextApiRequest, NextApiResponse } from 'next';

const descriptionHandler = async (req:NextApiRequest, res:NextApiResponse) => {

    return new Promise((resolve, _reject) => {


        const fetch = createApolloFetch({
          uri: `${process.env.BASE_URL}/api/graphql`,
        });
    
        fetch({
          query: `
                query($id: String! ){
                    description( id:$id ){
                    plain_text
                    }
                
                }
            `,
            variables : {id: req.query.id}
        }).then((response:ItemType) => {

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(response.data))
          resolve();
    
        }).catch((error:NextApiResponse) => {
            res.json(error);
            res.status(405).end();
            resolve()
          });

    });

}

export default descriptionHandler