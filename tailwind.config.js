module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["DM Sans", "san-serif"],
      },
      colors: {
        bgMain: "#000000",
        pinkColor: "#f72585",
        primary: "#be0aff",
        secondary: "#00bbf9",
        third: "#ffc300",
        redBg: "#d00000",
        fourd: "rgba(255, 255, 255, 0.3)",
        five: "hsla(0,0%,100%,0.45)",
        starIcon: "#ffb703",
        cardBt: "#03071e",
        btnBn: "#eb5e28",
        textColor: "#9e9ea7",
        bgCard: "hsla(0,0%,100%,0.1)",
        scrollBg: `linear-gradient(117deg,#5a4be7,#c86dd7 102%)`,
        footerBg: "#03071e",
        bgCardMovie: "#1e1e1e",
        bgShadow: `rgba(0,0,0,0.5)`,
      },
      backgroundImage: {
        bgGradient: `linear-gradient(to right, #ff8a00, #ff2070)`,
      },
      screens: {
        xl: { max: "1200px" },
        lg: { max: "1023px" },
        ms: { max: "767px" },
        sx: { max: "576px" },
      },
    },
  },
  plugins: [],
};
