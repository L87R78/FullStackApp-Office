import React, { Component } from 'react';

class MyAnswers extends Component {
    state = {
        sendMessage: '',
    }

    handleFeedBackMessage = (e) => {
        this.setState({
            sendMessage: e.target.value,
        })
    }
    handleClearTextArea = () => {
        this.setState({
            sendMessage: ''
        })
    }

    render() {
        let { currentChoice, handleCurChoice } = this.props;
        let tempCurChoice = '';
        switch (currentChoice) {
            case 'yes': tempCurChoice = 'yes'; break
            case 'no': tempCurChoice = 'no'; break
            case 'comment': tempCurChoice = 'comment'; break
            default: tempCurChoice = false; break
        }

        let { sendMessage } = this.state;
        let tempSendObjMyAnswer = {};
        if (sendMessage !== '') {
            tempSendObjMyAnswer.currentChoice = currentChoice;
            tempSendObjMyAnswer.sendMessage = sendMessage;
        }
        return (
            <div>
                {
                    tempCurChoice === 'comment'
                        ? <div className="textArea_btnSend">
                            <textarea
                                value={this.state.sendMessage}
                                onChange={this.handleFeedBackMessage}
                                type="text"
                                placeholder="Please write here">

                            </textarea>
                            {
                                sendMessage !== ''
                                    ? <div className="btnSend_home">
                                        <button className="readyBtn" onClick={() => { handleCurChoice(tempSendObjMyAnswer); this.handleClearTextArea() }} >Send </button>
                                    </div>
                                    : null
                            }
                        </div>
                        : <div className="textArea_btnSend hide">
                            {
                                tempCurChoice === false
                                    ? <textarea disabled></textarea>
                                    : <div className="btnSend_home">
                                        <button className="readyBtn" onClick={() => { handleCurChoice(currentChoice) }}>Send</button>
                                    </div>
                            }
                        </div>
                }
            </div>
        )
    }
}
export default MyAnswers;
