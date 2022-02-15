export const formatDate = (date) => {
    // Formats date to => 2022-02-12
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    let year = `${d.getFullYear()}`;

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export const getNextSaturdayWeatherAPI = () => {
    // Calculates date for next coming Saturday, returns Sunday if today is Sunday
    const forecast = new Date();
    const day = forecast.getDay();
    const date = forecast.getDate();
    
    // Pull current weather for Sunday
    if (day === 0) 
        return forecast;
    // Pull current weather for Saturday
    else if (day === 6) 
        return forecast;
    // All other days of the week will pull from upcoming Saturday
    else {
        const tilSaturday = 6 - day
        const newDate = date + tilSaturday;
        forecast.setDate(newDate);
        
        const saturdayDate = formatDate(forecast)
        return saturdayDate;
    }
}

export const getNextSaturdayNWS = (data) => {
    const forecast = new Date();
    const day = forecast.getDay();

    // Retrieves upcoming Saturday/Sunday's daytime forecast - 06:00-08:00
    // Return index that matches named forecast for "Saturday" or "Sunday"
    if (day === 0) {
        const forecast = data.findIndex(period => period.name === "Sunday");
        return forecast;
    } else {
        const forecast = data.findIndex(period => period.name === "Saturday");
        return forecast;
    }
}