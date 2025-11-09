import type { Meta, StoryObj } from '@storybook/react';
import { ServiceHero } from '@/components/services';
import { FluidCTA, FluidCTAGroup } from '@/components/fluid-cta';

const meta = {
  title: 'Service Components/ServiceHero',
  component: ServiceHero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ServiceHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WaterDamage: Story = {
  args: {
    title: 'Water Damage Restoration Brisbane',
    subtitle: '24/7 Emergency Response • IICRC Master Restorer • Insurance Approved',
    backgroundImage: '/images/optimized/damage/3d-water-damage.webp',
    backgroundImageAlt: 'Professional water damage restoration services Brisbane',
    emergencyBadge: 'Emergency? Call Now - 60 Minute Response',
    trustIndicators: [
      { icon: 'award', label: 'IICRC Master Certified' },
      { icon: 'shield', label: 'Insurance Approved' },
      { icon: 'alert', label: '24/7 Emergency' },
    ],
    gradientColor: 'blue',
    children: (
      <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
        <FluidCTA
          text="Call 1300 309 361"
          href="tel:1300309361"
          variant="emergency"
          size="xl"
          icon="phone"
          magnetic
          ripple
          pulse
        />
        <FluidCTA
          text="Get Emergency Help"
          href="/claim"
          variant="primary"
          size="xl"
          icon="arrow"
          magnetic
          ripple
        />
      </FluidCTAGroup>
    ),
  },
};

export const MouldRemediation: Story = {
  args: {
    title: 'Mould Remediation Brisbane',
    subtitle: 'Safe, Certified Mould Removal • IICRC Master Restorer • Health-Focused Solutions',
    backgroundImage: '/images/optimized/damage/3d-mould-damage.webp',
    backgroundImageAlt: 'Professional mould remediation services Brisbane',
    emergencyBadge: 'Mould Problem? Professional Remediation Available Now!',
    trustIndicators: [
      { icon: 'award', label: 'IICRC Master Certified' },
      { icon: 'shield', label: 'Safe Removal Protocols' },
    ],
    gradientColor: 'green',
  },
};

export const FireDamage: Story = {
  args: {
    title: 'Fire Damage Restoration Brisbane',
    subtitle: '24/7 Emergency Smoke & Fire Restoration • Complete Cleanup • Reconstruction',
    backgroundImage: '/images/optimized/damage/3d-fire-damage.webp',
    backgroundImageAlt: 'Professional fire damage restoration services Brisbane',
    emergencyBadge: 'Fire Emergency? Immediate Response Available',
    trustIndicators: [
      { icon: 'award', label: 'Master Restorer' },
      { icon: 'shield', label: 'Full Reconstruction' },
      { icon: 'alert', label: '60-Min Response' },
    ],
    gradientColor: 'red',
  },
};

export const WithoutBadge: Story = {
  args: {
    title: 'Emergency Restoration Services',
    subtitle: 'Professional disaster recovery for Brisbane properties',
    backgroundImage: '/images/optimized/process/3d-assessment.webp',
    backgroundImageAlt: 'Emergency restoration services',
    gradientColor: 'gray',
  },
};
