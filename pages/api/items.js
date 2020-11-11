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
                  
                    },
                
                }
            `,
            variables : {q: q}
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


