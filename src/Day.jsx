import React, { Component } from 'react';
import Luz from './Luz';
import NavBar from './NavBar';

const times = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.getItems(this.grid, this.props.dayNum),
        };

    }

    grid = 15;


    createNewItems = (count) =>
        Array.from({ length: count }, (v, k) => k).map(k => ({
            id: `item-${k}`,
            content: null,
            time: times[k],
            showInput: false,
            done: false,
            showSelect: false
        }));


    getItems = (count, day) => {
        let items = JSON.parse(localStorage.getItem(day));
        if (items === null || items === undefined) {
            items = this.createNewItems(count);
            this.save(items, day);
        }
        return items;
    }

    save = (items, day) => {
        const myJSON = JSON.stringify(items);
        localStorage.setItem(day, myJSON);
    }


    setItems = (items) => {
        this.setState({
            items
        });
    }

    render() {
        return (
            <div className="Day">
                {this.props.day && <NavBar grid={this.grid} createNewItems={this.createNewItems}
                    setItems={this.setItems} save={this.save} dayNum={this.props.dayNum} day={this.props.day}
                    history={this.props.history} />}

                {this.props.day && <Luz save={this.save} items={this.state.items} setItems={this.setItems}
                    dayNum={this.props.dayNum} />}
            </div>
        );
    }
}

export default Day;