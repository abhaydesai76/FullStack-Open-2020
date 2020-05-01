import React, { useImperativeHandle } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleVisible } from '../reducers/togglableReducer'
import { Table, Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {

  let visible = ''
  const dispatch = useDispatch()

  const toggleVisibility = () => {
    // setVisible(!visible)
    dispatch(toggleVisible(visible))
  }

  visible = useSelector(state => state.togglable)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Table striped>    
      <div style={hideWhenVisible}>
        <tr><Button onClick={toggleVisibility}>{props.buttonLabel}</Button></tr>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <br />
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>    
    </Table>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable