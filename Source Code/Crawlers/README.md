# Crawlers

## Thông tin chung

- Đây là bộ crawlers trích xuất dữ liệu bài viết thuộc 4 chủ đề: Công nghệ, giải trí, giáo dục, xe từ 4 trang báo lớn tại Việt Nam.
- Danh sách các trang báo được chọn:
  - [Báo điện tử Dân Trí](https://dantri.com.vn)
  - [Thanh Niên](https://thanhnien.vn)
  - [Tuổi Trẻ Online](https://tuoitre.vn)
  - [VnExpress](https://vnexpress.net)

## Thống kê

- Các bài viết sau khi được trích xuất đều được xử lý (lỗi chính tả, ký tự đặc biệt,...) và lưu lại dưới định dạng file text `*.txt` theo chuẩn mã hóa `utf-16`.
- Tất cả các bài viết thuộc cùng một chủ đề được gom lại và chia thành 1 tập train và 1 tập test theo tỉ lệ 80% train, 20% test.

<table>
  <thead>
    <tr>
      <th>STT</th>
      <th>Chủ đề</th>
      <th>Số bài cho tập train</th>
      <th>Số bài cho tập test</th>
      <th>Tổng số bài</th>
    </tr>
  </thead>
  
  <tbody>
    <tr>
      <td>1</td>
      <td>Công nghệ</td>
      <td>4757</td>
      <td>1189</td>
      <td>5946</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Giải trí</td>
      <td>2969</td>
      <td>742</td>
      <td>3711</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Giáo dục</td>
      <td>4155</td>
      <td>1038</td>
      <td>5193</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Xe</td>
      <td>3208</td>
      <td>803</td>
      <td>4011</td>
    </tr>
    <tr>
      <td colspan="2" style='text-align: right;'>Tổng</td>
      <td>15089</td>
      <td>3772</td>
      <td>18864</td>
    </tr>
  </tbody>
</table>
