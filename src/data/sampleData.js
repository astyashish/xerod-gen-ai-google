// Sample data for the application

export const sampleProfile = {
  name: 'Priya Sharma',
  craftType: 'Handmade Jewelry',
  location: 'Jaipur, Rajasthan, India',
  language: 'Hindi, English',
  story: 'I am a third-generation jewelry artisan from Jaipur, specializing in traditional Kundan and Meenakari work. My passion lies in preserving our family heritage while creating contemporary designs that speak to modern customers.',
  photo: null, // Will be placeholder in UI
  profileComplete: 85,
};

export const sampleProducts = [
  {
    id: 1,
    title: 'Handcrafted Silver Earrings',
    description: 'Beautiful traditional earrings with intricate silver work',
    price: 1250,
    images: ['placeholder-jewelry1.jpg'],
    status: 'Published',
    tags: ['jewelry', 'silver', 'traditional'],
    marketplaces: ['Amazon', 'Etsy'],
    views: 145,
    sales: 8,
  },
  {
    id: 2,
    title: 'Kundan Necklace Set',
    description: 'Elegant Kundan necklace with matching earrings',
    price: 3500,
    images: ['placeholder-jewelry2.jpg'],
    status: 'Draft',
    tags: ['kundan', 'necklace', 'bridal'],
    marketplaces: ['Flipkart'],
    views: 89,
    sales: 3,
  },
  {
    id: 3,
    title: 'Meenakari Bangles Set',
    description: 'Colorful Meenakari bangles in traditional design',
    price: 850,
    images: ['placeholder-jewelry3.jpg'],
    status: 'Published',
    tags: ['bangles', 'meenakari', 'colorful'],
    marketplaces: ['Amazon', 'Flipkart', 'Etsy'],
    views: 234,
    sales: 15,
  },
];

export const sampleOrders = [
  {
    id: 'ORD-001',
    customerName: 'Anjali Patel',
    customerEmail: 'anjali.patel@example.com',
    customerPhone: '+91 98765 43210',
    shippingAddress: '123 MG Road, Pune, Maharashtra 411001, India',
    total: 1250,
    status: 'delivered',
    orderDate: '2023-11-15',
    deliveryDate: '2023-11-18',
    marketplace: 'Amazon',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK123456789',
    products: [
      {
        name: 'Handcrafted Silver Earrings',
        quantity: 1,
        price: 1250,
        image: '/api/placeholder/60/60'
      }
    ]
  },
  {
    id: 'ORD-002',
    customerName: 'Ravi Kumar',
    customerEmail: 'ravi.kumar@example.com',
    customerPhone: '+91 87654 32109',
    shippingAddress: '456 Brigade Road, Bangalore, Karnataka 560001, India',
    total: 850,
    status: 'shipped',
    orderDate: '2023-11-20',
    expectedDelivery: '2023-11-23',
    marketplace: 'Flipkart',
    paymentMethod: 'UPI',
    trackingNumber: 'TRK987654321',
    products: [
      {
        name: 'Meenakari Bangles Set',
        quantity: 1,
        price: 850,
        image: '/api/placeholder/60/60'
      }
    ]
  },
  {
    id: 'ORD-003',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.johnson@example.com',
    customerPhone: '+1 555-123-4567',
    shippingAddress: '789 Oak Street, New York, NY 10001, USA',
    total: 3500,
    status: 'pending',
    orderDate: '2023-11-21',
    marketplace: 'Etsy',
    paymentMethod: 'PayPal',
    products: [
      {
        name: 'Kundan Necklace Set',
        quantity: 1,
        price: 3500,
        image: '/api/placeholder/60/60'
      }
    ]
  },
  {
    id: 'ORD-004',
    customerName: 'Meera Reddy',
    customerEmail: 'meera.reddy@example.com',
    customerPhone: '+91 76543 21098',
    shippingAddress: '321 Anna Salai, Chennai, Tamil Nadu 600002, India',
    total: 2150,
    status: 'processing',
    orderDate: '2023-11-22',
    marketplace: 'Amazon',
    paymentMethod: 'Debit Card',
    products: [
      {
        name: 'Traditional Gold Plated Necklace',
        quantity: 1,
        price: 2150,
        image: '/api/placeholder/60/60'
      }
    ]
  },
  {
    id: 'ORD-005',
    customerName: 'David Wilson',
    customerEmail: 'david.wilson@example.com',
    customerPhone: '+44 20 7946 0958',
    shippingAddress: '15 Baker Street, London, W1U 3AA, UK',
    total: 1680,
    status: 'delivered',
    orderDate: '2023-11-18',
    deliveryDate: '2023-11-22',
    marketplace: 'Etsy',
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK456789123',
    products: [
      {
        name: 'Handwoven Silk Scarf',
        quantity: 2,
        price: 840,
        image: '/api/placeholder/60/60'
      }
    ]
  },
];

export const sampleAnalytics = {
  totalEarnings: 125750,
  monthlyEarnings: 8450,
  totalOrders: 156,
  monthlyOrders: 23,
  totalProducts: 12,
  activeProducts: 9,
  // Additional properties for Analytics component
  totalRevenue: 125750,
  totalViews: 15420,
  conversionRate: 3.2,
  salesData: [
    { month: 'Jun', sales: 4200 },
    { month: 'Jul', sales: 5800 },
    { month: 'Aug', sales: 7200 },
    { month: 'Sep', sales: 6100 },
    { month: 'Oct', sales: 8900 },
    { month: 'Nov', sales: 8450 },
  ],
  viewsData: [
    { month: 'Jun', views: 1250 },
    { month: 'Jul', views: 1680 },
    { month: 'Aug', views: 2100 },
    { month: 'Sep', views: 1890 },
    { month: 'Oct', views: 2450 },
    { month: 'Nov', views: 2680 },
  ],
  // Revenue data for area chart
  revenueData: [
    { date: 'Jun', revenue: 4200 },
    { date: 'Jul', revenue: 5800 },
    { date: 'Aug', revenue: 7200 },
    { date: 'Sep', revenue: 6100 },
    { date: 'Oct', revenue: 8900 },
    { date: 'Nov', revenue: 8450 },
  ],
  // Orders data for bar chart
  ordersData: [
    { date: 'Jun', orders: 12 },
    { date: 'Jul', orders: 18 },
    { date: 'Aug', orders: 25 },
    { date: 'Sep', orders: 20 },
    { date: 'Oct', orders: 32 },
    { date: 'Nov', orders: 28 },
  ],
  // Category performance data
  categoryData: [
    { category: 'Jewelry', sales: 45 },
    { category: 'Accessories', sales: 32 },
    { category: 'Decor', sales: 28 },
    { category: 'Clothing', sales: 22 },
    { category: 'Art', sales: 18 },
  ],
  // Customer demographics
  customerDemographics: [
    { name: '18-25', value: 25 },
    { name: '26-35', value: 35 },
    { name: '36-45', value: 25 },
    { name: '46-55', value: 10 },
    { name: '55+', value: 5 },
  ],
  // Customer acquisition data
  customerAcquisition: [
    { month: 'Jun', newCustomers: 45, returningCustomers: 12 },
    { month: 'Jul', newCustomers: 52, returningCustomers: 18 },
    { month: 'Aug', newCustomers: 68, returningCustomers: 25 },
    { month: 'Sep', newCustomers: 58, returningCustomers: 32 },
    { month: 'Oct', newCustomers: 75, returningCustomers: 41 },
    { month: 'Nov', newCustomers: 82, returningCustomers: 48 },
  ],
  // Top customers data
  topCustomers: [
    { name: 'Priya Sharma', orders: 12, totalSpent: 25400, joinDate: 'Jan 2023' },
    { name: 'Rohit Gupta', orders: 8, totalSpent: 18600, joinDate: 'Mar 2023' },
    { name: 'Anita Singh', orders: 6, totalSpent: 14200, joinDate: 'Feb 2023' },
    { name: 'Vikram Patel', orders: 5, totalSpent: 12800, joinDate: 'Apr 2023' },
    { name: 'Meera Reddy', orders: 4, totalSpent: 9600, joinDate: 'May 2023' },
  ],
  engagementStats: {
    productViews: 2680,
    storyPlays: 145,
    threeDViews: 89,
    marketplaceClicks: 234,
  },
};

export const sampleFAQ = [
  {
    question: 'How do I upload my first product?',
    answer: 'Navigate to the "Add Product" section from your dashboard. Follow the step-by-step guide to upload images, add product details, and publish to your chosen marketplaces.',
  },
  {
    question: 'Which marketplaces can I sell on?',
    answer: 'Currently, you can publish your products on Amazon, Flipkart, Etsy, and sell directly through our platform. Each marketplace has different requirements and fee structures.',
  },
  {
    question: 'How does the AI agent help me?',
    answer: 'Our AI agent assists with product descriptions, helps optimize your listings, suggests pricing strategies, and provides personalized recommendations to grow your business.',
  },
  {
    question: 'When do I receive payments?',
    answer: 'Payments are processed weekly. You can track your earnings in the Earnings section and request withdrawals once you reach the minimum threshold.',
  },
  {
    question: 'How can I improve my product visibility?',
    answer: 'Use high-quality images, detailed descriptions, relevant tags, and engage with our community. The AI agent also provides specific suggestions for each product.',
  },
];

export const marketplaces = [
  {
    id: 'amazon',
    name: 'Amazon',
    description: 'Reach millions of customers worldwide',
    commission: '15%',
    icon: '🛒',
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    description: 'India\'s leading e-commerce platform',
    commission: '12%',
    icon: '🛍️',
  },
  {
    id: 'etsy',
    name: 'Etsy',
    description: 'Global marketplace for handmade items',
    commission: '6.5%',
    icon: '🎨',
  },
  {
    id: 'direct',
    name: 'Direct Sales',
    description: 'Sell directly through ArtisanAI',
    commission: '5%',
    icon: '💎',
  },
];