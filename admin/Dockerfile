FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package và lock (nếu có)
COPY package*.json ./
COPY yarn.lock* ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ code
COPY . .

# Mặc định vite dev server chạy trên cổng 5173
EXPOSE 5173

# Copy app to app_bak
RUN cp -r /app /app_bak

# Copy từ bak sang /app Chạy ứng dụng ở chế độ dev, cho phép host 0.0.0.0 để truy cập từ bên ngoài container

CMD ["sh", "-c", "cp -r /app_bak/* /app && npm run dev -- --host 0.0.0.0"]
