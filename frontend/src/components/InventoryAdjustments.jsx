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
  Settings, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calculator,
  Package
} from 'lucide-react';
import { mockProducts } from '../mock/inventoryData';

const InventoryAdjustments = () => {
  const [adjustments, setAdjustments] = useState([
    {
      id: '1',
      productId: '1',
      productName: 'Dell Latitude 5520',
      currentStock: 45,
      newStock: 43,
      adjustment: -2,
      reason: 'damaged',
      notes: 'Water damaged units found during inspection',
      date: '2024-01-15T10:30:00Z',
      user: 'John Doe',
      status: 'completed'
    },
    {
      id: '2',
      productId: '2',
      productName: 'Logitech MX Master 3',
      currentStock: 120,
      newStock: 125,
      adjustment: 5,
      reason: 'found',
      notes: 'Found additional units in storage area B',
      date: '2024-01-14T14:20:00Z',
      user: 'Jane Smith',
      status: 'completed'
    },
    {
      id: '3',
      productId: '3',
      productName: 'Ergonomic Office Chair',
      currentStock: 8,
      newStock: 10,
      adjustment: 2,
      reason: 'recount',
      notes: 'Cycle count correction - miscount in previous audit',
      date: '2024-01-13T09:15:00Z',
      user: 'Mike Johnson',
      status: 'pending'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReason, setSelectedReason] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAdjustment, setNewAdjustment] = useState({
    productId: '',
    currentStock: '',
    newStock: '',
    reason: 'recount',
    notes: ''
  });

  const adjustmentReasons = [
    { value: 'recount', label: 'Recount/Cycle Count' },
    { value: 'damaged', label: 'Damaged/Defective' },
    { value: 'lost', label: 'Lost/Stolen' },
    { value: 'found', label: 'Found/Recovered' },
    { value: 'expired', label: 'Expired' },
    { value: 'other', label: 'Other' }
  ];

  const filteredAdjustments = adjustments.filter(adjustment => {
    const matchesSearch = adjustment.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesReason = selectedReason === 'all' || adjustment.reason === selectedReason;
    return matchesSearch && matchesReason;
  });

  const getAdjustmentBadge = (adjustment) => {
    if (adjustment > 0) {
      return <Badge className="bg-green-100 text-green-800">+{adjustment}</Badge>;
    } else if (adjustment < 0) {
      return <Badge className="bg-red-100 text-red-800">{adjustment}</Badge>;
    } else {
      return <Badge variant="secondary">0</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleProductChange = (productId) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      setNewAdjustment({
        ...newAdjustment,
        productId: productId,
        currentStock: product.stock.toString(),
        newStock: product.stock.toString()
      });
    }
  };

  const calculateAdjustment = () => {
    const current = parseInt(newAdjustment.currentStock) || 0;
    const newStock = parseInt(newAdjustment.newStock) || 0;
    return newStock - current;
  };

  const handleAddAdjustment = () => {
    const selectedProduct = mockProducts.find(p => p.id === newAdjustment.productId);
    if (!selectedProduct) return;

    const adjustment = {
      id: Date.now().toString(),
      productId: newAdjustment.productId,
      productName: selectedProduct.name,
      currentStock: parseInt(newAdjustment.currentStock),
      newStock: parseInt(newAdjustment.newStock),
      adjustment: calculateAdjustment(),
      reason: newAdjustment.reason,
      notes: newAdjustment.notes,
      date: new Date().toISOString(),
      user: 'Current User',
      status: 'pending'
    };

    setAdjustments([adjustment, ...adjustments]);
    setNewAdjustment({
      productId: '',
      currentStock: '',
      newStock: '',
      reason: 'recount',
      notes: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleCompleteAdjustment = (adjustmentId) => {
    setAdjustments(adjustments.map(adj => 
      adj.id === adjustmentId ? {...adj, status: 'completed'} : adj
    ));
  };

  const AdjustmentForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="product">Product</Label>
        <Select value={newAdjustment.productId} onValueChange={handleProductChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent>
            {mockProducts.map(product => (
              <SelectItem key={product.id} value={product.id}>
                {product.name} ({product.sku}) - Current: {product.stock}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="currentStock">Current Stock</Label>
          <Input
            id="currentStock"
            type="number"
            value={newAdjustment.currentStock}
            onChange={(e) => setNewAdjustment({...newAdjustment, currentStock: e.target.value})}
            placeholder="Current quantity"
            readOnly
            className="bg-gray-50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newStock">New Stock</Label>
          <Input
            id="newStock"
            type="number"
            value={newAdjustment.newStock}
            onChange={(e) => setNewAdjustment({...newAdjustment, newStock: e.target.value})}
            placeholder="New quantity"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="adjustment">Adjustment</Label>
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-gray-400" />
            <span className={`font-medium ${
              calculateAdjustment() > 0 ? 'text-green-600' : 
              calculateAdjustment() < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              {calculateAdjustment() > 0 ? '+' : ''}{calculateAdjustment()}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Reason</Label>
        <Select value={newAdjustment.reason} onValueChange={(value) => setNewAdjustment({...newAdjustment, reason: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select reason" />
          </SelectTrigger>
          <SelectContent>
            {adjustmentReasons.map(reason => (
              <SelectItem key={reason.value} value={reason.value}>
                {reason.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={newAdjustment.notes}
          onChange={(e) => setNewAdjustment({...newAdjustment, notes: e.target.value})}
          placeholder="Detailed explanation of the adjustment..."
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
              <Settings className="w-8 h-8 text-blue-600" />
              Inventory Adjustments
            </h1>
            <p className="text-gray-600 mt-1">Manage stock level corrections and adjustments</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Adjustment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Inventory Adjustment</DialogTitle>
                <DialogDescription>
                  Adjust stock levels to correct discrepancies
                </DialogDescription>
              </DialogHeader>
              <AdjustmentForm />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAdjustment}>Create Adjustment</Button>
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
                  <p className="text-sm text-gray-600">Total Adjustments</p>
                  <p className="text-2xl font-bold">{adjustments.length}</p>
                </div>
                <Settings className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {adjustments.filter(adj => adj.status === 'pending').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {adjustments.filter(adj => adj.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Net Change</p>
                  <p className={`text-2xl font-bold ${
                    adjustments.reduce((sum, adj) => sum + adj.adjustment, 0) > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {adjustments.reduce((sum, adj) => sum + adj.adjustment, 0) > 0 ? '+' : ''}
                    {adjustments.reduce((sum, adj) => sum + adj.adjustment, 0)}
                  </p>
                </div>
                <Package className="w-8 h-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Adjustments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search adjustments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedReason} onValueChange={setSelectedReason}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Reasons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reasons</SelectItem>
                  {adjustmentReasons.map(reason => (
                    <SelectItem key={reason.value} value={reason.value}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Adjustments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Adjustment History ({filteredAdjustments.length} adjustments)</CardTitle>
            <CardDescription>
              Complete history of all inventory adjustments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>New Stock</TableHead>
                    <TableHead>Adjustment</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdjustments.map((adjustment) => (
                    <TableRow key={adjustment.id}>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">
                            {new Date(adjustment.date).toLocaleDateString()}
                          </div>
                          <div className="text-gray-500">
                            {adjustment.user}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{adjustment.productName}</div>
                        <div className="text-sm text-gray-500">{adjustment.notes}</div>
                      </TableCell>
                      <TableCell className="text-center font-medium">{adjustment.currentStock}</TableCell>
                      <TableCell className="text-center font-medium">{adjustment.newStock}</TableCell>
                      <TableCell className="text-center">
                        {getAdjustmentBadge(adjustment.adjustment)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {adjustmentReasons.find(r => r.value === adjustment.reason)?.label || adjustment.reason}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(adjustment.status)}
                      </TableCell>
                      <TableCell>
                        {adjustment.status === 'pending' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleCompleteAdjustment(adjustment.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Complete
                          </Button>
                        )}
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

export default InventoryAdjustments;