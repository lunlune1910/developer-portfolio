# Dùng Node 20 Alpine (Nhẹ, ổn định)
FROM node:20-alpine

WORKDIR /app

# 1. Copy file package (Chỉ copy package.json để tránh lỗi lockfile của pnpm)
COPY package.json ./

# 2. Cài đặt thư viện bằng NPM (Nó sẽ tự tạo lockfile mới, tự sửa lỗi thiếu thư viện)
RUN npm install

# 3. Copy toàn bộ code vào
COPY . .

# 4. Build web
# Tắt telemetry để build nhanh hơn
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# 5. Mở cổng 3000
ENV PORT 3000
EXPOSE 3000

# 6. Chạy web
CMD ["npm", "start"]