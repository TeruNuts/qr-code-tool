# =============================================================================
# Dependencies Stage - 依存関係インストール
# =============================================================================
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package.json package-lock.json ./
# Clean install (本番用依存関係のみ)
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# =============================================================================
# Builder Stage - アプリケーションビルド
# =============================================================================
FROM node:18-alpine AS builder
WORKDIR /app

# 依存関係を前のステージからコピー
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts && npm cache clean --force

# ソースコードをコピー
COPY . .

# Next.js テレメトリを無効化
ENV NEXT_TELEMETRY_DISABLED=1
# 本番用ビルド実行
RUN npm run build

# =============================================================================
# Runner Stage - 本番実行環境
# =============================================================================
FROM node:18-alpine AS runner
WORKDIR /app

# 本番環境設定
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# セキュリティ: 非root ユーザー作成
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 本番依存関係のみを deps ステージからコピー
COPY --from=deps /app/node_modules ./node_modules

# Public ファイルをコピー
COPY --from=builder /app/public ./public

# Next.js 出力ファイルをコピー (適切な権限で)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 非rootユーザーに切り替え
USER nextjs

# ポート公開
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# アプリケーション起動
CMD ["node", "server.js"]
