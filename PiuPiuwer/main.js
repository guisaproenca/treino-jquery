var campo = $(".piu");
var vazio = "";
var numcarac = $(".numcarac")
var botao = $("#envio")
var verif = "0"

function atualizatexto(){
    campo.on("input", function() {
        var text = campo.val();
        var numcar = text.length;
        $(".numcarac").text(numcar);
        
        if (numcar >= 140){
        campo.addClass("errocampo");
        $(".numcarac").addClass("errocont");
        botao.attr("disabled", true);
        $("#msgerro").show();
        }
        
        else if ($(".numcarac") == "0"){
            $("#envio").attr("disabled", true);}

        else {
            campo.attr("disabled", false);
            $("#envio").attr("disabled", false);
            $("#msgerro").hide();
            numcarac.removeClass("errocont");
            campo.removeClass("errocampo");  
        }
    })
};

$(function(){
    atualizatexto();
    
    $.get("http://www.json-generator.com/api/json/get/ceycmRLqWa?indent=2",function(data){
        $(data).each(function(){addPost(this.imagem, this.nome, this.username, this.mensagem);
    });});
    
    campo.val("");
    
    botao.on("click", function() {
        addPost("Imagens/img perf.jpg", "Seu usuário", "@seuusuario", campo.val());
    })

    $(".container2").on("click", function(event){
        var clicado = event.target;
        var div = $(clicado).parent();
        var cont = parseInt(div.find("p.contlike").text())
        var like = $(div.find("img.like"))
        var dislike = $(div.find("img.dislike"))
        console.log(clicado)
        
        if(verif != "1"){ 
            if($(clicado).is("img.like")){
                cont = cont + 1
                div.find("p.contlike").text(cont);
                like.attr("src", "Imagens/likecheio.png")
                verif = "1"
                dislike.attr("src", "Imagens/dislike.png")
            }
        }
        if(verif != "2"){
            if ($(clicado).is("img.dislike")){
                if(cont > 0){
                cont = cont - 1
                div.find("p.contlike").text(cont);
                verif = "2"
                dislike.attr("src", "Imagens/dislikecheio.png")
                like.attr("src", "Imagens/like.png")}}
        }
        
        if ($(clicado).is("img.del")){
            div.remove();
        }

        if($(clicado).is("img.des")){
            $(".container2").prepend(div);
        }
    })
});

function addPost(imagem, nome, username, texto) {
    var post = $("<div>");
    $(".container2").prepend(post);
    post.addClass("post");
    
    if (imagem == ""){
        post.append("<img>");
        var img = post.find("img");
        img.addClass("foto");
        img.attr("src", "Imagens/img perf.jpg");}
    
    else {
        post.append("<img>");
        var img = post.find("img");
        img.addClass("foto");
        img.attr("src", imagem);}
    
    post.append("<h2>");
    var h2 = post.find("h2");
    h2.addClass("usuario");
    h2.text(nome);
   
    post.append("<h3>");
    var h3 = post.find("h3");
    h3.addClass("username");
    h3.text(username);
    
    post.append("<p class='pub'>");
    var p = post.find("p.pub")
    p.text(texto);

    post.append("<img src='Imagens/like.png' class='like' alt='like'>");
    
    post.append("<img src='Imagens/dislike.png' class='dislike' alt='dislike'>");

    post.append("<p class='contlike'>");
    var contlike = post.find("p.contlike")
    contlike.text("0");
    
    post.append("<img src='Imagens/delete.png' class='del' alt='del'>");

    post.append("<img src='Imagens/des.png' class='des' alt='des'>");

    campo.val("");
    $(".numcarac").text("0");

    $("#envio").attr("disabled", true);
};

if (campo.val() == "")
     {$("#envio").attr("disabled", true);}