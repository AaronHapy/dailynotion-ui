export function formatNumber (views) {

    const formatNumber = (n, divisor, suffix) => {
        const number = n / divisor;

        // Check if the number is an integer and format accordingly
        return number % 1 === 0 ? number + suffix : number.toFixed(1) + suffix;
    }

    if (views < 1000) {
        return views.toString();
    } else if (views < 1000000) {
        return formatNumber(views, 1000, 'K'); // Thousands
    } else if (views < 1000000000) {
        return formatNumber(views, 1000000, 'M'); // Millions
    } else {
        return formatNumber(views, 1000000000, 'B'); // Billions
    }
}

export function timeAgo(dateStr) {
    const date = new Date(dateStr);
    const now = new Date('2024-06-09T00:00:00');
    const diffInSeconds = Math.floor((now - date) / 1000);
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
  
    if (diffInSeconds < minute) {
      return 'less than a minute ago';
    } else if (diffInSeconds < hour) {
      return `${Math.floor(diffInSeconds / minute)} minute(s) ago`;
    } else if (diffInSeconds < day) {
      return `${Math.floor(diffInSeconds / hour)} hour(s) ago`;
    } else if (diffInSeconds < week) {
      return `${Math.floor(diffInSeconds / day)} day(s) ago`;
    } else if (diffInSeconds < week * 4) { 
      return `${Math.floor(diffInSeconds / week)} week(s) ago`;
    } else if (diffInSeconds < day * 365) {
      return `${Math.floor(diffInSeconds / (week * 4))} month(s) ago`;
    } else {
      return `${Math.floor(diffInSeconds / (day * 365))} year(s) ago`;
    }
}