import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

function Profile() {
  return (
    <Fragment>
      <Header />

      <div className='wrapper profile'>
            <div className='row'>
                <div className='left-column'>
                    <div className='list'>
                        <NavLink to='/tai-khoan' className='list-item' activeClassName='active'>Cập nhật thông tin</NavLink>
                        <NavLink to='/thay-doi-mat-khau' className='list-item' activeClassName='active'>Thay đổi mật khẩu</NavLink>
                        <NavLink to='/quan-ly-api' className='list-item' activeClassName='active'>Quản lý API</NavLink>
                        <NavLink to='/goi-dich-vu' className='list-item' activeClassName='active'>Gói dịch vụ</NavLink>
                    </div>
                </div>

                <div className='right-column'>
                    <form className='auth-form'>
                        <h3 className='form__title'>Cập nhật thông tin</h3>

                        <div className='form__main'>
                            <div className='form-group'>
                                <label>Tên đăng nhập</label>
                                <input type='text' placeholder='Nhập tên đăng nhập của bạn' disabled={true} />
                            </div>

                            <div className='form-group'>
                                <label>Họ và tên</label>
                                <input type='text' placeholder='Nhập họ và tên đầy đủ của bạn' />
                            </div>

                            <div className='form-group'>
                                <label>Địa chỉ email</label>
                                <input type='email' placeholder='Nhập địa chỉ email của bạn' />
                            </div>

                            <button className='button'>Cập nhật thông tin</button>
                        </div>
                    </form>
                </div>
            </div>
      </div>

      <Footer />
    </Fragment>
  )
}

export default Profile
