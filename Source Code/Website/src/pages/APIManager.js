import React, { Fragment, Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

class APIManager extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                {
                    date: '15/06/2020', requests: 15
                },
                {
                    date: '16/06/2020', requests: 0
                },
                {
                    date: '17/06/2020', requests: 6
                },
                {
                    date: '18/06/2020', requests: 20
                },
                {
                    date: '19/06/2020', requests: 12
                },                
                {
                    date: '20/06/2020', requests: 30
                }
            ]
        }
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
                        <h3 className='form__title'>Quản lý API</h3>
                        <h3 className='section-title'>API Key</h3>
                        <input type='text' placeholder='API key của bạn' disabled={true} />
                        <p>API key này còn lại <strong>50</strong> request nữa. Bạn có thể <Link to='/quan-ly-api' className='active'>nâng cấp</Link> gói dịch vụ để tăng thêm số request.</p>
        
                        <h3 className='section-title'>Thông tin sử dụng</h3>
                        <LineChart
                            width={700}
                            height={360}
                            data={this.state.data}
                            margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis dataKey="requests" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="requests" stroke="#4164E3" activeDot={{ r: 8 }} />
                        </LineChart>

                        <table>
                            <tr>
                                <th>Thời gian gọi</th>
                                <th>Nội dung văn bản</th>
                                <th>Chủ đề được phân loại</th>
                                <th>Trạng thái</th>
                            </tr>

                            <tr>
                                <td>16/06/2020, 15:30</td>
                                <td>Các Geisha chọn trang điểm mặt trắng như sứ, mục đích trở nên nổi bật và nhìn đẹp hơn dưới ánh nến khi biểu diễn vào buổi tối...</td>
                                <td><strong>Văn hóa</strong></td>
                                <td>Thành công</td>
                            </tr>

                            <tr>
                                <td>17/06/2020, 08:30</td>
                                <td>Trung Quốc vừa công bố chuỗi gen của virus corona liên quan ổ dịch bùng phát gần đây ở Bắc Kinh, qua đó cho rằng virus này...</td>
                                <td><strong>Sức khỏe</strong></td>
                                <td>Thành công</td>
                            </tr>

                            <tr>
                                <td>18/06/2020, 10:00</td>
                                <td>Trận đấu đáng chú ý giữa An Giang với Bà Rịa - Vũng Tàu trên sân Long Xuyên đã kết thúc với tỉ số hòa 2-2 ở vòng 3 Giải hạng nhất...</td>
                                <td><strong>Thể thao</strong></td>
                                <td>Thành công</td>
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

export default APIManager
