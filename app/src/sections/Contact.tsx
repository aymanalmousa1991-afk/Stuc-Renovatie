import { MapPin, Phone, Mail } from 'lucide-react';
import { contactConfig } from '../config';

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#FFFFFF',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Contact Info Bar */}
      <div
        style={{
          backgroundColor: '#112130',
          padding: '60px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            textAlign: 'center',
          }}
        >
          {/* Address */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 165, 116, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MapPin size={20} color="#D4A574" />
            </div>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: '#D4A574',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              Adres
            </p>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#F2EBE0',
                lineHeight: 1.6,
              }}
            >
              {contactConfig.address}
              <br />
              {contactConfig.postalCode}
            </p>
          </div>

          {/* Phone */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 165, 116, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Phone size={20} color="#D4A574" />
            </div>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: '#D4A574',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              Telefoon
            </p>
            <a
              href={`tel:${contactConfig.phone}`}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#F2EBE0',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#D4A574'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#F2EBE0'; }}
            >
              {contactConfig.phone}
            </a>
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 165, 116, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Mail size={20} color="#D4A574" />
            </div>
            <p
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                color: '#D4A574',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              E-mail
            </p>
            <a
              href={`mailto:${contactConfig.email}`}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#F2EBE0',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#D4A574'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#F2EBE0'; }}
            >
              {contactConfig.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
