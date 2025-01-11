import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
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
