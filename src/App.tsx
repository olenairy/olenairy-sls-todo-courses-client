import React, { Component } from 'react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'

import Auth from './auth/Auth'
import { AddImageTodo } from './components/AddImageTodo'
import { EditTodo } from './components/EditTodo'
import { TodayList } from './components/TodayList'
import { LogIn } from './components/LogIn'
import { NotFound } from './components/NotFound'
import { Todos } from './components/Todos'
import background from "./images/prettytodos.png";



export interface AppProps {}

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  handleLogout() {
    this.props.auth.logout()
  }
// <style>{'body { background: rgb(151 217 190 / 26%)}'}</style>
  render() {
    return (
      <div className="application">
       
       <style>{'body { background: rgb(151 217 190 / 26%)}'}</style>
      
        <Segment vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Router history={this.props.history}>
                  {this.generateMenu()}

                  {this.generateCurrentPage()}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }

  generateMenu() {
    const divStyle = {
      background: `url(${background}) no-repeat center #d7e8e3`,
      
      padding: '10px',
      borderRadius: '.8571429rem'
    };
    return (
      <Menu style={divStyle}>
        <Menu.Item name="home" >
          <Link to="/" color="teal">Home</Link>
        </Menu.Item>

        <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
      </Menu>
    )
  }

  logInLogOutButton() {
 
    if (this.props.auth.isAuthenticated()) {
      return (
        <Menu.Item name="logout" onClick={this.handleLogout} >
          Log Out
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item name="login" onClick={this.handleLogin}>
          Log In
          
        </Menu.Item>
      )
    }
  }

  generateCurrentPage() {
    if (!this.props.auth.isAuthenticated()) {
      
      return <LogIn auth={this.props.auth} />
      
    }

    return (
      <Switch>
        <Route
          path="/"
          exact
          render={props => {
            return <Todos {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/todos/:todoId/edit"
          exact
          render={props => {
            return <AddImageTodo{...props} auth={this.props.auth} />
          }}
        />
        <Route
          path="/todos/:todoId/edittext"
          exact
          render={props => {
            return <EditTodo{...props} auth={this.props.auth} />
          }}
        />
          <Route
          path="/todos/tostart"
          exact
          render={props => {
            return <TodayList{...props} auth={this.props.auth} />
          }}
        />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
