import React, {useState, useEffect, useCallback} from 'react';
import {List, Input} from 'antd';
import {OfferItem} from './OfferItem';
import {Link} from 'react-router-dom';
import {offersService} from '../services/offers.service';

const DEFAULT_PAGE_SIZE = 10;
const FIRST_PAGE = 1;
const PAGE_PATH_PARAM = 'page';
const PAGE_SIZE_PATH_PARAM = 'pageSize';
const CATEGORY_PATH_PARAM = 'cat';
const SEARCH_PATH_PARAM = 'query';

const getPathParamsValues = (pathSearchString) => {
  const params = new URLSearchParams(pathSearchString);

  const pathParams = {
    filters: {}
  };

  const categoryPathParamValue = params.get(CATEGORY_PATH_PARAM);
  if (categoryPathParamValue && categoryPathParamValue.length > 0) {
    pathParams.filters.category = categoryPathParamValue;
  }

  const queryPathParamValue = params.get(SEARCH_PATH_PARAM);
  if (queryPathParamValue && queryPathParamValue.length > 0) {
    pathParams.filters.query = queryPathParamValue;
  }

  const pathPageParamValue = parseInt(params.get(PAGE_PATH_PARAM), 10);
  if (!Number.isNaN(pathPageParamValue)) {
    pathParams.page = pathPageParamValue;
  }

  const pathPageSizeParamValue = parseInt(params.get(PAGE_SIZE_PATH_PARAM), 10);
  if (!Number.isNaN(pathPageSizeParamValue)) {
    pathParams.pageSize = pathPageSizeParamValue;
  }

  return {
    page: pathParams.page,
    pageSize: pathParams.pageSize,
    filters: pathParams.filters
  };
};

export function OfferList(props) {
  const [offers, setOffers] = useState([]);
  const [page, setPage] = useState(FIRST_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [filters, setFilters] = useState({});

  const updateState = (values) => {
    if (values.page && values.page !== page) {
      setPage(values.page);
    }

    if (values.pageSize && values.pageSize !== pageSize) {
      setPageSize(values.pageSize);
    }

    if (
      (values.filters.category && // TODO
        values.filters.category !== filters.category) ||
      (values.filters.query && values.filters.query !== filters.query)
    ) {
      const pathFilters = {};
      if (values.filters.category) {
        pathFilters.category = values.filters.category;
      }

      if (values.filters.query) {
        pathFilters.query = values.filters.query;
      }
      setFilters(pathFilters);
    }
  };

  const updatePath = useCallback(() => {
    const buildPath = () => {
      const queryParamsString = buildQueryParams().toString();
      const basePath = '/offers';

      return queryParamsString === ''
        ? basePath
        : `${basePath}?${queryParamsString}`;
    };

    const buildQueryParams = () => {
      const params = new URLSearchParams();

      if (filters.category) {
        params.append(CATEGORY_PATH_PARAM, filters.category);
      }

      if (filters.query) {
        params.append(SEARCH_PATH_PARAM, filters.query);
      }

      if (page !== FIRST_PAGE) {
        params.append(PAGE_PATH_PARAM, page);
      }

      if (pageSize !== DEFAULT_PAGE_SIZE) {
        params.append(PAGE_SIZE_PATH_PARAM, pageSize);
      }

      return params;
    };

    const path = buildPath();
    props.history.push(path);
  }, [props.history, filters.category, filters.query, page, pageSize]);

  const getOffers = async (page, pageSize, filters) => {
    const offers = await offersService.getOffers(page, pageSize, filters);
    setOffers(offers);
  };

  useEffect(() => updateState(getPathParamsValues(props.location.search)), [
    props.location.search
  ]);

  useEffect(() => {
    getOffers(page, pageSize, filters);
    updatePath();
  }, [page, pageSize, filters, updatePath]);

  return (
    <div>
      <div style={{marginBottom: '2em', textAlign: 'center'}}>
        <Input.Search
          placeholder='What are you looking for?'
          onSearch={(value) => setFilters({...filters, query: value})}
          size='large'
          style={{width: '500px'}}
          enterButton
        />
      </div>
      <List
        grid={{gutter: 16, column: 2}}
        dataSource={offers}
        pagination={{
          total: 1000, // TODO when api comes
          showSizeChanger: true,
          showQuickJumper: true,
          defaultPageSize: DEFAULT_PAGE_SIZE,
          pageSize: pageSize,
          current: page,
          showTotal: (total) => `Total ${total} items`,
          onChange: (page) => setPage(page),
          onShowSizeChange: (_, newSize) => setPageSize(newSize)
        }}
        style={{marginLeft: '10%', marginRight: '10%'}}
        renderItem={(item) => (
          <List.Item>
            <Link to={`/offers/${item.id}`}>
              <OfferItem {...item} />
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}
