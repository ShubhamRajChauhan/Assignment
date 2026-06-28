export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validateUserForm = (formData) => {
  const errors = {};
  
  if (!formData.firstName || !formData.firstName.trim()) {
    errors.firstName = 'First Name is required';
  }
  
  if (!formData.lastName || !formData.lastName.trim()) {
    errors.lastName = 'Last Name is required';
  }
  
  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!formData.department) {
    errors.department = 'Department is required';
  }
  
  return errors;
};
