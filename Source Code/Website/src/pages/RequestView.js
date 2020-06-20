import React, { Fragment } from 'react'
import { NavLink, Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

function RequestView() {
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
                        <h3 className='form__title'>Xem thông tin request</h3>

                        <div className='form__main'>
                            <div className='form-group'>
                                <label>Người dùng</label>
                                <input type='text' placeholder='Tên người dùng' disabled={true} />
                            </div>

                            <div className='form-group'>
                                <label>API key</label>
                                <input type='text' placeholder='API key' disabled={true} />
                            </div>

                            <div className='form-group'>
                                <label>Nội dung văn bản</label>
                                <textarea disabled={true} rows={5} placeholder='Nội dung của văn bản'></textarea>
                            </div>

                            <div className='form-group'>
                                <label>Thời gian gọi</label>
                                <input type='text' placeholder='Thời gian gọi' disabled={true} />
                            </div>

                            <div className='form-group'>
                                <label>Chủ đề được phân loại</label>
                                <input type='text' placeholder='Chủ đề được phân loại' disabled={true} />
                            </div>

                            <div className='form-group'>
                                <label>Trạng thái</label>
                                <input type='text' placeholder='Trạng thái' disabled={true} />
                            </div>

                            <Link to='/bang-dieu-khien/request' className='button'>Trở về</Link>
                        </div>
                    </form>
                </div>
            </div>
      </div>

      <Footer />
    </Fragment>
  )
}

export default RequestView
