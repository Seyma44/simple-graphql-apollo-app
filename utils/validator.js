// validator.js
export const validateRegisterInput = (username, email, password, confirmPassword) => {
    const errors = {};
  
    // Username validation
    if (username.trim() === "") {
      errors.username = "Username is required";
    }
  
    // Email validation
    if (email.trim() === "") {
      errors.email = "Email is required";
    } else {
      const regEx = /^[a-zA-Z0-9]+@[^\s@]+\.[^\s@]+$/;
      if (!regEx.test(email)) {
        errors.email = "Invalid email address";
      }
    }
  
    // Password validation
    if (password.trim() === "") {
      errors.password = "Password is required";
    }
  
    // Confirm password validation
    if (confirmPassword.trim() === "") {
      errors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match";
    }
  
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };
  
  export const validateLoginInput = ( email, password) => {
    const errors = {};
  
    // Email validation
    if (email.trim() === "") {
      errors.email = "Email is required";
    } else {
      const regEx = /^[a-zA-Z0-9]+@[^\s@]+\.[^\s@]+$/;
      if (!regEx.test(email)) {
        errors.email = "Invalid email address";
      }
    }
  
    // Password validation
    if (password.trim() === "") {
      errors.password = "Password is required";
    }
  
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };