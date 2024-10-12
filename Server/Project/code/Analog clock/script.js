let hr=document.getElementById('hour');
let min=document.getElementById('minute');
let sec=document.getElementById('second');

function time(){
let date =new Date();

let hh=date.getHours();
let mm=date.getMinutes();
let ss=date.getSeconds();

let hroation=30*hh + mm/2;
let mroation=6*mm;
let srotation=6*ss;

hr.style.transform=`rotate(${hroation}deg)`
min.style.transform=`rotate(${mroation}deg)`
sec.style.transform=`rotate(${srotation}deg)`
}
setInterval(time,1000);