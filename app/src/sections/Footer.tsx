import { footerConfig, navigationConfig } from '../config';

export default function Footer() {
  const hasFooterContent =
    footerConfig.ageGateText ||
    footerConfig.brandName ||
    footerConfig.brandTaglineLines.length > 0 ||
    footerConfig.columns.length > 0 ||
    footerConfig.copyright;

  if (!hasFooterContent) {
    return null;
  }

  return (
    <footer
      style={{
        backgroundColor: '#E8E0D5',
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid rgba(17, 33, 48, 0.1)',
      }}
    >
      {/* Age Gate */}
      <div
        style={{
          textAlign: 'center',
          padding: '80px 24px 60px',
        }}
      >
        {footerConfig.ageGateText && (
          <p
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#112130',
              lineHeight: 1.3,
              maxWidth: '500px',
              margin: '0 auto',
              textWrap: 'balance',
            }}
          >
            {footerConfig.ageGateText}
          </p>
        )}
      </div>

      {/* Brand Section — full width boven de columns */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 40px',
          textAlign: 'center',
        }}
      >
        {navigationConfig.logoPath && (
          <img
            src={navigationConfig.logoPath}
            alt={footerConfig.brandName}
            style={{
              height: '80px',
              width: 'auto',
              maxWidth: '240px',
              objectFit: 'contain',
              margin: '0 auto 12px',
              display: 'block',
            }}
          />
        )}
        {footerConfig.brandName && (
          <p
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(22px, 4vw, 28px)',
              fontWeight: 600,
              color: '#112130',
              letterSpacing: '2px',
              marginBottom: '8px',
              overflowWrap: 'break-word',
              wordWrap: 'break-word',
            }}
          >
            {footerConfig.brandName}
          </p>
        )}
        {footerConfig.brandTaglineLines.length > 0 && (
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '13px',
              fontWeight: 400,
              lineHeight: 1.6,
              color: '#A89080',
            }}
          >
            {footerConfig.brandTaglineLines.join(' · ')}
          </p>
        )}
      </div>

      {/* Columns — NAVIGATIE, DIENSTEN, CONTACT naast elkaar */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(12px, 3vw, 48px)',
        }}
      >

        {footerConfig.columns.map((column) => (
          <div key={column.heading}>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: '#D4A574',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              {column.heading}
            </p>
            {column.links.map((item) => (
              <a
                key={`${column.heading}-${item.label}`}
                href={item.href}
                onClick={(e) => {
                  if (!item.href || item.href === '#') e.preventDefault();
                }}
                style={{
                  display: 'block',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#A89080',
                  textDecoration: 'none',
                  marginBottom: '10px',
                  transition: 'color 0.4s ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = '#112130'; }}
                onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = '#696969'; }}
              >
                {item.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid rgba(17, 33, 48, 0.08)',
          padding: '24px',
          textAlign: 'center',
        }}
      >
        {footerConfig.copyright && (
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              color: '#696969',
              letterSpacing: '0.5px',
            }}
          >
            {footerConfig.copyright}
          </p>
        )}
      </div>
    </footer>
  );
}

