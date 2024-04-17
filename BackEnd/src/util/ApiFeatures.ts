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
      : {};

    this.query = this.query.find(keyword);
    return this;
  }

  filter(): this {
    const queryStrCopy = { ...this.queryStr };
    const removeFields: string[] = ["keyword", "page", "limit"];
    removeFields.forEach((key: string) => delete queryStrCopy[key]);

    let querystr = JSON.stringify(queryStrCopy).replace(
      /\b(gt|gte|lt|lte)\b/,
      (key) => `$${key}`
    );

    this.query = this.query.find(JSON.parse(querystr));
    return this;
  }

  pagination(resultPerPage: number): this {
    const currentPage: number = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;
