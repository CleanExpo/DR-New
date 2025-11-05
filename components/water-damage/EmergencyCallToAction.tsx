'use client';

import { useState, useEffect } from 'react';

export default function EmergencyCallToAction() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [damageLevel, setDamageLevel] = useState('starting');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setDamageLevel((level) => {
            switch (level) {
              case 'starting':
                return 'spreading';
              case 'spreading':
                return 'severe';
              case 'severe':
                return 'critical';
              default:
                return 'critical';
            }
          });
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getDamageMessage = () => {
    switch (damageLevel) {
      case 'spreading':
        return 'Water spreading to walls';
      case 'severe':
        return 'Mould starting to grow';
      case 'critical':
        return 'Structural damage occurring';
      default:
        return 'Water damage detected';
    }
  };

  const getUrgencyColor = () => {
    switch (damageLevel) {
      case 'critical':
        return '#dc3545';
      case 'severe':
        return '#fd7e14';
      case 'spreading':
        return '#ffc107';
      default:
        return '#0066cc';
    }
  };

  return (
    <div
      className="emergency-cta"
      role="region"
      aria-live="polite"
      aria-label="Emergency contact information"
      style={{
        backgroundColor: '#f8f9fa',
        border: `3px solid ${getUrgencyColor()}`,
        borderRadius: '8px',
        padding: '1.5rem',
        margin: '2rem 0',
        textAlign: 'centre',
      }}
    >
      <div
        className="damage-timer"
        role="timer"
        aria-label={`Time until more damage: ${timeLeft} seconds`}
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: getUrgencyColor(),
          marginBottom: '1rem',
        }}
      >
        <span aria-hidden="true">⚠️</span> {getDamageMessage()}
      </div>

      <div
        className="countdown"
        style={{
          fontSize: '1.25rem',
          marginBottom: '1rem',
        }}
      >
        Next damage level in: <strong>{timeLeft}s</strong>
      </div>

      <div className="cta-buttons" role="group" aria-label="Contact options">
        <a
          href="tel:1300XXXXXX"
          className="phone-button"
          aria-label="Call 1300-XXX-XXX for emergency water damage help"
          style={{
            display: 'inline-block',
            backgroundColor: getUrgencyColor(),
            color: 'white',
            padding: '1rem 2rem',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            borderRadius: '4px',
            marginBottom: '1rem',
          }}
        >
          📞 1300-XXX-XXX - Call Now
        </a>

        <div
          className="alternative-contacts"
          style={{
            marginTop: '1rem',
            fontSize: '1rem',
          }}
        >
          <p style={{ margin: '0.5rem 0' }}>
            <strong>Can't call?</strong>
          </p>
          <a
            href="sms:0400XXXXXX?body=URGENT%20water%20damage%20at%20"
            aria-label="Text 0400-XXX-XXX for help"
            style={{
              color: '#0066cc',
              marginRight: '1rem',
            }}
          >
            📱 Text: 0400-XXX-XXX
          </a>
          <a
            href="#contact-form"
            aria-label="Fill emergency form"
            style={{
              color: '#0066cc',
            }}
          >
            📝 Online Form
          </a>
        </div>
      </div>

      <div
        className="response-guarantee"
        style={{
          marginTop: '1rem',
          padding: '0.5rem',
          backgroundColor: '#e7f3ff',
          borderRadius: '4px',
        }}
      >
        <strong>⚡ 60-Minute Response Guaranteed</strong>
        <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
          Average arrival: CBD 15min | Suburbs 30min | Outer 45min
        </p>
      </div>

      <div
        className="trust-signals"
        role="list"
        aria-label="Service features"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '0.5rem',
          marginTop: '1rem',
          fontSize: '0.9rem',
        }}
      >
        <div role="listitem">✓ Insurance Direct</div>
        <div role="listitem">✓ 24/7 Service</div>
        <div role="listitem">✓ 5,000 Homes Saved</div>
        <div role="listitem">✓ Local Teams</div>
      </div>
    </div>
  );
}