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
{id:44,value:10,sign:''},
{id:45,value:10,sign:''},
{id:46,value:10,sign:''},
{id:47,value:10,sign:''},
{id:48,value:3,sign:''},
{id:49,value:3,sign:''},
{id:50,value:3,sign:''},
{id:51,value:4,sign:''},
{id:52,value:4,sign:''}];
var KartyaKirakasSzamlalo = 0;
var KartyaIndexH = [10,11,20,21,30,31,40,41,50,51];
var kevert = kartyaAdatok;
var divSzam;
var KartyaID;

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
    Kartyak();
}

function Elrejtes(){
    let button = document.getElementById("InditoGomb");
    button.style.visibility = "hidden";
    button.removeAttribute("onclick","general()");
    document.getElementById("ChipTabla").classList.remove("TablaFelnyilas");
    document.getElementById("ChipTablaNev").classList.remove("NevFelnyilas");
}

function Kartyak(){
    divSzam = KartyaIndexH[KartyaKirakasSzamlalo++];
    KartyaID = kevert[kevert.length-1].id;
    setTimeout(KartyaMegjelenites,500);
}

function KartyaMegjelenites(){
    if(KartyaKirakasSzamlalo < 11){
        kevert.splice(kevert.indexOf(kevert.length-1),1)
        let img = document.createElement("img");
        let div = document.getElementById("OLBDiv"+divSzam);
        img.style.width = "100%";
        img.style.height = "99.8%";
        img.src = "kep/"+KartyaID+".png";
        div.appendChild(img);
        divSzam = KartyaIndexH[KartyaKirakasSzamlalo++];
        KartyaID = kevert[kevert.length-1].id;
        setTimeout(KartyaMegjelenites,500);
    }
}