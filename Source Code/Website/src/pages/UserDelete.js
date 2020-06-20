import React, { Fragment } from 'react'
import { NavLink, Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

function UserDelete() {
  return (
    <Fragment>
      <Header />

      <div className='wrapper profile'>
            <div className='row'>
                <div className='left-column'>
                    <div className='list'>
                        <NavLink to='/bang-dieu-khien/tong-quan' className='list-item' activeClassName='active'>Tổng quan</NavLink>
                        <NavLink to='/bang-dieu-khien/nguoi-dung' className='list-item' activeClassName='active'>Quản lý người dùng</NavLink>
                        <NavLink to='/bang-dieu-khien/request' className='list-item' activeClassName='active'>Quản lý request</NavLink>
                        <NavLink to='/bang-dieu-khien/api-key' className='list-item' activeClassName='active'>Quản lý API key</NavLink>
                    </div>
                </div>

                <div className='right-column'>
                    <form className='auth-form'>
                        <h3 className='form__title'>Xóa người dùng</h3>

                        <p>Bạn có chắc chắn muốn xóa người dùng <strong>nguyenvana</strong> khỏi hệ thống hay không?</p>
                        <div className='buttons'>
                            <Link to='/bang-dieu-khien/nguoi-dung' className='button' style={{ marginRight: '10px' }}>Trở về</Link>
                            <button className='button'>Đồng ý</button>
                        </div>
                    </form>
                </div>
            </div>
      </div>

      <Footer />
    </Fragment>
  )
}

export default UserDelete
