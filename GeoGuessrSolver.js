    var gamecode = window.location.pathname;
    gamecode = gamecode.replace("/game/", "/games/");
    var token = gamecode.replace("/games", "");
    token = token.replace("/", "");

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'https://www.geoguessr.com/api/v3'+gamecode, true);
    xmlHttp.send(null);

    xmlHttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200)
      {
        var respuesta = JSON.parse(xmlHttp.responseText);


        var rondacheck = respuesta.round - 1;
        var locationronda = respuesta['rounds'][rondacheck];
        var latitud = locationronda['lat'];
        var longitud = locationronda['lng'];
        var pais = locationronda['countryCode'];

        var xmlHttp2 = new XMLHttpRequest();
        xmlHttp2.open("POST", 'https://www.geoguessr.com/api/v3'+gamecode, true);
        xmlHttp2.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xmlHttp2.send(JSON.stringify({"token": token, "lat": latitud, "lng": longitud, "timedOut": false}));

        xmlHttp2.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200)
          {
              location.reload();
          }
        }
      }
    }