module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": 0,
        "react/jsx-indent": ["error", 2],
        "react/jsx-closing-bracket-location": [1, 'tag-aligned'],
        "react/jsx-curly-spacing": [2, {"when": "never", "children": true}],
        "react/jsx-equals-spacing": [2, "never"],
        "react/jsx-wrap-multilines": ["error", {
            "declaration": "parens-new-line",
            "assignment": "parens-new-line",
            "return": "parens-new-line",
            "arrow": "parens-new-line",
            "condition": "parens-new-line",
            "logical": "ignore",
            "prop": "ignore"
        }]
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
};