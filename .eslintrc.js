module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true
    },
    extends: [
        'standard'
    ],
    globals: {
        __static: true
    },
    plugins: [
        'html'
    ],
    'rules': {
        "semi": "error",
        // allow paren-less arrow functions
        "space-before-function-paren": 0,
        "indent": ["error", 4]
        // 'no-debugger': 2
    }
}
