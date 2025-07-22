#!/bin/bash

# Step 1: Create project directory and initialize npm
echo ">>>>>>>>Creating project directory and initializing npm..."
mkdir -p addis-songs-app
cd addis-songs-app
npm init -y

# Step 2: Install React and React-DOM
echo ">>>>>>>>Installing React and React-DOM..."
npm install react react-dom

# Step 3: Install Webpack and Webpack CLI & Dev Server
echo ">>>>>>>>Installing Webpack, Webpack CLI, and Dev Server..."
npm install --save-dev webpack webpack-cli webpack-dev-server

# Step 4: Install Babel and presets
echo ">>>>>>>>Installing Babel and presets..."
npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react

# Step 5: Install HTML and CSS loaders
echo ">>>>>>>>Installing HTML, Style, and CSS loaders..."
npm install --save-dev html-webpack-plugin style-loader css-loader

# Step 6: Install dotenv-webpack for environment handling
echo ">>>>>>>>Installing dotenv-webpack..."
npm install --save-dev dotenv-webpack

# Step 7: Install file-loader for images and SVGs
echo ">>>>>>>>Installing file-loader..."
npm install --save-dev file-loader

# Step 8: Create project structure and files
echo ">>>>>>>>Creating project folders and initial files..."
mkdir -p public src
touch public/index.html src/App.jsx src/index.jsx .babelrc webpack.config.js package.json

# Step 9: Create Babel config
echo ">>>>>>>>Creating .babelrc..."
cat > .babelrc << EOL
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
EOL

# Step 10: Create HTML template
echo ">>>>>>>>Creating public/index.html..."
cat > public/index.html << EOL
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Addis Software Songs App</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
EOL

# Step 11: Create React index.jsx
echo ">>>>>>>>Creating src/index.jsx..."
cat > src/index.jsx << EOL
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//ReactDOM.render(<App />, document.getElementById("root"));

// Create a root.
const root = ReactDOM.createRoot(document.getElementById("root"));
// Render your App
root.render(<App />);
EOL

# Step 12: Create App.jsx component
echo ">>>>>>>>Creating src/App.jsx..."
cat > src/App.jsx << EOL
import React from "react";

const App = () => {
    return (
        <div>
            <h1>Addis Software Songs App</h1>
            <p>Webpack + React Manual Setup Test Project</p>
        </div>
    );
};

export default App;
EOL

# Step 13: Create webpack configuration
echo ">>>>>>>>Creating webpack.config.js..."
cat > webpack.config.js << EOL
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new Dotenv(),
  ],
  devServer: {
    static: "./dist",
    hot: true,
    open: true,
    port: 3000,
  },
  mode: "development",
};
EOL

# Step 14: Update package.json scripts
echo ">>>>>>>>Adding start and build scripts to package.json..."
# Using jq to update package.json safely
jq '.scripts = {
  "start": "webpack serve --mode development",
  "build": "webpack --mode production"
}' package.json > tmp.json && mv tmp.json package.json

# Final message
echo ">>>>>>>>Setup complete! To start the development server:"
echo "       npm start"
echo "Open http://localhost:3000 to view your app."

