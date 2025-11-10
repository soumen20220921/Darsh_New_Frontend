import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceBookingPage from './ServiceBookingPage';
import DoctorBookingPage from './DoctorBookingPage';
import BeautyBookingPage from './BeautyBookingPage';
import AstrologerBookingPage from './AstrologerBookingPage';

const ServiceBookingLayout = () => {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const handleServiceClick = (service) => {
    window.scrollTo(0,0);
    setSelectedService(service);
  };

  const handleBackToServices = () => {
    setSelectedService(null);
  };

  const renderBookingPage = () => {
    if (!selectedService) return null;

    switch (selectedService.category) {
      case 'healthcare':
        return <DoctorBookingPage service={selectedService} onBack={handleBackToServices} />;
      case 'beauty':
        return <BeautyBookingPage service={selectedService} onBack={handleBackToServices} />;
      case 'astrology':
        return <AstrologerBookingPage service={selectedService} onBack={handleBackToServices} />;
      default:
        return <DoctorBookingPage service={selectedService} onBack={handleBackToServices} />;
    }
  };

  return (
    <div>
      {!selectedService ? (
        <ServiceBookingPage onServiceClick={handleServiceClick} />
      ) : (
        renderBookingPage()
      )}
    </div>
  );
};

export default ServiceBookingLayout;