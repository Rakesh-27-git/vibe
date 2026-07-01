FROM node:22-slim

RUN apt-get update && apt-get install -y curl dos2unix && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY compile_page.sh /compile_page.sh
RUN dos2unix /compile_page.sh && chmod +x /compile_page.sh

WORKDIR /home/user/nextjs-app

RUN npx --yes create-next-app@latest . --yes --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"

RUN npx --yes shadcn@latest init --yes -b radix --force
RUN npx --yes shadcn@latest add --all --yes

RUN mv /home/user/nextjs-app/* /home/user/ && rm -rf /home/user/nextjs-app