"use client";

import { useState } from "react";
import { PageTransition, SplitText, FadeUp, StaggerContainer, StaggerItem } from "@/components/Animations";

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    topic: "GENERAL INQUIRIES",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmissionStatus("sending");

    // Simulate cyber-grunge transmission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionStatus("success");
      setFormData({
        name: "",
        email: "",
        topic: "GENERAL INQUIRIES",
        message: "",
      });
    }, 2000);
  };

  const handleReset = () => {
    setSubmissionStatus("idle");
  };

  return (
    <PageTransition>
    <div className="w-full select-none min-h-screen py-16 px-5 sm:px-10" style={{ background: "#f0ece4", color: "#0a0a0a" }}>
      <div className="mx-auto max-w-7xl">
        
        {/* Page Header */}
        <div className="mb-12 pb-4 overflow-hidden" style={{ borderBottom: "1.5px solid rgba(10,10,10,0.12)" }}>
          <FadeUp>
            <span
              className="text-sm font-black uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#e8291c" }}
            >
              CONTACT &amp; INQUIRY
            </span>
          </FadeUp>
          <SplitText
            text="REACH OUT"
            as="h1"
            className="font-black uppercase mt-2 leading-none"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              letterSpacing: "-0.01em",
            } as React.CSSProperties}
            delay={0.1}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Form (Glow container) */}
          <FadeUp delay={0.2} className="lg:col-span-7 border border-foreground/15 bg-white p-6 sm:p-10 relative overflow-hidden transition-all duration-300 hover:border-foreground">
            
            {submissionStatus !== "success" ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Form Header info */}
                <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-foreground/50 border-b border-foreground/15 pb-4 mb-2">
                  <span>node ID: contact-v1.4</span>
                  <span>status: online</span>
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-widest text-foreground/50 uppercase">
                      [ name / signature ]
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. raven kohl"
                      className="w-full bg-white border border-foreground/15 py-2 px-3 text-xs font-mono placeholder:text-foreground/35 text-foreground outline-none focus:border-foreground tracking-wider transition-colors"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-widest text-foreground/50 uppercase">
                      [ digital mail / email ]
                    </label>
                    <input
                      type="email"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. raven@norie.com"
                      className="w-full bg-white border border-foreground/15 py-2 px-3 text-xs font-mono placeholder:text-foreground/35 text-foreground outline-none focus:border-foreground tracking-wider transition-colors"
                    />
                  </div>

                </div>

                {/* Topic selector */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono tracking-widest text-foreground/50 uppercase">
                    [ inquiry channel / topic ]
                  </label>
                  <select
                    disabled={isSubmitting}
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full bg-white border border-foreground/15 py-2 px-3 text-xs font-mono text-foreground outline-none focus:border-foreground tracking-widest cursor-pointer transition-colors"
                  >
                    <option value="GENERAL INQUIRIES" className="bg-white">GENERAL INQUIRIES</option>
                    <option value="RETAIL & WHOLESALE" className="bg-white">RETAIL & WHOLESALE</option>
                    <option value="PRESS RELATIONS" className="bg-white">PRESS RELATIONS</option>
                    <option value="ARCHIVAL RENTALS" className="bg-white">ARCHIVAL RENTALS</option>
                  </select>
                </div>

                {/* Message text-area */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono tracking-widest text-foreground/50 uppercase">
                    [ message payload ]
                  </label>
                  <textarea
                    required
                    rows={6}
                    disabled={isSubmitting}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="enter your detailed message here..."
                    className="w-full bg-white border border-foreground/15 py-2.5 px-3 text-xs font-mono placeholder:text-foreground/35 text-foreground outline-none focus:border-foreground tracking-wider transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submission button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 text-xs font-mono font-semibold uppercase tracking-[0.2em] transition-all duration-300 border text-center cursor-pointer ${
                    isSubmitting
                      ? "bg-neutral-100 text-foreground/45 border-foreground/15 cursor-not-allowed"
                      : "bg-black text-white hover:bg-neutral-800 border-black active:scale-[0.99]"
                  }`}
                >
                  {isSubmitting ? "[ transmitting data... ]" : "[ transmit message ]"}
                </button>

              </form>
            ) : (
              /* Success visual transmission feedback screen */
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-6 animate-fade-in font-mono">
                {/* Simulated Reticle */}
                <div className="w-16 h-16 border border-primary/45 rounded-full flex items-center justify-center relative">
                  <div className="w-8 h-8 border border-dashed border-primary rounded-full animate-spin" style={{ animationDuration: '6s' }}></div>
                  <span className="absolute text-primary text-[8px]">●</span>
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] text-primary uppercase tracking-[0.3em] font-semibold block">
                    [ transmission completed ]
                  </span>
                  <p className="text-xs text-foreground/75 max-w-sm tracking-wide leading-relaxed">
                    your message has been securely compiled and transmitted to the norie archival database. our response node will verify and reply shortly.
                  </p>
                </div>

                <div className="border border-foreground/15 bg-white p-4 text-[9px] text-foreground/75 uppercase space-y-1.5 w-full max-w-md tracking-widest">
                  <div>hash: sha256_9d4edd7b2cbf</div>
                  <div>time: {new Date().toISOString()}</div>
                  <div className="text-foreground font-semibold">// node reply: code 200 (OK)</div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 border border-foreground/15 text-[10px] text-foreground/60 hover:text-white hover:bg-black hover:border-black transition-all font-mono cursor-pointer uppercase tracking-widest"
                >
                  [ send another transmission ]
                </button>
              </div>
            )}
            
          </FadeUp>

          {/* Right Side: Office Nodes & Channels */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Channels */}
            <FadeUp delay={0.3} className="border border-foreground/15 bg-white p-6 sm:p-8 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-foreground font-semibold uppercase block mb-1">
                // direct lines
              </span>
              
              <div className="space-y-3 font-mono text-[11px] leading-relaxed tracking-wider lowercase">
                <div className="flex justify-between border-b border-foreground/15 pb-2">
                  <span className="text-foreground/50">general inquiries:</span>
                  <span className="text-foreground hover:underline transition-all cursor-pointer">inquire@norie.com</span>
                </div>
                <div className="flex justify-between border-b border-foreground/15 pb-2">
                  <span className="text-foreground/50">wholesale orders:</span>
                  <span className="text-foreground hover:underline transition-all cursor-pointer">sales@norie.com</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-foreground/50">press inquiries:</span>
                  <span className="text-foreground hover:underline transition-all cursor-pointer">media@norie.com</span>
                </div>
              </div>
            </FadeUp>

            {/* Physical Offices */}
            <StaggerContainer delay={0.4} className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-foreground/50 uppercase block px-1">
                // physical nodes
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Location 1: New York */}
                <StaggerItem className="border border-foreground/15 bg-white p-5 hover:border-foreground transition-all font-mono">
                  <span className="text-[10px] text-foreground uppercase tracking-widest block font-semibold mb-1">
                    [ new york node ]
                  </span>
                  <p className="text-[10px] text-foreground/50 leading-relaxed tracking-wide lowercase">
                    405 broadway street<br />
                    tribeca, ny 10013<br />
                    united states
                  </p>
                </StaggerItem>

                {/* Location 2: Berlin */}
                <StaggerItem className="border border-foreground/15 bg-white p-5 hover:border-foreground transition-all font-mono">
                  <span className="text-[10px] text-foreground uppercase tracking-widest block font-semibold mb-1">
                    [ berlin node ]
                  </span>
                  <p className="text-[10px] text-foreground/50 leading-relaxed tracking-wide lowercase">
                    oranienstraße 185<br />
                    kreuzberg, 10999 berlin<br />
                    germany
                  </p>
                </StaggerItem>

                {/* Location 3: Tokyo */}
                <StaggerItem className="border border-foreground/15 bg-white p-5 hover:border-foreground transition-all font-mono">
                  <span className="text-[10px] text-foreground uppercase tracking-widest block font-semibold mb-1">
                    [ tokyo node ]
                  </span>
                  <p className="text-[10px] text-foreground/50 leading-relaxed tracking-wide lowercase">
                    5-11-5 jingumae<br />
                    shibuya-ku, tokyo 150-0001<br />
                    japan
                  </p>
                </StaggerItem>

                {/* Location 4: London */}
                <StaggerItem className="border border-foreground/15 bg-white p-5 hover:border-foreground transition-all font-mono">
                  <span className="text-[10px] text-foreground uppercase tracking-widest block font-semibold mb-1">
                    [ london node ]
                  </span>
                  <p className="text-[10px] text-foreground/50 leading-relaxed tracking-wide lowercase">
                    12-14 bateman street<br />
                    soho, london w1d 3ad<br />
                    united kingdom
                  </p>
                </StaggerItem>

              </div>
            </StaggerContainer>

          </div>

        </div>
        
      </div>
    </div>
    </PageTransition>
  );
}
