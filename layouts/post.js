import React, { Component } from 'react'
import Page from './page'

export default class Post extends Component {
  render() {
    return (
      <Page title={this.props.title}>
        { this.props.children }
        {/* TODO: Social media buttons */}
      </Page>
    )
  }
}
