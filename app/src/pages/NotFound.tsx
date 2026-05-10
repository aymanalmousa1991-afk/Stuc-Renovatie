import { Link } from "react-router";

export function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2EBE0',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '120px',
            fontWeight: 400,
            color: '#112130',
            lineHeight: 1,
            marginBottom: '16px',
          }}
        >
          404
        </p>
        <p
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '14px',
            color: '#A89080',
            marginBottom: '32px',
          }}
        >
          Pagina niet gevonden
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            color: '#F2EBE0',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '14px 32px',
            backgroundColor: '#112130',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#D4A574';
            e.currentTarget.style.color = '#112130';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#112130';
            e.currentTarget.style.color = '#F2EBE0';
          }}
        >
          Terug naar home
        </Link>
      </div>
    </div>
  );
}
