import React, { Component } from 'react';
import axios from 'axios';

class MyAnswers extends Component {
    state = {
        timeBtn: true,
        tempCurChoice: '',
        allUsers: []
    }
    stopBtnBuy = (e) => {
        this.state.allUsers.map(el => {
            if (el.username === localStorage.getItem('currentUser')) {

                if (e === 'beer') {
                    if (el.myOrders.length > 0) {
                        let check = true
                        el.myOrders.map(element => {
                            let checkObj = Object.keys(element)

                            if (checkObj[0] === 'beer') {
                                element['beer'] += 1
                                check = false
                            }
                        })
                        if(check){
                            el.myOrders.push({ beer: 1 })
                        }
                    } else {
                        el.myOrders.push({ beer: 1 })
                    }
                    el.money -= 10;
                    axios.post(`https://fullstack-app-office.herokuapp.com/users/update/${el._id}`, el)
                        .then(res => {
                        })
                        .catch(err => console.log(err))

                } else if (e === 'coffe') {
                    if (el.myOrders.length > 0) {
                        let check = true
                        el.myOrders.map(element => {
                            let checkObj = Object.keys(element)
                           

                            if (checkObj[0] === 'coffe') {
                                element['coffe'] += 1
                                check = false
                            } 
                        })
                        if(check){
                            el.myOrders.push({ coffe: 1 })
                        }

                    } else {
                        el.myOrders.push({ coffe: 1 })
                    }
                    el.money -= 6;
                    axios.post(`https://fullstack-app-office.herokuapp.com/users/update/${el._id}`, el)
                        .then(res => {
                        })
                        .catch(err => console.log(err))
                }
            }
        })

        this.setState({
            timeBtn: false
        })
        setTimeout(() => {
            this.setState({
                timeBtn: true
            })
        }, 5100)
    }
    componentDidMount() {
        axios.get('https://fullstack-app-office.herokuapp.com/users')
            .then(res => {
                this.setState({
                    allUsers: res.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        let { currentChoice, handleCurChoice } = this.props;
        let tempCurChoice = ""

        switch (currentChoice) {
            case 'beer': tempCurChoice = 'beer'; break
            case 'coffe': tempCurChoice = 'coffe'; break
            case 'lemonade': tempCurChoice = 'lemonade'; break
            default: tempCurChoice = false; break
        }

        return (
            <div className="btn_buy_bar">
                {
                    this.state.timeBtn
                        ? <div>
                            {
                                tempCurChoice === false
                                    ? <button className="readyBtn" onClick={() => handleCurChoice(tempCurChoice)}>Buy</button>
                                    : <button className="readyBtn" onClick={() => { handleCurChoice(tempCurChoice); this.stopBtnBuy(tempCurChoice) }}>Buy</button>
                            }
                        </div>
                        : null
                }
            </div>
        )
    }
}
export default MyAnswers;
