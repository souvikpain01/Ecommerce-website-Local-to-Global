import express from 'express';
import { createProduct,fetchAllProduct} from '../controller/Product.js';

const router = express.Router();

// Routes for handling product CRUD operations
router.post("/", createProduct);
router.get('/',fetchAllProduct);
router.put('/', (req, res) => {
    res.send('in put');
});
router.delete('/', (req, res) => {
    res.send("in delete");
});

export default router;
