import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import SliderMenu from '../SettingsMenu/sliderMenu';
import MyAnswers from './myAnswers';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            leftDoor: 'hide',
            rightDoor: 'hide',
            controller: 'hide',
            notificationsYES_Controller: 'hide',
            coffe: 'coffe',
            game: 'game',
            exam: 'exam',
            btnBar: 'hide',
            btnLibrary: 'hide',
            btnExam: 'hide',
            btnGame: 'hide',
            quastionPavel: 'hide',
            textPavel: ' How are you? Do you want something to drink?',
            myAnswer: '',
            currentChoice: '',
            isShowHome: false,
            openSliderMenu: 'hide',
            freezeController: '',
            showPulseEffect: 'stopPulse',
            countClickMessage: 1
        }
    }
    handleCurChoice = (e) => {

        if (typeof (e) === 'string') {
            if (e === 'yes') {
                this.setState({
                    textPavel: "Great, let's go to the BAR",
                    notificationsYES_Controller: 'show',
                    controller: 'show'
                })
            } else {
                this.setState({
                    textPavel: "Okay",
                    controller: 'hide'
                })
            }
        } else {

            if (this.state.countClickMessage === 2) {
                this.setState({
                    textPavel: "Okay stop, I'm kidding :D",
                })
            } else {
                this.setState({
                    textPavel: "What do you mean? Can you repeat it again, please?",
                    countClickMessage: this.state.countClickMessage + 1
                })
            }
        }
    }
    onCheckChange = (e) => {
        this.setState({
            currentChoice: e.target.value,
            myAnswer: ''
        })
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                leftDoor: 'show',
                rightDoor: 'show',
            })
        }, 1500)
        setTimeout(() => {
            this.setState({
                isShowHome: true,
            })
        }, 1500)
        setTimeout(() => {
            this.setState({
                quastionPavel: 'show',
                controller: 'show'
            })
        }, 3000)
        setTimeout(() => {
            this.setState({
                showPulseEffect: 'startPulse'
            })
        }, 5000)
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

        let { leftDoor, rightDoor, quastionPavelName, btnBar, btnExam, btnLibrary, btnGame, currentChoice, textPavel, myAnswer, controller, notificationsYES_Controller, freezeController, showPulseEffect } = this.state;
        return (
            <div className="home">
                <div className={left_side_door + ' ' + leftDoor}>
                </div>
                <div className={right_side_door + ' ' + rightDoor}>
                </div>

                <div>
                    {
                        leftDoor === 'show'
                            ? <Fragment>
                                <div className={"effect_body " + this.state.openSliderMenu} onClick={this.handleCloseMenu}>
                                </div>
                                <div className="bottons_home_home">
                                    <Link to="/bar" className={"link_Bar " + btnBar + ' ' + freezeController + ' ' + showPulseEffect}>Bar</Link>
                                    <Link to="/library" className={"link_library " + btnLibrary + ' ' + freezeController + ' ' + showPulseEffect}>Library</Link>
                                    <Link to="#" className={"link_exam " + btnExam + ' ' + freezeController + ' ' + showPulseEffect}> <i class="fas fa-lock"></i> Exam</Link>
                                    <Link to="#" className={"link_game " + btnGame + ' ' + freezeController + ' ' + showPulseEffect}> <i class="fas fa-lock"></i> Game</Link>
                                </div>
                                {
                                    this.state.isShowHome
                                        ? <Fragment>
                                            < SliderMenu
                                                handleCloseMenu={this.handleCloseMenu}
                                                freezeController={this.state.freezeController}
                                            />
                                            {
                                                this.state.quastionPavel === 'show'
                                                    ? <div className={"box_question_home " + textPavel}>
                                                        <div className="box_question_child"></div>

                                                        <span>Pavel <i className="far fa-comment-dots"></i></span>

                                                        <div className="people_question">
                                                            {textPavel}
                                                        </div>
                                                    </div>
                                                    : null
                                            }
                                            {
                                                controller === 'show'
                                                    ? <div className={"choice_boxes " + controller + ' ' + freezeController}>
                                                        <div className="left_side_controller_box">
                                                            {
                                                                notificationsYES_Controller === 'show'
                                                                    ? <h4 className="notifications">Click the button <span>Bar</span></h4>
                                                                    : <Fragment>
                                                                        <div className="radio_boxes">
                                                                            <label className="radio">
                                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"no"} />
                                                                                No, thanks
                                                    <span></span>
                                                                            </label>
                                                                            <label className="radio">
                                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"yes"} />
                                                                                Yes
                                                    <span> </span>
                                                                            </label>
                                                                            <label className="radio">
                                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"comment"} />
                                                                                Comment
                                                    <span></span>
                                                                            </label>

                                                                        </div>

                                                                        <div className="textArea_btnSend_box">
                                                                            <MyAnswers
                                                                                currentChoice={currentChoice}
                                                                                handleCurChoice={this.handleCurChoice}
                                                                            />
                                                                        </div>
                                                                    </Fragment>
                                                            }
                                                        </div>
                                                        <div className="right_side_controller_box">

                                                            <Link to="/bar" className="box_btn_home" onMouseOver={() => this.setState({ btnBar: 'show' })} onMouseOut={() => this.setState({ btnBar: 'hide' })}>
                                                                Bar
                                                            </Link>
                                                            <Link to="/library" className="box_btn_home" onMouseOver={() => this.setState({ btnLibrary: 'show' })} onMouseOut={() => this.setState({ btnLibrary: 'hide' })}>
                                                                Library
                                                            </Link>

                                                            <Link className="box_btn_home" onMouseOver={() => this.setState({ btnExam: 'show' })} onMouseOut={() => this.setState({ btnExam: 'hide' })}>
                                                                Exam
                                                            </Link>
                                                            <Link className="box_btn_home" onMouseOver={() => this.setState({ btnGame: 'show' })} onMouseOut={() => this.setState({ btnGame: 'hide' })}>
                                                                Game
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    : <div className={"choice_boxes " + controller}>
                                                        <div className="left_side_controller_box">
                                                            {
                                                                notificationsYES_Controller === 'show'
                                                                    ? <h4 className="notifications">Click the button <span>Bar</span></h4>
                                                                    : <Fragment>
                                                                        <div className="radio_boxes">
                                                                            <label className="radio">
                                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"no"} />
                                                                                No, thanks
                                                    <span></span>
                                                                            </label>
                                                                            <label className="radio">
                                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"yes"} />
                                                                                Yes
                                                    <span> </span>
                                                                            </label>
                                                                            <label className="radio">
                                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"comment"} />
                                                                                Comment
                                                    <span></span>
                                                                            </label>

                                                                        </div>

                                                                        <div className="textArea_btnSend_box">
                                                                            <MyAnswers
                                                                                currentChoice={currentChoice}
                                                                                handleCurChoice={this.handleCurChoice}
                                                                            />
                                                                        </div>
                                                                    </Fragment>
                                                            }
                                                        </div>

                                                        <div className="right_side_controller_box">
                                                            <Link to="/bar" className="box_btn_home" onMouseOver={() => this.setState({ btnBar: 'show' })} onMouseOut={() => this.setState({ btnBar: 'hide' })}>
                                                                Bar
                                                            </Link>
                                                            <Link to="/library" className="box_btn_home" onMouseOver={() => this.setState({ btnLibrary: 'show' })} onMouseOut={() => this.setState({ btnLibrary: 'hide' })}>
                                                                Library
                                                            </Link>

                                                            <Link className="box_btn_home" onMouseOver={() => this.setState({ btnExam: 'show' })} onMouseOut={() => this.setState({ btnExam: 'hide' })}>
                                                                Exam
                                                            </Link>
                                                            <Link className="box_btn_home" onMouseOver={() => this.setState({ btnGame: 'show' })} onMouseOut={() => this.setState({ btnGame: 'hide' })}>
                                                                Game
                                                            </Link>
                                                        </div>
                                                    </div>
                                            }
                                        </Fragment>
                                        : null
                                }

                            </Fragment>
                            : null
                    }
                </div>
            </div>
        )
    }
}
export default Home;
