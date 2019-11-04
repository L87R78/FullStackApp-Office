import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

class MenuNav extends Component {
    state = {
        beer: 0,
        coffe: 0,
        isLogged: false,
        curUser: '',
        newUser: '',
        errorEmptyInputsUser: 'hide',
        errorEmptyInputsPassword: 'hide',
        successChange: 'hide',
        errorUser: 'hide',
        errorPassword: 'hide',
        curPassword: '',
        newPassword: '',
        allUsers: [],
        showChangeNameForm: 'hide',
        clickedShowChangeNameForm: false,
        showChangePasswordForm: 'hide',
        showMyOrders: 'hide',
        sendFeedBackMessage: 'Please write here',
        successFeedback: 'hide'
    }
    handleOldUser = (e) => {
        this.setState({
            curUser: e.target.value,
        })
    }
    handleNewUser = (e) => {
        this.setState({
            newUser: e.target.value,
        })
    }
    handleChangeUser = () => {
        if (this.state.newUser !== '' && this.state.curUser !== '') {
            if (this.state.curUser === localStorage.getItem('currentUser')) {
                let tempCurUser = {};
                this.state.allUsers.map(el => {
                    if (el.username === this.state.curUser) {
                        tempCurUser = el;
                        var getPassword = el.password.replace(this.state.curUser, '');

                        tempCurUser.username = this.state.newUser
                        tempCurUser.password = getPassword + this.state.newUser
                        localStorage.setItem('currentUser', tempCurUser.username);
                        axios.post(`https://fullstack-app-office.herokuapp.com/users/update/${tempCurUser._id}`, tempCurUser)
                            .then(res => {
                            })
                            .catch(err => console.log(err))
                    }
                })
                this.setState({
                    curUser: '',
                    newUser: '',
                    errorUser: 'hide',
                    successChange: 'show'
                })
            } else {
                this.setState({
                    errorUser: 'show'
                })
            }
        } else {
            this.setState({
                errorEmptyInputsUser: 'show'
            })
        }
    }

    handleOldPassword = (e) => {
        this.setState({
            curPassword: e.target.value,
        })
    }
    handleNewPassword = (e) => {
        this.setState({
            newPassword: e.target.value,
        })
    }
    handleChangePassword = () => {
        if (this.state.newPassword !== '' && this.state.curPassword !== '') {
            let tempCurUser = {};
            let isCheckUserPassword = false;
            this.state.allUsers.map(el => {
                if (el.password === this.state.curPassword + localStorage.getItem('currentUser')) {
                    tempCurUser = el;
                    isCheckUserPassword = true
                }
            })

            if (isCheckUserPassword) {
                localStorage.setItem('currentUser', tempCurUser.username);
                tempCurUser.password = this.state.newPassword + localStorage.getItem('currentUser')
                axios.post(`https://fullstack-app-office.herokuapp.com/users/update/${tempCurUser._id}`, tempCurUser)
                    .then(res => {

                    })
                    .catch(err => console.log(err))

                this.setState({
                    curPassword: '',
                    newPassword: '',
                    errorPassword: 'hide',
                    successChange: 'show'
                })
            } else {
                this.setState({
                    errorPassword: 'show'
                })
            }
        } else {
            this.setState({
                errorEmptyInputsPassword: 'show'
            })
        }
    }
    handleChangeNameForm = () => {
        this.getData();
        this.setState({
            showChangeNameForm: 'show',
            clickedShowChangeNameForm: true,
            showChangePasswordForm: 'hide',
            errorUser: false
        })
    }
    getData = () => {
        axios.get('https://fullstack-app-office.herokuapp.com/users')
            .then(res => {
                //console.log(res.data)
                this.setState({
                    allUsers: res.data
                })
            })
            .catch(err => console.log(err))
        // this.state.allUsers.map(el => {
        //     if(el.username === localStorage.getItem('currentUser')){
        //         el.myOrders.map(e => {
        //             console.log(e)
        //         })
        //     }
        // })
    }
    handleChangePasswordForm = () => {

        this.getData();
        this.setState({
            showChangeNameForm: 'hide',
            showChangePasswordForm: 'show',
            errorUser: false
        })
    }
    handleShowChangeForm = () => {
        this.setState({
            showChangeNameForm: 'hide',
            showChangePasswordForm: 'hide',
            errorUser: false,
            showMyOrders: 'hide'
        })
    }
    handleShowMyOrders = () => {
        if (this.state.showMyOrders === 'show') {
            this.setState({
                showMyOrders: 'hide',
                //errorUser: false

            })
        } else {
            this.setState({
                showMyOrders: 'show'
            })
        }
    }
    timeError = () => {
        if (this.state.errorEmptyInputsUser === 'show' || this.state.errorEmptyInputsPassword === 'show' || this.state.errorPassword === 'show' || this.state.errorUser === 'show') {
            setTimeout(() => {
                this.setState({
                    errorPassword: 'hide',
                    errorUser: 'hide',
                    errorEmptyInputsUser: 'hide',
                    errorEmptyInputsPassword: 'hide'
                })
            }, 3000)
        }
        if (this.state.successChange === 'show' || this.state.successFeedback === 'show') {
            setTimeout(() => {
                this.setState({
                    successChange: 'hide',
                    successFeedback: 'hide',
                    sendFeedBackMessage: 'Please write here'
                })

            }, 2000)
        }
    }
    componentWillUpdate(nextProps) {
        if (nextProps.currentUser !== '') {
            nextProps.currentUser.myOrders.map(el => {
                let getKey = Object.keys(el)
                let getValue = Object.values(el)

                if (getKey[0] === 'beer' && getValue[0] > this.state.beer) {
                    this.setState({
                        beer: getValue[0],
                    })
                } else if (getKey[0] === 'coffe' && getValue[0] > this.state.coffe) {
                    this.setState({
                        coffe: getValue[0],
                    })
                }
            })
        }
    }
    handleFeedBackMessage = (e) => {
        this.setState({
            sendFeedBackMessage: e.target.value,
        })
    }
    handlerFeedback = () => {
        if (this.state.sendFeedBackMessage !== '' && this.state.sendFeedBackMessage !== 'Please write here' && this.state.sendFeedBackMessage !== 'Feedback is empty!') {

            let feedback = {
                user: localStorage.getItem('currentUser'),
                feedback: this.state.sendFeedBackMessage,
            }

            axios.post('https://fullstack-app-office.herokuapp.com/feedback/add', feedback)
                .then(res => {
                    this.setState({
                        successFeedback: 'show'
                    })
                })
                .catch(err => console.log('error feedback ' + err))

        } else {
            this.setState({
                sendFeedBackMessage: 'Feedback is empty!'
            })
        }
    }

    render() {
        let {
            checkClickedLink,
            show,
            clickedHome,
            clickedFeedback,
            clickedMyMoney,
            clickedSettings,
            currentUser
        } = this.props;

        let { showChangeNameForm, showChangePasswordForm, showMyOrders } = this.state;

        return (
            <div>
                {
                    show === 'show'
                        ? <nav className={"menu_nav " + show}>
                            <li className={"nav_item " + clickedFeedback} onClick={() => { checkClickedLink('about') }}>
                                <div className={"nav_item_child " + clickedFeedback} onClick={() => this.handleShowChangeForm()}>
                                    <div>
                                        <i class="fas fa-comment-dots"></i>
                                        Your feedback
                                    </div>

                                    {
                                        clickedFeedback === 'show'
                                            ? <i className="fas fa-chevron-down"></i>
                                            : <i className="fas fa-chevron-right"></i>
                                    }
                                </div>
                                {
                                    clickedFeedback === 'show'
                                        ? <div className="child_info_feedback">
                                            <div className="feedback">
                                                {
                                                    this.state.successFeedback === 'show'
                                                        ? <div className="success_feedback">
                                                            {this.timeError()}
                                                            <i class={"fas fa-thumbs-up " + this.state.successFeedback}></i>
                                                        </div>
                                                        : <div className="success_feedback">
                                                            {this.timeError()}
                                                            <i class={"fas fa-thumbs-up " + this.state.successFeedback}></i>
                                                        </div>
                                                }
                                                <textarea
                                                    className="second_input"
                                                    onChange={this.handleFeedBackMessage}
                                                    type="text"
                                                    placeholder={this.state.sendFeedBackMessage}

                                                />
                                                <button onClick={this.handlerFeedback} className="btn btn-white btn-animation-1"><i class="fas fa-paper-plane"></i></button>
                                            </div>
                                        </div>
                                        : null
                                }
                            </li>
                            <li className={"nav_item " + clickedMyMoney} onClick={() => { checkClickedLink('book') }}>
                                <div className={"nav_item_child " + clickedMyMoney} onClick={() => this.handleShowChangeForm()}>
                                    <div>
                                        <i className="fas fa-wallet"></i>
                                        My money
                                    </div>

                                    {
                                        clickedMyMoney === 'show'
                                            ? <i className="fas fa-chevron-down"></i>
                                            : <i className="fas fa-chevron-right"></i>
                                    }
                                </div>
                                {
                                    clickedMyMoney === 'show'
                                        ? <div className="child_info_money">
                                            <div className="money_box">
                                                <span className="total">Total:</span>
                                                <span className="money">${currentUser.money}</span>
                                            </div>
                                            <div className="my_orders" onClick={() => this.handleShowMyOrders()}>
                                                {
                                                    showMyOrders === 'show'
                                                        ? <div className={"orders_box " + showMyOrders}>Orders <i className="fas fa-chevron-down"></i></div>
                                                        : <div className={"orders_box " + showMyOrders}>Orders <i className="fas fa-chevron-right"></i></div>

                                                }
                                                {
                                                    showMyOrders === 'show'
                                                        ? <div className="beer_coffe_boxes">
                                                            <div className="orders">Beers - <span className="price">{this.state.beer}</span></div>
                                                            <div className="orders">Coffe - <span className="price">{this.state.coffe}</span></div>

                                                        </div>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                        : null
                                }
                            </li>
                            <li className={"nav_item " + clickedSettings} onClick={() => { checkClickedLink('settings') }}>
                                <div className={"nav_item_child " + clickedSettings} onClick={() => this.handleShowChangeForm()}>
                                    <div>
                                        <i class="fas fa-user"></i>
                                        Settings
                                    </div>
                                    {
                                        clickedSettings === 'show'
                                            ? <i className="fas fa-chevron-down"></i>
                                            : <i className="fas fa-chevron-right"></i>
                                    }
                                </div>
                                {
                                    clickedSettings === 'show'
                                        ? <div className="child_info_form">
                                            <div className="child_info_info" onClick={this.handleChangeNameForm}><span>Change username</span></div>

                                            {
                                                showChangeNameForm === 'show'
                                                    ? <div className={"form_box " + showChangeNameForm}>
                                                        {
                                                            this.state.successChange === 'show'
                                                                ? <div className={"notification_success " + this.state.successChange}> Updated Successfully
                                                                <i class="fas fa-check-circle"></i>
                                                                    {this.timeError()}
                                                                </div>
                                                                : <div className={"notification_success " + this.state.successChange}> pdated Successfully
                                                                <i class="fas fa-check-circle"></i>
                                                                    {this.timeError()}
                                                                </div>
                                                        }
                                                        {
                                                            this.state.errorEmptyInputsUser === 'show'
                                                                ? <div className={"notification_error_empty " + this.state.errorEmptyInputsUser}>You must fill in all of the fields!
                                                                <i class="fas fa-times-circle"></i>
                                                                    {this.timeError()}
                                                                </div>
                                                                : <div className={"notification_error_empty " + this.state.errorEmptyInputsUser}>You must fill in all of the fields!
                                                                <i class="fas fa-times-circle"></i>
                                                                    {this.timeError()}
                                                                </div>
                                                        }
                                                        {
                                                            this.state.errorUser === 'show'
                                                                ? <div className={"notification_error " + this.state.errorUser}>Incorrect Username

                                                                    {this.timeError()}
                                                                </div>
                                                                : <div className={"notification_error " + this.state.errorUser}>Incorrect Username

                                                                    {this.timeError()}
                                                                </div>
                                                        }
                                                        <form>
                                                            <TextField
                                                                value={this.state.curUser}
                                                                onChange={this.handleOldUser}
                                                                type="text"
                                                                name="user"
                                                                label="Old username"
                                                            />
                                                            <br />
                                                            <TextField
                                                                value={this.state.newUser}
                                                                onChange={this.handleNewUser}
                                                                type="text"
                                                                name="user"
                                                                label="New username"
                                                            />
                                                        </form>

                                                        <button onClick={this.handleChangeUser} className="btn btn-white btn-animation-1">Change</button>
                                                    </div>
                                                    : null
                                            }
                                            <div className="child_info_info" onClick={this.handleChangePasswordForm}><span>Change password</span></div>
                                            {
                                                showChangePasswordForm === 'show'
                                                    ? <div className="form_box">
                                                        {
                                                            this.state.successChange === 'show'
                                                                ? <div className={"notification_success " + this.state.successChange}> Updated Successfully
                                                                <i class="fas fa-check-circle"></i>
                                                                    {this.timeError()}
                                                                </div>
                                                                : <div className={"notification_success " + this.state.successChange}> pdated Successfully
                                                                <i class="fas fa-check-circle"></i>
                                                                    {this.timeError()}
                                                                </div>
                                                        }
                                                        {
                                                            this.state.errorEmptyInputsPassword === 'show'
                                                                ? <div className={"notification_error_empty " + this.state.errorEmptyInputsPassword}>You must fill in all of the fields!
                                                                <i class="fas fa-times-circle"></i>
                                                                    {this.timeError()}
                                                                </div>
                                                                : <div className={"notification_error_empty " + this.state.errorEmptyInputsPassword}>You must fill in all of the fields!
                                                                <i class="fas fa-times-circle"></i>
                                                                    {this.timeError()}
                                                                </div>
                                                        }

                                                        {
                                                            this.state.errorPassword === 'show'
                                                                ? <div className={"notification_error " + this.state.errorPassword}>Incorrect Password
                                                                    {this.timeError()}

                                                                </div>
                                                                : <div className={"notification_error " + this.state.errorPassword}>Incorrect Password
                                                                    {this.timeError()}

                                                                </div>
                                                        }
                                                        <form>
                                                            <TextField
                                                                value={this.state.curPassword}
                                                                onChange={this.handleOldPassword}
                                                                type="password"
                                                                name="password"
                                                                label="Old password"
                                                            />
                                                            <br />
                                                            <TextField
                                                                value={this.state.newPassword}
                                                                onChange={this.handleNewPassword}
                                                                type="password"
                                                                name="password"
                                                                label="New password"
                                                            />
                                                        </form>
                                                        
                                                        <button onClick={this.handleChangePassword} className="btn btn-white btn-animation-1">Change</button>
                                                    </div>
                                                    : null
                                            }
                                        </div>
                                        : null
                                }
                            </li>
                        </nav>
                        : <nav className={"menu_nav " + show}>
                            <nav className={"menu_nav " + show}>
                                <li className="nav_item" onClick={() => { checkClickedLink() }} >
                                    Home
</li>
                                <li className="nav_item" onClick={() => { checkClickedLink() }}>
                                    About
</li>
                                <li className="nav_item current" onClick={() => { checkClickedLink() }}>
                                    Book
</li>
                                <li className="nav_item" onClick={() => { checkClickedLink() }}>
                                    Settings
</li>
                            </nav>
                        </nav>
                }
            </div>
        )
    }
}
export default MenuNav;





























