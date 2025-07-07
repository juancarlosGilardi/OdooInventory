// Mock data for inventory management system

export const mockProducts = [
  {
    id: '1',
    sku: 'LAPTOP-001',
    name: 'Dell Latitude 5520',
    description: 'Business laptop with Intel Core i7 processor',
    category: 'Electronics',
    subcategory: 'Computers',
    price: 1299.99,
    cost: 899.99,
    stock: 45,
    reorderLevel: 10,
    maxStock: 100,
    location: 'WH-A-001',
    supplier: 'Dell Inc.',
    barcode: '123456789012',
    status: 'active',
    lastUpdated: '2024-01-15T10:30:00Z',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop'
  },
  {
    id: '2',
    sku: 'MOUSE-002',
    name: 'Logitech MX Master 3',
    description: 'Wireless mouse with precision tracking',
    category: 'Electronics',
    subcategory: 'Accessories',
    price: 99.99,
    cost: 59.99,
    stock: 120,
    reorderLevel: 25,
    maxStock: 200,
    location: 'WH-A-002',
    supplier: 'Logitech',
    barcode: '123456789013',
    status: 'active',
    lastUpdated: '2024-01-14T14:20:00Z',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop'
  },
  {
    id: '3',
    sku: 'CHAIR-003',
    name: 'Ergonomic Office Chair',
    description: 'Height adjustable chair with lumbar support',
    category: 'Furniture',
    subcategory: 'Office Furniture',
    price: 399.99,
    cost: 199.99,
    stock: 8,
    reorderLevel: 15,
    maxStock: 50,
    location: 'WH-B-001',
    supplier: 'Herman Miller',
    barcode: '123456789014',
    status: 'low_stock',
    lastUpdated: '2024-01-13T09:15:00Z',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'
  },
  {
    id: '4',
    sku: 'DESK-004',
    name: 'Standing Desk Electric',
    description: 'Height adjustable standing desk with memory presets',
    category: 'Furniture',
    subcategory: 'Office Furniture',
    price: 899.99,
    cost: 599.99,
    stock: 0,
    reorderLevel: 5,
    maxStock: 30,
    location: 'WH-B-002',
    supplier: 'Uplift Desk',
    barcode: '123456789015',
    status: 'out_of_stock',
    lastUpdated: '2024-01-12T16:45:00Z',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=200&fit=crop'
  },
  {
    id: '5',
    sku: 'PHONE-005',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with titanium design',
    category: 'Electronics',
    subcategory: 'Mobile Phones',
    price: 1199.99,
    cost: 799.99,
    stock: 25,
    reorderLevel: 10,
    maxStock: 100,
    location: 'WH-A-003',
    supplier: 'Apple Inc.',
    barcode: '123456789016',
    status: 'active',
    lastUpdated: '2024-01-16T11:20:00Z',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=200&fit=crop'
  }
];

export const mockStockMovements = [
  {
    id: '1',
    productId: '1',
    productName: 'Dell Latitude 5520',
    type: 'receipt',
    quantity: 20,
    location: 'WH-A-001',
    reference: 'PO-001',
    date: '2024-01-15T10:30:00Z',
    user: 'John Doe',
    notes: 'Purchase order delivery'
  },
  {
    id: '2',
    productId: '2',
    productName: 'Logitech MX Master 3',
    type: 'delivery',
    quantity: -5,
    location: 'WH-A-002',
    reference: 'SO-001',
    date: '2024-01-14T14:20:00Z',
    user: 'Jane Smith',
    notes: 'Customer order fulfillment'
  },
  {
    id: '3',
    productId: '3',
    productName: 'Ergonomic Office Chair',
    type: 'adjustment',
    quantity: -2,
    location: 'WH-B-001',
    reference: 'ADJ-001',
    date: '2024-01-13T09:15:00Z',
    user: 'Mike Johnson',
    notes: 'Damaged items removed'
  },
  {
    id: '4',
    productId: '4',
    productName: 'Standing Desk Electric',
    type: 'delivery',
    quantity: -3,
    location: 'WH-B-002',
    reference: 'SO-002',
    date: '2024-01-12T16:45:00Z',
    user: 'Sarah Wilson',
    notes: 'Bulk order delivery'
  },
  {
    id: '5',
    productId: '5',
    productName: 'iPhone 15 Pro',
    type: 'receipt',
    quantity: 15,
    location: 'WH-A-003',
    reference: 'PO-002',
    date: '2024-01-16T11:20:00Z',
    user: 'David Brown',
    notes: 'Weekly stock replenishment'
  }
];

export const mockLocations = [
  {
    id: '1',
    code: 'WH-A-001',
    name: 'Warehouse A - Section 1',
    type: 'internal',
    capacity: 1000,
    currentItems: 45
  },
  {
    id: '2',
    code: 'WH-A-002',
    name: 'Warehouse A - Section 2',
    type: 'internal',
    capacity: 500,
    currentItems: 120
  },
  {
    id: '3',
    code: 'WH-B-001',
    name: 'Warehouse B - Section 1',
    type: 'internal',
    capacity: 300,
    currentItems: 8
  },
  {
    id: '4',
    code: 'WH-B-002',
    name: 'Warehouse B - Section 2',
    type: 'internal',
    capacity: 200,
    currentItems: 0
  }
];

export const mockCategories = [
  {
    id: '1',
    name: 'Electronics',
    subcategories: ['Computers', 'Accessories', 'Mobile Phones']
  },
  {
    id: '2',
    name: 'Furniture',
    subcategories: ['Office Furniture', 'Storage']
  },
  {
    id: '3',
    name: 'Supplies',
    subcategories: ['Office Supplies', 'Cleaning Supplies']
  }
];

export const mockSuppliers = [
  {
    id: '1',
    name: 'Dell Inc.',
    email: 'orders@dell.com',
    phone: '+1-800-DELL-SUP',
    address: 'One Dell Way, Round Rock, TX 78682'
  },
  {
    id: '2',
    name: 'Logitech',
    email: 'b2b@logitech.com',
    phone: '+1-646-454-3200',
    address: 'Logitech International S.A., Switzerland'
  },
  {
    id: '3',
    name: 'Herman Miller',
    email: 'orders@hermanmiller.com',
    phone: '+1-616-654-3000',
    address: '855 E Main Ave, Zeeland, MI 49464'
  }
];

// Helper functions
export const getProductById = (id) => {
  return mockProducts.find(product => product.id === id);
};

export const getStockMovementsByProduct = (productId) => {
  return mockStockMovements.filter(movement => movement.productId === productId);
};

export const getTotalStockValue = () => {
  return mockProducts.reduce((total, product) => total + (product.stock * product.cost), 0);
};

export const getLowStockProducts = () => {
  return mockProducts.filter(product => product.stock <= product.reorderLevel);
};

export const getOutOfStockProducts = () => {
  return mockProducts.filter(product => product.stock === 0);
};

export const getStockByCategory = () => {
  const categoryStats = {};
  mockProducts.forEach(product => {
    if (!categoryStats[product.category]) {
      categoryStats[product.category] = {
        totalItems: 0,
        totalValue: 0,
        productCount: 0
      };
    }
    categoryStats[product.category].totalItems += product.stock;
    categoryStats[product.category].totalValue += product.stock * product.cost;
    categoryStats[product.category].productCount += 1;
  });
  return categoryStats;
};