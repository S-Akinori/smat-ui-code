import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect } from "react"
import Header from "../../organisms/Header"
import styles from "./index.module.css"

interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div className={styles.body}>
      <Head>
        <title>Smart UI Code</title>
        <meta name="description" content="Smart UI Code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Layout