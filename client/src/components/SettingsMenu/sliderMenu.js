import React, { Component, Fragment } from "react";
import MenuNav from './menuNav';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SliderMenu extends Component {
    state = {
        openSliderMenu: 'hide',
        showSettings: 'hide',
        clickedHome: 'hide',
        clickedFeedback: 'hide',
        clickedMyMoney: 'hide',
        clickedSettings: 'hide',
        allUsers: [],
        currentUser: ''
    };
    // handleCloseMenu = () => {
    //     this.setState({
    //         openSliderMenu: 'hide',
    //     })
    //     if (this.state.showSettings === 'show') {
    //         this.setState({
    //             showSettings: 'hide',
    //         })
    //     }
    // }

    settings = () => {
        this.getData();
        this.setState({
            showSettings: 'show',
            clickedHome: 'hide',
            clickedFeedback: 'hide',
            clickedMyMoney: 'hide',
            clickedSettings: 'hide',
            openSliderMenu: 'show'
        })

    }
    // handleClickItemMenu = () => {
    //     this.setState({
    //         showSettings: 'show',
    //         clickedHome: 'hide',
    //         clickedFeedback: 'hide',
    //         clickedMyMoney: 'hide',
    //         clickedSettings: 'hide'
    //     })
    // }
    checkClickedLink = (e) => {
        this.getData();
        switch (e) {
            case 'home': this.setState({
                clickedHome: 'show',
                clickedFeedback: 'hide',
                clickedMyMoney: 'hide',
                clickedSettings: 'hide'
            })
                break;
            case 'about': this.setState({
                clickedHome: 'hide',
                clickedFeedback: 'show',
                clickedMyMoney: 'hide',
                clickedSettings: 'hide'
            })
                break;
            case 'book': this.setState({
                clickedHome: 'hide',
                clickedFeedback: 'hide',
                clickedMyMoney: 'show',
                clickedSettings: 'hide'
            })
                break;
            case 'settings': this.setState({
                clickedHome: 'hide',
                clickedFeedback: 'hide',
                clickedMyMoney: 'hide',
                clickedSettings: 'show'
            })
                break;
        }
        this.setState({
            showSettings: 'show',
        })
    }

    componentWillUpdate(prevProps) {
        if (prevProps.freezeController === 'stopFreeze' && this.state.openSliderMenu === 'show') {
            this.setState({
                openSliderMenu: 'hide',
            })
            if (this.state.showSettings === 'show') {
                this.setState({
                    showSettings: 'hide',
                })
            }
        }
    }
    logOut = () => {
        localStorage.clear();
    }
    getData = () => {
        
        axios.get('https://fullstack-app-office.herokuapp.com/users')
        .then(res => {
            this.setState({
                allUsers: res.data
            })
        })
        .catch(err => console.log(err))
        this.state.allUsers.map(el => {
            if(el.username === localStorage.getItem('currentUser')){
                this.setState({
                    currentUser: el
                })
            }
        })
    }


    render() {
      
        let {
            showSettings,
            clickedHome,
            clickedFeedback,
            clickedMyMoney,
            clickedSettings,
            openSliderMenu,
            currentUser
        } = this.state
        
        return (
            <Fragment>
                {/* <div className={"effect_body " + openSliderMenu} onClick={this.handleCloseMenu}>

                </div> */}
                <div className="menu_btn" onClick={() => { this.settings(); this.props.handleCloseMenu('show') }}>
                    <i class="fas fa-cogs"></i>
                    {/* <div className="btn_line_box">
                        <i className="fas fa-circle"></i>
                        <div className="btn_line"></div>
                    </div>
                    <div className="btn_line_box">
                        <i className="fas fa-circle"></i>
                        <div className="btn_line"></div>
                    </div>
                    <div className="btn_line_box">
                        <i className="fas fa-circle"></i>
                        <div className="btn_line"></div>
                    </div> */}
                </div>
                {
                    openSliderMenu === 'show'
                        ? <div className={"settings_box " + openSliderMenu}>
                            <div className="username_logOut_box">
                                <span className="box_user"><span className="user_name">{localStorage.currentUser}</span></span>
                                <Link className="logout " to="/" onClick={this.logOut}> <span>LogOut</span> </Link>
                            </div>

                            <div>
                                < MenuNav
                                    checkClickedLink={this.checkClickedLink}
                                    show={showSettings}
                                    clickedHome={clickedHome}
                                    clickedFeedback={clickedFeedback}
                                    clickedMyMoney={clickedMyMoney}
                                    clickedSettings={clickedSettings}
                                    currentUser={currentUser}
                                />
                            </div>
                        </div>
                        : <div className={"settings_box " + openSliderMenu}>
                            <div className="username_logOut_box">
                                <span className="box_user">Username <span className="user_name">{localStorage.currentUser}</span></span>
                                <Link className="logout" to="/" onClick={this.logOut}> <span>LogOut</span> </Link>
                            </div>
                            <div>
                                < MenuNav
                                    checkClickedLink={this.checkClickedLink}
                                    show={showSettings}
                                    clickedHome={clickedHome}
                                    clickedFeedback={clickedFeedback}
                                    clickedMyMoney={clickedMyMoney}
                                    clickedSettings={clickedSettings}
                                    currentUser={currentUser}
                                />
                            </div>
                        </div>
                }
            </Fragment>
        );
    }
}

export default SliderMenu;