// Products.tsx

import { useGetProductsQuery, useDeleteProductMutation,useCreateProductMutation } from '../api/api';
import { PlusCircleIcon, SearchIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Header from '../Components/Header';
import Rating from '../Components/Rating';
import CreateProductModal from '../Components/CreateProductModal';
import {toast} from "react-toastify"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products and handle loading/error states
  const { data: products, isLoading, isError,refetch } = useGetProductsQuery(searchTerm);

  // Create product mutation
  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  // Delete product mutation
  const [deleteProduct] = useDeleteProductMutation();

  // Handle product deletion
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleDeleteProduct = async (productId: string) => {

    try {
      const response = await deleteProduct(productId).unwrap(); // unwrap to directly access the response
      console.log('Product deleted successfully', response);
      toast.success("Item deleted")
      refetch()
    } catch (error) {
      console.error('Failed to delete the product', error);
    }
  };

  // Loading and error handling UI
  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center !bg-blue-500 hover:!bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Product
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {products?.map((product) => (
          <div
            key={product.productId}
            className="border border-stone-300 shadow rounded-md p-4 max-w-full w-full mx-auto"
          >
            <div className="flex flex-col items-center relative">
              <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
              <p className="text-gray-800">₵{product.price.toFixed(2)}</p>
              <div className="text-sm text-gray-600 mt-1">Stock: {product.stockQuantity}</div>
              {product.rating && (
                <div className="flex items-center mt-2">
                  <Rating rating={product.rating} />
                </div>
              )}

              {/* Delete Icon */}
                            <button
                onClick={() => {
                  setSelectedProductId(product.productId);
                  setDeleteDialogOpen(true);
                }}
                className="absolute top-2 right-2 p-2 !bg-red-400 text-white rounded-full hover:!bg-red-600 transition"
                aria-label="Delete Product"
              >
                <Trash2 size={15} />
              </button>

            </div>
          </div>
        ))}
      </div>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this product? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedProductId) {
                  handleDeleteProduct(selectedProductId);
                }
                setDeleteDialogOpen(false);
              }}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>


      {/* MODAL */}
      <CreateProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
};

export default Products;
