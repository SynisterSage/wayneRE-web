import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Seo } from '../utils/seo.js';

export default function TestimonialsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/#testimonials', { replace: true });
  }, [navigate]);

  return (
    <>
      <Seo
        title="Testimonials — Starlet Ferguson"
        description="Client testimonials from Wayne and Packanack Lake homeowners."
        path="/testimonials"
        noIndex
      />
    </>
  );
}
