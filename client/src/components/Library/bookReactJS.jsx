import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class BookReactJS extends Component {
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
                'https://www.freecodecamp.org/news/the-react-handbook-b71c27b0a795/#jsx', '_blank'
            );
        }, 1200)

    }
    handlerReadContent_02 = () => {
        this.clickedSomeContent();
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://www.freecodecamp.org/news/the-react-handbook-b71c27b0a795/#components', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_03 = () => {
        this.clickedSomeContent();
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://www.freecodecamp.org/news/the-react-handbook-b71c27b0a795/#state', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_04 = () => {
        this.clickedSomeContent();
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://www.freecodecamp.org/news/the-react-handbook-b71c27b0a795/#props', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_05 = () => {
        this.clickedSomeContent();
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://www.freecodecamp.org/news/the-react-handbook-b71c27b0a795/#presentational-vs-container-components', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_06 = () => {
        this.clickedSomeContent();
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://www.freecodecamp.org/news/the-react-handbook-b71c27b0a795/#lifecycle-events', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_07 = () => {
        this.clickedSomeContent();
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://www.freecodecamp.org/news/the-react-handbook-b71c27b0a795/#hooks', '_blank'
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
            currentUser.money += 15
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
                            <span>+15$</span>
                        </div>
                        : null
                }
                <h3>Contents</h3>
                <div className="box_img_ReactJS"></div>
                <div className="list_boxes">
                    <span>1.</span>
                    <Link to="#" onClick={this.handlerReadContent_01}>JSX</Link>
                </div>
                <div className="list_boxes">
                    <span>2.</span>
                    <Link to="#" onClick={this.handlerReadContent_02}>Components</Link>
                </div>
                <div className="list_boxes">
                    <span>3.</span>
                    <Link to="#" onClick={this.handlerReadContent_03}>State</Link>
                </div>
                <div className="list_boxes">
                    <span>4.</span>
                    <Link to="#" onClick={this.handlerReadContent_04}>Props</Link>
                </div>
                <div className="list_boxes">
                    <span>5.</span>
                    <Link to="#" onClick={this.handlerReadContent_05}>Presentational vs container components</Link>
                </div>
                <div className="list_boxes">
                    <span>6.</span>
                    <Link to="#" onClick={this.handlerReadContent_06}>Lifecycle Events</Link>
                </div>
                <div className="list_boxes">
                    <span>7.</span>
                    <Link to="#" onClick={this.handlerReadContent_07}>Hooks</Link>
                </div>
            </div>
        )
    }
}
export default BookReactJS;
