import type { Meta, StoryObj } from '@storybook/react';
import { ServiceFeatures } from '@/components/services';
import { Clock, Shield, Award, Zap, Heart, CheckCircle } from 'lucide-react';

const meta = {
  title: 'Service Components/ServiceFeatures',
  component: ServiceFeatures,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ServiceFeatures>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {
  args: {
    title: 'Why Choose Our Water Damage Services',
    description: 'Professional restoration with certified expertise and rapid response',
    columns: 3,
    features: [
      {
        icon: Clock,
        title: '24/7 Emergency Response',
        description: 'Available around the clock for immediate assistance. Average arrival time under 60 minutes in Brisbane metro areas.',
        color: 'red',
      },
      {
        icon: Shield,
        title: 'Insurance Approved',
        description: 'Work directly with all major Australian insurance companies. No out-of-pocket expenses for approved claims.',
        color: 'blue',
      },
      {
        icon: Award,
        title: 'Master Restorer Certified',
        description: 'One of the limited IICRC Master Restorer certified professionals in Brisbane and Queensland.',
        color: 'yellow',
      },
      {
        icon: Zap,
        title: 'Advanced Equipment',
        description: 'State-of-the-art extraction, drying, and monitoring equipment for fastest restoration.',
        color: 'blue',
      },
      {
        icon: Heart,
        title: 'Customer Focused',
        description: 'Dedicated to minimizing stress and disruption during your property restoration.',
        color: 'red',
      },
      {
        icon: CheckCircle,
        title: 'Guaranteed Results',
        description: 'Complete drying to IICRC standards or we return at no charge. Certified completion.',
        color: 'green',
      },
    ],
  },
};

export const TwoColumns: Story = {
  args: {
    title: 'Our Expertise',
    description: 'Professional disaster recovery services',
    columns: 2,
    features: [
      {
        icon: Award,
        title: 'IICRC Master Certified',
        description: 'Highest professional credential for disaster restoration in Australia.',
        color: 'yellow',
      },
      {
        icon: Shield,
        title: 'Fully Insured',
        description: 'Comprehensive public liability and professional indemnity insurance.',
        color: 'blue',
      },
    ],
  },
};

export const FourColumns: Story = {
  args: {
    title: 'Complete Restoration Services',
    columns: 4,
    features: [
      {
        icon: Clock,
        title: 'Fast Response',
        description: '<60 minute arrival time',
        color: 'red',
      },
      {
        icon: Award,
        title: 'Certified',
        description: 'IICRC Master Restorer',
        color: 'yellow',
      },
      {
        icon: Shield,
        title: 'Insured',
        description: 'All major insurers',
        color: 'blue',
      },
      {
        icon: CheckCircle,
        title: 'Guaranteed',
        description: 'Quality workmanship',
        color: 'green',
      },
    ],
  },
};

export const ListLayout: Story = {
  args: {
    title: 'Mould Remediation Services',
    description: 'Comprehensive mould removal and prevention',
    layout: 'list',
    features: [
      {
        icon: Award,
        title: 'Professional Inspection & Testing',
        description: 'Comprehensive mould inspection, moisture mapping, and air quality testing. Laboratory analysis identifies mould species and toxicity levels.',
        color: 'green',
      },
      {
        icon: Shield,
        title: 'Safe Containment & Removal',
        description: 'Physical barriers isolate affected areas. Negative air pressure prevents spore spread. HEPA filtration throughout remediation.',
        color: 'green',
      },
      {
        icon: CheckCircle,
        title: 'Post-Remediation Verification',
        description: 'Air quality testing confirms successful removal. Master Restorer certification of completion when spore counts return to safe levels.',
        color: 'green',
      },
    ],
  },
};
