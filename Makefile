.PHONY: install publish lint lint-fix test-coverage

install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test-coverage:
	npm test -- --coverage