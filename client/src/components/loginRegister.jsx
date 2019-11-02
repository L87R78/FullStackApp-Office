import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Home from './Home/home';
import DataExam from '../dataExam';

class LoginRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            password: '',
            errorLoginName: 'Incorrect User or password',
            errorRegisterUser: 'user already exist!',
            clickedLogin: false,
            clickedRegister: false,
            formTitle: 'Login',
            loginBtn: true,
            showHideErrMessage: 'show',
            loading: false,
            allUsers: []

        }
        this.login = this.login.bind(this)
    }
    closeErrMessage = () => {
        this.setState({
            showHideErrMessage: 'hide',
            clickedLogin: false,
            clickedRegister: false
        })
    }

    handleUser = (e) => {
        this.setState({
            user: e.target.value,
        })
    }
    handlePassword = (e) => {
        this.setState({
            password: e.target.value,
        })
    }

    login = () => {
        localStorage.clear();
        
        this.setState({
            clickedLogin: true,
            showHideErrMessage: 'show',
        })

        this.state.allUsers.map(el => {
            if (this.state.user === '' || this.state.password === '') {
                this.setState({
                    errorLoginName: 'You must fill in all of the fields!'
                })
            } else {
                //console.log(el.username)
               // console.log(this.state.user)
                if (el.username === this.state.user) {
                    console.log(el.username)
                    console.log(this.state.password)
                    if (el.password === this.state.password + this.state.user) {
                        this.setState({
                            errorLoginName: '',
                            loading: true
                        })
                        let user = {
                            username: this.state.user,
                            password: this.state.password + this.state.user,
                            exam: DataExam,
                            countCorrectAnswers: 0,
                            stepQuastion: 1
                        }
                        console.log(user)
                        localStorage.setItem('currentUser', this.state.user);
                        axios.post('https://fullstack-app-office.herokuapp.com/users/update/' + el._id, user)
                            .then(res => {
                                
                            })
                            .catch(err => console.log('Error on Login User ' + err))
                    }
                }else {
                    this.setState({
                        errorLoginName: 'Incorrect User or password'
                    })
                }
            }
        })
    }

    register = () => {
        this.setState({
            clickedRegister: true,
            showHideErrMessage: 'show'
        })
        localStorage.clear();
        let checkUser = false;
        this.state.allUsers.map(el => {
            if (el.username === this.state.user) {
                checkUser = true
            }
        })
        if (checkUser === false) {
            if (this.state.user === '' || this.state.password === '') {
                this.setState({
                    errorRegisterUser: 'You must fill in all of the fields!'
                })
            }
            else {
                this.setState({
                    errorRegisterUser: '',
                    loading: true
                })
                let user = {
                    username: this.state.user,
                    password: this.state.password + this.state.user,
                    exam: DataExam,
                    countCorrectAnswers: 0,
                    stepQuastion: 1,
                    money: 100,
                    myOrders: [],
                }
              
                localStorage.setItem('currentUser', this.state.user);
                axios.post('https://fullstack-app-office.herokuapp.com/users/add', user)
                    .then(res => {
                    })
                    .catch(err => console.log('Error on Redister User ' + err))
            }
        }else {
            this.setState({
                errorRegisterUser: 'user already exist!'
            })
        }
    }

    getAction = (e) => {
        if (e === 'reg') {
            this.setState({
                formTitle: "Register New User",
                loginBtn: false,
                fireErrors: '',
                showHideErrMessage: 'hide',
            })
        } else {
            this.setState({
                formTitle: "Login",
                loginBtn: true,
                fireErrors: '',
                showHideErrMessage: 'hide',
            })
        }
        this.closeErrMessage()
    }

    componentDidMount() {
        axios.get('https://fullstack-app-office.herokuapp.com/users')
            .then(res => {
                this.setState({
                    allUsers: res.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        let submitBtn = this.state.loginBtn
            ? (<Link to="#" className="loginRegisterBtn" onClick={this.login} >Login</Link>)
            : (<Link to="#" className="loginRegisterBtn" onClick={this.register} >Register</Link>)
    
        //change boxForm Login/Register
        let login_register = this.state.loginBtn
            ? (<Link to="#" className="loginRegisterBtnForm" onClick={() => this.getAction('reg')}>Register Form</Link>)
            : (<Link to="#" className="loginRegisterBtnForm" onClick={() => this.getAction('login')}>Login Form</Link>)
        
        return (
            <div className="login_register_form">
                {
                    this.state.clickedRegister && this.state.errorRegisterUser !== ''
                        ? <div className="error_box">
                            <span className={`error_message_log_reg ${this.state.showHideErrMessage}`} onClick={this.closeErrMessage}>{this.state.errorRegisterUser}
                            </span>
                        </div>
                        : <div>
                            {
                                this.state.loading
                                    ? this.props.history.push("/home")
                                    : null
                            }
                        </div>
                }
                {
                    this.state.clickedLogin === true && this.state.errorLoginName !== ''
                        ? <div className="error_box">
                            <span className={`error_message_log_reg ${this.state.showHideErrMessage}`} onClick={this.closeErrMessage}>{this.state.errorLoginName}
                            </span>
                        </div>
                        : <div>
                            {
                                this.state.loading
                                    ? this.props.history.push("/home")
                                    : null
                            }
                        </div>
                }
                {
                    window.localStorage.length > 0 && this.state.errorLoginName === ''
                        ? < Home />
                        : <div className="form_box_loginReg">
                            <span>{this.state.formTitle}</span>
                            <form>
                                <TextField
                                    value={this.state.email}
                                    onChange={this.handleUser}
                                    type="text"
                                    name="user"
                                    label="User"
                                />
                                <br />
                                <TextField 
                                    value={this.state.password}
                                    onChange={this.handlePassword}
                                    type="password"
                                    name="password"
                                    label="Password"
                                />
                            </form>
                            <div className="buttons">
                                {submitBtn}
                                {login_register}
                            </div>
                        </div>
                }
            </div >
        )
    }
}
export default LoginRegister;
