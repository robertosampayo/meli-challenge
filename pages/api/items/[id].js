
// /api/item/MLA841301780/
const itemHandler = async ({ query: { id } }, res) => {

    try {

      const response = await fetch(`${process.env.MELI_API}/items/${id}`, {
        method: "GET"

      });
      
        const data = await response.json();
        // Item with id exists
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: `Item con id: ${id} no encontrado.` })
        }

    } catch (e) {
      console.log("ERROR IN FETCH: " + e);
      res.status(500).json({ error: "There's a problem with MELI server. Please try again." });
    }

  }

export default itemHandler;

