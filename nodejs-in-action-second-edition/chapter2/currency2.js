class Currency {
  constructor (canadianDollar) {
    this.canadianDollar = canadianDollar;
  }

  roundTwoDecimals (amount) {
    return Math.round(amount * 100) / 100;
  }

  canadianToUS (canadian) {
    return this.roundTwoDecimals(canadian * this.canadianDollar);
  }

  USToCanadian (us) {
    return this.roundTwoDecimals(us / this.canadianDollar);
  }
}

module.exports = Currency;