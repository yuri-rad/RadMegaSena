/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Essencial para gerar a pasta 'out'
  basePath: '/RadMegaSena', // Apenas se não for o domínio principal
  images: {
    unoptimized: true, // O GitHub Pages não suporta a otimização de imagem padrão do Next
  },
};

export default nextConfig;