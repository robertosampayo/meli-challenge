const { createApolloFetch } = require('apollo-fetch');

// /api/items?q=remeras
const handler = async ({ query: { q } }, res) => {


    return new Promise((resolve, reject) => {


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
                        
                    }
                
                }
            `,
            variables : {q: q, limit:5}
        }).then(response => {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'max-age=180000');
          res.end(JSON.stringify(response.data))
          resolve();
    
        }).catch(error => {
            res.json(error);
            res.status(405).end();
            resolve()
          });

    });


}

export default handler;


