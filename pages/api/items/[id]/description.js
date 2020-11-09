const { createApolloFetch } = require('apollo-fetch');  

// /api/items/MLA841301780/description
const descriptionHandler = async ({ query: { id } }, res) => {

    return new Promise((resolve, reject) => {


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
            variables : {id: id}
        }).then(response => {

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(response.data))
          resolve();
    
        }).catch(error => {
            res.json(error);
            res.status(405).end();
            resolve()
          });

    });

}

export default descriptionHandler