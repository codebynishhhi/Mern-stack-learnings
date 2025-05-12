import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Adjust paths as necessary
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
