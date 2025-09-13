export const categories = [
  {
    id: '1',
    name: 'Electronics',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 25,
    description: 'Latest gadgets and tech',
      itemCount: '200+ items'
  },
  {
    id: '2',
    name: 'Fashion',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 18,
    description: 'Trendy clothing & accessories',
      itemCount: '150+ items'
  },
  {
    id: '3',
    name: 'Home & Garden',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 12,
    description: 'Trendy clothing & accessories',
      itemCount: '150+ items'
  },
  {
    id: '4',
    name: 'Sports',
    image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 15,
    description: 'Trendy clothing & accessories',
      itemCount: '150+ items'
  },
  {
    id: '5',
    name: 'Books',
    image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 8,
    description: 'Trendy clothing & accessories',
      itemCount: '150+ items'
  },
  {
    id: '6',
    name: 'Beauty',
    image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=400',
    productCount: 20,
    description: 'Trendy clothing & accessories',
      itemCount: '150+ items'
  }
];

export const reviews = [
  {
    id: '1',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent product! Highly recommended.',
    date: '2024-01-15'
  },
  {
    id: '2',
    userName: 'Mike Chen',
    rating: 4,
    comment: 'Good quality, fast shipping.',
    date: '2024-01-10'
  },
  {
    id: '3',
    userName: 'Emma Davis',
    rating: 5,
    comment: 'Amazing quality and great customer service!',
    date: '2024-01-08'
  }
];

export const products = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    originalPrice: 149.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: '1',
    description: 'Premium wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals.',
    specifications: {
      'Battery Life': '30 hours',
      'Wireless Range': '30 feet',
      'Weight': '250g',
      'Charging Time': '2 hours'
    },
    reviews: reviews,
    rating: 4.8,
    isHotSale: true,
    stock: 15
  },
  {
    id: '2',
    name: 'Smartphone 128GB',
    price: 599.99,
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: '1',
    description: 'Latest smartphone with advanced camera system and lightning-fast performance.',
    specifications: {
      'Storage': '128GB',
      'RAM': '8GB',
      'Display': '6.1 inch OLED',
      'Battery': '4000mAh'
    },
    reviews: reviews,
    rating: 4.6,
    isNew: true,
    stock: 0
  },
  {
    id: '3',
    name: 'Designer Sneakers',
    price: 129.99,
    originalPrice: 179.99,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: '2',
    description: 'Comfortable and stylish sneakers perfect for everyday wear.',
    specifications: {
      'Material': 'Premium Leather',
      'Sole': 'Rubber',
      'Sizes': '6-12',
      'Colors': 'Multiple'
    },
    reviews: reviews,
    rating: 4.7,
    isHotSale: true,
    stock: 12
  },
  {
    id: '4',
    name: 'Coffee Maker Deluxe',
    price: 89.99,
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: '3',
    description: 'Professional-grade coffee maker for the perfect brew every time.',
    specifications: {
      'Capacity': '12 cups',
      'Type': 'Drip Coffee',
      'Material': 'Stainless Steel',
      'Features': 'Programmable Timer'
    },
    reviews: reviews,
    rating: 4.5,
    isNew: true,
    stock: 20
  },
  {
    id: '5',
    name: 'Yoga Mat Premium',
    price: 39.99,
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: '4',
    description: 'High-quality yoga mat with superior grip and comfort.',
    specifications: {
      'Thickness': '6mm',
      'Material': 'TPE',
      'Size': '183cm x 61cm',
      'Weight': '1.2kg'
    },
    reviews: reviews,
    rating: 4.9,
    stock: 25
  },
  {
    id: '6',
    name: 'Bestselling Novel',
    price: 14.99,
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: '5',
    description: 'Award-winning novel that captivates readers from the first page.',
    specifications: {
      'Pages': '320',
      'Publisher': 'Premium Books',
      'Language': 'English',
      'Format': 'Paperback'
    },
    reviews: reviews,
    rating: 4.4,
    stock: 30
  },
  {
    id: '7',
    name: 'Luxury Skincare Set',
    price: 79.99,
    originalPrice: 119.99,
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: '6',
    description: 'Complete skincare routine with premium natural ingredients.',
    specifications: {
      'Items': '5 products',
      'Skin Type': 'All skin types',
      'Ingredients': 'Natural & Organic',
      'Size': 'Full size products'
    },
    reviews: reviews,
    rating: 4.8,
    isHotSale: true,
    stock: 18
  },
  {
    id: '8',
    name: 'Gaming Laptop',
    price: 1299.99,
    image: 'https://images.pexels.com/photos/3178767/pexels-photo-3178767.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/3178767/pexels-photo-3178767.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: '1',
    description: 'High-performance gaming laptop with advanced graphics and fast processor.',
    specifications: {
      'Processor': 'Intel i7',
      'RAM': '16GB',
      'Storage': '512GB SSD',
      'Graphics': 'RTX 4060'
    },
    reviews: reviews,
    rating: 4.7,
    isNew: true,
    stock: 5
  },
  {
    id: '9',
    name: 'Smartwatch Series 6',
    price: 249.99,
    image: 'https://images.pexels.com/photos/4506100/pexels-photo-4506100.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/4506100/pexels-photo-4506100.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: '1',
    description: 'Stylish smartwatch with fitness tracking and customizable watch faces.',
    specifications: {
      'Display': '1.5 inch AMOLED',
      'Battery Life': '18 hours',
      'Water Resistance': '50m',
      'Compatibility': 'iOS & Android'
    },
    reviews: reviews,
    rating: 4.5,
    stock: 10
  },
  {
    id: '10',
    name: 'Portable Bluetooth Speaker',
    price: 59.99,
    image: 'https://images.pexels.com/photos/374720/pexels-photo-374720.jpeg?auto=compress&cs=tinysrgb&w=500',
    images: [
      'https://images.pexels.com/photos/374720/pexels-photo-374720.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    category: '1',
    description: 'Compact and powerful Bluetooth speaker with deep bass and clear sound.',
    specifications: {
      'Battery Life': '12 hours',
      'Water Resistance': 'IPX7',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '300g'
    },
    reviews: reviews,
    rating: 4.6,
    isHotSale: true,
    stock: 20
  }

];

export const testimonials = [
  {
    id: '1',
    name: 'Jessica Wilson',
    rating: 5,
    comment: 'Amazing shopping experience! Fast shipping and excellent customer service.',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '2',
    name: 'David Rodriguez',
    rating: 5,
    comment: 'Great quality products at competitive prices. Highly recommend!',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '3',
    name: 'Lisa Thompson',
    rating: 5,
    comment: 'Love the variety of products and the user-friendly website. Will shop again!',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '4',
    name: 'Michael Brown',
    rating: 5,
    comment: 'Fantastic service and fast delivery. The products exceeded my expectations!',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
  },
  {
    id: '5',
    name: 'Emily Davis',
    rating: 5,
    comment: 'The best online shopping experience I have ever had. Highly satisfied!',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];