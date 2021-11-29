const clients_1 = [25,25,50]
const clients_2 = [25,100]
const clients_3 = [25,25,50,50,100]

const PRICE_TICKET = 25

const BILL_TYPE = {
  25: 'twentyFive',
  50: 'fifty',
  100: 'hundred'
}

class CashBox{
  constructor() {
    this.total = 0;
    this.twentyFive = 0;
    this.fifty = 0;
    this.oneHundred = 0;
  }
  
  addMoney(billType = 25) {
    this[BILL_TYPE[billType]] += 1
    this.total += PRICE_TICKET
  }

  removeMoney(billType) {
    if(this.total >= billType){  
      this[BILL_TYPE[billType]] -= 1
    }
  }

  hasChangeByBillType(billType) {
    return {
      twentyFive: true,
      fifty: () => this.twentyFive >= 1,
      oneHundred: () => (this.fifty >= 1 && this.twentyFive >= 1) || (this.twentyFive >= 3)
      
    }[BILL_TYPE[billType]]
  }
  
  returnChange(billType){
    const necessaryChange = billType - PRICE_TICKET
    let currentChange = 0
    let indexBills = 0
    const properties = Object.keys(BILL_TYPE)
    while(currentChange < necessaryChange) {
      const bill = parseInt(properties[indexBills])
      if(necessaryChange >= bill){
        currentChange += parseInt(properties[indexBills])
        this.removeMoney(parseInt(properties[indexBills]))
      } else {
        indexBills++
      }
    }
  }

  sell(billType){
    this.returnChange(billType)
    this.addMoney(billType)
  }
}

function canSell(clients){
  const cashBox = new CashBox()
  let message= ''
  let indexClient = 0

  while (!message.length && indexClient < clients.length) {
    const client =  clients[indexClient]
    if(cashBox.hasChangeByBillType(client)) { 
      cashBox.sell(client)
    } else {
      message = cashBox.total < (client - PRICE_TICKET) 
        ? `NO. Vania no tendra suficiente dinero para dar ${(client - PRICE_TICKET)} dolares de cambio/vuelto` 
        : `NO. Vania no tendra suficiente dinero para dar cambio/vuelto a los ${client} dólares`
    }
    indexClient++
  }

  return message ? message : 'Si'
}


console.log('client 1', canSell(clients_1)) //?
console.log('client 2', canSell(clients_2)) //?
console.log('client 3', canSell(clients_3)) //?