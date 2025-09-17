import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ServicesPage() {
  const services = [
    {
      title: "Water Damage Restoration",
      description: "24/7 emergency water extraction and drying services",
      link: "/services/water-damage-restoration",
      image: "/images/services/water-damage-restoration.webp"
    },
    {
      title: "Fire & Smoke Damage",
      description: "Complete fire damage restoration and smoke removal",
      link: "/services/fire-damage-restoration",
      image: "/images/services/fire-damage-restoration.webp"
    },
    {
      title: "Mould Remediation",
      description: "Safe and effective mould removal services",
      link: "/services/mould-remediation",
      image: "/images/services/mould-remediation.webp"
    },
    {
      title: "Storm Damage",
      description: "Emergency storm damage repair and restoration",
      link: "/services/storm-damage",
      image: "/images/hero/disaster-recovery-services.jpg"
    },
    {
      title: "Biohazard Cleaning",
      description: "Professional trauma and biohazard cleaning",
      link: "/services/biohazard-cleaning",
      image: "/images/services/crime-scene-remediation.webp"
    },
    {
      title: "Commercial Restoration",
      description: "Specialized commercial property restoration",
      link: "/services",
      image: "/images/services/commercial-residential.png"
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl">
            Professional disaster recovery services available 24/7. We specialize in water damage,
            fire restoration, mould remediation, and emergency response across Brisbane.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}