import React, { Component } from 'react'
import Button from 'components/FormFields/Button'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  onClickHandle = () => {
    window.location.reload()
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      return (
        <div className='center'>
          <div className='page-wrap d-flex flex-row align-items-center'>
            <div className='container'>
              <div className='row justify-content-center'>
                <div className='col-md-12 text-center'>
                  <span className='display-1 d-block'>Whoops!</span>
                  <div className='mb-4 lead'>Something broke. Hmmm... Don't worry, it wasn't you.</div>
                  <Button
                    type='button'
                    onClick={this.onClickHandle}
                    className='btn btn-light'
                    value="Let's try again"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary
