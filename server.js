const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

// ENV VARIABLES (Render will add these)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Dripzone backend is running 🚀");
});

// GET PRODUCTS
app.get("/products", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) return res.status(400).json(error);
  res.json(data);
});

// ADD PRODUCT (ADMIN)
app.post("/products", async (req, res) => {
  const { name, price, description, image_url } = req.body;

  const { data, error } = await supabase.from("products").insert([
    { name, price, description, image_url }
  ]);

  if (error) return res.status(400).json(error);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
