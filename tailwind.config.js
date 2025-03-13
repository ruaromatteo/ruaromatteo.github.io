/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html"], // Ensure this points to your actual template files
  theme: {
    extend: {
      fontFamily: {
        "poppins-black": "poppins-black",
        "poppins-bold": "poppins-bold",
        "poppins-extrabold": "poppins-extrabold",
        "poppins-extralight": "poppins-extralight",
        "poppins-medium": "poppins-medium",
        "poppins-semibold": "poppins-semibold",
        "poppins-thin": "poppins-thin",
        "poppins-regular": "poppins-regular",
        "roboto-mono": "roboto-mono",
        "roboto-mono-bold": "roboto-mono-bold",
      },
    },
  },
  plugins: [
    require('tailwind-typewriter')({
      wordsets: {
        whoami: {
          words: ['whoami'],
          repeat: 0,
          eraseSpeed: 0,
          caretWidth: "2px",
        },
        whatilike: {
          words: ['ps aux | grep hobbies'],
          repeat: 0,
          eraseSpeed: 0,
          caretWidth: "2px",
        },
        journey: {
          words: ['echo $JOURNEY'],
          repeat: 0,
          eraseSpeed: 0,
          caretWidth: "2px",
        },
        skills: {
          words: ['awk \'{print $1, $NF}\' ~/skills.log'],
          repeat: 0,
          eraseSpeed: 0,
          caretWidth: "2px",
        },
        tools: {
          words: ['ls ~/tools/ | sort -n'],
          repeat: 0,
          eraseSpeed: 0,
          caretWidth: "2px",
        },
      }
    })
  ],
};