import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class BookJS extends Component {
    state = {
        showAddPrice: 'hide',
        clickedContent: false
    }
    clickedSomeContent = () => {
        this.setState({
            clickedContent: true
        })
    }
    handlerReadContent_01 = (e) => {
        this.clickedSomeContent();
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://eloquentjavascript.net/01_values.html', '_blank'
            );
        }, 1200)

    }
    handlerReadContent_02 = () => {
        this.clickedSomeContent();
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://eloquentjavascript.net/02_program_structure.html', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_03 = () => {
        this.clickedSomeContent();
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://eloquentjavascript.net/03_functions.html', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_04 = () => {
        this.clickedSomeContent();
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://eloquentjavascript.net/04_data.html', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_05 = () => {
        this.clickedSomeContent();
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://eloquentjavascript.net/05_higher_order.html', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_06 = () => {
        this.clickedSomeContent();
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://eloquentjavascript.net/06_object.html', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_07 = () => {
        this.clickedSomeContent();
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://eloquentjavascript.net/09_regexp.html', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_08 = () => {
        this.clickedSomeContent();
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://eloquentjavascript.net/13_browser.html', '_blank'
            );
        }, 1200)
    }
    showNotificationAddPrice = () => {
        this.setState({
            showAddPrice: 'show',
        })
    }
    timeNotifications = () => {
        setTimeout(() => {
            this.setState({
                showAddPrice: 'hide',
            })
        }, 1200)
    }
    componentDidUpdate() {
        let { currentUser } = this.props;
        let { clickedContent } = this.state;
        if (clickedContent) {
            currentUser.money += 10
            axios.post(`https://fullstack-app-office.herokuapp.com/users/update/${currentUser._id}`, currentUser)
                .then(res => {
                })
                .catch(err => console.log(err))
            this.setState({
                clickedContent: false
            })
        }
    }

    render() {
        let { openSliderMenu } = this.props;
        let { showAddPrice } = this.state;

        return (
            <div className={"book_box " + openSliderMenu}>
                {
                    showAddPrice === 'show'
                        ? <div className="add_money">
                            {this.timeNotifications()}
                            <span>+10$</span>
                        </div>
                        : null
                }
                <h3>Contents</h3>
                <div className="box_img_JS"></div>
                <div className="list_boxes">
                    <span>1.</span>
                    <Link to="#" onClick={this.handlerReadContent_01}>Values, Types, and Operators</Link>
                </div>
                <div className="list_boxes">
                    <span>2.</span>
                    <Link to="#" onClick={this.handlerReadContent_02}>Program Structure</Link>
                </div>
                <div className="list_boxes">
                    <span>3.</span>
                    <Link to="#" onClick={this.handlerReadContent_03}>Functions</Link>
                </div>
                <div className="list_boxes">
                    <span>4.</span>
                    <Link to="#" onClick={this.handlerReadContent_04}>Data Structures: Objects and Arrays</Link>
                </div>
                <div className="list_boxes">
                    <span>5.</span>
                    <Link to="#" onClick={this.handlerReadContent_05}>Higher-order Functions</Link>
                </div>
                <div className="list_boxes">
                    <span>6.</span>
                    <Link to="#" onClick={this.handlerReadContent_06}>The Secret Life of Objects</Link>
                </div>
                <div className="list_boxes">
                    <span>7.</span>
                    <Link to="#" onClick={this.handlerReadContent_07}>Regular Expressions</Link>
                </div>
                <div className="list_boxes">
                    <span>8.</span>
                    <Link to="#" onClick={this.handlerReadContent_08}>JavaScript and the Browser</Link>
                </div>
            </div>
        )
    }
}
export default BookJS;
