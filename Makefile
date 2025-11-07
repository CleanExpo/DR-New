.PHONY: help setup install dev build test clean lint format check docker-up docker-down

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

help: ## Show this help message
	@echo '$(BLUE)Disaster Recovery Local Service - Development Commands$(NC)'
	@echo ''
	@echo 'Usage:'
	@echo '  make $(GREEN)<target>$(NC)'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  $(GREEN)%-20s$(NC) %s\n", $$1, $$2}' $(MAKEFILE_LIST)

setup: ## Complete development environment setup
	@echo '$(BLUE)Setting up development environment...$(NC)'
	@node scripts/dev-setup.js

install: ## Install dependencies
	@echo '$(BLUE)Installing dependencies...$(NC)'
	@npm install

dev: ## Start development server
	@echo '$(BLUE)Starting development server...$(NC)'
	@npm run dev

dev-check: ## Check development environment health
	@echo '$(BLUE)Checking development environment...$(NC)'
	@node scripts/dev-check.js

build: ## Build for production
	@echo '$(BLUE)Building for production...$(NC)'
	@npm run build

build-analyze: ## Build and analyze bundle size
	@echo '$(BLUE)Building and analyzing bundle...$(NC)'
	@ANALYZE=true npm run build

start: ## Start production server
	@echo '$(BLUE)Starting production server...$(NC)'
	@npm run start

test: ## Run all tests
	@echo '$(BLUE)Running tests...$(NC)'
	@npm run test

test-watch: ## Run tests in watch mode
	@echo '$(BLUE)Running tests in watch mode...$(NC)'
	@npm run test:watch

test-coverage: ## Run tests with coverage report
	@echo '$(BLUE)Running tests with coverage...$(NC)'
	@npm run test:coverage

test-e2e: ## Run end-to-end tests
	@echo '$(BLUE)Running E2E tests...$(NC)'
	@npm run test:e2e

test-e2e-ui: ## Run E2E tests with UI
	@echo '$(BLUE)Running E2E tests with UI...$(NC)'
	@npm run test:e2e:ui

lint: ## Run linter
	@echo '$(BLUE)Running linter...$(NC)'
	@npm run lint

lint-fix: ## Fix linting issues
	@echo '$(BLUE)Fixing linting issues...$(NC)'
	@npm run lint:fix

format: ## Format code with Prettier
	@echo '$(BLUE)Formatting code...$(NC)'
	@npx prettier --write .

format-check: ## Check code formatting
	@echo '$(BLUE)Checking code formatting...$(NC)'
	@npx prettier --check .

type-check: ## Run TypeScript type checking
	@echo '$(BLUE)Running type check...$(NC)'
	@npm run type-check

check: ## Run all checks (lint, format, type-check, test)
	@echo '$(BLUE)Running all checks...$(NC)'
	@make lint
	@make format-check
	@make type-check
	@make test

clean: ## Clean build artifacts and dependencies
	@echo '$(YELLOW)Cleaning build artifacts...$(NC)'
	@rm -rf .next
	@rm -rf node_modules
	@rm -rf coverage
	@rm -rf dist
	@rm -rf build
	@rm -rf playwright-report
	@rm -rf test-results
	@echo '$(GREEN)Clean complete!$(NC)'

clean-cache: ## Clean Next.js cache only
	@echo '$(YELLOW)Cleaning Next.js cache...$(NC)'
	@rm -rf .next
	@echo '$(GREEN)Cache cleaned!$(NC)'

db-migrate: ## Run database migrations
	@echo '$(BLUE)Running database migrations...$(NC)'
	@npm run db:migrate

db-push: ## Push database schema changes
	@echo '$(BLUE)Pushing database schema...$(NC)'
	@npm run db:push

db-studio: ## Open Prisma Studio
	@echo '$(BLUE)Opening Prisma Studio...$(NC)'
	@npm run db:studio

db-seed: ## Seed database with test data
	@echo '$(BLUE)Seeding database...$(NC)'
	@npm run seed

images-optimize: ## Optimize images
	@echo '$(BLUE)Optimizing images...$(NC)'
	@npm run optimize-images

deploy-preview: ## Deploy preview to Vercel
	@echo '$(BLUE)Deploying preview...$(NC)'
	@vercel

deploy-production: ## Deploy to production
	@echo '$(YELLOW)Deploying to production...$(NC)'
	@vercel --prod

monitor: ## Monitor deployment status
	@echo '$(BLUE)Monitoring deployments...$(NC)'
	@npm run monitor

# Git workflow helpers
commit: ## Interactive commit with conventional commit format
	@echo '$(BLUE)Creating commit...$(NC)'
	@git add -A
	@git status
	@echo ''
	@echo 'Commit types: feat, fix, docs, style, refactor, perf, test, chore, build, ci'
	@read -p "Type (e.g., feat): " type; \
	read -p "Scope (e.g., auth): " scope; \
	read -p "Message: " msg; \
	git commit -m "$$type($$scope): $$msg"

push: check ## Run checks and push to remote
	@echo '$(BLUE)Running checks before push...$(NC)'
	@git push

update: ## Update dependencies
	@echo '$(BLUE)Updating dependencies...$(NC)'
	@npm update
	@npm audit fix

security-audit: ## Run security audit
	@echo '$(BLUE)Running security audit...$(NC)'
	@npm audit
	@npm run check:critical

# Development workflow
quick-start: install setup dev-check ## Quick start: install, setup, check
	@echo '$(GREEN)Ready to start development!$(NC)'
	@echo 'Run: make dev'

ci: lint type-check test ## Run CI checks locally
	@echo '$(GREEN)All CI checks passed!$(NC)'
