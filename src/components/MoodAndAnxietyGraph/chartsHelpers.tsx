export const scaleValues = [
  {id: 1, label: '1 Week'},
  {id: 2, label: '2 Weeks'},
  {id: 3, label: '1 Month'},
  {
    id: 4,
    label: '2 Months',
  },
  {id: 5, label: '4 Months'},
  {id: 6, label: '8 Months'},
  {id: 7, label: '1 Year'},
  {id: 8, label: 'All'},
];

const getDateXDaysAgo = x => {
  let d = new Date();
  d.setDate(d.getDate() - (x - 1));
  return d;
};

const getDateXMonthsAgo = x => {
  let d = new Date();
  d.setMonth(d.getMonth() - x);
  return d;
};

const getLastXDates = (days, endDate) => {
  const dates = [...Array(days)].map((_, i) => {
    const d = endDate ? new Date(endDate) : new Date();
    d.setDate(d.getDate() - i);
    d.setUTCHours(0, 0, 0, 0);
    return d.toISOString();
  });
  return dates.reverse();
};

//e.g. "2023-03-02T20:16:09.394Z" -> 02-03-2023
//(will make UTC into local)
const isoStringToDate = isoString =>
  new Date(isoString).toLocaleDateString().replaceAll('/', '-');

const getStartDate = (firstTreatmentRecorded, firstScoreRecorded) => {
  let startDate;
  if (firstScoreRecorded < firstTreatmentRecorded)
    startDate = firstScoreRecorded;
  else startDate = firstTreatmentRecorded;

  return startDate;
};

export const getDaysAgo = (today, startDate) => {
  const milliseconds = today - startDate;
  const days = Math.ceil(milliseconds / (1000 * 3600 * 24));
  return days;
};

export const getDataPointsWithinX = (endDate, treatments, data, startDate) => {
  startDate.setHours(0, 0, 0, 0);
  //get the date of the very first mood score WITHIN the last startDate
  let firstScoreRecorded = data.find(
    score => startDate <= new Date(score.dateTime).setHours(0, 0, 0, 0),
  );

  if (!firstScoreRecorded) firstScoreRecorded = startDate;
  else {
    firstScoreRecorded = new Date(firstScoreRecorded.dateTime).setHours(
      0,
      0,
      0,
      0,
    );
  }

  let firstTreatmentRecorded;

  let dateToStart;

  if (!treatments.length) dateToStart = startDate;
  else {
    //get the date of the very first treatment WITHIN the last startDate
    firstTreatmentRecorded = treatments.find(
      treatment =>
        startDate <= new Date(treatment.dateTime).setHours(0, 0, 0, 0),
    );
    if (!firstTreatmentRecorded) dateToStart = startDate;
    else {
      firstTreatmentRecorded = new Date(
        firstTreatmentRecorded.dateTime,
      ).setHours(0, 0, 0, 0);
    }
  }

  if (!dateToStart)
    dateToStart = getStartDate(firstTreatmentRecorded, firstScoreRecorded);

  const days = getDaysAgo(endDate, dateToStart);
  return getLastXDates(days, endDate);
};

export const getVeryFirstDataPoint = (today, treatments, data) => {
  //get the date of the very first mood score
  let firstScoreRecorded = data[0]?.dateTime;

  firstScoreRecorded = new Date(firstScoreRecorded);

  firstScoreRecorded.setHours(0, 0, 0, 0);

  if (!treatments.length) return firstScoreRecorded;

  //get the date of the very first treatment
  let firstTreatmentRecorded = treatments[0]?.dateTime;

  firstTreatmentRecorded = new Date(firstTreatmentRecorded);
  firstTreatmentRecorded.setHours(0, 0, 0, 0);

  const startDate = getStartDate(firstTreatmentRecorded, firstScoreRecorded);

  return startDate;
};

export const calculateTreatmentData = (
  maxValue,
  treatments,
  dates,
  dateIsLessThan,
) => {
  const filterByDateRange = treatments.filter(
    treatment => treatment.dateTime >= dateIsLessThan,
  );

  const array = [];

  dates.forEach(date => {
    let found = false;
    filterByDateRange.forEach(treatment => {
      if (treatment.dateTime === date) {
        found = true;
        treatment.illustrativeValue = maxValue;
        array.push(treatment);
      }
    });
    if (!found) array.push(null);
  });

  return array;
};

export const calculateMoodData = (trackerData, dates, dateIsLessThan) => {
  const filterByDateRange = trackerData.filter(
    moodScore => moodScore.dateTime >= dateIsLessThan,
  );

  const moodScores = [];
  const anxietyScores = [];

  dates.forEach(date => {
    let found = false;
    filterByDateRange.forEach(score => {
      //todo: get rid of date value in moodscores and questionnaire scores - it's confusing
      if (score.date === date.split('T', 1)[0]) {
        found = true;
        anxietyScores.push(score.anxietyScore);
        moodScores.push(score.score);
      }
    });
    if (!found) {
      anxietyScores.push(null);
      moodScores.push(null);
    }
  });

  return [moodScores, anxietyScores];
};

export const onScaleChange = (
  selectedScale,
  today,
  treatments,
  data,
  veryFirstDataPoint,
) => {
  let dates;
  let labels;
  let customOpen;

  if (selectedScale !== 'Custom') customOpen = false;

  if (selectedScale === '1 Week') {
    const twoWeeksAgo = getDateXDaysAgo(7);

    dates = getDataPointsWithinX(today, treatments, data, twoWeeksAgo);
  }
  if (selectedScale === '2 Weeks') {
    const twoWeeksAgo = getDateXDaysAgo(14);

    dates = getDataPointsWithinX(today, treatments, data, twoWeeksAgo);
  }
  if (selectedScale === '1 Month') {
    let oneMonthAgo = getDateXMonthsAgo(1);

    dates = getDataPointsWithinX(today, treatments, data, oneMonthAgo);
  }
  if (selectedScale === '2 Months') {
    let twoMonthsAgo = getDateXMonthsAgo(2);

    dates = getDataPointsWithinX(today, treatments, data, twoMonthsAgo);
  }
  if (selectedScale === '4 Months') {
    let fourMonthsAgo = getDateXMonthsAgo(4);

    dates = getDataPointsWithinX(today, treatments, data, fourMonthsAgo);
  }
  if (selectedScale === '8 Months') {
    let eightMonthsAgo = getDateXMonthsAgo(8);

    dates = getDataPointsWithinX(today, treatments, data, eightMonthsAgo);
  }
  if (selectedScale === '1 Year') {
    let oneYearAgo = new Date();

    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    dates = getDataPointsWithinX(today, treatments, data, oneYearAgo);
  }

  if (selectedScale === 'All') {
    const days = getDaysAgo(today, veryFirstDataPoint);
    dates = getLastXDates(days);
  }

  labels = dates.map(date => isoStringToDate(date));

  return {
    dates,
    labels,
    customOpen,
  };
};
