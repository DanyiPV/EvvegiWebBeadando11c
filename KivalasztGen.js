//Globál változók
var Leteve = false;
var CoinErtek = 0;
var Lefutott = false;
var BotokEllen = undefined;
var TeljesCoinErtek = 0;

//Játéktér
let Jatekter = document.createElement("div");
Jatekter.id = "Jatekter";
document.body.appendChild(Jatekter);

function AlapBeallaitasok(){ //Kigenerálja az elejére a lenyíló kiválasztó divet, és a fekete háttérszínt is, ami egy divként van megoldva
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

function RaadLenyilas(){ //Ráadja a lenyíló részre a class-t ami miatt lenyílik
    document.getElementById("AlapDiv").classList += " Lenyilas";
}

function JatekosKivalaszt(){ //Kigenerálja a Játék mód diveket, id-t ad nekik és berendezi középre
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

function ErtekKivalasztas(){ //A kezdő érték kiválasztó Div tér és a bele generált divek érték szerint növekvő sorrendbe
    let ErtekDivTer = document.createElement("div");
    ErtekDivTer.id = "ErtekDivTer";
    ErtekDivTer.innerHTML = "<p>Válassz kezdő értéket!</p>"
    document.getElementById("AlapDiv").appendChild(ErtekDivTer);
    let ertekek = [50,100,250,500,1000,2500,5000];
    for(let i = 0; i < ertekek.length;i++){
        let div = document.createElement("div");
        div.classList = "BelsoDivek";
        div.dataset.ertek = ertekek[i];
        div.innerHTML = "<p>$"+ertekek[i]+"</p>";
        div.id = "BDiv"+i;
        div.setAttribute("onclick","ErtekKivalasztva(this)");
        ErtekDivTer.appendChild(div);
    }
}

function ErtekKivalasztva(div){ // Amelyik érték divre kattintanak azt választja ki és a gomb létrehozása után fog lefutni, és ha az elsőnek kattintanak egy értékre, akkor a gombra ráteszi amit kell
    div.classList += " Kivalasztva";
    CoinErtek = div.dataset.ertek;
    TeljesCoinErtek = div.dataset.ertek;
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

function GombLeterhoz(){ //A kezdő értékek utáni indító gomb létrehozása
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

function RaKatt(div){ //Amelyik divre kattintanak rá, arra teszi rá a megfelelő classt, és menti el az értékét, igaz/hamis változóval van megoldva hogy nézze egy másik func. hogy melyik script van meghívva
    div.classList += " Kivalasztva";
    if(Leteve == false){
        ErtekKivalasztas();
        GombLeterhoz();
        Leteve = true;
    }
    if(div.dataset.value == "Botok Ellen"){
        let elemt = document.getElementById("JatekosEllen");
        BotokEllen = true;
        elemt.classList.remove("Kivalasztva");
    }
    else if(div.dataset.value == "Játékos Ellen"){
        let elemt = document.getElementById("BotokEllen");
        BotokEllen = false;
        elemt.classList.remove("Kivalasztva");
    }
    Indulhat = true;
}

function KivalasztasVege(){ //Ha a gombra rálehet kattintani, akkor ezt a függvényt hívja meg, vissza állítja mindegyik értéknek az alap classlistjét(a későbbiek miatt)
    if(BotokEllen){
        document.getElementById("JatekKiGenScript").src = "BotokEllen.js";
    }
    else{
        document.getElementById("JatekKiGenScript").src = "JatekosEllen.js";
    }
    document.getElementById("BotokEllen").classList = "KivalasztotDesign";
    document.getElementById("JatekosEllen").classList = "KivalasztotDesign";
    for(let i = 0; i < document.getElementsByClassName("BelsoDivek").length;i++){
        document.getElementById("BDiv"+i).classList = "BelsoDivek";
    }
    document.getElementById("AlapDiv").classList = "AlapDiv";
    document.getElementById("FeketeHatterDiv").classList = "FeketeHatter";
    document.getElementById("FeketeHatterDiv").classList += " FeketeHatterEltunteto";
    setTimeout(Felallitas,2000); //Késlelteti az érték kiválasztó div felcsúszását
}

function Felallitas(){ //Elsötétített hátteret törli és értéket ad a Chip táblának, vagyis egér ráhuzással fel lehet nyitni
    if(BotokEllen){
        setTimeout(BotokErtekKiGen,400); //Ha a BotokEllen bool igaz, akkor itt hívja meg a Botok érték kigenerálást
    }
    ErtekBedobas();
    ErtekFrissites();
}

function ErtekBedobas(){ //Kigenerálja a chipekket és a egy szöveget középre
    ErtekMegjelenites();
    setTimeout(FelAll,1500);
    let KiirDiv = document.createElement("div");
    KiirDiv.id = "KiirDiv";
    KiirDiv.innerHTML = "<p>Dobjon be tétet!</p>";
    Jatekter.appendChild(KiirDiv);
}

function ErtekMegjelenites(){ //A bal alsó chippek kigenerálása, és azok elszürkítése ha a kezdő érték kisebb mint a chip értéke
    let Tabla = document.getElementById("ChipTabla");
    let TablaNev = document.getElementById("ChipTablaNev");
    if(TablaNev.dataset.value != undefined){
        CoinErtek = Number(TablaNev.dataset.value);
    }
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
            img.classList = "Chipkepaktiv";
            img.setAttribute("onclick","ErtekKatt("+chipek[i]+")")
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
    document.getElementById("ChipTablaNev").dataset.value = CoinErtek;
    Tabla.appendChild(ZsetonDiv1);
    Tabla.appendChild(ZsetonDiv2);
    
}

function ErtekKatt(ertek){ //Amelyik chipre kattintott, annak az értékét attól függően hogy játékos vagy botok elleni a játék mód, úgy adja hozzá a megfelelő divhez
    //console.log(Number(document.getElementById("CoinErtek11").dataset.value))+(ertek/5);
    InditoGombKiGen();
    KiirtSzovegEltuntet();
    if(BotokEllen){
        let div = document.getElementById("CoinErtek51");
        div.dataset.value = Number(div.dataset.value)+ertek;
        div.innerHTML = "<p>$"+div.dataset.value+"</p>";
    }else{
        for(let i = 1;i<6;i++){
            let div = document.getElementById("CoinErtek"+((i*10)+1));
            let Ertek = String(Number(div.dataset.value)+(ertek/5));
            var VegesSzam = "";
            if(VaneBennePont(Ertek)){
                VegesSzam = Ertek[0];
                let index = 1;
                while(index < Ertek.length && Ertek[index] != '.'){
                    VegesSzam += Ertek[index++];
                }
                VegesSzam += '.';
                VegesSzam += Ertek[index+1];
            }
            else{
                VegesSzam = Number(div.dataset.value)+(ertek/5);
            }
            div.dataset.value = Number(VegesSzam);
            div.innerHTML = "<p>$"+div.dataset.value+"</p>";
        }
    }
    CoinErtek -= ertek;
    document.getElementById("ChipTablaNev").dataset.value = CoinErtek;
    ErtekFrissites();
}

function VaneBennePont(Ertek){ //Igaz hamis változó hogy a szám tört-e vagy sem
    let i = 0;
    while(i < Ertek.length && Ertek[i] != '.'){i++}
    if(i < Ertek.length){return true}
    else{return false}
}

function ErtekFrissites(){ //Frissíti az érétket a chip táblában, az új érték alapján
    let Tabla = document.getElementById("ChipTabla");
    Tabla.innerHTML = "";
    ErtekMegjelenites();
}

function KiirtSzovegEltuntet(){
    if(document.getElementById("KiirDiv") != undefined){
        document.getElementById("KiirDiv").id = "KiirEltuntet";
    }
}

function InditoGombKiGen(){ //Amint az első chip értéket bedobja, vagyis a divekhez hozzáadódnak, kigenerálja a gombot, azt veszi figyelembe hogy önmaga ki van-e generálva
    if(document.getElementById("InditoGomb") == undefined){
        let InditoGomb = document.createElement("input");
        InditoGomb.value = "Indítás";
        InditoGomb.type = "button";
        InditoGomb.id = "InditoGomb";
        InditoGomb.classList = "InditoGomb";
        InditoGomb.setAttribute("onclick","general()");
        Jatekter.appendChild(InditoGomb);
    }
}

function BotokErtekKiGen(){ //Ha a játék mód a botok elleni, akkor az első 4 divbe kigenerálja az értékeket százalékosan, és az értékekhez van rendelve a nehézségi szint
    let BotokErtek = [{type: "könnyű", value: 50},{type: "könnyű", value: 100},{type: "normál", value: 250},{type: "normál", value: 500},
    {type: "nehéz", value: 1000},{type: "nehéz", value: 2500},{type: "insane", value: 5000}];
    let Botok = [{ertek: "CoinErtek11", difficulty: "BSorDiv0"},{ertek: "CoinErtek21", difficulty: "BSorDiv1"},{ertek: "CoinErtek31", difficulty: "BSorDiv2"},{ertek: "CoinErtek41", difficulty: "BSorDiv3"}];
    for(let i = 0; i < Botok.length;i++){
        let szazalekolas = Math.floor(Math.random()*100+1);
        let random = 0;
        if(szazalekolas < 71){
            random = Math.floor(Math.random()*4);
        }
        else if(szazalekolas > 70 && szazalekolas < 96){
            random = Math.floor(Math.random()*2)+4;
        }
        else{
            random = 6;
        }
        document.getElementById(Botok[i].ertek).dataset.value = BotokErtek[random].value;
        document.getElementById(Botok[i].difficulty).dataset.difficulty = BotokErtek[random].type;
        document.getElementById(Botok[i].ertek).innerHTML = "<p>$"+document.getElementById(Botok[i].ertek).dataset.value+"</p>";
    }
}

function TablaKiGen(){ //Alapjáraton az alap táblák kigenerálása
    ChipsTabla();
    LapokTablaGen();
}

function LapokTablaGen(){ //Az 5 játékos/bot kártya divjeinek a kigenerálása
    //Játékos/Botok kártyabox kigenerálása
    let OsszLapokDiv = document.createElement("div");
    OsszLapokDiv.id = "OsszLapokDiv";
    Jatekter.appendChild(OsszLapokDiv);
    let DivDarab = [2,2,1];
    let OtosIndex = 1;
    let BelsoSordDivIndex = 0;
    let IDNevek = ["OLBDivErtek","CoinErtek"];
    for(let k = 0; k < 3;k++){
        let SorDiv = document.createElement("div");
        SorDiv.classList = "SorDiv";
        SorDiv.id = "SorDiv"+k;
        for(let i = 0; i < DivDarab[k];i++){
            let div = document.createElement("div");
            div.classList = "OsszLapokBelsoDiv";
            div.id = "BSorDiv"+BelsoSordDivIndex++;
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
                }else{
                    div2.dataset.value = 0;
                    div2.innerHTML = "<p>Ø</p>";
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

function OsztoTablaGen(){ //Az osztótábal kigenerálása a lapok generálása után
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
    div2.dataset.value = 0;
    div2.innerHTML = "<p>Ø</p>";
    div2.classList = "OLBDivErtek";
    div2.id = "OsztoDivErtek";
    div.appendChild(div2);
    Jatekter.appendChild(div);
    Pakli();
}

function Pakli(){ //Bal felül a pakli kigenerálása
    let div = document.createElement("div");
    div.id = "Pakli";
    div.classList = "Pakli";
    Jatekter.appendChild(div);
    for(let i = 0; i < 4;i++){
        let BelsoDiv = document.createElement("div");
        BelsoDiv.id = "BelsoDiv"+i;
        BelsoDiv.classList = "BelsoDiv";
        if(i < 3){
            let img = document.createElement("img");
            img.src = "card-background.png";
            img.style.width = "100%";
            BelsoDiv.appendChild(img);
        }
        div.appendChild(BelsoDiv);
    }
}

function ChipsTabla(){ //A chip tábla kigenerálása, amibe a chipek kerülnek
    let Tabla = document.createElement("div");
    Tabla.id = "ChipTabla";
    Jatekter.appendChild(Tabla);
    let TablaNev = document.createElement("div");
    TablaNev.id = "ChipTablaNev";
    TablaNev.innerHTML = "<p>$"+CoinErtek+"</p>";
    Jatekter.appendChild(TablaNev);
}

function FelAll(){ //Az érték kiválasztó div lenyílására szolgáló func.
    document.getElementById("ChipTablaNev").classList = "NevFelnyilas";
    document.getElementById("ChipTabla").classList = "TablaFelnyilas";
    //document.getElementById("OsszLapokDiv").classList = "TablaOldalraTolas";
}

function UjKorKivalasztGen(){
    document.body.removeChild(document.getElementById("JatekKiGenScript"));
    let script = document.createElement("script");
    script.id = "JatekKiGenScript";
    document.body.appendChild(script);
}

function Main(){
    AlapBeallaitasok();
    TablaKiGen();
}
Main();