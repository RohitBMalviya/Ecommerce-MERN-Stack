class ApiFeatures {
  query: any;
  queryStr: any;
  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }
  Search(): this {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i", // -------------> case sensitive
          },
        }
      : { none: "Not Found" };

    this.query = this.query.find(keyword);
    return this;
  }

  filter(): this {
    const queryStrCopy = { ...this.queryStr };
    const removeFields: string[] = ["keyword", "page", "limit"];
    removeFields.forEach((key: string) => delete queryStrCopy[key]);
    this.query = this.query.find(queryStrCopy);
    return this;
  }
}

export default ApiFeatures;
