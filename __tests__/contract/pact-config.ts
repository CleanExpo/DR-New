/**
 * Pact Contract Testing Configuration
 *
 * Contract tests for external API integrations.
 */

import { Pact, Matchers } from '@pact-foundation/pact';
import path from 'path';

const { like, eachLike, term } = Matchers;

// Pact provider configuration
export const pactProvider = new Pact({
  consumer: 'DisasterRecoveryBrisbane',
  provider: 'ExternalAPIs',
  port: 9000,
  log: path.resolve(process.cwd(), 'pact', 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pact', 'pacts'),
  logLevel: 'info',
  spec: 2,
});

/**
 * Google Maps API Contract
 */
export const googleMapsContract = {
  state: 'valid geocoding request',
  uponReceiving: 'a request to geocode a Brisbane address',
  withRequest: {
    method: 'GET',
    path: '/maps/api/geocode/json',
    query: {
      address: term({
        matcher: '.*Brisbane.*',
        generate: '123 Main St, Hamilton, Brisbane, QLD 4007',
      }),
      key: like('TEST_API_KEY'),
    },
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      status: 'OK',
      results: eachLike({
        formatted_address: like('123 Main St, Hamilton QLD 4007, Australia'),
        geometry: {
          location: {
            lat: like(-27.4381),
            lng: like(153.0528),
          },
        },
        address_components: eachLike({
          long_name: like('Hamilton'),
          short_name: like('Hamilton'),
          types: eachLike('locality'),
        }),
      }),
    },
  },
};

/**
 * Insurance Provider API Contract (Generic)
 */
export const insuranceProviderContract = {
  state: 'claim exists',
  uponReceiving: 'a request to validate a claim number',
  withRequest: {
    method: 'POST',
    path: '/api/validate-claim',
    headers: {
      'Content-Type': 'application/json',
      Authorization: like('Bearer token123'),
    },
    body: {
      claimNumber: term({
        matcher: '[A-Z]{3}[0-9]{8}',
        generate: 'ABC12345678',
      }),
      policyHolder: like('John Smith'),
    },
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      valid: true,
      claimNumber: like('ABC12345678'),
      status: like('active'),
      coverage: {
        waterDamage: true,
        fireDamage: true,
        mouldRemediation: true,
      },
      excess: like(500),
    },
  },
};

/**
 * Weather API Contract (for storm damage predictions)
 */
export const weatherAPIContract = {
  state: 'weather data available',
  uponReceiving: 'a request for Brisbane weather forecast',
  withRequest: {
    method: 'GET',
    path: '/forecast',
    query: {
      location: term({
        matcher: 'Brisbane|Ipswich|Logan',
        generate: 'Brisbane',
      }),
      days: like('7'),
    },
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      location: like('Brisbane'),
      forecast: eachLike({
        date: term({
          matcher: '[0-9]{4}-[0-9]{2}-[0-9]{2}',
          generate: '2025-01-15',
        }),
        conditions: like('Partly Cloudy'),
        rainfall: like(5.2),
        windSpeed: like(15),
        stormRisk: like('low'),
      }),
    },
  },
};

/**
 * Payment Gateway Contract (Stripe)
 */
export const paymentGatewayContract = {
  state: 'payment method exists',
  uponReceiving: 'a request to create a payment intent',
  withRequest: {
    method: 'POST',
    path: '/v1/payment_intents',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: like('Bearer sk_test_123'),
    },
    body: {
      amount: like(50000), // $500.00 in cents
      currency: 'aud',
      payment_method_types: eachLike('card'),
    },
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      id: term({
        matcher: 'pi_[A-Za-z0-9]+',
        generate: 'pi_1234567890',
      }),
      amount: like(50000),
      currency: 'aud',
      status: like('requires_payment_method'),
      client_secret: like('pi_1234567890_secret_abc123'),
    },
  },
};

/**
 * SMS Provider Contract (emergency notifications)
 */
export const smsProviderContract = {
  state: 'SMS service available',
  uponReceiving: 'a request to send emergency notification SMS',
  withRequest: {
    method: 'POST',
    path: '/messages',
    headers: {
      'Content-Type': 'application/json',
      Authorization: like('Bearer sms_token_123'),
    },
    body: {
      to: term({
        matcher: '\\+61[0-9]{9}',
        generate: '+61412345678',
      }),
      from: like('+611300309361'),
      body: like('Emergency response team dispatched. ETA 30 minutes.'),
    },
  },
  willRespondWith: {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      id: like('msg_123456'),
      status: like('sent'),
      to: like('+61412345678'),
      sentAt: term({
        matcher: '[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}',
        generate: '2025-01-15T10:30:00',
      }),
    },
  },
};

/**
 * Email Provider Contract (SendGrid/SES)
 */
export const emailProviderContract = {
  state: 'email service available',
  uponReceiving: 'a request to send quote confirmation email',
  withRequest: {
    method: 'POST',
    path: '/send',
    headers: {
      'Content-Type': 'application/json',
      Authorization: like('Bearer email_api_key'),
    },
    body: {
      to: like('customer@example.com'),
      from: 'admin@disasterrecovery.com.au',
      subject: like('Quote Request Received - Disaster Recovery Brisbane'),
      html: like('<p>Thank you for your quote request...</p>'),
    },
  },
  willRespondWith: {
    status: 202,
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      messageId: like('email_msg_123456'),
      status: like('queued'),
    },
  },
};

export const allContracts = [
  googleMapsContract,
  insuranceProviderContract,
  weatherAPIContract,
  paymentGatewayContract,
  smsProviderContract,
  emailProviderContract,
];

export default pactProvider;
