//Globál változók
var Leteve = false;
var CoinErtek = 0;
var Lefutott = false;
var BotokEllen = undefined;
//Játéktér
let Jatekter = document.createElement("div");
Jatekter.id = "Jatekter";
document.body.appendChild(Jatekter);

function AlapBeallaitasok(){
    let AlapDiv = document.createElement("div");
    AlapDiv.id = "AlapDiv";
    AlapDiv.classList = "AlapDiv";
    document.getElementById("Jatekter").appendChild(AlapDiv);
    let FeketeHatterDiv = document.createElement("div");
    FeketeHatterDiv.id = "FeketeHatterDiv";
    FeketeHatterDiv.classList = "FeketeHatter";
    document.body.appendChild(FeketeHatterDiv);
    setTimeout(RaadLenyilas,1200);
    JatekosKivalaszt();
}

function RaadLenyilas(){
    document.getElementById("AlapDiv").classList += " Lenyilas";
}

function JatekosKivalaszt(){
    let KivalasztDiv = document.createElement("div");
    KivalasztDiv.id = "KivalasztDiv";
    KivalasztDiv.style.height = "auto";
    KivalasztDiv.style.width = "fit-content";
    KivalasztDiv.style.margin = "auto";
    KivalasztDiv.style.display = "flex";
    KivalasztDiv.style.borderRadius = "10px";
    document.getElementById("AlapDiv").appendChild(KivalasztDiv);
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
    JatekosEllen.style.marginLeft = "2vw"
    JatekosEllen.classList = "KivalasztotDesign";
    JatekosEllen.innerHTML = "<p id = BelsoText>Játékos Ellen</p>";
    JatekosEllen.setAttribute("onclick","RaKatt(this)");
    document.getElementById("KivalasztDiv").appendChild(JatekosEllen);
}

function ErtekKivalasztas(){
    let ErtekDivTer = document.createElement("div");
    ErtekDivTer.id = "ErtekDivTer";
    ErtekDivTer.innerHTML = "<p>Válassz kezdő értéket!</p>"
    document.getElementById("AlapDiv").appendChild(ErtekDivTer);
    let ertekek = [50,100,250,500,1000,2500,5000];
    for(let i = 0; i < 7;i++){
        let div = document.createElement("div");
        div.classList = "BelsoDivek";
        div.dataset.ertek = ertekek[i];
        div.innerHTML = "<p>$"+ertekek[i]+"</p>";
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
        document.getElementById("Gomb").setAttribute("onclick","KivalasztasVege()");
        document.getElementById("Gomb").id ="KivalasztottGomb";
        Lefutott = true
    }
}
function GombLeterhoz(){
    let GombDiv = document.createElement("div");
    GombDiv.style.width = "100%";
    GombDiv.id = "GombDiv";
    document.getElementById("AlapDiv").appendChild(GombDiv);
    let gomb = document.createElement("input");
    gomb.type = "button";
    gomb.value = "Indítás";
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
        BotokEllen = true;
        elemt.classList.remove("Kivalasztva");
    }
    else if(div.dataset.value == "Játékos Ellen"){
        document.getElementById("JatekKiGenScript").src = "JatekosEllen.js";
        let elemt = document.getElementById("BotokEllen");
        BotokEllen = false;
        elemt.classList.remove("Kivalasztva");
    }
    Indulhat = true;
}

function KivalasztasVege(){
    document.getElementById("BotokEllen").classList = "KivalasztotDesign";
    document.getElementById("JatekosEllen").classList = "KivalasztotDesign";
    for(let i = 0; i < document.getElementsByClassName("BelsoDivek").length;i++){
        document.getElementById("BDiv"+i).classList = "BelsoDivek";
    }
    document.getElementById("AlapDiv").classList = "AlapDiv";
    setTimeout(Felallitas,2000);
}

function Felallitas(){
    document.body.removeChild(document.getElementById("FeketeHatterDiv"));
    document.getElementById("ChipTablaNev").setAttribute("onmouseover","FelAll()");
    ErtekBedobas();
}

function ErtekBedobas(){
    ErtekMegjelenites();
    setTimeout(FelAll,1500);
    let KiirDiv = document.createElement("div");
    KiirDiv.id = "KiirDiv";
    KiirDiv.innerHTML = "<p>Dobjon be tétet!</p>";
    Jatekter.appendChild(KiirDiv);
}

function ErtekMegjelenites(){
    let Tabla = document.getElementById("ChipTabla");
    let TablaNev = document.getElementById("ChipTablaNev");
    TablaNev.innerHTML = "<p>$"+CoinErtek+"</p>";
    let ZsetonDiv1 = document.createElement("div");
    let ZsetonDiv2 = document.createElement("div");
    ZsetonDiv1.id = "ZsetonDiv1";
    ZsetonDiv2.id = "ZsetonDiv2";
    let chipek = [1,5,25,50,100,500,1000];
    for(let i = 0;i<7;i++){
        let CoinDiv = document.createElement("div");
        CoinDiv.classList = "CoinDiv";
        let img = document.createElement("img");
        img.src = "chips/chip"+chipek[i]+".png";
        if(chipek[i]<=CoinErtek){
            if(!BotokEllen && i==0){
                img.classList = "Chipkepinaktiv";
            }else{
                img.classList = "Chipkepaktiv";
                img.setAttribute("onclick","ErtekKatt("+chipek[i]+")")
            }
        }else{
            img.classList = "Chipkepinaktiv";
        }
        CoinDiv.appendChild(img);
        if(i>3){
            ZsetonDiv2.appendChild(CoinDiv);
        }else{
            ZsetonDiv1.appendChild(CoinDiv);
        }
    }
    Tabla.appendChild(ZsetonDiv1);
    Tabla.appendChild(ZsetonDiv2);
    
}

function ErtekKatt(ertek){
    if(BotokEllen){ 
        let div = document.getElementById("CoinErtek51");
        div.dataset.value = Number(div.dataset.value)+ertek;
        div.innerHTML = "<p>$"+div.dataset.value+"</p>";
    }else{
        for(let i = 1;i<6;i++){
            let div = document.getElementById("CoinErtek"+((i*10)+1));
            div.dataset.value = Number(div.dataset.value)+(ertek/5);
            div.innerHTML = "<p>$"+div.dataset.value+"</p>";
        }
    }

    CoinErtek -= ertek;
    ErtekFrissites();
}

function ErtekFrissites(){
    let Tabla = document.getElementById("ChipTabla");
    Tabla.innerHTML = "";
    ErtekMegjelenites();
}

function TablaKiGen(){
    ChipsTabla();
    LapokTablaGen();
}

function LapokTablaGen(){
    //Játékos/Botok kártyabox kigenerálása
    let OsszLapokDiv = document.createElement("div");
    OsszLapokDiv.id = "OsszLapokDiv";
    Jatekter.appendChild(OsszLapokDiv);
    let DivDarab = [2,2,1];
    let OtosIndex = 1;
    let IDNevek = ["OLBDivErtek","CoinErtek"];
    for(let k = 0; k < 3;k++){
        let SorDiv = document.createElement("div");
        SorDiv.classList = "SorDiv";
        SorDiv.id = "SorDiv"+k;
        for(let i = 0; i < DivDarab[k];i++){
            let div = document.createElement("div");
            div.classList = "OsszLapokBelsoDiv";
            div.id = "BSorDiv"+k;
            let div2 = document.createElement("div");
            div2.classList = "StatusIndikatorBal";
            div.appendChild(div2);
            for(let j = 0; j < 3;j++){
                let div2 = document.createElement("div");
                div2.classList = "OLBDivs";
                div2.id = "OLBDiv"+OtosIndex+j;
                div.appendChild(div2);
            }
            let KozosErtekDiv = document.createElement("div");
            KozosErtekDiv.classList = "KozosErtekDiv";
            for(let j = 0; j < 2;j++){
                div2 = document.createElement("div");
                div2.classList = IDNevek[j];
                div2.id = IDNevek[j]+OtosIndex+j;
                KozosErtekDiv.appendChild(div2);
                if(j==1){
                    div2.dataset.value = 0;
                    div2.innerHTML = "<p>$0</p>";
                }
            }
            div.appendChild(KozosErtekDiv)
            SorDiv.appendChild(div);
            OtosIndex++;
        }
        OsszLapokDiv.appendChild(SorDiv);
    }
    OsztoTablaGen();
}

function OsztoTablaGen(){
    let index = 0;
    let div = document.createElement("div");
    div.classList = "OsszLapokBelsoDiv";
    div.id = "OsztoDiv";
    for(let j = 0; j < 3;j++){
        let div2 = document.createElement("div");
        div2.classList = "OLBDivs";
        div2.id = "OLBDivOszto"+(index++);
        div.appendChild(div2);
    }
    let div2 = document.createElement("div");
    div2.classList = "OLBDivErtek";
    div2.id = "OsztoDivErtek";
    div.appendChild(div2);
    Jatekter.appendChild(div);
}

function ChipsTabla(){
    let Tabla = document.createElement("div");
    Tabla.id = "ChipTabla";
    Jatekter.appendChild(Tabla);
    let TablaNev = document.createElement("div");
    TablaNev.id = "ChipTablaNev";
    TablaNev.innerHTML = "<p>$"+CoinErtek+"</p>";
    Jatekter.appendChild(TablaNev);

}

function FelAll(){
    document.getElementById("ChipTablaNev").classList = "NevFelnyilas";
    document.getElementById("ChipTabla").classList = "TablaFelnyilas";
    //document.getElementById("OsszLapokDiv").classList = "TablaOldalraTolas";
}

function Main(){
    AlapBeallaitasok();
    TablaKiGen();
}
   
Main();