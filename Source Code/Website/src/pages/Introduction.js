import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

function Introduction() {
  return (
    <Fragment>
      <Header />

      <div className='wrapper details'>
        <h2>Giới thiệu</h2>
        <h3>Giới thiệu chung</h3>
        <ul>
          <li>Phân loại văn bản là việc sắp xếp các văn bản vào các danh mục tương ứng với chúng như thể thao, giải trí, xã hội,... như các trang báo điện tử thường làm. Việc này có thể được thực hiện thủ công bởi các biên tập viên tuy nhiên đòi hỏi phải tiêu tốn nhiều thời gian và công sức. VietnameseTextClassifier là giải pháp giúp phân loại văn bản tiếng Việt một cách nhanh chóng và hiệu quả.</li>
          <li><strong>VietnameseTextClassifier</strong> là API hỗ trợ phân loại văn bản tiếng Việt tự động. API nhận đầu vào là API key của người dùng và văn bản tiếng Việt cần phân loại, kết quả trả về là nhãn tương ứng được gán cho văn bản đó.</li>
          <li><strong>VietnameseTextClassifier</strong> cung cấp các gói dịch vụ để người dùng chọn lựa sao cho phù hợp với nhu cầu sử dụng của mình.</li>
        </ul>

        <h3>Chức năng chính</h3>
        <ul>
          <li>Phân loại một văn bản</li>
          <li>Phân loại nhiều văn bản</li>
        </ul>

        <h3>Đối tượng sử dụng</h3>
        <p>Bất cứ cá nhân/ tổ chức nào có nhu cầu phân loại văn bản tiếng Việt.</p>

        <h3>Các gói dịch vụ</h3>
        <p>Mặc định, mỗi API cho phép gọi tối đa 100 requests. Nếu có nhu cầu gọi nhiều hơn số lượng requests mặc định này, các bạn có thể nâng cấp lên các gói dịch vụ như sau:</p>
        <ul>
          <li><strong>Gói A: </strong> Cho phép gọi tối đa 1.000 requests.</li>
          <li><strong>Gói B: </strong> Cho phép gọi tối đa 10.000 requests.</li>
          <li><strong>Gói C: </strong> Cho phép gọi tối đa 100.000 requests.</li>
        </ul>

        <h3>Cách sử dụng API</h3>
        <p>Xem cách sử dụng API chi tiết được trình bày trong mục <Link to='/huong-dan-su-dung-api' className='active'><strong>Hướng dẫn sử dụng API</strong></Link>.</p>
      </div>

      <Footer />
    </Fragment>
  )
}

export default Introduction
