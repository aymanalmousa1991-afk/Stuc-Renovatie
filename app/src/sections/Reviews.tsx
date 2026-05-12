import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { reviewsConfig } from '../config';
import { trpc } from '@/providers/trpc';
import { Toaster, toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function Reviews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Haal ook dynamische reviews uit de database
  const { data: dbReviews = [] } = trpc.review.list.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Combineer statische (config) en dynamische (database) reviews, filter alleen actieve
  const allReviews = [
    ...reviewsConfig.reviews.map((r) => ({ ...r, id: `static-${r.name}`, status: 'active' as const })),
    ...(dbReviews || [])
      .filter((r) => r.status === 'active')
      .map((r) => ({ quote: r.quote, name: r.name, location: r.location || '', rating: r.rating, id: `db-${r.id}`, status: 'active' as const })),
  ];

  // Review form state
  const [form, setForm] = useState({ name: '', location: '', quote: '', rating: 5 });
  const [showForm, setShowForm] = useState(false);

  const createReview = trpc.review.create.useMutation({
    onSuccess: () => {
      toast.success('Bedankt voor uw review!');
      setForm({ name: '', location: '', quote: '', rating: 5 });
      setShowForm(false);
    },
    onError: (e) => toast.error(e.message),
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.review-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
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

  // Auto-scroll
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % allReviews.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [allReviews.length]);

  const handlePrev = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveIndex((prev) => (prev - 1 + allReviews.length) % allReviews.length);
  };

  const handleNext = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveIndex((prev) => (prev + 1) % allReviews.length);
  };

  const handleDotClick = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveIndex(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReview.mutate({
      name: form.name,
      location: form.location || undefined,
      quote: form.quote,
      rating: form.rating,
    });
  };

  if (!reviewsConfig.sectionLabel && !reviewsConfig.title && allReviews.length === 0) {
    return null;
  }

  return (
    <section
      id="reviews"
      ref={sectionRef}
      style={{
        backgroundColor: '#F2EBE0',
        position: 'relative',
        zIndex: 2,
        padding: '100px 0 80px',
      }}
    >
      <Toaster position="top-right" />

      {/* Section Header */}
      <div style={{ textAlign: 'center', padding: '0 24px 60px' }}>
        {reviewsConfig.sectionLabel && (
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
            {reviewsConfig.sectionLabel}
          </p>
        )}
        {reviewsConfig.title && (
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(30px, 5vw, 42px)',
              fontWeight: 500,
              lineHeight: 1.2,
              color: '#112130',
            }}
          >
            {reviewsConfig.title}
          </h2>
        )}
        {/* Toggle review form button */}
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            color: '#D4A574',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            background: 'none',
            border: '1px solid rgba(212, 165, 116, 0.4)',
            padding: '10px 24px',
            marginTop: '20px',
            cursor: 'pointer',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#D4A574'; e.currentTarget.style.color = '#FFFFFF'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#D4A574'; }}
        >
          {showForm ? 'Sluit formulier' : 'Plaats een review'}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto 60px',
            padding: '32px',
            backgroundColor: '#FFFFFF',
            borderRadius: '2px',
            boxShadow: '0 4px 24px rgba(17, 33, 48, 0.06)',
          }}
        >
          <h3
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '24px',
              fontWeight: 500,
              color: '#112130',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            Deel uw ervaring
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <input
                type="text"
                placeholder="Uw naam *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                style={{
                  padding: '12px 14px',
                  border: '1px solid rgba(17, 33, 48, 0.15)',
                  borderRadius: '2px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: '#112130',
                }}
              />
              <input
                type="text"
                placeholder="Locatie (bijv. Nijmegen)"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                style={{
                  padding: '12px 14px',
                  border: '1px solid rgba(17, 33, 48, 0.15)',
                  borderRadius: '2px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: '#112130',
                }}
              />
            </div>
            <textarea
              placeholder="Uw review *"
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              required
              rows={3}
              style={{
                padding: '12px 14px',
                border: '1px solid rgba(17, 33, 48, 0.15)',
                borderRadius: '2px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                color: '#112130',
                resize: 'vertical',
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#A89080' }}>Beoordeling:</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setForm({ ...form, rating: r })}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
                  >
                    <Star size={20} fill={r <= form.rating ? '#D4A574' : 'rgba(17,33,48,0.15)'} color={r <= form.rating ? '#D4A574' : 'rgba(17,33,48,0.15)'} />
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              disabled={createReview.isPending}
              style={{
                padding: '12px 24px',
                backgroundColor: '#112130',
                color: '#F2EBE0',
                border: 'none',
                borderRadius: '2px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: createReview.isPending ? 0.7 : 1,
              }}
            >
              {createReview.isPending ? 'Verzenden...' : 'Review plaatsen'}
            </button>
          </form>
        </div>
      )}

      {/* Reviews Carousel */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
        }}
      >
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#FFFFFF',
            border: '1px solid rgba(17, 33, 48, 0.1)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
            boxShadow: '0 2px 12px rgba(17, 33, 48, 0.08)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#112130';
            e.currentTarget.style.color = '#F2EBE0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.color = '#112130';
          }}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#FFFFFF',
            border: '1px solid rgba(17, 33, 48, 0.1)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2,
            boxShadow: '0 2px 12px rgba(17, 33, 48, 0.08)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#112130';
            e.currentTarget.style.color = '#F2EBE0';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.color = '#112130';
          }}
        >
          <ChevronRight size={20} />
        </button>

        {/* Cards Container — horizontaal scrollen op mobile */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            overflow: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '8px',
          }}
        >
          {allReviews.map((review, i) => (
            <div
              key={'id' in review ? review.id : i}
              className="review-card"
              style={{
                flex: '0 0 calc(33.333% - 16px)',
                minWidth: '280px',
                backgroundColor: '#FFFFFF',
                padding: 'clamp(24px, 3vw, 40px)',
                borderRadius: '2px',
                boxShadow: '0 4px 24px rgba(17, 33, 48, 0.06)',
                scrollSnapAlign: 'start',
                opacity: i >= activeIndex && i < activeIndex + 3 ? 1 : 0.5,
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                {Array.from({ length: review.rating }).map((_, si) => (
                  <Star key={si} size={16} fill="#D4A574" color="#D4A574" />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '18px',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#112130',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                }}
              >
                "{review.quote}"
              </p>

              {/* Name */}
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#112130',
                  marginBottom: '4px',
                }}
              >
                {review.name}
              </p>

              {/* Location */}
              <p
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#A89080',
                }}
              >
                {review.location}
              </p>
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '40px',
          }}
        >
          {allReviews.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: i === activeIndex ? '#D4A574' : 'rgba(17, 33, 48, 0.2)',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
