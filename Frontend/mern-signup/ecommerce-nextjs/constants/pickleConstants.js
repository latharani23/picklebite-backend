export const PICKLES = [
  {
    id: "Mango Pickle",
    name: "Mango Pickle",
    images: {
      "200g": "/assets/images/pickle200g/mango.webp",
      "400g": "/assets/images/pickle500g/mango.webp",
      "600g": "/assets/images/pickle1kg/mango.webp",
    },
    prices: {
      "200g": 180,
      "400g": 360,
      "600g": 540,
    },
  },

  {
    id: "Garlic Pickle",
    name: "Garlic Pickle",
    images: {
      "200g": "/assets/images/pickle200g/garlic.webp",
      "400g": "/assets/images/pickle500g/garlic.webp",
      "600g": "/assets/images/pickle1kg/garlic.webp",
    },
    prices: {
      "200g": 185,
      "400g": 370,
      "600g": 550,
    },
  },
  {
    id: "Lemon Pickle",
    name: "Lemon Pickle",
    images: {
      "200g": "/assets/images/pickle200g/lemon.webp",
      "400g": "/assets/images/pickle500g/lemon.webp",
      "600g": "/assets/images/pickle1kg/lemon.webp",
    },
    prices: {
      "200g": 170,
      "400g": 340,
      "600g": 510,
    },
  },
  {
    id: "Mixed Veg Pickle",
    name: "Mixed Veg Pickle",
    images: {
      "200g": "/assets/images/pickle200g/mixveg.webp",
      "400g": "/assets/images/pickle500g/mixveg.webp",
      "600g": "/assets/images/pickle1kg/mixveg.webp",
    },
    prices: {
      "200g": 170,
      "400g": 340,
      "600g": 510,
    },
  },
  {
    id: "Gajanimbe Pickle",
    name: "Gajanimbe Pickle",
    images: {
      "200g": "/assets/images/pickle200g/gajanimbe.webp",
      "400g": "/assets/images/pickle500g/gajanimbe.webp",
      "600g": "/assets/images/pickle1kg/gajanimbe.webp",
    },
    prices: {
      "200g": 170,
      "400g": 340,
      "600g": 510,
    },
  },
  {
    id: "Hirelikayi Pickle",
    name: "Hirelikayi Pickle",
    images: {
      "200g": "/assets/images/pickle200g/hirelikayi.webp",
      "400g": "/assets/images/pickle500g/hirelikayi.webp",
      "600g": "/assets/images/pickle1kg/hirelikayi.webp",
    },
    prices: {
      "200g": 180,
      "400g": 340,
      "600g": 510,
    },
  },

  {
    id: "Cucumber Pickle",
    name: "Cucumber Pickle",
    images: {
      "200g": "/assets/images/pickle200g/cucumber.webp",
      "400g": "/assets/images/pickle500g/cucumber.webp",
      "600g": "/assets/images/pickle1kg/cucumber.webp",
    },
    prices: {
      "200g": 170,
      "400g": 320,
      "600g": 510,
    },
  },
  {
    id: "Bitter Gourd Pickle",
    name: "Bitter Gourd Pickle",
    images: {
      "200g": "/assets/images/pickle200g/bittergourd.webp",
      "400g": "/assets/images/pickle500g/bittergourd.webp",
      "600g": "/assets/images/pickle1kg/bittergourd.webp",
    },
    prices: {
      "200g": 180,
      "400g": 360,
      "600g": 540,
    },
  },
  {
    id: "Green Chilli Pickle",
    name: "Green Chilli Pickle",
    images: {
      "200g": "/assets/images/pickle200g/greenchilli.webp",
      "400g": "/assets/images/pickle500g/greenchilli.webp",
      "600g": "/assets/images/pickle1kg/greenchilli.webp",
    },
    prices: {
      "200g": 160,
      "400g": 320,
      "600g": 480,
    },
  },

  {
    id: "Gongura Pickle",
    name: "Gongura Pickle",
    images: {
      "200g": "/assets/images/pickle200g/gongura.webp",
      "400g": "/assets/images/pickle500g/gongura.webp",
      "600g": "/assets/images/pickle1kg/gongura.webp",
    },
    prices: {
      "200g": 180,
      "400g": 360,
      "600g": 540,
    },
  },
];

/* ================= BRAND ================= */

export const BRAND = {
  name: "Picklebite",
  logo: "/assets/images/logo2.webp",
};

/* ================= NAVIGATION TEXT ================= */

export const NAV_TEXT = {
  searchPlaceholder: "Search pickles...",
  notificationsTitle: "Notifications",
  logout: "Logout",
  addToCart: "Add to Cart",
  addToWishlist: "Add to Wishlist",
  selectWeight: "Select Weight",
};

/* ================= NOTIFICATIONS ================= */

export const DEFAULT_NOTIFICATIONS = [
  {
    id: 1,
    message: "🔥 Bitter Gourd Pickle launched!",
    read: false,
  },
  {
    id: 2,
    message: "🌶 Green Chilli Pickle now available!",
    read: false,
  },
  {
    id: 3,
    message: "🎉 10% OFF on orders above ₹1000",
    read: false,
  },
];

/* ================= ABOUT ================= */

export const ABOUT_US = {
  title: "About Picklebite",
  tagline: "Homemade • Pure • Traditional",

  description:
    "Picklebite brings you authentic homemade pickles prepared with love, care, and traditional recipes passed down through generations.",

  highlights: [
    { id: 1, icon: "🏡", text: "100% Homemade" },
    { id: 2, icon: "🚫", text: "No Preservatives" },
    { id: 3, icon: "🌿", text: "No Artificial Oil" },
    { id: 4, icon: "👵", text: "Grandma’s Recipe" },
    { id: 5, icon: "❤️", text: "Prepared with Love" },
  ],

  mission:
    "Deliver healthy, tasty traditional pickles while preserving Indian culinary heritage.",

  vision: "Become India’s most trusted homemade pickle brand.",

  contact: {
    phone: "+91-9945190038",
    email: "support@picklebite.com",
    address: "Bangalore, Karnataka, India",
  },
};
