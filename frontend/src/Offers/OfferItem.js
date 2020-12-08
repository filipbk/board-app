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
          <div className='crop'>
            <img src={props.thumbnail} alt='Offer' />
          </div>
        </Row>
        <Row className='gutter-row' span={4}>
          <Typography.Title className='title' level={4} strong>
            {props.title}
          </Typography.Title>
        </Row>
        <Row className='gutter-row' span={4}>
          <div>
            <span className='price'>{`${props.price.toFixed(2)} zł`}</span>
          </div>
        </Row>
      </Col>
    </Card>
  );
}
