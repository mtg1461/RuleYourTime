var theid, random, timewidth, timeheight, timemargin, timelinestart, scale, maxscale, timedisplay, timefontsize, halftimedisplay, random2, timeminutedisplay, input1onfocus, input2onfocus, dontcallonload, lovehatevalue, importancevalue, namecheck, starttimecheck, endtimecheck, currentactivityid, starttimefrommemory, endtimefrommemory, colorfrommemory, currentactivityindex, activityidfrommemory, iseditoractive, month_to_display, todays_date, todays_month;
const alph = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var timelist  = [0,0], timelistcolors = [0], timelistnames = [0], timelistdescriptions = [0], timelistlike = [0], timelistimportance = [0], timelistid = [0], favoriteactivities=[], timelistcompletion=[0],isCompleted = ["Completion List"], totalActivities=[0], totalLikes = [0], totalImportance = [0];
var timeliststart, timelistend, timeisvalid;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const daysOfMonths = {"January":31, "February":28, "March":31, "April":30, "May":31, "June":30, "July":31, "August":31, "September":30, "October":31, "November":30, "December":31}
const month_abv = {"January":"JAN", "February":"FEB", "March":"MAR", "April":"APR", "May":"MAY", "June":"JUN", "July":"JUL", "August":"AUG", "September":"SEP", "October":"OCT", "November":"NOV", "December":"DEC"}
current_day = 0;
current_month = 0;


iseditoractive = false;
currentactivityid = "";
timeliststart = '';
timelistend = '';
dontcallonload = true;
maxscale = 50;
scale = 22;
timelinestart = 6;
var timelinestart2 = timelinestart;
function start(){
    if(scale>=4*maxscale/5){
        timedisplay = true;
        halftimedisplay = true;
        timeminutedisplay = true;
        timefontsize = scale/2.5;
        timeheight = scale/10;
        timewidth = 2*scale/5;
    }else if(scale>=3*maxscale/5){
        timedisplay = false;
        halftimedisplay = true;
        timeminutedisplay = true;
        timeheight = scale/15;
        timewidth = 1.5*scale/5;
        timefontsize = scale/2.5;
    }else if(scale>=2*maxscale/5){
        timedisplay = false;
        halftimedisplay = false;
        timeminutedisplay = true;
        timeheight = scale/15;
        timewidth = scale/5;
        timefontsize = scale/2.4;
    }else if(scale>=1*maxscale/5){
        timedisplay = false;
        halftimedisplay = false;
        timeminutedisplay = false;
        timeheight = scale/15;
        timewidth = scale/5;
        timefontsize = scale/2;
    }
    settimelinesize()
}
function settimelinesize(){
    timelinestart = timelinestart2;
    for (let i = 0; i < 24; i++) {
        theid = "timeline"+String(i+1);
        random = String(12*timemargin*i) + "px";
        document.getElementById(theid).style.top = random;
        for (let p = 1; p < 13; p++) {
            theid = "timelinedraw"+alph[i]+String(p);
            document.getElementById(theid).style.position = "absolute";
            document.getElementById(theid).style.backgroundColor = "black";
            document.getElementById(theid).style.borderRadius = "5px";
            document.getElementById(theid).style.transform = "translateX(-50%)";
            if(timeminutedisplay == true){
                document.getElementById(theid).style.display = "block";
            }else{
                if(p == 1){
                    document.getElementById(theid).style.display = "block";
                }else{
                    document.getElementById(theid).style.display = "none";
                }    
            }
            random = String(timewidth)+"px";
            document.getElementById(theid).style.width = random;
            random = String(timeheight)+"px";
            document.getElementById(theid).style.height = random;
            random = String((p-1)*timemargin)+"px";
            document.getElementById(theid).style.marginTop = random;
            theid = theid + "num";
            if(timedisplay == true || p==1){
                document.getElementById(theid).style.display = "block";
            }else{
                if(halftimedisplay==true && p==7){
                    document.getElementById(theid).style.display = "block";
                }else{
                    document.getElementById(theid).style.display = "none";
                }
            }
            document.getElementById(theid).style.position = "absolute";
            document.getElementById(theid).style.color = "#4D5226";
            document.getElementById(theid).style.transform = "translateX(-50%)";
            random = setminutes(p-1);
            if((p == 1 && i<12-timelinestart2) || (p==1 && i>=24-timelinestart2)){
                random = random + " AM";
            }else if(p==1 && i>=12-timelinestart2){
                random = random + " PM";
            }
            document.getElementById(theid).innerHTML = random;
            random = "translate("+ String(timewidth*2) + "px, calc(-50% + " + String(timeheight) + "px))";
            document.getElementById(theid).style.transform = random;
            random = String(timefontsize) +"px";
            document.getElementById(theid).style.fontSize = random;
            if(p==1){
                random = "0px";
            }else{
                random = String((p-1)*timemargin-timeheight/2)+"px";
            }
            document.getElementById(theid).style.marginTop = random;
        }
        theid = "timelinedraw"+alph[i]+"13";
        if(scale>=1*maxscale/5 || scale<2*maxscale/5){
            random = String(timewidth/2)+"px";
        }else{
            random = String(2*timeheight/3)+"px";
        }
        document.getElementById(theid).style.width = random;
        random = String(12*timemargin)+"px";
        document.getElementById(theid).style.height = random;
        theid = "timelinedraw"+alph[i]+"1";
        random = String(2*timewidth)+"px";
        document.getElementById(theid).style.width = random;
        random = String(2*timeheight)+"px";
        document.getElementById(theid).style.height = random;
        theid = theid + "num";
        document.getElementById(theid).style.fontWeight = "bolder";
        random = String(timefontsize*2)+"px";
        document.getElementById(theid).style.fontSize = random;
        theid = "timelinedraw"+alph[i]+"7";
        random = String(3*timewidth/2)+"px";
        document.getElementById(theid).style.width = random;
        theid = theid + "num";
        document.getElementById(theid).style.fontWeight = "bold";
        if(halftimedisplay==true ||timedisplay == false){
            random = String(timefontsize*1)+"px";
        }else{
            random = String(timefontsize*1.5)+"px";
        }
        
        document.getElementById(theid).style.fontSize = random;
        timelinestart += 1;
    }
    theid = "timelinedrawX14"
    document.getElementById(theid).style.position = "absolute";
    document.getElementById(theid).style.backgroundColor = "black";
    document.getElementById(theid).style.borderRadius = "5px";
    document.getElementById(theid).style.transform = "translateX(-50%)";
    random = String(2*timewidth)+"px";
    document.getElementById(theid).style.width = random;
    random = String(2*timeheight)+"px";
    document.getElementById(theid).style.height = random;
    random = String(12*timemargin) + "px";
    document.getElementById(theid).style.top = random;
    locate_current_time_indicator();
}

function setminutes(x){
    var result;
    var timeline12AM = false;
    if(timelinestart>24){
        timelinestart -= 24;
    }else if(timelinestart>12){
        timelinestart -= 12
    }else if(timelinestart == 0){
        timeline12AM = true;
        timelinestart = 12
    }    
    if(x>1){
        result = (String(timelinestart)+":"+String(x*5));
    }
    else{
        result = (String(timelinestart)+":0"+String(x*5));
    }
    if(timeline12AM == true){
        timelinestart = 0
    }
    return result;
}

function timelinesize(){
    random = String(document.getElementById("timesizeinput").value)+"%";
    document.getElementById("sizevalue").innerHTML = random;
    scale = 10 + 40*(document.getElementById("timesizeinput").value)/100;
    timemargin = scale/5 + scale*(document.getElementById("timesizeinput").value)/125;
    start();
    if(dontcallonload == false){
        adjustactivitysizes(false);
    }else{
        dontcallonload = false;
    } 
    window.clearTimeout();
    locate_current_time_indicator(); 
    document.getElementById("current_time").style.transition = "none";
    if(iseditoractive){
        random2 = "translateX(-"+String((window.innerWidth*15/100)+document.getElementById("current_time").offsetWidth/2)+"px)";
    }else{
        random2 = "translateX(-"+String(document.getElementById("current_time").offsetWidth/2)+"px)";
    }
    document.getElementById("current_time").style.transform = random2; 
    document.getElementById("current_time").style.transition = "transform 1.2s cubic-bezier(0.47, 0.07, 0.78, 1.14)";
}

function bringeditor(){
    document.querySelector(".favoritesfordisplay").style.display = "none";
    if(currentactivityid == ""){
        document.querySelector(".favoriteactivities").style.display = "block";
        input1onfocus = false;
        inputstyle1mouseout();
        input2onfocus = false;
        inputstyle2mouseout();
    }else{
        document.getElementById("favoriteactivities").style.display = "none";
    }
    iseditoractive = true;
    importancevalue = 5;
    lovehatevalue = 5;
    thelastactivityid = '';
    timeliststart = "";
    timelistend = "";
    document.querySelector('.favoritesfordisplay').style.display = "none";
    random = "translateX("+String(4*(document.getElementById("nav").offsetWidth)/10)+"px)";
    document.getElementById("navselector").style.transform = random;
    document.getElementById("navselector2").style.transform = random;
    document.getElementById("editingtool").style.transform = "translateX(-51vw)";
    movetimeline(16);
    randomcolor();
}

function movetimeline(distance){
    random2 = "translateX(-"+String((window.innerWidth*distance/100)+document.getElementById("current_time").offsetWidth/2)+"px)";
    document.getElementById("current_time").style.transform = random2;
    distance = "translateX(-"+String(distance)+"vw)";
    for (let i = 1; i < 25; i++){
        theid = "timeline"+String(i);
        document.getElementById(theid).style.transform = distance;
    }
}

function hideeditor(isthisreset){
    if(isthisreset == false && currentactivityid != "" && startid != ''){
        document.getElementById(startid).style.height = "0px";
        document.getElementById(startid).style.width = "0px";
        document.getElementById(startid).innerHTML = "";
    }
    if(isthisreset == false && currentactivityid != ""){
        timelistid[currentactivityindex] = currentactivityid;
        timelist[currentactivityindex*2] = starttimefrommemory;
        timelist[currentactivityindex*2+1] = endtimefrommemory; 
        builtactivity(starttimefrommemory, endtimefrommemory, true, currentactivityindex);
        random2 = findthergb(true);
        document.getElementById(currentactivityid).style.backgroundColor = random2;
    }
    if(thelastactivityid != "" && isthisreset == false && currentactivityid == ""){
        document.getElementById(thelastactivityid).style.height = "0px";
        document.getElementById(thelastactivityid).style.width = "0px";
        document.getElementById(thelastactivityid).innerHTML = "";
    }
    document.getElementById("editingtool").style.transform = "translateX(50vw)";
    random = "translateX("+ String(document.querySelector(".timelinedrawA1").offsetWidth/2)+"px)";
    movetimeline(0);
    document.getElementById("bringeditor").style.right = "2%";
    refresheditor();
    currentactivityindex = "";
    currentactivityid = "";
    deletetheactivitieswithoutids();
    timeliststart = "";
    timelistend = "";
    thelastactivityid= "";
    timeisvalid = false;
    iseditoractive = false;
}

function inputstyle1(){
    document.getElementById("inputlabel1").style.top = "-22px";
    document.getElementById("inputlabel1").style.fontWeight = "bold";
    input1onfocus = true;
}
input1onfocus = false;
function inputstyle1mouseover(){
    if(input1onfocus == false){
        document.getElementById("inputlabel1").style.top = "-22px";
        document.getElementById("inputlabel1").style.fontWeight = "bold";
    }
}
function inputstyle1mouseout(){
    if(input1onfocus == false){
        document.getElementById("inputlabel1").style.top = "7px";
        document.getElementById("inputlabel1").style.fontWeight = "normal";
    }
}

function inputstyle1reverse(){
    random = document.getElementById("input-text1").value;
    if(random.length > 0){
        document.getElementById("inputlabel1").style.top = "-22px";
        document.getElementById("inputlabel1").style.fontWeight = "bold";
    }else{
        document.getElementById("inputlabel1").style.top = "7px";
        document.getElementById("inputlabel1").style.fontWeight = "normal";
        input1onfocus = false;
    }
}

function inputstyle2(){
    document.getElementById("inputlabel2").style.top = "-22px";
    document.getElementById("inputlabel2").style.fontWeight = "bold";
    input2onfocus = true;
}
input2onfocus = false;
function inputstyle2mouseover(){
    if(input2onfocus == false){
        document.getElementById("inputlabel2").style.top = "-22px";
        document.getElementById("inputlabel2").style.fontWeight = "bold";
    }
}
function inputstyle2mouseout(){
    if(input2onfocus == false){
        document.getElementById("inputlabel2").style.top = "7px";
        document.getElementById("inputlabel2").style.fontWeight = "normal";
    }
}

function inputstyle2reverse(){
    random = document.getElementById("input-text2").value;
    if(random.length > 0){
        document.getElementById("inputlabel2").style.top = "-22px";
        document.getElementById("inputlabel2").style.fontWeight = "bold";
    }else{
        document.getElementById("inputlabel2").style.top = "7px";
        document.getElementById("inputlabel2").style.fontWeight = "normal";
        input2onfocus = false;
    }
}

var ther, theg, theb;
function findthergb(isithide){
    if (isithide == false) {
        random = document.getElementById("colorselector").value; 
    }else{
        random = timelistcolors[currentactivityindex];
    }
    if(random<255){
        ther = 255;
        theg = random;
        theb = 0;
    }else if(random<510){
        ther = 510-random;
        theg = 255;
        theb = 0;
    }else if(random<765){
        ther = 0;
        theg = 255;
        theb = random - 510;
    }else if(random<1020){
        ther = 0;
        theg = 1020 - random;
        theb = 255;
    }else if(random<1275){
        ther = random - 1020;
        theg = 0;
        theb = 255;
    }else{
        ther = 255;
        theg = 0;
        theb = 1530 - random;
    }
    random2 = "rgb("+String(ther)+","+String(theg)+","+String(theb)+")";
    if (isithide == false) {
        document.getElementById("colorbox").style.backgroundColor = random2;
        if(timeliststart != '' && timelistend != ''){
            builtactivity(timeliststart, timelistend, false, 0);
        }
    }else{
        return random2;
    } 
}

function findthevalueofrgb(rgb){
    var r,g,b,result;
    r = rgb[4];
    g = rgb[6];
    b = rgb[8];
    result = 0;
    if(r == 255 && b == 0){
        result = g;
    }else if(g == 255 && b == 0){
        result = 510-r;
    }else if(g == 255 && r == 0){
        result = 510+b;
    }else if(b == 255 && r == 0){
        result = 1020-g;
    }else if(b == 255 && g == 0){
        result = 1020+r;
    }else if(r == 255 && g == 0){
        result = 1530-b;
    }
    return result;
}

function randomcolor(){
    random = getRandomInt(0,1531);
    document.getElementById("colorselector").value = random;
    findthergb(false);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

function part1(){
    navtranslatex(0);
}
function part2(){
    navtranslatex(1);
}
function part3(){
    navtranslatex(2);
}
function part4(){
    navtranslatex(3);
}
function part5(){
    navtranslatex(4);
}
function part6(){
    navtranslatex(5);
}
function part7(){
    navtranslatex(6);
}
function part8(){
    navtranslatex(7);
}
function part9(){
    navtranslatex(8);
}
function part10(){
    navtranslatex(9);
}
var lastx = 4;
function lastpart(){
    navtranslatex(lastx);
}
function par1(){
    navtranslatex(0);
    lastx = 0;
    lovehatevalue = 1;
}
function par2(){
    navtranslatex(1);
    lastx = 1;
    lovehatevalue = 2;
}
function par3(){
    navtranslatex(2);
    lastx = 2;
    lovehatevalue = 3;
}
function par4(){
    navtranslatex(3);
    lastx = 3;
    lovehatevalue = 4;
}
function par5(){
    navtranslatex(4);
    lastx = 4;
    lovehatevalue = 5;
}
function par6(){
    navtranslatex(5);
    lastx = 5;
    lovehatevalue = 6;
}
function par7(){
    navtranslatex(6);
    lastx = 6;
    lovehatevalue = 7;
}
function par8(){
    navtranslatex(7);
    lastx = 7;
    lovehatevalue = 8;
}
function par9(){
    navtranslatex(8);
    lastx = 8;
    lovehatevalue = 9;
}
function par10(){
    navtranslatex(9);
    lastx = 9;
    lovehatevalue = 10;
}

function navtranslatex(x){
    var randy;
    randy = (document.getElementById("nav").offsetWidth)/10;
    x = "translateX("+String(x*randy)+"px)";
    document.getElementById("navselector").style.transform = x;
}

function part12(){
    navtranslatex2(0);
}
function part22(){
    navtranslatex2(1);
}
function part32(){
    navtranslatex2(2);
}
function part42(){
    navtranslatex2(3);
}
function part52(){
    navtranslatex2(4);
}
function part62(){
    navtranslatex2(5);
}
function part72(){
    navtranslatex2(6);
}
function part82(){
    navtranslatex2(7);
}
function part92(){
    navtranslatex2(8);
}
function part102(){
    navtranslatex2(9);
}
var lastx2 = 4;
function lastpart2(){
    navtranslatex2(lastx2);
}
function par12(){
    navtranslatex2(0);
    lastx2 = 0;
    importancevalue = 1;
}
function par22(){
    navtranslatex2(1);
    lastx2 = 1;
    importancevalue = 2;
}
function par32(){
    navtranslatex2(2);
    lastx2 = 2;
    importancevalue = 3;
}
function par42(){
    navtranslatex2(3);
    lastx2 = 3;
    importancevalue = 4;
}
function par52(){
    navtranslatex2(4);
    lastx2 = 4;
    importancevalue = 5;
}
function par62(){
    navtranslatex2(5);
    lastx2 = 5;
    importancevalue = 6;
}
function par72(){
    navtranslatex2(6);
    lastx2 = 6;
    importancevalue = 7;
}
function par82(){
    navtranslatex2(7);
    lastx2 = 7;
    importancevalue = 8;
}
function par92(){
    navtranslatex2(8);
    lastx2 = 8;
    importancevalue = 9;
}
function par102(){
    navtranslatex2(9);
    lastx2 = 9;
    importancevalue = 10;
}

function navtranslatex2(x){
    var randy;
    randy = (document.getElementById("nav").offsetWidth)/10;
    x = "translateX("+String(x*randy)+"px)";
    document.getElementById("navselector2").style.transform = x;
}
function converttimeintominutes(x){
    for(let i = 0; i < 5; i++){
        if(i==0){
            random = parseInt(x[i])*600; 
        }else if(i == 1){
            random += parseInt(x[i])*60;
        }else if(i == 3){
            random += parseInt(x[i])*10;
        }else if(i == 4){
            random += parseInt(x[i]);
        }
    }
    random = random - timelinestart*60;
    if(random<0){
        random = random + 1440;
    }
    return random;
}
namecheck = false;
function newactivityname(){
    random = document.getElementById("input-text1");
    if(random && random.value){
        namecheck = true;
        document.getElementById("input-text1").style.boxShadow = "none";
    }else{
        namecheck = false;
    }
}

function deletecurrentactivity(){
    document.getElementById(currentactivityid).style.height = "0px";
    document.getElementById(currentactivityid).style.width = "0px";
    document.getElementById(currentactivityid).innerHTML = "";
}

starttimecheck = false;
function starttimechange(){
    var result;
    if(currentactivityid != ""){
        deletecurrentactivity();
    }
    random2 = converttimeintominutes(document.getElementById("starttimepicker").value);
    if(istimevalid(random2)==false){
        timeisvalid = false;
        starttimecheck = false;
        document.getElementById("starttimepicker").style.boxShadow = "0 0 5px rgb(97, 16, 16),0 0 6px rgba(153, 24, 24, 0.962),0 0 8px rgb(215, 36, 36),0 0 12px rgb(247, 15, 15)";
    }else{
        document.getElementById("starttimepicker").style.boxShadow = "none";
        starttimecheck = true;
    }
    if(istimevalid(random2)==true){
        timeliststart = random2;
        random = document.getElementById("endtimepicker");
        if(random && random.value){
            if(timeliststart==timelistend || istimeintervalvalid(timeliststart,timelistend) == false || timeliststart>timelistend || timelistend-timeliststart<5){
                timeisvalid = false;
                document.getElementById("starttimepicker").style.boxShadow = "0 0 5px rgb(97, 16, 16),0 0 6px rgba(153, 24, 24, 0.962),0 0 8px rgb(215, 36, 36),0 0 12px rgb(247, 15, 15)";
            }
            else{
                timeisvalid = true;
                builtactivity(timeliststart,timelistend, false, 0);
                document.getElementById("endtimepicker").style.boxShadow = "none";
            }
        }
    }else{
        timeisvalid = false;
    }
}
endtimecheck = false;
function endtimechange(){
    var result;
    if(currentactivityid != ""){
        deletecurrentactivity();
    }
    random2 = converttimeintominutes(document.getElementById("endtimepicker").value);
    if(istimevalid(random2)==false){
        document.getElementById("endtimepicker").style.boxShadow = "0 0 5px rgb(97, 16, 16),0 0 6px rgba(153, 24, 24, 0.962),0 0 8px rgb(215, 36, 36),0 0 12px rgb(247, 15, 15)";
        timeisvalid = false;
        endtimecheck = false;
    }else{
        document.getElementById("endtimepicker").style.boxShadow = "none";
        endtimecheck = true;
    }
    if(istimevalid(random2)==true){
        timelistend = random2;
        random = document.getElementById("starttimepicker");
        if(random && random.value){
            if(timeliststart==timelistend || istimeintervalvalid(timeliststart,timelistend) == false || timeliststart>timelistend || timelistend-timeliststart<5){
                timeisvalid = false;
                document.getElementById("endtimepicker").style.boxShadow = "0 0 5px rgb(97, 16, 16),0 0 6px rgba(153, 24, 24, 0.962),0 0 8px rgb(215, 36, 36),0 0 12px rgb(247, 15, 15)";}
            else{
                timeisvalid = true;
                builtactivity(timeliststart,timelistend, false, 0);
                document.getElementById("starttimepicker").style.boxShadow = "none";
            }
        }
        }else{
            timeisvalid = false;
        }
} 

function istimevalid(time){
    var closest, iclosest;
    closest = 1441;
    iclosest = 0;
    for(let i = 0; i < timelist.length-1; i += 2){
        if(timelist[i]>closest && time > timelist[i]){
            iclosest = i;
            closest = timelist[i];
        }
    }
    if(timelist[iclosest+1]>time){
        return false;
    }else{
        return true
    }
}

function istimeintervalvalid(start, end){
    var result;
    result = true;
    for(let i = 0; i < timelist.length; i ++){
        if(timelist[i]>start && timelist[i]<end){
            result = false;
        }else if(start == timelist[i] && i%2 == 0){
            result = false;
        }
    }
    return result;
}

function refresheditor(){
    document.getElementById("starttimepicker").style.boxShadow = "none";
    document.getElementById("endtimepicker").style.boxShadow = "none";
    document.getElementById("input-text1").style.boxShadow = "none";
    document.getElementById("input-text1").value = "";
    document.getElementById("input-text2").value = "";
    document.getElementById("starttimepicker").value = "";
    document.getElementById("endtimepicker").value = "";
    par52();
    par5();
}

function resetedittool(isitsave){
    var randy;
    refresheditor();
    if(thelastactivityid != '' && currentactivityid == ""){
        document.getElementById(thelastactivityid).style.height = "0px";
        document.getElementById(thelastactivityid).style.width = "0px";
        document.getElementById(thelastactivityid).style.backgroundColor = "white";
        document.getElementById(thelastactivityid).innerHTML = "";
    }
    timeisvalid = false;
    timeliststart = 0;
    timelistend = 0;
    if (currentactivityid != "" && isitsave == false) {
        document.getElementById(currentactivityid).style.height = "0px";
        document.getElementById(currentactivityid).style.width = "0px";
        document.getElementById(currentactivityid).style.backgroundColor = "white";
        document.getElementById(currentactivityid).innerHTML = "";
        document.getElementById(activityidfrommemory).innerHTML = "";
        if (startid != "") {
            document.getElementById(startid).style.height = "0px";
            document.getElementById(startid).style.width = "0px";
            document.getElementById(startid).style.backgroundColor = "white";
            document.getElementById(startid).innerHTML = "";
        }
        randy = currentactivityindex;
        totalLikes[totalLikes.length - (16-day_number)] -= timelistlike[randy];
        totalImportance[totalImportance.length - (16-day_number)] -= timelistimportance[randy];
        timelist.splice(randy*2+1, 1);
        timelist.splice(randy*2, 1);
        timelistcolors.splice(randy, 1);
        timelistnames.splice(randy, 1);
        timelistdescriptions.splice(randy, 1);
        timelistid.splice(randy, 1);
        timelistimportance.splice(randy, 1);
        timelistlike.splice(randy, 1);
        timelistcompletion.splice(randy, 1);
        totalActivities[totalActivities.length - (16-day_number)] = timelistnames.length-1;
        window.adjustActivities();
        random = 'timelist'+String(day_number);
        localStorage.setItem(random, JSON.stringify(timelist));
        random = 'timelistnames'+String(day_number);
        localStorage.setItem(random, JSON.stringify(timelistnames));
        random = 'timelistcolors' + String(day_number);
        localStorage.setItem(random, JSON.stringify(timelistcolors));
        random = 'timelistdescriptions' + String(day_number);
        localStorage.setItem(random, JSON.stringify(timelistdescriptions));
        random = 'timelistimportance' + String(day_number);
        localStorage.setItem(random, JSON.stringify(timelistimportance));
        random = 'timelistlike' + String(day_number);
        localStorage.setItem(random, JSON.stringify(timelistlike));
        random = 'timelistid' + String(day_number);
        localStorage.setItem(random, JSON.stringify(timelistid));
        random = 'timelistcompletion' + String(day_number);
        localStorage.setItem(random, JSON.stringify(timelistcompletion));
        localStorage.setItem("isCompleted", JSON.stringify(isCompleted));
        hideeditor(true);
    }
}
timeisvalid = false;
function saveediting(){
    var randy, randy2, randy3;
    timeisvalid = false;
    if (currentactivityid == "") {
        if(theidforsave != ''){
            timelistid.push(theidforsave);
            theidforsave = '';
        }
        document.getElementById("endtimepicker").style.boxShadow = "none";
        document.getElementById("starttimepicker").style.boxShadow = "none";
        timelist.push(timeliststart);
        timelist.push(timelistend);
        random = document.getElementById("colorselector").value;
        timelistcolors.push(random);
        random = document.getElementById("input-text1").value;
        timelistnames.push(random);
        random = document.getElementById("input-text2").value;
        timelistdescriptions.push(random);
        timelistimportance.push(importancevalue);
        timelistlike.push(lovehatevalue);
        timelistcompletion.push(0);
        totalActivities[totalActivities.length - (16-day_number)] = timelistnames.length-1;
        totalLikes[totalLikes.length - (16-day_number)] += lovehatevalue;
        totalImportance[totalImportance.length - (16-day_number)] += importancevalue;
    }else{
        currentactivityid = timelistid[currentactivityindex];
        randy = currentactivityindex;
        randy3 = false;
        randy2 = document.getElementById("input-text1").value;
        if(timelistnames[randy] != randy2){
            randy3 = true;
        }
        randy2 = document.getElementById("input-text2").value;
        if(timelistdescriptions[randy] != randy2){
            randy3 = true;
        }
        randy2 = document.getElementById("colorselector").value;
        if(timelistcolors[randy] != randy2){
            randy3 = true;
        }
        randy2 = converttimeintominutes(document.getElementById("starttimepicker").value);
        if(starttimefrommemory != randy2){
            randy3 = true;
        }
        randy2 = converttimeintominutes(document.getElementById("endtimepicker").value);
        if(endtimefrommemory != randy2){
            randy3 = true;
        }
        randy2 = importancevalue;
        if(timelistimportance[randy] != randy2){
            randy3 = true;
            totalImportance[totalImportance.length - (16-day_number)] -= timelistimportance[randy];
            totalImportance[totalImportance.length - (16-day_number)] += importancevalue;
        }
        randy2 = lovehatevalue;
        if(timelistlike[randy] != randy2){
            randy3 = true;
            totalLikes[totalLikes.length - (16-day_number)] -= timelistlike[randy];
            totalLikes[totalLikes.length - (16-day_number)] += lovehatevalue;
        }
        if (randy3 == true) {
            timelistid[currentactivityindex] = currentactivityid;
            randy2 = document.getElementById("input-text1").value;
            timelistnames[randy] = randy2;
            document.getElementById(currentactivityid).innerHTML = randy2;
            randy2 = document.getElementById("input-text2").value;
            timelistdescriptions[randy] = randy2;
            randy2 = document.getElementById("colorselector").value;
            findthergb(false);
            timelistcolors[randy] = randy2;
            randy2 = converttimeintominutes(document.getElementById("starttimepicker").value);
            starttimefrommemory = randy2;
            randy2 = converttimeintominutes(document.getElementById("endtimepicker").value);
            endtimefrommemory = randy2;
            randy2 = importancevalue;
            timelistimportance[randy] = randy2;
            randy2 = lovehatevalue;
            timelistlike[randy] = randy2;
        }
        randy = timelistid.indexOf[currentactivityid];
        timelist[currentactivityindex*2] = starttimefrommemory;
        timelist[currentactivityindex*2+1] = endtimefrommemory; 
    }
    if(currentactivityid == ""){
        random = document.getElementById("input-text1").value;
        document.getElementById(thelastactivityid).innerHTML = random;
    }
    thelastactivityid = "";
    resetedittool(true);
    hideeditor(true);
    window.adjustActivities();
    random = 'timelist'+String(day_number);
    localStorage.setItem(random, JSON.stringify(timelist));
    random = 'timelistnames'+String(day_number);
    localStorage.setItem(random, JSON.stringify(timelistnames));
    random = 'timelistcolors'+String(day_number);
    localStorage.setItem(random, JSON.stringify(timelistcolors));
    random = 'timelistdescriptions'+String(day_number);
    localStorage.setItem(random, JSON.stringify(timelistdescriptions));
    random = 'timelistimportance'+String(day_number);
    localStorage.setItem(random, JSON.stringify(timelistimportance));
    random = 'timelistlike'+String(day_number);
    localStorage.setItem(random, JSON.stringify(timelistlike));
    random = 'timelistid'+String(day_number);
    localStorage.setItem(random, JSON.stringify(timelistid));
    random = 'timelistcomplition'+String(day_number);
    localStorage.setItem(random, JSON.stringify(timelistcompletion));
    localStorage.setItem("isCompleted", JSON.stringify(isCompleted));
    adjustactivitysizes();
}


var startid = "", thelastactivityid = '';
var theidforsave = '';
var  stop;
function builtactivity(start, end, isitinmemory, positioninthelist){
    startid = '';
    if(isitinmemory == false){
        if(timelistid.includes(thelastactivityid) != true && thelastactivityid != ''){
            document.getElementById(thelastactivityid).style.height = "0px";
            document.getElementById(thelastactivityid).style.width = "0px";
            document.getElementById(thelastactivityid).style.backgroundColor = "white";
            document.getElementById(thelastactivityid).innerHTML = "";
        }
        random2 =  (start - start%60)/60;
        for(let i = 1; i < 5; i ++){
            theid = "activitystart"+alph[random2]+String(i);
            if(timelistid.includes(theid) != true || theid == currentactivityid){
                startid = theid;
                stop = false;
                break;
            }else{
                if(i == 4){
                    alerttheuser("You cannot add more than 4 activities in a single hour!");
                    stop = true;
                    timeisvalid = false;
                }
            }
        }
    }else{
        stop = false;
        theid = timelistid[positioninthelist];
    }
    if(theid != currentactivityid){
        timelistid[currentactivityindex] = theid;
    }
    if(stop == false){
        thelastactivityid = theid;
        document.getElementById(theid).style.position = "absolute";
        document.getElementById(theid).style.borderRadius = "15px 0% 0% 15px";
        document.getElementById(theid).style.display = "flex";
        document.getElementById(theid).style.alignItems = "center";
        document.getElementById(theid).style.justifyContent = "center";
        document.getElementById(theid).style.fontWeight = "bold";
        random = String(Math.abs(start - end)*timemargin/5)+"px";
        document.getElementById(theid).style.height = random;
        document.getElementById(theid).style.width = "200px";
        if(scale>=1*maxscale/5 || scale<2*maxscale/5){
            random = timewidth/4;
        }else{
            random = timeheight/3;
        }
        random = "translate(-"+String(200 + random)+"px,"+String((start%60)*timemargin/5)+"px)";
        document.getElementById(theid).style.transform = random;
        if(isitinmemory == true){
            random = timelistnames[positioninthelist];
            document.getElementById(theid).innerHTML = random;
            random = timelistcolors[positioninthelist];
        }else{
            random = document.getElementById("colorbox").style.backgroundColor;
        }
        document.getElementById(theid).style.backgroundColor = random;
    }
    if(isitinmemory == true){
    }
    theidforsave = theid;
}
function adjustactivitysizes(isitsave){
    thelastactivityid = '';
    for(let i = 2; i < timelist.length-1; i += 2){
            builtactivity(timelist[i], timelist[i+1], true, i/2);
    }
    adjustbackgroundcolors();
    if(isitsave == false){
        builtactivity(timeliststart, timelistend, false, 0);
    }
}

var currentsituation;
function alerttheuser(message){
    document.getElementById("alertbox").style.display = "block";
    document.getElementById("alertboxtext").innerHTML = message;
}

var allactivities;
function bringactivityinfo(){
    allactivities = document.querySelectorAll('.activity');
    for (i of allactivities) {
        i.addEventListener('click', function() {
            if(timelistid.includes(this.id) == true && iseditoractive == false){
                currentactivityid = this.id;
                bringeditor();
                inputstyle1mouseover();
                input1onfocus = true;
                activityidfrommemory = this.id;
                random = timelistid.indexOf(this.id);
                currentactivityindex = random;
                random2 = timelistnames[random];
                document.getElementById("input-text1").value = random2;
                random2 = timelistdescriptions[random];
                if(random2 != ""){
                    input2onfocus = true;
                    inputstyle2mouseover();
                }
                document.getElementById("input-text2").value = random2;
                random2 = convertminutesintotime(timelist[random*2]);
                starttimefrommemory = timelist[random*2];
                timeliststart = starttimefrommemory;
                document.getElementById("starttimepicker").value = random2;
                timelist[random*2] = -1;
                random2 = convertminutesintotime(timelist[random*2+1]);
                endtimefrommemory = timelist[random*2+1];
                timelistend = endtimefrommemory;
                document.getElementById("endtimepicker").value = random2;
                timelist[random*2+1] = -1;
                random2 = timelistlike[random];
                navtranslatex(random2-1);
                lastx = random2-1;
                lovehatevalue = random2;
                random2 = timelistimportance[random];
                navtranslatex2(random2-1);
                lastx2 = random2-1;
                importancevalue = random2;
                random2 = timelistcolors[random];
                colorfrommemory = random2;
                document.getElementById("colorselector").value = random2;
                findthergb(false);
                document.getElementById("colorbox").style.backgroundColor = random2;
                timeisvalid =true;
            }
        });    
    }
}
 function convertminutesintotime(time){
    var result;
    time = time + timelinestart*60;
    if(time>1440){
        time = time - 1440;
    }
    if(time%60<10){
        result = '0' + String(time%60);
    }else{
        result = String(time%60);
    }
    result = ':'+result;
    if(String((time-time%60)/60)<10){
        result = '0' + String((time-time%60)/60)+ result;
    }else{
        result = String((time-time%60)/60)+ result;
    }
    return result;
 }

var onefavorite;
var favoriteindicator = "";

function fav1(){
    favoriteindicator = "fav1";
}
function fav2(){
    favoriteindicator = "fav2";
}
function fav3(){
    favoriteindicator = "fav3";
}
function fav4(){
    favoriteindicator = "fav4";
}
function fav5(){
    favoriteindicator = "fav5";
}
var deletefavoriteactive;
var allactivityids = [];
function adjustbackgroundcolors(){
    let randy;
    for(i of timelistid){
        if (i != 0) {
            randy = timelistid.indexOf(i);
            randy = timelistcolors[randy];
            randy = valueconversionforcolor(randy);
            document.getElementById(i).style.backgroundColor = randy; 
        }
    }
}

function valueconversionforcolor(colorvalue){
    random = colorvalue
    if(random<255){
        ther = 255;
        theg = random;
        theb = 0;
    }else if(random<510){
        ther = 510-random;
        theg = 255;
        theb = 0;
    }else if(random<765){
        ther = 0;
        theg = 255;
        theb = random - 510;
    }else if(random<1020){
        ther = 0;
        theg = 1020 - random;
        theb = 255;
    }else if(random<1275){
        ther = random - 1020;
        theg = 0;
        theb = 255;
    }else{
        ther = 255;
        theg = 0;
        theb = 1530 - random;
    }
    random2 = "rgb("+String(ther)+","+String(theg)+","+String(theb)+")";
    return random2;
}

function dateright(){
    var elms = document.getElementsByClassName("day");
    day_number += 1;
    document.getElementById("triangle-left").style.display = "block";
    for (let i = 1; i < 16; i++){
        elms[i-1].style.border = "1px solid black";
    }
    elms[day_number-1].style.border = "4px solid red";
    if(day_number == 15){
        document.getElementById("triangle-right").style.display = "none";
    }
    if(current_day == daysOfMonths[months[current_month]]){
        current_month += 1;
        if (current_month == 12) {
            current_month = 0
        }
        current_day = 1;
    }else{
        current_day += 1;
    }
    month_to_display = months[current_month];
    random = String(month_to_display)+" "+String(current_day);
    adjust_date_position(random);
    dayNumberChange();
}

function dateleft(){
    var elms = document.getElementsByClassName("day");
    day_number -= 1;
    document.getElementById("triangle-right").style.display = "block";
    for (let i = 1; i < 16; i++){
        elms[i-1].style.border = "1px solid black";
    }
    elms[day_number-1].style.border = "4px solid red";
    if(day_number == 1){
        document.getElementById("triangle-left").style.display = "none";
    }
    if(current_day == 1){
        current_month -= 1;
        if (current_month == 0) {
            current_month = 12
        }
        current_day = daysOfMonths[months[current_month]];
    }else{
        current_day -= 1;
    }
    month_to_display = months[current_month];
    random = String(month_to_display)+" "+String(current_day);
    adjust_date_position(random);
    dayNumberChange();
}

var favoritenames = {};
var day_number = 8;
function adjustsomeproperties(){
    var randy3,randy5;
    adjust_date_position(get_current_date());
    document.querySelector(".current_time").style.display = "block";
    document.querySelector(".image_container > img").addEventListener("click", function(){
        window.location.href = "menu.html";
    });
    window.addEventListener('resize', function(event) {
        adjust_date_position(get_current_date());
    }, true);
    hamburger = document.querySelector(".hamburger");
    nav = document.querySelector(".subnavbar");
    container = document.querySelector(".content");
    var clickcounter = false;
    hamburger.onclick = function() {
        nav.classList.toggle("active");
        container.classList.toggle("active");
        document.querySelector(".button-63").style.display = "none";
        if(clickcounter){
            setTimeout(function(){
                document.querySelector(".button-63").style.display = "block";
            }, 190);
        }
        clickcounter = !clickcounter
    }
    document.querySelector(".settings_box > span").addEventListener("click", function(){
        document.querySelector(".black_box").style.display = "none";
        document.querySelector(".settings_box").style.display = "none";
    });
    randy3 = document.querySelectorAll(".settings");
    for (i of randy3) {
        i.addEventListener("click", function(){
            document.querySelector(".black_box").style.display = "block";
            document.querySelector(".settings_box").style.display = "block";
            hideeditor(false);
        });        
    }
    adjustactivitysizes(true);
    adjustbackgroundcolors();
    allactivities = document.querySelectorAll('.activity');
    onefavorite = document.querySelectorAll(".onefavorite");
    setFavoriteA();
    var favoritestar = document.querySelector(".favoritestar");
    favoritestar.addEventListener("mouseover", function(){
        if (currentactivityid == "") {
            document.querySelector(".favoritesfordisplay").style.display = "block";
            document.getElementById("deletefavorite").innerHTML = "delete";
            document.getElementById("deletefavorite").style.textShadow = "none";
            document.getElementById("deletefavorite").style.fontWeight = "normal";
            deletefavoriteactive = false;
        }
        });
    var randyforonefavorite = document.querySelector(".favoritesfordisplay");
    randyforonefavorite.addEventListener("mouseover", function(){
        document.querySelector(".favoritesfordisplay").style.display = "block";
    });
    randyforonefavorite.addEventListener("mouseout", function(){
        document.querySelector(".favoritesfordisplay").style.display = "none";
    });
    deletefavoriteactive = false;
    for(i of onefavorite){
        i.addEventListener("click", function(){
            if (deletefavoriteactive == false) {
                var randy, randy2;
                while (favoriteindicator == "") {
                }
                randy = favoriteindicator;
                favoriteindicator = "";
                randy = favoriteactivities.indexOf(randy);
                randy2 = favoriteactivities[randy+1];
                document.getElementById("input-text1").value = randy2;
                inputstyle1();
                randy2 = favoriteactivities[randy+2];
                document.getElementById("input-text2").value = randy2;
                if (randy2 != "") {
                    inputstyle2();
                }
                randy2 = favoriteactivities[randy+3];
                document.getElementById("starttimepicker").value = randy2;
                randy2 = converttimeintominutes(randy2);    
                starttimechange();
                randy2 = favoriteactivities[randy+4];
                document.getElementById("endtimepicker").value = randy2;
                randy2 = converttimeintominutes(randy2);           
                endtimechange();
                randy2 = favoriteactivities[randy+5];
                document.getElementById("colorselector").value = randy2;       
                findthergb(false);
                randy2 = favoriteactivities[randy+6];
                navtranslatex(randy2-1);
                lastx = randy2-1;
                lovehatevalue = randy2;           
                randy2 = favoriteactivities[randy+7];
                navtranslatex2(randy2-1);
                lastx2 = randy2-1;
                importancevalue = randy2; 
            }else{
                this.innerHTML = "";
                this.style.display = "none";
                delete favoritenames[this.id];
                random2 = favoriteactivities.indexOf(this.id);
                favoriteactivities.splice(random2+7,1);
                favoriteactivities.splice(random2+6,1);
                favoriteactivities.splice(random2+5,1);
                favoriteactivities.splice(random2+4,1);
                favoriteactivities.splice(random2+3,1);
                favoriteactivities.splice(random2+2,1);
                favoriteactivities.splice(random2+1,1);
                favoriteactivities.splice(random2,1);
            }
            window.setFavorites();
        });
    }
    document.getElementById("deletefavorite").addEventListener("click", function(){
        this.innerHTML = "-";
        this.style.fontWeight = "bold";
        this.style.textShadow = "0 0 5px rgb(97, 16, 16),0 0 6px rgba(153, 24, 24, 0.962),0 0 8px rgb(215, 36, 36),0 0 12px rgb(247, 15, 15)";
        deletefavoriteactive = true;
    });
    var randy4;
    for(i of onefavorite){
        i.addEventListener("mouseover", function(){
            if(deletefavoriteactive == true){
                this.style.backgroundColor = "red";
                this.innerHTML = "-";
            }
        });
        i.addEventListener("mouseout", function(){
            if(deletefavoriteactive == true){
                randy4 = favoritenames[this.id];
                this.innerHTML = randy4;
                this.style.backgroundColor = "white";
            }
        });
    }
    var elms = document.getElementsByClassName("day");
    day_number = 8;
    document.getElementById("triangle-left").addEventListener("click", dateleft);
    document.getElementById("triangle-right").addEventListener("click", dateright);
    document.getElementById("current_date").addEventListener("click", adjustDates);
    document.getElementById("hide_datebox").addEventListener("click", function(){
            document.getElementById("date_box").style.display = "none";
            document.querySelector(".black_box").style.display = "none";
        });
    for (i of elms) {
        i.addEventListener("click", function() {
            var the_count = this.id;
            var count = Math.abs(day_number-the_count);
            if (day_number>the_count) {
                for (let index = 0; index < count; index++) {
                    dateleft();
                }
            }else if(day_number<the_count){
                for (let index = 0; index < count; index++) {
                    dateright();
                }
            }                
        });
    }
    locate_current_time_indicator();
}

function get_date(myDate){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const daysOfMonths = {"January":31, "February":28, "March":31, "April":30, "May":31, "June":30, "July":31, "August":31, "September":30, "October":31, "November":30, "December":31}
    const month_abv = {"January":"JAN", "February":"FEB", "March":"MAR", "April":"APR", "May":"MAY", "June":"JUN", "July":"JUL", "August":"AUG", "September":"SEP", "October":"OCT", "November":"NOV", "December":"DEC"}
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth(); //January is 0!
    var yy = today.getFullYear();
    if(yy%4==0){
        daysOfMonths["February"] = 29;
    }
    var current_mm = mm;
    if(dd+myDate<=0){
        while (dd+myDate<=0) {
            mm -= 1;
            if(mm == -1){
                mm = 11;
                yy -= 1;
                if(yy%4==0){
                    daysOfMonths["February"] = 29;
                }else{
                    daysOfMonths["February"] = 28;
                }
            }
            myDate += daysOfMonths[months[mm]];
        }
        dd = dd+myDate;
        mm = month_abv[months[mm]];
    }else if(dd+myDate>daysOfMonths[months[mm]]){
        while (dd+myDate>daysOfMonths[months[current_mm]]) {
            mm += 1;
            if(mm == 12){
                mm = 0;
                yy += 1
                if(yy%4==0){
                    daysOfMonths["February"] = 29;
                }else{
                    daysOfMonths["February"] = 28
                }
            }
            myDate -= daysOfMonths[months[mm]];
        }
        dd = dd+myDate;
        mm = month_abv[months[mm]];
    }else{
        dd = dd+myDate;
        mm = month_abv[months[mm]];
    }
    return [mm, String(dd), yy]
}

function adjustDates(){
    var elms = document.getElementsByClassName("day");
    var the_date;
    hideeditor(false);    
    document.querySelector(".black_box").style.display = "block";
    document.getElementById("date_box").style.display = "block";
    for (let i = 1; i < 16; i++) {
        the_date = get_date(i-8);
        random2 = the_date[0].charAt(0)+"<br>"+the_date[0].charAt(1)+"<br>"+the_date[0].charAt(2)+"<br><br>"+the_date[1];
        elms[i-1].innerHTML = random2;
        elms[i-1].style.border = "1px solid black";
    }
    elms[day_number-1].style.border = "4px solid red";
}


function addnewfavorite(){
    var spaceinmemory = false;
    var randy = true;
    for(i of onefavorite){
        if(!(favoriteactivities.includes(i.id))){
            spaceinmemory = true;
            if(isrequiredfilled() == false){
                alerttheuser("Please first fill the required fields.");
            }else{
                if(favoriteactivities.includes(document.getElementById("input-text1").value) == true){
                    if(favoriteactivities.indexOf(document.getElementById("input-text1").value)%8 == 1){
                        alerttheuser("You cannot use the same names for different favorite activities!");
                        randy = false;
                    }
                }
                if (randy == true) {
                    i.innerHTML = document.getElementById("input-text1").value;
                    i.style.display = "block";
                    favoriteactivities.push(i.id);
                    favoriteactivities.push(document.getElementById("input-text1").value);
                    favoriteactivities.push(document.getElementById("input-text2").value);
                    favoriteactivities.push(document.getElementById("starttimepicker").value);
                    favoriteactivities.push(document.getElementById("endtimepicker").value);
                    favoriteactivities.push(document.getElementById("colorselector").value);
                    favoriteactivities.push(lovehatevalue);
                    favoriteactivities.push(importancevalue);
                    document.getElementById("input-text1").style.boxShadow = "none";
                    favoritenames[i.id] = document.getElementById("input-text1").value;
                }
            }
            break;
        }
    }
    if(spaceinmemory == false){
        alerttheuser("There are maximum amount of favorites!");
    }
    document.querySelector(".favoritesfordisplay").style.display = "none";
    window.setFavorites();
}

function setFavoriteA(){
    var length = favoriteactivities.length/8;
    var count = 0;
    for(item of onefavorite){
        if(count<length){
            console.log("This is the id of the element",item.id);
            item.innerHTML = favoriteactivities[8*count+1];
            item.style.display = "block";
            favoritenames[favoriteactivities[8*count]] = document.getElementById("input-text1").value;
            count += 1;
        }
    }
}


function deletetheactivitieswithoutids(){
    for(i of allactivities){
        if(timelistid.includes(i.id) == false){
            i.innerHTML = "";
            i.style.height = "0px";
            i.style.width = "0px";
        }
    }
}

function isrequiredfilled(){
    var result = true;
    if(document.getElementById("input-text1").value == ""){
        document.getElementById("input-text1").style.boxShadow = "0 0 5px rgb(97, 16, 16),0 0 6px rgba(153, 24, 24, 0.962),0 0 8px rgb(215, 36, 36),0 0 12px rgb(247, 15, 15)";
        result = false;
    }
    if(document.getElementById("starttimepicker").value == ""){
        document.getElementById("starttimepicker").style.boxShadow = "0 0 5px rgb(97, 16, 16),0 0 6px rgba(153, 24, 24, 0.962),0 0 8px rgb(215, 36, 36),0 0 12px rgb(247, 15, 15)";
        result = false;
    }
    if(document.getElementById("endtimepicker").value == ""){
        document.getElementById("endtimepicker").style.boxShadow = "0 0 5px rgb(97, 16, 16),0 0 6px rgba(153, 24, 24, 0.962),0 0 8px rgb(215, 36, 36),0 0 12px rgb(247, 15, 15)";
        result = false;
    }
    return result;
}

function adjustfavoritedisplay(){
    for(i of onefavorite){
        if(i.innerHTML == ""){
            i.style.display = "none";
        }else{
            i.style.display = "block";
        }
    }
}

function areusuretodelete(){
    if(currentactivityid != ""){
        currentsituation = "delete";
        alerttheuser("Are you sure to delete this activity?");
    }else{
        resetedittool(false);
    }
}

function areusuretosave(){
    var randy3;
    if (stop == false) {
        if(timeisvalid == true && document.getElementById("input-text1").value != ""){
            if(currentactivityid != ""){
                var randy = currentactivityindex;
                var randy3 = false;
                var randy2 = document.getElementById("input-text1").value;
                if(timelistnames[randy] != randy2){
                    randy3 = true;
                }
                randy2 = document.getElementById("input-text2").value;
                if(timelistdescriptions[randy] != randy2){
                    randy3 = true;
                }
                randy2 = document.getElementById("colorselector").value;
                if(timelistcolors[randy] != randy2){
                    randy3 = true;
                }
                randy2 = converttimeintominutes(document.getElementById("starttimepicker").value);
                if(starttimefrommemory != randy2){
                    randy3 = true;
                }
                randy2 = converttimeintominutes(document.getElementById("endtimepicker").value);
                if(endtimefrommemory != randy2){
                    randy3 = true;
                }
                randy2 = importancevalue;
                if(timelistimportance[randy] != randy2){
                    randy3 = true;
                }
                randy2 = lovehatevalue;
                if(timelistlike[randy] != randy2){
                    randy3 = true;
                }
                if(randy3 == true){
                    currentsituation = "save";
                    alerttheuser("Save changes?");
                }else{
                    saveediting();
                }
            }else{
                saveediting();
            }
        }else{
            if(starttimecheck == false){
                document.getElementById("starttimepicker").style.boxShadow = "0 0 5px rgb(97, 16, 16),0 0 6px rgba(153, 24, 24, 0.962),0 0 8px rgb(215, 36, 36),0 0 12px rgb(247, 15, 15)";
            }
            if(endtimecheck == false){
                document.getElementById("endtimepicker").style.boxShadow = "0 0 5px rgb(97, 16, 16),0 0 6px rgba(153, 24, 24, 0.962),0 0 8px rgb(215, 36, 36),0 0 12px rgb(247, 15, 15)";
            }
            if(namecheck == false || document.getElementById("input-text1").value == ""){
                document.getElementById("input-text1").style.boxShadow = "0 0 5px rgb(97, 16, 16),0 0 6px rgba(153, 24, 24, 0.962),0 0 8px rgb(215, 36, 36),0 0 12px rgb(247, 15, 15)";
            }
        }
    }else{
        alerttheuser("You cannot add more than four activities in a single hour!");
    }
}

function alertboxbutton(){
    document.getElementById("alertbox").style.display = "none";
    if(currentsituation == "save"){
        saveediting();
    }else if(currentsituation == "delete"){
        resetedittool(false);
    }
    currentsituation = "";
}

function alertboxhide(){
    document.getElementById("alertbox").style.display = "none";
    currentsituation = "";
}

function deleteeveryactivity(deleteLocalStorage){
    timelist = [0,0];
    timelistcolors = [0];
    timelistnames = [0];
    timelistdescriptions = [0];
    timelistid = [0];
    timelistimportance = [0];
    timelistlike = [0];
    timelistcompletion = [0];
    totalActivities[totalActivities.length - (16-day_number)] = timelistnames.length-1;
    totalLikes[totalLikes.length - (16-day_number)] = 0;
    totalImportance[totalImportance.length - (16-day_number)] = 0;
    if (deleteLocalStorage) {
        window.adjustActivities();
        random = 'timelist'+String(day_number);
        localStorage.setItem(random, JSON.stringify([0, 0]));
        random = 'timelistnames'+String(day_number);
        localStorage.setItem(random, JSON.stringify([0]));
        random = 'timelistcolors'+String(day_number);
        localStorage.setItem(random, JSON.stringify([0]));
        random = 'timelistdescriptions'+String(day_number);
        localStorage.setItem(random, JSON.stringify([0]));
        random = 'timelistimportance'+String(day_number);
        localStorage.setItem(random, JSON.stringify([0]));
        random = 'timelistlike'+String(day_number);
        localStorage.setItem(random, JSON.stringify([0]));
        random = 'timelistid'+String(day_number);
        localStorage.setItem(random, JSON.stringify([0]));
        random = 'timelistcompletion'+String(day_number);
        localStorage.setItem(random, JSON.stringify([0]));
        if(day_number>8){
            isCompleted.splice(isCompleted.length-9+day_number,1)
            localStorage.setItem("isCompleted", JSON.stringify([isCompleted]));
        }
    }
    adjustactivitysizes(true);
    adjustbackgroundcolors();
    allactivities = document.querySelectorAll('.activity');
    for(i of allactivities){
        i.innerHTML = "";
        i.style.height = "0px";
    }
    }

function starttimechangeselector(){
    var x;
    x = document.getElementById("timelinestartselector").value;
    timelinestart = parseInt(x);
    localStorage.setItem("timeLineStart", x);
    window.setTimeLineStart();
    document.getElementById("timelinestartselector").selectedIndex = timelinestart;
    dontcallonload = true;
    timelinestart2 = timelinestart;
    timelinesize();
    deleteeveryactivity(true);
}

function get_current_date(){
    var today = new Date();
    var dd = String(today.getDate());
    var mm = months[today.getMonth()]; //January is 0!
    today = mm + ' ' + dd;
    current_month = months.indexOf(mm);
    current_day = parseInt(dd);
    todays_date = current_day;
    todays_month = current_month;
    return today
}
var main_alertboxstatus = '';
var last__timelinestart = 5;
function aresuretochangestarttime(){
    hideeditor(false);
    if(timelist.length>2){
        document.getElementById("main_alertbox").style.display = "block";
        document.getElementById("main_alertboxtext").innerHTML = "If you change the start of the time line, every activity in this day would be deleted.";
        main_alertboxstatus = "starttimechange";
    }else{
        document.querySelector(".black_box").style.display = "none";  
        starttimechangeselector();
        window.clearTimeout();
    }
    document.querySelector(".settings_box").style.display = "none";
}

function hidemainalertbox(){
    document.getElementById("main_alertbox").style.display = "none";
    document.getElementById("timelinestartselector").value = last__timelinestart;
    document.querySelector(".black_box").style.display = "none";
}

function main_alertboxbutton(){
    document.querySelector(".black_box").style.display = "none";
    if(main_alertboxstatus == "starttimechange"){
        starttimechangeselector();
        deleteeveryactivity(true);
        last__timelinestart = document.getElementById("timelinestartselector").value;
        window.clearTimeout();
    }
    else if(main_alertboxstatus == "deleteveryactivity"){
        deleteeveryactivity(true);
    }
    document.getElementById("main_alertbox").style.display = "none";
    document.querySelector(".black_box").style.display = "none";
}

function areusuretodeleteeveryactivity(){
    hideeditor(false);
    if(timelist.length>2){
        document.getElementById("main_alertbox").style.display = "block";
        document.querySelector(".black_box").style.display = "block";
        document.getElementById("main_alertboxtext").innerHTML = "Are you sure to delete every activity for this day?";
        main_alertboxstatus = "deleteveryactivity";
    }
}

function adjust_date_position(date){
    document.getElementById("current_date").innerHTML = date;
    randy3 = (document.getElementById("current_date").offsetWidth)/2;
    randy3 = "translateX(-"+String(randy3)+"px)";
    document.getElementById("current_date").style.transform = randy3;
    randy3 = (document.getElementById("current_date").offsetWidth)/2+12;
    randy3 = "translateX(-"+String(randy3)+"px)";
    document.getElementById("triangle-left").style.transform = randy3;
    randy3 = (document.getElementById("current_date").offsetWidth)/2+12;
    randy3 = "translateX("+String(randy3)+"px)";
    document.getElementById("triangle-right").style.transform = randy3;
}

function dayNumberChange(){
    deleteeveryactivity(false);
    random = 'timelist'+String(day_number);
    timelist = JSON.parse(localStorage.getItem(random));
    random = 'timelistnames'+String(day_number);
    timelistnames = JSON.parse(localStorage.getItem(random));
    random = 'timelistcolors'+String(day_number);
    timelistcolors = JSON.parse(localStorage.getItem(random));
    random = 'timelistid'+String(day_number);
    timelistid = JSON.parse(localStorage.getItem(random));
    random = 'timelistdescriptions'+String(day_number);
    timelistdescriptions = JSON.parse(localStorage.getItem(random));
    random = 'timelistimportance'+String(day_number);
    timelistimportance = JSON.parse(localStorage.getItem(random));
    random = 'timelistlike'+String(day_number);
    timelistlike = JSON.parse(localStorage.getItem(random));
    random = 'timelistcompletion'+String(day_number);
    timelistcompletion = JSON.parse(localStorage.getItem(random));
    isCompleted = JSON.parse(localStorage.getItem("isCompleted"));
    adjustactivitysizes(true);
    adjustbackgroundcolors();
}

function locate_current_time_indicator(){
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    var start = document.getElementById("timelinestartselector").value;
    if(hours<start){
        hours = 24-(start - hours);
    }else{
        hours -= start;
    }
    top_distance = String((12*hours+minutes/5)*timemargin)+"px";
    document.getElementById("current_time").style.top = top_distance;
    random = String(timewidth*3)+"px";
    document.getElementById("current_time").style.width = random;
    document.getElementById("current_time").style.left = "50%";
    var delay = (60-seconds)*1000;
    setTimeout(() => {
        locate_current_time_indicator()
    }, delay);
}




