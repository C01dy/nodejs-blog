function isObject(value) {
  return !!(
    !Array.isArray(value) &&
    typeof value === "object" &&
    value !== null
  )
}

class ConditionFactory {
  constructor(conditionName, leftOperand, operator, rightOperand) {
    this.conditionName = conditionName
    this.leftOperand = leftOperand
    this.operator = operator
    this.rightOperand = rightOperand
  }

  createSql() {
    // if (typeof rightOperand === "number" && isObject(this.rightOperand)) {
    return ` ${this.conditionName} "${this.leftOperand}" ${this.operator} ${this.rightOperand}`
    // } else {
    // return ` ${this.conditionName} "${this.leftOperand}" ${this.operator} '${this.rightOperand}'`
    // }
  }
}

class Query {
  constructor(table, isSubquery) {
    this.isSubquery = !!isSubquery
    this.table = table
    this.resultSqlConditionsArray = []
    this.conditions = []
    this.cursor = {}
  }

  select(fieldsToSelect) {
    if (fieldsToSelect) {
      let fields = []
      for (let i = 0; i < fieldsToSelect.length; i++) {
        let fieldName = fieldsToSelect[i]
        if (fieldName.includes(".")) {
          let [left, right] = fieldName.split(".")
          left = `"${left}"`
          fields.push(`${left}.${right}`)
        } else {
          fields.push(`"${fieldName}"`)
        }
      }

      this.resultSqlConditionsArray.unshift(
        `SELECT ${fields.join(", ")} FROM "${this.table}"`
      )
    } else {
      this.resultSqlConditionsArray.unshift(`SELECT * FROM "${this.table}"`)
    }

    return this
  }

  where(leftOperand, operator, rightOperand) {
    this.resultSqlConditionsArray.push(
      new ConditionFactory(
        "WHERE",
        leftOperand,
        operator,
        rightOperand
      ).createSql()
    )
    return this
  }

  andWhere(leftOperand, operator, rightOperand) {
    this.resultSqlConditionsArray.push(
      new ConditionFactory(
        "AND",
        leftOperand,
        operator,
        rightOperand
      ).createSql()
    )
    return this
  }

  orWhere(leftOperand, operator, rightOperand) {
    this.resultSqlConditionsArray.push(
      new ConditionFactory(
        "OR",
        leftOperand,
        operator,
        rightOperand
      ).createSql()
    )
    return this
  }

  toString() {
    if (this.isSubquery) return `(${this.resultSqlConditionsArray.join("")})`
    return this.resultSqlConditionsArray.join("")
  }

  // TODO: join method

  // TODO: run query logic
  exec() {
    return this.resultSqlConditionsArray
  }
}

