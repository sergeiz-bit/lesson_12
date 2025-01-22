export class CustomerDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static generateHighRiskCustomerDto(): CustomerDto {
    return new CustomerDto(100, 0, 17, true, 1000, 12)
  }

  static generateMediumRiskCustomerDto(): CustomerDto {
    return new CustomerDto(20000, 0, 30, true, 500, 6)
  }

  static generateLowRiskCustomerDto(): CustomerDto {
    return new CustomerDto(20000, 0, 30, true, 500, 12)
  }
}
