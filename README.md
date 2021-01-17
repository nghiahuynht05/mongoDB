# Install
npm i 

# Run
- Run in on feature
NODE_ENV=[config] npm test test/feature/test.feature

- Run in all feature
NODE_ENV=[config] npm test test/feature/*.feature
NODE_ENV=[config] npm test test/feature/test.feature test/feature/test.feature

config: match with file name in confign folder.

Notes: Runing with debug info
DEBUB=[tag] NODE_ENV=[config] npm test test/feature/test.feature test/feature/test.feature

tag: match with info debug

# Example
DEBUB=MongoDB NODE_ENV=home npm test test/feature/test.feature test/feature/test.feature
