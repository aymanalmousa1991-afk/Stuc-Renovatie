import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import { tiersConfig } from '../config';
import type { TierConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

export default function Tiers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const tierRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tiers = tiersConfig.tiers;
  const [selectedTier, setSelectedTier] = useState<TierConfig | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      tierRefs.current.forEach((el) => {
        if (!el) return;
        const textEl = el.querySelector('.tier-text-content');
        if (textEl) {
          gsap.fromTo(
            textEl,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 1.0,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Sluit modal met Escape-toets
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTier(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!tiersConfig.sectionLabel && !tiersConfig.title && tiers.length === 0) {
    return null;
  }

  return (
    <section
      id="tiers"
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFFFF',
        position: 'relative',
        zIndex: 2,
        padding: 'clamp(60px, 10vw, 100px) 0 clamp(40px, 8vw, 80px)',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          textAlign: 'center',
          padding: '0 24px 80px',
        }}
      >
        {tiersConfig.sectionLabel && (
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
            {tiersConfig.sectionLabel}
          </p>
        )}
        {tiersConfig.title && (
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '42px',
              fontWeight: 500,
              lineHeight: 1.2,
              color: '#112130',
            }}
          >
            {tiersConfig.title}
          </h2>
        )}
      </div>

      {/* Tier Rows */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {tiers.map((tier, i) => (
          <div
            key={tier.name}
            ref={(el) => { tierRefs.current[i] = el; }}
            style={{
              display: 'flex',
              flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
              gap: 'clamp(24px, 5vw, 60px)',
              marginBottom: i < tiers.length - 1 ? 'clamp(48px, 8vw, 100px)' : '0',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* Image */}
            <div
              className="tier-image-placeholder"
              style={{
                width: '100%',
                maxWidth: '460px',
                minWidth: '280px',
                flex: '1 1 100%',
                '@media (min-width: 768px)': { flex: '0 0 auto' },
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                boxShadow: '0px 8px 10px 0px rgba(17, 33, 48, 0.1)',
                cursor: 'pointer',
                transition: 'transform 0.4s ease',
              }}
              onClick={() => setSelectedTier(tier)}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {tier.image && (
                <img
                  src={tier.image}
                  alt={tier.name}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                  }}
                />
              )}
            </div>

            {/* Text Content */}
            <div
              className="tier-text-content"
              style={{
                flex: '1 1 400px',
                minWidth: '300px',
              }}
            >
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#D4A574',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                {tier.journeys}
              </p>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '32px',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: '#112130',
                  marginBottom: '8px',
                }}
              >
                {tier.name}
              </h3>
              <p
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '28px',
                  fontWeight: 400,
                  color: '#D4A574',
                  marginBottom: '24px',
                }}
              >
                <span style={{ fontStyle: 'italic' }}>{tier.price}</span>
                <span
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#A89080',
                    marginLeft: '8px',
                    letterSpacing: '0.5px',
                  }}
                >
                  {tier.frequency}
                </span>
              </p>
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: '#A89080',
                  marginBottom: '28px',
                  maxWidth: '440px',
                }}
              >
                {tier.description}
              </p>

              {/* Amenities List */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                {tier.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '13px',
                      fontWeight: 400,
                      lineHeight: 1.5,
                      color: '#A89080',
                      padding: '8px 0',
                      borderBottom: '1px solid rgba(17, 33, 48, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: '#D4A574',
                        flexShrink: 0,
                      }}
                    />
                    {amenity}
                  </li>
                ))}
              </ul>

              {/* CTA Button — opent modal met details */}
              {tier.ctaText && (
                <button
                  onClick={() => setSelectedTier(tier)}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#112130',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    padding: '14px 36px',
                    border: '1px solid rgba(17, 33, 48, 0.25)',
                    borderRadius: '2px',
                    transition: 'all 0.6s ease',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = '#112130';
                    el.style.color = '#F2EBE0';
                    el.style.borderColor = '#112130';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.backgroundColor = 'transparent';
                    el.style.color = '#112130';
                    el.style.borderColor = 'rgba(17, 33, 48, 0.25)';
                  }}
                >
                  {tier.ctaText}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedTier && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            overflow: 'auto',
          }}
          onClick={() => setSelectedTier(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              height: 'fit-content',
              overflow: 'auto',
              borderRadius: '8px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
              position: 'relative',
              margin: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedTier(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                color: '#FFFFFF',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#112130'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)'; }}
            >
              <X size={18} />
            </button>

            {/* Hero Image met gradient overlay naar content */}
            <div style={{ position: 'relative' }}>
              {selectedTier.image && (
                <img
                  src={selectedTier.image}
                  alt={selectedTier.name}
                  style={{
                    width: '100%',
                    height: 'clamp(180px, 30vw, 300px)',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              )}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '80px',
                background: 'linear-gradient(to bottom, transparent, #FFFFFF)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Content */}
            <div style={{ padding: '40px' }}>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#D4A574',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                {selectedTier.journeys}
              </p>
              <h2
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '36px',
                  fontWeight: 600,
                  color: '#112130',
                  marginBottom: '12px',
                }}
              >
                {selectedTier.name}
              </h2>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#A89080',
                  marginBottom: '28px',
                  lineHeight: 1.7,
                }}
              >
                {selectedTier.description}
              </p>

              {/* Category + Year badge */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: '2px',
                    backgroundColor: 'rgba(212, 165, 116, 0.15)',
                    color: '#D4A574',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {selectedTier.price}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: '2px',
                    backgroundColor: 'rgba(17, 33, 48, 0.06)',
                    color: '#112130',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {selectedTier.frequency}
                </span>
              </div>

              {/* Amenities */}
              <h4
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#112130',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                Wat er is gedaan
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0' }}>
                {selectedTier.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#112130',
                      padding: '10px 0',
                      borderBottom: '1px solid rgba(17, 33, 48, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#D4A574',
                        flexShrink: 0,
                      }}
                    />
                    {amenity}
                  </li>
                ))}
              </ul>

              {/* CTA naar offerte */}
              <a
                href="#quote"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedTier(null);
                  setTimeout(() => {
                    const el = document.querySelector('#quote');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
                style={{
                  display: 'inline-block',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  backgroundColor: '#112130',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '14px 36px',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#D4A574'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#112130'; }}
              >
                Vraag een offerte aan
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
