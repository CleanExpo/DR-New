describe('Form Validation', () => {
  describe('Email Validation', () => {
    const validateEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }

    it('should accept valid email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
        'test123@subdomain.example.com',
      ]

      validEmails.forEach((email) => {
        expect(validateEmail(email)).toBe(true)
      })
    })

    it('should reject invalid email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'test@',
        'test@.com',
        'test @example.com',
        '',
      ]

      invalidEmails.forEach((email) => {
        expect(validateEmail(email)).toBe(false)
      })
    })
  })

  describe('Phone Validation (Australian)', () => {
    const validateAustralianPhone = (phone: string): boolean => {
      // Remove spaces, dashes, parentheses
      const cleaned = phone.replace(/[\s\-\(\)]/g, '')

      // Check for valid Australian phone formats
      const mobileRegex = /^(\+61|0)[4-5]\d{8}$/
      const landlineRegex = /^(\+61|0)[2-8]\d{8}$/

      return mobileRegex.test(cleaned) || landlineRegex.test(cleaned)
    }

    it('should accept valid Australian mobile numbers', () => {
      const validMobiles = [
        '0412345678',
        '+61412345678',
        '0456789012',
        '+61456789012',
      ]

      validMobiles.forEach((phone) => {
        expect(validateAustralianPhone(phone)).toBe(true)
      })
    })

    it('should accept valid Australian landline numbers', () => {
      const validLandlines = [
        '0731234567',
        '+61731234567',
        '0281234567',
        '(07) 3123 4567',
      ]

      validLandlines.forEach((phone) => {
        expect(validateAustralianPhone(phone)).toBe(true)
      })
    })

    it('should reject invalid phone numbers', () => {
      const invalidPhones = ['123', '0000000000', '+1234567890', '']

      invalidPhones.forEach((phone) => {
        expect(validateAustralianPhone(phone)).toBe(false)
      })
    })
  })

  describe('Postcode Validation (Australian)', () => {
    const validateAustralianPostcode = (postcode: string): boolean => {
      return /^\d{4}$/.test(postcode)
    }

    it('should accept valid Australian postcodes', () => {
      const validPostcodes = ['4000', '2000', '3000', '6000', '7000']

      validPostcodes.forEach((postcode) => {
        expect(validateAustralianPostcode(postcode)).toBe(true)
      })
    })

    it('should reject invalid postcodes', () => {
      const invalidPostcodes = ['400', '40000', 'ABCD', '']

      invalidPostcodes.forEach((postcode) => {
        expect(validateAustralianPostcode(postcode)).toBe(false)
      })
    })
  })

  describe('Emergency Form Validation', () => {
    interface EmergencyFormData {
      name: string
      email: string
      phone: string
      service: string
      message: string
      isEmergency?: boolean
    }

    const validateEmergencyForm = (data: EmergencyFormData): string[] => {
      const errors: string[] = []

      if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters')
      }

      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Valid email is required')
      }

      if (!data.phone || data.phone.replace(/\D/g, '').length < 10) {
        errors.push('Valid phone number is required')
      }

      if (!data.service) {
        errors.push('Service type is required')
      }

      if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters')
      }

      return errors
    }

    it('should validate complete form data', () => {
      const validData: EmergencyFormData = {
        name: 'John Smith',
        email: 'john@example.com',
        phone: '0412345678',
        service: 'water-damage',
        message: 'Emergency water damage in basement',
        isEmergency: true,
      }

      const errors = validateEmergencyForm(validData)
      expect(errors).toHaveLength(0)
    })

    it('should catch missing required fields', () => {
      const incompleteData: EmergencyFormData = {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      }

      const errors = validateEmergencyForm(incompleteData)
      expect(errors.length).toBeGreaterThan(0)
    })

    it('should validate name length', () => {
      const data: EmergencyFormData = {
        name: 'A',
        email: 'john@example.com',
        phone: '0412345678',
        service: 'water-damage',
        message: 'Emergency water damage',
      }

      const errors = validateEmergencyForm(data)
      expect(errors).toContain('Name must be at least 2 characters')
    })

    it('should validate message length', () => {
      const data: EmergencyFormData = {
        name: 'John Smith',
        email: 'john@example.com',
        phone: '0412345678',
        service: 'water-damage',
        message: 'Short',
      }

      const errors = validateEmergencyForm(data)
      expect(errors).toContain('Message must be at least 10 characters')
    })
  })

  describe('Service Type Validation', () => {
    const validServices = [
      'water-damage',
      'fire-damage',
      'mould-remediation',
      'storm-damage',
      'flood-restoration',
    ]

    const validateService = (service: string): boolean => {
      return validServices.includes(service)
    }

    it('should accept valid service types', () => {
      validServices.forEach((service) => {
        expect(validateService(service)).toBe(true)
      })
    })

    it('should reject invalid service types', () => {
      const invalidServices = ['invalid-service', '', 'random-service']

      invalidServices.forEach((service) => {
        expect(validateService(service)).toBe(false)
      })
    })
  })

  describe('Location Validation', () => {
    const validLocations = [
      'Hamilton',
      'Ascot',
      'New Farm',
      'Toowong',
      'Karalee',
      'Brookwater',
      'Springfield Lakes',
    ]

    const validateLocation = (location: string): boolean => {
      return validLocations.some(
        (valid) => valid.toLowerCase() === location.toLowerCase()
      )
    }

    it('should accept valid Brisbane/Ipswich locations', () => {
      validLocations.forEach((location) => {
        expect(validateLocation(location)).toBe(true)
      })
    })

    it('should be case-insensitive', () => {
      expect(validateLocation('HAMILTON')).toBe(true)
      expect(validateLocation('hamilton')).toBe(true)
      expect(validateLocation('Hamilton')).toBe(true)
    })

    it('should reject invalid locations', () => {
      const invalidLocations = ['Sydney', 'Melbourne', 'Invalid Location']

      invalidLocations.forEach((location) => {
        expect(validateLocation(location)).toBe(false)
      })
    })
  })
})
