import React, { useEffect, useState } from 'react';
import './Services.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

export default function Services({ standalone }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const apiUrl = BACKEND_URL ? `${BACKEND_URL}/api/services/` : '/api/services/';
    fetch(apiUrl)
      .then((r) => r.json())
      .then((data) => { setServices(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  // Rest of your component remains the same...
}
