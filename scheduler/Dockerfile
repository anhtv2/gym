# Sử dụng Python 3.11 slim làm base image (nhỏ gọn)
FROM python:3.11-slim

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Cài đặt các dependencies hệ thống cần thiết (nếu có)
# pulp sử dụng CBC solver (đã tích hợp sẵn), có thể cần cài đặt thêm một số lib nếu cần.
# Nếu không cần gì thêm thì có thể bỏ RUN này.
RUN apt-get update && apt-get install -y --no-install-recommends build-essential && rm -rf /var/lib/apt/lists/*

# Sao chép file requirements.txt vào container
COPY requirements.txt ./

# Cài đặt các dependencies Python
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mặc định chạy uvicorn server trên cổng 8000
EXPOSE 8000

# Chạy ứng dụng FastAPI bằng uvicorn
# --host 0.0.0.0 để lắng nghe mọi kết nối từ bên ngoài container
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
