import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader
} from 'semantic-ui-react'

import { createTodo, deleteTodo, getTodos, patchTodo } from '../api/todos-api'
import Auth from '../auth/Auth'
import { Todo } from '../types/Todo'

interface TodosProps {
  auth: Auth
  history: History
  
}

interface TodosState {

  
  todos: Todo[]
  newTodoName: string
  loadingTodos: boolean
}

export class Todos extends React.PureComponent<TodosProps, TodosState> {
  state: TodosState = {
    
    todos: [],
    newTodoName: '',
    loadingTodos: true
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTodoName: event.target.value })
  }

  onEditButtonClick = (todoId: string) => {
    this.props.history.push(`/todos/${todoId}/edit`)
  }
  onEditTextButtonClick = (todoId: string) => {
    
    this.props.history.push(`/todos/${todoId}/edittext`)
  }
  onTodoCreate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {
      const dueDate = this.calculateDueDate()
      const newTodo = await createTodo(this.props.auth.getIdToken(), {
        name: this.state.newTodoName,
        dueDate
      })
      this.setState({
        todos: [...this.state.todos, newTodo],
        
        newTodoName: ''
        
      })
      
    } catch {
      alert('Todo creation failed')
    }
  }

  onTodoDelete = async (todoId: string) => {
    try {
      await deleteTodo(this.props.auth.getIdToken(), todoId)
      this.setState({
        todos: this.state.todos.filter(todo => todo.todoId != todoId)
       
      })
      
    } catch {
      alert('Todo deletion failed')
    }
  }

  onTodoCheck = async (pos: number) => {
    try {
      const todo = this.state.todos[pos]
      
      await patchTodo(this.props.auth.getIdToken(), todo.todoId, {
        name: todo.name,
        dueDate: todo.dueDate,
        done: !todo.done
      })
      this.setState({
        todos: update(this.state.todos, {
          [pos]: { done: { $set: !todo.done } }
        })
      })
  
    
      
      console.log('todoscheck ', this.state.todos)
    } catch {
      alert('Todo updating is failed')
    }
  }

  async componentDidMount() {
    try {
      const todos = await getTodos(this.props.auth.getIdToken())
      
      this.setState({
        todos,
        loadingTodos: false
      })

    } catch (e) {
      alert(`Failed to fetch todos: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">TODOs</Header>

        {this.renderCreateTodoInput()}

        {this.renderTodos()}
      </div>
    )
  }

  renderCreateTodoInput() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'add',
              content: 'New task',
              onClick: this.onTodoCreate
            }}
            fluid
            actionPosition="left"
            placeholder="To change the world..."
            onChange={this.handleNameChange}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    )
  }

  renderTodos() {
    if (this.state.loadingTodos) {
      return this.renderLoading()
    }
    // need add if status check true or  false diff list render

    return this.renderTodosList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading TODOs
        </Loader>
      </Grid.Row>
    )
  }

  renderTodosList() {
    const divStyle = {
      
      background: 'white', 
      padding: '3px'
    };
    const divStyle2 = {
      
      background: '#d7e8e3', 
      padding: '1vmin',
      margin: '4vmin',
      borderRadius: '50%'
    };

    return (
      <Grid padded>
        {this.state.todos.map((todo, pos) => {
          
          return (
            // style={{ background: 'rgb(170 250 220)'}} rgb(151 217 190 / 26%)
            
              <Grid.Row key={todo.todoId} style = {{background: todo.done ? 'rgb(135 236 186)' : 'rgb(207 230 218)' , border: '4px solid #d7e8e3', borderRadius: '0.857143rem', margin: '1px'}}>
                <Grid.Column width={1}   floated="left" verticalAlign="middle">
                  <Checkbox
                    onChange={() => this.onTodoCheck(pos)}
                    checked={todo.done}
                  />
                </Grid.Column>

                <Grid.Column width={5} floated="left">
                  {todo.dueDate}
                </Grid.Column>



                  <Grid.Column width={6} floated="right" >
                  <Button 
                    icon
                    color='teal'
                    style = {{ padding: '3px',  margin: '.5vmin'}}
                    onClick={() => this.onEditButtonClick(todo.todoId)}
                  >
                    <Icon name="image" />
                  </Button>
                  <Button 
                    icon
                    color='teal'
                    style = {{ padding: '3px',  margin: '.5vmin'}}
                    onClick={() =>  this.onEditTextButtonClick(todo.todoId)}
                  >
                    <Icon name="pencil" />
                  </Button>
                  <Button
                    icon
                    color='red'
                    style = {{ padding: '3px',  margin: '.5vmin'}}
                    onClick={() => this.onTodoDelete(todo.todoId)}
                  >
                    <Icon name="delete" />
                  </Button>
                  </Grid.Column>

                <Grid.Column width={6} floated="left" verticalAlign="middle">
                {todo.attachmentUrl && (
                  <img src={todo.attachmentUrl}    style={divStyle2}  />
                )}
                </Grid.Column>
                <Grid.Column width={10}  floated="left" stretched verticalAlign="middle">
                  <h3 style={{color:todo.done ? 'rgb(42 104 85)' : ' '}}>{todo.name}</h3>
                </Grid.Column>

              </Grid.Row>
            
          )
        })}
      </Grid>
    )
  }

  calculateDueDate(): string {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return dateFormat(date, 'yyyy-mm-dd') as string
  }
}
