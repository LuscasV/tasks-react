import { useEffect, useState } from "react"

import {v4 as uuidv4} from 'uuid'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from 'axios'

import TaskDetails from "./components/TaskDetails"
import Tasks from "./components/tasks"
import AddTask from "./components/AddTask";
import Header from "./components/Header";

const App = () => {
  // let message = 'hello world!'
  const [tasks, setTasks] = useState([ //tarefas (tasks)
    {
      id: '1',
      title: 'Estudar Programação',
      completed: false,
    },
    {
      id: '2',
      title: 'Ler livros',
      completed: true,
    }
  ]); //////////////////////////////////////////

  useEffect(() => {   // faz com que quando entrarmos na página já aparecer algumas tarefas
    const fetchTasks = async () => {
      const { data } = await 
      axios.get ('https://jsonplaceholder.cypress.io/todos?_limit=10') // tarefas definidas nessa api
      setTasks(data)
    };
    fetchTasks();
  },[]); //esse array fazio renderiza essa lista de tarefas inicial apenas na primeira vez q a página for recarregada ou carregada

  const handleTaskClick = (taskId) => { //adiciona uma borda verde na task para dizer q foi concluída
    const newTasks = tasks.map(task => {
      if (task.id === taskId) return {...task, completed: !task.completed}

      return task;
    });
    setTasks(newTasks)
  }/////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleTaskAddition = (taskTitle) => {   //adicionando uma task
    const newTasks = [... tasks, {
      title: taskTitle,
      id: uuidv4(),
      completed: false,
    }]
    setTasks(newTasks)
  }

  const handleTaskDeletion = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId)

    setTasks(newTasks)
  }

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <AddTask handleTaskAddition={handleTaskAddition} />
                <Tasks 
                  tasks={tasks} 
                  handleTaskClick={handleTaskClick} 
                  handleTaskDeletion={handleTaskDeletion} 
                />
              </>
            } 
          />
          <Route 
            path="/:taskTitle" 
            element={<TaskDetails />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;