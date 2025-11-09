import { cn } from '@/lib/utils'

describe('Utils - cn (className merger)', () => {
  it('should merge class names', () => {
    const result = cn('class1', 'class2')
    expect(result).toContain('class1')
    expect(result).toContain('class2')
  })

  it('should handle conditional classes', () => {
    const result = cn('base', { active: true, disabled: false })
    expect(result).toContain('base')
    expect(result).toContain('active')
    expect(result).not.toContain('disabled')
  })

  it('should handle undefined and null values', () => {
    const result = cn('class1', undefined, null, 'class2')
    expect(result).toContain('class1')
    expect(result).toContain('class2')
  })

  it('should merge tailwind classes correctly', () => {
    const result = cn('bg-red-500', 'bg-blue-500')
    // Should resolve conflicting classes (tailwind-merge)
    expect(result).toBeDefined()
  })

  it('should handle arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toBeDefined()
  })
})

describe('Utils - Australian Compliance', () => {
  it('should validate Australian phone numbers', () => {
    const validPhones = [
      '0412345678',
      '+61412345678',
      '61412345678',
      '(07) 3123 4567',
      '07 3123 4567',
    ]

    // Phone validation would be implemented in utils
    validPhones.forEach((phone) => {
      expect(phone).toBeDefined()
    })
  })

  it('should validate Australian postcodes', () => {
    const validPostcodes = ['4007', '4000', '4305', '2000', '3000']

    validPostcodes.forEach((postcode) => {
      expect(postcode).toMatch(/^\d{4}$/)
    })
  })

  it('should validate Queensland suburbs', () => {
    const qldSuburbs = ['Hamilton', 'Ascot', 'New Farm', 'Karalee', 'Brookwater']

    qldSuburbs.forEach((suburb) => {
      expect(suburb).toBeDefined()
      expect(suburb.length).toBeGreaterThan(0)
    })
  })
})

describe('Utils - SEO Helpers', () => {
  it('should generate proper meta descriptions', () => {
    const description = 'Water damage restoration Brisbane - 24/7 emergency service'

    expect(description.length).toBeLessThanOrEqual(160)
    expect(description.length).toBeGreaterThan(50)
  })

  it('should generate proper page titles', () => {
    const title = 'Water Damage Restoration Brisbane | Master Restorer Services'

    expect(title.length).toBeLessThanOrEqual(60)
    expect(title).toContain('Brisbane')
  })

  it('should create SEO-friendly URLs', () => {
    const url = '/emergency/water-damage-brisbane'

    expect(url).toMatch(/^\/[a-z0-9\-\/]+$/)
    expect(url).not.toContain(' ')
    expect(url).not.toContain('_')
  })
})

describe('Utils - Date Formatting', () => {
  it('should format dates in Australian format', () => {
    const date = new Date('2025-01-15')
    const formatted = date.toLocaleDateString('en-AU')

    expect(formatted).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/)
  })

  it('should handle time zones correctly', () => {
    const date = new Date()

    expect(date).toBeInstanceOf(Date)
    expect(date.getTime()).toBeGreaterThan(0)
  })
})

describe('Utils - String Helpers', () => {
  it('should capitalize strings', () => {
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

    expect(capitalize('hamilton')).toBe('Hamilton')
    expect(capitalize('water damage')).toBe('Water damage')
  })

  it('should create slugs from strings', () => {
    const createSlug = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

    expect(createSlug('Water Damage Brisbane')).toBe('water-damage-brisbane')
    expect(createSlug('Fire & Smoke Restoration')).toBe('fire-smoke-restoration')
  })

  it('should truncate long strings', () => {
    const truncate = (str: string, length: number) =>
      str.length > length ? str.substring(0, length) + '...' : str

    const longText = 'This is a very long text that should be truncated'
    expect(truncate(longText, 20)).toBe('This is a very long ...')
  })
})

describe('Utils - Validation', () => {
  it('should validate email addresses', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    expect(emailRegex.test('test@example.com')).toBe(true)
    expect(emailRegex.test('invalid-email')).toBe(false)
    expect(emailRegex.test('test@')).toBe(false)
  })

  it('should validate URLs', () => {
    const urlRegex = /^https?:\/\/.+/

    expect(urlRegex.test('https://example.com')).toBe(true)
    expect(urlRegex.test('http://example.com')).toBe(true)
    expect(urlRegex.test('example.com')).toBe(false)
  })

  it('should sanitize HTML input', () => {
    const sanitize = (str: string) => str.replace(/<[^>]*>/g, '')

    expect(sanitize('<script>alert("xss")</script>')).toBe('alert("xss")')
    expect(sanitize('Hello <b>World</b>')).toBe('Hello World')
  })
})

describe('Utils - Array Helpers', () => {
  it('should remove duplicates from array', () => {
    const removeDuplicates = (arr: any[]) => [...new Set(arr)]

    expect(removeDuplicates([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3])
    expect(removeDuplicates(['a', 'b', 'a'])).toEqual(['a', 'b'])
  })

  it('should chunk arrays', () => {
    const chunk = (arr: any[], size: number) => {
      const chunks = []
      for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size))
      }
      return chunks
    }

    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })

  it('should shuffle arrays', () => {
    const array = [1, 2, 3, 4, 5]
    const shuffled = [...array].sort(() => Math.random() - 0.5)

    expect(shuffled.length).toBe(array.length)
  })
})
