import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
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
  Warehouse, 
  MapPin,
  Package,
  Building,
  Edit,
  Trash2
} from 'lucide-react';
import { mockLocations, mockProducts } from '../mock/inventoryData';

const Locations = () => {
  const [locations, setLocations] = useState(mockLocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [newLocation, setNewLocation] = useState({
    code: '',
    name: '',
    type: 'internal',
    capacity: '',
    description: '',
    address: '',
    contactPerson: '',
    contactPhone: ''
  });

  const locationTypes = [
    { value: 'internal', label: 'Internal/Warehouse' },
    { value: 'external', label: 'External/Supplier' },
    { value: 'customer', label: 'Customer Location' },
    { value: 'transit', label: 'Transit Location' }
  ];

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || location.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getOccupancyColor = (occupancy) => {
    if (occupancy >= 90) return 'bg-red-500';
    if (occupancy >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getLocationProducts = (locationCode) => {
    return mockProducts.filter(product => product.location === locationCode);
  };

  const handleAddLocation = () => {
    const location = {
      id: Date.now().toString(),
      ...newLocation,
      capacity: parseInt(newLocation.capacity),
      currentItems: 0
    };
    
    setLocations([...locations, location]);
    setNewLocation({
      code: '',
      name: '',
      type: 'internal',
      capacity: '',
      description: '',
      address: '',
      contactPerson: '',
      contactPhone: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleEditLocation = (location) => {
    setEditingLocation(location);
    setNewLocation({
      ...location,
      capacity: location.capacity.toString()
    });
  };

  const handleUpdateLocation = () => {
    const updatedLocation = {
      ...editingLocation,
      ...newLocation,
      capacity: parseInt(newLocation.capacity)
    };
    
    setLocations(locations.map(l => l.id === editingLocation.id ? updatedLocation : l));
    setEditingLocation(null);
    setNewLocation({
      code: '',
      name: '',
      type: 'internal',
      capacity: '',
      description: '',
      address: '',
      contactPerson: '',
      contactPhone: ''
    });
  };

  const handleDeleteLocation = (locationId) => {
    setLocations(locations.filter(l => l.id !== locationId));
  };

  const LocationForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="code">Location Code</Label>
          <Input
            id="code"
            value={newLocation.code}
            onChange={(e) => setNewLocation({...newLocation, code: e.target.value})}
            placeholder="e.g., WH-A-001"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Location Name</Label>
          <Input
            id="name"
            value={newLocation.name}
            onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
            placeholder="e.g., Warehouse A - Section 1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={newLocation.type} onValueChange={(value) => setNewLocation({...newLocation, type: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {locationTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={newLocation.capacity}
            onChange={(e) => setNewLocation({...newLocation, capacity: e.target.value})}
            placeholder="Maximum items"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person</Label>
          <Input
            id="contactPerson"
            value={newLocation.contactPerson}
            onChange={(e) => setNewLocation({...newLocation, contactPerson: e.target.value})}
            placeholder="e.g., John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            value={newLocation.contactPhone}
            onChange={(e) => setNewLocation({...newLocation, contactPhone: e.target.value})}
            placeholder="e.g., +1-555-0123"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            value={newLocation.address}
            onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
            placeholder="Physical address"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={newLocation.description}
            onChange={(e) => setNewLocation({...newLocation, description: e.target.value})}
            placeholder="Additional details about this location..."
          />
        </div>
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
              <Warehouse className="w-8 h-8 text-blue-600" />
              Locations
            </h1>
            <p className="text-gray-600 mt-1">Manage warehouse locations and storage areas</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Location</DialogTitle>
                <DialogDescription>
                  Create a new storage location or warehouse area
                </DialogDescription>
              </DialogHeader>
              <LocationForm />
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLocation}>Add Location</Button>
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
                  <p className="text-sm text-gray-600">Total Locations</p>
                  <p className="text-2xl font-bold">{locations.length}</p>
                </div>
                <Warehouse className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Capacity</p>
                  <p className="text-2xl font-bold">
                    {locations.reduce((sum, loc) => sum + loc.capacity, 0)}
                  </p>
                </div>
                <Building className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Items Stored</p>
                  <p className="text-2xl font-bold">
                    {locations.reduce((sum, loc) => sum + loc.currentItems, 0)}
                  </p>
                </div>
                <Package className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Utilization</p>
                  <p className="text-2xl font-bold">
                    {Math.round(
                      locations.reduce((sum, loc) => sum + (loc.currentItems / loc.capacity * 100), 0) / locations.length
                    )}%
                  </p>
                </div>
                <MapPin className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search locations..."
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
                  {locationTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location) => {
            const occupancyPercentage = Math.round((location.currentItems / location.capacity) * 100);
            const productsInLocation = getLocationProducts(location.code);
            
            return (
              <Card key={location.id} className="transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Warehouse className="w-5 h-5 text-blue-500" />
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {locationTypes.find(t => t.value === location.type)?.label || location.type}
                    </Badge>
                  </div>
                  <CardDescription className="font-mono text-sm">{location.code}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Capacity Usage</span>
                      <span>{location.currentItems}/{location.capacity}</span>
                    </div>
                    <Progress value={occupancyPercentage} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{occupancyPercentage}% occupied</span>
                      <span className={`font-medium ${
                        occupancyPercentage >= 90 ? 'text-red-600' :
                        occupancyPercentage >= 70 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {occupancyPercentage >= 90 ? 'Critical' :
                         occupancyPercentage >= 70 ? 'High' : 'Normal'}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <div className="text-sm text-gray-600 mb-2">Products in this location:</div>
                    <div className="space-y-1">
                      {productsInLocation.slice(0, 3).map(product => (
                        <div key={product.id} className="flex justify-between text-xs">
                          <span className="truncate">{product.name}</span>
                          <span className="font-medium">{product.stock}</span>
                        </div>
                      ))}
                      {productsInLocation.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{productsInLocation.length - 3} more items
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditLocation(location)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Location</DialogTitle>
                          <DialogDescription>
                            Update location information
                          </DialogDescription>
                        </DialogHeader>
                        <LocationForm />
                        <div className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" onClick={() => setEditingLocation(null)}>
                            Cancel
                          </Button>
                          <Button onClick={handleUpdateLocation}>Update Location</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteLocation(location.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Locations;