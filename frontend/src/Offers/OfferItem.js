import React from 'react';
import {Card, Row, Col, Typography} from 'antd';
import './OfferItem.css';

export function OfferItem(props) {
  const url = process.env.REACT_APP_API_URL;

  const getFormattedPrice = (price) => {
    if (price) {
      return `${price.toFixed(2)} zł`;
    }

    return 'FREE';
  };

  return (
    <Card>
      <Col gutter={{xs: 8, sm: 16, md: 24, lg: 32}} flex={5} justify='space-between'>
        <Row className='gutter-row' span={4}>
          <div
            style={{
              margin: 'auto',
              height: '300px',
              width: '400px',
              overflow: 'hidden'
            }}
          >
            <img
              id={`offer-${props.id}-thumbnail`}
              src={`${url}/offers/photo/${props.image}`}
              alt='Offer'
              style={{height: 'auto', width: '100%'}}
            />
          </div>
        </Row>
        <Row className='gutter-row' span={4}>
          <Typography.Title
            id={`offer-${props.id}-title`}
            className='title'
            level={4}
            strong
            style={{
              marginTop: '1em',
              overflow: 'hidden',
              maxWidth: '40ch',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical'
            }}
          >
            {props.title}
          </Typography.Title>
        </Row>
        <Row className='gutter-row' span={4}>
          <div>
            <span id={`offer-${props.id}-price`} style={{fontWeight: 'bold'}}>
              {getFormattedPrice(props.money)}
            </span>
          </div>
        </Row>
      </Col>
    </Card>
  );
}
