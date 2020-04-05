/**
 
 * For datetime values, returns a string representing how many seconds, 
 * minutes, hours, days or weeks ago it was. In case the datetime value is 
 * in the future the return value will automatically use an appropriate 
 * phrase. If the input for the time now is not passes, it will use the 
 * result of `new Date`;.
 * @param  {Date} [date] JavaScript Date object
 * @param  {Date} [date] JavaScript Date object, defaults to current date if
 *                       not passed
 * @return {string}
 * @example
 *
 * TODO examples and test
 */

//export default
function naturaltime(targetTime, timeNow = new Date()) {
  if (targetTime.getTime() === timeNow.getTime()) {
    return `now`;
  }

  let timeAdverb = 'ago';
  if (targetTime > timeNow) {
    timeAdverb = 'from now';
  }

  console.log(timeAdverb);

  console.log(`${timeNow} <== timeNow`);

  console.log(`${targetTime} <== targetTime`);

  console.log(`${targetTime - timeNow} <== targetTime - timeNow`);

  let timeDiffereneInSeconds = Math.floor((targetTime - timeNow) / 1000);

  // we need only magnitude sice we used the sign to calculate adverb
  timeDiffereneInSeconds = Math.abs(timeDiffereneInSeconds);

  if (timeDiffereneInSeconds === 1) {
    return `a second ${timeAdverb}`;
  }
  if (timeDiffereneInSeconds < 60) {
    return `${timeDiffereneInSeconds} seconds ${timeAdverb}`;
  }

  let timeDiferenceInMinutes = Math.floor(timeDiffereneInSeconds / 60);
  console.log(`${timeDiferenceInMinutes} <== timeDiferenceInMinutes`);
  if (timeDiferenceInMinutes === 1) {
    return `a minute ${timeAdverb}`;
  }

  if (timeDiferenceInMinutes === 60) {
    return `an hour ago`;
  }
  if (timeDiferenceInMinutes < 60) {
    return `${timeDiferenceInMinutes} minutes ${timeAdverb}`;
  }

  let timeDiferenceInHours = Math.floor(timeDiferenceInMinutes / 60);
  let hoursWord = timeDiferenceInHours === 1 ? 'hour' : 'hours';

  let remainingMinutes = timeDiferenceInMinutes - timeDiferenceInHours * 60;
  console.log(`${timeDiferenceInHours} <== timeDiferenceInHours`);
  if (timeDiferenceInHours < 24 && remainingMinutes === 0) {
    return `${timeDiferenceInHours} hours ${timeAdverb}`;
  }
  if (timeDiferenceInHours < 24) {
    if (remainingMinutes === 0) {
      return `${timeDiferenceInHours} ${hoursWord} ${timeAdverb}`;
    }

    let remainingMinutesWord = remainingMinutes === 1 ? 'minute' : 'minutes';
    return `${timeDiferenceInHours} ${hoursWord}, ${remainingMinutes} ${remainingMinutesWord} ${timeAdverb}`;
  }

  if (timeDiferenceInHours === 24) {
    return `a day ago`;
  }
  let timeDiferenceInDays = Math.floor(timeDiferenceInHours / 24);
  console.log(`${timeDiferenceInDays} <== timeDiferenceInDays`);
  let daysWord = timeDiferenceInDays === 1 ? 'day' : 'days';

  if (timeDiferenceInDays < 7) {
    if (remainingHours === 0) {
      return `${timeDiferenceInDays} ${daysWord} ${timeAdverb}`;
    }

    let remainingHoursWord = remainingHours === 1 ? 'hour' : 'hours';
    return `${timeDiferenceInDays} ${daysWord}, ${remainingHours} ${remainingHoursWord} ${timeAdverb}`;
  }

  if (timeDiferenceInDays === 7) {
    return `a week ${timeAdverb}`;
  }

  let timeDiferenceInWeeks = Math.floor(timeDiferenceInDays / 7);
  let weeksWords = timeDiferenceInWeeks === 1 ? 'week' : 'weeks';

  let remainingDays = timeDiferenceInDays - timeDiferenceInWeeks * 7;
  if (remainingDays === 0) {
    return `${timeDiferenceInWeeks} ${weeksWords} ${timeAdverb}`;
  }
  let remainingDaysWord = remainingDays === 1 ? 'day' : 'days';
  return `${timeDiferenceInWeeks} ${weeksWords}, ${remainingDays} ${remainingDaysWord} ${timeAdverb}`;

  console.log(`${timeDiferenceInWeeks} <== timeDiferenceInWeeks`);
}

console.log(
  `${naturaltime(
    new Date(2021, 3, 16, 0, 0, 55),
    new Date(2020, 3, 1, 2, 55, 8)
  )} <== natiraltime(new Date(2020, 3, 6))`
);
