import React, {Component} from 'react'
import { TimePicker, Card, Col } from 'antd'
import moment from 'moment'
import {GiphyAPI} from './apiAdapter'
import './weather-icons.css'

class FiveDay extends Component {
  state={
    format: 'HH',
    gif: ''
  }
  disabledHours = () => {
    console.log(this.props.times);
    return [1, 2, 4, 5, 7, 8, 10, 11]
  }
  componentWillMount () {
    GiphyAPI.getRandGif(this.props.day.main)
      .then( gif => {
        this.setState({gif: gif.data.image_url})
      })
  }
  render () {
    let {day, updateTime} = this.props
    let d = moment(day.dt_txt)
    const cardheading = () => (<div>{d.format('MMM DD')}<TimePicker style={{marginLeft: 50}} defaultValue={moment(d, this.state.format)} use12Hours format='h A' hideDisabledOptions={true} disabledHours={this.disabledHours} onChange={updateTime} /></div>)
    return (
      <Col span={14} offset={4}>
        <Card style={{ width: 300, margin: '8px 0', background: `url(${this.state.gif})`, zIndex: '0', color: 'white' }} title={cardheading()} bordered={false} >
          <img style={{float: 'left'}} src={`http://openweathermap.org/img/w/${day.icon}.png`} />
          <h1 style={{color: 'white'}}>{Math.floor(day.temp)}<sup>˚F</sup></h1>
          <p>{day.description}</p>
        </Card>
      </Col>
    )
  }
}

export default FiveDay
