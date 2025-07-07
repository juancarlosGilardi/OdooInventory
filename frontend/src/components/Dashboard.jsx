import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Warehouse,
  ShoppingCart
} from 'lucide-react';
import { 
  mockProducts, 
  getTotalStockValue, 
  getLowStockProducts, 
  getOutOfStockProducts,
  getStockByCategory,
  mockStockMovements
} from '../mock/inventoryData';

const Dashboard = () => {
  const totalProducts = mockProducts.length;
  const totalStockValue = getTotalStockValue();
  const lowStockProducts = getLowStockProducts();
  const outOfStockProducts = getOutOfStockProducts();
  const categoryStats = getStockByCategory();
  const recentMovements = mockStockMovements.slice(0, 5);

  const StatCard = ({ title, value, description, icon: Icon, trend, trendValue, color = "blue" }) => (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`w-4 h-4 text-${color}-600`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          {trend && (
            <>
              {trend === 'up' ? (
                <ArrowUpRight className="w-3 h-3 text-green-500" />
              ) : (
                <ArrowDownRight className="w-3 h-3 text-red-500" />
              )}
              <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                {trendValue}
              </span>
            </>
          )}
          <span>{description}</span>
        </div>
      </CardContent>
    </Card>
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor your inventory performance and stock levels</p>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Products"
            value={totalProducts}
            description="active items"
            icon={Package}
            trend="up"
            trendValue="12% vs last month"
            color="blue"
          />
          <StatCard
            title="Total Stock Value"
            value={`$${totalStockValue.toLocaleString()}`}
            description="current inventory value"
            icon={DollarSign}
            trend="up"
            trendValue="8% vs last month"
            color="green"
          />
          <StatCard
            title="Low Stock Items"
            value={lowStockProducts.length}
            description="need reordering"
            icon={AlertTriangle}
            trend="down"
            trendValue="5 items resolved"
            color="orange"
          />
          <StatCard
            title="Out of Stock"
            value={outOfStockProducts.length}
            description="items unavailable"
            icon={ShoppingCart}
            trend="down"
            trendValue="2 items restocked"
            color="red"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Low Stock Alert */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Stock Alerts
              </CardTitle>
              <CardDescription>Items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sku}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive" className="text-xs">
                      {product.stock} left
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">Min: {product.reorderLevel}</p>
                  </div>
                </div>
              ))}
              {outOfStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sku}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive" className="text-xs">
                      Out of Stock
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Category Overview */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warehouse className="w-5 h-5 text-blue-500" />
                Stock by Category
              </CardTitle>
              <CardDescription>Inventory distribution across categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(categoryStats).map(([category, stats]) => (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{category}</span>
                    <span className="text-gray-500">{stats.totalItems} items</span>
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

          {/* Recent Movements */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Recent Movements
              </CardTitle>
              <CardDescription>Latest stock transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMovements.map((movement) => (
                <div key={movement.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {getMovementIcon(movement.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{movement.productName}</p>
                    <p className="text-xs text-gray-500">{movement.reference}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      movement.quantity > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(movement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;