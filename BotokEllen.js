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
var KartyaKirakasSzamlalo = 0;
var KartyaIndexH = ["OLBDiv10","OLBDiv11","OLBDiv20","OLBDiv21","OLBDiv30","OLBDiv31","OLBDiv40","OLBDiv41","OLBDiv50","OLBDiv51","OLBDivOszto0","OLBDivOszto1"];
var kevert = kartyaAdatok;
var JatekosKartyaID = [["OLBDiv10", "OLBDiv11","OLBDiv12","OLBDivErtek10"],[ "OLBDiv20", "OLBDiv21", "OLBDiv22","OLBDivErtek20"],
                       [ "OLBDiv30", "OLBDiv31", "OLBDiv32", "OLBDivErtek30"],[ "OLBDiv40", "OLBDiv41","OLBDiv42", "OLBDivErtek40"],
                       [ "OLBDiv50", "OLBDiv51", "OLBDiv52", "OLBDivErtek50"], ["OLBDivOszto0", "OLBDivOszto1","OLBDivOszto2", "OsztoDivErtek"]];
var ErtekDivArray = ["BSorDiv0","BSorDiv2","BSorDiv4","BSorDiv3","BSorDiv1"];
var ErtekLepteto = 0;

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
        img.src = "kep/"+KartyaID+".png";
        div.appendChild(img);
        kevert.splice(kevert.indexOf(kevert.length-1),1);
        setTimeout(KartyaMegjelenites,800,KartyaIndexH[KartyaKirakasSzamlalo++], kevert[kevert.length-1].id);
        if(KartyaKirakasSzamlalo % 2 == 0){
            setTimeout(KartyaOsszeg,1200);
        }
        if(KartyaKirakasSzamlalo == 10){
            setTimeout(OsztoKartyaLerak,2000,"card-background-felallitva.png", KartyaIndexH[KartyaIndexH.length-1], false);
        }
    }
}

function KartyaOsszeg(){
    for(let i = 0; i < JatekosKartyaID.length;i++){
        for(let j = 0; j < JatekosKartyaID[i].length-1;j++){
            if(document.getElementById(JatekosKartyaID[i][j]).firstChild != undefined && document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.hozzaadva == "false" && 
                document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.value != "Ász" && (document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.felforditva == "true" ||
                document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.felforditva == undefined)){
                if(document.getElementById("OLBDivOszto0").firstChil != undefined && document.getElementById("OLBDivOszto1").firstChil != undefined){
                    if((document.getElementById("OLBDivOszto0").firstChild.dataset.value == "10" && document.getElementById("OLBDivOszto1").firstChild.dataset.value == "Ász") ||
                    (document.getElementById("OLBDivOszto0").firstChild.dataset.value == "Ász" && document.getElementById("OLBDivOszto1").firstChild.dataset.value == "10")){
                        setTimeout(JatekosVege,700,true,"semmi", false);
                        document.getElementById("OsztoDivErtek").innerHTML = "<p>21</p>";
                        document.getElementById("OsztoDivErtek").classList += " OsszEredmenyNyert";
                    }
                }
                if(i == 5 || document.getElementById("OLBDivErtek"+(i+1)+"0").classList == "OLBDivErtek"){
                    let osszeg = Number(document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value);
                    osszeg += Number(document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.value);
                    if(osszeg == 21){
                        document.getElementById("OLBDivErtek"+(i+1)+"0").classList += " OsszEredmenyNyert";
                    }
                    else if(osszeg > 21){
                        cument.getElementById("OLBDivErtek"+(i+1)+"0").classList += " OsszEredmenyNemNyert";
                    }
                    document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value = osszeg;
                    document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.hozzaadva = true;
                }
            }
            else if(document.getElementById(JatekosKartyaID[i][j]).firstChild != undefined && document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.hozzaadva == "false" && 
            document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.value == "Ász" && (document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.felforditva == "true" ||
            document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.felforditva == undefined)){
                let ossz = 0;
                for(let k = 0; k < JatekosKartyaID[i].length-1;k++){
                    if(k != j){
                        if(document.getElementById(JatekosKartyaID[i][k]).firstChild != undefined && document.getElementById(JatekosKartyaID[i][k]).firstChild.dataset.hozzaadva == "false" && 
                        document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.value != "Ász"){
                            ossz += Number(document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value);
                        }
                        else if(document.getElementById(JatekosKartyaID[i][k]).firstChild != undefined && document.getElementById(JatekosKartyaID[i][k]).firstChild.dataset.hozzaadva == "false" && 
                        document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.value == "Ász" && k > 0){
                            ossz += 1;
                        }
                    }
                }
                if(ossz == 21){
                    document.getElementById("OLBDivErtek"+(i+1)+"0").classList += " OsszEredmenyNyert";
                }
                else if(ossz > 21){
                    cument.getElementById("OLBDivErtek"+(i+1)+"0").classList += " OsszEredmenyNemNyert";
                }
                if(ossz < 21){
                    if(ossz > 10){
                        let osszeg = Number(document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value);
                        document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value = osszeg+1;
                    }
                    else if(ossz < 11){
                        let osszeg = Number(document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value);
                        document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value = osszeg+11;
                    }
                    if(document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.value == "Ász"){
                        document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.hozzaadva = "true";
                    }
                }
            }
        }
        document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).innerHTML = "<p>"+document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value+"</p>";
        if(document.getElementById("OsztoDivErtek").dataset.value != 0){
            setTimeout(JatekKezdet,700,ErtekDivArray[ErtekLepteto], true);  
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

function JatekosVege(osztoigaze, divid, teljesveg){
    if(teljesveg){
        for(let i = 0; i < ErtekDivArray.length;i++){
            if(ErtekDivArray[i] != divid){
                document.getElementById(ErtekDivArray[i]).firstChild.classList += " JatekVegIndikatorok";
            }
        }
    }
    else{
        if(osztoigaze){
            for(let i = 0; i < ErtekDivArray.length;i++){
                document.getElementById(ErtekDivArray[i]).firstChild.classList += " JatekVegIndikatorok";
            }
        }
        else{
            document.getElementById(divid).firstChild.classList = "StatusIndikatorBalAktiv";
        }
    }
}

function JatekKezdet(divid, bote){
    document.getElementById(divid).firstChild.classList = "StatusIndikatorBalAktiv";
    for(let i = 0; i < ErtekDivArray.length; i++){
        if(ErtekDivArray[i] != divid){
            document.getElementById(ErtekDivArray[i]).firstChild.classList = "StatusIndikatorBal";
        }
    }
    if(bote){
        let dif = document.getElementById(divid).dataset.difficulty;
        if(dif == "könnyű"){
            KonnyuBotIQ(divid);
        }
        else if(dif == "normal"){
            NormalBotIQ(divid);
        }
        else if(dif == "nehéz"){
            NehezBotIQ(divid);
        }
        else if(dif == "insane"){
            InsaneBotIQ(divid);
        }
    }
    /*let HuzoButton = document.createElement("input");
    HuzoButton.type = "button";
    HuzoButton.classList = "HuzoButton";
    HuzoButton.value = "Huzás";
    Jatekter.appendChild(HuzoButton);*/
}

function KonnyuBotIQ(divid){

}