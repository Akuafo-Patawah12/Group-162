import { Request, Response } from 'express';
import Product from '../Models/ProductSchema'; // Make sure the path is correct

// GET /products?search=...
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString() || '';
    const products = await Product.find({
      name: { $regex: search, $options: 'i' }, // case-insensitive search
    });

    res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ message: 'Error retrieving products' });
  }
};

// POST /products
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, name, price, rating, stockQuantity } = req.body;

    const newProduct = new Product({
      productId,
      name,
      price,
      rating,
      stockQuantity,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findOneAndDelete({productId: id});

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error deleting product" });
  }
};
