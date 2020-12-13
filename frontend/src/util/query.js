const PAGE_NUMBER_PARAM = 'page';
const PAGE_SIZE_LIMIT_PARAM = 'limit';

export const buildQueryUrl = (baseUrl, options) => {
  const url = new URL(baseUrl);

  if (options.page) {
    url.searchParams.append(PAGE_NUMBER_PARAM, options.page);
  }

  if (options.pageSize) {
    url.searchParams.append(PAGE_SIZE_LIMIT_PARAM, options.pageSize);
  }

  if (options.filters) {
    Object.keys(options.filters).forEach((filterName) => {
      if (options.filters[filterName] != null)
        return url.searchParams.append(filterName, options.filters[filterName]);
    });
  }

  return url;
};
