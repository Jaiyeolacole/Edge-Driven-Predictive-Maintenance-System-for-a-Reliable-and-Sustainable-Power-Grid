const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  const timeOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  const timeStr = date.toLocaleTimeString(undefined, timeOptions);
  const dateStr = date.toLocaleDateString(undefined, dateOptions);
  
  return `${timeStr}, ${dateStr}`;
};
export { formatDate };