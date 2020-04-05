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
 * var journalize = require('journalize');
 * 
 * journalize.naturaltime(new Date(2007, 1, 26, 18, 31, 29), new Date(2007, 1, 17, 16, 30, 0))
 * // returns '1 week, 2 days from now'
 *
 * journalize.naturaltime(new Date(2007, 1, 17, 15, 30, 01))
 * //returns 59 minutes ago

 */

export default function naturaltime(targetTime, timeNow = new Date()) {
  if (targetTime.getTime() === timeNow.getTime()) {
    return `now`;
  }

  let timeAdverb = 'ago';
  if (targetTime > timeNow) {
    timeAdverb = 'from now';
  }

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
  if (timeDiferenceInMinutes === 1) {
    return `a minute ${timeAdverb}`;
  }

  if (timeDiferenceInMinutes === 60) {
    return `an hour ${timeAdverb}`;
  }
  if (timeDiferenceInMinutes < 60) {
    return `${timeDiferenceInMinutes} minutes ${timeAdverb}`;
  }

  let timeDiferenceInHours = Math.floor(timeDiferenceInMinutes / 60);
  let hoursWord = timeDiferenceInHours === 1 ? 'hour' : 'hours';

  if (timeDiferenceInHours < 24) {
    return `${timeDiferenceInHours} ${hoursWord} ${timeAdverb}`;
  }

  let timeDiferenceInDays = Math.floor(timeDiferenceInHours / 24);
  let daysWord = timeDiferenceInDays === 1 ? 'day' : 'days';

  let remainingHours = timeDiferenceInHours - timeDiferenceInDays * 24;

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
}
