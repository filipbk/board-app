import React from 'react';
import {Card, Row, Col, Typography} from 'antd';
import './OfferItem.css';

export function OfferItem(props) {
  return (
    <Card>
      <Col
        gutter={{xs: 8, sm: 16, md: 24, lg: 32}}
        flex={5}
        justify='space-between'
      >
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
              src={props.thumbnail}
              alt='Offer'
              style={{height: 'auto', width: '100%'}}
            />
          </div>
        </Row>
        <Row className='gutter-row' span={4}>
          <Typography.Title
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
            <span style={{fontWeight: 'bold'}}>{`${props.price.toFixed(
              2
            )} zł`}</span>
          </div>
        </Row>
      </Col>
    </Card>
  );
}
