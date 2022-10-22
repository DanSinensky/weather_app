// variable for api key
const apiKey = "d05a2546f3bf66fa6eb232d95995a8d2"

// variable for base url
const baseURL = "http://api.openweathermap.org/"

// function that does movie search
function weatherSearch(city){
    // constructing url for request
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + apiKey
    // Hardcoded url for London and my api
    // http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d05a2546f3bf66fa6eb232d95995a8d2
    console.log(url)
    
    // make our request
    $.ajax(url)
    .then((data) => {
        console.log(data)
        weather = data
        render()
        },
        (error) => {
            console.log('bad request', error)
        }
    )    
        function render() {

        // render the data
        const $left = $(".left")
        const $main = $("main")
        const $right = $(".right")

        $main.html(
            `<h2>City: ${weather.name}</h2>
            <h3>Current Weather: ${weather.weather[0].description}`)
            // Put both Temperature and Feels Like in one tag with a line break
            //so the second doesn't overwrite the first). Convert to Fahrenheit
        $left.html(`<h3>Temperature: ${Math.floor(((weather.main.temp-273.15)*9/5)+32)} °F
        </br>Feels Like: ${Math.floor(((weather.main.feels_like-273.15)*9/5)+32)} °F</h3>`)
        // Get img based on json info for icon
        $right.html(`<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png">`)
    }

}

//grab the submit button
$("input[type=submit]").on("click", (event) => {

    // prevent the refresh
    event.preventDefault()
    // grab text from input box
    const $inputText = $("input[type=text]").val()
    const $textInput = $("input[type=text]")
    // update the screen
    weatherSearch($inputText)
    // Remove text from input after updating info
    $textInput.val("")
})

weatherSearch("London")