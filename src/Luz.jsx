import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Card from './Card';

const options = ["לנסוע בקארטינג", "צומת בילו", "ים", "טיול קורקינט חשמלי", "אבו גוש", "לתקן מכונית על שלט", "מכונית על שלט", "טלוויזה", "קניון", "ים"];

const getArchive = (save) => {
  let archive = JSON.parse(localStorage.getItem("archive"));
  if (archive === null || archive === undefined) {
    archive = options;
    save(archive, "archive");
  }
  return archive;
}

const paddingSize = 10;

const times = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: '15px',
  margin: `0 0 ${paddingSize}px 0`,
  background: "#FFFFFF",
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: "#F7F7F7",
});

class Luz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archive: getArchive(this.props.save)
    };
  }

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  handleChange = (event, index) => {
    let newItems = this.props.items;
    newItems[index].content = event.target.value;
    this.props.save(newItems, this.props.dayNum);
    this.props.setItems(newItems);
  }

  removeData = (index) => {
    let newItems = this.props.items;
    newItems[index].content = null;
    newItems[index].showInput = false;
    newItems[index].showSelect = false;
    newItems[index].done = false;
    this.props.save(newItems, this.props.dayNum);
    this.props.setItems(newItems);
  }

  setSelect = (itemIndex, archiveIndex) => {
    let newItems = this.props.items;
    newItems[itemIndex].content = this.state.archive[archiveIndex];
    newItems[itemIndex].done = true;
    newItems[itemIndex].showSelect = false;
    this.props.save(newItems, this.props.dayNum);
    this.props.setItems(newItems);
  }

  setDone = (index) => {
    let newItems = this.props.items;
    newItems[index].showInput = false;
    newItems[index].done = true;
    if (!newItems[index].content)
      newItems[index].done = false;
    this.props.save(newItems, this.props.dayNum);
    this.setState({
      items: newItems
    });
  }

  setShowing = (val, index) => {
    let newItems = this.props.items;
    newItems[index].showInput = val;
    this.props.save(newItems, this.props.dayNum);
    this.props.setItems(newItems);
  }

  setShowingSelect = (index) => {
    let newItems = this.props.items;
    newItems[index].showSelect = true;
    this.props.save(newItems, this.props.dayNum);
    this.props.setItems(newItems);
  }

  fixTimes = (items) => {
    for (let index = 0; index < items.length; index++) {
      let element = items[index];
      element.time = times[index];
    }
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.props.items,
      result.source.index,
      result.destination.index
    );

    this.fixTimes(items);
    this.props.save(items, this.props.dayNum);
    this.props.setItems(items);
  }

  handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      this.setDone(index)
    }
  }

  render() {
    return (
      <div className="mainBox">

        <DragDropContext onDragEnd={this.onDragEnd} >
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                className="in"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >

                {this.props.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className="task"

                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >

                        <Card 
                        item={item} removeData={this.removeData} archive={this.state.archive}
                         handleKeyDown={this.handleKeyDown} setShowing={this.setShowing} setSelect={this.setSelect}
                         handleChange={this.handleChange} setDone={this.setDone} index={index}
                        />
                        
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

    );
  }
}


export default Luz;