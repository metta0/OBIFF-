# 1. Base image로 NGINX 선택
FROM nginx:alpine

# 2. NGINX 기본 설정 파일을 삭제하고, 사용자 설정 복사
COPY ./config/nginx.conf /etc/nginx/conf.d

# 3. 현재 디렉토리의 모든 파일을 NGINX 웹 서버의 기본 경로로 복사
COPY . /usr/share/nginx/html

# 4. NGINX는 기본적으로 80번 포트를 사용
EXPOSE 80

# 5. NGINX를 foreground 모드로 실행 (컨테이너 실행 유지)
CMD ["nginx", "-g", "daemon off;"]
