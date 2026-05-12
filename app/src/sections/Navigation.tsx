import { useEffect, useRef, useState } from 'react';
import { getLenis } from '../hooks/useLenis';
import { navigationConfig } from '../config';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      const navHeight = navRef.current?.offsetHeight ?? 0;
      const probeY = navHeight > 0 ? navHeight * 0.8 : 60;
      // Detect light background sections by checking computed background color
      const darkSections = ['hero', 'manifesto', 'quote'];
      const isInDarkSection = darkSections.some((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom >= probeY;
      });
      setIsLightSection(!isInDarkSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Close mobile menu on route/scroll
  useEffect(() => {
    const closeMobile = () => setMobileOpen(false);
    window.addEventListener('scroll', closeMobile, { once: true });
    return () => window.removeEventListener('scroll', closeMobile);
  }, []);

  const baseTextColor = isLightSection ? '#112130' : '#F2EBE0';
  const hoverTextColor = isLightSection ? '#A89080' : '#D4A574';
  const bgColor = isLightSection
    ? 'rgba(242, 235, 224, 0.88)'
    : 'rgba(17, 33, 48, 0.75)';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(targetId);
    } else {
      const el = document.querySelector(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!navigationConfig.brandName && navigationConfig.links.length === 0) {
    return null;
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        padding: scrolled ? '12px 0' : '20px 0',
        transition: 'padding 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className="liquid-glass"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '12px 24px',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo / Brand */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 101,
          }}
        >
          {navigationConfig.logoPath ? (
            <img
              src={navigationConfig.logoPath}
              alt={navigationConfig.brandName}
              style={{
                                height: '72px',
                width: 'auto',
                maxWidth: navigationConfig.logoWidth || 260,
                objectFit: 'contain',
                backgroundColor: 'rgba(242, 235, 224, 0.92)',
                borderRadius: '6px',
                padding: '8px 16px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
              }}
            />
          ) : (
            <span
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(18px, 3vw, 24px)',
                fontWeight: 600,
                color: baseTextColor,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                transition: 'color 0.6s ease',
              }}
            >
              {navigationConfig.brandName}
            </span>
          )}
        </a>

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            gap: '28px',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          {navigationConfig.links.map((item) => (
            <a
              key={`${item.label}-${item.target}`}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.target)}
              className="nav-link"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: baseTextColor,
                letterSpacing: '1.3px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.6s ease',
                opacity: 0.85,
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = hoverTextColor;
                (e.target as HTMLAnchorElement).style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color = baseTextColor;
                (e.target as HTMLAnchorElement).style.opacity = '0.85';
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: baseTextColor,
            padding: '4px',
            zIndex: 101,
          }}
          className="mobile-hamburger"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: isLightSection ? 'rgba(242, 235, 224, 0.97)' : 'rgba(17, 33, 48, 0.97)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            zIndex: 99,
          }}
        >
          {navigationConfig.links.map((item) => (
            <a
              key={`mobile-${item.label}-${item.target}`}
              href={item.target}
              onClick={(e) => handleNavClick(e, item.target)}
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '28px',
                fontWeight: 400,
                color: baseTextColor,
                letterSpacing: '2px',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = hoverTextColor; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = baseTextColor; }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* CSS for mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
          nav > div { padding: 10px 16px !important; }
        }
      `}</style>
    </nav>
  );
}


