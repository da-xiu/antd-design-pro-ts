import React, { Component, Fragment } from 'react';
import { Dispatch, connect } from 'umi';
import { CloseCircleOutlined } from '@ant-design/icons';
import { ModelState } from './model';
import styles from './style.less';

interface newPagesProps {
  name?: string;
  address?: string;
  dispatch: Dispatch;
  newpagestest: ModelState;
  toDoList: (Object|Number)[];
  index: Number;
}

class NewPages extends Component<newPagesProps> {
  myRef: React.RefObject<any>;
  constructor(props: newPagesProps){
    super(props)
    this.myRef = React.createRef();
  }
  // 新增待办
  addTodoList = () => {
    const { dispatch, todolist: { todoList, index } } = this.props;
   const val = this.myRef.current.value; // 节点值
   const toDoList = [...todoList, { val, index }]; // 增加的值
   let key: any = index; // 增加的项序号
   key ++ // 每次增加1
   // 改变页面状态
   dispatch({
    type: 'todolist/saveTodoList',
    payload: toDoList,
  })
  // 改变索引值
   dispatch({
    type: 'todolist/changeIndex',
    payload: { key },
  })
  this.myRef.current.value = ''; // 清空值
  this.myRef.current.focus(); // 获取焦点
  };

  // 删除待办
  removeTodo = e => {
    const { dispatch, newpagestest: { todoList } } = this.props;
    // 要删除的索引
    const index = e.currentTarget && e.currentTarget.dataset.id;
    const results = todoList.filter(item => (
      item.index != parseInt(index, 10)
    ))
    dispatch({
      type: 'todolist/saveTodoList',
      payload: results,
    })
  }
  
  render() {
    const { todolist: { todoList } } = this.props
    return (
      <Fragment>
        {/* <FormRegister /> */}
        <div className={styles.wrap}>
           <input type="text" placeholder="请输入待办事项" ref={this.myRef}/>
            <button onClick={() => this.addTodoList()}>新增</button>
            <ul>
               {todoList.length && todoList.map((item, key) => (
              <li className={styles.list} key={key}>
                {item.val}
                <span data-id={item.index} onClick={(e) => this.removeTodo(e)} className={styles.close}>
                   <CloseCircleOutlined/>
                </span>
                </li>
              ))}
            </ul>
        </div>
      </Fragment>
    );
  }
}

export default connect(
  ({
    todolist
  }: {
    todolist: ModelState;
  }) => ({
  todolist
  }),
)(NewPages);
