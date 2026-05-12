import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { quoteConfig, contactConfig } from '../config';
import { trpc } from '@/providers/trpc';
import { Toaster, toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: '',
    message: '',
  });

  const createQuote = trpc.quote.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success('Offerte aanvraag verzonden!');
    },
    onError: (error) => {
      toast.error(error.message || 'Er is iets misgegaan. Probeer het opnieuw.');
    },
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.quote-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.serviceType) {
      toast.error('Vul alle verplichte velden in.');
      return;
    }
    createQuote.mutate({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      serviceType: formData.serviceType,
      message: formData.message || undefined,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const serviceOptions = [
    'Stukadoorswerk',
    'Renovatie',
    'Afwerking',
    'Timmerwerk',
    'Compleet Project',
  ];

  return (
    <section
      id="quote"
      ref={sectionRef}
      style={{
        backgroundColor: '#112130',
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(60px, 10vw, 100px) 0',
      }}
    >
      <Toaster position="top-right" />
      <div
        className="quote-content"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          gap: '80px',
          flexWrap: 'wrap',
        }}
      >
        {/* Left Column */}
        <div style={{ flex: '1 1 400px', minWidth: 'clamp(280px, 90vw, 400px)' }}>
          {quoteConfig.sectionLabel && (
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: '#D4A574',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              {quoteConfig.sectionLabel}
            </p>
          )}
          {quoteConfig.title && (
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(30px, 5vw, 42px)',
                fontWeight: 500,
                lineHeight: 1.2,
                color: '#F2EBE0',
                marginBottom: '20px',
              }}
            >
              {quoteConfig.title}
            </h2>
          )}
          {quoteConfig.description && (
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'rgba(242, 235, 224, 0.8)',
                marginBottom: '40px',
              }}
            >
              {quoteConfig.description}
            </p>
          )}

          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', color: '#A89080' }}>
              {contactConfig.address}
            </p>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', color: '#A89080' }}>
              {contactConfig.postalCode}
            </p>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', color: '#A89080' }}>
              {contactConfig.email}
            </p>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', color: '#A89080' }}>
              Tel: {contactConfig.phone}
            </p>
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '12px', color: '#A89080' }}>
              KVK: {contactConfig.kvk}
            </p>
          </div>
        </div>

        {/* Right Column - Form */}
        <div style={{ flex: '1 1 400px', minWidth: '300px' }}>
          {submitted ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '400px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '24px',
                  color: '#F2EBE0',
                  lineHeight: 1.5,
                }}
              >
                Bedankt voor uw aanvraag! Wij nemen binnen 24 uur contact met u op.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#D4A574',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Naam *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(17, 33, 48, 0.15)',
                    borderRadius: '2px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '14px',
                    color: '#112130',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#D4A574'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(17, 33, 48, 0.15)'; }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#D4A574',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Telefoonnummer *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(17, 33, 48, 0.15)',
                    borderRadius: '2px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '14px',
                    color: '#112130',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#D4A574'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(17, 33, 48, 0.15)'; }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#D4A574',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  E-mail *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(17, 33, 48, 0.15)',
                    borderRadius: '2px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '14px',
                    color: '#112130',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#D4A574'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(17, 33, 48, 0.15)'; }}
                />
              </div>

              <div>
                <label
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#D4A574',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Type dienst *
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(17, 33, 48, 0.15)',
                    borderRadius: '2px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '14px',
                    color: '#112130',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    cursor: 'pointer',
                    appearance: 'none',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#D4A574'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(17, 33, 48, 0.15)'; }}
                >
                  <option value="">Selecteer een dienst</option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#D4A574',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Bericht
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid rgba(17, 33, 48, 0.15)',
                    borderRadius: '2px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '14px',
                    color: '#112130',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    resize: 'vertical',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#D4A574'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(17, 33, 48, 0.15)'; }}
                />
              </div>

              <button
                type="submit"
                disabled={createQuote.isPending}
                style={{
                  display: 'inline-block',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#112130',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '14px 32px',
                  backgroundColor: '#D4A574',
                  border: '1px solid #D4A574',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  alignSelf: 'flex-start',
                  opacity: createQuote.isPending ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F2EBE0';
                  e.currentTarget.style.borderColor = '#F2EBE0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#D4A574';
                  e.currentTarget.style.borderColor = '#D4A574';
                }}
              >
                {createQuote.isPending ? 'Bezig met verzenden...' : 'Verstuur Aanvraag'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
