import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1rem',
  			sm: '1.5rem',
  			lg: '2rem',
  		},
  		screens: {
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1536px'
  		}
  	},
  	extend: {
  		colors: {
  			// shadcn/ui base colors
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			// Primary Brand Colors - Deep Professional Blue
  			primary: {
  				50: '#f0f4ff',
  				100: '#dce6ff',
  				200: '#b8ceff',
  				300: '#8aafff',
  				400: '#5a8aff',
  				500: '#2563eb',
  				600: '#1d4ed8',
  				700: '#1e40af',
  				800: '#1e3a8a',
  				900: '#1e293b',
  				DEFAULT: '#2465ED',
  				foreground: '#ffffff',
  			},
  			// Emergency Red
  			emergency: {
  				50: '#fff1f0',
  				100: '#ffe1de',
  				200: '#ffc7c2',
  				300: '#ffa09a',
  				400: '#ff6b60',
  				500: '#dc2626',
  				600: '#b91c1c',
  				700: '#991b1b',
  				800: '#7f1d1d',
  				900: '#450a0a',
  				DEFAULT: '#dc2626',
  				foreground: '#ffffff',
  			},
  			// Success Green
  			success: {
  				50: '#f0fdf4',
  				100: '#dcfce7',
  				200: '#bbf7d0',
  				300: '#86efac',
  				400: '#4ade80',
  				500: '#16a34a',
  				600: '#15803d',
  				700: '#166534',
  				800: '#14532d',
  				900: '#052e16',
  				DEFAULT: '#16a34a',
  				foreground: '#ffffff',
  			},
  			// Premium Gold
  			premium: {
  				50: '#fffbeb',
  				100: '#fef3c7',
  				200: '#fde68a',
  				300: '#fcd34d',
  				400: '#fbbf24',
  				500: '#d97706',
  				600: '#b45309',
  				700: '#92400e',
  				800: '#78350f',
  				900: '#451a03',
  				DEFAULT: '#d97706',
  				foreground: '#ffffff',
  			},
  			// Neutral Grays
  			neutral: {
  				50: '#fafafa',
  				100: '#f5f5f5',
  				200: '#e5e5e5',
  				300: '#d4d4d4',
  				400: '#a3a3a3',
  				500: '#737373',
  				600: '#525252',
  				700: '#404040',
  				800: '#262626',
  				900: '#171717',
  				950: '#0a0a0a',
  			},
  			// Chart Colors (from reference)
  			chart: {
  				1: 'hsl(var(--chart-1))',
  				2: 'hsl(var(--chart-2))',
  				3: 'hsl(var(--chart-3))',
  				4: 'hsl(var(--chart-4))',
  				5: 'hsl(var(--chart-5))',
  			},
  			// Sidebar Colors (from reference)
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))',
  			},
  			// Legacy compatibility
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'gradient-x': {
  				'0%, 100%': {
  					'background-size': '200% 200%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
  			},
  			'gradient-border-spin': {
  				'0%': {
  					'background-position': '0% 50%'
  				},
  				'50%': {
  					'background-position': '100% 50%'
  				},
  				'100%': {
  					'background-position': '0% 50%'
  				}
  			},
  			'float': {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			'pulse-glow': {
  				'0%': {
  					'box-shadow': '0 0 20px rgba(99, 102, 241, 0.3)',
  					'opacity': '0.8'
  				},
  				'100%': {
  					'box-shadow': '0 0 40px rgba(99, 102, 241, 0.6)',
  					'opacity': '1'
  				}
  			},
  			'shimmer': {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'gradient-x': 'gradient-x 15s ease infinite',
  			'gradient-border-spin': 'gradient-border-spin 3s linear infinite',
  			'float': 'float 6s ease-in-out infinite',
  			'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
  			'shimmer': 'shimmer 2s linear infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'system-ui',
  				'-apple-system',
  				'sans-serif'
  			],
  			display: [
  				'Poppins',
  				'system-ui',
  				'-apple-system',
  				'sans-serif'
  			]
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		transitionTimingFunction: {
  			'bounce-in': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  			smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  			magnetic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
export default config