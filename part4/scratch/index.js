const _ = require('lodash');

const data = [
  {
    beer: 'Helles',
    likes: 20,
  },
  {
    beer: 'Pilsner',
    likes: 8,
  },
  {
    beer: 'IPA',
    likes: 6,
  },
  {
    beer: 'Pilsner',
    likes: 13,
  },
];

const summaryData = [];

data.map((beverage) => {
  const index = summaryData.findIndex(
    (element) => element.beer === beverage.beer
  );
  if (index === -1) {
    summaryData.push(beverage);
  } else {
    summaryData[index].likes += beverage.likes;
  }
});

console.log(summaryData);

const sorted = _.chain(summaryData)
  .sortBy((beverage) => {
    return beverage.likes;
  })
  .reverse()
  .head()
  .value();

console.log(sorted);
