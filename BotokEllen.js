//Globál változók
var kartyaAdatok = [
{id:1,value:2,sign:''},
{id:2,value:2,sign:''},
{id:3,value:4,sign:''},
{id:4,value:4,sign:''},
{id:5,value:5,sign:''},
{id:6,value:5,sign:''},
{id:7,value:5,sign:''},
{id:8,value:5,sign:''},
{id:9,value:6,sign:''},
{id:10,value:6,sign:''},
{id:11,value:6,sign:''},
{id:12,value:6,sign:''},
{id:13,value:7,sign:''},
{id:14,value:7,sign:''},
{id:15,value:7,sign:''},
{id:16,value:7,sign:''},
{id:17,value:8,sign:''},
{id:18,value:8,sign:''},
{id:19,value:8,sign:''},
{id:20,value:8,sign:''},
{id:21,value:9,sign:''},
{id:22,value:2,sign:''},
{id:23,value:9,sign:''},
{id:24,value:9,sign:''},
{id:25,value:9,sign:''},
{id:26,value:10,sign:''},
{id:27,value:10,sign:''},
{id:28,value:10,sign:''},
{id:29,value:10,sign:''},
{id:30,value:0,sign:'Ász'},
{id:31,value:0,sign:'Ász'},
{id:32,value:0,sign:'Ász'},
{id:33,value:2,sign:''},
{id:34,value:0,sign:'Ász'},
{id:35,value:10,sign:''},
{id:36,value:10,sign:''},
{id:37,value:10,sign:''},
{id:38,value:10,sign:''},
{id:39,value:10,sign:''},
{id:40,value:10,sign:''},
{id:41,value:10,sign:''},
{id:42,value:10,sign:''},
{id:43,value:10,sign:''},
{id:44,value:3,sign:''},
{id:45,value:10,sign:''},
{id:46,value:10,sign:''},
{id:47,value:10,sign:''},
{id:48,value:3,sign:''},
{id:49,value:3,sign:''},
{id:50,value:3,sign:''},
{id:51,value:4,sign:''},
{id:52,value:4,sign:''}];
var KartyaKulsoLepteto = 0;
var KartyaBelsoLepteto = 0;
var KartyaIndexH = ["OLBDiv10","OLBDiv11","OLBDiv20","OLBDiv21","OLBDiv30","OLBDiv31","OLBDiv40","OLBDiv41","OLBDiv50","OLBDiv51","OLBDivOszto0","OLBDivOszto1"];
var kevert;
var JatekosKartyaID = [ ["OLBDiv10", "OLBDiv11", "OLBDiv12", {id:"OLBDivErtek10", value: "BSorDiv0"}],  ["OLBDiv30", "OLBDiv31","OLBDiv32", {id:"OLBDivErtek30", value: "BSorDiv2"}],
                        ["OLBDiv50", "OLBDiv51", "OLBDiv52", {id: "OLBDivErtek50", value: "BSorDiv4"}], ["OLBDiv40", "OLBDiv41","OLBDiv42", {id: "OLBDivErtek40", value: "BSorDiv3"}],
                        ["OLBDiv20", "OLBDiv21", "OLBDiv22", {id: "OLBDivErtek20", value: "BSorDiv1"}], ["OLBDivOszto0", "OLBDivOszto1","OLBDivOszto2", {id: "OsztoDivErtek", value: "OsztoDiv"}]];
var JatekosLepteto = 0;
var KorSzamlalo = 1;
var VegOsszeg = 0;
var JatekVeg = false;

function KeverArrayBepakol(){
    kevert = new Array();
    for(let i = 0; i < kartyaAdatok.length;i++){
        kevert.push(kartyaAdatok[i]);
    }
    Kever();
}

function random(felso, also){
    return Math.floor(Math.random()*(felso-also+1)+also);
}

function Kever(){
    for (let i = 0; i < (kevert.length)*150000; i++){
        let r1 = random(0,kevert.length-1);
        let r2 = random(0,kevert.length-1);
        let c = kevert[r1];
        kevert[r1] = kevert[r2];
        kevert[r2] = c;
    }
}

function general(){
    KeverArrayBepakol();
    Elrejtes();
    Jatekter.removeChild(document.getElementById("InditoGomb"));
    setTimeout(KartyaMegjelenites,800);
}

function Elrejtes(){
    document.getElementById("ChipTabla").classList.remove("TablaFelnyilas");
    document.getElementById("ChipTablaNev").classList.remove("NevFelnyilas");
}

function KepKiGen(div, ertek, value){
    let img = document.createElement("img");
    img.classList = "KartyaLerakAnim";
    if(kevert[kevert.length-1].sign == 'Ász'){
        img.dataset.value = "Ász";
    }else{
        img.dataset.value = kevert[kevert.length-1].value;
    }
    img.dataset.hozzaadva = false;
    if(KartyaKulsoLepteto == 5 && KartyaBelsoLepteto == 2){
        img.src = "card-background.png";
        img.dataset.felforditva = true;
        img.dataset.kepid = kevert[kevert.length-1].id;
    }
    else{
        if(ertek == undefined){
            img.src = "kep/"+kevert[kevert.length-1].id+".png";
        }
        else{
            img.src = "kep/"+ertek+".png";
            img.dataset.value = value;
            img.dataset.felforditva = false;
        }
    }
    kevert.splice(kevert.indexOf(kevert.length-1),1);
    div.appendChild(img);
}

function KartyaMegjelenites(){
    KartyaBelsoLepteto = 0;
    if(KartyaKulsoLepteto < 5){
        setTimeout(KartyaKigen,1000);
    }
    else{
        setTimeout(KartyaKigen,1000);
    }
}

function KartyaKigen(){
    if(KartyaKulsoLepteto < 5){
        if(KartyaBelsoLepteto < 2){
            let div = document.getElementById(JatekosKartyaID[KartyaKulsoLepteto][KartyaBelsoLepteto]);
            setTimeout(KepKiGen,1000,div);
            KartyaBelsoLepteto++;
            setTimeout(KartyaKigen,1000);
        }
        else{
            setTimeout(KartyaOsszeg2,1200,JatekosKartyaID[KartyaKulsoLepteto]);
            KartyaKulsoLepteto++;
            KartyaMegjelenites();
        }
    }
    else{
        if(KartyaBelsoLepteto < 2){
            let div = document.getElementById(JatekosKartyaID[KartyaKulsoLepteto][KartyaBelsoLepteto]);
            setTimeout(KepKiGen,1000,div);
            KartyaBelsoLepteto++;
            setTimeout(KartyaKigen,1000);
        }
        else{
            setTimeout(KartyaOsszeg2,1200,JatekosKartyaID[KartyaKulsoLepteto]);
            KartyaKulsoLepteto = 0;
            KartyaBelsoLepteto = 0;
        }
    }
}

function KartyaOsszeg2(DivId){
    var osszeg = Number(document.getElementById(DivId[DivId.length-1].id).dataset.value);
    for(let i = 0; i < DivId.length-1;i++){
        var NezettDiv = document.getElementById(DivId[i]).firstChild;
        if(NezettDiv != undefined && NezettDiv.dataset.hozzaadva == "false" && (NezettDiv.dataset.felforditva == undefined || NezettDiv.dataset.felforditva == "false")){
            if(NezettDiv.dataset.value != "Ász"){
                osszeg += Number(NezettDiv.dataset.value);
            }
            else if(NezettDiv.dataset.value == "Ász"){
                let ossz = 0;
                for(let k = i-1; k >= 0;k--){
                    ossz += document.getElementById(DivId[k]).firstChild.dataset.value;
                }
                if(ossz < 11){
                    osszeg += 11;
                }
                else{
                    osszeg += 1;
                }
            }
            NezettDiv.dataset.hozzaadva = true;
        }
    }
    if(OsztoOsszeg(DivId) == false){
        if(osszeg >= 21 && DivId != JatekosKartyaID[5]){
            setTimeout(ErtekDIsplay,1000,DivId[DivId.length-1]);
        }
        document.getElementById(DivId[DivId.length-1].id).firstChild.innerHTML = "<p>"+osszeg+"</p>";
        document.getElementById(DivId[DivId.length-1].id).dataset.value = osszeg;
        if(document.getElementById("OsztoDivErtek").dataset.value != 0 && JatekosLepteto == 0){
            setTimeout(JatekKezdet,700,JatekosKartyaID[JatekosLepteto]);
        }
    }
    else{
        KartyaFelFordit();
        document.getElementById(DivId[DivId.length-1].id).firstChild.innerHTML = "<p>21</p>";
        document.getElementById(DivId[DivId.length-1].id).dataset.value = 21;
        JatekVeg += 1;
        ErtekDIsplay("oszto");
        Leszamolas();
    }
}

function KartyaFelFordit(){
    let kepid = document.getElementById("OLBDivOszto1").firstChild.dataset.kepid;
    let value = document.getElementById("OLBDivOszto1").firstChild.dataset.value;
    document.getElementById("OLBDivOszto1").removeChild(document.getElementById("OLBDivOszto1").firstChild);
    KepKiGen(document.getElementById("OLBDivOszto1"),kepid,value);
}

function OsztoOsszeg(DivId){
    let bool = false;
    if(DivId == JatekosKartyaID[5]){
        var osszeg = 0;
        for(let i = 0; i < DivId.length-1;i++){
            var NezettDiv = document.getElementById(DivId[i]).firstChild;
            if(NezettDiv != undefined){
                if(NezettDiv.dataset.value != "Ász"){
                    osszeg += Number(NezettDiv.dataset.value);
                }
                else if(NezettDiv.dataset.value == "Ász"){
                    let ossz = 0;
                    for(let k = i-1; k >= 0;k--){
                        ossz += document.getElementById(DivId[k]).firstChild.dataset.value;
                    }
                    if(ossz < 11){
                        osszeg += 11;
                    }
                    else{
                        osszeg += 1;
                    }
                }
            }
        }
        if(osszeg == 21){
            bool = true;
        }
    }
    return bool;
}

function JatekosVege(osztoigaze, divid, teljesveg){
    if(teljesveg){
        document.getElementById("OsztoDivErtek").innerHTML = "<p>21</p>";
        for(let i = 0; i < ErtekDivArray.length;i++){
            if(ErtekDivArray[i] != divid){
                document.getElementById(ErtekDivArray[i]).firstChild.classList += " JatekVegIndikatorok";
            }
        }
    }
    else{
        if(osztoigaze){
            for(let i = 0; i < ErtekDivArray.length;i++){
                if(document.getElementById(ErtekDivArray[i]).firstChild.classList != "JatekVegIndikatorok"){
                    document.getElementById(ErtekDivArray[i]).firstChild.classList = "JatekVegIndikatorok";
                }
            }
        }
        else{
            if(document.getElementById(divid).firstChild.classList != "JatekVegIndikatorok"){
                document.getElementById(divid).firstChild.classList = "JatekVegIndikatorok";
            }
        }
    }
}

function JatekKezdet(divid){
    if(document.getElementById(divid[divid.length-1].value).firstChild.classList != "JatekVegIndikatorok" && 
    document.getElementById(divid[divid.length-1].value).firstChild.classList != "StatusIndikatorBalAktiv" && JatekosLepteto < 6){
        if(document.getElementById(divid[divid.length-1].value).firstChild.classList== "StatusIndikatorBal"){
            document.getElementById(divid[divid.length-1].value).firstChild.classList = "StatusIndikatorBalAktiv";
        }
        if(JatekosLepteto == 5){
            let ertek = document.getElementById("OLBDivOszto1").firstChild.dataset.kepid;
            let value = document.getElementById("OLBDivOszto1").firstChild.dataset.value;
            document.getElementById("OLBDivOszto1").removeChild(document.getElementById("OLBDivOszto1").firstChild);
            KepKiGen(document.getElementById("OLBDivOszto1"),ertek,value);
            KartyaOsszeg2(JatekosKartyaID[JatekosLepteto]);
            setTimeout(BotIQ,2000,divid,"oszto");
        }
        if(JatekosLepteto == 2 && document.getElementById(divid[divid.length-1].value).firstChild.classList != "JatekVegIndikatorok"){
            JatekosHuzas(divid[divid.length-1].value);
        }
        else{
            let dif = document.getElementById(divid[divid.length-1].value).dataset.difficulty;
            setTimeout(BotIQ,2000,divid,dif);
        }
    }
    else if(document.getElementById(divid[divid.length-1].value).firstChild.classList == "JatekVegIndikatorok" && 
    document.getElementById(divid[divid.length-1].value).firstChild.classList != "StatusIndikatorBalAktiv" && JatekosLepteto < 6){
        JatekKezdet(JatekosKartyaID[++JatekosLepteto]);
    }
}

function JatekosHuzas(divid){
    let HuzasGomb = document.createElement("button");
    HuzasGomb.classList = "HuzasGomb";
    HuzasGomb.id = "HuzasGomb";
    HuzasGomb.textContent = "Húz";
    HuzasGomb.setAttribute("onclick","Huzas()");
    let MegallGomb = document.createElement("button");
    MegallGomb.classList = "MegallGomb";
    MegallGomb.textContent = "Megáll";
    MegallGomb.id = "MegAllGomb";
    MegallGomb.setAttribute("onclick","setTimeout(MegAll,700)");
    let KozosDiv = document.createElement("div");
    KozosDiv.id = "KozosDiv";
    KozosDiv.appendChild(HuzasGomb);
    KozosDiv.appendChild(MegallGomb);
    Jatekter.appendChild(KozosDiv);
}

function Huzas(){
    if(document.getElementById("BSorDiv4").firstChild.classList != "JatekVegIndikatorok"){
        document.getElementById("HuzasGomb").removeAttribute("onclick");
        document.getElementById("MegAllGomb").removeAttribute("onclick");
        if(document.getElementById(JatekosKartyaID[2][2]).firstChild != undefined){
            document.getElementById(JatekosKartyaID[2][2]).removeChild(document.getElementById(JatekosKartyaID[2][2]).firstChild);
        }
        KepKiGen(document.getElementById(JatekosKartyaID[2][2]));
        KartyaOsszeg2(JatekosKartyaID[JatekosLepteto]);
        setTimeout(GombReset,700);
        if(Number(document.getElementById("OLBDivErtek50").dataset.value) >= 21){
            setTimeout(MegAll,700);
        }
    }
    else{
        setTimeout(MegAll,700);
    }
}

function GombReset(){
    document.getElementById("HuzasGomb").setAttribute("onclick","Huzas()");
    document.getElementById("MegAllGomb").setAttribute("onclick","setTimeout(MegAll,700)");
}

function MegAll(){
    if(document.getElementById("KozosDiv") != undefined ){
        Jatekter.removeChild(document.getElementById("KozosDiv"));
    }
    if(document.getElementById("BSorDiv4").firstChild.classList != "JatekVegIndikatorok"){
        document.getElementById("BSorDiv4").firstChild.classList = "JatekVegIndikatorok";
    }
    KartyaKulsoLepteto++;
    setTimeout(JatekKezdet,700,JatekosKartyaID[++JatekosLepteto]);
}

function OsztoKartyaLeptet(){
    let belsoimg = document.getElementById("OLBDivOszto1").firstChild;
    let img = document.createElement("img");
    img.dataset.value = belsoimg.dataset.value;
    img.src = "kep/"+belsoimg.dataset.kepid+".png";
    img.dataset.hozzaadva = belsoimg.dataset.hozzaadva;
    img.dataset.felforditva = true;
    img.classList = "KartyaLerakAnim";
    document.getElementById("OLBDivOszto1").removeChild(document.getElementById("OLBDivOszto1").firstChild);
    document.getElementById("OLBDivOszto1").appendChild(img);
    setTimeout(KartyaOsszeg,700);
    setTimeout(OsztoKartyaPlus,2000);
}

function OsztoKartyaPlus(){
    if(17 > document.getElementById("OsztoDivErtek").dataset.value){
        if(document.getElementById(JatekosKartyaID[5][2]).firstChild != undefined){
            document.getElementById(JatekosKartyaID[5][2]).removeChild(document.getElementById(JatekosKartyaID[5][2]).firstChild);
        }
        KepKiGen(document.getElementById(JatekosKartyaID[5][2]));
        KartyaOsszeg2(JatekosKartyaID[KartyaKulsoLepteto]);
        setTimeout(OsztoKartyaPlus,1000);
    }
    else{
        ErtekDIsplay("oszto");
    }
}

function ErtekDIsplay(divid){
    if(divid != "oszto"){
        let ertek = divid.id;
        let Coinertek = "CoinErtek"+ ertek[ertek.length-2]+"1";
        document.getElementById(divid.value).firstChild.classList = "JatekVegIndikatorok";
        if(document.getElementById(ertek).dataset.value == 21){
            document.getElementById(Coinertek).classList += " tetNyert";
            document.getElementById(ertek).classList += " OsszEredmenyNyert";

        }
        else if(document.getElementById(ertek).dataset.value > 21){
            document.getElementById(Coinertek).classList += " tetBukta";
            document.getElementById(ertek).classList += " OsszEredmenyNemNyert";
        }
    }
    else if(divid == "oszto"){
        let OsztoErtekDiv = document.getElementById("OsztoDivErtek");
        if(OsztoErtekDiv.dataset.value > 21){
            document.getElementById("OsztoDivErtek").classList += " OsszEredmenyNemNyert";
        }
        else if(OsztoErtekDiv.dataset.value < 21){
            document.getElementById("OsztoDivErtek").classList += " OsszEredmenyFeher";
        }
        else{
            document.getElementById("OsztoDivErtek").classList += " OsszEredmenyNyert";
        }
        let EredmenyBDivek = document.getElementsByClassName("OLBDivErtek");
        let EredmenyCDivek = document.getElementsByClassName("CoinErtek");
        for(let i = 0; i < EredmenyBDivek.length-1;i++){
            if((Number(document.getElementById("OsztoDivErtek").dataset.value) < 21 && Number(EredmenyBDivek[i].dataset.value) < 21 && Number(EredmenyBDivek[i].dataset.value) > Number(document.getElementById("OsztoDivErtek").dataset.value)) 
            || Number(EredmenyBDivek[i].dataset.value) == Number(document.getElementById("OsztoDivErtek").dataset.value)){
                document.getElementById(EredmenyCDivek[i].id).classList = "CoinErtek tetMarad";
                document.getElementById(EredmenyBDivek[i].id).classList = "OLBDivErtek OsszEredmenyFeher";
            }
            else if(Number(document.getElementById("OsztoDivErtek").dataset.value) == 21 || Number(EredmenyBDivek[i].dataset.value) == Number(document.getElementById("OsztoDivErtek").dataset.value)
            || (Number(EredmenyBDivek[i].dataset.value) < Number(document.getElementById("OsztoDivErtek").dataset.value) && Number(EredmenyBDivek[i].dataset.value) < 21)){
                document.getElementById(EredmenyCDivek[i].id).classList = "CoinErtek tetBukta";    
                document.getElementById(EredmenyBDivek[i].id).classList = "OLBDivErtek OsszEredmenyNemNyert";
            }
        }
    }
}

function Leszamolas(){
    if(JatekVeg == 1){
        let coinErtek = document.getElementById("CoinErtek51");
        if(coinErtek.classList == "CoinErtek tetNyert"){
            document.getElementById("ChipTablaNev").dataset.value = Number(document.getElementById("ChipTablaNev").dataset.value) + 2 * Number(coinErtek.dataset.value);
        }
        else if(coinErtek.classList == "CoinErtek tetMarad"){
            document.getElementById("ChipTablaNev").dataset.value = Number(document.getElementById("ChipTablaNev").dataset.value) + Number(coinErtek.dataset.value);
        }
        VegOsszeg = Number(document.getElementById("ChipTablaNev").dataset.value);
        console.log(VegOsszeg);
        ErtekMegjelenites();
        if(document.getElementById("ChipTablaNev").dataset.value != 0){
            setTimeout(UjkorGombok,2000);
        }
        else if(document.getElementById("ChipTablaNev").dataset.value == 0){
            setTimeout(Befejezes,2000);
        }
    }
}

function UjkorGombok(){
    document.getElementById("FeketeHatterDiv").classList.remove("FeketeHatterEltunteto");
    document.getElementById("FeketeHatterDiv").classList.add("FeketeHatterMegjelenito");
    let UjGombokDivTer = document.createElement("div");
    UjGombokDivTer.id = "UjGombokDivTer";
    let UjkorGomb = document.createElement("input");
    UjkorGomb.type = "button";
    UjkorGomb.id = "UjkorGomb";
    UjkorGomb.setAttribute("onclick","setTimeout(Ujkor,700)");
    UjkorGomb.value = "Új kör";
    UjkorGomb.classList = "UjkorGombok";
    let BefejezeGomb = document.createElement("input");
    BefejezeGomb.type = "button";
    BefejezeGomb.id = "BefejezeGomb";
    BefejezeGomb.value = "Befejezés";
    BefejezeGomb.setAttribute("onclick","setTimeout(Befejezes,700)");
    BefejezeGomb.classList = "UjkorGombok";
    UjGombokDivTer.appendChild(UjkorGomb);
    UjGombokDivTer.appendChild(BefejezeGomb);
    Jatekter.appendChild(UjGombokDivTer);
}

function Ujkor(){
    KorSzamlalo++;
    setTimeout(Reset,700,true);
    document.getElementById("FeketeHatterDiv").classList.remove("FeketeHatterMegjelenito");
    document.getElementById("FeketeHatterDiv").classList.add("FeketeHatterEltunteto");
}

function Reset(ujkore){
    if(document.getElementById("UjkorGomb") != undefined && document.getElementById("BefejezeGomb") != undefined){
        document.getElementById("UjkorGomb").removeAttribute("onclick");
        document.getElementById("BefejezeGomb").removeAttribute("onclick");
        document.getElementById("UjkorGomb").classList += " GombEltuntet";
        document.getElementById("BefejezeGomb").classList += " GombEltuntet";
        Jatekter.removeChild(document.getElementById("UjGombokDivTer"));
    }
    if(ujkore){
        document.getElementById("KiirEltuntet").id = "KiirDiv";
        document.getElementById("ChipTablaNev").classList = "NevFelnyilas";
        document.getElementById("ChipTabla").classList = "TablaFelnyilas";
    }
    for(let i = 0; i < JatekosKartyaID.length;i++){
        for(let j = 0; j < JatekosKartyaID[i].length-1;j++){
            if(document.getElementById(JatekosKartyaID[i][j]).firstChild != undefined){
                document.getElementById(JatekosKartyaID[i][j]).removeChild(document.getElementById(JatekosKartyaID[i][j]).firstChild);
            }
        }
    }
    let EredmenyBDivek = document.getElementsByClassName("OLBDivErtek");
    let EredmenyCDivek = document.getElementsByClassName("CoinErtek");
    for(let i = 0; i < JatekosKartyaID.length-1;i++){
        document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1].value).firstChild.classList = "StatusIndikatorBal";
        document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1].value).removeAttribute("data-difficulty");
    }
    for(let i = 0 ; i < EredmenyBDivek.length;i++){
        EredmenyBDivek[i].classList = "OLBDivErtek";
        EredmenyBDivek[i].dataset.value = 0;
        EredmenyBDivek[i].innerHTML = "<p>Ø</p>";
    }
    for(let i = 0; i < EredmenyCDivek.length;i++){
        EredmenyCDivek[i].classList = "CoinErtek";
        EredmenyCDivek[i].dataset.value = 0;
        EredmenyCDivek[i].innerHTML = "<p>$0</p>";
    }
    JatekosLepteto = 0;
    KartyaKulsoLepteto = 0;
    KartyaBelsoLepteto = 0;
    JatekVeg = 0;
    if(ujkore){
        BotokErtekKiGen();
    }
    KeverArrayBepakol();
    ErtekFrissites();
}

function Befejezes(){
    document.getElementById("FeketeHatterDiv").classList.add("FeketeHatterMegjelenito");
    Reset(false);
    let BefejezesDivTer = document.createElement("div");
    BefejezesDivTer.id = "BefejezesDivTer";
    BefejezesDivTer.classList = "AlapDiv";
    BefejezesDivTer.innerHTML = "<p>Értékelés</p>";
    Jatekter.appendChild(BefejezesDivTer);
    setTimeout(RaadLenyilas1,700);
    let KorokSzamaDiv = document.createElement("div");
    KorokSzamaDiv.id = "KorokSzamaDiv";
    KorokSzamaDiv.innerHTML = "<p>Lejátszott körök száma: "+KorSzamlalo+"</p>";
    BefejezesDivTer.appendChild(KorokSzamaDiv);
    let KiinduloErtekDiv = document.createElement("div");
    KiinduloErtekDiv.id = "KiinduloErtekDiv";
    KiinduloErtekDiv.innerHTML = "<p>Kiinduló összeg: "+TeljesCoinErtek+"</p>";
    BefejezesDivTer.appendChild(KiinduloErtekDiv);
    let MostaniErtekDiv = document.createElement("div");
    MostaniErtekDiv.innerHTML = "<p>Vég összeg: "+document.getElementById("ChipTablaNev").dataset.value+"</p>";
    MostaniErtekDiv.id = "MostaniErtekDiv";
    BefejezesDivTer.appendChild(MostaniErtekDiv);
    if(VegOsszeg-Number(document.getElementById("BelsoDiv0").dataset.kezdoertek) < 0){
        let VesztesegDiv = document.createElement("div");
        VesztesegDiv.id = "VesztesegDiv";
        VesztesegDiv.innerHTML = "<p>Veszteség: "+(VegOsszeg-Number(document.getElementById("BelsoDiv0").dataset.kezdoertek))+"</p>";
        BefejezesDivTer.appendChild(VesztesegDiv);
    }
    else if(VegOsszeg-Number(document.getElementById("BelsoDiv0").dataset.kezdoertek) > 0){
        let NyeresegDiv = document.createElement("div");
        NyeresegDiv.id = "NyeresegDiv";
        NyeresegDiv.innerHTML = "<p>Nyereség: "+(VegOsszeg-Number(document.getElementById("BelsoDiv0").dataset.kezdoertek))+"</p>";
        BefejezesDivTer.appendChild(NyeresegDiv);
    }
    else{
        let SemlegesDiv = document.createElement("div");
        SemlegesDiv.id = "SemlegesDiv";
        SemlegesDiv.innerHTML = "<p>Profit -> Az érték semmit se változott!</p>";
        BefejezesDivTer.appendChild(SemlegesDiv);
    }
    let UjMecsInditasGomb = document.createElement("input");
    UjMecsInditasGomb.type = "button";
    UjMecsInditasGomb.id = "UjMecsInditasGomb";
    UjMecsInditasGomb.value = "Új mecs";
    UjMecsInditasGomb.setAttribute("onclick","UjMecsInditas()");
    BefejezesDivTer.appendChild(UjMecsInditasGomb);
}

function UjMecsInditas(){
    KorSzamlalo = 1;
    Leteve = false;
    Lefutott = false;
    document.getElementById("AlapDiv").removeChild(document.getElementById("ErtekDivTer"));
    document.getElementById("AlapDiv").removeChild(document.getElementById("GombDiv"));
    document.getElementById("ChipTablaNev").innerHTML = "<p>$0<p>";
    document.getElementById("ChipTablaNev").removeAttribute("data-value");
    setTimeout(Felnyilas,700);
}

function Felnyilas(){
    document.getElementById("BefejezesDivTer").classList.remove("Lenyilas");
    setTimeout(RaadLenyilas,1200);
    UjKorKivalasztGen();
}

function RaadLenyilas1(){
    document.getElementById("BefejezesDivTer").classList += " Lenyilas";
}

function BotIQ(divid,dif){
    let ertek = divid[divid.length-1].id;
    if(dif == "könnyű" || dif == "oszto"){
        if(17 > document.getElementById(ertek).dataset.value){
            if(document.getElementById(divid[2]).firstChild != undefined){
                document.getElementById(divid[2]).removeChild(document.getElementById(divid[2]).firstChild);
            }
            KepKiGen(document.getElementById(divid[2]));
            KartyaOsszeg2(JatekosKartyaID[JatekosLepteto]);
            setTimeout(BotIQ,1500,divid,dif);
        }
        else{
            BotIQ(divid,"vege");
        }
    }
    else if(dif == "normál"){
        if(12 > document.getElementById(ertek).dataset.value){
            if(document.getElementById(divid[2]).firstChild != undefined){
                document.getElementById(divid[2]).removeChild(document.getElementById(divid[2]).firstChild);
            }
            KepKiGen(document.getElementById(divid[2]));
            KartyaOsszeg2(JatekosKartyaID[JatekosLepteto]);
            setTimeout(BotIQ,1200,divid,dif);
        }
        else if(document.getElementById(ertek).dataset.value > 12 && document.getElementById(ertek).dataset.value < 17){
            let random = Math.floor(Math.random()*100+1);
            if(random < 71){
                if(document.getElementById(divid[2]).firstChild != undefined){
                    document.getElementById(divid[2]).removeChild(document.getElementById(divid[2]).firstChild);
                }
                KepKiGen(document.getElementById(divid[2]));
                KartyaOsszeg2(JatekosKartyaID[JatekosLepteto]);
            }
            setTimeout(BotIQ,1200,divid,dif);
        }
        else{
            BotIQ(divid,"vege");
        }
    }
    else if(dif == "nehéz"){
        if(11 > document.getElementById(ertek).dataset.value){
            if(document.getElementById(divid[2]).firstChild != undefined){
                document.getElementById(divid[2]).removeChild(document.getElementById(divid[2]).firstChild);
            }
            KepKiGen(document.getElementById(divid[2]));
            KartyaOsszeg2(JatekosKartyaID[JatekosLepteto]);
            setTimeout(BotIQ,1500,divid,dif);
        }
        else if(document.getElementById(ertek).dataset.value > 11 && document.getElementById(ertek).dataset.value < 15){
            let random = Math.floor(Math.random()*100+1);
            if(random < 41){
                if(document.getElementById(divid[2]).firstChild != undefined){
                    document.getElementById(divid[2]).removeChild(document.getElementById(divid[2]).firstChild);
                }
                KepKiGen(document.getElementById(divid[2]));
                KartyaOsszeg2(JatekosKartyaID[JatekosLepteto]);
            }
            setTimeout(BotIQ,1000,divid,dif);
        }
        else{
            BotIQ(divid,"vege");
        }
    }
    else if(dif == "insane"){
        if(11 > document.getElementById(ertek).dataset.value){
            if(document.getElementById(divid[2]).firstChild != undefined){
                document.getElementById(divid[2]).removeChild(document.getElementById(divid[2]).firstChild);
            }
            KepKiGen(document.getElementById(divid[2]));
            KartyaOsszeg2(JatekosKartyaID[JatekosLepteto]);
            setTimeout(BotIQ,600,divid,dif);
        }
        else if(document.getElementById(ertek).dataset.value > 11 && document.getElementById(ertek).dataset.value < 16){
            let random = Math.floor(Math.random()*100+1);
            if(random < 21){
                if(document.getElementById(divid[2]).firstChild != undefined){
                    document.getElementById(divid[2]).removeChild(document.getElementById(divid[2]).firstChild);
                }
                KepKiGen(document.getElementById(divid[2]));
                KartyaOsszeg2(JatekosKartyaID[JatekosLepteto]);
            }
            setTimeout(BotIQ,600,divid,dif);
        }
        else{
            BotIQ(divid,"vege");
        }
    }
    else if(JatekosLepteto < 5 && dif == "vege"){
        setTimeout(JatekKezdet,700,JatekosKartyaID[++JatekosLepteto]);
        if(document.getElementById(divid[divid.length-1].value).firstChild.classList == "StatusIndikatorBalAktiv"){
            document.getElementById(divid[divid.length-1].value).firstChild.classList = "JatekVegIndikatorok";
        }
    }
    else if(JatekosLepteto == 5 && dif == "vege"){
        JatekVeg += 1;
        ErtekDIsplay("oszto");
        Leszamolas();
    }
}