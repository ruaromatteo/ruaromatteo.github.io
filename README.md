# Portfolio Documentation

### [Click Here](https://sreekesh-k.github.io/Free-Portfolio-Template-Base/) To view Demo

## How to Use

This portfolio is designed to be simple to use. Just follow these steps:

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/sreekesh-k/Free-Portfolio-Template-Base.git
   ```
2. **Modify Placeholders**:

   - Open `index.html` and replace the placeholder content (text, images, links) with your own details.
   - Modify the assets in the `assets/` folder as needed.
3. **Deploy on GitHub Pages**:

   - Commit and push your changes to a GitHub repository.
   - Go to your repository settings → Pages → Select the `main` branch and `/ (root)` directory.
   - Save changes, and your portfolio will be live at `https://yourusername.github.io/your-repo/`.

## Advanced Customization

If you want to modify beyond just replacing placeholders, follow these steps:

### 1. Install Dependencies

This project uses TailwindCSS (version `3.4.17`). To get started, initialize a new npm project and install TailwindCSS:

```sh
npm init -y
npm install -D tailwindcss@3.4.17
```

### 2. Tailwind Configuration

Generate a TailwindCSS configuration file:

```sh
npx tailwindcss init
```

Modify `tailwind.config.js` to include custom fonts and content settings:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html"],
  theme: {
    extend: {
      fontFamily: {
        "popins-black": "popins-black",
        "popins-bold": "popins-bold",
        "popins-extrabold": "popins-extrabold",
        "popins-extralight": "popins-extralight",
        "popins-medium": "popins-medium",
        "popins-semibold": "popins-semibold",
        "popins-thin": "popins-thin",
        "popins-regular": "popins-regular",
      },
    },
  },
  plugins: [],
};
```

### 3. Compile TailwindCSS

Run the following command to generate the final CSS:

```sh
npx tailwindcss -i input.css -o style.css --watch
```

This command watches for changes in `input.css` and compiles them into `style.css`.

### 4. Custom Fonts

If you are adding custom fonts, ensure that you include `@font-face` rules in `input.css` before compiling. Example:

```css
@font-face {
  font-family: "popins-semibold";
  src: url("./assets/fonts/Poppins-SemiBold.ttf");
}
```

After adding the font rules in `input.css`, compile Tailwind again using:

```sh
npx tailwindcss -i input.css -o style.css --watch
```

Before deploying, ensure that the font rules from `input.css` are copied into `style.css`, or else they will not take effect.

### 5. Git Ignore

After making customizations, ensure that you ignore unnecessary files by adding the following to your `.gitignore` file:

```sh
node_modules/
package-lock.json
package.json
tailwind.config.js
```

This will prevent unnecessary files from being pushed to your repository.

## Customization

- **HTML**: Modify `index.html` to replace placeholder content with your own.
- **CSS**: Edit `anim.css` for custom animations or modify `input.css` if you are using Tailwind.
- **JavaScript**: Modify `script.js` to add interactivity.
- **Assets**: Replace the images and fonts in the `assets/` folder as needed.

## Contribution

Feel free to fork the repository and submit pull requests for improvements.
