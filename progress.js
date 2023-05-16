var checklist_date = 0;
var timelinestart = 6;
var isCompleted, time_list_ids, time_list_names, time_list, time_list_completion, currentPage, random;
currentPage = 1;
maxPageNumber = 1;
function init(){
    document.querySelector("#triangle-left").addEventListener("click", function(){
        checklist_date -= 1;
        if(checklist_date == -7){
            this.style.display = "none";
        }
        document.querySelector("#triangle-right").style.display = "inline-block";
        
        makeAllUnchecked();
        adjustChecklist();
    });
    document.querySelector("#triangle-right").addEventListener("click", function(){
        checklist_date += 1;
        if(checklist_date == 7){
            this.style.display = "none";
        }
        document.querySelector("#triangle-left").style.display = "inline-block";
        
        makeAllUnchecked();
        adjustChecklist();
    });
    document.querySelector("#current_date").addEventListener("click", function(){
        checklist_date = 0;
        makeAllUnchecked();
        adjustChecklist();
    });
    document.querySelector("#pageLeft").addEventListener("click", function(){
        currentPage -= 1;
        if(currentPage == 1){
            this.style.display = "none";
        }
        document.querySelector("#pageRight").style.display = "inline-block";
        setChecklist();
        setPageNumber();
    });
    document.querySelector("#currentPage").addEventListener("click", function(){
        currentPage = 1;
        setChecklist();
        document.querySelector("#pageLeft").style.display = "none";
        setPageNumber();
    });
    document.querySelector("#pageRight").addEventListener("click", function(){
        currentPage += 1;
        if(currentPage == maxPageNumber){
            this.style.display = "none";
        }
        document.querySelector("#pageLeft").style.display = "inline-block";
        setChecklist();
        setPageNumber();
    });
    
    var elements = document.querySelectorAll(".box > .checklist > input");
    for(let element of elements){
        element.addEventListener("change", function(){
            var checked;
            if(this.checked){
                checked = 1;
                if(checklist_date<=0){
                    dateToUpdate = checklist_date;
                    isCompleted[checklist_date+365] += 1;
                }else{
                    
                    dateToUpdate = 0;
                    isCompleted[365] += 1;
                }
            }else{
                checked = 0;
                if(checklist_date<=0){
                    dateToUpdate = checklist_date;
                    isCompleted[checklist_date+365] -= 1;
                }else{
                    dateToUpdate = 0;
                    isCompleted[365] -= 1;
                }
            }
            localStorage.setItem('isCompleted', JSON.stringify(isCompleted));
            for (let index = 1; index < time_list_ids.length; index++) {
                if(time_list_ids[index]==this.value){
                    time_list_completion[index]=checked;
                    window.completionChange();
                }
            }
            localStorage.setItem("timelistcompletion"+String(checklist_date+8), JSON.stringify(time_list_completion));
            window.setChartData();
        });
    }
    makeAllUnchecked();
    adjustDate();
}

function makeAllUnchecked(){
    var elements = document.querySelectorAll(".box > .checklist > input");
    for(let element of elements){
        element.checked = false;
    }
}

function adjustChecklist(){
    adjustDate();
    setItems();
}

function adjustDate(){
    var myDate = get_date(checklist_date);
    myDate = myDate[0]+" "+String(myDate[1]);
    document.querySelector("#current_date").innerHTML = myDate;
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
var dateToUpdate;
function setItems(){
    var the_date = checklist_date+8;
    var randy = 'timelistnames'+String(the_date);
    time_list_names = JSON.parse(localStorage.getItem(randy));
    randy = "timelistid"+String(the_date);
    time_list_ids = JSON.parse(localStorage.getItem(randy));
    randy = "timelist"+String(the_date);
    time_list = JSON.parse(localStorage.getItem(randy));
    isCompleted = JSON.parse(localStorage.getItem("isCompleted"));
    randy = "timelistcompletion"+String(the_date);
    time_list_completion = JSON.parse(localStorage.getItem(randy));
    window.setChartData();
    if(time_list_names.length == 1){
        document.querySelector(".noData").style.display = "block";
    }else{
        document.querySelector(".noData").style.display = "none";
    }
    if (time_list_names.length>13) {
        document.querySelector("#pageRight").style.display = "inline-block";
    }
    maxPageNumber = 1+((time_list_names.length-1)-(time_list_names.length-1)%12)/12
    setPageNumber();
    setChecklist();
    document.querySelector("#pageLeft").style.display = "none";
    if(maxPageNumber<13){
        document.querySelector("#pageRight").style.display = "none";
    }
}

function setPageNumber(){
    var randy;
    randy = String(currentPage)+"/"+String(maxPageNumber);
    document.querySelector('#currentPage').innerHTML = randy;
}

function setChecklist(){
    for (let index = currentPage*12-11; index < currentPage*12+1; index++) {
        if(index<time_list_names.length){
            random = ".box:nth-child("+ String(index-(currentPage-1)*12)+")";
            document.querySelector(random).style.display = "block";
            random += " > .checklist > label";
            document.querySelector(random).innerHTML = time_list_names[index];
            random = ".box:nth-child("+ String(index-(currentPage-1)*12)+") > .checklist > p";
            var the_time = convertTimeValue(time_list[2*index])+" - "+convertTimeValue(time_list[2*index+1]);
            document.querySelector(random).innerHTML = the_time;
            random = ".box:nth-child("+ String(index-(currentPage-1)*12)+") > .checklist > input";
            document.querySelector(random).value = time_list_ids[index];
            if(time_list_completion[index]=="1"){
                document.querySelector(random).checked = true;
            }
        }
        else{
            random = ".box:nth-child("+ String(index-(currentPage-1)*12)+")";
            document.querySelector(random).style.display = "none";
        }    
    }
}




function convertTimeValue(value){
    var AorP;
    value += timelinestart*60;
    if(value == 1440){
        return "12 AM"
    }else if(value>=720){
        AorP = " PM"
    }else{
        AorP = " AM"
    }
    var hours = (value - value%60)/60;
    var minutes = value%60;
    if(hours == 0){
        hours = 12;
    }
    if(minutes<10){
        minutes = "0"+String(minutes);
    }
    if(hours<10){
        hours = "0"+String(hours);
    }
    while(hours > 12){
        hours -= 12;
    }
    return String(hours)+":"+String(minutes)+AorP; 
}