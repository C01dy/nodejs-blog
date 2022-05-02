function isObject(value) {
  return !!(
    !Array.isArray(value) &&
    typeof value === "object" &&
    value !== null
  )
}

class Query {
  constructor(table) {
    this.table = table
    this.resultSqlString = ``
    this.conditions = []
    this.comprasionOperators = ["<", ">", "<=", ">=", "=", "<>", "!="]
  }

  select(fieldsToSelect) {
    let fields = [] || ["*"]
    for (let i = 0; i < fieldsToSelect.length; i++) {
      let fieldName = fieldsToSelect[i]
      fields.push(`"${fieldName}"`)
    }

    this.resultSqlString += `SELECT ${fields.join(", ")} FROM "${this.table}"`

    return this
  }

  where(...args) {
    if (args.length === 3 && this.comprasionOperators.includes(args[1])) {
      const [propKey, operator, propValue] = args

      if (typeof propValue === "number") {
        this.resultSqlString += ` WHERE "${propKey}" ${operator} ${propValue}`
      } else {
        this.resultSqlString += ` WHERE "${propKey}" ${operator} '${propValue}'`
      }

      return this
    } else if (args.length === 1 && isObject(args[0])) {
      // TODO: logic if is object of conditions
      return
    }
  }

  // TODO: join method

  exec() {
    return this
  }
}

const productTable = new Query("user")

console.log(
  productTable
    .select(["first_name", "last_name"])
    .where("first_name", "=", "Joe")
    .exec()
)
