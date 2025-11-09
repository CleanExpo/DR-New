import type { Meta, StoryObj } from '@storybook/react';
import { LocationHero } from '@/components/location';
import { FluidCTA, FluidCTAGroup } from '@/components/fluid-cta';

const meta = {
  title: 'Location Components/LocationHero',
  component: LocationHero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LocationHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hamilton: Story = {
  args: {
    location: 'Hamilton',
    subtitle: '60-Minute Response • IICRC Master Restorer • Luxury Property Specialists',
    backgroundImage: '/images/suburbs/hamilton-luxury-property-water-damage-restoration.webp',
    backgroundImageAlt: 'Hamilton Brisbane luxury riverside properties emergency restoration',
    emergencyBadge: "Serving Hamilton's Prestige Riverside Properties",
    stats: [
      { icon: 'clock', label: 'Response Time', value: '<60 Min' },
      { icon: 'award', label: 'Master Restorer', value: 'IICRC Certified' },
      { icon: 'shield', label: 'Insurance', value: 'All Major Insurers' },
      { icon: 'star', label: 'Service', value: 'Premium Properties' },
    ],
    children: (
      <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
        <FluidCTA
          text="Call 1300 309 361 Now"
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
          variant="secondary"
          size="xl"
          icon="arrow"
          magnetic
          ripple
        />
      </FluidCTAGroup>
    ),
  },
};

export const Ascot: Story = {
  args: {
    location: 'Ascot',
    subtitle: 'Professional Disaster Recovery • Heritage Property Specialists • 24/7 Available',
    backgroundImage: '/images/suburbs/ascot-heritage-property-restoration.webp',
    backgroundImageAlt: 'Ascot Brisbane heritage property disaster restoration',
    emergencyBadge: "Expert Care for Ascot's Historic Properties",
    stats: [
      { icon: 'clock', label: 'Emergency Response', value: '24/7' },
      { icon: 'award', label: 'Heritage Expertise', value: 'Queenslander Specialists' },
    ],
  },
};

export const NewFarm: Story = {
  args: {
    location: 'New Farm',
    subtitle: 'Riverside Flood Recovery • Water Damage Experts • Master Restorer',
    backgroundImage: '/images/suburbs/new-farm-flood-restoration.webp',
    backgroundImageAlt: 'New Farm Brisbane flood recovery and water damage restoration',
    emergencyBadge: 'New Farm Flood & Water Damage Specialists',
    stats: [
      { icon: 'clock', label: 'Rapid Response', value: '<60 Min' },
      { icon: 'shield', label: 'Flood Experts', value: 'Brisbane River Knowledge' },
    ],
  },
};

export const WithCustomTitle: Story = {
  args: {
    location: 'Toowong',
    title: 'Emergency Restoration Services Toowong',
    subtitle: 'Professional disaster recovery for all Toowong properties',
    backgroundImage: '/images/suburbs/toowong-emergency-restoration.webp',
    backgroundImageAlt: 'Toowong Brisbane emergency restoration services',
  },
};
