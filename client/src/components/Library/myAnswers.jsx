import React, { Component } from 'react';

class MyAnswers extends Component {
    render() {
        let { currentChoice, handleCurChoice } = this.props;
        let tempCurChoice = "";
        switch (currentChoice) {
            case 'javascript': tempCurChoice = 'javascript'; break
            case 'reactJS': tempCurChoice = 'reactJS'; break
            case 'css': tempCurChoice = 'css'; break
        }
        return (
            <div className="btn_buy_bar">
                <button className="readyBtn" onClick={() => handleCurChoice(tempCurChoice)}>Enter</button>
            </div>
        )
    }
}
export default MyAnswers;
