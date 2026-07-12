import {
  ERROR_MESSAGES,
  VALIDATION_REGEX,
  DELIVERY_TYPES,
} from "./checkoutFormConstants";

export const validateCheckoutForm = (customer) => {
  const errors = {};

  // NAME

  if (!customer.name?.trim()) {
    errors.name = ERROR_MESSAGES.NAME_REQUIRED;
  }

  // EMAIL

  if (!customer.email?.trim()) {
    errors.email = ERROR_MESSAGES.EMAIL_REQUIRED;
  } else if (!VALIDATION_REGEX.EMAIL.test(customer.email)) {
    errors.email = ERROR_MESSAGES.EMAIL_INVALID;
  }

  // PHONE

  if (!customer.phone?.trim()) {
    errors.phone = ERROR_MESSAGES.PHONE_REQUIRED;
  } else if (!VALIDATION_REGEX.PHONE.test(customer.phone)) {
    errors.phone = ERROR_MESSAGES.PHONE_INVALID;
  }

  // ADDRESS

  if (!customer.address?.trim()) {
    errors.address = ERROR_MESSAGES.ADDRESS_REQUIRED;
  }

  // COUNTRY

  if (!customer.country?.trim()) {
    errors.country = ERROR_MESSAGES.COUNTRY_REQUIRED;
  }

  // STATE

  if (!customer.state?.trim()) {
    errors.state = ERROR_MESSAGES.STATE_REQUIRED;
  }

  // PINCODE

  if (customer.deliveryType === DELIVERY_TYPES.HOME) {
    if (!customer.pincode?.trim()) {
      errors.pincode = ERROR_MESSAGES.PINCODE_REQUIRED;
    } else if (!VALIDATION_REGEX.PINCODE.test(customer.pincode)) {
      errors.pincode = ERROR_MESSAGES.PINCODE_INVALID;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
