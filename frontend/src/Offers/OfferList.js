import React from 'react';
import 'antd/dist/antd.css';
import {List} from 'antd';
import {OfferItem} from './OfferItem';
import {Link} from 'react-router-dom';

const tileData = [
  {
    img: 'https://i.picsum.photos/id/0/5616/3744.jpg',
    title: 'Best macbook you can find! Beauty! Buy it now!',
    author: 'jill111',
    id: 1,
    featured: true,
    price: 100.1
  },
  {
    img: 'https://i.picsum.photos/id/10/2500/1667.jpg',
    title: 'Tasty burger',
    author: 'director90',
    id: 2,
    price: 100.1
  },
  {
    img: 'https://i.picsum.photos/id/100/2500/1656.jpg',
    title: 'Camera',
    author: 'Danson67',
    price: 100.1
  },
  {
    img: 'https://i.picsum.photos/id/1002/4312/2868.jpg',
    title: 'Morning',
    author: 'fancycrave1',
    featured: true,
    price: 100.1
  },
  {
    img: 'https://i.picsum.photos/id/1011/5472/3648.jpg',
    title: 'Hats',
    author: 'Hans',
    price: 100.1
  }
];

export function OfferList() {
  return (
    <List
      grid={{gutter: 16, column: 2}}
      dataSource={tileData}
      renderItem={(item) => (
        <List.Item>
          <Link to={`/offers/${item.id}`}>
            <OfferItem {...item} />
          </Link>
        </List.Item>
      )}
    />
  );
}
