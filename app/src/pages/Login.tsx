import { useState } from 'react';
import { useNavigate } from 'react-router';
import { trpc } from '@/providers/trpc';
import { Toaster, toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      toast.success('Ingelogd!');
      navigate('/admin');
    },
    onError: (e) => toast.error(e.message),
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      toast.success('Account aangemaakt! Je kunt nu inloggen.');
      setIsRegister(false);
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      registerMutation.mutate({ email, password });
    } else {
      loginMutation.mutate({ email, password });
    }
  };

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
      <Toaster position="top-right" />
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '2px',
          boxShadow: '0 4px 24px rgba(17, 33, 48, 0.08)',
          border: '1px solid rgba(17, 33, 48, 0.08)',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div style={{ textAlign: 'center', padding: '32px 32px 16px' }}>
          <p
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              color: '#D4A574',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            STUC- & RENOVATIEBEDRIJF
          </p>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '28px',
              fontWeight: 500,
              color: '#112130',
            }}
          >
            {isRegister ? 'Account Aanmaken' : 'Admin Login'}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ padding: '16px 32px 32px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, color: '#A89080', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@admin.com"
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid rgba(17, 33, 48, 0.15)',
                borderRadius: '2px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#112130',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, color: '#A89080', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              Wachtwoord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={isRegister ? "Minimaal 6 tekens" : "••••••••"}
              minLength={6}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid rgba(17, 33, 48, 0.15)',
                borderRadius: '2px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#112130',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending || registerMutation.isPending}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#112130',
              color: '#F2EBE0',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              borderRadius: '2px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: loginMutation.isPending || registerMutation.isPending ? 0.7 : 1,
              marginTop: '8px',
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
            {loginMutation.isPending || registerMutation.isPending
              ? 'Bezig...'
              : isRegister
                ? 'Account Aanmaken'
                : 'Inloggen'}
          </button>

          <p style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#A89080', marginTop: '8px' }}>
            {isRegister ? (
              <>Heb je al een account?{' '}
                <button type="button" onClick={() => setIsRegister(false)} style={{ background: 'none', border: 'none', color: '#D4A574', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}>
                  Inloggen
                </button>
              </>
            ) : (
              <>Nog geen account?{' '}
                <button type="button" onClick={() => setIsRegister(true)} style={{ background: 'none', border: 'none', color: '#D4A574', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'Inter, sans-serif', fontSize: '12px' }}>
                  Account aanmaken
                </button>
              </>
            )}
          </p>

          <p style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#A89080' }}>
            Demo: admin@admin.com / admin123
          </p>
        </form>
      </div>
    </div>
  );
}
