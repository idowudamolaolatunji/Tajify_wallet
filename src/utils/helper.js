import moment from 'moment';


// CURRENCY CONVERTER / HELPER FORMATTER
export function currencyConverter (amount) {
    return Number(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function numberConverter (amount) {
    return Number(amount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
 

// DATE CONVERTER HELPER FUNCTION
export function dateConverter(givenDate) {
    const currentDate = moment().startOf('day');
    const inputDate = moment(givenDate);

    const diffInSeconds = moment().diff(inputDate, 'seconds');
    if (diffInSeconds < 60) {
        // return `${diffInSeconds} seconds ago`;
        return 'Just now';
    }

    const diffInMins = moment().diff(inputDate, 'minutes');
    if (diffInMins < 60) {
        return `${diffInMins} minute ago`;
    }
  
    if (inputDate.isSame(currentDate, 'day')) {
      return `Today, ${inputDate.format('h:mm A')}`; 
    } else if (inputDate.isSame(currentDate.clone().subtract(1, 'day'), 'day')) {
        return `Yesterday, ${inputDate.format('h:mm A')}`;
    } else if (inputDate.isSame(currentDate.clone().subtract(2, 'day'), 'day')) {
        return `Two days ago, ${inputDate.format('h:mm A')}`;
    } else {
      return inputDate.format('MMM Do YYYY, h:mm A');
    }
}