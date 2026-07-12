export const DELIVERY_TYPES = {
  HOME: "Home Delivery",
  PERSON: "In-Person Delivery",
};

export const COUNTRIES = ["India"];

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
  "Andaman and Nicobar Islands",
  "Lakshadweep",
];

export const CHECKOUT_FIELDS = {
  name: {
    label: "Full Name",
    placeholder: "Enter full name",
    required: true,
    type: "text",
  },

  email: {
    label: "Email",
    placeholder: "Enter email address",
    required: true,
    type: "email",
  },

  phone: {
    label: "Phone Number",
    placeholder: "Enter phone number",
    required: true,
    type: "text",
  },

  address: {
    label: "Address",
    placeholder: "House number, street, area",
    required: true,
    type: "textarea",
  },

  country: {
    label: "Country",
    required: true,
  },

  state: {
    label: "State",
    required: true,
  },

  pincode: {
    label: "Pincode",
    placeholder: "Enter pincode",
    required: true,
    type: "text",
  },
};

export const ERROR_MESSAGES = {
  NAME_REQUIRED: "Full name is required",

  EMAIL_REQUIRED: "Email is required",

  PHONE_REQUIRED: "Phone number is required",

  ADDRESS_REQUIRED: "Address is required",

  COUNTRY_REQUIRED: "Country is required",

  STATE_REQUIRED: "State is required",

  PINCODE_REQUIRED: "Pincode is required",

  EMAIL_INVALID: "Please enter valid email address",

  PHONE_INVALID: "Please enter valid phone number",

  PINCODE_INVALID: "Please enter valid pincode",
};

export const VALIDATION_REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  PHONE: /^[6-9]\d{9}$/,

  PINCODE: /^\d{6}$/,
};
