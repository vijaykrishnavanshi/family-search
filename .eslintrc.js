module.exports = {
    "plugins": [
        "node",
        "security"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:node/recommended",
        "plugin:security/recommended",
        "plugin:prettier/recommended"
    ],
    "rules": {
        "node/no-unsupported-features": "off",
        "node/no-extraneous-require": "off",
        "node/exports-style": ["error", "module.exports"],
	"no-console": "off"
    },
    "parserOptions": {
        "sourceType": "module"
    },
    "env": {
        "mocha": true,
        "node": true
    }
}

