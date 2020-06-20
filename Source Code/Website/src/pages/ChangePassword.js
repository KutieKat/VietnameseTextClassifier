import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

function ChangePassword() {
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
                        <h3 className='form__title'>Thay đổi mật khẩu</h3>

                        <div className='form__main'>
                            <div className='form-group'>
                                <label>Mật khẩu cũ</label>
                                <input type='password' placeholder='Nhập mật khẩu cũ của bạn' />
                            </div>

                            <div className='form-group'>
                                <label>Mật khẩu mới</label>
                                <input type='password' placeholder='Nhập mật khẩu mới của bạn' />
                            </div>

                            <div className='form-group'>
                                <label>Xác nhận lại mật khẩu</label>
                                <input type='password' placeholder='Xác nhận lại mật khẩu của bạn' />
                            </div>

                            <button className='button'>Thay đổi mật khẩu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <Footer />
    </Fragment>
  )
}

export default ChangePassword
