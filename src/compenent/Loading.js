import React, { Component } from 'react'
import spinner from './ZKZg.gif'

export default class Loading extends Component {
  render() {
    return (
<div className='text-center'>
  <img src={spinner} alt="" style={{ width: "30px", height: "30px" }} />
</div>
    )
  }
}
