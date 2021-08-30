import Loader from 'components/Loader'
import React from 'react'
import { useSelector } from 'react-redux'

const LoaderService = (ComposedComponent) => {
  const LoaderComponent = ({ ...props }) => {
    const global = useSelector((state) => state.global)
    const { loading } = global

    return (
      <>
        {loading && <Loader />}
        <ComposedComponent {...props} />
      </>
    )
  }

  return LoaderComponent
}

export default LoaderService
