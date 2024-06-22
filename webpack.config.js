const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

const config = {
    mode:'development',
    entry:'./src/index.tsx',
    output: {
        filename: 'bundle.js'
    },
    devServer: {
        port: port,
        open: true,
        host: "localhost", 
    },
    plugins: [
		new HtmlWebpackPlugin({
            // 번들링시 그대로 가져갈 html 파일
          	// 해당 html 파일에는 react 가 렌더링할 HTMLElement 가 있어야한다.
			template: "public/index.html",
		})
	],
	module: {
		rules: [
			{
              	// typscript를 webpack이 이해하게 한다.
				test: /\.(ts|tsx)$/i,
				loader: "ts-loader",
				exclude: ["/node_modules/"],
			},
			{
              	// css에 대한 설정
				test: /\.css$/i,
				use: ["css-loader", "postcss-loader"],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                // 번들링시 파일을 base64로 인코딩 하지 않고 파일째로 나오게함
                // "url-loader" 플러그인이 필요하지 않게 됨!
				type: "asset/resource",
                generator: {
                    // 번들링 된 파일을 이름 그대로 생성함
					filename: "public/[name][ext]",
				},
			},
		],
	},
	resolve: {
      	// 중요! tsconfig 와 경로가 같아야한다.
		alias: {
			src: path.resolve(__dirname, "src"),
			public: path.resolve(__dirname, "public"),
		},
		extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
	},
}

module.exports = () => {
    return config;
}