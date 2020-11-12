
type ItemType= {

    data: {

        author: { name: string, lastname: string},
        categories: {
            path_from_root: {
                id:string
                name:string
              }
          },
        item: {
            id: string,
            title: string,
            price: 
            {
                currency: string,
                amount: number,
                decimals: number
            },
            picture: string,
            conditions: string,
            free_shipping: boolean,
            description: string,
            category_id: string,
            city: string
    
        }

    }




  
  }
  
  export default ItemType