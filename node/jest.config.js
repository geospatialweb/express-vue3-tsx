module.exports = {
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js'],
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
}
