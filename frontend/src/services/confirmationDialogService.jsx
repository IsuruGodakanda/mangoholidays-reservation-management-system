import React from 'react'
import { Prompt } from 'react-router-dom'
import { useSelector } from 'react-redux'

const confirmationDialogService = (ComposedComponent) => {
  const ConfirmationDialogComponent = ({ ...props }) => {
    const global = useSelector((state) => state.global)
    const { confirmationDialogBoxStatus } = global

    return (
      <>
        <Prompt
          when={confirmationDialogBoxStatus}
          message='You haven’t saved your changes. Do you want to leave without saving?'
        />
        <ComposedComponent {...props} />
      </>
    )
  }

  return ConfirmationDialogComponent
}

export default confirmationDialogService
