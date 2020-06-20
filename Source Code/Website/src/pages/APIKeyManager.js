import React, { Fragment, Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

class APIKeyManager extends Component {
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
                            <h3 className='form__title'>Quản lý API key</h3>

                            <table>
                                <tr>
                                    <th></th>
                                    <th>Người dùng</th>
                                    <th>API key</th>
                                    <th>Thời gian tạo</th>
                                    <th>Số request còn lại</th>
                                </tr>

                                <tr>
                                    <td>
                                        <div className='table-menu'>
                                            <i className="fas fa-bars"></i>

                                            <ul className='table-menu__list'>
                                                <li className='table-menu__list-item'><Link to='/bang-dieu-khien/api-key/2'>Xem thông tin</Link></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td>nguyenvana</td>
                                    <td>APIKEY000111222</td>
                                    <td>16/06/2020, 09:30</td>
                                    <td>90</td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className='table-menu'>
                                            <i className="fas fa-bars"></i>

                                            <ul className='table-menu__list'>
                                                <li className='table-menu__list-item'><Link to='/bang-dieu-khien/api-key/2'>Xem thông tin</Link></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td>tranvanb</td>
                                    <td>APIKEY111222333</td>
                                    <td>16/06/2020, 15:30</td>
                                    <td>50</td>
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

export default APIKeyManager
