export class OrderDto {
  status: string | undefined
  courierId: number | undefined
  customerName: string | undefined
  customerPhone: string | undefined
  comment: string | undefined
  id: number | undefined

  constructor(
    status: string | undefined,
    courierId: number,
    customerName: string,
    customerPhone: string,
    comment: string,
    id: number,
  ) {
    this.status = status
    this.courierId = courierId
    this.customerName = customerName
    this.customerPhone = customerPhone
    this.comment = comment
    this.id = id
  }

  static generateRandomOrderDto(): OrderDto {
    return new OrderDto(
      'OPEN',
      +Math.floor(Math.random()),
      'David',
      '4852345235',
      'no comment',
      +Math.floor(Math.random()),
    )
  }

  static generateOrderDtoWithoutStatus(): OrderDto {
    return new OrderDto(
      undefined,
      +Math.floor(Math.random()),
      'David',
      '4852345235',
      'no comment',
      +Math.floor(Math.random()),
    )
  }

  static generateEmptyOrderDto(): any {
    return {}
  }

  static serializeResponse(json: any): OrderDto {
    return new OrderDto(
      json.status,
      json.courierId,
      json.customerName,
      json.customerPhone,
      json.comment,
      json.id
    )
  }
}