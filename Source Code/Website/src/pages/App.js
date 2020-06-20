import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

function App() {
  return (
    <Fragment>
      <Header />

      <section className='jumbotron'>
        <h2>Vietnamese Text Classifier</h2>
        <p class='jumbotron__lead'>Phân loại văn bản tiếng Việt trực tuyến</p>
        <p class='jumbotron__description'>Phân loại văn bản là việc sắp xếp các văn bản vào các danh mục tương ứng với chúng như thể thao, giải trí, xã hội,... như các trang báo điện tử thường làm. Việc này có thể được thực hiện thủ công bởi các biên tập viên tuy nhiên đòi hỏi phải tiêu tốn nhiều thời gian và công sức. <strong>VietnameseTextClassifier</strong> là giải pháp giúp phân loại văn bản tiếng Việt một cách nhanh chóng và hiệu quả.</p>
        <div>
          <Link to='/gioi-thieu' className='button button-outlined'>Tìm hiểu thêm</Link>
        </div>
        <img src='https://helpex.vn/upload/2019/2/15/ar/11-24-25-086-abfdbd07-2dbf-40c5-a0ba-ba1496a33b3f.jpg' className='jumbotron__image' />
      </section>

      <div className="wrapper">
        <Main />
      </div>

      <Footer />
    </Fragment>
  );
}

export default App;
