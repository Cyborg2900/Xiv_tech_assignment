
let weather_json='';
let cit_name="Delhi"
// fetching the data from the server and handling the response
async function getData(city){
    console.log("inside get data ");
    let cities=[]; // since the api call takes an array we have to modify this to get an array 
    cities.push(city)
    fetch("http://localhost:5005/getWeather", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "cities":cities
        })
      }
    ).then((response)=>{
        console.log(response);
        return response.json();
    }).then((data)=>{
        //console.log("second promise");
        //console.log(data);
        document.getElementById("city").innerHTML="Weather in "+city;
        if(data[city]!='error occured'){
            document.getElementById("temp").innerHTML="  "+data[city];
        }else{
            document.getElementById("temp").innerHTML="could not fetch the data of this city";
        }
        return data;
    }).catch((error)=>{
        console.log(error);
    })


}
// onclick handler function that calls the fectch function
async function get_Weather(){

    console.log("inside get weather");
    cit_name=document.getElementById("search_bar_id").value;
    if(cit_name=="")
        cit_name="Delhi";

    await getData(cit_name);
}

// setting up this function to display the default temprature 
async function default_func(){
    await getData("Delhi");
}


default_func();


