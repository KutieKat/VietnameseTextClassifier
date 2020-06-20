import React, { Fragment, Component } from 'react'
import { NavLink } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

import Header from '../components/Header'
import Footer from '../components/Footer'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                users: [
                    {
                        date: '15/06/2020', users: 15
                    },
                    {
                        date: '16/06/2020', users: 30
                    },
                    {
                        date: '17/06/2020', users: 6
                    },
                    {
                        date: '18/06/2020', users: 25
                    },
                    {
                        date: '19/06/2020', users: 35
                    },                
                    {
                        date: '20/06/2020', users: 24
                    }
                ],
                requests: [
                    {
                        date: '15/06/2020', requests: 265
                    },
                    {
                        date: '16/06/2020', requests: 312
                    },
                    {
                        date: '17/06/2020', requests: 156
                    },
                    {
                        date: '18/06/2020', requests: 420
                    },
                    {
                        date: '19/06/2020', requests: 232
                    },                
                    {
                        date: '20/06/2020', requests: 365
                    }
                ],
                apiKeys: [
                    {
                        date: '15/06/2020', keys: 15
                    },
                    {
                        date: '16/06/2020', keys: 30
                    },
                    {
                        date: '17/06/2020', keys: 6
                    },
                    {
                        date: '18/06/2020', keys: 25
                    },
                    {
                        date: '19/06/2020', keys: 35
                    },                
                    {
                        date: '20/06/2020', keys: 24
                    }
                ]
            }
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
                                <NavLink to='/bang-dieu-khien/tong-quan' className='list-item' activeClassName='active'>Tổng quan</NavLink>
                                <NavLink to='/bang-dieu-khien/nguoi-dung' className='list-item' activeClassName='active'>Quản lý người dùng</NavLink>
                                <NavLink to='/bang-dieu-khien/request' className='list-item' activeClassName='active'>Quản lý request</NavLink>
                                <NavLink to='/bang-dieu-khien/api-key' className='list-item' activeClassName='active'>Quản lý API key</NavLink>
                            </div>
                        </div>
        
                        <div className='right-column'>
                            <h3 className='form__title'>Tổng quan</h3>
                            <h3 className='section-title'>Số liệu tổng quan</h3>
                            
                            <div className='cards'>
                                <div className='card'>
                                    <h4 className='card__title'>Tổng số người dùng</h4>
                                    <p className='card__number'>1.000</p>
                                </div>
        
                                <div className='card'>
                                    <h4 className='card__title'>Tổng số request</h4>
                                    <p className='card__number'>10.000</p>
                                </div>
        
                                <div className='card'>
                                    <h4 className='card__title'>Tổng số API key</h4>
                                    <p className='card__number'>5.000</p>
                                </div>
                            </div>
        
                            <div className='section-header'>
                                <h3 className='section-title'>Biểu đồ số lượng người dùng</h3>
                                <select>
                                    <option>Tuần này</option>
                                    <option>Tháng này</option>
                                    <option>Quý này</option>
                                    <option>Năm nay</option>
                                </select>
                            </div>

                            <LineChart
                                width={700}
                                height={360}
                                data={this.state.data.users}
                                margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                                }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis dataKey="users" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="#4164E3" activeDot={{ r: 8 }} />
                            </LineChart>
        
                            <div className='section-header'>
                                <h3 className='section-title'>Biểu đồ số lượng request</h3>
                                <select>
                                    <option>Tuần này</option>
                                    <option>Tháng này</option>
                                    <option>Quý này</option>
                                    <option>Năm nay</option>
                                </select>
                            </div>
                            <LineChart
                                width={700}
                                height={360}
                                data={this.state.data.requests}
                                margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                                }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis dataKey="requests" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="requests" stroke="#4164E3" activeDot={{ r: 8 }} />
                            </LineChart>

                            <div className='section-header'>
                                <h3 className='section-title'>Biểu đồ số lượng API key</h3>
                                <select>
                                    <option>Tuần này</option>
                                    <option>Tháng này</option>
                                    <option>Quý này</option>
                                    <option>Năm nay</option>
                                </select>
                            </div>
                            <LineChart
                                width={700}
                                height={360}
                                data={this.state.data.apiKeys}
                                margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                                }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis dataKey="keys" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="keys" stroke="#4164E3" activeDot={{ r: 8 }} />
                            </LineChart>
                        </div>
                    </div>
              </div>
        
              <Footer />
            </Fragment>
        )
    }
}

export default Dashboard
