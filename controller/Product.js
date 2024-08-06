import Product from '../model/Product.js';


export  async function createProduct(req, res) {
  // Create a new product instance based on the request body
  const product =new Product(req.body);
  
  // Calculate the discount price
  // product.discountPrice = Math.round(product.price * (1 - product.discountPercentage / 100));

  // Save the product to the database
  product.save()
    .then(() => {
      // Send response when the product is successfully saved
      res.status(201).send("Product created successfully");
    })
    .catch((error)  => {
      // Send error response if there's an error saving the product
      console.error("Error saving product:", error);
      res.status(500).send("Internal server error");
    });
}



export async function fetchAllProduct(req, res) {
  try {
    let query = {};

    if (req.query.gender) {
      query.gender = req.query.gender;
    } else if (req.query.id) {
      query.id = req.query.id;
    } else if (req.query.brand) {
      query.brand = req.query.brand;
    } else if (req.query.name) {
      query.name = req.query.name;
    }
    else if(req.query.productdetails){
      query.productdetails=req.query.productdetails
    }

    const products = await Product.find(query).lean();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
