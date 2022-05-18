// ====================================================================================================
// Store global variables

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=adb3778fd2e0ac2318d7ce4ddbc7aea6&units=imperial";

const errorMessage = document.getElementById("error-message");

const countryInput = document.getElementById("country");
const zipInput = document.getElementById("zip");
const feelsInput = document.getElementById("feels");
const generateButton = document.getElementById("generate");

const newDate = new Date();
const date = newDate.toDateString();

const outputPanel = document.getElementById("op-panel");
const outerLoader = document.getElementById("outer-loader");
const innerLoader = document.getElementById("inner-loader");
const outputHolder = document.getElementById("op-holder");
const dateOutput = document.getElementById("date-op");
const countryOutput = document.getElementById("country-op");
const zipOutput = document.getElementById("zip-op");
const nameOutput = document.getElementById("name-op");
const feelsOutput = document.getElementById("feels-op");
const currentTempOutput = document.getElementById("current-temp-op");
const iconOutput = document.getElementById("icon-op");
const descOutput = document.getElementById("desc-op");
const minTempOutput = document.getElementById("min-temp-op");
const maxTempOutput = document.getElementById("max-temp-op");

// ====================================================================================================
// Add event listener and functions to submit button

generateButton.onclick = (e) => {

    e.preventDefault();

    const countryValue = countryInput.value;
    const zipValue = zipInput.value;
    const feelsValue = feelsInput.value;

    const dataPath = `${baseURL}${zipValue},${countryValue}${apiKey}`;

    getData(dataPath)

    .then(data => {

        createData("/create", {

            country: countryValue,
            zip: zipValue,
            name: data.name,
            feels: feelsValue,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            desc: data.weather[0].description,
            mintemp: data.main.temp_min,
            maxtemp: data.main.temp_max

        });

        if (data.cod == 200) {

            requestData("/request");

        };

    });

};

// ====================================================================================================
// Function to get API data

const getData = async (url) => {

    const dataResponse = await fetch(url);

    try {

        const apiData = await dataResponse.json();

        if (apiData.cod == 200) {

            outputPanel.style.display = "unset";

            outputPanel.scrollIntoView({

                behavior: "smooth"

            });

            outerLoader.classList.add("active");
            innerLoader.classList.add("active");
            outputHolder.style.opacity = 0;

            setTimeout(() => {

                outerLoader.classList.remove("active");
                innerLoader.classList.remove("active");
                outputHolder.style.opacity = 1;

            }, 1000);

            return apiData;

        } else {

            errorMessage.classList.add("active");

            setTimeout(() => {

                errorMessage.textContent = "COUNTRY / ZIP CODE NOT FOUND";

            }, 300);

            setTimeout(() => {

                errorMessage.classList.remove("active");
                errorMessage.textContent = "";

            }, 5000);

        };

    } catch(error) {

        console.log("Error:", error);

    };

};

// ====================================================================================================
// Function to create project data

const createData = async (url = "", data = {}) => {

    const dataResponse = await fetch(url, {

        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    });

    try {

        const appData = await dataResponse.json();
        return appData;

    } catch(error) {

        console.log("Error:", error);

    };

};

// ====================================================================================================
// Function to get project data and updating the UI

const requestData = async (url) => {

    const dataResponse = await fetch(url);

    try {

        const appData = await dataResponse.json();

        dateOutput.textContent = date;
        countryOutput.textContent = appData.country;
        zipOutput.textContent = appData.zip;
        nameOutput.textContent = appData.name;
        feelsOutput.textContent = appData.feels == "" ? "..." : appData.feels;
        currentTempOutput.textContent = `${appData.temp} °C`;
        iconOutput.setAttribute("src", `https://openweathermap.org/img/wn/${appData.icon}@2x.png`);
        descOutput.textContent = appData.desc;
        minTempOutput.textContent = `${appData.mintemp} F`;
        maxTempOutput.textContent = `${appData.maxtemp} F`;

    } catch(error) {

        console.log("Error:", error);

    };

};

// ====================================================================================================