import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import SliderMenu from '../SettingsMenu/sliderMenu';
//import MyAnswers from './myAnswers';

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

    }
    handleCurChoice = (e) => {


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
        console.log(this.state.currentChoice)
        let left_side_door = 'left_side_door';
        let right_side_door = 'right_side_door';

        let { leftDoor, rightDoor, controller, freezeController, openSliderMenu, notificationController } = this.state;

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
                                                                <input type="radio" onChange={this.onCheckChange} name="gender" value={"html"} />
                                                                HTML
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

                                                        {/* <MyAnswers
                                                            currentChoice={currentChoice}
                                                            handleCurChoice={this.handleCurChoice}
                                                        /> */}
                                                    </div>
                                                    <div className="right_side_controller_box">
                                                        <Link to="/home" className="box_btn_bar" onMouseOver={() => this.setState({ btnBar: 'show' })} onMouseOut={() => this.setState({ btnBar: 'hide' })}>
                                                            Home
                                                            </Link>
                                                    </div>
                                                </div>
                                                : <div className={"choice_boxes " + controller}>
                                                  
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
export default HomeLybrary;
