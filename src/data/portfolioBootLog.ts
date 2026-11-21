export const BOOT_READY_URL = "https://jayveeembog.pages.dev";

export const BOOT_LOG = `  node    v22.11.0
  npm     v10.9.0
  env     development
  pid     48213
  cwd     /home/dev/acme-platform

[boot] loading .env, .env.local (41 variables)
[boot] validating config with zod ... ok
[boot] resolving service graph (postgres -> redis -> queue -> services -> http -> vite)

[postgres] connecting to postgresql://app_rw@localhost:5432/acme_dev
[postgres] pg-pool: min=2 max=20 idleTimeoutMillis=30000
[postgres] server version: PostgreSQL 16.4
[postgres] connected in 38ms
[postgres] checking migrations (knex) ...
[postgres] current batch: 41, pending: 2
[postgres] running 20261121_add_orders_idx.js ...... done (412ms)
[postgres] running 20261121_user_prefs_jsonb.js .... done (97ms)
[postgres] migrations complete, batch: 42
[postgres] WARN  slow query (1204ms): SELECT * FROM events WHERE created_at > $1
[postgres] WARN  table "events" has 38.2M rows, consider partitioning
[postgres] seeding skipped (NODE_ENV=development, tables not empty)

[redis] connecting to redis://localhost:6379 (ioredis v5.4.1)
[redis] ready, version 7.2.5, mode standalone
[redis] cache warm-up: sessions, feature_flags, product_catalog
[redis] loaded 18,402 keys in 214ms
[redis] eviction policy: allkeys-lru, maxmemory 256mb

[queue] connecting to amqp://localhost:5672 (amqplib)
[queue] channel opened
[queue] asserted queues: orders.new, orders.paid, email.send, search.index
[queue] consumers attached: 4

[services] spawning microservices (child_process, 5 workers)
[services] auth-service        pid 48231  grpc :50051  ready (212ms)
[services] user-service        pid 48232  grpc :50052  ready (240ms)
[services] catalog-service     pid 48233  grpc :50053  ready (265ms)
[services] order-service       pid 48234  grpc :50054  ERR  ECONNREFUSED 127.0.0.1:50055
[services] order-service       retry 1/5 in 500ms ...
[services] payment-service     pid 48235  grpc :50055  ready (310ms)
[services] order-service       retry 1/5 ok
[services] notification-worker pid 48236  ready (consumers: 8)
[services] 6/6 services healthy

[express] initializing app (express 4.21.1)
[express] middleware: helmet, cors, compression, cookie-parser, express-rate-limit
[express] session store: connect-redis (ttl 86400s)
[express] logging: morgan (dev), pino (json -> logs/app.log)
[express] mounted /api/auth        -> auth-service (grpc)
[express] mounted /api/users       -> user-service (grpc)
[express] mounted /api/catalog     -> catalog-service (grpc)
[express] mounted /api/orders      -> order-service (grpc)
[express] mounted /api/payments    -> payment-service (grpc)
[express] mounted /api/health      -> built-in
[express] mounted /ws              -> socket.io v4.8.1 (redis adapter)
[express] listening on http://localhost:4000

  VITE v5.4.10  ready in 612 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.42:5173/
  ➜  press h + enter to show help

[vite] plugins: @vitejs/plugin-react (SWC), vite-tsconfig-paths, vite-plugin-svgr
[vite] proxy: /api -> http://localhost:4000, /ws -> ws://localhost:4000
[vite] pre-bundling dependencies:
         react, react-dom, react-router-dom, @tanstack/react-query,
         zustand, axios, socket.io-client, date-fns
[vite] dependencies optimized (8 packages) in 1.84s
[vite] hmr connected (websocket)

[react] StrictMode enabled
[react] routes: / , /login , /catalog , /catalog/:id , /cart , /checkout , /account , /admin/*
[react] code splitting: 6 lazy chunks
[react] query client: staleTime 30s, retry 2

[health] GET /api/health
         postgres ......... ok  (3ms)
         redis ............ ok  (1ms)
         rabbitmq ......... ok  (5ms)
         auth-service ..... ok  (8ms)
         user-service ..... ok  (7ms)
         catalog-service .. ok  (9ms)
         order-service .... ok  (11ms)
         payment-service .. ok  (13ms)
[health] status: healthy (8/8)

[boot] startup complete in 4.37s
[boot] app ready -> ${BOOT_READY_URL}`;
