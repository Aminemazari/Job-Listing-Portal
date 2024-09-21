class ApiFeatures {
	constructor(mongooseQuery, queryString) {
		this.mongooseQuery = mongooseQuery;
		this.queryString = queryString;
	}

	filter() {
		const queryStringObj = { ...this.queryString };
		const excludesFields = ["page", "sort", "limit", "fields", "keyword"];
		excludesFields.forEach((field) => delete queryStringObj[field]);
		// Filter the Data (using $gte ,$gt,$lt,$lte) Apply the filtration
		let queryStr = JSON.stringify(queryStringObj);
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
		this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
		return this;
	}

	sort() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(",").join(" ");
			this.mongooseQuery = this.mongooseQuery.sort(sortBy);
		} else {
			this.mongooseQuery = this.mongooseQuery.sort({ createdAt: "desc" });
		}
		return this;
	}

	limitFields() {
		if (this.queryString.fields) {
			const fieldBy = this.queryString.fields.split(",").join(" ");
			this.mongooseQuery = this.mongooseQuery.select(fieldBy);
		} else {
			this.mongooseQuery = this.mongooseQuery.select("-__v");
		}
		return this;
	}

	search() {
		if (this.queryString.keyword) {
			let query = {};
			query.$or = [
				{ title: { $regex: this.queryString.keyword, $options: "i" } },
				{
					jobDescription: { $regex: this.queryString.keyword, $options: "i" },
				},
				{
					tags: { $regex: this.queryString.keyword, $options: "i" },
				},
			];
			this.mongooseQuery = this.mongooseQuery.find(query);
		}

		return this;
	}

	paginate(countDocument) {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 50;
		const skip = (page - 1) * limit;
		const endIndex = page * limit;
		const pagination = {};
		pagination.currentPage = page;
		pagination.limit = limit;
		// The Number of Pages
		pagination.nbrOfPages = Math.ceil(countDocument / limit);
		if (endIndex < countDocument) {
			pagination.next = page + 1;
		}
		if (skip > 0) {
			pagination.prev = page - 1;
		}
		this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
		this.paginationResult = pagination;
		return this;
	}
}

module.exports = ApiFeatures;
