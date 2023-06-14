import React from 'react';
import './globals.css'

import Layout from '@/components/Layout/Layout'
import PageTransition from '@/components/PageTransition/PageTransition'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <PageTransition>
          <Component {...pageProps} />
        </PageTransition>
      </Layout>
    </>
  )
}