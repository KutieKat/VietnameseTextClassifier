import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

function Login() {
  return (
    <Fragment>
      <Header />

      <div className='wrapper'>
        <form className='auth-form'>
            <h3 className='form__title'>Đăng nhập tài khoản</h3>
            <p className='form__subtitle'>Để nhận API key và sử dụng <strong>VietnameseTextClassifier</strong> cho ứng dụng của bạn</p>

            <div className='form__main'>
              <div className='form-group'>
                  <label>Tên đăng nhập</label>
                  <input type='text' placeholder='Nhập tên đăng nhập của bạn' />
              </div>

              <div className='form-group'>
                  <label>Mật khẩu</label>
                  <input type='password' placeholder='Nhập mật khẩu của bạn' />
              </div>

              <button className='button'>Đăng nhập</button>
            </div>

            <div className='messages'>
                Chưa có tài khoản? <Link to='/dang-ky' className='active'>Đăng ký</Link> ngay
            </div>
        </form>
      </div>

      <Footer />
    </Fragment>
  )
}

export default Login
