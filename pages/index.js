import React from 'react'
import App from './../components/App'
import CommonHead from './../components/CommonHead'


export default class extends React.Component {
  static getInitialProps ({ query: { number, country, home } }) {
    return { number, country, home }
  }

  render () {
    return <div class="container">
      <CommonHead />
      <App home={this.props.home} number={this.props.number} country={this.props.country}/>
    </div>
  }
}
