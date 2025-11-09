import type { Meta, StoryObj } from '@storybook/react';
import { ProcessSteps } from '@/components/services';
import { Phone, Search, Droplets, Wind, Sparkles, Home } from 'lucide-react';

const meta = {
  title: 'Service Components/ProcessSteps',
  component: ProcessSteps,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProcessSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WaterDamageProcess: Story = {
  args: {
    title: 'Our IICRC Water Damage Restoration Process',
    description: 'Professional 6-step restoration following ANSI/IICRC S500 standards',
    steps: [
      {
        step: 1,
        title: 'Emergency Contact & Rapid Response',
        description: '24/7 emergency hotline connects you with certified specialists. Dispatch within minutes, arriving on-site in under 1 hour.',
        icon: Phone,
        details: [
          'Average response: 47 minutes in metro areas',
          'Phone triage determines severity',
          'Appropriate resources dispatched immediately',
        ],
      },
      {
        step: 2,
        title: 'Inspection & Water Damage Assessment',
        description: 'Advanced moisture detection technology maps affected areas and determines water category following IICRC protocols.',
        icon: Search,
        details: [
          'Thermal imaging identifies hidden moisture',
          'Moisture mapping documents affected areas',
          'Comprehensive restoration plan developed',
        ],
      },
      {
        step: 3,
        title: 'Water Extraction & Removal',
        description: 'Truck-mounted extraction units remove thousands of gallons quickly, preventing further damage.',
        icon: Droplets,
        details: [
          'Up to 40,000 gallons per day capacity',
          'Immediate extraction upon arrival',
        ],
      },
      {
        step: 4,
        title: 'Drying & Dehumidification',
        description: 'Strategic placement of industrial dehumidifiers and air movers creates optimal drying conditions.',
        icon: Wind,
        details: [
          'Daily moisture monitoring',
          'IICRC-specified moisture levels achieved',
        ],
      },
      {
        step: 5,
        title: 'Cleaning & Sanitization',
        description: 'Antimicrobial treatment prevents mould and bacteria growth using IICRC-approved methods.',
        icon: Sparkles,
        details: [
          'EPA-registered disinfectants',
          'HEPA filtration removes 99.97% particles',
        ],
      },
      {
        step: 6,
        title: 'Restoration & Reconstruction',
        description: 'Return property to pre-loss condition with professional repairs and reconstruction.',
        icon: Home,
        details: [
          'Minor repairs: drywall, paint, carpet',
          'Major reconstruction available',
        ],
      },
    ],
  },
};

export const MouldRemediationProcess: Story = {
  args: {
    title: 'Master Restorer Mould Remediation Process',
    description: 'IICRC certified safe mould removal following industry best practices',
    steps: [
      {
        step: 1,
        title: 'Inspection & Testing',
        description: 'Comprehensive mould inspection, moisture mapping, and air quality testing.',
        icon: Search,
      },
      {
        step: 2,
        title: 'Containment Setup',
        description: 'Physical barriers isolate affected areas with negative air pressure.',
        icon: Wind,
      },
      {
        step: 3,
        title: 'Safe Removal',
        description: 'Careful removal using proper PPE and safe disposal following regulations.',
        icon: Sparkles,
      },
      {
        step: 4,
        title: 'Final Verification',
        description: 'Post-remediation testing verifies successful removal and safe air quality.',
        icon: Home,
      },
    ],
  },
};

export const SimpleProcess: Story = {
  args: {
    title: 'Emergency Response Process',
    steps: [
      {
        step: 1,
        title: 'Call Us',
        description: 'Contact our 24/7 emergency line',
        icon: Phone,
      },
      {
        step: 2,
        title: 'We Respond',
        description: 'Team arrives within 60 minutes',
        icon: Wind,
      },
      {
        step: 3,
        title: 'Problem Solved',
        description: 'Professional restoration completed',
        icon: Home,
      },
    ],
  },
};
