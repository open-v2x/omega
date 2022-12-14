FROM node:14-alpine AS builder

COPY ./ /root/omega/
WORKDIR /root/omega
RUN npm i pnpm -g
RUN  pnpm config set network-timeout 300000 \
  && pnpm install \
  && pnpm run build:prod

# Step2. Put into nginx
FROM nginx:1.21.1-alpine

ARG REPO_URL
ARG BRANCH
ARG COMMIT_REF
LABEL repo-url=$REPO_URL
LABEL branch=$BRANCH
LABEL commit-ref=$COMMIT_REF

RUN mkdir /etc/nginx/omega

COPY --from=builder /root/omega/dist /var/www/omega/omega-portal
COPY --from=builder /root/omega/dist/index.html /var/www/omega/index.html
COPY ./deploy/init_env.sh /init_env.sh
WORKDIR /
CMD ["sh", "init_env.sh"]
