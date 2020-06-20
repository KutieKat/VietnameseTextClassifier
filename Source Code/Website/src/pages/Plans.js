import React, { Fragment, Component } from 'react'
import { NavLink } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

class Plans extends Component {
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
                            <NavLink to='/tai-khoan' className='list-item' activeClassName='active'>Cập nhật thông tin</NavLink>
                            <NavLink to='/thay-doi-mat-khau' className='list-item' activeClassName='active'>Thay đổi mật khẩu</NavLink>
                            <NavLink to='/quan-ly-api' className='list-item' activeClassName='active'>Quản lý API</NavLink>
                            <NavLink to='/goi-dich-vu' className='list-item' activeClassName='active'>Gói dịch vụ</NavLink>
                        </div>
                    </div>
        
                    <div className='right-column'>
                        <h3 className='form__title'>Gói dịch vụ</h3>
                        <p>Đăng ký gói dịch vụ phù hợp với nhu cầu sử dụng của bạn.</p>

                        <div className='plans'>
                            <div className='plan'>
                                <span className='plan__title'>Gói A</span>
                                <span className='plan__requests'><strong>1.000</strong> requests</span>
                                <button className='button button-active'>Kích hoạt gói</button>
                            </div>

                            <div className='plan'>
                                <span className='plan__title'>Gói B</span>
                                <span className='plan__requests'><strong>10.000</strong> requests</span>
                                <button className='button button-disabled'>Kích hoạt gói</button>
                            </div>

                            <div className='plan'>
                                <span className='plan__title'>Gói C</span>
                                <span className='plan__requests'><strong>100.000</strong> requests</span>
                                <button className='button button-disabled'>Kích hoạt gói</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <Footer />
            </Fragment>
        )
    }
}

export default Plans
