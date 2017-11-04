import React from 'react'
import App from './../components/App'
import CommonHead from './../components/CommonHead'


export default class extends React.Component {
  static getInitialProps ({ query: { number, country } }) {
    return { number, country }
  }

  render () {
    return <div class="container">
      <CommonHead />
      <App number={this.props.number} country={this.props.country}/>
    </div>
  }
}
