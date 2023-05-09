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
var ErtekDivArray = ["BSorDiv0","BSorDiv2","BSorDiv4","BSorDiv3","BSorDiv1"];
var KartyaIndexH = ["OLBDiv10","OLBDiv11","OLBDiv20","OLBDiv21","OLBDiv30","OLBDiv31","OLBDiv40","OLBDiv41","OLBDiv50","OLBDiv51","OLBDivOszto0","OLBDivOszto1"];
var JatekosKartyaID = [["OLBDiv10", "OLBDiv11","OLBDiv12","OLBDivErtek10"],[ "OLBDiv20", "OLBDiv21", "OLBDiv22","OLBDivErtek20"],
                       [ "OLBDiv30", "OLBDiv31", "OLBDiv32", "OLBDivErtek30"],[ "OLBDiv40", "OLBDiv41","OLBDiv42", "OLBDivErtek40"],
                       [ "OLBDiv50", "OLBDiv51", "OLBDiv52", "OLBDivErtek50"], ["OLBDivOszto0", "OLBDivOszto1","OLBDivOszto2", "OsztoDivErtek"]];
var JatekosLapErtekek = ["OLBDivErtek10","OLBDivErtek30","OLBDivErtek50","OLBDivErtek40","OLBDivErtek20"];
var CoinertekDivek = ["CoinErtek11","CoinErtek31","CoinErtek51","CoinErtek41","CoinErtek21"];
var KorSzamlalo = 1;
var KartyaKirakasSzamlalo = 0;
var kevert;
var plr = 0;
var JatekosGombDiv = undefined;
var HuzasGomb = undefined;
var MegallGomb = undefined;
var GombGen = false;
var jatekVege = false;
var osztoBJ = false;
var teljesveg = false;


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
    for (let i = 0; i < kevert.length*150000; i++) {
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
    setTimeout(KartyaMegjelenites,800,KartyaIndexH[KartyaKirakasSzamlalo++], kevert[kevert.length-1].id);
}

function Elrejtes(){
    document.getElementById("InditoGomb").classList = "InditoGombEltuntet";
    document.getElementById("InditoGomb").removeAttribute("onclick","general()");
    document.getElementById("ChipTabla").classList.remove("TablaFelnyilas");
    document.getElementById("ChipTablaNev").classList.remove("NevFelnyilas");
}

function KartyaMegjelenites(divSzam, KartyaID){
    if(KartyaKirakasSzamlalo < 11){
        let img = document.createElement("img");
        let div = document.getElementById(divSzam);
        img.classList = "KartyaLerakAnim";
        if(kevert[kevert.length-1].sign == 'Ász'){
            img.dataset.value = "Ász";
        }else{
            img.dataset.value = kevert[kevert.length-1].value;
        }
        img.dataset.hozzaadva = false;
        img.dataset.felforditva = true;
        img.src = "kep/"+KartyaID+".png";
        div.appendChild(img);
        kevert.splice(kevert.indexOf(kevert.length-1),1)
        setTimeout(KartyaMegjelenites,800,KartyaIndexH[KartyaKirakasSzamlalo++], kevert[kevert.length-1].id);
        if(KartyaKirakasSzamlalo % 2 == 0){
            setTimeout(KartyaOsszeg,1200);
        }
        if(KartyaKirakasSzamlalo == 10){
            setTimeout(OsztoKartyaLerak,2000,"card-background.png", KartyaIndexH[KartyaIndexH.length-1], false);
        }
    }
}

function KartyaOsszeg(){
    for(let i = 0; i < JatekosKartyaID.length;i++){
        for(let j = 0; j < JatekosKartyaID[i].length-1;j++){
            let div = document.getElementById(JatekosKartyaID[i][j]).firstChild;
            let div2 = document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]);
            if(div != undefined && div.dataset.hozzaadva == "false" && div.dataset.value != "Ász" && div.dataset.felforditva == "true"){
                let osszeg = Number(div2.dataset.value);
                osszeg += Number(div.dataset.value);
                div2.dataset.value = osszeg;
                div.dataset.hozzaadva = true;
            }
            else if(div != undefined && div.dataset.hozzaadva == "false" && div.dataset.value == "Ász" && div.dataset.felforditva == "true"){
                let ossz = Number(document.getElementById(JatekosKartyaID[i][3]).dataset.value);
                if(ossz > 10){
                    let osszeg = Number(div2.dataset.value);
                    div2.dataset.value = osszeg+1;
                }
                else if(ossz < 11){
                    let osszeg = Number(div2.dataset.value);
                    div2.dataset.value = osszeg+11;
                }
                if(div.dataset.value == "Ász"){
                    div.dataset.hozzaadva = "true";
                }
            }
        }
        document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).innerHTML = "<p>"+document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value+"</p>";  
        if(Number(document.getElementById(JatekosKartyaID[i][3]).dataset.value) == 21){
            document.getElementById(JatekosKartyaID[i][3]).classList.add("OsszEredmenyNyert");
        }
        else if(Number(document.getElementById(JatekosKartyaID[i][3]).dataset.value) > 21){
            document.getElementById(JatekosKartyaID[i][3]).classList.add("OsszEredmenyNemNyert");
        }
        if(HuzasGomb != undefined){
            if(HuzasGomb.getattribute == null){
                HuzasGomb.setAttribute("onclick","Huzas()");
                MegallGomb.setAttribute("onclick","Tovabb()");
            }
        }
    }
    if(document.getElementById("OLBDivOszto0").firstChild != undefined && document.getElementById("OLBDivOszto1").firstChild != undefined){
        if(((document.getElementById("OLBDivOszto0").firstChild.dataset.value == "10" && document.getElementById("OLBDivOszto1").firstChild.dataset.value == "Ász") || 
        (document.getElementById("OLBDivOszto0").firstChild.dataset.value == "Ász" && document.getElementById("OLBDivOszto1").firstChild.dataset.value == "10"))){
            osztoBJ = true;
            JatekVege();
        }
    }
    if(document.getElementById("OsztoDivErtek").dataset.value != undefined){
        if(document.getElementById("OsztoDivErtek").dataset.value >0 && !osztoBJ){
            JatekKezdes();
        }
    }
}

function OsztoKartyaLerak(src, id, bool){
    if(document.getElementById("OLBDivOszto0").firstChild == undefined){
        let img = document.createElement("img");
        let div = document.getElementById(id);
        img.classList = "KartyaLerakAnim";
        if(kevert[kevert.length-1].sign == 'Ász'){
            img.dataset.value = "Ász";
        }else{
            img.dataset.value = kevert[kevert.length-1].value;
        }
        if(id == KartyaIndexH[KartyaIndexH.length-1]){
            img.dataset.kepid = kevert[kevert.length-1].id;
        }
        img.dataset.hozzaadva = false;
        img.dataset.felforditva = bool;
        img.src = src;
        div.appendChild(img);
        kevert.splice(kevert.indexOf(kevert.length-1),1);
        setTimeout(OsztoKartyaLerak,800,"kep/"+kevert[kevert.length-1].id+".png", KartyaIndexH[KartyaIndexH.length-2], true);
    }
    else{
        KartyaOsszeg();
    }
}


function JatekKezdes(){
    if(!GombGen){
        JatekosGombDiv = document.createElement("div");
        JatekosGombDiv.id = "JatekosGombDiv";
        HuzasGomb = document.createElement("button");
        HuzasGomb.id = "HuzasGomb";
        HuzasGomb.textContent = "Húz";
        HuzasGomb.setAttribute("onclick","Huzas()");
        MegallGomb = document.createElement("button");
        MegallGomb.id = "MegallGomb";
        MegallGomb.textContent = "Megáll";
        MegallGomb.setAttribute("onclick","Tovabb()");
        JatekosGombDiv.appendChild(HuzasGomb);
        JatekosGombDiv.appendChild(MegallGomb);
        document.getElementById("Jatekter").appendChild(JatekosGombDiv);
        GombGen = true;
    }
    for(let j = 0; j<5;j++){
        if(document.getElementById(ErtekDivArray[j]).firstChild.classList.contains("StatusIndikatorBalAktiv")){
            document.getElementById(ErtekDivArray[j]).firstChild.classList.remove("StatusIndikatorBalAktiv");
        }
    }
    if(plr<5){
        if(Number(document.getElementById(JatekosLapErtekek[plr]).dataset.value) == 21){
            document.getElementById(JatekosLapErtekek[plr]).classList.add("OsszEredmenyNyert");
            Tovabb();
        }
        else if(Number(document.getElementById(JatekosLapErtekek[plr]).dataset.value) > 21){
            document.getElementById(JatekosLapErtekek[plr]).classList.add("OsszEredmenyNemNyert");
            Tovabb();
        }
        else{
            document.getElementById(ErtekDivArray[plr]).firstChild.classList.add("StatusIndikatorBalAktiv");
        }
    }
    else if (Number(document.getElementById("OsztoDivErtek").firstChild.innerHTML)){
        if(!jatekVege){
            JatekVege();
        }
    }
}

function Huzas(){
    HuzasGomb.removeAttribute("onclick","Huzas()");
    MegallGomb.removeAttribute("onclick","Tovabb()");
    let HuzottLapokHelye = ["OLBDiv12","OLBDiv32","OLBDiv52","OLBDiv42","OLBDiv22"];
    if(document.getElementById(HuzottLapokHelye[plr]).firstChild != undefined){
        document.getElementById(HuzottLapokHelye[plr]).innerHTML = "";
    }
    KartyaHuzas(HuzottLapokHelye[plr], kevert[kevert.length-1].id);
}

function KartyaHuzas(divSzam,KartyaID){
    let img = document.createElement("img");
    let div = document.getElementById(divSzam);
    img.classList = "KartyaLerakAnim";
    if(kevert[kevert.length-1].sign == 'Ász'){
        img.dataset.value = "Ász";
    }else{
        img.dataset.value = kevert[kevert.length-1].value;
    }
    img.dataset.hozzaadva = false;
    img.dataset.felforditva = true;
    img.src = "kep/"+KartyaID+".png";
    div.appendChild(img);
    kevert.splice(kevert.indexOf(kevert.length-1),1)
    setTimeout(KartyaOsszeg,1200);
}

function Tovabb(){
    if(Number(document.getElementById(JatekosLapErtekek[plr]).dataset.value)<21){
        document.getElementById(JatekosLapErtekek[plr]).classList.add("OsszEredmenyFeher");
    }
    plr++;
    JatekKezdes();
}

function JatekVege(){
    jatekVege = true;
    if(JatekosGombDiv != undefined){
        JatekosGombDiv.style.display = "none";
    }
    if(!osztoBJ){
        setTimeout(OsztoOsszegzes,2000);
    }
    else{
        document.getElementById("OsztoDivErtek").innerHTML = "<p>"+21+"</p>";
        document.getElementById("OsztoDivErtek").dataset.value = 21;
        document.getElementById("OsztoDivErtek").classList.add("OsszEredmenyNyert");
        OsztoMasodikKartya();
        Leszamolas();
    }
    
}

function OsztoMasodikKartya(){
    let leforditottKartya = document.getElementById("OLBDivOszto1").firstChild;
    let felforditottKartya = document.createElement("img");
    felforditottKartya.classList.add("KartyaLerakAnim");
    felforditottKartya.dataset.value = leforditottKartya.dataset.value;
    felforditottKartya.dataset.hozzaadva = false;
    felforditottKartya.dataset.felforditva = true;
    felforditottKartya.src = "kep/"+leforditottKartya.dataset.kepid+".png";
    document.getElementById("OLBDivOszto1").innerHTML = "";
    document.getElementById("OLBDivOszto1").appendChild(felforditottKartya);
}

function OsztoOsszegzes(){
    OsztoMasodikKartya();
    setTimeout(KartyaOsszeg,1000);
    setTimeout(OsztoKartyaHuzas,2500);
}

function OsztoKartyaHuzas(){
    let osszeg = Number(document.getElementById("OsztoDivErtek").dataset.value);
    if(osszeg<17){
        if(document.getElementById("OLBDivOszto2").firstChild != undefined){
            document.getElementById("OLBDivOszto2").innerHTML = "";
        }
        KartyaHuzas("OLBDivOszto2",kevert[kevert.length-1].id);
        setTimeout(OsztoKartyaHuzas,1500);
    }
    else{
        Leszamolas();
    }
    
}

function Leszamolas(){
    let ossz = 0;
    let osztoErtek = Number(document.getElementById("OsztoDivErtek").firstChild.innerHTML)
    for (let i = 1; i <= 5; i++) {
        let lapErtek = Number(document.getElementById("OLBDivErtek"+i+"0").firstChild.innerHTML);
        let coinString = document.getElementById("CoinErtek"+i+"1").firstChild.innerHTML.split("$");
        let coinErtek = Number(coinString[1]);
        if(lapErtek>osztoErtek && lapErtek<=21){//ha 21 alatt vagy es osztonal tobb
            ossz += coinErtek*2;
            document.getElementById("CoinErtek"+i+"1").classList.add("tetNyert");
            document.getElementById("CoinErtek"+i+"1").firstChild.innerHTML = "<p>$"+String(coinErtek*2)+"</p>";
        }

        else if(lapErtek == osztoErtek && osztoErtek <22){//ha dontetlen
            ossz += coinErtek;
            document.getElementById("CoinErtek"+i+"1").classList.add("tetMarad");
        }

        else if(osztoErtek>21 && lapErtek<=21){ // ha oszto tullepi
            ossz += coinErtek*2;
            document.getElementById("CoinErtek"+i+"1").classList.add("tetNyert");
            document.getElementById("CoinErtek"+i+"1").firstChild.innerHTML = "<p>$"+String(coinErtek*2)+"</p>";
        }
        else{
            document.getElementById("CoinErtek"+i+"1").classList.add("tetBukta");
            document.getElementById("CoinErtek"+i+"1").firstChild.innerHTML = "<p>$0</p>";
        }
    }
    document.getElementById("ChipTablaNev").dataset.value = ossz + Number(document.getElementById("ChipTablaNev").dataset.value);
    document.getElementById("ChipTablaNev").innerHTML = "<p>$"+document.getElementById("ChipTablaNev").dataset.value+"</p>";
    setTimeout(UjKor,500);
}

function UjKor(){
    if(document.getElementById("ChipTablaNev").dataset.value != 0){
        setTimeout(UjkorGombok,2000);
    }
    else if(document.getElementById("ChipTablaNev").dataset.value < 1){
        setTimeout(Befejezes,2000);
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
    UjkorGomb.setAttribute("onclick","setTimeout(UjkorKezdes,700)");
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

function UjkorKezdes(){
    KorSzamlalo++;
    setTimeout(Reset,700,true);
    document.getElementById("FeketeHatterDiv").classList.remove("FeketeHatterMegjelenito");
    document.getElementById("FeketeHatterDiv").classList.add("FeketeHatterEltunteto");
}

// function Befejezes(){
//     document.getElementById("FeketeHatterDiv").classList.add("FeketeHatterMegjelenito");
//     Reset(false);
//     let BefejezesDivTer = document.createElement("div");
//     BefejezesDivTer.id = "BefejezesDivTer";
//     BefejezesDivTer.classList = "AlapDiv";
//     BefejezesDivTer.innerHTML = "<p>Értékelés</p>";
//     Jatekter.appendChild(BefejezesDivTer);
//     setTimeout(RaadLenyilas1,700);
//     let KorokSzamaDiv = document.createElement("div");
//     KorokSzamaDiv.id = "KorokSzamaDiv";
//     KorokSzamaDiv.innerHTML = "<p>Lejátszott körök száma: "+KorSzamlalo+"</p>";
//     BefejezesDivTer.appendChild(KorokSzamaDiv);
//     let KiinduloErtekDiv = document.createElement("div");
//     KiinduloErtekDiv.id = "KiinduloErtekDiv";
//     KiinduloErtekDiv.innerHTML = "<p>Kiinduló összeg: "+TeljesCoinErtek+"</p>";
//     BefejezesDivTer.appendChild(KiinduloErtekDiv);
//     let MostaniErtekDiv = document.createElement("div");
//     MostaniErtekDiv.innerHTML = "<p>Vég összeg: "+document.getElementById("ChipTablaNev").dataset.value+"</p>";
//     MostaniErtekDiv.id = "MostaniErtekDiv";
//     BefejezesDivTer.appendChild(MostaniErtekDiv);
//     if((document.getElementById("ChipTablaNev").dataset.value-TeljesCoinErtek) < 0){
//         let VesztesegDiv = document.createElement("div");
//         VesztesegDiv.id = "VesztesegDiv";
//         VesztesegDiv.innerHTML = "<p>Profit > Veszteség: "+(document.getElementById("ChipTablaNev").dataset.value-TeljesCoinErtek)+"</p>";
//         BefejezesDivTer.appendChild(VesztesegDiv);
//     }
//     else if((document.getElementById("ChipTablaNev").dataset.value-TeljesCoinErtek) > 0){
//         let NyeresegDiv = document.createElement("div");
//         NyeresegDiv.id = "NyeresegDiv";
//         NyeresegDiv.innerHTML = "<p>Profit > Nyereség: "+(document.getElementById("ChipTablaNev").dataset.value-TeljesCoinErtek)+"</p>";
//         BefejezesDivTer.appendChild(NyeresegDiv);
//     }
//     else{
//         let SemlegesDiv = document.createElement("div");
//         SemlegesDiv.id = "SemlegesDiv";
//         SemlegesDiv.innerHTML = "<p>Profit -> Az érték semmit se változott!</p>";
//         BefejezesDivTer.appendChild(SemlegesDiv);
//     }
//     let UjMecsInditasGomb = document.createElement("input");
//     UjMecsInditasGomb.type = "button";
//     UjMecsInditasGomb.id = "UjMecsInditasGomb";
//     UjMecsInditasGomb.value = "Új mecs";
//     UjMecsInditasGomb.setAttribute("onclick","UjMecsInditas()");
//     BefejezesDivTer.appendChild(UjMecsInditasGomb);
// }

function Reset(ujkore){
    if(document.getElementById("UjkorGomb") != undefined && document.getElementById("BefejezeGomb") != undefined){
        document.getElementById("UjkorGomb").removeAttribute("onclick");
        document.getElementById("BefejezeGomb").removeAttribute("onclick");
        document.getElementById("UjkorGomb").classList += " GombEltuntet";
        document.getElementById("BefejezeGomb").classList += " GombEltuntet";
        Jatekter.removeChild(document.getElementById("UjGombokDivTer"));
    }
    if(ujkore){
        if(document.getElementById("KiirEltuntet") != undefined){
            document.getElementById("KiirEltuntet").id = "KiirDiv";
        }
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
    for(let i = 0; i < ErtekDivArray.length;i++){
        document.getElementById(ErtekDivArray[i]).firstChild.classList = "StatusIndikatorBal";
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
    ValtozoVisszaAllitas();
    ErtekFrissites();
}



function ValtozoVisszaAllitas(){
    plr = 0;
    teljesveg = false;
    KartyaKirakasSzamlalo = 0;
    JatekosGombDiv = undefined;
    HuzasGomb = undefined;
    MegallGomb = undefined;
    GombGen = false;
    jatekVege = false;
    osztoBJ = false;
    KeverArrayBepakol();
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
