import React, { Component } from 'react';
import Archive from './Archive';
import edit from "./images/edit.svg";
import bars from "./images/bars.svg";
import done from "./images/done.svg";
import trash from "./images/trash.svg";


class Card extends Component {

    render() {
        let item = this.props.item;
        let index = this.props.index;
        return (
            <div className="card1">
                <div className="dargImg">
                    <img src={bars} width="100%" alt="icon" />
                </div>
                <div className="secondDiv">
                    <div className="time">
                        {(item.showInput || item.done || item.showSelect) && <img src={trash} className="trashIcon" onClick={() => this.props.removeData(index)} alt="icon" />}
                        <div>{item.time}</div>
                    </div>
                    <div className="data">
                        {(!item.done && !item.showSelect && !item.showInput) ?
                            <div className="choosing">
                                <Archive setSelect={this.props.setSelect} archive={this.props.archive} content={item.content} itemIndex={index} />
                                {<img src={edit} className="iconChoose icon" onClick={() => this.props.setShowing(true, index)} alt="icon" />}
                            </div> :
                            <div className="filling">
                                {item.done && <div className="content">{item.content}</div>}
                                {item.showInput && <div className="insert">
                                    {<input className="inputask" width="80%" type="text"
                                        value={item.content}
                                        onChange={(e) => this.props.handleChange(e, index)}
                                        onKeyDown={(e) => this.props.handleKeyDown(e, index)}
                                    />}
                                    {<img src={done} className="vi" onClick={() => this.props.setDone(index)} alt="icon" />}
                                </div>}
                            </div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;