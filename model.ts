/*
 * @Author: guoxiu
 * @Date: 2020-04-09 13:20:57
 * @LastEditors: guoxiu
 * @LastEditTime: 2020-04-10 18:02:03
 * @Description: file content
 * @email: guoxiu@szkingdom.com
 */
import { Effect, Reducer } from 'umi'
import { getUser, getAddress } from './servers'
import { todoList } from './data.d'

export interface ModelState{
  todoList: todoList[];
  index: Number;
}

export interface ModeType {
  namespace: string;
  state: ModelState;
  reducers: {
      saveTodoList:Reducer<ModelState>;
      changeIndex:Reducer<ModelState>;
      clear: Reducer<ModelState>;
  };
}

const Model: ModeType = {
  namespace: 'todolist',
  state: {
    todoList: [],
    index: 0,
  },
  effects: {},
  reducers: {
    saveTodoList(state:ModelState, { payload }) {
      return{
        ...state,
        todoList: [...payload], 
      }
    },
    changeIndex(state: ModelState, { payload }) {
      return{
        ...state,
        index: payload.key,
      }
    },
    clear() {
      return{
		index:0,
        todoList: [],
      }
    }
  }
}

export default Model;
