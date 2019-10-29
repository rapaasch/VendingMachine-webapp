$(document).ready(function () {
    $("#pageContent").load("home.html #mainInfoDiv");

    $("#akronButton").on("click", function(){
      $("#akronInfoDiv").show();
      $("#akronWeather").hide();
    })

    $("#akronWeatherButton").on("click", function(){
      $("#akronWeather").toggle();
    })
    $("#minneapolisButton").on("click", function(){
      $("#minneapolisInfoDiv").show();
      $("#minneapolisWeather").hide();
    })

    $("#minneapolisWeatherButton").on("click", function(){
      $("#minneapolisWeather").toggle();
    })

    $("#louisvilleButton").on("click", function(){
      $("#louisvilleInfoDiv").show();
      $("#louisvilleWeather").hide();
    })

    $("#louisvilleWeatherButton").on("click",function(){
      $("#louisvilleWeather").toggle();
    })

    $(fr)
});
