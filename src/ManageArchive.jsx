import React, { Component } from 'react';
import ReturnBar from './ReturnBar';
import ban from "./images/ban.svg";
import plus from "./images/plus.svg";
import done from "./images/done.svg";
import deleteImg from "./images/delete.svg";


const options = ["לנסוע בקארטינג", "צומת בילו", "ים", "טיול קורקינט חשמלי", "אבו גוש", "לתקן מכונית על שלט", "מכונית על שלט", "טלוויזה", "קניון", "ים"];

const getArchive = (save) => {
    let archive = JSON.parse(localStorage.getItem("archive"));
    if (archive === null || archive === undefined) {
        archive = options;
        clearSave(archive, "archive")
    }
    return makeData(archive);
}

const makeData = (archive) => {
    let data = []
    archive.forEach(element => {
        data.push({
            item: element, isEditinfg: false, editValue: ''
        })
    });
    return data;
}

const save = (items, day) => {
    let data = [];
    items.forEach(element => {
        data.push(element.item)
    });
    clearSave(data, day)
}

const clearSave = (items, day) => {
    const myJSON = JSON.stringify(items);
    localStorage.setItem(day, myJSON);
}


class ManageArchive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            archive: getArchive(save),
            adding: false,
            newItemValue: ''
        };
    }

    reset = () => {
        let archive = makeData(options);
        this.setState({
            archive
        });
        save(archive, "archive");
    }

    deleteIten = (index) => {
        let archive = this.state.archive;
        archive.splice(index, 1);
        this.setState({
            archive
        });
        save(archive, "archive");
    }

    handleChange = (e) => {
        this.setState({
            newItemValue: e.target.value
        });
        if (e.key === 'Enter') {
            alert('hi');
        }
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.saveNewItem()
        }
    }

    saveNewItem = () => {
        if (this.state.newItemValue !== '') {
            let archive = this.state.archive;
            archive.push({
                item: this.state.newItemValue, isEditinfg: false, editValue: ''
            })
            this.setState({
                archive,
                newItemValue: '',
                adding: false
            });
            save(archive, "archive");
        } else {
            this.setState({
                newItemValue: '',
                adding: false
            });
        }
    }


    render() {
        return (
            <div className="full">
                <ReturnBar koteret={"פעילויות מוצעות"} showHome={true} push={this.props.history.push} goBack={this.props.history.goBack} />
                <div className="Day mainBox">

                    <div className="clearBotton" onClick={this.reset} >
                        אתחל להגדרות המערכת
                        <img style={{ marginRight: "10px", marginBottom: '3px' }} src={deleteImg} height="11px" alt="icon"/>
                    </div>
                    {this.state.archive.map((item, index) => (
                        <div className="option" key={index}>
                            <div>
                                {item.item}
                            </div>
                            <div>
                                <img onClick={() => this.deleteIten(index)} style={{ marginRight: "10px", marginBottom: '3px' }} alt="icon" src={ban} height="18px" />
                            </div>
                        </div>

                    ))}
                    {!this.state.adding ? <div className=" option" onClick={() => { this.setState({ adding: true }) }}>
                        <img style={{ marginRight: "10px", marginBottom: '3px' }} src={plus} height="21px" alt="icon"/>
                    </div> :
                        <div className=" option">
                            <input className="inputask" width="80%" type="text" value={this.state.newItemValue}
                                onChange={(e) => this.handleChange(e)}
                                onKeyDown={(e) => this.handleKeyDown(e)}
                            />
                            <img style={{ marginRight: "10px", marginBottom: '3px' }} onClick={() => this.saveNewItem()} src={done} height="24px" alt="icon" />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default ManageArchive;