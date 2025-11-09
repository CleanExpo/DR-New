import Link from 'next/link';
import { Metadata } from 'next';
import { GraduationCap, Award, BookOpen, Clock, CheckCircle, ArrowRight, Users, Shield, Star, Trophy, Monitor, FileCheck } from 'lucide-react';
import { EEATDualPositioningSchema } from '@/components/schema/EEAT-DualPositioning-Schema';

export const metadata: Metadata = {
  title: 'CARSI | IICRC Training | Online CECs | Cleaning and Restoration Science Institute',
  description: 'Earn IICRC continuing education credits (CECs) online through CARSI. Water Restoration, Fire & Smoke, Mould Remediation, Applied Structural Drying courses taught by Master Restorer Phill McGurk.',
  keywords: 'CARSI, IICRC training, IICRC CECs, continuing education credits, water restoration training, fire restoration training, mould remediation training, ASD training, online IICRC courses, restoration training Australia',
};

export default function CARSIPage() {
  return (
    <>
      <EEATDualPositioningSchema pageType="carsi" />

      <div className="min-h-screen bg-white">
        {/* Hero and Content - Truncated for space */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-6">CARSI Training Coming Soon</h1>
            <p className="text-xl mb-8">IICRC-approved continuing education credits by Master Restorer Phill McGurk</p>
            <Link href="/for-contractors" className="inline-flex items-center px-8 py-4 bg-blue-700 text-white font-bold rounded-lg">
              View Contractor Resources
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
