import React, { Fragment, Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

class UserManager extends Component {
    constructor(props) {
        super(props)
    }

    render() {
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
                            <h3 className='form__title'>Quản lý người dùng</h3>

                            <table>
                                <tr>
                                    <th></th>
                                    <th>Tên đăng nhập</th>
                                    <th>Tên đầy đủ</th>
                                    <th>Email</th>
                                    <th>Ngày tạo</th>
                                </tr>

                                <tr>
                                    <td>
                                        <div className='table-menu'>
                                            <i className="fas fa-bars"></i>

                                            <ul className='table-menu__list'>
                                                <li className='table-menu__list-item'><Link to='/bang-dieu-khien/nguoi-dung/thong-tin/1'>Xem thông tin</Link></li>
                                                <li className='table-menu__list-item'><Link to='/bang-dieu-khien/nguoi-dung/cap-nhat/1'>Cập nhật</Link></li>
                                                <li className='table-menu__list-item'><Link to='/bang-dieu-khien/nguoi-dung/xoa/1'>Xóa</Link></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td>nguyenvana</td>
                                    <td>Nguyễn Văn A</td>
                                    <td>nguyenvana@gmail.com</td>
                                    <td>16/06/2020</td>
                                </tr>
                                
                                <tr>
                                    <td>
                                        <div className='table-menu'>
                                            <i className="fas fa-bars"></i>

                                            <ul className='table-menu__list'>
                                                <li className='table-menu__list-item'><Link to='/bang-dieu-khien/nguoi-dung/thong-tin/2'>Xem thông tin</Link></li>
                                                <li className='table-menu__list-item'><Link to='/bang-dieu-khien/nguoi-dung/cap-nhat/2'>Cập nhật</Link></li>
                                                <li className='table-menu__list-item'><Link to='/bang-dieu-khien/nguoi-dung/xoa/2'>Xóa</Link></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td>tranvanb</td>
                                    <td>Trần Văn B</td>
                                    <td>tranvanb@gmail.com</td>
                                    <td>16/06/2020</td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className='table-menu'>
                                            <i className="fas fa-bars"></i>

                                            <ul className='table-menu__list'>
                                                <li className='table-menu__list-item'><Link to='/bang-dieu-khien/nguoi-dung/thong-tin/3'>Xem thông tin</Link></li>
                                                <li className='table-menu__list-item'><Link to='/bang-dieu-khien/nguoi-dung/cap-nhat/3'>Cập nhật</Link></li>
                                                <li className='table-menu__list-item'><Link to='/bang-dieu-khien/nguoi-dung/xoa/3'>Xóa</Link></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td>phamvanc</td>
                                    <td>Phạm Văn C</td>
                                    <td>phamvanc@gmail.com</td>
                                    <td>16/06/2020</td>
                                </tr>
                            </table>
                        </div>
                    </div>
              </div>
        
              <Footer />
            </Fragment>
        )
    }
}

export default UserManager
