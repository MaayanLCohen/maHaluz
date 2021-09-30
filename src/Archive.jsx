import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import archive from "./images/archive.svg";


class Archive extends Component {
    

    render() {
        return (
            <Dropdown className="selectTask" onSelect={(value) => this.props.setSelect(this.props.itemIndex, value)}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <img src={archive} className="iconChoose icon" alt="icon"/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {this.props.archive.map((item, index) => (
                        <Dropdown.Item eventKey={index} key={index}>{item}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default Archive;