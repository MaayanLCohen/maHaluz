import React, { Component } from 'react';
import back from "./images/back.svg";
import home from "./images/home.svg";


class ReturnBar extends Component {
    

    handleClean = () => {
        localStorage.removeItem(this.props.dayNum);
        let items = this.props.createNewItems(this.props.grid);
        this.props.save(items, this.props.dayNum);
        this.props.setItems(items);
    }

    render() {
        return (
            <div className="mynavbar">
                <img onClick={() => this.props.goBack()} src={back} height="25px" alt="icon"/>
                <div className="dayName" style={{ fontSize: '23px', color: "#FFFF" }}>{this.props.koteret}</div>
                {this.props.showHome && <img onClick={() => this.props.push('/')} src={home} height="25px" alt="icon"/>}
            </div>
        );
    }
}

export default ReturnBar;