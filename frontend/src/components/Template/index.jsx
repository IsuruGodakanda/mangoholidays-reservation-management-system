import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from './Footer'
import Header from './Header'
import './index.css'

const Template = (props) => {
  const { children } = props

  return (
    <React.Fragment>
      <Header />
      <main className='py-3'>
        <Container>{children}</Container>
      </main>
      <Footer />
    </React.Fragment>
  )
}

export default Template
