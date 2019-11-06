import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import SliderMenu from '../SettingsMenu/sliderMenu';
import MyAnswers from './myAnswers';
import BookJS from './bookJS';
import BookReactJS from './bookReactJS';
import BookCSS from './bookCSS';
import axios from 'axios';

class HomeLybrary extends Component {
    state = {
        leftDoor: 'hide',
        rightDoor: 'hide',
        isShowHome: false,
        controller: 'hide',
        currentChoice: '',
        openSliderMenu: 'hide',
        freezeController: '',
        notificationController: '',
        booksJS: 'hide',
        booksReactJS: 'hide',
        booksCSS: 'hide',
        notificationChoiceBook: 'hide',
        allUsers: []
    }
    handleCurChoice = (e) => {
        if (e === 'javascript') {
            this.setState({
                booksJS: 'show',
                booksReactJS: 'hide',
                booksCSS: 'hide',
            })
        } else if (e === 'reactJS') {
            this.setState({
                booksReactJS: 'show',
                booksJS: 'hide',
                booksCSS: 'hide',
            })
        } else if(e === 'css') {
            this.setState({
                booksCSS: 'show',
                booksJS: 'hide',
                booksReactJS: 'hide',
            })
        }

    }
    onCheckChange = (e) => {
        this.setState({
            currentChoice: e.target.value,
            myAnswer: ''
        })
    }
    timeNotification = () => {
        setTimeout(() => {
            this.setState({
                notificationChoiceBook: 'hide'
            })
        }, 4000)
    }
    componentDidMount() {
        axios.get('https://fullstack-app-office.herokuapp.com/users')
        .then(res => {
            this.setState({
                allUsers: res.data
            })
        })
        .then(err => console.log(err))

        

        setTimeout(() => {
            this.setState({
                isShowHome: true,
                leftDoor: 'show',
                rightDoor: 'show',
            })
        }, 1500)
        setTimeout(() => {
            this.setState({
                controller: 'show',
                notificationChoiceBook: 'show',
            })
        }, 3000)


    }
    handleCloseMenu = (e) => {
        if (e === 'show') {
            this.setState({
                openSliderMenu: 'show',
                freezeController: 'onFreeze'
            })
        } else {
            this.setState({
                openSliderMenu: 'hide',
                freezeController: 'stopFreeze'
            })
        }
    }

    render() {
        let left_side_door = 'left_side_door';
        let right_side_door = 'right_side_door';

        let { leftDoor, rightDoor, controller, freezeController, openSliderMenu, notificationController, currentChoice, booksJS, booksReactJS, booksCSS, notificationChoiceBook, allUsers } = this.state;

        let currentUser = '';
        allUsers.map(el => {
            if(el.username === localStorage.getItem('currentUser')){
                currentUser = el
            }
        })
        //console.log(currentUser)
        return (
            <div className="library_home">
                <div className={left_side_door + ' ' + leftDoor}>
                </div>
                <div className={right_side_door + ' ' + rightDoor}>
                </div>

                {
                    leftDoor === 'show'
                        ? <Fragment>
                            <div className={"effect_body " + openSliderMenu} onClick={this.handleCloseMenu}>
                            </div>
                            {
                                notificationChoiceBook === "show"
                                    ? <div className={"notificationChoiceBook_box " + notificationChoiceBook}>
                                        {this.timeNotification()}
                                        <span>Choice Book</span>
                                    </div>
                                    : <div className={"notificationChoiceBook_box " + notificationChoiceBook}>

                                    </div>
                            }
                            {
                                booksJS === 'show'
                                    ? < BookJS openSliderMenu={openSliderMenu} currentUser={currentUser} />
                                    : null
                            }
                            {
                                booksReactJS === 'show'
                                    ? < BookReactJS openSliderMenu={openSliderMenu} currentUser={currentUser} />
                                    : null
                            }
                            {
                                booksCSS === 'show'
                                    ? < BookCSS openSliderMenu={openSliderMenu} currentUser={currentUser} />
                                    : null
                            }

                            {
                                this.state.isShowHome
                                    ? <Fragment>
                                        < SliderMenu
                                            handleCloseMenu={this.handleCloseMenu}
                                            freezeController={this.state.freezeController}
                                        />

                                        {
                                            controller === 'show'
                                                ? <div className={"choice_boxes " + controller + ' ' + freezeController}>
                                                    <div className="left_side_controller_box">
                                                        <div className="radio_boxes">
                                                            <label className="radio">
                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"javascript"} />
                                                                JS
                                                    <span></span>
                                                            </label>
                                                            <label className="radio">
                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"reactJS"} />
                                                                ReactJS
                                                    <span> </span>
                                                            </label>
                                                            <label className="radio">
                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"css"} />
                                                                CSS
                                                    <span></span>
                                                            </label>
                                                        </div>
                                                        {
                                                            notificationController !== ''
                                                                ? <span className="notification">{notificationController}</span>
                                                                : null
                                                        }

                                                        <MyAnswers
                                                            currentChoice={currentChoice}
                                                            handleCurChoice={this.handleCurChoice}
                                                        />
                                                    </div>
                                                    <div className="right_side_controller_box">
                                                        <Link to="/home" className="box_btn_bar" onMouseOver={() => this.setState({ btnBar: 'show' })} onMouseOut={() => this.setState({ btnBar: 'hide' })}>
                                                            Home
                                                            </Link>
                                                    </div>
                                                </div>
                                                : <div className={"choice_boxes " + controller}></div>
                                        }
                                    </Fragment>
                                    : null
                            }
                        </Fragment>
                        : null
                }
            </div >
        )
    }
}
export default HomeLybrary;
