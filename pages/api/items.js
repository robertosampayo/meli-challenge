

// /api/items
const handler = async (req, res) => {


    try {
        const response = await fetch(`${process.env.MELI_API}/sites/MLA/search?q=${req.query.q}`, {
          method: "GET"
  
        });
        
        const data = await response.json();
        return res.status(response.status).json(data);
  
  
      } catch (e) {
        console.log("ERROR IN FETCH: " + e);
        return res.status(500).json({ error: "There's a problem with MELI server. Please try again." });
      }


}

export default handler;


