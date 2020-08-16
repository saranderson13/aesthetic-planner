// import React from 'react'

const formatDate = dateObj => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    
    return !!dateObj ? `${weekDays[dateObj.getUTCDay()]}, ${months[dateObj.getUTCMonth()]} ${dateObj.getUTCDate()}, ${dateObj.getUTCFullYear()}` : null
}

export { formatDate }