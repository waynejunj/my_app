import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Makepayment = () => {
    // Extract product data exactly as passed from Getproducts
    const { state } = useLocation();
    const product = state?.product; // Matches the Link state from Getproducts
    const navigate = useNavigate();

    // State management
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [paymentInitiated, setPaymentInitiated] = useState(false);

    // Redirect if coming directly without product data
    if (!product) {
        navigate('/'); // Redirect to home or products page
        return null;
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        
        // Validate phone (Kenyan format)
        if (!phone.match(/^(07|01|2547|2541)\d{7,8}$/)) {
            setMessage({ text: "Enter a valid Safaricom/Airtel number (07... or 2547...)", type: "error" });
            return;
        }

        setIsLoading(true);
        setMessage({ text: "Initiating M-Pesa payment...", type: "info" });

        try {
            // Format phone to 254...
            const formattedPhone = phone.startsWith('0') ? `254${phone.substring(1)}` : phone;

            const paymentData = {
                phone: formattedPhone,
                amount: product.product_cost,
                product_id: product.product_id, // Using same ID from Getproducts
                product_name: product.product_name // Additional info for backend
            };

            const response = await axios.post(
                "https://modcom2.pythonanywhere.com/api/mpesa_payment",
                paymentData
            );

            if (response.data.success) {
                setMessage({ 
                    text: "Enter your M-Pesa PIN when prompted", 
                    type: "success" 
                });
                setPaymentInitiated(true);
            } else {
                throw new Error(response.data.message || "Payment failed");
            }
        } catch (error) {
            setMessage({ 
                text: error.response?.data?.message || "Payment processing failed", 
                type: "error" 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {/* Product Card - Matches Getproducts styling */}
                    <div className="card shadow mb-4">
                        <img 
                            src={`https://modcom2.pythonanywhere.com/static/images/${product.product_photo}`}
                            className="card-img-top p-3"
                            alt={product.product_name}
                            style={{ maxHeight: '300px', objectFit: 'contain' }}
                        />
                        <div className="card-body">
                            <h3 className="card-title">{product.product_name}</h3>
                            <p className="text-muted">{product.product_description}</p>
                            <h4 className="text-warning">KES {product.product_cost}</h4>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="text-success mb-4">Complete Payment</h2>
                            
                            {message.text && (
                                <div className={`alert alert-${message.type}`}>
                                    {message.text}
                                </div>
                            )}

                            {!paymentInitiated ? (
                                <form onSubmit={handlePayment}>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            M-Pesa Number
                                        </label>
                                        <input 
                                            type="tel" 
                                            className="form-control form-control-lg"
                                            placeholder="e.g. 0712345678"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                            required
                                        />
                                    </div>
                                    
                                    <button 
                                        className="btn btn-success w-100 py-2"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                        ) : null}
                                        Pay KES {product.product_cost}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center py-3">
                                    <div className="spinner-border text-success mb-3"></div>
                                    <h5>Check your phone to complete payment</h5>
                                    <button 
                                        className="btn btn-outline-dark mt-3"
                                        onClick={() => navigate('/')}
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Makepayment;