import * as React from 'react'
import { Form, Button, Grid, Input} from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { getTodos, patchTodo } from '../api/todos-api'
import { Todo } from '../types/Todo'


interface EditTodoProps {
  match: {
    params: {
      todoId: string
      
    }
  }
  auth: Auth
}
//  name: string dueDate: string  done: boolean
interface tod {
  nam: string
  todId: string
  dat: string
} 
 
interface EditTodoState {
  todos: Todo[]
  loadingTodos: boolean

}
const state2: tod = {
  dat: '',
  nam: '',
  todId: ''

}  

export class EditTodo extends React.PureComponent<EditTodoProps,EditTodoState>  {
  
  state: EditTodoState = {
    todos: [],
    loadingTodos: true
  
  }  
  todoid = this.props.match.params.todoId
  

  wait = (ms: number) => new Promise(res => setTimeout(res, ms));
  
  async handlerSubmit(){
    

    
    try {    
        

      await patchTodo(this.props.auth.getIdToken(), this.todoid, {
        name: state2.nam,
        dueDate: state2.dat,
        done: true 
      })

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
     
        

      this.state.todos.forEach(todo => {
        if(todo.todoId === this.todoid) {
          state2.nam = todo.name;
          state2.dat = todo.dueDate;
        }
      });
  
  
      await this.wait(1000);

    } catch (e) {
      alert(`Failed to fetch todos: ${e.message}`)
    }
 
  }
  
  render() {
    console.log('name', state2.nam)
    console.log('date', state2.dat) 
    return (
      
     
      <div>
        <h1>Uppate Todo</h1>

        <Form >
          <Form.Field>
          <Grid.Row>
                <Grid.Column width={4}   floated="left" verticalAlign="middle">
            <label>Todo Name</label></Grid.Column>
            <Grid.Column width={6}   floated="left" verticalAlign="middle">
              <Input type='text' value={state2.nam} 
              // onChange ={state2.nam} 
              readOnly
              required />
              </Grid.Column>
            <Grid.Column width={4}   floated="left" verticalAlign="middle"><label>Due Date</label></Grid.Column>
            <Grid.Column width={6}   floated="left" verticalAlign="middle">
              <input type='text' value='{this.tod.dat}'
              // onChange ={undefined}  
              readOnly
              required/></Grid.Column>
            <Grid.Column width={12}   floated="left" verticalAlign="middle"><Button type="submit"                     
                    color='teal'
                    style = {{  margin: '1vmin'}}
                    onClick={() => this.handlerSubmit()}
                    >Update Todo</Button></Grid.Column>
            </Grid.Row>
          </Form.Field>

         
        </Form>
      </div>
    )
  }

  
}
