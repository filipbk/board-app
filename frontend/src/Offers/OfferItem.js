import React from 'react';
import {Card, Row, Col, Typography} from 'antd';
import './OfferItem.css';

export function OfferItem(props) {
  return (
    <Card>
      <Col gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
        <Row className='gutter-row' span={4}>
          <img className='photo' src={props.img} alt='Offer' />
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
