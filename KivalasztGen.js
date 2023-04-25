var Leteve = false;
var CoinErtek = 0;
var Lefutott = false;

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
    BotokEllen.classList = "KivalasztotDesign";
    BotokEllen.setAttribute("onclick","RaKatt(this)");
    document.getElementById("KivalasztDiv").appendChild(BotokEllen);
    let JatekosEllen = document.createElement("div");
    JatekosEllen.id = "JatekosEllen";
    JatekosEllen.dataset.value = "Játékos Ellen";
    JatekosEllen.classList = "KivalasztotDesign";
    JatekosEllen.innerHTML = "<p id = BelsoText>Játékos Ellen</p>";
    JatekosEllen.setAttribute("onclick","RaKatt(this)");
    document.getElementById("KivalasztDiv").appendChild(JatekosEllen);
}

function ErtekKivalasztas(){
    let ErtekDivTer = document.createElement("div");
    ErtekDivTer.id = "ErtekDivTer";
    ErtekDivTer.innerHTML = "<p>Válassz kezdő értéket!</p>"
    document.body.appendChild(ErtekDivTer);
    ertekek = [50,100,250,500,1000,2500,5000];
    for(let i = 0; i < 7;i++){
        let div = document.createElement("div");
        div.classList = "BelsoDivek";
        div.dataset.ertek = ertekek[i];
        div.innerHTML = "<p>"+ertekek[i]+"</p>";
        div.id = "BDiv"+i;
        div.setAttribute("onclick","ErtekKivalasztva(this)");
        ErtekDivTer.appendChild(div);
    }
}

function ErtekKivalasztva(div){
    div.classList += " Kivalasztva";
    CoinErtek = div.dataset.ertek;
    for(let i = 0; i < document.getElementsByClassName("BelsoDivek").length;i++){
        if("BDiv"+i != div.id){
            document.getElementById("BDiv"+i).classList = "BelsoDivek";
        }
    }
    if(Lefutott == false){
        document.getElementById("Gomb").setAttribute("onclick","Inditas()");
        document.getElementById("Gomb").id ="KivalasztottGomb";
        Lefutott = true
    }
}
function GombLeterhoz(){
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
    div.classList += " Kivalasztva";
    if(Leteve == false){
        ErtekKivalasztas();
        GombLeterhoz();
        Leteve = true;
    }
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
    Indulhat = true;
}

function Inditas(){
    if(Indulhat){
        document.body.removeChild(document.getElementById("Jatekter"));
        document.body.removeChild(document.getElementById("GombDiv"));
        document.body.removeChild(document.getElementById("ErtekDivTer"));
        TablaKiGen();
    }
}

function TablaKiGen(){
    ChipsTabla();
}

function ChipsTabla(){
    let Tabla = document.createElement("div");
    Tabla.id = "ChipTabla";
    document.body.appendChild(Tabla);
    let TablaNev = document.createElement("div");
    TablaNev.id = "ChipTablaNev";
    TablaNev.innerHTML = "<p>Chips</p>";
    TablaNev.setAttribute("onmouseover","FelNyilik(this)");
    document.body.appendChild(TablaNev);
}

function FelNyilik(div){
    div.classList = "NevFelnyilas";
    document.getElementById("ChipTabla").classList = "TablaFelnyilas";
}

function Main(){
    AlapKiGen();
    JatekosKivalaszt();
}
Main();