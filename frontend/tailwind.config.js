export default  {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [
    function ({addUtilities})
    {
      const newUtilities={
        ".no-scrollbar::-webkit-scrollbar":{
          display: "none",
        },
        ".no-scrollbar":{
          "-ms-overflow-style":"none",
          "scrollbar-width":"none",
        },
      };

      addUtilities(newUtilities);
    }
  ],
}