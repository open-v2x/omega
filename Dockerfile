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
ARG GIR_BRANCH
ARG GIT_COMMIT
ARG RELEASE_VERSION

LABEL omega.build_branch=${GIT_BRANCH} \
      omega.build_commit=${GIT_COMMIT} \
      omega.repo_url=${REPO_URL} \
      omega.release_version=${RELEASE_VERSION}


RUN mkdir /etc/nginx/omeg

COPY --from=builder /root/omega/dist /var/www/omega
COPY ./deploy/init_env.sh /init_env.sh
WORKDIR /
CMD ["sh", "init_env.sh"]
