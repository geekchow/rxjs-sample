module.exports = {
    preset: "jest-preset-typescript",
    testPathIgnorePatterns: [
        'node_modules',
        './dist/tsc-out/',
    ],
}