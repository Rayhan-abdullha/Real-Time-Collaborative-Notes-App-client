export function formatUpdatedAt(updatedAt: string): string {
    const date = new Date(updatedAt); // Convert ISO string to Date object
    const now = new Date(); // Get the current date and time
  
    const timeDifference = now.getTime() - date.getTime(); // Time difference in milliseconds
    const hoursDiff = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert to hours
  
    if (hoursDiff < 24) {
      // If less than 24 hours, show relative time
      const minutesDiff = Math.floor(timeDifference / (1000 * 60)); // Convert to minutes
      if (hoursDiff > 0) {
        return `${hoursDiff} hours ago`;
      } else {
        return `${minutesDiff} minutes ago`;
      }
    } else {
      // If more than 24 hours, show formatted time and date
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const amPm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format
      const formattedMinutes = minutes.toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
      const year = date.getFullYear();
  
      return `${formattedHours}:${formattedMinutes} ${amPm}, ${day}-${month}-${year}`;
    }
  }
  