import  {  gql  }  from  "apollo-server-micro"; 

export const typeDefs = gql`
   

    type Author {
        name: String
        lastname: String
    }

    type Price {
        currency: String
        amount: Int
        decimals: Float
    }

    type Category {
        id: String
        name: String
        permalink: String
        path_from_root: [Category]

    }

    type Item {
        id: String
        title: String
        category_id: String
        price: [Price]
        picture: String
        condition: String
        free_shipping: Boolean
        sold_quantity: Int
        description: String

    }

    type Categories {
        path_from_root: [Category]
    }

    type Description {
        plain_text: String
    }

    type Query {
        author: Author!
        item(id: String!): Item!
        items(q: String!): [Item]!
        description(id: String!): Description!
        category(id: String!): Category!
        categories(q: String!): Categories!
        
    }
`