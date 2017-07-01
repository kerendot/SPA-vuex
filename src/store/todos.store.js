export const TODO_LOAD        = 'TODO_LOAD';
export const TODO_UPDATE      = 'TODO_UPDATE';
export const TODO_CREATE      = 'TODO_CREATE';

import todoService from '../services/todos/todo.service'

const state = {
  todos: [],
  filterBy: { status: null, txt: null }
};

const getters = {
  filteredTodos({ filterBy, todos }) {
    var res = todos;
    if (filterBy.txt) {
      // TODO: use regex
      res = res.filter(todo => todo.txt.includes(filterBy.txt))
    }
    if (filterBy.status === 'completed') {
      res = res.filter(todo => todo.completed)
    }
    return res;
  },

  completedTodos(state) {
    return state.todos.filter(todo => todo.completed)
  },
  progress({ todos }, getters) {
    if (todos.length === 0) return 100;
    return parseInt((getters.completedTodos.length / todos.length) * 100);
  }
}


const mutations = {
  [TODO_LOAD](state, { todos }) {
    state.todos = todos;
  },
  [TODO_UPDATE](state, { todo }) {
    const idx = state.todos.findIndex(currTodo => currTodo._id === todo._id)
    state.todos.splice(idx, 1, todo);
  },
  [TODO_CREATE](state, { todo }) {
    state.todos.push(todo)
  },
  SET_FILTER(state, { filter }) {
    state.filterBy = filter;
  }
}

const actions = {

  [TODO_LOAD](context, payload) {
    todoService.query()
      .then(todos => {
        payload.todos = todos;
        context.commit(payload)
      });
  },
  [TODO_CREATE](context, payload) {
    var prm = todoService.addTodo(payload.todo);
    prm.then(res => {
      payload.todo = res;
      context.commit(payload);
    })
  },
  [TODO_UPDATE](context, payload) {
    var prm = todoService.update(payload.todo);
    prm.then(res => {
      payload.todo = res;
      context.commit(payload);
    })
  },
}

export const todoStore = {
  state,
  mutations,
  getters,
  actions
}


