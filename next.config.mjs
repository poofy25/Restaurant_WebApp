/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com"]
    },
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(mp3)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/_next/static/sounds/',
              outputPath: 'static/sounds/',
            },
          },
        });
    
        return config;
    },
    reactStrictMode: true
};

export default nextConfig;
