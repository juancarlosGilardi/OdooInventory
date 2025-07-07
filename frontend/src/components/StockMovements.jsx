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
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowRightLeft,
  Package,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { mockStockMovements, mockProducts } from '../mock/inventoryData';

const StockMovements = () => {
  const [movements, setMovements] = useState(mockStockMovements);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMovement, setNewMovement] = useState({
    productId: '',
    type: 'receipt',
    quantity: '',
    location: '',
    reference: '',
    notes: ''
  });

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || movement.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getMovementIcon = (type) => {
    switch (type) {
      case 'receipt':
        return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case 'delivery':
        return <ArrowDownRight className="w-4 h-4 text-red-500" />;
      case 'adjustment':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getMovementBadge = (type) => {
    switch (type) {
      case 'receipt':
        return <Badge className="bg-green-100 text-green-800">Receipt</Badge>;
      case 'delivery':
        return <Badge className="bg-red-100 text-red-800">Delivery</Badge>;
      case 'adjustment':
        return <Badge className="bg-orange-100 text-orange-800">Adjustment</Badge>;
      default:
        return <Badge variant="secondary">Movement</Badge>;
    }
  };

  const handleAddMovement = () => {
    const selectedProduct = mockProducts.find(p => p.id === newMovement.productId);
    if (!selectedProduct) return;

    const movement = {
      id: Date.now().toString(),
      productId: newMovement.productId,
      productName: selectedProduct.name,
      type: newMovement.type,
      quantity: newMovement.type === 'delivery' ? -Math.abs(parseInt(newMovement.quantity)) : parseInt(newMovement.quantity),
      location: newMovement.location,
      reference: newMovement.reference,
      date: new Date().toISOString(),
      user: 'Current User',
      notes: newMovement.notes
    };

    setMovements([movement, ...movements]);
    setNewMovement({
      productId: '',
      type: 'receipt',
      quantity: '',
      location: '',
      reference: '',
      notes: ''
    });
    setIsAddDialogOpen(false);
  };

  const MovementForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="product">Product</Label>
          <Select value={newMovement.productId} onValueChange={(value) => setNewMovement({...newMovement, productId: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {mockProducts.map(product => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name} ({product.sku})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Movement Type</Label>
          <Select value={newMovement.type} onValueChange={(value) => setNewMovement({...newMovement, type: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="receipt">Receipt (Stock In)</SelectItem>
              <SelectItem value="delivery">Delivery (Stock Out)</SelectItem>
              <SelectItem value="adjustment">Adjustment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={newMovement.quantity}
            onChange={(e) => setNewMovement({...newMovement, quantity: e.target.value})}
            placeholder="Enter quantity"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={newMovement.location}
            onChange={(e) => setNewMovement({...newMovement, location: e.target.value})}
            placeholder="e.g., WH-A-001"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reference">Reference</Label>
          <Input
            id="reference"
            value={newMovement.reference}
            onChange={(e) => setNewMovement({...newMovement, reference: e.target.value})}
            placeholder="e.g., PO-001, SO-001"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={newMovement.notes}
          onChange={(e) => setNewMovement({...newMovement, notes: e.target.value})}
          placeholder="Optional notes about this movement..."
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
              <ArrowRightLeft className="w-8 h-8 text-blue-600" />
              Stock Movements
            </h1>
            <p className="text-gray-600 mt-1">Track all inventory movements and transactions</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Movement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Stock Movement</DialogTitle>
                <DialogDescription>
                  Record a new inventory movement transaction
                </DialogDescription>
              </DialogHeader>
              <MovementForm />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMovement}>Add Movement</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Movements</p>
                  <p className="text-2xl font-bold">{movements.length}</p>
                </div>
                <ArrowRightLeft className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Receipts</p>
                  <p className="text-2xl font-bold text-green-600">
                    {movements.filter(m => m.type === 'receipt').length}
                  </p>
                </div>
                <ArrowUpRight className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Deliveries</p>
                  <p className="text-2xl font-bold text-red-600">
                    {movements.filter(m => m.type === 'delivery').length}
                  </p>
                </div>
                <ArrowDownRight className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Adjustments</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {movements.filter(m => m.type === 'adjustment').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Movements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search movements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="receipt">Receipts</SelectItem>
                  <SelectItem value="delivery">Deliveries</SelectItem>
                  <SelectItem value="adjustment">Adjustments</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Movements Table */}
        <Card>
          <CardHeader>
            <CardTitle>Movement History ({filteredMovements.length} transactions)</CardTitle>
            <CardDescription>
              Complete history of all inventory movements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMovements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <div>
                            <div className="font-medium text-sm">
                              {new Date(movement.date).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              {new Date(movement.date).toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{movement.productName}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getMovementIcon(movement.type)}
                          {getMovementBadge(movement.type)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${
                          movement.quantity > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{movement.location}</TableCell>
                      <TableCell className="font-mono text-sm">{movement.reference}</TableCell>
                      <TableCell className="text-sm">{movement.user}</TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                        {movement.notes}
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

export default StockMovements;