import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  DollarSign,
  AlertTriangle,
  Download,
  Calendar,
  Target,
  Zap
} from 'lucide-react';
import { 
  mockProducts, 
  mockStockMovements, 
  getTotalStockValue, 
  getLowStockProducts, 
  getOutOfStockProducts,
  getStockByCategory
} from '../mock/inventoryData';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  const totalStockValue = getTotalStockValue();
  const lowStockProducts = getLowStockProducts();
  const outOfStockProducts = getOutOfStockProducts();
  const categoryStats = getStockByCategory();

  // Calculate movement statistics
  const receipts = mockStockMovements.filter(m => m.type === 'receipt');
  const deliveries = mockStockMovements.filter(m => m.type === 'delivery');
  const adjustments = mockStockMovements.filter(m => m.type === 'adjustment');

  const totalReceipts = receipts.reduce((sum, m) => sum + m.quantity, 0);
  const totalDeliveries = Math.abs(deliveries.reduce((sum, m) => sum + m.quantity, 0));
  const totalAdjustments = adjustments.reduce((sum, m) => sum + m.quantity, 0);

  const topMovingProducts = mockProducts
    .map(product => ({
      ...product,
      movementCount: mockStockMovements.filter(m => m.productId === product.id).length
    }))
    .sort((a, b) => b.movementCount - a.movementCount)
    .slice(0, 5);

  const stockTurnoverData = mockProducts.map(product => ({
    ...product,
    turnover: product.stock > 0 ? (product.cost * 12) / (product.stock * product.cost) : 0
  })).sort((a, b) => b.turnover - a.turnover);

  const ReportCard = ({ title, value, subtitle, icon: Icon, trend, color = "blue" }) => (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-lg bg-${color}-100`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
        </div>
        {trend && (
          <div className="mt-3 flex items-center gap-1 text-sm">
            {trend.direction === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={trend.direction === 'up' ? 'text-green-600' : 'text-red-600'}>
              {trend.value}
            </span>
            <span className="text-gray-500">vs last {selectedPeriod}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              Inventory Reports
            </h1>
            <p className="text-gray-600 mt-1">Analytics and insights for your inventory performance</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ReportCard
            title="Total Stock Value"
            value={`$${totalStockValue.toLocaleString()}`}
            subtitle="Current inventory value"
            icon={DollarSign}
            trend={{ direction: 'up', value: '12.5%' }}
            color="green"
          />
          <ReportCard
            title="Stock Movements"
            value={mockStockMovements.length}
            subtitle="This month"
            icon={Package}
            trend={{ direction: 'up', value: '8.2%' }}
            color="blue"
          />
          <ReportCard
            title="Low Stock Items"
            value={lowStockProducts.length}
            subtitle="Need attention"
            icon={AlertTriangle}
            trend={{ direction: 'down', value: '15.0%' }}
            color="orange"
          />
          <ReportCard
            title="Stock Turnover"
            value="4.2x"
            subtitle="Annual average"
            icon={Zap}
            trend={{ direction: 'up', value: '6.8%' }}
            color="purple"
          />
        </div>

        {/* Detailed Reports */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="movements">Movements</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stock by Category */}
              <Card>
                <CardHeader>
                  <CardTitle>Stock by Category</CardTitle>
                  <CardDescription>Inventory distribution across categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(categoryStats).map(([category, stats]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{category}</span>
                        <span>{stats.totalItems} items</span>
                      </div>
                      <Progress 
                        value={(stats.totalItems / mockProducts.reduce((sum, p) => sum + p.stock, 0)) * 100} 
                        className="h-2" 
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{stats.productCount} products</span>
                        <span>${stats.totalValue.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Moving Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Moving Products</CardTitle>
                  <CardDescription>Most active items by transaction count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topMovingProducts.map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.sku}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">{product.movementCount} movements</Badge>
                          <p className="text-xs text-gray-500 mt-1">{product.stock} in stock</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="movements" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Stock Receipts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{totalReceipts}</div>
                  <p className="text-sm text-gray-600">Total items received</p>
                  <div className="mt-2">
                    <Badge className="bg-green-100 text-green-800">
                      {receipts.length} transactions
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Stock Deliveries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{totalDeliveries}</div>
                  <p className="text-sm text-gray-600">Total items delivered</p>
                  <div className="mt-2">
                    <Badge className="bg-red-100 text-red-800">
                      {deliveries.length} transactions
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Adjustments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${totalAdjustments >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalAdjustments >= 0 ? '+' : ''}{totalAdjustments}
                  </div>
                  <p className="text-sm text-gray-600">Net adjustment</p>
                  <div className="mt-2">
                    <Badge className="bg-orange-100 text-orange-800">
                      {adjustments.length} adjustments
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Movement Activity</CardTitle>
                <CardDescription>Latest inventory transactions</CardDescription>
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
                        <TableHead>Reference</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockStockMovements.slice(0, 10).map((movement) => (
                        <TableRow key={movement.id}>
                          <TableCell>{new Date(movement.date).toLocaleDateString()}</TableCell>
                          <TableCell>{movement.productName}</TableCell>
                          <TableCell>
                            <Badge variant={movement.type === 'receipt' ? 'default' : 'secondary'}>
                              {movement.type}
                            </Badge>
                          </TableCell>
                          <TableCell className={movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                            {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                          </TableCell>
                          <TableCell>{movement.reference}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Stock Turnover Analysis</CardTitle>
                <CardDescription>Product performance based on turnover rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Stock Value</TableHead>
                        <TableHead>Turnover Rate</TableHead>
                        <TableHead>Performance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stockTurnoverData.slice(0, 10).map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-gray-500">{product.sku}</div>
                            </div>
                          </TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>${(product.stock * product.cost).toLocaleString()}</TableCell>
                          <TableCell>{product.turnover.toFixed(2)}x</TableCell>
                          <TableCell>
                            <Badge variant={
                              product.turnover > 6 ? 'default' : 
                              product.turnover > 3 ? 'secondary' : 
                              'destructive'
                            }>
                              {product.turnover > 6 ? 'Excellent' : 
                               product.turnover > 3 ? 'Good' : 'Poor'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Low Stock Alert */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    Low Stock Alert
                  </CardTitle>
                  <CardDescription>Items below reorder level</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sku}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive">{product.stock} left</Badge>
                        <p className="text-xs text-gray-500 mt-1">Min: {product.reorderLevel}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Out of Stock Alert */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-red-500" />
                    Out of Stock
                  </CardTitle>
                  <CardDescription>Items that need immediate restocking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {outOfStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sku}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="destructive">Out of Stock</Badge>
                        <p className="text-xs text-gray-500 mt-1">Last updated: {new Date(product.lastUpdated).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;