import { useState } from 'react';

/**
 * 2.2 Inheritance (Kế thừa)
 * Khái niệm: Tạo lớp con từ lớp cha, kế thừa các thuộc tính và phương thức của lớp cha.
 * Lợi ích: Tái sử dụng code, tăng tính tái sử dụng và tính bảo trì.
 */

// Base class cho validation
class BaseValidator {
  constructor(value) {
    this.value = value;
    this.errors = [];
  }

  isRequired(message = 'Trường này là bắt buộc') {
    if (!this.value || this.value.trim() === '') {
      this.errors.push(message);
    }
    return this;
  }

  getErrors() {
    return this.errors;
  }

  isValid() {
    return this.errors.length === 0;
  }
}

// Class con kế thừa BaseValidator
class EmailValidator extends BaseValidator {
  isEmail(message = 'Email không hợp lệ') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
      this.errors.push(message);
    }
    return this;
  }
}

class PasswordValidator extends BaseValidator {
  minLength(length, message = `Mật khẩu phải có ít nhất ${length} ký tự`) {
    if (this.value && this.value.length < length) {
      this.errors.push(message);
    }
    return this;
  }

  hasUpperCase(message = 'Mật khẩu phải có ít nhất 1 chữ hoa') {
    if (this.value && !/[A-Z]/.test(this.value)) {
      this.errors.push(message);
    }
    return this;
  }
}

// Sử dụng trong React Hook
const useFormValidation = () => {
  const validateEmail = (email) => {
    return new EmailValidator(email)
      .isRequired()
      .isEmail();
  };

  const validatePassword = (password) => {
    return new PasswordValidator(password)
      .isRequired()
      .minLength(8)
      .hasUpperCase();
  };

  return { validateEmail, validatePassword };
};

// Trong component
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { validateEmail, validatePassword } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailValidator = validateEmail(email);
    const passwordValidator = validatePassword(password);

    setErrors({
      email: emailValidator.getErrors(),
      password: passwordValidator.getErrors()
    });

    if (emailValidator.isValid() && passwordValidator.isValid()) {
      // Submit form
      console.log('Form is valid!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email" 
      />
      {errors.email?.map((error, i) => (
        <span key={i} className="error">{error}</span>
      ))}
      
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu" 
      />
      {errors.password?.map((error, i) => (
        <span key={i} className="error">{error}</span>
      ))}
      
      <button type="submit">Đăng nhập</button>
    </form>
  );
};