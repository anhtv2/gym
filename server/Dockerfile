FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app

# Sao chép file package và cài đặt dependencies
COPY package*.json yarn.lock* ./
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Xuất port của ứng dụng
EXPOSE 3000
# Mở cổng debug Node.js
EXPOSE 9229
# Copy app to app_bak
RUN cp -r /usr/src/app /app_bak


# CMD chạy migrations, seed rồi mới chạy app ở chế độ debug
CMD sh -c "cp -r /app_bak/* /usr/src/app && npm run migration:run && npm run seed:run && npm run start:debug"
