// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        amber: {
          400: '#F59E0B',
          500: '#F59E0B',
          600: '#D97706',
        },
        slate: {
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      animation: {
        float1: 'float1 8s ease-in-out infinite',
        float2: 'float2 10s ease-in-out infinite',
      },
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(15px) translateX(-15px)' },
        },
      },
    },
  },
}