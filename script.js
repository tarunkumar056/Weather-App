async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '76040f7a78a3b95de22bb5cd544121f6';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const countryNames = {
        IN: "India", US: "United States", GB: "United Kingdom", DE: "Germany",
        FR: "France", JP: "Japan", CN: "China", CA: "Canada", AU: "Australia", IT: "Italy"
    };

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        const countryFull = countryNames[data.sys.country] || data.sys.country;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const weatherData = `
            <p><strong>${data.name}, ${countryFull}</strong></p>
            <img src="${iconUrl}" alt="Weather Icon" />
            <p>🌡️ Temperature: ${data.main.temp} °C</p>
            <p>☁️ Weather: ${data.weather[0].main}</p>
            <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
        `;

        document.getElementById('weatherResult').innerHTML = weatherData;
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}



