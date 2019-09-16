import React, { Component } from 'react';
import { sortableContainer, sortableElement } from 'react-sortable-hoc';

import arrayMove from 'array-move';

import './todolist.css';

const SortableItem = sortableElement(({index, value}) =>
  <li>{value}</li>
);

const SortableContainer = sortableContainer(({children}) => {
  return (
    <ul>
      {children}
    </ul>
  );
});

class TodoList extends Component {

  constructor(){
    super();
    this.state = {
        input: '',
        list: [],
    };
  }


  addToList = (e) => {
    let { list } = this.state;
    list.push(this.state.input);
    this.setState({
      list,
      input:'',
    })
  }

  updateInput = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  deleteTask = (indexToBeDeleted) => {
    let { list } = this.state;
    // list.splice(indexToBeDeleted, 1);
    const filteredList = list.filter((list, index) => {
      return index !== indexToBeDeleted;
    });

    this.setState({
      list: filteredList,
    })
  }

  displayList = () => {
    return this.state.list.map((item, index) => (
      {item}
      // <SortableItem
      //   key={`list-${index}`}
      //   index={index}
      //   value={item}
      // />
        // <li key={`list-${index}`} className="list">{item}
        //   // <button className="delete" onClick={() => this.deleteTask(index)}>delete</button>
        // </li>
    ));
  };

  onEnter = (event, callback) => event.key === 'Enter' && callback()

  onSortEnd = ({ oldIndex, newIndex}) => {
    this.setState(({list}) => ({
      list: arrayMove(list, oldIndex, newIndex),
    }));
  }

  render(){
    return(
      <div className="container">
        <div>Task:</div>
        <div>
          <input
          type="text"
          value={this.state.input}
          onChange={this.updateInput}
          onKeyPress={e => this.onEnter(e, this.addToList)}
        />
          <button onClick={this.addToList}>Add</button>
        </div>
        <div># of Results: {this.state.list.length}</div>
        {this.state.list.length > 0 &&
          <div>
            <h2>Task List:</h2>
            <div className="results">
              <SortableContainer
                onSortEnd={this.onSortEnd}
              >
                {this.state.list.map((value, index) => (

                    <SortableItem
                      key={`list-${index}`}
                      index={index}
                      value={value}
                    />
                  // <button className="delete" onClick={() => this.deleteTask(index)}>delete</button>

                ))}
              </SortableContainer>
            </div>
          </div>
        }

      </div>


    )

  }

};

export default TodoList;
