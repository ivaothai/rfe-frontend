import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import InfiniteScroll from 'react-infinite-scroller'

import {Loading} from '../bridge'

import Strip from '../components/strip'

import {Row} from 'antd'

const Event = props => {
  const eventID = props.match.params.id

  const [flights, setFlights] = useState([])
  const [more, setMore] = useState(true)

  const loadMoreFlights = page => {
    // TODO: Get flights ID from API with pagination and add into flights
    const maxPage = 5
    const flights = []

    for (let i = 0; i < 30; i++) {
      flights.push(
        Math.random()
          .toString(36)
          .slice(2),
      )
    }

    setFlights(prev => [...prev, ...flights])

    if (page === maxPage) setMore(false)
    else setMore(true)
  }

  return (
    <InfiniteScroll pageStart={0} loadMore={loadMoreFlights} hasMore={more} loader={<Loading key={`loading-bar`} />}>
      <Row gutter={16} type="flex" justify="space-around" align="middle" key="grid-row">
        {flights.map(flight => (
          <Strip key={`${eventID}-strip-${flight}`} eventID={eventID} flightID={flight} />
        ))}
      </Row>
    </InfiniteScroll>
  )
}

export default withRouter(Event)

Event.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
}