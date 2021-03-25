import * as React from 'react'
import { Icon, Button, Grid, Input, Divider, Message, Form} from 'semantic-ui-react'
import Auth from '../auth/Auth'
import { getTodayTodos, sendEmail } from '../api/todos-api'
import { Todo } from '../types/Todo'
import { History } from 'history'


interface TodayListProps {
 
  auth: Auth
  history: History
}
 
interface TodayListState {
  todos: Todo[]
  loadingTodos: boolean
  emai: string
  nam: string
  header: string
  contmes: string

}

export class TodayList extends React.PureComponent<TodayListProps,TodayListState>  {
  
  state: TodayListState = {
    todos:[],
    loadingTodos: true,
    emai: '',
    nam: 'Ptetty ToDos App',
    header: '',
    contmes: 'Type your email for send Today ToDos List to yours email \n (! Unfortunatly for Free Tier AWS you can type only this email: olenairy@gmail.com)'

  }  
  
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ emai: event.target.value })
  }
  async componentDidMount() {
    
    console.log('get data from server')
    try {
      // get data from server
      const todos = await getTodayTodos(this.props.auth.getIdToken())
      
      this.setState({
        todos,
        loadingTodos: false
      })
      // await this.wait(1000);
      console.log('init local data')

    } catch (e) {
      alert(`Failed to fetch todos: ${e.message}`)
    }
 
  }
  
  render() {

    return (
      
      <div>
        <h1>Your Todays ToDos</h1>
        <Grid.Column width={16}>
        <Message
      success
      header= {this.state.header}
      content={this.state.contmes}
  //    header='Succsess!'
  //    contmes="Today ToDos List sent"
    />

<Input
            action={{
              color: 'orange',
              labelPosition: 'left',
              icon: 'arrow circle right',
              content: 'Email me',
              onClick: this.onEmail
              
            }}
            fluid
            actionPosition="left"
            placeholder='olenairy@gmail.com'
            onChange={this.handleChange} 
            
          />
      </Grid.Column>
      
      
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
        <div>
        <Grid padded>
        {this.state.todos.map((todo, pos) => {
          
          return (
            
            
              <Grid.Row key={todo.todoId} style = {{background: todo.done ? 'rgb(135 236 186)' : 'rgb(207 230 218)' , border: '4px solid #d7e8e3', borderRadius: '0.857143rem', margin: '1px'}}>
                <Grid.Column width={4} floated="left">
                  {todo.dueDate}
                </Grid.Column>
                <Grid.Column width={12}  floated="left" stretched verticalAlign="middle">
                  <h3>{todo.name}</h3>
                </Grid.Column>
              </Grid.Row>
            
          )
        })}
      </Grid></div>

        
      </div>
    )
  }
 // ---------------
  onEmail = async () => {
    try {
      console.log('start invoke Lambda for send email')
      // put data to server
      await sendEmail(this.props.auth.getIdToken(), {
        name: this.state.nam,
        email: this.state.emai
      })
      console.log('finish invoke Lambda for send email')
      this.state.header = 'Succsess!'
      this.state.contmes = 'Your today ToDos List sent'
     // this.props.history.push('/ ')

    } catch {
      //alert('Email send failed')
      this.state.header = 'Something wrong:'
      this.state.contmes = 'Your today ToDos List wasn\'t sent. (for Free Tier AWS you can type only this email: olenairy@gmail.com)'
    }
  }
  
}
