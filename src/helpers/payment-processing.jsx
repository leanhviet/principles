import { useState } from 'react';

/**
 * 2.3 Polymorphism (Đa hình)
 * Khái niệm: Cùng một interface, nhưng hành vi khác nhau.
 * Lợi ích: Tăng tính linh hoạt và tái sử dụng code.
 */
// Base class định nghĩa interface chung
class PaymentProcessor {
  processPayment(amount) {
    throw new Error('Method must be implemented');
  }

  validatePayment(paymentData) {
    throw new Error('Method must be implemented');
  }
}

// Các implementation khác nhau
class MoMoPayment extends PaymentProcessor {
  processPayment(amount) {
    console.log(`Processing ${amount}đ via MoMo`);
    // Logic xử lý MoMo payment
    return {
      success: true,
      transactionId: 'momo_' + Date.now(),
      method: 'MoMo'
    };
  }

  validatePayment(paymentData) {
    return paymentData.phoneNumber && paymentData.phoneNumber.length === 10;
  }
}

class VNPayPayment extends PaymentProcessor {
  processPayment(amount) {
    console.log(`Processing ${amount}đ via VNPay`);
    // Logic xử lý VNPay payment
    return {
      success: true,
      transactionId: 'vnpay_' + Date.now(),
      method: 'VNPay'
    };
  }

  validatePayment(paymentData) {
    return paymentData.cardNumber && paymentData.cardNumber.length === 16;
  }
}

class CreditCardPayment extends PaymentProcessor {
  processPayment(amount) {
    console.log(`Processing ${amount}đ via Credit Card`);
    // Logic xử lý Credit Card payment
    return {
      success: true,
      transactionId: 'cc_' + Date.now(),
      method: 'Credit Card'
    };
  }

  validatePayment(paymentData) {
    return paymentData.cardNumber && 
           paymentData.expiryDate && 
           paymentData.cvv;
  }
}

// Payment Factory
class PaymentFactory {
  static createPaymentProcessor(type) {
    switch (type) {
      case 'momo':
        return new MoMoPayment();
      case 'vnpay':
        return new VNPayPayment();
      case 'credit_card':
        return new CreditCardPayment();
      default:
        throw new Error('Unsupported payment type');
    }
  }
}

// Sử dụng trong React component
const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [amount, setAmount] = useState(100000);
  const [paymentData, setPaymentData] = useState({});

  const handlePayment = () => {
    try {
      // Tạo payment processor dựa trên method được chọn
      const processor = PaymentFactory.createPaymentProcessor(paymentMethod);
      
      // Validate payment data
      if (!processor.validatePayment(paymentData)) {
        alert('Thông tin thanh toán không hợp lệ');
        return;
      }

      // Process payment - cùng method nhưng logic khác nhau
      const result = processor.processPayment(amount);
      
      if (result.success) {
        alert(`Thanh toán thành công! ID: ${result.transactionId}`);
      }
    } catch (error) {
      alert('Lỗi thanh toán: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Thanh toán: {amount.toLocaleString()}đ</h2>
      
      <select 
        value={paymentMethod} 
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="momo">MoMo</option>
        <option value="vnpay">VNPay</option>
        <option value="credit_card">Credit Card</option>
      </select>

      {/* Render different forms based on payment method */}
      {paymentMethod === 'momo' && (
        <input 
          type="tel" 
          placeholder="Số điện thoại"
          onChange={(e) => setPaymentData({phoneNumber: e.target.value})}
        />
      )}
      
      {paymentMethod === 'credit_card' && (
        <div>
          <input 
            type="text" 
            placeholder="Số thẻ"
            onChange={(e) => setPaymentData({
              ...paymentData, 
              cardNumber: e.target.value
            })}
          />
          <input 
            type="text" 
            placeholder="MM/YY"
            onChange={(e) => setPaymentData({
              ...paymentData, 
              expiryDate: e.target.value
            })}
          />
          <input 
            type="text" 
            placeholder="CVV"
            onChange={(e) => setPaymentData({
              ...paymentData, 
              cvv: e.target.value
            })}
          />
        </div>
      )}

      <button onClick={handlePayment}>
        Thanh toán
      </button>
    </div>
  );
};

export default CheckoutPage;