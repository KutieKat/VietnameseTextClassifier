import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

function Register() {
  return (
    <Fragment>
      <Header />

      <div className='wrapper'>
        <form className='auth-form'>
          <h3 className='form__title'>Đăng ký tài khoản</h3>
          <p className='form__subtitle'>Để nhận API key và sử dụng <strong>VietnameseTextClassifier</strong> cho ứng dụng của bạn</p>

          <div className='form__main'>
            <div className='form-group'>
                <label>Tên đăng nhập</label>
                <input type='text' placeholder='Nhập tên đăng nhập của bạn' />
            </div>

            <div className='form-group'>
                <label>Họ và tên</label>
                <input type='text' placeholder='Nhập họ và tên đầy đủ của bạn' />
            </div>

            <div className='form-group'>
                <label>Địa chỉ email</label>
                <input type='email' placeholder='Nhập địa chỉ email của bạn' />
            </div>

            <div className='form-group'>
                <label>Mật khẩu</label>
                <input type='password' placeholder='Nhập mật khẩu của bạn' />
            </div>

            <div className='form-group'>
                <label>Xác nhận lại mật khẩu</label>
                <input type='password' placeholder='Xác nhận lại mật khẩu của bạn' />
            </div>

            <button className='button'>Đăng ký</button>
          </div>

          <div className='messages'>
              Đã có tài khoản? <Link to='/dang-nhap' className='active'>Đăng nhập</Link> ngay
          </div>
        </form>
      </div>

      <Footer />
    </Fragment>
  )
}

export default Register
