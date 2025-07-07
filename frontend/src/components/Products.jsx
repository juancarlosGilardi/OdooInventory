import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from './ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Package, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { mockProducts, mockCategories } from '../mock/inventoryData';

const Products = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    sku: '',
    name: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    cost: '',
    stock: '',
    reorderLevel: '',
    maxStock: '',
    location: '',
    supplier: '',
    barcode: ''
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (product) => {
    if (product.stock === 0) {
      return <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" />Out of Stock</Badge>;
    } else if (product.stock <= product.reorderLevel) {
      return <Badge variant="secondary" className="gap-1 bg-orange-100 text-orange-800"><AlertTriangle className="w-3 h-3" />Low Stock</Badge>;
    } else {
      return <Badge variant="default" className="gap-1 bg-green-100 text-green-800"><CheckCircle className="w-3 h-3" />In Stock</Badge>;
    }
  };

  const handleAddProduct = () => {
    const product = {
      id: Date.now().toString(),
      ...newProduct,
      price: parseFloat(newProduct.price),
      cost: parseFloat(newProduct.cost),
      stock: parseInt(newProduct.stock),
      reorderLevel: parseInt(newProduct.reorderLevel),
      maxStock: parseInt(newProduct.maxStock),
      status: 'active',
      lastUpdated: new Date().toISOString(),
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'
    };
    
    setProducts([...products, product]);
    setNewProduct({
      sku: '',
      name: '',
      description: '',
      category: '',
      subcategory: '',
      price: '',
      cost: '',
      stock: '',
      reorderLevel: '',
      maxStock: '',
      location: '',
      supplier: '',
      barcode: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      ...product,
      price: product.price.toString(),
      cost: product.cost.toString(),
      stock: product.stock.toString(),
      reorderLevel: product.reorderLevel.toString(),
      maxStock: product.maxStock.toString()
    });
  };

  const handleUpdateProduct = () => {
    const updatedProduct = {
      ...editingProduct,
      ...newProduct,
      price: parseFloat(newProduct.price),
      cost: parseFloat(newProduct.cost),
      stock: parseInt(newProduct.stock),
      reorderLevel: parseInt(newProduct.reorderLevel),
      maxStock: parseInt(newProduct.maxStock),
      lastUpdated: new Date().toISOString()
    };
    
    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setNewProduct({
      sku: '',
      name: '',
      description: '',
      category: '',
      subcategory: '',
      price: '',
      cost: '',
      stock: '',
      reorderLevel: '',
      maxStock: '',
      location: '',
      supplier: '',
      barcode: ''
    });
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const ProductForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="sku">SKU</Label>
        <Input
          id="sku"
          value={newProduct.sku}
          onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
          placeholder="e.g., LAPTOP-001"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          placeholder="e.g., Dell Latitude 5520"
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
          placeholder="Product description..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {mockCategories.map(cat => (
              <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price ($)</Label>
        <Input
          id="price"
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
          placeholder="0.00"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cost">Cost ($)</Label>
        <Input
          id="cost"
          type="number"
          value={newProduct.cost}
          onChange={(e) => setNewProduct({...newProduct, cost: e.target.value})}
          placeholder="0.00"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="stock">Current Stock</Label>
        <Input
          id="stock"
          type="number"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
          placeholder="0"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="reorderLevel">Reorder Level</Label>
        <Input
          id="reorderLevel"
          type="number"
          value={newProduct.reorderLevel}
          onChange={(e) => setNewProduct({...newProduct, reorderLevel: e.target.value})}
          placeholder="0"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="supplier">Supplier</Label>
        <Input
          id="supplier"
          value={newProduct.supplier}
          onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
          placeholder="e.g., Dell Inc."
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-8 h-8 text-blue-600" />
              Products
            </h1>
            <p className="text-gray-600 mt-1">Manage your product catalog and inventory</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new product to your inventory
                </DialogDescription>
              </DialogHeader>
              <ProductForm />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct}>Add Product</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {mockCategories.map(cat => (
                    <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Product List ({filteredProducts.length} items)</CardTitle>
            <CardDescription>
              Manage your inventory items and track stock levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{product.stock}</div>
                          <div className="text-gray-500">Min: {product.reorderLevel}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(product)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                                <DialogDescription>
                                  Update product information
                                </DialogDescription>
                              </DialogHeader>
                              <ProductForm />
                              <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" onClick={() => setEditingProduct(null)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleUpdateProduct}>Update Product</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Products;