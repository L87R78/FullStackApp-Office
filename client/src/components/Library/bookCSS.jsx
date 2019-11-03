import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class BookCSS extends Component {
    state = {
        showAddPrice: 'hide'
    }
    handlerReadContent_01 = (e) => {
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://learn.shayhowe.com/html-css/building-your-first-web-page', '_blank'
            );
        }, 1200)

    }
    handlerReadContent_02 = () => {
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://learn.shayhowe.com/html-css/getting-to-know-html', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_03 = () => {
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://learn.shayhowe.com/html-css/getting-to-know-css', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_04 = () => {
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://learn.shayhowe.com/html-css/opening-the-box-model', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_05 = () => {
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://learn.shayhowe.com/html-css/positioning-content', '_blank'
            );
        }, 1200)
    }
    handlerReadContent_06 = () => {
        this.showNotificationAddPrice();
        setTimeout(() => {
            window.open(
                'https://learn.shayhowe.com/html-css/adding-media', '_blank'
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
    render() {
        let { openSliderMenu } = this.props;
        let { showAddPrice } = this.state;
        return (
            <div className={"book_box " + openSliderMenu}>
                {
                    showAddPrice === 'show'
                        ? <div className="add_money">
                            {this.timeNotifications()}
                            <span>+13$</span>
                        </div>
                        : null
                }
                <h3>Contents</h3>
                <div className="box_img_CSS"></div>
                <div className="list_boxes">
                    <span>1.</span>
                    <Link to="#" onClick={this.handlerReadContent_01}>Building Your First Web Page</Link>
                </div>
                <div className="list_boxes">
                    <span>2.</span>
                    <Link to="#" onClick={this.handlerReadContent_02}>Getting to Know HTML</Link>

                </div>
                <div className="list_boxes">
                    <span>3.</span>
                    <Link to="#" onClick={this.handlerReadContent_03}>Getting to Know CSS</Link>
                </div>
                <div className="list_boxes">
                    <span>4.</span>
                    <Link to="#" onClick={this.handlerReadContent_04}>Opening the Box Model</Link>
                </div>
                <div className="list_boxes">
                    <span>5.</span>
                    <Link to="#" onClick={this.handlerReadContent_05}>Positioning Content</Link>
                </div>
                <div className="list_boxes">
                    <span>6.</span>
                    <Link to="#" onClick={this.handlerReadContent_06}>Adding Media</Link>
                </div>
            </div>
        )
    }
}
export default BookCSS;
