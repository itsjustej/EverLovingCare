import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Users, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  Shield, 
  Clock, 
  Award,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Star,
  ExternalLink,
  Salad, ClipboardCheck, Globe, Handshake, AlertTriangle, 
} from 'lucide-react';
import emailjs from '@emailjs/browser';


function App() {

  const [currentPage, setCurrentPage] = useState('home');
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const carouselImages = [
    { url: '\\Screenshot 2025-06-23 150047.png'
  }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navigateToPage = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  

  const renderNavigation = () => (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm shadow-2xl z-50 transition-all duration-300 border-b border--yellow500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button 
            onClick={() => navigateToPage('home')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center">
              <img src="/Logo.png"
              alt="Ever Loving Care Logo"
              className="h-12 w-auto"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-yellow-400 italic font-bold">Ever Loving Care</span>
              <span className="text-xs text-gray-400 tracking-wider uppercase">Home Away From Home</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'services', label: 'Services', icon: Users },
              { id: 'employment', label: 'Employee', icon: Briefcase },
              { id: 'contact', label: 'Contact', icon: Mail }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => navigateToPage(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === id
                    ? 'bg-yellow-500/20 text-yellow-400 shadow-lg border border-yellow-500/30'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-yellow-400'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'services', label: 'Services', icon: Users },
              { id: 'employee', label: 'Employee', icon: Briefcase },
              { id: 'contact', label: 'Contact', icon: Mail }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => navigateToPage(id)}
                className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-800 hover:text-yellow-400 transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );

  const renderHomePage = () => (
    <div className="pt-20">
      {/* Hero Carousel */}
      <div className="relative md:h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
        
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.caption}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 backdrop-blur-sm text-yellow-400 p-3 rounded-full hover:bg-black/60 transition-all duration-300 border border-yellow-500/30"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 backdrop-blur-sm text-yellow-400 p-3 rounded-full hover:bg-black/60 transition-all duration-300 border border-yellow-500/30"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-yellow-400' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        
      </div>

      <div className="text-center mb-2 px-4 sm:px-6 lg:px-8">
  <h2 className="text-4xl font-bold text-white pt-10 mb-6">About Our Community</h2>
  <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
    Ever Loving Care is located in <span className="text-yellow-400 font-medium">Nolen Farm</span>,
    a peaceful new home community nestled in the South Gastonia and Belmont area.
    Our residents enjoy <span className="text-yellow-400 font-medium">resort-style amenities</span> including a clubhouse with pool,
    walking trails, a pickleball court, and a playground — all designed to promote wellness and recreation.
    <br /><br />
    Conveniently situated near both Belmont and Charlotte, our home offers quick access to
    Lake Wylie, Martha Rivers Park, Crowders Mountain State Park, and other nearby attractions,
    providing the perfect balance of nature and convenience.
  </p>
</div>


      {/* Vision, Mission, Philosophy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">

                    {/* Mission */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-8 hover:shadow-yellow-500/10 transition-all duration-300 border border-yellow-500/20">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-500/20 p-3 rounded-full border border-yellow-500/30">
                <Heart className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white ml-4">Our Mission</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              <ul className="list-disc list-inside space-y-2">
  <li><strong>Purpose</strong> – Deliver high-quality care for individuals with intellectual and developmental disabilities</li>
  <li><strong>Approach</strong> – Rooted in empathy, compassion, and professionalism</li>
  <li><strong>Environment</strong> – Supportive family care setting that fosters dignity and growth</li>
</ul>
            </p>
          </div>


          {/* Vision */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-8 hover:shadow-yellow-500/10 transition-all duration-300 border border-yellow-500/20">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-500/20 p-3 rounded-full border border-yellow-500/30">
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white ml-4">Our Values</h3>
            </div>
            <div className="text-gray-300 leading-relaxed">
  <ul className="list-disc list-inside space-y-2">
    <li><strong>Compassion</strong> – Kind, empathetic, and person-centered care</li>
    <li><strong>Respect</strong> – Honoring every individual's dignity</li>
    <li><strong>Integrity</strong> – Honest, accountable, and trustworthy</li>
    <li><strong>Empowerment</strong> – Encouraging choice and independence</li>
    <li><strong>Community</strong> – Creating connection and inclusion</li>
    <li><strong>Excellence</strong> – Always improving, always caring</li>
  </ul>
</div>

          </div>



          {/* Philosophy */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-8 hover:shadow-yellow-500/10 transition-all duration-300 border border-yellow-500/20">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-500/20 p-3 rounded-full border border-yellow-500/30">
                <Shield className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white ml-4">Our Philosophy</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              <ul className="list-disc list-inside space-y-2">
  <li><strong>Person-Centered</strong> – Tailored care based on each individual's unique needs</li>
  <li><strong>Self-Determination</strong> – Encouraging autonomy and informed choices</li>
  <li><strong>Supportive Culture</strong> – Emphasizing respect, dignity, and personal growth</li>
</ul>
 
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServicesPage = () => (
    <div className="pt-20 py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 pt-10">Our Services</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive care services designed to support independence, health, and happiness in a comfortable, home-like environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: "Personal Care Assistance",
              description: "Compassionate help with daily activities including bathing, dressing, grooming, and mobility assistance tailored to individual needs and preferences."
            },
            {
              icon: Shield,
              title: "Medication Management",
              description: "Professional medication administration and monitoring by licensed staff to ensure proper dosing, timing, and safety protocols are maintained."
            },
            {
              icon: Users,
              title: "24/7 Supervision & Support",
              description: "Round-the-clock trained staff presence providing peace of mind, emergency response, and continuous care coordination for all residents."
            },
            {
  icon: Globe,
  title: "Community Involvement",
  description: "Engaging recreational opportunities for residents to engage in community, cultural, employmemnt, recreational, spiritual, and social events based on their interests/plan."
},
            {
              icon: Phone,
              title: "Transportation Services",
              description: "Safe, reliable transportation to medical appointments, shopping trips, social outings, and community activities with trained drivers."
            },
            {
              icon: CheckCircle,
              title: "Health Monitoring",
              description: "Regular health assessments, vital sign monitoring, and coordination with healthcare providers to maintain optimal health and wellness."
            },
            {
  icon: Home,
  title: "Private Living Spaces",
  description: "Each resident enjoys their own personal space, ensuring privacy, comfort, and a secure environment tailored to individual needs."
},
{
  icon: Salad,
  title: "Meals & Snacks",
  description: "Daily access to nutritious home-cooked meals and snacks, accommodating dietary needs while supporting wellness and choice."
},
{
  icon: Handshake,
  title: "Guest & Visitation Policy",
  description: "Welcoming guidelines for visitors and guests that ensure safety while respecting personal relationships and support networks, ELC does not accommodate pets at this time"
},
{
  icon: AlertTriangle,
  title: "Safety & Risk Management",
  description: "Environmental safety, abuse prevention, and incident response are proactively managed to protect all residents."
},
{
  icon: ClipboardCheck,
  title: "Care Planning & Coordination",
  description: "Individualized care plans developed and regularly updated in collaboration with residents, families, and professionals to ensure comprehensive, consistent support."
}


          ].map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 hover:shadow-yellow-500/10 transition-all duration-300 border border-gray-700 hover:border-yellow-500/30"
            >
              <div className="bg-yellow-500/20 p-4 rounded-full w-fit mb-6 border border-yellow-500/30">
                <service.icon className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEmploymentPage = () => (
  <div className="pt-20 py-16 bg-gradient-to-br from-black via-gray-900 to-black min-h-screen">
    <div className="text-center mb-16 px-4">
      <h2 className="text-4xl font-bold text-white mb-4 pt-10">Join Our Team</h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Make a meaningful difference in the lives of others while building a rewarding career in residential care.
      </p>
    </div>

    {/* Full-width unified box */}
    <div className="w-full px-4 lg:px-32">
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-10 border border-yellow-500/20 text-center">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center">
          <Briefcase className="h-6 w-6 text-yellow-400 mr-3" />
          About the Position
        </h3>
        <div className="space-y-4 text-gray-300 text-left max-w-4xl mx-auto">
          <p className="leading-relaxed">
            <strong className="text-yellow-400">Residential Care Assistant</strong> - Join our compassionate team providing direct care to residents in a warm, family-like environment. This full-time position offers competitive compensation, comprehensive benefits, and opportunities for professional growth.
          </p>
          <p className="leading-relaxed">
            You'll work alongside experienced professionals to deliver personalized care, assist with daily living activities, and create meaningful connections with residents and their families. We offer flexible scheduling, ongoing training, and a supportive work environment.
          </p>

<div className="grid md:grid-cols-2 gap-8 mt-10">
  {/* Training Box */}
  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
    <h3 className="text-3xl font-bold mb-4 text-yellow-400">Accreditation Now</h3>
    <a
      href="https://www.accreditationnow.com"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
    >
      <span>Begin Training</span>
      <ExternalLink className="h-5 w-5 ml-2" />
    </a>
    <p className="text-sm text-gray-400 mt-5">
      Completion time: <span className="font-medium text-white">15 Minutes</span>
    </p>
  </div>

  {/* Canvas Link Box */}
  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
    <h3 className="text-3xl font-bold mb-4 text-yellow-400">Onboarding</h3>
    <a
      href="https://www.accreditationnow.com"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
    >
      <span>Canvas</span>
      <ExternalLink className="h-5 w-5 ml-2" />
    </a>
    <p className="text-sm text-gray-400 mt-5">
      Completion time: <span className="font-medium text-white">8-10 Hours</span>
    </p>
  </div>
</div>

        </div>
      </div>
    </div>
  </div>
);

  

 const [formData, setFormData] = useState({
  name: '',
  phone: '',
  email: '',
  reason: '',
  otherReason: ''
});

const [contactReason, setContactReason] = useState('');
const [showOtherReason, setShowOtherReason] = useState(false);

const handleInputChange = (field, value) => {
  setFormData(prev => ({ ...prev, [field]: value }));
};

const handleContactReasonChange = (value) => {
  setContactReason(value);
  setFormData(prev => ({ ...prev, reason: value }));
  setShowOtherReason(value === 'other');
};

const handleSubmit = (e) => {
  e.preventDefault();

  const emailParams = {
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    reason: formData.reason === 'other' ? formData.otherReason : formData.reason,
  };

  emailjs.send('service_service', 'template_tizzys', emailParams, '9KTqfYDynDBizZ6x5')
    .then(() => {
      alert('Thank you! We\'ll be in touch soon.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        reason: '',
        otherReason: ''
      });
      setContactReason('');
      setShowOtherReason(false);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      alert('Something went wrong. Please try again.');
    });
};

const renderContactPage = () => (
  <div className="pt-20 py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-screen">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4 pt-10">Contact Us</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We're here to answer your questions and help you learn more about our services. Reach out to us today.
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl p-8 border border-yellow-500/20">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Send Us a Message</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-white placeholder-gray-400"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-white placeholder-gray-400"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-white placeholder-gray-400"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Reason for Contact *</label>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { value: 'employment', label: 'Employment Opportunities' },
                { value: 'tour', label: 'Schedule a House Tour / Pricing' },
                { value: 'other', label: 'Other' }
              ].map((option) => (
                <label key={option.value} className="flex items-center p-4 bg-gray-800 rounded-lg border border-gray-600 hover:border-yellow-500/50 transition-colors cursor-pointer">
                  <input
                    type="radio"
                    name="reason"
                    value={option.value}
                    checked={contactReason === option.value}
                    onChange={(e) => handleContactReasonChange(e.target.value)}
                    className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-600 bg-gray-800"
                  />
                  <span className="ml-3 text-gray-300 text-sm font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {showOtherReason && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Please specify your reason</label>
              <input
                type="text"
                value={formData.otherReason}
                onChange={(e) => handleInputChange('otherReason', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-white placeholder-gray-400"
                placeholder="Please describe your inquiry"
              />
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-4 px-12 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);


  const renderFooter = () => (
    <footer className="bg-black text-white py-12 border-t border-yellow-500/20">

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 Ever Loving Care. All rights reserved. Licensed Residential Care Facility.</p>
        </div>
    </footer>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return renderHomePage();
      case 'services':
        return renderServicesPage();
      case 'employment':
        return renderEmploymentPage();
      case 'contact':
        return renderContactPage();
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {renderNavigation()}
      {renderCurrentPage()}
      {renderFooter()}
    </div>
  );
}

export default App;