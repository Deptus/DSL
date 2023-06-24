module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    {

      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack/main.ts',
        type: 'module',
        renderer: {
          config: './webpack/renderer.ts',
          entryPoints: [{
            name: 'main_window',
            ts: './src/renderer/main.tsx',
          }]
        }
      }
    }
  ],
};
