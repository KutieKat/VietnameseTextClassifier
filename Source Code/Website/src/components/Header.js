import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Header = () => (
    <header>
        <h1 className='header__title'><Link to='/'>VietnameseTextClassifier</Link></h1>

        <nav className='header__nav'>
            <ul className='header__nav-list'>
                <li className='header__nav-item'><NavLink to='/' activeClassName='active' exact={true}>Trang chủ</NavLink></li>
                <li className='header__nav-item'><NavLink to='/gioi-thieu' activeClassName='active'>Giới thiệu</NavLink></li>
                <li className='header__nav-item'><NavLink to='/huong-dan-su-dung-api' activeClassName='active'>Hướng dẫn sử dụng API</NavLink></li>
            </ul>
        </nav>

        {/* <div className='header__buttons'>
            <Link to='/dang-nhap'>
                <span className='button button-outlined'>Đăng nhập</span>
            </Link>
            
            <Link to='/dang-ky'>
                <span className='button button-active'>Đăng ký</span>
            </Link>
        </div> */}

        <div className='header__dropdown-menu'>
            <i className="fas fa-user-circle"></i>&nbsp;&nbsp;Xin chào, Tiến Dũng!

            <ul className='header__dropdown-list'>
                <li className='header__dropdown-list-item'><Link to='/bang-dieu-khien/tong-quan'>Bảng điều khiển</Link></li>
                <li className='header__dropdown-list-item'><Link to='/tai-khoan'>Cập nhật thông tin</Link></li>
                <li className='header__dropdown-list-item'><Link to='/thay-doi-mat-khau'>Thay đổi mật khẩu</Link></li>
                <li className='header__dropdown-list-item'><Link to='/quan-ly-api'>Quản lý API</Link></li>
                <li className='header__dropdown-list-item'><Link to='/goi-dich-vu'>Gói dịch vụ</Link></li>
                <li className='header__dropdown-list-item'><Link to='#'>Đăng xuất</Link></li>
            </ul>
        </div>

        {/* <h1 className="header__title">Vietnamese Text Classifier</h1> */}
        {/* <p className="header__subtitle"><i className="far fa-file-alt"></i>&nbsp;&nbsp;Phân loại văn bản tiếng Việt trực tuyến&nbsp;&nbsp;<i className="far fa-file-alt"></i></p> */}
    </header>
)

export default Header