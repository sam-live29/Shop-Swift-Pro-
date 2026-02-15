
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { 
    id: 'mobiles', 
    name: 'Mobiles', 
    icon: '📱', 
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'fashion', 
    name: 'Fashion', 
    icon: '👕', 
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'electronics', 
    name: 'Electronics', 
    icon: '💻', 
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'home', 
    name: 'Home', 
    icon: '🏠', 
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'appliances', 
    name: 'Appliances', 
    icon: '🧊', 
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'beauty', 
    name: 'Beauty & Toys', 
    icon: '💄', 
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop' 
  },
  { 
    id: 'toys', 
    name: 'Gifts', 
    icon: '🧸', 
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=400&auto=format&fit=crop' 
  },
];

export const CATEGORY_METADATA: Record<string, {
  budgetFilters: number[];
  brands: string[];
  groups: { name: string; items: string[] }[];
}> = {
  mobiles: {
    budgetFilters: [10000, 20000, 30000, 50000],
    brands: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Realme', 'Vivo'],
    groups: [
      { name: 'Smartphones', items: ['5G Mobiles', 'Foldable Phones', 'Gaming Phones', 'Flagship Phones'] },
      { name: 'Accessories', items: ['Cases', 'Screen Guards', 'Chargers', 'Power Banks'] }
    ]
  },
  fashion: {
    budgetFilters: [500, 1000, 2000, 5000],
    brands: ['Nike', 'Puma', 'Adidas', 'Levi\'s', 'Roadster', 'Wrogn', 'Biba'],
    groups: [
      { name: 'Men', items: ['T-Shirts', 'Jeans', 'Shoes', 'Watches'] },
      { name: 'Women', items: ['Dresses', 'Tops', 'Handbags', 'Jewellery'] }
    ]
  },
  electronics: {
    budgetFilters: [5000, 10000, 20000, 50000],
    brands: ['Sony', 'Dell', 'HP', 'ASUS', 'Lenovo', 'Boat', 'JBL'],
    groups: [
      { name: 'Laptops', items: ['Gaming Laptops', 'Thin & Light', 'Workstations'] },
      { name: 'Audio', items: ['TWS Earbuds', 'Bluetooth Speakers', 'Soundbars'] }
    ]
  },
  home: {
    budgetFilters: [1000, 2000, 5000, 10000],
    brands: ['IKEA', 'Sleepwell', 'Pepperfry', 'Bombay Dyeing', 'Prestige'],
    groups: [
      { name: 'Furniture', items: ['Sofas', 'Beds', 'Dining Tables', 'Study Tables'] },
      { name: 'Kitchen', items: ['Cookware Set', 'Gas Stoves', 'Tiffin Boxes'] }
    ]
  },
  appliances: {
    budgetFilters: [5000, 10000, 20000, 30000],
    brands: ['LG', 'Whirlpool', 'Samsung', 'Haier', 'Voltas', 'Philips'],
    groups: [
      { name: 'Kitchen', items: ['Refrigerators', 'Microwaves', 'Mixers', 'Juicers'] },
      { name: 'Comfort', items: ['Air Conditioners', 'Washing Machines', 'Air Purifiers'] }
    ]
  },
  beauty: {
    budgetFilters: [200, 500, 1000, 2000],
    brands: ['Lakme', 'L\'Oreal', 'MAC', 'Mamaearth', 'The Derma Co', 'Nykaa'],
    groups: [
      { name: 'Makeup', items: ['Lipstick', 'Eyeliner', 'Foundation', 'Makeup Kits'] },
      { name: 'Skincare', items: ['Moisturizers', 'Serums', 'Sunscreen', 'Face Wash'] }
    ]
  },
  toys: {
    budgetFilters: [500, 1000, 2000, 5000],
    brands: ['LEGO', 'Mattel', 'Hasbro', 'Funskool', 'Hot Wheels', 'Barbie'],
    groups: [
      { name: 'Kids', items: ['Action Figures', 'Dolls', 'Board Games', 'Remote Control Cars'] },
      { name: 'Puzzles', items: ['3D Puzzles', 'Rubik\'s Cube', 'Jigsaw', 'Creative Sets'] }
    ]
  }
};

const CATEGORY_IMAGES: Record<string, string[]> = {
  mobiles: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1565849906461-0eaa2c662b0c?q=80&w=800&auto=format&fit=crop'
  ],
  fashion: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop'
  ],
  electronics: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop'
  ],
  home: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583847268964-b28dc2f51ec9?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop'
  ],
  appliances: [
    'https://images.unsplash.com/photo-1571175432244-9383637e6f80?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1585338107529-13afc5f0141f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop'
  ],
  beauty: [
    'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=800&auto=format&fit=crop'
  ],
  toys: [
    'https://images.unsplash.com/photo-1531653131332-9c98a514697d?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558060370-d644479cb6f7?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?q=80&w=800&auto=format&fit=crop'
  ]
};

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const brandData = {
    mobiles: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Realme', 'Vivo', 'Poco', 'Motorola'],
    fashion: ['Nike', 'Puma', 'Adidas', 'Levi\'s', 'Roadster', 'Wrogn', 'Biba', 'Libas', 'H&M'],
    electronics: ['Sony', 'Dell', 'HP', 'ASUS', 'Lenovo', 'Boat', 'JBL', 'Bose', 'Logitech'],
    home: ['IKEA', 'Sleepwell', 'Pepperfry', 'Prestige', 'Pigeon', 'Bombay Dyeing', 'Welspun'],
    appliances: ['LG', 'Whirlpool', 'Samsung', 'Haier', 'Voltas', 'Blue Star', 'Kent', 'Philips'],
    beauty: ['Lakme', 'L\'Oreal', 'MAC', 'Mamaearth', 'The Derma Co', 'Nykaa', 'Maybelline'],
    toys: ['LEGO', 'Mattel', 'Hasbro', 'Funskool', 'Hot Wheels', 'Barbie', 'Fisher-Price'],
  };

  const productSuffixes = ['Pro', 'Elite', 'Plus', 'Ultra', 'Series 7', 'Edition', 'Essential', 'Classic'];

  let idCounter = 1;

  Object.entries(brandData).forEach(([catId, brandList]) => {
    brandList.forEach((brand) => {
      const countPerBrand = 2 + Math.floor(Math.random() * 2);
      
      for (let i = 0; i < countPerBrand; i++) {
        const suffix = productSuffixes[Math.floor(Math.random() * productSuffixes.length)];
        const price = 499 + Math.floor(Math.random() * 80000);
        const discountVal = 15 + Math.floor(Math.random() * 55);
        const oldPrice = Math.floor(price / (1 - discountVal / 100));

        // Get realistic images for the category
        const categoryImages = CATEGORY_IMAGES[catId] || CATEGORY_IMAGES['electronics'];
        const mainImage = categoryImages[i % categoryImages.length];
        const additionalImages = categoryImages.filter(img => img !== mainImage).slice(0, 3);

        products.push({
          id: idCounter.toString(),
          name: `${brand} ${suffix} ${catId === 'mobiles' ? 'Smartphone' : catId.charAt(0).toUpperCase() + catId.slice(1, -1)}`,
          category: catId,
          subCategory: i === 0 ? 'Best Seller' : 'New Arrival',
          price,
          oldPrice,
          discount: `${discountVal}% OFF`,
          rating: 3.8 + (Math.random() * 1.2),
          reviewsCount: 50 + Math.floor(Math.random() * 12000),
          image: mainImage,
          images: [mainImage, ...additionalImages],
          description: `The ${brand} ${suffix} is a premium offering in the ${catId} category, providing exceptional quality and value. Designed for the modern Indian consumer, it features reliable performance and aesthetic appeal with high-grade build quality.`,
          brand,
          highlights: [
            'Premium Quality Material',
            'Advanced Technology',
            '1 Year Brand Warranty',
            'Easy Returns & Replacement',
            'Authentic Product Guarantee'
          ],
          specGroups: [
            {
              title: 'Key Features',
              specs: { 'Brand': brand, 'Color': 'Variant Specific', 'Model': suffix, 'Category': catId }
            },
            {
              title: 'Warranty',
              specs: { 'Domestic Warranty': '1 Year', 'Service Type': 'Carry-in', 'Covered in Warranty': 'Manufacturing Defects' }
            }
          ],
          isAssured: Math.random() > 0.4,
          stock: Math.floor(Math.random() * 50),
          sellerName: `${brand} Retail India`,
          sellerRating: 4.2 + (Math.random() * 0.7),
          returnPolicy: '10 Days Replacement Policy'
        });
        idCounter++;
      }
    });
  });

  return products;
};

export const PRODUCTS = generateProducts();
