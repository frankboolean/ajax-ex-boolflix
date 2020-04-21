$(document).ready(function(){

  // funzione del click

  $("button").click(function(){
    $(".container").html("");
    var valoreRicerca = $("input").val();
    console.log(valoreRicerca);

    // ....



  $.ajax({
              url: "https://api.themoviedb.org/3/search/movie",
              method: "GET",
              dataType: "json",
              data: {
                  api_key: "aecc5cd7bf4a2c1736a6c6b92e0a3b8b",
                  language: "it-IT",
                  query: valoreRicerca,
              },
              success: function (data) {
                // handlebars
                var source = $("#entry-template").html();
                var template = Handlebars.compile(source);
                // .............
                console.log(data)
                var risultato= data.results;
                console.log(risultato)
                // ciclo risultati
                for(var i = 0; i < risultato.length; i++){

                  var listaFinale= risultato [i];

                  //
                  var context={
                    title: listaFinale.title,
                    subtitle: listaFinale.original_title,
                    language: listaFinale.original_language,
                    voto: listaFinale.vote_count
                  };
                  // ...
                  var risultatoDaAggiungere = template(context);
                  $(".container").append(risultatoDaAggiungere);
                }

              },
              error: function(richiesta, stato, errori){
              }
              //  fine chiamata


              })



          });
























});
