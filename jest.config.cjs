module.exports = {
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
     },

    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
    moduleFileExtensions: ['vue', 'js', 'ts'],
      transform: {
        "^.+\\.jsx?$": "babel-jest",
        '^.+\\.vue$' : '@vue/vue3-jest' , 
        "^.+\\.ts$": "ts-jest"
      },
   };