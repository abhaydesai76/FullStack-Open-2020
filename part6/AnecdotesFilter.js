import React from 'react'
import { filterChange } from '../reducers/filterReducer'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const AnecdotesFilter = (props) => {  

    // const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        props.filterChange(event.target.value)
        // dispatch(filterChange(event.target.value))
    }

    const style = {
        marginBottom: 10
    }    

    return (
        <div style={style}>
          filter <input onChange={handleChange} />
        </div>
      )
}

const mapDispatchToProps = {
  filterChange
}

// export default AnecdotesFilter
export default connect(null, mapDispatchToProps) (AnecdotesFilter)