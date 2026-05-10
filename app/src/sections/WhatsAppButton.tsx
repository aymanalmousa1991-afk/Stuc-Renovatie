import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '31640093526';
  const message = encodeURIComponent('Hallo, ik ben geïnteresseerd in een offerte voor stuc- of renovatiewerk.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000,
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 24px rgba(37, 211, 102, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 211, 102, 0.3)';
      }}
      aria-label="WhatsApp ons"
    >
      <MessageCircle size={28} color="#FFFFFF" fill="#FFFFFF" />
    </a>
  );
}
