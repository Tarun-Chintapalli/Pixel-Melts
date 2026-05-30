import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, X, Check, CheckCircle2, Search, Trash2, ArrowRight } from 'lucide-react';

const BRAND_ORANGE = '#f47b20';
const FREE_DELIVERY_THRESHOLD = 499;

// Mock database to simulate Firebase/Excel saving for this preview
const DB = {
  saveOrder: (order) => {
    const existing = JSON.parse(localStorage.getItem('pm_orders') || '[]');
    existing.push(order);
    localStorage.setItem('pm_orders', JSON.stringify(existing));
  },
  getOrder: (id) => {
    const existing = JSON.parse(localStorage.getItem('pm_orders') || '[]');
    return existing.find(o => o.orderId === id);
  }
};

const PRODUCTS = [
  {
    id: 'p1',
    name: 'Border coolie',
    desc: 'High-detail multicolor replica of a cute dog printed in durable PLA.',
    price: 199,
    personalized: false,
    image: 'dog.jpeg'
  },
  {
    id: 'p2',
    name: 'SPOT Robot',
    desc: 'Snap-fit replica of SPOT robot dog with functional joints',
    price: 299,
    personalized: false,
    image: 'robot.jpeg'
  },
  {
    id: 'p3',
    name: 'Friendly Slug',
    desc: 'This friendly slug fidget never gets boring',
    price: 149,
    personalized: false,
    image: 'slug.jpeg'
  },
  {
    id: 'p3',
    name: 'Iron Man',
    desc: 'I think we don\'t need a description for this superhero',
    price: 399,
    personalized: true,
    image: 'ironman.jpeg'
  }
];

const InteractiveBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-[#fdfdfd] pointer-events-none">
    {/* Tech Dot Grid */}
    <div className="absolute inset-0 opacity-[0.3]" style={{
      backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)',
      backgroundSize: '24px 24px'
    }}></div>
    {/* Moving Ambient Orbs */}
    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-300/20 blur-[100px] animate-[float-slow_15s_infinite_alternate] mix-blend-multiply"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gray-300/30 blur-[120px] animate-[float-slow_20s_infinite_alternate_reverse] mix-blend-multiply"></div>
    <div className="absolute top-[30%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-[#f47b20]/10 blur-[80px] animate-[float-slow_12s_infinite_alternate] mix-blend-multiply"></div>
  </div>
);

const Header = ({ cartItemCount, onOpenCart, onOpenTrack }) => (
  <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 cursor-pointer">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center p-1">
          <img src="PIXEL Melts-2.png" alt="PIXEL Melts" className="w-full h-full object-contain" />
        </div>
        <span className="font-extrabold text-xl tracking-tight hidden sm:block text-gray-800">
          PIXEL<span style={{ color: BRAND_ORANGE }}>Melts</span>
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <button onClick={onOpenTrack} className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2">
          <Search size={18} />
          <span className="hidden sm:inline">Track Order</span>
        </button>
        
        <button 
          onClick={(e) => { 
            e.preventDefault();
            e.stopPropagation();
            onOpenCart(); 
          }} 
          className="relative p-3 rounded-full bg-gray-50 text-gray-700 hover:bg-orange-50 hover:text-[#f47b20] transition-all border border-gray-100 hover:border-orange-200 group"
        >
          <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#f47b20] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </div>
  </header>
);

const ProductCard = ({ product, cartQuantity, onAddToCart, onUpdateQuantity }) => {
  const [isAdded, setIsAdded] = useState(false);
  
  const handleAdd = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col relative z-10">
      <div className="relative h-64 bg-transparent p-4 flex items-center justify-center overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow bg-white/50 border-t border-gray-50">
        {/* Fixed Personalizable Tag */}
        {product.personalized && (
          <div className="mb-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-1 rounded-md w-max border border-orange-100">
            <CheckCircle2 size={12} /> Personalizable
          </div>
        )}
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 flex-grow leading-relaxed">{product.desc}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-2xl font-black text-gray-900">₹{product.price}</span>
          
          {cartQuantity > 0 ? (
            <div className="flex items-center bg-gray-900 text-white rounded-xl overflow-hidden shadow-lg shadow-orange-500/10 h-[46px]">
              <button 
                onClick={() => onUpdateQuantity(product.id, -1)} 
                className="px-4 h-full hover:bg-[#f47b20] transition-colors font-bold text-lg flex items-center justify-center active:bg-orange-600"
              >
                -
              </button>
              <span className="px-2 font-bold text-sm min-w-[32px] text-center">{cartQuantity}</span>
              <button 
                onClick={() => onUpdateQuantity(product.id, 1)} 
                className="px-4 h-full hover:bg-[#f47b20] transition-colors font-bold text-lg flex items-center justify-center active:bg-orange-600"
              >
                +
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAdd}
              className={`px-4 h-[46px] rounded-xl transition-all duration-300 active:scale-95 flex items-center gap-2 ${
                isAdded 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' 
                  : 'bg-gray-900 text-white hover:bg-[#f47b20] hover:shadow-lg hover:shadow-orange-500/30'
              }`}
            >
              {isAdded ? <CheckCircle2 size={18} /> : <ShoppingCart size={18} />}
              <span className="font-semibold text-sm">{isAdded ? 'Added' : 'Add'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const CartSidebar = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, onCheckout }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 99;
  const total = subtotal + deliveryFee;

  return (
    <>
      {/* Backdrop */}
      <div className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingCart className="text-[#f47b20]" /> Your Cart
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <Package size={64} className="opacity-20" />
              <p className="font-medium text-lg">Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mix-blend-multiply bg-white rounded-xl p-1" />
                <div className="flex-grow">
                  <h4 className="font-bold text-sm text-gray-900 leading-tight mb-1">{item.name}</h4>
                  <p className="text-[#f47b20] font-bold text-sm mb-2">₹{item.price}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 hover:bg-gray-50 text-gray-600 font-bold">-</button>
                      <span className="px-2 font-semibold text-sm w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 hover:bg-gray-50 text-gray-600 font-bold">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Delivery</span>
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-bold">FREE</span>
                ) : (
                  <span className="font-semibold">₹{deliveryFee}</span>
                )}
              </div>
              {deliveryFee > 0 && (
                <p className="text-[10px] text-gray-500 text-right mt-1">
                  Add ₹{FREE_DELIVERY_THRESHOLD - subtotal} more for free delivery
                </p>
              )}
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex justify-between text-gray-900 text-lg font-black">
                <span>Total</span>
                <span style={{ color: BRAND_ORANGE }}>₹{total}</span>
              </div>
            </div>
            
            <button 
              onClick={() => onCheckout(cart, subtotal, deliveryFee, total)}
              className="w-full bg-[#f47b20] hover:bg-[#d96b1c] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/30"
            >
              Order via WhatsApp <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const OrderTracker = ({ isOpen, onClose }) => {
  const [trackId, setTrackId] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');

  // Fixed 4 Stages
  const stages = ['Order Confirmed', 'Printing', 'Shipped', 'Delivered'];
  
  const handleTrack = () => {
    setError('');
    setOrderData(null);
    if (!trackId.trim()) return;

    // Fetch from mock DB
    const data = DB.getOrder(trackId.trim());
    if (data) {
      setOrderData(data);
    } else {
      setError('Order not found. Please check your ID.');
    }
  };

  const currentStageIdx = orderData ? stages.indexOf(orderData.status || 'Order Confirmed') : 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-3xl w-full max-w-lg relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Track Order</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition"><X size={20}/></button>
        </div>

        <div className="p-6 overflow-y-auto">
          <div className="flex gap-2 mb-6">
            <input 
              type="text" 
              placeholder="Enter Order ID (e.g. PM-8472)" 
              value={trackId}
              onChange={(e) => setTrackId(e.target.value.toUpperCase())}
              className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
            />
            <button 
              onClick={handleTrack}
              className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-[#f47b20] transition-colors"
            >
              Track
            </button>
          </div>

          {error && <p className="text-red-500 text-sm font-medium mb-4 text-center">{error}</p>}

          {orderData && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-end mb-8 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Order ID</p>
                  <p className="font-black text-xl text-gray-900">{orderData.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total</p>
                  <p className="font-black text-xl text-[#f47b20]">₹{orderData.total}</p>
                </div>
              </div>

              {/* Enhanced Visual Tracking Stepper */}
              <div className="mb-10 mt-4 relative">
                <div className="flex items-center justify-between relative z-10 px-4">
                  {/* Background Line */}
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1.5 bg-gray-100 rounded-full -z-10"></div>
                  
                  {/* Progress Line */}
                  <div 
                    className="absolute left-6 top-1/2 -translate-y-1/2 h-1.5 bg-[#f47b20] rounded-full -z-10 transition-all duration-1000 ease-out" 
                    style={{ width: `calc(${(Math.max(0, currentStageIdx) / (stages.length - 1)) * 100}% - 3rem)` }}
                  ></div>
                  
                  {/* Stage Dots */}
                  {stages.map((stage, idx) => {
                    const isActive = idx <= currentStageIdx;
                    return (
                      <div key={idx} className="flex flex-col items-center relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isActive ? 'bg-[#f47b20] border-orange-100 text-white shadow-md shadow-orange-300/50 scale-110' : 'bg-gray-50 border-gray-200 text-gray-300'}`}>
                          <Check size={18} strokeWidth={3} />
                        </div>
                        <span className={`text-[10px] sm:text-xs font-bold text-center absolute top-12 w-24 left-1/2 -ml-12 transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                          {stage}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-12 bg-gray-50 p-4 rounded-xl">
                <h3 className="font-bold text-xs text-gray-500 uppercase tracking-wider mb-3">Items Ordered</h3>
                <ul className="space-y-2">
                  {orderData.items && orderData.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm text-gray-700">
                      <span className="font-semibold">{item.qty}x {item.name}</span>
                      <span className="font-bold">₹{item.price * item.qty}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackOpen, setIsTrackOpen] = useState(false);

  // Cart Functions
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Deliberately removed setIsCartOpen(true) so the user can keep shopping
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = (cartItems, subtotal, deliveryFee, total) => {
    // Generate Order ID
    const orderId = `PM-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Create DB structured object
    const orderData = {
      orderId,
      timestamp: new Date().toISOString(),
      subtotal,
      deliveryFee,
      total,
      status: 'Order Confirmed', // Starts at Stage 1
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        qty: item.quantity,
        price: item.price
      }))
    };

    // Save to Mock DB
    DB.saveOrder(orderData);

    // Format WhatsApp Message
    let message = `Hello PIXEL Melts! I'd like to place an order.%0A%0A`;
    message += `*Order ID:* ${orderId}%0A%0A`;
    message += `*Items:*%0A`;
    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (₹${item.price})%0A`;
    });
    message += `%0A*Subtotal:* ₹${subtotal}`;
    if (deliveryFee > 0) message += `%0A*Delivery:* ₹${deliveryFee}`;
    message += `%0A*Total Bill:* ₹${total}%0A%0A`;
    message += `Please confirm my order.`;

    // Clear cart and redirect
    setCart([]);
    setIsCartOpen(false);
    
    // Show a success alert (using standard browser behavior for this interaction flow, or just open window)
    window.open(`https://wa.me/917080280497?text=${message}`, '_blank');
  };

  return (
    <div className="relative min-h-screen font-sans text-gray-900 bg-transparent selection:bg-[#f47b20] selection:text-white">
      
      <InteractiveBackground />

      <Header 
        cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTrack={() => setIsTrackOpen(true)}
      />

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative pt-24 pb-20 px-6 overflow-hidden flex flex-col items-center text-center">
          {/* Backdrop Image Integration */}
          <div className="absolute inset-0 z-0">
            <img 
              src="backg.jpeg" 
              alt="3D Printing Workspace" 
              className="w-full h-full object-cover object-center opacity-[0.25] mix-blend-multiply"
            />
            {/* Gradient overlay to ensure text remains perfectly readable */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fdfdfd]/5 via-[#fdfdfd]/5 to-[#fdfdfd]/5"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 text-gray-700 font-bold text-sm mb-8 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f47b20] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f47b20]"></span>
              </span>
              Accepting Custom 3D Orders
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]">
              Print Your<br/>
              <span style={{ color: BRAND_ORANGE }}>Imagination.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-800 max-w-2xl font-medium mb-10 leading-relaxed bg-white/40 p-4 rounded-2xl backdrop-blur-sm border border-white/50">
              High-precision 3D printing services for prototypes, enclosures, and stunning display models. Send us your CAD or choose from our gallery.
            </p>
            
            <button 
              onClick={() => window.open('https://wa.me/919876543210?text=Hi%20PIXEL%20Melts,%20I%20have%20a%20custom%20STL%20file%20for%20printing!', '_blank')}
              className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#f47b20] transition-colors shadow-xl shadow-gray-900/20"
            >
              Request Custom Print
            </button>
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black text-gray-900">Featured Arsenal</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map(product => {
              const cartItem = cart.find(item => item.id === product.id);
              return (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  cartQuantity={cartItem ? cartItem.quantity : 0}
                  onAddToCart={addToCart} 
                  onUpdateQuantity={updateQuantity}
                />
              );
            })}
          </div>
        </section>
      </main>

      {/* MODALS */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />

      <OrderTracker 
        isOpen={isTrackOpen} 
        onClose={() => setIsTrackOpen(false)} 
      />

      {/* Global Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-slow {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}} />
    </div>
  );
}