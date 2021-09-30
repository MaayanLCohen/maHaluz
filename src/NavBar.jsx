import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import deleteImg from "./images/delete.svg";
import gear from "./images/gear.png";


class NavBar extends Component {

    handleClean = () => {
        localStorage.removeItem(this.props.dayNum);
        let items = this.props.createNewItems(this.props.grid);
        this.props.save(items, this.props.dayNum);
        this.props.setItems(items);
    }

    render() {
        return (
            <div className="mynavbar">
                <img onClick={this.handleClean} src={deleteImg} height="25px" alt="icon"/>
                <Dropdown className="dayName">
                    <Dropdown.Toggle className="no" variant="success" id="dropdown-basic">
                        <div className="yes">
                            {this.props.day}
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/">ראשון</Dropdown.Item>
                        <Dropdown.Item href="#/2">שני</Dropdown.Item>
                        <Dropdown.Item href="#/3">שלישי</Dropdown.Item>
                        <Dropdown.Item href="#/4">רביעי</Dropdown.Item>
                        <Dropdown.Item href="#/5">חמישי</Dropdown.Item>
                        <Dropdown.Item href="#/6">שישי</Dropdown.Item>
                        <Dropdown.Item href="#/7">שבת</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <img onClick={() => this.props.history.push(`/settings`)} src={gear} height="25px" alt="icon"/>
            </div>
        );
    }
}

export default NavBar;