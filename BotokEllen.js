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
var JatekosLepteto = 0;
var teljesveg = false;

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
                        setTimeout(JatekosVege,700,true,"semmi", true);
                        teljesveg = true;
                        document.getElementById("OsztoDivErtek").classList += " OsszEredmenyNyert";
                        document.getElementById("OsztoDivErtek").dataset.value = "vége";
                    }
                }
                if(i == 5 || document.getElementById("OLBDivErtek"+(i+1)*10).classList == "OLBDivErtek"){
                    let osszeg = Number(document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value);
                    osszeg += Number(document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.value);
                    document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value = osszeg;
                    document.getElementById(JatekosKartyaID[i][j]).firstChild.dataset.hozzaadva = true;
                    if(document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value == 21){
                        document.getElementById("OLBDivErtek"+(i+1)*10).classList += " OsszEredmenyNyert";
                        if(i < 5){
                            setTimeout(JatekosVege,700,false,"BSorDiv"+(JatekosKartyaID[i][JatekosKartyaID[i].length-1][JatekosKartyaID[i][JatekosKartyaID[i].length-1].length-2]-1), false);
                        }
                    }
                    else if(document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value > 21){
                        document.getElementById("OLBDivErtek"+(i+1)*10).classList += " OsszEredmenyNemNyert";
                        if(i < 5){
                            setTimeout(JatekosVege,700,false,"BSorDiv"+(JatekosKartyaID[i][JatekosKartyaID[i].length-1][JatekosKartyaID[i][JatekosKartyaID[i].length-1].length-2]-1), false);
                        }
                    }
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
                    document.getElementById("OLBDivErtek"+(i+1)*10).classList += " OsszEredmenyNyert";
                    if(i < 5){
                        setTimeout(JatekosVege,700,false,"BSorDiv"+(JatekosKartyaID[i][JatekosKartyaID[i].length-1][JatekosKartyaID[i][JatekosKartyaID[i].length-1].length-2]-1), false);
                    }
                }
                else if(document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value > 21){
                    document.getElementById("OLBDivErtek"+(i+1)*10).classList += " OsszEredmenyNemNyert";
                    if(i < 5){
                        setTimeout(JatekosVege,700,false,"BSorDiv"+(JatekosKartyaID[i][JatekosKartyaID[i].length-1][JatekosKartyaID[i][JatekosKartyaID[i].length-1].length-2]-1), false);
                    }
                }
            }
        }
        document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).innerHTML = "<p>"+document.getElementById(JatekosKartyaID[i][JatekosKartyaID[i].length-1]).dataset.value+"</p>";
        if(document.getElementById("OsztoDivErtek").dataset.value != 0 && teljesveg == false && JatekosLepteto == 0){
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
        else{
            let dif = document.getElementById(divid).dataset.difficulty;
            if(dif == "könnyű" && document.getElementById(divid).firstChild.classList != "JatekVegIndikatorok"){
                setTimeout(KonnyuBotIQ,2000,divid);
                console.log("könnyűbe belép");
            }
            else if(dif == "normál" && document.getElementById(divid).firstChild.classList != "JatekVegIndikatorok"){
                setTimeout(NormalBotIQ,1500,divid);
                console.log("normálba belép");
            }
            else if(dif == "nehéz" && document.getElementById(divid).firstChild.classList != "JatekVegIndikatorok"){
                setTimeout(NehezBotIQ,1200,divid);
                console.log("nehézbe belép");
            }
            else if(dif == "insane" && document.getElementById(divid).firstChild.classList != "JatekVegIndikatorok"){
                setTimeout(InsaneBotIQ,800,divid);
                console.log("insanebe belép");
            }
        }
    }
}

function JatekosHuzas(divid){
    console.log("Belép");
    let HuzasGomb = document.createElement("button");
    HuzasGomb.classList = "HuzasGomb";
    HuzasGomb.id = "HuzasGomb";
    HuzasGomb.textContent = "Húz";
    HuzasGomb.setAttribute("onclick","Huzas()");
    let MegallGomb = document.createElement("button");
    MegallGomb.classList = "MegallGomb";
    MegallGomb.textContent = "Megáll";
    MegallGomb.id = "MegAllGomb";
    MegallGomb.setAttribute("onclick","MegAll()");
    Jatekter.appendChild(HuzasGomb);
    Jatekter.appendChild(MegallGomb);
}

function Huzas(){
    if(document.getElementById("BSorDiv4").firstChild.classList != "JatekVegIndikatorok"){
        
        let img = document.createElement("img");
        img.classList = "KartyaLerakAnim";
        if(kevert[kevert.length-1].sign == 'Ász'){
            if(document.getElementById(ertek).dataset.value < 11){
                if(document.getElementById(JatekosKartyaID[4][2]).firstChild == undefined){
                    img.dataset.value = 11;
                }
                else{
                    img.dataset.value = Number(document.getElementById(JatekosKartyaID[4][2]).firstChild.dataset.value) + 11;
                }
            }
            else{
                if(document.getElementById(JatekosKartyaID[4][2]).firstChild == undefined){
                    img.dataset.value = 1;
                }
                else{
                    img.dataset.value = Number(document.getElementById(JatekosKartyaID[4][2]).firstChild.dataset.value) + 1;
                }
            }
        }else{
            if(document.getElementById(JatekosKartyaID[4][2]).firstChild == undefined){
                img.dataset.value = kevert[kevert.length-1].value;
            }
            else{
                img.dataset.value = Number(document.getElementById(JatekosKartyaID[4][2]).firstChild.dataset.value) + kevert[kevert.length-1].value;
            }
        }
        img.dataset.hozzaadva = false;
        img.src = "kep/"+kevert[kevert.length-1].id+".png";
        kevert.splice(kevert.indexOf(kevert.length-1),1);
        KartyaKirakasSzamlalo++;
        if(document.getElementById(JatekosKartyaID[4][2]).firstChild != undefined){
            document.getElementById(JatekosKartyaID[4][2]).removeChild(document.getElementById(JatekosKartyaID[divid[divid.length-1]][2]).firstChild);
        }
        document.getElementById(JatekosKartyaID[4][2]).appendChild(img);
        KartyaOsszeg();
    }
    else{
        MegAll();
    }
}

function MegAll(){

}

function KonnyuBotIQ(divid){
    let ertek = JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]][JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]].length-1];
    if(17 > Number(document.getElementById(ertek).dataset.value) && Number(document.getElementById(ertek).dataset.value) > 0){
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
        setTimeout(KonnyuBotIQ,2000,divid);
    }
    else{
        document.getElementById(divid).firstChild.classList = "JatekVegIndikatorok";
        setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
    }
}

function NormalBotIQ(divid){
    let ertek = JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]][JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]].length-1];
    if(12 >= Number(document.getElementById(ertek).dataset.value) && 0 < Number(document.getElementById(ertek).dataset.value)){
        let random = Math.floor(Math.random()*100+1);
        if(random > 35){
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
            console.log(img.dataset.value);
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
            setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
        }
    }
    else{
        document.getElementById(divid).firstChild.classList = "JatekVegIndikatorok";
        setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
    }
}

function NehezBotIQ(divid){
    let ertek = JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]][JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]].length-1];
    if(11 >= Number(document.getElementById(ertek).dataset.value)){
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
    else if(Number(document.getElementById(ertek).dataset.value) < 16 && Number(document.getElementById(ertek).dataset.value) > 11){
        let random = Math.floor(Math.random()*100+1);
        if(random > 45){
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
            setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
        }
    }
    else{
        document.getElementById(divid).firstChild.classList = "JatekVegIndikatorok";
        setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
    }
}

function InsaneBotIQ(divid){
    let ertek = JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]][JatekosKartyaID[document.getElementById(divid).id[document.getElementById(divid).id.length-1]].length-1];
    if(11 >= Number(document.getElementById(ertek).dataset.value)){
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
            setTimeout(InsaneBotIQ,800,divid);
        }
    else if(16 > Number(document.getElementById(ertek).dataset.value) && 11 < Number(document.getElementById(ertek).dataset.value)){
        let random = Math.floor(Math.random()*100+1);
        if(random > 75){
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
            setTimeout(InsaneBotIQ,800,divid);
        }
        else{
            document.getElementById(divid).firstChild.classList = "JatekVegIndikatorok";
            setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
        }
    }
    else{
        document.getElementById(divid).firstChild.classList = "JatekVegIndikatorok";
        setTimeout(JatekKezdet,700,ErtekDivArray[JatekosLepteto++]);
    }
}