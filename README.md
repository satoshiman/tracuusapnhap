# About

- Repo này cung cấp dữ liệu dạng JSON cho các tỉnh, xã, phường, đặc khu của Việt Nam sau sáp nhập.
- Bạn có thể lấy thông tin từ folder `finedData` hoặc `raw`.
- Nếu bạn sử dụng vui lòng để nguồn bando.com.vn

# Data Structure

- Data raw từ https://sapnhap.bando.com.vn/ được lưu trong folder `raw`.
- Data đã được xử lý được lưu trong folder `finedData`. Việc xử lý có thể gây ra sai sót hoặc thiếu dữ liệu, vui lòng kiểm tra trước khi sử dụng.

# Crawled Data

- Data này được crawl từ https://sapnhap.bando.com.vn/, chỉ để tham khảo.
- Tất cả dữ liệu chỉ được sử dụng để tham khảo, tôi không sở hữu dữ liệu này.
- Nếu có bất kỳ vấn đề nào hoặc thiếu dữ liệu, vui lòng mở một issue.

# How to run

- run `node crawl/getProvince.js` to get province data.
- run `node crawl/fetchWard.js` to get ward data.
- run `node refineCommune.js` to refine commune data.
- run `node refineProvince.js` to refine province data.

# Note

- HoangSa, Truong Sa belong to Vietnam.
- Hoàng Sa, Trường Sa thuộc về Việt Nam.
