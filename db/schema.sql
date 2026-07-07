-- Schéma de la base de données MediShop - Todo List
-- Extension nécessaire pour la génération d'UUID côté base (optionnelle, l'id est aussi généré côté Node)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS todos (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titre           VARCHAR(120) NOT NULL,
    description     TEXT DEFAULT '',
    statut          VARCHAR(20) NOT NULL DEFAULT 'a_faire'
                        CHECK (statut IN ('a_faire', 'en_cours', 'terminee')),
    date_creation    TIMESTAMPTZ NOT NULL DEFAULT now(),
    date_mise_a_jour TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index utile pour le filtre par statut (GET /api/todos?statut=)
CREATE INDEX IF NOT EXISTS idx_todos_statut ON todos (statut);
