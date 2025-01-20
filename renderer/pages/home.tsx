import React from 'react'
import Head from 'next/head'
import TaskPlayers from '../components/TaskPlayers'

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>task-player🔥🤓</title>
      </Head>
      <TaskPlayers/>
    </React.Fragment>
  )
}
