import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/providers/trpc';
import {
  LayoutDashboard,
  FolderOpen,
  Star,
  FileText,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  ChevronLeft,
  X,
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

type Tab = 'dashboard' | 'projects' | 'reviews' | 'quotes';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isLoading, logout } = useAuth({ redirectOnUnauthenticated: true });
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    amenities: '',
    status: 'active' as 'active' | 'draft' | 'archived',
  });

  const [reviewForm, setReviewForm] = useState({
    name: '',
    location: '',
    quote: '',
    rating: 5,
    status: 'active' as 'active' | 'draft' | 'archived',
  });

  // tRPC queries
  const utils = trpc.useUtils();
  const { data: projectsData } = trpc.project.list.useQuery();
  const { data: reviewsData } = trpc.review.list.useQuery();
  const { data: quotesData } = trpc.quote.list.useQuery(undefined, {
    enabled: !!user && user.role === 'admin',
    retry: false,
  });

  // Mutations
  const createProject = trpc.project.create.useMutation({
    onSuccess: () => {
      utils.project.list.invalidate();
      toast.success('Project aangemaakt!');
      setShowForm(false);
      resetForms();
    },
    onError: (e) => toast.error(e.message),
  });

  const updateProject = trpc.project.update.useMutation({
    onSuccess: () => {
      utils.project.list.invalidate();
      toast.success('Project bijgewerkt!');
      setShowForm(false);
      setEditingId(null);
      resetForms();
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteProject = trpc.project.delete.useMutation({
    onSuccess: () => {
      utils.project.list.invalidate();
      toast.success('Project verwijderd!');
    },
    onError: (e) => toast.error(e.message),
  });

  const createReview = trpc.review.create.useMutation({
    onSuccess: () => {
      utils.review.list.invalidate();
      toast.success('Review aangemaakt!');
      setShowForm(false);
      resetForms();
    },
    onError: (e) => toast.error(e.message),
  });

  const updateReview = trpc.review.update.useMutation({
    onSuccess: () => {
      utils.review.list.invalidate();
      toast.success('Review bijgewerkt!');
      setShowForm(false);
      setEditingId(null);
      resetForms();
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteReview = trpc.review.delete.useMutation({
    onSuccess: () => {
      utils.review.list.invalidate();
      toast.success('Review verwijderd!');
    },
    onError: (e) => toast.error(e.message),
  });

  const updateQuote = trpc.quote.update.useMutation({
    onSuccess: () => {
      utils.quote.list.invalidate();
      toast.success('Offerte bijgewerkt!');
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteQuote = trpc.quote.delete.useMutation({
    onSuccess: () => {
      utils.quote.list.invalidate();
      toast.success('Offerte verwijderd!');
    },
    onError: (e) => toast.error(e.message),
  });

  const resetForms = () => {
    setProjectForm({
      title: '',
      category: '',
      description: '',
      image: '',
      amenities: '',
      status: 'active',
    });
    setReviewForm({
      name: '',
      location: '',
      quote: '',
      rating: 5,
      status: 'active',
    });
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#F8F9FA' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', color: '#112130' }}>Laden...</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#F8F9FA', gap: '16px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', color: '#112130' }}>Geen toegang tot dit dashboard.</p>
        <button onClick={() => navigate('/')} className="btn-primary">Terug naar home</button>
      </div>
    );
  }

  const sidebarItems: { tab: Tab; label: string; icon: React.ReactNode }[] = [
    { tab: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { tab: 'projects', label: 'Projecten', icon: <FolderOpen size={18} /> },
    { tab: 'reviews', label: 'Reviews', icon: <Star size={18} /> },
    { tab: 'quotes', label: 'Offertes', icon: <FileText size={18} /> },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#3B82F6';
      case 'in_progress': return '#F59E0B';
      case 'completed': return '#10B981';
      case 'cancelled': return '#EF4444';
      case 'active': return '#10B981';
      case 'draft': return '#F59E0B';
      case 'archived': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'Nieuw';
      case 'in_progress': return 'Bezig';
      case 'completed': return 'Afgerond';
      case 'cancelled': return 'Geannuleerd';
      case 'active': return 'Actief';
      case 'draft': return 'Concept';
      case 'archived': return 'Gearchiveerd';
      default: return status;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F9FA' }}>
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside
        style={{
          width: '240px',
          backgroundColor: '#112130',
          color: '#F2EBE0',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 0',
          position: 'fixed',
          height: '100vh',
        }}
      >
        <div style={{ padding: '0 24px 32px' }}>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '18px',
              fontWeight: 500,
              color: '#F2EBE0',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Admin
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#A89080', marginTop: '4px' }}>
            {user.name || user.email}
          </p>
        </div>

        <nav style={{ flex: 1 }}>
          {sidebarItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => { setActiveTab(item.tab); setShowForm(false); setEditingId(null); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 24px',
                background: activeTab === item.tab ? 'rgba(212, 165, 116, 0.15)' : 'transparent',
                border: 'none',
                color: activeTab === item.tab ? '#D4A574' : '#F2EBE0',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '0 24px' }}>
          <button
            onClick={() => logout()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 0',
              background: 'transparent',
              border: 'none',
              color: '#A89080',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#F2EBE0'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#A89080'; }}
          >
            <LogOut size={18} />
            Uitloggen
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '32px 40px' }}>
        {/* Top Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'transparent',
                border: '1px solid rgba(17, 33, 48, 0.15)',
                borderRadius: '2px',
                padding: '8px 16px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: '#112130',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <ChevronLeft size={16} />
              Terug naar site
            </button>
            <h1
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '32px',
                fontWeight: 500,
                color: '#112130',
              }}
            >
              {sidebarItems.find((i) => i.tab === activeTab)?.label}
            </h1>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
                marginBottom: '32px',
              }}
            >
              {[
                { label: 'Totaal Projecten', value: projectsData?.length || 0, icon: <FolderOpen size={24} color="#D4A574" /> },
                { label: 'Open Offertes', value: quotesData?.filter((q) => q.status === 'new').length || 0, icon: <FileText size={24} color="#D4A574" /> },
                { label: 'Reviews', value: reviewsData?.length || 0, icon: <Star size={24} color="#D4A574" /> },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '2px',
                    padding: '24px',
                    boxShadow: '0 2px 12px rgba(17, 33, 48, 0.06)',
                  }}
                >
                  <div style={{ marginBottom: '12px' }}>{stat.icon}</div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '28px', fontWeight: 600, color: '#112130' }}>
                    {stat.value}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#A89080' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Quotes Table */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '2px',
                padding: '24px',
                boxShadow: '0 2px 12px rgba(17, 33, 48, 0.06)',
                marginBottom: '24px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#112130',
                  marginBottom: '16px',
                }}
              >
                Recent Offertes
              </h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(17, 33, 48, 0.08)' }}>
                    <th style={{ textAlign: 'left', padding: '10px 0', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Naam</th>
                    <th style={{ textAlign: 'left', padding: '10px 0', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Telefoon</th>
                    <th style={{ textAlign: 'left', padding: '10px 0', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quotesData?.slice(0, 5).map((quote) => (
                    <tr key={quote.id} style={{ borderBottom: '1px solid rgba(17, 33, 48, 0.04)' }}>
                      <td style={{ padding: '10px 0', fontSize: '13px', color: '#112130' }}>{quote.name}</td>
                      <td style={{ padding: '10px 0', fontSize: '13px', color: '#A89080' }}>{quote.phone}</td>
                      <td style={{ padding: '10px 0' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '4px 10px',
                            borderRadius: '2px',
                            backgroundColor: `${getStatusColor(quote.status)}15`,
                            color: getStatusColor(quote.status),
                          }}
                        >
                          {getStatusLabel(quote.status)}
                        </span>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={3} style={{ padding: '20px 0', textAlign: 'center', color: '#A89080', fontSize: '13px' }}>
                        Geen offertes gevonden
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
              <button
                onClick={() => { setShowForm(true); setEditingId(null); resetForms(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: '#112130',
                  color: '#F2EBE0',
                  border: 'none',
                  borderRadius: '2px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <Plus size={16} />
                Nieuw Project
              </button>
            </div>

            {showForm && (
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '2px',
                  padding: '24px',
                  boxShadow: '0 2px 12px rgba(17, 33, 48, 0.06)',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: '#112130' }}>
                    {editingId ? 'Project Bewerken' : 'Nieuw Project'}
                  </h3>
                  <button onClick={() => { setShowForm(false); setEditingId(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={20} color="#A89080" />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (editingId) {
                      updateProject.mutate({ id: editingId, ...projectForm });
                    } else {
                      createProject.mutate(projectForm);
                    }
                  }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}
                >
                  <input placeholder="Titel" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} required style={{ padding: '10px 12px', border: '1px solid rgba(17,33,48,0.15)', borderRadius: '2px', fontSize: '13px' }} />
                  <input placeholder="Categorie" value={projectForm.category} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })} required style={{ padding: '10px 12px', border: '1px solid rgba(17,33,48,0.15)', borderRadius: '2px', fontSize: '13px' }} />
                  <textarea placeholder="Beschrijving" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} rows={3} style={{ gridColumn: 'span 2', padding: '10px 12px', border: '1px solid rgba(17,33,48,0.15)', borderRadius: '2px', fontSize: '13px' }} />
                  <input placeholder="Afbeelding URL" value={projectForm.image} onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })} style={{ padding: '10px 12px', border: '1px solid rgba(17,33,48,0.15)', borderRadius: '2px', fontSize: '13px' }} />
                  <input placeholder="Amenities (komma gescheiden)" value={projectForm.amenities} onChange={(e) => setProjectForm({ ...projectForm, amenities: e.target.value })} style={{ padding: '10px 12px', border: '1px solid rgba(17,33,48,0.15)', borderRadius: '2px', fontSize: '13px' }} />
                  <select value={projectForm.status} onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value as 'active' | 'draft' | 'archived' })} style={{ padding: '10px 12px', border: '1px solid rgba(17,33,48,0.15)', borderRadius: '2px', fontSize: '13px' }}>
                    <option value="active">Actief</option>
                    <option value="draft">Concept</option>
                    <option value="archived">Gearchiveerd</option>
                  </select>
                  <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#112130', color: '#F2EBE0', border: 'none', borderRadius: '2px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    {editingId ? 'Bijwerken' : 'Aanmaken'}
                  </button>
                </form>
              </div>
            )}

            <div style={{ background: '#FFFFFF', borderRadius: '2px', boxShadow: '0 2px 12px rgba(17, 33, 48, 0.06)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid rgba(17, 33, 48, 0.08)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Titel</th>
                    <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Categorie</th>
                    <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                    <th style={{ textAlign: 'right', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {projectsData?.map((project) => (
                    <tr key={project.id} style={{ borderBottom: '1px solid rgba(17, 33, 48, 0.04)' }}>
                      <td style={{ padding: '12px 24px', fontSize: '13px', color: '#112130' }}>{project.title}</td>
                      <td style={{ padding: '12px 24px', fontSize: '13px', color: '#A89080' }}>{project.category}</td>
                      <td style={{ padding: '12px 24px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '2px', backgroundColor: `${getStatusColor(project.status)}15`, color: getStatusColor(project.status) }}>
                          {getStatusLabel(project.status)}
                        </span>
                      </td>
                      <td style={{ padding: '12px 24px', textAlign: 'right' }}>
                        <button
                          onClick={() => {
                            setEditingId(project.id);
                            setProjectForm({
                              title: project.title,
                              category: project.category,
                              description: project.description || '',
                              image: project.image || '',
                              amenities: project.amenities || '',
                              status: project.status as 'active' | 'draft' | 'archived',
                            });
                            setShowForm(true);
                          }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '8px' }}
                        >
                          <Edit3 size={16} color="#A89080" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Weet u zeker dat u dit project wilt verwijderen?')) {
                              deleteProject.mutate({ id: project.id });
                            }
                          }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          <Trash2 size={16} color="#EF4444" />
                        </button>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={4} style={{ padding: '40px 24px', textAlign: 'center', color: '#A89080', fontSize: '13px' }}>
                        Geen projecten gevonden
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
              <button
                onClick={() => { setShowForm(true); setEditingId(null); resetForms(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  backgroundColor: '#112130',
                  color: '#F2EBE0',
                  border: 'none',
                  borderRadius: '2px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Plus size={16} />
                Nieuwe Review
              </button>
            </div>

            {showForm && (
              <div style={{ background: '#FFFFFF', borderRadius: '2px', padding: '24px', boxShadow: '0 2px 12px rgba(17, 33, 48, 0.06)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 600, color: '#112130' }}>
                    {editingId ? 'Review Bewerken' : 'Nieuwe Review'}
                  </h3>
                  <button onClick={() => { setShowForm(false); setEditingId(null); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <X size={20} color="#A89080" />
                  </button>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (editingId) {
                      updateReview.mutate({ id: editingId, ...reviewForm });
                    } else {
                      createReview.mutate(reviewForm);
                    }
                  }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}
                >
                  <input placeholder="Naam" value={reviewForm.name} onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })} required style={{ padding: '10px 12px', border: '1px solid rgba(17,33,48,0.15)', borderRadius: '2px', fontSize: '13px' }} />
                  <input placeholder="Locatie" value={reviewForm.location} onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })} style={{ padding: '10px 12px', border: '1px solid rgba(17,33,48,0.15)', borderRadius: '2px', fontSize: '13px' }} />
                  <textarea placeholder="Review tekst" value={reviewForm.quote} onChange={(e) => setReviewForm({ ...reviewForm, quote: e.target.value })} required rows={3} style={{ gridColumn: 'span 2', padding: '10px 12px', border: '1px solid rgba(17,33,48,0.15)', borderRadius: '2px', fontSize: '13px' }} />
                  <select value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })} style={{ padding: '10px 12px', border: '1px solid rgba(17,33,48,0.15)', borderRadius: '2px', fontSize: '13px' }}>
                    {[1, 2, 3, 4, 5].map((r) => <option key={r} value={r}>{r} sterren</option>)}
                  </select>
                  <select value={reviewForm.status} onChange={(e) => setReviewForm({ ...reviewForm, status: e.target.value as 'active' | 'draft' | 'archived' })} style={{ padding: '10px 12px', border: '1px solid rgba(17,33,48,0.15)', borderRadius: '2px', fontSize: '13px' }}>
                    <option value="active">Actief</option>
                    <option value="draft">Concept</option>
                    <option value="archived">Gearchiveerd</option>
                  </select>
                  <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#112130', color: '#F2EBE0', border: 'none', borderRadius: '2px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    {editingId ? 'Bijwerken' : 'Aanmaken'}
                  </button>
                </form>
              </div>
            )}

            <div style={{ background: '#FFFFFF', borderRadius: '2px', boxShadow: '0 2px 12px rgba(17, 33, 48, 0.06)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid rgba(17, 33, 48, 0.08)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Naam</th>
                    <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Review</th>
                    <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                    <th style={{ textAlign: 'right', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewsData?.map((review) => (
                    <tr key={review.id} style={{ borderBottom: '1px solid rgba(17, 33, 48, 0.04)' }}>
                      <td style={{ padding: '12px 24px', fontSize: '13px', color: '#112130' }}>
                        {review.name}
                        <br />
                        <span style={{ fontSize: '11px', color: '#A89080' }}>{review.location}</span>
                      </td>
                      <td style={{ padding: '12px 24px', fontSize: '13px', color: '#112130', maxWidth: '300px' }}>
                        <span style={{ display: 'flex', gap: '2px', marginBottom: '4px' }}>
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} size={12} fill="#D4A574" color="#D4A574" />
                          ))}
                        </span>
                        {review.quote}
                      </td>
                      <td style={{ padding: '12px 24px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '2px', backgroundColor: `${getStatusColor(review.status)}15`, color: getStatusColor(review.status) }}>
                          {getStatusLabel(review.status)}
                        </span>
                      </td>
                      <td style={{ padding: '12px 24px', textAlign: 'right' }}>
                        <button
                          onClick={() => {
                            setEditingId(review.id);
                            setReviewForm({
                              name: review.name,
                              location: review.location || '',
                              quote: review.quote,
                              rating: review.rating,
                              status: review.status as 'active' | 'draft' | 'archived',
                            });
                            setShowForm(true);
                          }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '8px' }}
                        >
                          <Edit3 size={16} color="#A89080" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Weet u zeker dat u deze review wilt verwijderen?')) {
                              deleteReview.mutate({ id: review.id });
                            }
                          }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                          <Trash2 size={16} color="#EF4444" />
                        </button>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={4} style={{ padding: '40px 24px', textAlign: 'center', color: '#A89080', fontSize: '13px' }}>
                        Geen reviews gevonden
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quotes Tab */}
        {activeTab === 'quotes' && (
          <div>
            <div style={{ background: '#FFFFFF', borderRadius: '2px', boxShadow: '0 2px 12px rgba(17, 33, 48, 0.06)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid rgba(17, 33, 48, 0.08)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Naam</th>
                    <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>E-mail</th>
                    <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Telefoon</th>
                    <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Dienst</th>
                    <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Bericht</th>
                    <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Datum</th>
                    <th style={{ textAlign: 'left', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Status</th>
                    <th style={{ textAlign: 'right', padding: '12px 24px', fontSize: '11px', fontWeight: 600, color: '#A89080', textTransform: 'uppercase', letterSpacing: '1px' }}>Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {quotesData?.map((quote) => (
                    <tr key={quote.id} style={{ borderBottom: '1px solid rgba(17, 33, 48, 0.04)' }}>
                      <td style={{ padding: '12px 24px', fontSize: '13px', color: '#112130', fontWeight: 600 }}>{quote.name}</td>
                      <td style={{ padding: '12px 24px', fontSize: '12px', color: '#3B82F6' }}>{quote.email}</td>
                      <td style={{ padding: '12px 24px', fontSize: '13px', color: '#112130' }}>{quote.phone}</td>
                      <td style={{ padding: '12px 24px', fontSize: '13px', color: '#112130' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '2px', backgroundColor: 'rgba(212, 165, 116, 0.15)', color: '#D4A574' }}>
                          {quote.serviceType}
                        </span>
                      </td>
                      <td style={{ padding: '12px 24px', fontSize: '12px', color: '#A89080', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                        title={quote.message || ''}>
                        {quote.message || '-'}
                      </td>
                      <td style={{ padding: '12px 24px', fontSize: '12px', color: '#A89080', whiteSpace: 'nowrap' }}>
                        {quote.createdAt ? new Date(quote.createdAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '-'}
                      </td>
                      <td style={{ padding: '12px 24px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '2px', backgroundColor: `${getStatusColor(quote.status)}15`, color: getStatusColor(quote.status) }}>
                          {getStatusLabel(quote.status)}
                        </span>
                      </td>
                      <td style={{ padding: '12px 24px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <select
                          value={quote.status}
                          onChange={(e) => updateQuote.mutate({ id: quote.id, status: e.target.value as 'new' | 'in_progress' | 'completed' | 'cancelled' })}
                          style={{ padding: '6px 10px', border: '1px solid rgba(17,33,48,0.15)', borderRadius: '2px', fontSize: '11px', marginRight: '8px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
                        >
                          <option value="new">Nieuw</option>
                          <option value="in_progress">Bezig</option>
                          <option value="completed">Afgerond</option>
                          <option value="cancelled">Geannuleerd</option>
                        </select>
                        <button
                          onClick={() => {
                            if (confirm('Weet u zeker dat u deze offerte wilt verwijderen?')) {
                              deleteQuote.mutate({ id: quote.id });
                            }
                          }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', verticalAlign: 'middle' }}
                        >
                          <Trash2 size={16} color="#EF4444" />
                        </button>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={8} style={{ padding: '40px 24px', textAlign: 'center', color: '#A89080', fontSize: '13px' }}>
                        Geen offertes gevonden
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
