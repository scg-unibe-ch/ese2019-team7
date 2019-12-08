
/*
Please don't change anything here, as this will break many tests that depend on this data. If you need to add / remove
entities for your specific tests, do this in a more specialised location.
 */

exports.users = [{
  name: 'hans',
  password: '123',
  eMail: 'example@example.com',
  address: 'Viktoriaplatz 12, 3013 Bern',
  phone: '0313333333'
}, {
  name: 'ueli',
  password: 'ThisIsVerySecret',
  eMail: 'ueli.mueller@schwyz.ch',
  address: 'Schwyzerstrasse 12, 6543 Schwyz',
  phone: '0788888888'
}];

// All offers belong to hans, id 1
exports.offers = [{
  title: "Best Italian Food",
  description: "I am the best italian cook",
  price: "10000",
  public: true,
  category: "catering",
  dateFrom: undefined,
  dateTo: undefined
}, {
  title: "Best Swiss Food",
  description: "I am the best swiss cook",
  price: "100",
  public: true,
  category: "catering",
  dateFrom: undefined,
  dateTo: undefined
}, {
  title: 'Awful swiss house',
  description: 'The cheapest swiss house you can find in bern.',
  price: '5',
  public: true,
  category: 'location',
  dateFrom: undefined,
  dateTo: undefined
}, {
  title: 'A cool catering offer',
  description: 'This is a new cool catering offer',
  price: '20',
  public: false,
  category: 'catering',
  dateFrom: undefined,
  dateTo: undefined
}];
