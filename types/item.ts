
type ItemType= {
    author: { name: string, lastname: string}
    item: {
        id: string,
        title: string,
        price: {
            currency: string,
            amount: number,
            decimals: number
        },
        picture: string,
        conditions: string,
        free_shipping: boolean,
        sold_quantity: number,
        description: string

    }

  
  }
  
  export default ItemType