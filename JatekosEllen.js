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
var KartyaIndexH = ["OLBDiv10","OLBDiv11","OLBDiv20","OLBDiv21","OLBDiv30","OLBDiv31","OLBDiv40","OLBDiv41","OLBDiv50","OLBDiv51","OLBDivOszto0","OLBDivOszto1"];
var JatekosKartyaID = [["OLBDiv10", "OLBDiv11","OLBDiv12","OLBDivErtek10"],[ "OLBDiv20", "OLBDiv21", "OLBDiv22","OLBDivErtek20"],
                       [ "OLBDiv30", "OLBDiv31", "OLBDiv32", "OLBDivErtek30"],[ "OLBDiv40", "OLBDiv41","OLBDiv42", "OLBDivErtek40"],
                       [ "OLBDiv50", "OLBDiv51", "OLBDiv52", "OLBDivErtek50"], ["OLBDivOszto0", "OLBDivOszto1","OLBDivOszto2", "OsztoDivErtek"]];
var KartyaKirakasSzamlalo = 0;
var kevert = kartyaAdatok;
var plr = 0;
var JatekosGombDiv = undefined;
var HuzasGomb = undefined;
var MegallGomb = undefined;
var GombGen = false;
var jatekVege = false;
var osztoBJ = false;


function random(felso, also){
    return Math.floor(Math.random()*(felso-also+1)+also);
}

function Kever(){
    for (let i = 0; i < (kevert.length)*15000; i++) {
        let r1 = random(0,kevert.length-1);
        let r2 = random(0,kevert.length-1);
        let c = kevert[r1];
        kevert[r1] = kevert[r2];
        kevert[r2] = c;
    }
}

function general(){
    Kever();
    Elrejtes();
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
        if(document.getElementById("OsztoDivErtek").dataset.value>0 && !osztoBJ){
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
    let JatekosDivek = ["BSorDiv0","BSorDiv2","BSorDiv4","BSorDiv3","BSorDiv1"];
    let JatekosLapErtekek = ["OLBDivErtek10","OLBDivErtek30","OLBDivErtek50","OLBDivErtek40","OLBDivErtek20"];
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
        if(document.getElementById(JatekosDivek[j]).firstChild.classList.contains("StatusIndikatorBalAktiv")){
            document.getElementById(JatekosDivek[j]).firstChild.classList.remove("StatusIndikatorBalAktiv");
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
            document.getElementById(JatekosDivek[plr]).firstChild.classList.add("StatusIndikatorBalAktiv");
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

    }
    setTimeout(Leszamolas,10000);
    //UjKor();
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
        setTimeout(OsztoKartyaHuzas,2500);
    }
    
}

function Leszamolas(){
    let ossz = 0;
    let osztoErtek = Number(document.getElementById("OsztoDivErtek").firstChild.innerHTML)
    for (let i = 1; i <= 5; i++) {
        let lapErtek = Number(document.getElementById("OLBDivErtek"+i+"0").firstChild.innerHTML);
        let coinString = document.getElementById("CoinErtek"+i+"1").firstChild.innerHTML.split("$");
        let coinErtek = Number(coinString[1]);
        if(lapErtek>osztoErtek && lapErtek<=21)//ha 21 alatt vagy es osztonal tobb
            ossz += coinErtek*2

        if(lapErtek == osztoErtek)//ha dontetlen
            ossz += coinErtek

        if(osztoErtek>21 && lapErtek<=21) // ha oszto tullepi
            ossz += coinErtek*2
    }
    document.getElementById("ChipTablaNev").dataset.value = ossz;
    let div = document.getElementById("ChipTablaNev").dataset.value
    document.getElementById("ChipTablaNev").firstChild.innerHTML = "<p>$"+String(div)+"</p>"
}

function UjKor(){
    ValtozoVisszaAllitas();

    general();
}

function ValtozoVisszaAllitas(){
    KartyaKirakasSzamlalo = 0;
    kevert = kartyaAdatok;
    plr = 0;
    JatekosGombDiv = undefined;
    HuzasGomb = undefined;
    MegallGomb = undefined;
    GombGen = false;
    jatekVege = false;
    osztoBJ = false;
}