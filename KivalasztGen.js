var Indulhat = false;
function AlapKiGen(){
    let Jatekter = document.createElement("div");
    Jatekter.id = "Jatekter";
    document.body.appendChild(Jatekter);
}

function JatekosKivalaszt(){
    let KivalasztDiv = document.createElement("div");
    KivalasztDiv.id = "KivalasztDiv";
    KivalasztDiv.style.height = "auto";
    KivalasztDiv.style.width = "fit-content";
    KivalasztDiv.style.margin = "auto";
    KivalasztDiv.style.display = "flex";
    KivalasztDiv.style.borderRadius = "10px";
    document.getElementById("Jatekter").appendChild(KivalasztDiv);
    let BotokEllen = document.createElement("div");
    BotokEllen.id = "BotokEllen";
    BotokEllen.innerHTML = "<p id = BelsoText>Botok Ellen</p>";
    BotokEllen.dataset.value = "Botok Ellen";
    BotokEllen.setAttribute("onclick","RaKatt(this)");
    document.getElementById("KivalasztDiv").appendChild(BotokEllen);
    let JatekosEllen = document.createElement("div");
    JatekosEllen.id = "JatekosEllen";
    JatekosEllen.dataset.value = "Játékos Ellen";
    JatekosEllen.innerHTML = "<p id = BelsoText>Játékos Ellen</p>";
    JatekosEllen.setAttribute("onclick","RaKatt(this)");
    document.getElementById("KivalasztDiv").appendChild(JatekosEllen);
    let GombDiv = document.createElement("div");
    GombDiv.style.width = "100%";
    GombDiv.id = "GombDiv";
    document.body.appendChild(GombDiv);
    let gomb = document.createElement("input");
    gomb.type = "button";
    gomb.value = "Indítás";
    gomb.style.width = "180px";
    gomb.style.height = "40px";
    gomb.style.borderRadius = "10px";
    gomb.id = "Gomb";
    GombDiv.appendChild(gomb);
}

function RaKatt(div){
    div.classList = "Kivalasztva";
    if(div.dataset.value == "Botok Ellen"){
        document.getElementById("JatekKiGenScript").src = "BotokEllen.js";
        let elemt = document.getElementById("JatekosEllen");
        elemt.classList.remove("Kivalasztva");
    }
    else if(div.dataset.value == "Játékos Ellen"){
        document.getElementById("JatekKiGenScript").src = "JatekosEllen.js";
        let elemt = document.getElementById("BotokEllen");
        elemt.classList.remove("Kivalasztva");
    }
    document.getElementById("Gomb").setAttribute("onclick","Inditas()");
    document.getElementById("Gomb").id ="KivalasztottGomb";
    Indulhat = true;
}

function Inditas(){
    if(Indulhat){
        document.body.removeChild(document.getElementById("Jatekter"));
        document.body.removeChild(document.getElementById("GombDiv"));
        //TablaKiGen();
    }
}

function Main(){
    AlapKiGen();
    JatekosKivalaszt();
}
Main();