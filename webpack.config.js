const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
const glob = require("glob");

const mode = process.env.NODE_ENV || "development";

const devMode = mode === "development";

const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

let cleanVar = !devMode;

module.exports = {
  mode,
  target,
  devtool,
  watch: true,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "src"), // Замените 'public' на ваш каталог с контентом
    },
  },
  entry: ["@babel/polyfill", path.resolve(__dirname, "src", "js", "index.js"), path.resolve(__dirname, "src", "css", "index.scss")],

  output: {
    path: path.resolve(__dirname, "dist"),
    clean: cleanVar,
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/[name][ext]",
  },
  plugins: [
    ...glob.sync("./src/*.html").map((htmlFile) => {
      return new HtmlWebpackPlugin({
        template: htmlFile,
        filename: path.basename(htmlFile),
        publicPath: "", // Указывает корневой путь для загрузки ресурсов
      });
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "./[id].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(c||sa|sc)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-preset-env")],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[ext]",
        },
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: "asset/resource",
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
