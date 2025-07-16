import { Menu } from '@mui/icons-material'
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material'
import { AddItemForm } from './AddItemForm'
import './App.css'
import { addTodolistAC } from './state/todolists-reducer'
import { TaskType, Todolist } from './Todolist'

import { useDispatch, useSelector } from 'react-redux'
import { tasksSelector, todolistsSelector } from './state/selectors'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export function App() {
  const todolists = useSelector(todolistsSelector)
  const tasks = useSelector(tasksSelector)

  const dispatch = useDispatch()

  function addTodolist(title: string) {
    dispatch(addTodolistAC(title))
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let allTodolistTasks = tasks[tl.id]
            let tasksForTodolist = allTodolistTasks

            if (tl.filter === 'active') {
              tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === false)
            }
            if (tl.filter === 'completed') {
              tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === true)
            }

            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: '10px' }}>
                  <Todolist id={tl.id} title={tl.title} tasks={tasksForTodolist} filter={tl.filter} />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  )
}
