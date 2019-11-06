import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import SliderMenu from '../SettingsMenu/sliderMenu';
import MyAnswers from './myAnswers';

class HomeBar extends Component {
    state = {
        leftDoor: 'hide',
        rightDoor: 'hide',
        isShowHome: false,
        controller: 'hide',
        currentChoice: '',
        openSliderMenu: 'hide',
        freezeController: '',
        quastionPavel: 'hide',
        textPavel: 'What do you want to drink?',
        notificationController: '',
        drinkBeer: '',
        drinkCoffe: '',
        drinkLemonade: '',
        showDrinkBox: 'hide',
        hideDrinkBox: '',
    }
    handleCurChoice = (e) => {
        console.log(e)
        let tempText = '';
        if (e === 'beer') {
            tempText = "Great choice, today beer is awesome"
            this.setState({
                textPavel: tempText,
                notificationController: '',
                drinkBeer: 'drinkBeer',
                showDrinkBox: 'show',
            })
        } else if (e === 'coffe') {
            tempText = "Okay, wait a minute"
            this.setState({
                textPavel: tempText,
                notificationController: '',
                drinkCoffe: 'drinkCoffe',
                showDrinkBox: 'show',
            })
        } else if (e === 'lemonade') {
            tempText = "You are creazy"
            this.setState({
                textPavel: tempText,
                notificationController: '',
                drinkLemonade: 'drinkLemonade',
                showDrinkBox: 'show',
            })
        } else {
            this.setState({
                notificationController: 'Please select one!',
            })
        }
        // if(e !== false){
        //     if (this.state.hideDrinkBox !== '') {
        //         this.setState({
        //             hideDrinkBox: '',

        //         })
        //     } else {
        //         this.setState({
        //             showDrinkBox: 'show',
        //             hideDrinkBox: '',
        //         })
        //     }
        // }
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
                isShowHome: true,
                leftDoor: 'show',
                rightDoor: 'show',
            })
        }, 1500)
        setTimeout(() => {
            this.setState({
                quastionPavel: 'show',
                controller: 'show'
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
    timeDrink = () => {
        // setTimeout(() => {
        //     this.setState({
        //         hideDrinkBox: '',
        //     })
        // }, 4500)

        setTimeout(() => {
            this.setState({
                showDrinkBox: 'hide',
                drinkBeer: '',
                drinkCoffe: '',
                drinkLemonade: '',
                hideDrinkBox: 'hide',
            })
        }, 3000)
    }

    render() {

        let left_side_door = 'left_side_door';
        let right_side_door = 'right_side_door';

        let { leftDoor, rightDoor, currentChoice, controller, freezeController, textPavel, quastionPavel, openSliderMenu, notificationController, drinkBeer, drinkCoffe, drinkLemonade } = this.state;


        return (
            <div className="bar_home">
                <div className={left_side_door + ' ' + leftDoor}></div>
                <div className={right_side_door + ' ' + rightDoor}></div>
                {
                    drinkBeer === "drinkBeer" && this.state.showDrinkBox === 'show'
                        ? <div className="notification_price"> <span>-10$</span> </div>
                        : null
                }
                {
                    drinkCoffe === "drinkCoffe" && this.state.showDrinkBox === 'show'
                        ? <div className={"notification_price " + this.state.showDrinkBox}> <span>-6$</span> </div>
                        : null
                }
                {
                    drinkBeer === "drinkBeer" && this.state.showDrinkBox === 'show'
                        ? <div className={"drinkBeer " + this.state.showDrinkBox}>
                            {this.timeDrink()}
                            <div className="box_question_child">
                                <div className="answer_bar">Mickael <i className="far fa-comment-dots"></i>
                                </div>
                                Cheers :)
                <span></span>
                            </div>
                        </div>
                        : <div className={"drinkBeer " + this.state.hideDrinkBox}>
                            <div className="box_question_child"></div>
                        </div>
                }

                {
                    drinkCoffe === "drinkCoffe" && this.state.showDrinkBox === 'show'
                        ? <div className={"drinkCoffe " + this.state.showDrinkBox}>
                            {this.timeDrink()}
                            <div className="box_question_child">
                                <div className="answer_bar">Vanesa <i className="far fa-comment-dots"></i>
                                </div>
                                Be careful it's hot!
                <span></span>
                            </div>
                        </div>
                        : <div className={"drinkCoffe " + this.state.hideDrinkBox}>
                            <div className="box_question_child"></div>
                        </div>
                }
                {
                    drinkLemonade === "drinkLemonade" && this.state.showDrinkBox === 'show'
                        ? <div className={"drinkLemonade " + this.state.showDrinkBox}>
                            {this.timeDrink()}
                            <div className="box_question_child">
                                <div className="answer_bar">Jasmin <i className="far fa-comment-dots"></i>
                                </div>
                                I'm sorry, we don't have lemonade
                <span></span>
                            </div>
                        </div>
                        : <div className={"drinkLemonade " + this.state.hideDrinkBox}>
                            <div className="box_question_child"></div>
                        </div>
                }

                {
                    leftDoor === 'show'
                        ? <Fragment>
                            <div className={"effect_body " + openSliderMenu} onClick={this.handleCloseMenu}>
                            </div>

                            {
                                quastionPavel === 'show'
                                    ? <div className="box_question_bar">
                                        <div className="box_question_child"></div>
                                        <span>Pavel <i className="far fa-comment-dots"></i></span>
                                        <div className="people_question">
                                            {textPavel}
                                        </div>
                                    </div>
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
                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"beer"} />
                                                                Beer
                                                    <span></span>
                                                            </label>
                                                            <label className="radio">
                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"coffe"} />
                                                                Coffe
                                                    <span> </span>
                                                            </label>
                                                            <label className="radio">
                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"lemonade"} />
                                                                lemonade
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
                                                : <div className={"choice_boxes " + controller}>
                                                    <div className="left_side_controller_box">
                                                        <div className="radio_boxes">
                                                            <label className="radio">
                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"no"} />
                                                                Beer
                                                    <span></span>
                                                            </label>
                                                            <label className="radio">
                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"yes"} />
                                                                Coffe
                                                    <span> </span>
                                                            </label>
                                                            <label className="radio">
                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"comment"} />
                                                                lemonade
                                                    <span></span>
                                                            </label>
                                                        </div>
                                                        <MyAnswers
                                                            currentChoice={currentChoice}
                                                            handleCurChoice={this.handleCurChoice}
                                                        />
                                                    </div>

                                                    <div className="right_side_controller_box">
                                                        <Link to="/bar" className="box_btn" onMouseOver={() => this.setState({ btnBar: 'show' })} onMouseOut={() => this.setState({ btnBar: 'hide' })}>
                                                            Home
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
            </div >
        )
    }
}

export default HomeBar;
