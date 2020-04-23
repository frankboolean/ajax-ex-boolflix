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

                  // milestone 2



                  var votoHtml = Math.ceil((listaFinale.vote_average)/2);


                    var votoStelle = "";
                    for(var i = 0; i < votoHtml; i++){
                        votoStelle += '<i class="fas fa-star"></i>';
                    }
                    for(var j = 0; j < (5 - votoHtml); j++){
                        votoStelle += '<i class="far fa-star"></i>';
                    }





                  //
                  var context={
                    title: listaFinale.title,
                    subtitle: listaFinale.original_title,
                    language: flagGenerator(listaFinale.original_language),
                    voto : votoStelle
                  };


                  // ...
                  var risultatoDaAggiungere = template(context);
                  $(".container").append(risultatoDaAggiungere);
                }

              },
              error: function(richiesta, stato, errori){
              }
            });
              // fine chiamata ajax....

              // chiamata serie tv
  $.ajax({
            url:"https://api.themoviedb.org/3/search/tv",
            method: "GET",
            dataType: "json",
            data: {
                api_key: "aecc5cd7bf4a2c1736a6c6b92e0a3b8b",
                language: "it-IT",
                query: valoreRicerca,
            },
            success: function(data){
              // handlebars
              var source = $("#entry-template").html();
              var template = Handlebars.compile(source);
              console.log(data);
              var risultatoSerie= data.results;
              console.log(risultatoSerie)
              // ciclo risultati
              for(var i = 0; i < risultatoSerie.length; i++){
                var elencoSerie= risultatoSerie[i];

                //  milestone 2 stelle

                var votoSerieHtml = Math.ceil((elencoSerie.vote_average)/2);
                var votoStelleSerie = "";
                for(var i = 0; i < votoSerieHtml; i++){
                    votoStelleSerie += '<i class="fas fa-star"></i>';
                }
                for(var j = 0; j < (5 - votoSerieHtml); j++){
                    votoStelleSerie += '<i class="far fa-star"></i>';
                }



                var contextTv={
                  title: elencoSerie.name,
                  subtitle: elencoSerie.original_name,
                  language: flagGenerator(elencoSerie.original_language),
                  voto: votoStelleSerie
                };

                var finalResult= template(contextTv);
                $(".container").append(finalResult);

              }
            },
            error: function(richiesta, stato, errori){
            }
            //




          });

          // funzione BANDIERE
          function flagGenerator(codice){
            var imgs= ["it","en"];
            var imgGenerata;

            if(imgs.includes(codice)){
              imgGenerata = '<img src"img/' + codice + '.png" alt="immagine" />';
              return imgGenerata;
            }
            return codice;

          }










          });
























});
