import React, { Fragment } from 'react'
import { NavLink, Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

function UserEdit() {
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
                        <h3 className='form__title'>Cập nhật thông tin người dùng</h3>

                        <div className='form__main'>
                            <div className='form-group'>
                                <label>Tên người dùng</label>
                                <input type='text' placeholder='Tên người dùng' />
                            </div>

                            <div className='form-group'>
                                <label>Tên đầy đủ</label>
                                <input type='text' placeholder='Tên đầy đủ' />
                            </div>

                            <div className='form-group'>
                                <label>Địa chỉ email</label>
                                <input type='text' placeholder='Địa chỉ email'/>
                            </div>

                            <div className='buttons'>
                                <Link to='/bang-dieu-khien/nguoi-dung' className='button' style={{ marginRight: '10px' }}>Trở về</Link>
                                <button className='button'>Cập nhật</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
      </div>

      <Footer />
    </Fragment>
  )
}

export default UserEdit
