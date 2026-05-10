import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import { useLenis } from './hooks/useLenis';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Manifesto from './sections/Manifesto';
import Anatomy from './sections/Anatomy';
import Tiers from './sections/Tiers';
import Reviews from './sections/Reviews';
import QuoteForm from './sections/QuoteForm';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import WhatsAppButton from './sections/WhatsAppButton';
import ParchmentUnroll from './effects/ParchmentUnroll';
import { siteConfig } from './config';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';

function HomePage() {
  useLenis();

  useEffect(() => {
    document.title = siteConfig.siteTitle || '';
    document.documentElement.lang = siteConfig.language || '';

    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = siteConfig.siteDescription || '';
  }, []);

  return (
    <>
      <Navigation />
      <ParchmentUnroll />
      <main>
        <Hero />
        <Manifesto />
        <Anatomy />
        <Tiers />
        <Reviews />
        <QuoteForm />
        <Contact />
        <Footer />
      </main>
      <WhatsAppButton />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
