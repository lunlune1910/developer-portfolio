# Dùng Node 20 Alpine (Nhẹ, ổn định)
FROM node:20-alpine

WORKDIR /app

# 1. Copy file package để cài thư viện trước
COPY package*.json ./

# 2. Cài đặt thư viện (Dùng npm install cho chắc ăn)
RUN npm install

# 3. Copy toàn bộ code vào
COPY . .

# 4. Build web
RUN npm run build

# 5. Mở cổng 3000
EXPOSE 3000

# 6. Chạy web
CMD ["npm", "start"]
