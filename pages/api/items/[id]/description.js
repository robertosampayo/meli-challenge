
  

// /api/items/MLA841301780/description
const descriptionHandler = async ({ query: { id } }, res) => {

try {
    const response = await fetch(`${process.env.MELI_API}/items/${id}/description`, {
    method: "GET"

    });
    
    const data = await response.json();
    return res.status(response.status).json(data);
    // Description with id exists
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: `Descripción con id: ${id} no encontrada.` })
    }

} catch (e) {
    console.log("ERROR IN FETCH: " + e);
    return res.status(500).json({ error: "There's a problem with MELI server. Please try again." });
}

}

export default descriptionHandler