export default {
    content: [
      "./index.html", // Entry HTML file
      "./src/**/*.{js,ts,jsx,tsx}", // Your component files
    ],
    theme: {
      extend: {},
    },
    plugins: [require('daisyui')], // Add DaisyUI here
    daisyui: {
      themes: ["light", "dark"], // Optional: Define your themes
    },
  };
  