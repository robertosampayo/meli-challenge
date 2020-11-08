import { Request, Response } from 'express';
const { serverRuntimeConfig } = require ("../../next.config");

const getItems = async (req:Request, res:Response) => {

    try {
      const response = await fetch(`${serverRuntimeConfig.MELI_API}/sites/MLA/search?q=${req.query.q}`, {
        method: "GET"

      });
      
      const data = await response.json();
      return res.status(response.status).json(data);


    } catch (e) {
      console.log("ERROR IN FETCH: " + e);
      return res.status(500).json({ error: "There's a problem with MELI server. Please try again." });
    }

  }

  const getItem = async (req:Request, res:Response) => {

    try {

      const response = await fetch(`${serverRuntimeConfig.MELI_API}/items/${req.params.id}`, {
        method: "GET"

      });
      
      const data = await response.json();
      return res.status(response.status).json(data);


    } catch (e) {
      console.log("ERROR IN FETCH: " + e);
      return res.status(500).json({ error: "There's a problem with MELI server. Please try again." });
    }

  }

  const getDescription = async (req:Request, res:Response) => {

    try {
      const response = await fetch(`${serverRuntimeConfig.MELI_API}/items/${req.params.id}/description`, {
        method: "GET"

      });
      
      const data = await response.json();
      return res.status(response.status).json(data);


    } catch (e) {
      console.log("ERROR IN FETCH: " + e);
      return res.status(500).json({ error: "There's a problem with MELI server. Please try again." });
    }

  }

  module.exports = {
    getItems, getItem, getDescription
  };