const expenses = {
  "2023-01": {
    "01": {food: [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19], fuel: [210.22]},
    "09": {food: [11.9], fuel: [190.22]},
  },
  "2023-03": {
    "07": {food: [20, 11.9, 30.2, 11.9]},
    "04": {food: [10.2, 11.5, 2.5], fuel: []},
  },
  "2023-04": {},
};

const daysInWeek = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const formattingDays = (days) => {
  const formattedDays = [];
  for (let i = 1; i <= days; i++) {
    formattedDays.push(i < 10 ? `0${i}` : `${i}`);
  }
  return formattedDays;
};

const logDayMessage = (dayOfWeek, dayName) => {
  console.log(`Your first day of the month is : ${dayName}`);
  console.log(
    `It is the ${
      dayOfWeek === 0
        ? `Last day of the week`
        : `${dayOfWeek}rd day of the week`
    }`
  );
};

const calculateDayOfWeek = (year, month) => {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  const dayName = daysInWeek[dayOfWeek];
  return {dayOfWeek, dayName};
};

const calculateDaysUntilFirstSunday = (dayOfWeek) => {
  const includingSunday = 1;
  const daysUntilFirstSunday = ((7 - dayOfWeek) % 7) + includingSunday;
  return formattingDays(daysUntilFirstSunday);
};
const getDaysUntilFirstSunday = (year, month) => {
  const {dayOfWeek, dayName} = calculateDayOfWeek(year, month);
  const formattingDays = calculateDaysUntilFirstSunday(dayOfWeek);
  logDayMessage(dayOfWeek, dayName);
  return formattingDays;
};

const getCorrectformatDate = (date) => {
  const res = date.split("-");
  const year = Number(res[0]);
  const month = Number(res[1].split("0")[1]);
  return {year, month};
};

const prepareDataToCalculate = (expenses, matchingDays) => {
  const {food, fuel} = expenses[matchingDays] || {};
  const concatedValues = food.concat(fuel);
  return [...concatedValues].sort((a, b) => a - b);
};

const calculatMediana = (sortedValues) => {
  const middle = Math.floor(sortedValues.length / 2);
  if (sortedValues.length % 2 === 0) {
    return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
  }
  return sortedValues[middle];
};

const displayDaysUntilFirstSunday = (date) => {
  const {year, month} = getCorrectformatDate(date);
  const days = getDaysUntilFirstSunday(year, month);
  console.log(
    `Days up to and including the first Sunday: ${year}-${month}: ${days.join(
      ", "
    )}`
  );
  return days;
};

const agregateAllData = (expensesData) => {
  return expensesData
    .map((data) => {
      const date = data[0];
      const expenses = data[1];
      if (!Object.keys(expenses).length) return null;
      const daysUntilFirstSunday = displayDaysUntilFirstSunday(date);
      const matchingDays = daysUntilFirstSunday.filter((day) => expenses[day]);
      console.log(`Your days meeting the condition: ${matchingDays}`);
      const preparedData = prepareDataToCalculate(expenses, matchingDays);
      console.log("---------------------------------");
      return calculatMediana(preparedData);
    })
    .filter((median) => median);
};

const calculateFinallMediana = (medians) => {
  const res = medians.sort((a, b) => a - b);
  return calculatMediana(res);
};

const expensesData = Object.entries(expenses);
const allMedians = agregateAllData(expensesData);
const finalMedian = calculateFinallMediana(allMedians);

console.log("Medians from all months", allMedians);
console.log("Final Median", finalMedian);
