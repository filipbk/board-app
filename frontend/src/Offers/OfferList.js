import React, {useState, useEffect, useCallback} from 'react';
import {List} from 'antd';
import {OfferItem} from './OfferItem';
import {Link} from 'react-router-dom';
import {offersService} from '../services/offers.service';
import {categoriesService} from '../services';
import {OfferFilters} from './OfferFilters';

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

const filtersChanged = (oldFilters, newFilters) => {
  return (
    (newFilters.category && newFilters.category !== oldFilters.category) ||
    (newFilters.query && newFilters.query !== oldFilters.query)
  );
};

export function OfferList(props) {
  const [offers, setOffers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(FIRST_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [totalOffersCount, setTotalOffersCount] = useState(DEFAULT_PAGE_SIZE);
  const [filters, setFilters] = useState({});

  const updateState = (values) => {
    if (values.page && values.page !== page) {
      setPage(values.page);
    }

    if (values.pageSize && values.pageSize !== pageSize) {
      setPageSize(values.pageSize);
    }

    if (filtersChanged(filters, values.filters)) {
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

      return queryParamsString === '' ? basePath : `${basePath}?${queryParamsString}`;
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
    const queryFilters = {query: filters.query, categoryId: getCategoryIdByName(filters.category)};
    const offersResponse = await offersService.getOffers(page, pageSize, queryFilters);
    setOffers(offersResponse.items);
    setTotalOffersCount(offersResponse.meta.totalItems);
  };

  const getCategories = async () => {
    const categories = await categoriesService.getAllCategories();
    setCategories(categories);
  };

  const onCategoryChange = (newCategory) => {
    setPage(FIRST_PAGE);
    if (newCategory) {
      setFilters({...filters, category: newCategory});
    } else {
      setFilters({...filters, category: null});
    }
  };

  const getCategoryIdByName = (categoryName) =>
    (categories.find((category) => category.name === categoryName) || {}).id;

  const onSearch = (value) => setFilters({...filters, query: value});

  useEffect(() => updateState(getPathParamsValues(props.location.search)), [props.location.search]);

  useEffect(() => {
    getOffers(page, pageSize, filters);
    getCategories();
    updatePath();
  }, [page, pageSize, filters, updatePath]);

  useEffect(() => {
    getOffers(page, pageSize, filters);
  }, [categories]);

  return (
    <div>
      <OfferFilters
        categories={categories}
        onSearch={onSearch}
        onCategoryChange={onCategoryChange}
      />
      <List
        grid={{gutter: 16, column: 2}}
        dataSource={offers}
        pagination={{
          total: totalOffersCount,
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
