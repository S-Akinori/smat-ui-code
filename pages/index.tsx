import { Button } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/templates/Layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layout>
      <div style={{paddingTop: '5rem'}}>
        <h1 className={styles.title}>
          Smart Ui Code
        </h1>
        <div style={{textAlign: 'center', paddingBottom: '3rem'}}>
          HTML, CSSコードを楽々作成
        </div>
        <div style={{textAlign: 'center'}}>
          <Link href="/button"><Button variant='contained'>ボタンを作成</Button></Link>
        </div>
      </div>
    </Layout>
  )
}

export default Home
