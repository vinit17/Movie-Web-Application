function initialize () {
}  

function sendRequest () {
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "proxy1.php?method=/3/search/movie&query=" + query);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
		  output = document.getElementById("output");   
		for (var i = 0; i < json.results.length; i++) {
			console.log(json.results[i].title);
			output.innerHTML = output.innerHTML += "<br><br><br><a href='#' onclick='movie_details("+json.results[i].id+")'>"+json.results[i].title
			+ "<br><body> Year Released: </body>"+ json.results[i].release_date[0] + json.results[i].release_date[1] + json.results[i].release_date[2] + json.results[i].release_date[3]+"</a>";
		}
	   }
   };
   xhr.send(null);
}

function movie_details(movie_id){
	var details = new XMLHttpRequest();
   details.open("GET", "proxy1.php?method=/3/movie/" + movie_id);
   details.setRequestHeader("Accept","application/json");
   
   details.onreadystatechange = function (){
   if(this.readyState == 4){
	   var json1 = JSON.parse(this.responseText);
	   var str1 = JSON.stringify(json1,undefined,2);
	   
	   movieInfo = document.getElementById("movieInfo");
	   console.log(json1)
		   movieInfo.innerHTML = movieInfo.innerHTML +="<br><br><br><body><b> Movie Title: </b></body>"+json1.original_title + "<br><pre>" +"<b>Release Date: </b>"+ json1.release_date + "<br><img src=https://image.tmdb.org/t/p/w300"+json1.poster_path +"></pre>" + "<br><body><b>Summary: </b></body>" + json1.overview ;
	   crew_details(movie_id)
	   
   }   
   }
   details.send(null);
}

function crew_details(crew1){
	var crew = new XMLHttpRequest();

   crew.open("GET", "proxy1.php?method=/3/movie/" + crew1 + "/credits ");
   crew.setRequestHeader("Accept","application/json");
   
   crew.onreadystatechange = function (){
   
   if(this.readyState == 4){
	   var json2 = JSON.parse(this.responseText);
	   var str2 = JSON.stringify(json2,undefined,2);
	   
	   crewinfo = document.getElementById("movieInfo");
	   console.log(json2)
		   
		crewinfo.innerHTML = crewinfo.innerHTML += "<br><body><b>Starring: </b></body>" + json2.crew[0].name + "<body>, </body>" +  json2.crew[1].name + "<body>, </body>" + json2.crew[2].name + "<body>, </body>" + json2.crew[3].name + "<body>, </body>" + json2.crew[4].name + "";	     
   }
   }
   crew.send(null);
}