import { Router } from 'express';
const router = Router();
import Cart, { findOne } from '../models/cartModel';

// Add item to cart
router.post('/add', async (req, res) => {
  const { userId, productId, name, price } = req.body;

  let cart = await findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find(item => item.productId.equals(productId));
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({ productId, name, price });
  }

  await cart.save();
  res.status(200).json(cart);
});

// Get cart items
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const cart = await findOne({ userId }).populate('items.productId');
  res.status(200).json(cart);
});

// Update cart item quantity
router.post('/update', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const cart = await findOne({ userId });
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const item = cart.items.find(item => item.productId.equals(productId));
  if (item) {
    item.quantity = quantity;
    await cart.save();
    res.status(200).json(cart);
  } else {
    res.status(404).json({ message: 'Item not found in cart' });
  }
});

// Remove item from cart
router.post('/remove', async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await findOne({ userId });
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = cart.items.filter(item => !item.productId.equals(productId));
  await cart.save();
  res.status(200).json(cart);
});

export default router;
