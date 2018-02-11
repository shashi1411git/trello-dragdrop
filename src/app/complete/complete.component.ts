import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  //Some pending/backlog task
  opentasks = [
    {id: 1, title: 'Task1', status: 'open'},
    {id: 2, title: 'Task2', status: 'open'},
    {id: 3, title: 'Task3', status: 'open'},
    {id: 4, title: 'Task4', status: 'open'},
    {id: 5, title: 'Task5', status: 'open'}
  ];

  todo = [];
  inprogress = [];
  done = [];
  dragEnabled = true;

 //status: todo
  onToDoDrop(e: any) {
    this.todo.push(e.dragData);
    if (e.dragData.status === 'open') {
      this.removeItem(e.dragData, this.opentasks);
    } else if (e.dragData.status === 'todo') {
      this.removeItem(e.dragData, this.todo);
    } else if (e.dragData.status === 'inprogress') {
      this.removeItem(e.dragData, this.inprogress);
    } else if (e.dragData.status === 'done') {
      this.removeItem(e.dragData, this.done);
    }
    e.dragData.status = 'todo';
  }

 //status: inprogress
  onInProgressDrop(e: any) {
    if (e.dragData.status !== 'open') {
      this.inprogress.push(e.dragData);

      if (e.dragData.status === 'todo') {
        this.removeItem(e.dragData, this.todo);
      } else {
        this.removeItem(e.dragData, this.done);
      }
      e.dragData.status = 'inprogress';
    }
  }

 //status: done
  onDoneDrop(e: any) {
    if (e.dragData.status !== 'open') {
      this.done.push(e.dragData);

      if (e.dragData.status === 'todo') {
        this.removeItem(e.dragData, this.todo);
      } else {
        this.removeItem(e.dragData, this.inprogress);
      }
      e.dragData.status = 'done';
    }

  }

  getIndex(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.id;
    }).indexOf(item.id);
    return index;
  }

  removeItem(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.id;
    }).indexOf(item.id);
    list.splice(index, 1);
  }

  addTask(e) {
 //If user does not input title then assign task id as title
    if (e.target.value === '') {
      e.target.value = this.todo.length.toString();
    }
    this.todo.push({'id': this.todo.length, 'title': e.target.value, 'status': 'todo'});

    // Clear the textbox
    e.currentTarget.value = '';
  }

  updateTask(item) {
    if (item.status === 'open') {
      this.opentasks.splice(this.getIndex(item, this.opentasks), 1, {'id': item.id, 'title': item.title + this.opentasks.length, 'status': 'open'});
    } else if (item.status === 'todo') {
      this.todo.splice(this.getIndex(item, this.todo), 1, {'id': item.id, 'title': item.title + this.todo.length, 'status': 'todo'});
    } else if (item.status === 'inprogress') {
      this.inprogress.splice(this.getIndex(item, this.inprogress), 1, {'id': item.id, 'title': item.title + this.inprogress.length, 'status': 'inprogress'});
    } else if (item.status === 'done') {
      this.done.splice(this.getIndex(item, this.done), 1, {'id': item.id, 'title': item.title + this.done.length, 'status': 'done'});
    }
  }

  deleteTask(item) {
    if (item.status === 'open') {
      this.removeItem(item, this.opentasks);
    } else if (item.status === 'todo') {
      this.removeItem(item, this.todo);
    } else if (item.status === 'inprogress') {
      this.removeItem(item, this.inprogress);
    } else if (item.status === 'done') {
      this.removeItem(item, this.done);
    }
  }
}
