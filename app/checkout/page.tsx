"use client";

import { useStore } from "@/app/store-context";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageTransition, FadeUp, SlideIn } from "@/components/Animations";

export default function CheckoutPage() {
  const { cart } = useStore();
  const router = useRouter();

  const [contactInfo, setContactInfo] = useState({ email: "", phone: "" });
  const [shipping, setShipping] = useState({ firstName: "", lastName: "", address: "", city: "Colombo", zip: "" });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingCost = 450; // Standard local shipping in LKR
  const total = cartSubtotal + shippingCost;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create the order in the database
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
      const data = await res.json();
      
      // We simulate a 1.5s processing delay to feel like a real payment gateway
      setTimeout(() => {
        if (data.url) {
          // If the API route gave us a simulated URL or stripe URL
          window.location.href = data.url;
        } else {
          // Fallback
          router.push(`/checkout/success?session_id=fallback_${Date.now()}`);
        }
      }, 1500);
    } catch (e) {
      console.error(e);
      setIsProcessing(false);
      alert("Something went wrong with the checkout. Please try again.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    background: "transparent",
    border: "1.5px solid rgba(10,10,10,0.2)",
    outline: "none",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: "14px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    transition: "border-color 0.3s",
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#f0ece4] text-[#0a0a0a]">
        <span className="font-black uppercase text-2xl mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          YOUR BAG IS EMPTY
        </span>
        <Link
          href="/all-products"
          className="px-8 py-4 bg-[#0a0a0a] text-[#f0ece4] font-black uppercase text-sm tracking-widest"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          [ CONTINUE SHOPPING ]
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f0ece4] text-[#0a0a0a] pt-24 pb-20 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: FORM */}
          <div className="flex-1">
            <FadeUp>
              <h1 className="font-black uppercase text-4xl mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                CHECKOUT
              </h1>
            </FadeUp>

            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-10">
              
              {/* CONTACT */}
              <FadeUp delay={0.1}>
                <section>
                  <h2 className="font-bold uppercase text-lg mb-4 tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    1. CONTACT
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input required type="email" placeholder="EMAIL" style={inputStyle} value={contactInfo.email} onChange={e => setContactInfo({...contactInfo, email: e.target.value})} />
                    <input required type="tel" placeholder="PHONE (E.G. +94 77 123 4567)" style={inputStyle} value={contactInfo.phone} onChange={e => setContactInfo({...contactInfo, phone: e.target.value})} />
                  </div>
                </section>
              </FadeUp>

              {/* SHIPPING */}
              <FadeUp delay={0.2}>
                <section>
                  <h2 className="font-bold uppercase text-lg mb-4 tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    2. DELIVERY (SRI LANKA)
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input required type="text" placeholder="FIRST NAME" style={inputStyle} value={shipping.firstName} onChange={e => setShipping({...shipping, firstName: e.target.value})} />
                    <input required type="text" placeholder="LAST NAME" style={inputStyle} value={shipping.lastName} onChange={e => setShipping({...shipping, lastName: e.target.value})} />
                  </div>
                  <input required type="text" placeholder="ADDRESS" style={{ ...inputStyle, marginBottom: "16px" }} value={shipping.address} onChange={e => setShipping({...shipping, address: e.target.value})} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select required style={inputStyle} value={shipping.city} onChange={e => setShipping({...shipping, city: e.target.value})}>
                      <option value="Colombo">COLOMBO</option>
                      <option value="Kandy">KANDY</option>
                      <option value="Galle">GALLE</option>
                      <option value="Other">OTHER</option>
                    </select>
                    <input required type="text" placeholder="POSTAL CODE" style={inputStyle} value={shipping.zip} onChange={e => setShipping({...shipping, zip: e.target.value})} />
                  </div>
                </section>
              </FadeUp>

              {/* PAYMENT */}
              <FadeUp delay={0.3}>
                <section>
                  <h2 className="font-bold uppercase text-lg mb-4 tracking-widest flex items-center justify-between" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    <span>3. PAYMENT</span>
                    <span className="text-xs opacity-50">SECURE ENCRYPTED</span>
                  </h2>
                  
                  <div className="flex flex-col gap-3">
                    
                    {/* Card */}
                    <label className={`cursor-pointer border p-4 flex items-center justify-between transition-all ${paymentMethod === 'card' ? 'border-[#0a0a0a] bg-[rgba(10,10,10,0.02)]' : 'border-[rgba(10,10,10,0.15)] hover:border-[rgba(10,10,10,0.3)]'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-[#0a0a0a]" />
                        <span className="font-black uppercase tracking-widest text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>CREDIT / DEBIT CARD</span>
                      </div>
                      <div className="flex gap-2 opacity-60">
                        <span className="font-bold text-[10px]">VISA</span>
                        <span className="font-bold text-[10px]">MC</span>
                        <span className="font-bold text-[10px]">AMEX</span>
                      </div>
                    </label>

                    {/* Fake Card Form if Card selected */}
                    {paymentMethod === 'card' && (
                      <div className="p-4 border border-[rgba(10,10,10,0.15)] border-t-0 space-y-4" style={{ marginTop: "-12px", background: "rgba(255,255,255,0.4)" }}>
                        <input required={paymentMethod === 'card'} type="text" placeholder="CARD NUMBER" style={inputStyle} />
                        <div className="grid grid-cols-2 gap-4">
                          <input required={paymentMethod === 'card'} type="text" placeholder="MM / YY" style={inputStyle} />
                          <input required={paymentMethod === 'card'} type="text" placeholder="CVC" style={inputStyle} />
                        </div>
                      </div>
                    )}

                    {/* Koko */}
                    <label className={`cursor-pointer border p-4 flex items-center justify-between transition-all ${paymentMethod === 'koko' ? 'border-[#0a0a0a] bg-[rgba(10,10,10,0.02)]' : 'border-[rgba(10,10,10,0.15)] hover:border-[rgba(10,10,10,0.3)]'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="koko" checked={paymentMethod === 'koko'} onChange={() => setPaymentMethod('koko')} className="accent-[#0a0a0a]" />
                        <span className="font-black uppercase tracking-widest text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>KOKO (BUY NOW, PAY LATER)</span>
                      </div>
                      <span className="font-bold text-[10px] bg-[#FF3366] text-white px-2 py-0.5 rounded-sm tracking-wider">KOKO</span>
                    </label>

                    {/* Mintpay */}
                    <label className={`cursor-pointer border p-4 flex items-center justify-between transition-all ${paymentMethod === 'mintpay' ? 'border-[#0a0a0a] bg-[rgba(10,10,10,0.02)]' : 'border-[rgba(10,10,10,0.15)] hover:border-[rgba(10,10,10,0.3)]'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="mintpay" checked={paymentMethod === 'mintpay'} onChange={() => setPaymentMethod('mintpay')} className="accent-[#0a0a0a]" />
                        <span className="font-black uppercase tracking-widest text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>MINTPAY (3 INSTALLMENTS)</span>
                      </div>
                      <span className="font-bold text-[10px] bg-[#00E5FF] text-[#0a0a0a] px-2 py-0.5 rounded-sm tracking-wider">MINT</span>
                    </label>

                    {/* COD */}
                    <label className={`cursor-pointer border p-4 flex items-center justify-between transition-all ${paymentMethod === 'cod' ? 'border-[#0a0a0a] bg-[rgba(10,10,10,0.02)]' : 'border-[rgba(10,10,10,0.15)] hover:border-[rgba(10,10,10,0.3)]'}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-[#0a0a0a]" />
                        <span className="font-black uppercase tracking-widest text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>CASH ON DELIVERY</span>
                      </div>
                    </label>

                  </div>
                </section>
              </FadeUp>
            </form>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="lg:w-[400px] shrink-0">
            <SlideIn direction="right" delay={0.2}>
              <div className="p-6 sticky top-24 border border-[rgba(10,10,10,0.15)]" style={{ background: "rgba(255,255,255,0.4)" }}>
                <h2 className="font-black uppercase text-xl mb-6 tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  ORDER SUMMARY
                </h2>

                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                      <div className="relative w-16 aspect-[3/4] bg-[#e8e2da] shrink-0 border border-[rgba(10,10,10,0.1)]">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <span className="font-black uppercase text-sm truncate block" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{item.name}</span>
                        <div className="flex justify-between items-center mt-1">
                          <span className="font-bold text-xs uppercase opacity-50" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>SIZE: {item.size} × {item.quantity}</span>
                          <span className="font-bold text-xs" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>LKR {item.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[rgba(10,10,10,0.15)] pt-4 space-y-2 mb-6">
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest opacity-60" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    <span>SUBTOTAL</span>
                    <span>LKR {cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest opacity-60" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    <span>SHIPPING</span>
                    <span>LKR {shippingCost}</span>
                  </div>
                </div>

                <div className="border-t border-[#0a0a0a] pt-4 mb-8 flex justify-between items-center">
                  <span className="font-black uppercase text-lg tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>TOTAL</span>
                  <span className="font-black uppercase text-xl" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}>LKR {total}</span>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={isProcessing}
                  className="w-full py-4 font-black text-sm uppercase tracking-widest transition-all text-center flex items-center justify-center gap-3 disabled:opacity-50"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    background: "#0a0a0a",
                    color: "#f0ece4",
                    letterSpacing: "0.2em",
                  }}
                >
                  {isProcessing ? (
                    <span className="animate-pulse">[ PROCESSING... ]</span>
                  ) : (
                    <span>[ PAY LKR {total} ]</span>
                  )}
                </button>
              </div>
            </SlideIn>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
