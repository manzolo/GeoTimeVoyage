# GeoTime Voyage — Makefile
# Comodi alias per i comandi Docker.

COMPOSE ?= docker compose

.DEFAULT_GOAL := help

.PHONY: help build up up-fg down restart logs preview prod-down build-static clean install

help: ## Mostra questo aiuto
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

build: ## Costruisce le immagini Docker
	$(COMPOSE) build

up: ## Avvia lo sviluppo in background (detach) → http://localhost:5173
	$(COMPOSE) up -d dev
	@echo ""
	@echo "  ✅ GeoTime Voyage attivo → http://localhost:5173"
	@echo "     'make logs' per i log · 'make down' per fermare"

up-fg: ## Avvia lo sviluppo in primo piano (log a schermo)
	$(COMPOSE) up dev

down: ## Ferma e rimuove i container
	$(COMPOSE) down

restart: ## Riavvia l'ambiente di sviluppo
	$(COMPOSE) up -d --force-recreate dev
	@echo "  🔄 Riavviato → http://localhost:5173"

logs: ## Mostra i log del container di sviluppo
	$(COMPOSE) logs -f dev

preview: ## Costruisce e serve la versione di produzione su http://localhost:8080
	$(COMPOSE) --profile prod up --build prod

prod-down: ## Ferma il container di produzione
	$(COMPOSE) --profile prod down

build-static: ## Genera i file statici in ./dist (per deploy manuale su GitHub Pages)
	docker run --rm -v "$(PWD)":/app -w /app -e VITE_BASE=/GeoTimeVoyage/ node:22-alpine \
		sh -c "npm install && npm run build"

install: ## Installa le dipendenze npm in locale (senza Docker)
	npm install

clean: ## Rimuove container, volumi e build locali
	$(COMPOSE) down -v --remove-orphans
	rm -rf dist node_modules
