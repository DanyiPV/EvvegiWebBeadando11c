
function AlapKiGen(){
    let Jatekter = document.createElement("div");
    Jatekter.id = "Jatekter";
    document.body.appendChild(Jatekter);
}

function JatekosKivalast(){
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
    document.getElementById("KivalasztDiv").appendChild(BotokEllen);
    let JatekosEllen = document.createElement("div");
    JatekosEllen.id = "JatekosEllen";
    JatekosEllen.innerHTML = "<p id = BelsoText>Játékos Ellen</p>";
    document.getElementById("KivalasztDiv").appendChild(JatekosEllen);
}

function Main(){
    AlapKiGen();
    JatekosKivalast();
}
Main();