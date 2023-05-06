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
var kevert;
var JatekosKartyaID = [["OLBDiv10", "OLBDiv11","OLBDiv12","OLBDivErtek10"],[ "OLBDiv20", "OLBDiv21", "OLBDiv22","OLBDivErtek20"],
                       [ "OLBDiv30", "OLBDiv31", "OLBDiv32", "OLBDivErtek30"],[ "OLBDiv40", "OLBDiv41","OLBDiv42", "OLBDivErtek40"],
                       [ "OLBDiv50", "OLBDiv51", "OLBDiv52", "OLBDivErtek50"], ["OLBDivOszto0", "OLBDivOszto1","OLBDivOszto2", "OsztoDivErtek"]];
var ErtekDivArray = ["BSorDiv0","BSorDiv2","BSorDiv4","BSorDiv3","BSorDiv1"];
var JatekosLepteto = 0;
var teljesveg = false;
var KorSzamlalo = 1;

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
    setTimeout(KartyaMegjelenites,800,KartyaIndexH[KartyaKirakasSzamlalo++], kevert[kevert.length-1].id);
}

function Elrejtes(){
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
            setTimeout(OsztoKartyaLerak,2000,"card-background.png", KartyaIndexH[KartyaIndexH.length-1], false);
        }
    }
}

function KartyaOsszeg(){
    for(let i = 0; i < JatekosKartyaID.length;i++){
        for(let j = 0; j < JatekosKartyaID[i].length-1;j++){
            if(document.getElementById(JatekosKartyaID[i][j]).firstChild != undefined && document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.hozzaadva == "false" && 
                document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.value != "Ász" && (document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.felforditva == "true" ||
                document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.felforditva == undefined)){
                if(document.getElementById("OLBDivOszto0").firstChild != undefined && document.getElementById("OLBDivOszto1").firstChild != undefined){
                    if((document.getElementById("OLBDivOszto0").firstChild.dataset.value == '10' && document.getElementById("OLBDivOszto1").firstChild.dataset.value == 'Ász') ||
                    (document.getElementById("OLBDivOszto0").firstChild.dataset.value == 'Ász' && document.getElementById("OLBDivOszto1").firstChild.dataset.value == '10')){
                        ErtekDIsplay("oszto");
                        setTimeout(JatekosVege,700,true,"semmi", true);
                        teljesveg = true;
                        document.getElementById("OsztoDivErtek").dataset.value = "vége";
                        if(document.getElementById("OLBDivOszto1").firstChild.dataset.value == 'Ász'){
                            document.getElementById("OLBDivOszto1").firstChild.dataset.value = 11;
                        }
                        else if(document.getElementById("OLBDivOszto0").firstChild.dataset.value == 'Ász'){
                            document.getElementById("OLBDivOszto0").firstChild.dataset.value = 11;
                        }
                    }
                }
                if(i < 5 && document.getElementById("OLBDivErtek"+(i+1)*10).classList == "OLBDivErtek"){
                    let osszeg = Number(document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value);
                    osszeg += Number(document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.value);
                    document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value = osszeg;
                    document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.hozzaadva = true;
                    if(document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value == 21){
                        ErtekDIsplay("BSorDiv"+(JatekosKartyaID[i][JatekosKartyaID[i].length-1][JatekosKartyaID[i][JatekosKartyaID[i].length-1].length-2]-1));
                        if(i < 5){
                            setTimeout(JatekosVege,700,false,"BSorDiv"+(JatekosKartyaID[i][JatekosKartyaID[i].length-1][JatekosKartyaID[i][JatekosKartyaID[i].length-1].length-2]-1), false);
                        }
                    }
                    else if(document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value > 21){
                        ErtekDIsplay("BSorDiv"+(JatekosKartyaID[i][JatekosKartyaID[i].length-1][JatekosKartyaID[i][JatekosKartyaID[i].length-1].length-2]-1));
                        if(i < 5){
                            setTimeout(JatekosVege,700,false,"BSorDiv"+(JatekosKartyaID[i][JatekosKartyaID[i].length-1][JatekosKartyaID[i][JatekosKartyaID[i].length-1].length-2]-1), false);
                        }
                    }
                }
                else if(i == 5 && !teljesveg){
                    let osszeg = 0;
                    for(let k = 0; k < JatekosKartyaID[i].length-1;k++){
                        if(document.getElementById(JatekosKartyaID[i][k]).firstChild != undefined && document.getElementById(JatekosKartyaID[i][k]).firstChild.dataset.felforditva == "true" &&
                        document.getElementById(JatekosKartyaID[i][k]).firstChild.dataset.hozzaadva == "false"){
                            osszeg += Number(document.getElementById(JatekosKartyaID[i][k]).firstChild.dataset.value);
                            document.getElementById(JatekosKartyaID[i][k]).firstChild.dataset.hozzaadva = true;
                        }
                    }
                    document.getElementById("OsztoDivErtek").dataset.value = Number(document.getElementById("OsztoDivErtek").dataset.value) + osszeg;
                    document.getElementById("OsztoDivErtek").innerHTML = "<p>"+document.getElementById("OsztoDivErtek").dataset.value+"</p>";
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
                if(document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value == 21){
                    ErtekDIsplay("BSorDiv"+(JatekosKartyaID[i][JatekosKartyaID[i].length-1][JatekosKartyaID[i][JatekosKartyaID[i].length-1].length-2]-1));
                    if(i < 5){
                        setTimeout(JatekosVege,700,false,"BSorDiv"+(JatekosKartyaID[i][JatekosKartyaID[i].length-1][JatekosKartyaID[i][JatekosKartyaID[i].length-1].length-2]-1), false);
                    }
                }
                else if(document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value > 21){
                    ErtekDIsplay("BSorDiv"+(JatekosKartyaID[i][JatekosKartyaID[i].length-1][JatekosKartyaID[i][JatekosKartyaID[i].length-1].length-2]-1));
                    if(i < 5){
                        setTimeout(JatekosVege,700,false,"BSorDiv"+(JatekosKartyaID[i][JatekosKartyaID[i].length-1][JatekosKartyaID[i][JatekosKartyaID[i].length-1].length-2]-1), false);
                    }
                }
            }
        }
        document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).innerHTML = "<p>"+document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value+"</p>";
        if(document.getElementById("OsztoDivErtek").dataset.value != 0 && teljesveg == false && JatekosLepteto == 0 && document.getElementById("OsztoDivErtek").dataset.value != "vége"){
            setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
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
    if(JatekosLepteto < 6){
        if(document.getElementById(divid).firstChild.classList != "JatekVegIndikatorok" && document.getElementById(divid).firstChild.classList != "StatusIndikatorBalAktiv"){
            document.getElementById(divid).firstChild.classList = "StatusIndikatorBalAktiv";
        }
        if(JatekosLepteto == 3 && document.getElementById(divid).firstChild.classList != "JatekVegIndikatorok"){
            JatekosHuzas(divid);
        }
        else if(JatekosLepteto == 3 && document.getElementById(divid).firstChild.classList == "JatekVegIndikatorok"){
            setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
        }
        else{
            let dif = document.getElementById(divid).dataset.difficulty;
            if(dif == "könnyű" && document.getElementById(divid).firstChild.classList != "JatekVegIndikatorok"){
                setTimeout(KonnyuBotIQ,2000,divid);
            }
            else if(dif == "normál" && document.getElementById(divid).firstChild.classList != "JatekVegIndikatorok"){
                setTimeout(NormalBotIQ,1500,divid);
            }
            else if(dif == "nehéz" && document.getElementById(divid).firstChild.classList != "JatekVegIndikatorok"){
                setTimeout(NehezBotIQ,1200,divid);
            }
            else if(dif == "insane" && document.getElementById(divid).firstChild.classList != "JatekVegIndikatorok"){
                setTimeout(InsaneBotIQ,800,divid);
            }
            else if((dif == "könnyű" || dif == "normál" || dif == "nehéz" || dif == "insane") && document.getElementById(divid).firstChild.classList == "JatekVegIndikatorok"){
                setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
            }
        }
    }
    else if(JatekosLepteto == 6){
        OsztoKartyaLeptet();
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
    Jatekter.appendChild(HuzasGomb);
    Jatekter.appendChild(MegallGomb);
}

function Huzas(){
    if(document.getElementById("BSorDiv4").firstChild.classList != "JatekVegIndikatorok"){
        let ertek = JatekosKartyaID[document.getElementById("BSorDiv4").id[document.getElementById("BSorDiv4").id.length-1]][JatekosKartyaID[document.getElementById("BSorDiv4").id[document.getElementById("BSorDiv4").id.length-1]].length-1];
        let img = document.createElement("img");
        img.classList = "KartyaLerakAnim";
        if(kevert[kevert.length-1].sign == 'Ász'){
            if(kevert[kevert.length-1].sign == 'Ász'){
                if(document.getElementById(ertek).dataset.value < 11){
                    img.dataset.value = 11;
                }
                else{
                    img.dataset.value = 1;
                }
            }else{
                img.dataset.value = kevert[kevert.length-1].value;
            }
        }else{
            img.dataset.value = kevert[kevert.length-1].value;
        }
        img.dataset.hozzaadva = false;
        img.src = "kep/"+kevert[kevert.length-1].id+".png";
        kevert.splice(kevert.indexOf(kevert.length-1),1);
        KartyaKirakasSzamlalo++;
        if(document.getElementById(JatekosKartyaID[4][2]).firstChild != undefined){
            document.getElementById(JatekosKartyaID[4][2]).removeChild(document.getElementById(JatekosKartyaID["BSorDiv4"["BSorDiv4".length-1]][2]).firstChild);
        }
        document.getElementById(JatekosKartyaID[4][2]).appendChild(img);
        KartyaOsszeg();
        if(Number(document.getElementById("OLBDivErtek50").dataset.value) >= 21){
            setTimeout(MegAll,700);
        }
    }
    else{
        setTimeout(MegAll,700);
    }
}

function MegAll(){
    Jatekter.removeChild(document.getElementById("HuzasGomb"));
    Jatekter.removeChild(document.getElementById("MegAllGomb"));
    if(document.getElementById("BSorDiv4").firstChild.classList != "JatekVegIndikatorok"){
        document.getElementById("BSorDiv4").firstChild.classList = "JatekVegIndikatorok";
    }
    ErtekDIsplay("BSorDiv4");
    setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
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
        let img = document.createElement("img");
        img.classList = "KartyaLerakAnim";
        if(kevert[kevert.length-1].sign == 'Ász'){
            if(document.getElementById("OsztoDivErtek").dataset.value < 11){
                img.dataset.value = 11;
            }
            else{
                img.dataset.value = 1;
            }
        }else{
            img.dataset.value = kevert[kevert.length-1].value;
        }
        img.dataset.hozzaadva = false;
        img.dataset.felforditva = true;
        img.src = "kep/"+kevert[kevert.length-1].id+".png";
        kevert.splice(kevert.indexOf(kevert.length-1),1);
        KartyaKirakasSzamlalo++;
        if(document.getElementById(JatekosKartyaID[5][2]).firstChild != undefined){
            document.getElementById(JatekosKartyaID[5][2]).removeChild(document.getElementById(JatekosKartyaID[5][2]).firstChild);
        }
        document.getElementById(JatekosKartyaID[5][2]).appendChild(img);
        KartyaOsszeg();
        setTimeout(OsztoKartyaPlus,1000);
    }
    else{
        ErtekDIsplay("oszto");
    }
}

function ErtekDIsplay(divid){
    if(divid != "oszto"){
        let ertek = JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]][JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]].length-1];
        let Coinertek = "CoinErtek"+ ertek[ertek.length-2]+1;
        if(document.getElementById(ertek).dataset.value > 21 && document.getElementById(ertek).classList != "OLBDivErtek OsszEredmenyNemNyert"){
            document.getElementById(Coinertek).classList += " tetBukta";
            document.getElementById(ertek).classList += " OsszEredmenyNemNyert";
        }
        else if(document.getElementById(ertek).dataset.value < 21 && document.getElementById(ertek).classList != "OLBDivErtek OsszEredmenyFeher"){
            document.getElementById(Coinertek).classList += " tetMarad";
            document.getElementById(ertek).classList += " OsszEredmenyFeher";
        }
        else if(document.getElementById(ertek).dataset.value == 21 && document.getElementById(ertek).classList != "OLBDivErtek OsszEredmenyNyert") {
            document.getElementById(Coinertek).classList += " tetNyert";
            document.getElementById(ertek).classList += " OsszEredmenyNyert";
        }
    }else{
        let ertek = "OsztoDivErtek";
        if(document.getElementById(ertek).dataset.value > 21 && document.getElementById(ertek).classList != "OLBDivErtek OsszEredmenyNemNyert"){
            document.getElementById(ertek).classList += " OsszEredmenyNemNyert";
        }
        else if(document.getElementById(ertek).dataset.value < 21 && document.getElementById(ertek).classList != "OLBDivErtek OsszEredmenyFeher"){
            document.getElementById(ertek).classList += " OsszEredmenyFeher";
        }
        else if(document.getElementById(ertek).dataset.value == 21 && document.getElementById(ertek).classList != "OLBDivErtek OsszEredmenyNyert"){
            document.getElementById(ertek).classList += " OsszEredmenyNyert";
        }
        let EredmenyBDivek = document.getElementsByClassName("OLBDivErtek");
        let EredmenyCDivek = document.getElementsByClassName("CoinErtek");
        for(let i = 0; i < EredmenyBDivek.length-1;i++){
            if(Number(EredmenyBDivek[i].dataset.value) != 21 && Number(EredmenyBDivek[i].dataset.value) == Number(document.getElementById("OsztoDivErtek").dataset.value)){
                document.getElementById(EredmenyCDivek[i].id).classList = "CoinErtek tetMarad";
                document.getElementById(EredmenyBDivek[i].id).classList = "OLBDivErtek OsszEredmenyFeher";
            }
            else if(Number(EredmenyBDivek[i].dataset.value) != 21 && Number(EredmenyBDivek[i].dataset.value) != Number(document.getElementById("OsztoDivErtek").dataset.value)){
                document.getElementById(EredmenyCDivek[i].id).classList = "CoinErtek tetBukta";    
            document.getElementById(EredmenyBDivek[i].id).classList = "OLBDivErtek OsszEredmenyNemNyert";
            }
        }
        if(document.getElementById("OsztoDivErtek").classList != "OLBDivErtek"){
            Leszamolas();
        }
    }
}

function Leszamolas(){
    let ertek = Number(document.getElementById("OLBDivErtek50").dataset.value);
    let coinErtek = Number(document.getElementById("CoinErtek51").dataset.value);
    if(ertek == 21){
        CoinErtek = Number(document.getElementById("ChipTablaNev").dataset.value) + 2 * coinErtek;
    }
    else if(ertek == Number(document.getElementById("OsztoDivErtek").dataset.value)){
        CoinErtek = Number(document.getElementById("ChipTablaNev").dataset.value) + coinErtek;
    }
    ErtekMegjelenites();
    if(document.getElementById("ChipTablaNev").dataset.value != 0){
        setTimeout(UjkorGombok,2000);
    }
    else if(document.getElementById("ChipTablaNev").dataset.value == 0){
        setTimeout(Befejezes,2000);
    }
    /*document.getElementById("ChipTabla").classList = "TablaFelnyilas";
    document.getElementById("ChipTablaNev").classList = "NevFelnyilas";*/
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
    for(let i = 0; i < ErtekDivArray.length;i++){
        document.getElementById(ErtekDivArray[i]).firstChild.classList = "StatusIndikatorBal";
        document.getElementById(ErtekDivArray[i]).removeAttribute("data-difficulty");
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
    teljesveg = false;
    KartyaKirakasSzamlalo = 0;
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
    if((document.getElementById("ChipTablaNev").dataset.value-TeljesCoinErtek) < 0){
        let VesztesegDiv = document.createElement("div");
        VesztesegDiv.id = "VesztesegDiv";
        VesztesegDiv.innerHTML = "<p>Profit > Veszteség: "+(document.getElementById("ChipTablaNev").dataset.value-TeljesCoinErtek)+"</p>";
        BefejezesDivTer.appendChild(VesztesegDiv);
    }
    else if((document.getElementById("ChipTablaNev").dataset.value-TeljesCoinErtek) > 0){
        let NyeresegDiv = document.createElement("div");
        NyeresegDiv.id = "NyeresegDiv";
        NyeresegDiv.innerHTML = "<p>Profit > Nyereség: "+(document.getElementById("ChipTablaNev").dataset.value-TeljesCoinErtek)+"</p>";
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

function KonnyuBotIQ(divid){
    let ertek = JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]][JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]].length-1];
    if(17 > document.getElementById(ertek).dataset.value){
        let img = document.createElement("img");
        img.classList = "KartyaLerakAnim";
        if(kevert[kevert.length-1].sign == 'Ász'){
            if(document.getElementById(ertek).dataset.value < 11){
                img.dataset.value = 11;
            }
            else{
                img.dataset.value = 1;
            }
        }else{
            img.dataset.value = kevert[kevert.length-1].value;
        }
        img.dataset.hozzaadva = false;
        img.src = "kep/"+kevert[kevert.length-1].id+".png";
        kevert.splice(kevert.indexOf(kevert.length-1),1);
        KartyaKirakasSzamlalo++;
        if(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild != undefined){
            document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).removeChild(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild);
        }
        document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).appendChild(img);
        KartyaOsszeg();
        setTimeout(KonnyuBotIQ,2000,divid);
    }
    else{
        document.getElementById(divid).firstChild.classList = "JatekVegIndikatorok";
        ErtekDIsplay(divid);
        setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
    }
}

function NormalBotIQ(divid){
    let ertek = JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]][JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]].length-1];
    if(17 > Number(document.getElementById(ertek).dataset.value)){
        let random = Math.floor(Math.random()*100+1);
        if(random > 5){
            let img = document.createElement("img");
            img.classList = "KartyaLerakAnim";
            if(kevert[kevert.length-1].sign == 'Ász'){
                if(document.getElementById(ertek).dataset.value < 11){
                    img.dataset.value = 11;
                }
                else{
                    img.dataset.value = 1;
                }
            }else{
                img.dataset.value = kevert[kevert.length-1].value;
            }
            img.dataset.hozzaadva = false;
            img.src = "kep/"+kevert[kevert.length-1].id+".png";
            kevert.splice(kevert.indexOf(kevert.length-1),1);
            KartyaKirakasSzamlalo++;
            if(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild != undefined){
                document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).removeChild(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild);
            }
            document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).appendChild(img);
            KartyaOsszeg();
            setTimeout(NormalBotIQ,1500,divid);
        }
        else{
            document.getElementById(divid).firstChild.classList = "JatekVegIndikatorok";
            ErtekDIsplay(divid);
            setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
        }
    }
    else{
        document.getElementById(divid).firstChild.classList = "JatekVegIndikatorok";
        ErtekDIsplay(divid);
        setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
    }
}

function NehezBotIQ(divid){
    let ertek = JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]][JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]].length-1];
    if(11 >= document.getElementById(ertek).dataset.value){
            let img = document.createElement("img");
            img.classList = "KartyaLerakAnim";
            if(kevert[kevert.length-1].sign == 'Ász'){
                if(document.getElementById(ertek).dataset.value < 11){
                    img.dataset.value = 11;
                }
                else{
                    img.dataset.value = 1;
                }
            }else{
                img.dataset.value = kevert[kevert.length-1].value;
            }
            img.dataset.hozzaadva = false;
            img.src = "kep/"+kevert[kevert.length-1].id+".png";
            kevert.splice(kevert.indexOf(kevert.length-1),1);
            KartyaKirakasSzamlalo++;
            if(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild != undefined){
                document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).removeChild(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild);
            }
            document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).appendChild(img);
            KartyaOsszeg();
            setTimeout(NehezBotIQ,1200,divid);
        }
    else if(document.getElementById(ertek).dataset.value < 16 && document.getElementById(ertek).dataset.value > 11){
        let random = Math.floor(Math.random()*100+1);
        if(random > 15){
            let img = document.createElement("img");
            img.classList = "KartyaLerakAnim";
            if(kevert[kevert.length-1].sign == 'Ász'){
                if(document.getElementById(ertek).dataset.value < 11){
                    if(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild == undefined){
                        img.dataset.value = 11;
                    }
                    else{
                        img.dataset.value = Number(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild.dataset.value) + 11;
                    }
                }
                else{
                    if(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild == undefined){
                        img.dataset.value = 1;
                    }
                    else{
                        img.dataset.value = Number(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild.dataset.value) + 1;
                    }
                }
            }else{
                if(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild == undefined){
                    img.dataset.value = kevert[kevert.length-1].value;
                }
                else{
                    img.dataset.value = Number(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild.dataset.value) + kevert[kevert.length-1].value;
                }
            }
            img.dataset.hozzaadva = false;
            img.src = "kep/"+kevert[kevert.length-1].id+".png";
            kevert.splice(kevert.indexOf(kevert.length-1),1);
            KartyaKirakasSzamlalo++;
            if(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild != undefined){
                document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).removeChild(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild);
            }
            document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).appendChild(img);
            KartyaOsszeg();
            setTimeout(NehezBotIQ,1200,divid);
        }
        else{
            document.getElementById(divid).firstChild.classList = "JatekVegIndikatorok";
            ErtekDIsplay(divid);
            setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
        }
    }
    else{
        document.getElementById(divid).firstChild.classList = "JatekVegIndikatorok";
        ErtekDIsplay(divid);
        setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
    }
}

function InsaneBotIQ(divid){
    let ertek = JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]][JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]].length-1];
    if(11 >= document.getElementById(ertek).dataset.value){
            let img = document.createElement("img");
            img.classList = "KartyaLerakAnim";
            if(kevert[kevert.length-1].sign == 'Ász'){
                if(document.getElementById(ertek).dataset.value < 11){
                    img.dataset.value = 11;
                }
                else{
                    img.dataset.value = 1;
                }
            }else{
                img.dataset.value = kevert[kevert.length-1].value;
            }
            img.dataset.hozzaadva = false;
            img.src = "kep/"+kevert[kevert.length-1].id+".png";
            kevert.splice(kevert.indexOf(kevert.length-1),1);
            KartyaKirakasSzamlalo++;
            if(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild != undefined){
                document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).removeChild(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild);
            }
            document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).appendChild(img);
            KartyaOsszeg();
            setTimeout(InsaneBotIQ,800,divid);
        }
    else if(16 > document.getElementById(ertek).dataset.value && 11 < document.getElementById(ertek).dataset.value){
        let random = Math.floor(Math.random()*100+1);
        if(random > 35){
            let img = document.createElement("img");
            img.classList = "KartyaLerakAnim";
            if(kevert[kevert.length-1].sign == 'Ász'){
                if(document.getElementById(ertek).dataset.value < 11){
                    img.dataset.value = 11;
                }
                else{
                    img.dataset.value = 1;
                }
            }else{
                img.dataset.value = kevert[kevert.length-1].value;
            }
            img.dataset.hozzaadva = false;
            img.src = "kep/"+kevert[kevert.length-1].id+".png";
            kevert.splice(kevert.indexOf(kevert.length-1),1);
            KartyaKirakasSzamlalo++;
            if(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild != undefined){
                document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).removeChild(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild);
            }
            document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).appendChild(img);
            KartyaOsszeg();
            setTimeout(InsaneBotIQ,800,divid);
        }
        else{
            document.getElementById(divid).firstChild.classList = "JatekVegIndikatorok";
            ErtekDIsplay(divid);
            setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
        }
    }
    else{
        document.getElementById(divid).firstChild.classList = "JatekVegIndikatorok";
        ErtekDIsplay(divid);
        setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
    }
}