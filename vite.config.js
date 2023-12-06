import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: '/[name]-[hash].js',
        entryFileNames: '/[name]-[hash].js',
        
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
              return '/[name]-[hash][extname]';
          }
          
          if (/\.css$/.test(name ?? '')) {
              return '/[name]-[hash][extname]';   
          }
 
          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return '/[name]-[hash][extname]';
        },
      },
    }
  },
  plugins: [react(
    {
      template: {
        transformAssetUrls: {
            includeAbsolute: false,
            base: null,
        },
    },
    }
  )],
});