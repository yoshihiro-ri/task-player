import React from 'react'
import Head from 'next/head'
import TaskPlayers from '../components/TaskPlayers'
import CompletedTasks from '../components/CompletedTasks'

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>task-player🔥🤓</title>
      </Head>
      <TaskPlayers/>
      <CompletedTasks/>
    </React.Fragment>
  )
}
