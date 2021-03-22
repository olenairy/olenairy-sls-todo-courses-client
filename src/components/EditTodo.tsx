import * as React from 'react'
import { Form, Button, Grid, Input} from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { getTodos, patchTodo } from '../api/todos-api'
import { Todo } from '../types/Todo'
import { History } from 'history'


interface EditTodoProps {
  match: {
    params: {
      todoId: string
    }
  }
  auth: Auth
  history: History
}
 
interface EditTodoState {
  todos: Todo[]
  loadingTodos: boolean
  dat: string
  nam: string
  todId: string
  don: boolean
}

export class EditTodo extends React.PureComponent<EditTodoProps,EditTodoState>  {


  
  state: EditTodoState = {
    todos:[],
    loadingTodos: true,
    dat: '',
    nam: '',
    don: false,
    todId: this.props.match.params.todoId
  
  }  
  
  // wait = (ms: number) => new Promise(res => setTimeout(res, ms));
  
  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    this.setState({ nam: event.target.value })
    
  }

  handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ dat: event.target.value })
    }

  async componentDidMount() {
    
    console.log('get data from server')
    try {

      // get data from server
      const todos = await getTodos(this.props.auth.getIdToken())
      
      this.setState({
        todos,
        loadingTodos: false
      })
     
  
  
      // await this.wait(1000);
      console.log('init local data')
      // init local data
      this.state.todos.forEach(todo => {
        if(todo.todoId === this.state.todId) {
          this.setState({
            nam: todo.name,
            dat: todo.dueDate,
            don: todo.done
          })
          // check empty done
          console.log(' check empty done', this.state.don)
          if (this.state.don == undefined ) this.setState({ don: false})
          
        }
      })

    } catch (e) {
      alert(`Failed to fetch todos: ${e.message}`)
    }
 
  }
  
  render() {
    


     console.log(' name - ', this.state.nam)
            
    return (
      
     
      <div>
        <h1>Uppate Todo</h1>

        <Form >
          <Form.Field inline>
            <label>Due Date</label>
            <Input 
            type="date" 
            value={this.state.dat}
            placeholder='Due Date' 
            onChange={this.handleDateChange}
            />
          </Form.Field>
          <Form.Field>
          
            <Input
            action={{
              color: 'teal',
              labelPosition: 'left',
              icon: 'add',
              content: 'Update task',
              onClick: this.onTodoUpdate
            }}
            fluid
            actionPosition="left"
            placeholder={this.state.nam}
            onChange={this.handleNameChange}
            value={this.state.nam}
          />
            
          </Form.Field>

         
        </Form>
      </div>
    )
  }
// ---------------


  onTodoUpdate = async (event: React.ChangeEvent<HTMLButtonElement>) => {
    try {

      const updatedTodo = await patchTodo(this.props.auth.getIdToken(), this.state.todId, {
        name: this.state.nam,
        dueDate: this.state.dat,
        done: this.state.don
      })
      // put data to server
      console.log('put data to server')
      this.state.todos.forEach(todo => {
        if(todo.todoId === this.state.todId) {
          name: this.state.nam
          dueDate: this.state.dat
          done: this.state.don
        }
      });
      this.state.nam = ''

      this.props.history.push('/')
    } catch {
      alert('Todo creation failed')
    }
  }
  
}
