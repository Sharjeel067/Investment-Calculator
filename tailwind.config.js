/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add extra small breakpoint for better mobile control
      screens: {
        'xs': '475px',
        // Default breakpoints: sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
      },
      
      colors: {
        background: {
          DEFAULT: 'var(--background)',
          secondary: 'var(--background-secondary)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          secondary: 'var(--surface-secondary)',
        },
        
        border: {
          DEFAULT: 'var(--border)',
          secondary: 'var(--border-secondary)',
        },
        
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-light)',
          dark: 'var(--accent-dark)',
        },
        
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          light: 'var(--text-light)',
        },
        
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)',
        
        card: {
          blue: 'var(--card-blue)',
          emerald: 'var(--card-emerald)',
          purple: 'var(--card-purple)',
          orange: 'var(--card-orange)',
        },
      },
      
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-background': 'var(--gradient-background)',
      },
      
      boxShadow: {
        'custom-sm': 'var(--shadow-sm)',
        'custom-md': 'var(--shadow-md)',
        'custom-lg': 'var(--shadow-lg)',
        'custom-xl': 'var(--shadow-xl)',
      },
      
      borderRadius: {
        'custom-sm': 'var(--radius-sm)',
        'custom-md': 'var(--radius-md)',
        'custom-lg': 'var(--radius-lg)',
        'custom-xl': 'var(--radius-xl)',
        'custom-2xl': 'var(--radius-2xl)',
      },
      
      spacing: {
        'custom-xs': 'var(--space-xs)',
        'custom-sm': 'var(--space-sm)',
        'custom-md': 'var(--space-md)',
        'custom-lg': 'var(--space-lg)',
        'custom-xl': 'var(--space-xl)',
        'custom-2xl': 'var(--space-2xl)',
      },
      
      fontSize: {
        'custom-xs': 'var(--font-size-xs)',
        'custom-sm': 'var(--font-size-sm)',
        'custom-base': 'var(--font-size-base)',
        'custom-lg': 'var(--font-size-lg)',
        'custom-xl': 'var(--font-size-xl)',
        'custom-2xl': 'var(--font-size-2xl)',
        'custom-3xl': 'var(--font-size-3xl)',
        'custom-4xl': 'var(--font-size-4xl)',
        'custom-5xl': 'var(--font-size-5xl)',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      
      backdropBlur: {
        'custom': '10px',
      },
      
      // Add responsive container sizes
      maxWidth: {
        'screen-3xs': '320px',
        'screen-2xs': '375px',
        'screen-xs': '475px',
      },
      
      // Add responsive line heights for better mobile typography
      lineHeight: {
        'mobile': '1.4',
        'tablet': '1.5',
        'desktop': '1.6',
      },
      
      // Add touch-friendly sizing
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [
    function({ addUtilities, addComponents, theme }) {
      // Add responsive text utilities
      addUtilities({
        '.text-gradient-primary': {
          'background': 'var(--gradient-primary)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.bg-gradient-primary': {
          'background': 'var(--gradient-primary)',
        },
        '.glassmorphism': {
          'background': 'rgba(255, 255, 255, 0.9)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.dark .glassmorphism': {
          'background': 'rgba(30, 41, 59, 0.9)',
          'border': '1px solid rgba(71, 85, 105, 0.3)',
        },
        
        // Responsive text utilities
        '.text-responsive-xs': {
          fontSize: '0.75rem',
          '@screen sm': {
            fontSize: '0.875rem',
          },
        },
        '.text-responsive-sm': {
          fontSize: '0.875rem',
          '@screen sm': {
            fontSize: '1rem',
          },
        },
        '.text-responsive-base': {
          fontSize: '1rem',
          '@screen sm': {
            fontSize: '1.125rem',
          },
        },
        '.text-responsive-lg': {
          fontSize: '1.125rem',
          '@screen sm': {
            fontSize: '1.25rem',
          },
        },
        '.text-responsive-xl': {
          fontSize: '1.25rem',
          '@screen sm': {
            fontSize: '1.5rem',
          },
        },
        '.text-responsive-2xl': {
          fontSize: '1.5rem',
          '@screen sm': {
            fontSize: '1.875rem',
          },
        },
        '.text-responsive-3xl': {
          fontSize: '1.875rem',
          '@screen sm': {
            fontSize: '2.25rem',
          },
        },
      });
      
      // Add responsive component classes
      addComponents({
        '.container-responsive': {
          width: '100%',
          paddingLeft: theme('spacing.3'),
          paddingRight: theme('spacing.3'),
          '@screen sm': {
            paddingLeft: theme('spacing.4'),
            paddingRight: theme('spacing.4'),
          },
          '@screen lg': {
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6'),
          },
        },
        
        '.card-responsive': {
          padding: theme('spacing.3'),
          borderRadius: theme('borderRadius.lg'),
          '@screen sm': {
            padding: theme('spacing.4'),
            borderRadius: theme('borderRadius.xl'),
          },
          '@screen lg': {
            padding: theme('spacing.6'),
            borderRadius: theme('borderRadius.2xl'),
          },
        },
        
        '.button-responsive': {
          paddingTop: theme('spacing.2'),
          paddingBottom: theme('spacing.2'),
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          fontSize: theme('fontSize.sm'),
          minHeight: theme('minHeight.touch'),
          minWidth: theme('minWidth.touch'),
          '@screen sm': {
            paddingTop: theme('spacing.3'),
            paddingBottom: theme('spacing.3'),
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6'),
            fontSize: theme('fontSize.base'),
          },
        },
        
        '.input-responsive': {
          paddingTop: theme('spacing.2'),
          paddingBottom: theme('spacing.2'),
          paddingLeft: theme('spacing.3'),
          paddingRight: theme('spacing.3'),
          fontSize: theme('fontSize.sm'),
          '@screen sm': {
            paddingTop: theme('spacing.3'),
            paddingBottom: theme('spacing.3'),
            paddingLeft: theme('spacing.4'),
            paddingRight: theme('spacing.4'),
            fontSize: theme('fontSize.base'),
          },
        },
        
        // Chart responsive container
        '.chart-container': {
          height: '16rem',
          '@screen sm': {
            height: '20rem',
          },
          '@screen lg': {
            height: '24rem',
          },
        },
        
        // Mobile-first grid utilities
        '.grid-responsive-cards': {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
          gap: theme('spacing.3'),
          '@screen xs': {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          },
          '@screen lg': {
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: theme('spacing.6'),
          },
        },
        
        '.grid-responsive-2-col': {
          display: 'grid',
          gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
          gap: theme('spacing.4'),
          '@screen sm': {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          },
          '@screen xl': {
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: theme('spacing.6'),
          },
        },
      });
    }
  ],
}