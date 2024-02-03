# เลือกฐานข้อมูลของ image
FROM node:18-alpine

# กำหนดไดเรกทอรีที่จะทำงาน
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json ไปยังไดเรกทอรีทำงาน
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์ทั้งหมดไปยังไดเรกทอรีทำงาน
COPY . .

# กำหนดพอร์ตที่แอปพลิเคชันจะทำงาน
EXPOSE 8080

# คำสั่งที่จะทำงานเมื่อ container ถูกเริ่มต้น
CMD [ "npm", "run","start" ]
