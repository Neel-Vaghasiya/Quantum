
import { DataObject, CoursesObject } from "./interfaces";

const main_content : HTMLDivElement = document.getElementsByClassName("main-content")[0] as HTMLDivElement;
const courses_count : HTMLSpanElement = document.getElementById("courses-span") as HTMLSpanElement;
const classes_count : HTMLSpanElement = document.getElementById("classes-span") as HTMLSpanElement;
const num : HTMLDivElement = document.getElementsByClassName("num")[0] as HTMLDivElement;

async function getData() {
    const response = await fetch("../data/data.json");
    const data : DataObject = await response.json();
   
    const courses : CoursesObject[] = data.courses;

    courses_count.innerText = courses.length.toString();
    classes_count.innerText = data.total_classes.toString();
    num.innerText = `Showing ${courses.length} of ${courses.length} courses`;

    function classes_string(course: CoursesObject) : string {
        const classes : string[] = course.classes;
        let classes_str : string = ``;
        let j : number = 0;
        if(!classes.length) {
            classes_str += `<option selected>No Classes</option>`;
            return classes_str;
        }
        if(classes.length===data.total_classes) {
            console.log("entered");
            classes_str += `<option selected>All Classes</option>`;
        }
        for(const cls of classes) {
            if(j===0 && classes.length!==data.total_classes)
                classes_str+=`<option selected>${cls}</option>`;
            else 
                classes_str+=`<option>${cls}</option>`;
            j++;
        }
        return classes_str;
    }

    for(let course of courses) {

        main_content.innerHTML += `
            <div class="content1">
                ${course.is_Expired ?
                `<div class="expired-badge">
                    EXPIRED
                </div>` : ``
                }
                <div class="description">
                    <div class="course-image">
                        <img src=${course.thumbnail} alt="">
                    </div>
                    <div class="course-text">
                        <div class="title">
                            ${course.title}
                        </div>
                        <div class="sub-grade">
                            <span class="subject">${course.subject}</span>
                            <span class="grade">Grade ${course.grade} <span class="min">${course.grade_change > 0 ? `+${course.grade_change}` : `${course.grade_change}`}</span></span>
                        </div>
                        <div class="size">
                            ${course.units > 0 
                                ? 
                                `<span class="size-num">${course.units}</span>
                                Units&nbsp;
                                <span class="size-num">${course.lessons}</span>
                                Lessons&nbsp;
                                <span class="size-num">${course.topics}</span>
                                Topics`
                                :
                                `` } 
                            
                        </div>
                        <div class="division">
                            <select class="no-outline div-select">
                                ${classes_string(course)}
                            </select>
                        </div>
                        <div class="cap-dur">
                            ${course.classes.length > 0 ?
                                `<span class="subject">${course.students} Students</span>` : ``}
                            
                            ${course.classes.length > 0 && course.start_date!=="" ?
                                `<span class="duration">${course.start_date} - ${course.end_date}</span>` : ``}
                            
                            
                        </div>
                    </div>
                    <div class="star">
                        <img src="../image/icons/favourite.svg" alt="">
                    </div>
                </div>

                <div class="horizontle-border">

                </div>

                <div class="icons">
                    <button class="icon-btn">
                        <img src="../image/icons/preview.svg" alt="">
                    </button>
                    
                    <button class="icon-btn">
                        <img class="manage_course" src="../image/icons/manage course.svg" alt="">
                    </button>
                    <button class="icon-btn">
                        <img class="grade_submission" src="../image/icons/grade submissions.svg" alt="">
                    </button>
                    <button class="icon-btn">
                        <img src="../image/icons/reports.svg" alt="">
                    </button>
                </div>
            </div>
            `;

        let star_elements = document.getElementsByClassName("star");
        let star_element : HTMLDivElement = star_elements[star_elements.length - 1] as HTMLDivElement;
        let contents = document.getElementsByClassName("content1");
        let content : HTMLDivElement = contents[contents.length - 1] as HTMLDivElement;
        let manage_courses = document.getElementsByClassName("manage_course");
        let manage_course : HTMLImageElement = manage_courses[manage_courses.length-1] as HTMLImageElement;
        let grade_submissions = document.getElementsByClassName("grade_submission");
        let grade_submission : HTMLImageElement = grade_submissions[grade_submissions.length-1] as HTMLImageElement;
      
        if(!course.is_manage_course) {
            manage_course.classList.add("unavailable-icon");
        }
        if(!course.is_grade_submission) {
            grade_submission.classList.add("unavailable-icon");
        }

        if(!course.is_favourite)
            star_element.classList.add("unfavourite");
        if(course.is_Expired) 
            content.classList.add("expired-content");
        
    }
}


getData();

const hamburger_list = document.getElementById("hamburger-list");
const verticle_nav : HTMLDivElement = document.getElementsByClassName("verticle-nav")[0] as HTMLDivElement;
const hamburger_items = document.getElementsByClassName("hamburger-item");
const alert_list = document.getElementById("alert-list");
const announcement_list = document.getElementById("announcement-list");
const alert_div : HTMLDivElement= document.getElementsByClassName("alert-div")[0] as HTMLDivElement;
const announcement_div : HTMLDivElement = document.getElementsByClassName("announcement-div")[0] as HTMLDivElement;
const alert_icon_to_white = document.getElementById("alert-icon-to-white")
const announcement_icon_to_white = document.getElementById("announcement-icon-to-white")
const alert_number_badge = document.getElementById("alert-number-badge");
const announcement_number_badge = document.getElementById("announcement-number-badge");


let isin = false;

hamburger_list.addEventListener("mouseenter", ()=> {
    // verticle_navbar.style.display = "inline-block";
    verticle_nav.setAttribute("id", "verticle-navbar");
    
    console.log("mouse in");
    isin = true;
});

hamburger_list.addEventListener("mouseleave", ()=> {
    isin = false;
    console.log("mouseleave");
    if(verticle_nav.hasAttribute("id")) {
        console.log("mouseleave");
        setTimeout(()=>{
            if(!isin) {
                // verticle_navbar.style.display = "none";
                // verticle_navbar.style.visibility = "hidden";
                verticle_nav.removeAttribute("id");
                alert_icon_to_white.style.filter = "none";
            }
        },300)
    }
    
});

let isinalert = false;
alert_list.addEventListener("mouseenter", ()=> {
    alert_icon_to_white.style.filter = "brightness(0) invert(1)";
    // alert_div.style.display = "block";
    // alert_div.style.visibility = "visible";
    alert_div.setAttribute("id", "alert-div-hover");
    alert_number_badge.style.display = "none";
    console.log("mouse in");
    isinalert = true;
});

alert_list.addEventListener("mouseleave", ()=> {
    isinalert = false;
    console.log("mouseleave");
    if(alert_div.hasAttribute("id")) {
        console.log("mouseleave");
        setTimeout(()=>{
            if(!isinalert) {
                // alert_div.style.display = "none";
                // alert_div.style.visibility = "hidden";
                alert_div.removeAttribute("id");
                alert_icon_to_white.style.filter = "none";
                alert_number_badge.style.display = "flex";
            }
        },100)
    }
});

let isinannouncement = false;
announcement_list.addEventListener("mouseenter", ()=> {
    announcement_icon_to_white.style.filter = "brightness(0) invert(1)";
    // announcement_div.style.display = "block";
    announcement_div.setAttribute("id", "announcement-div-hover");
    announcement_number_badge.style.display = "none";
    console.log("mouse in");
    isinannouncement = true;
});

announcement_list.addEventListener("mouseleave", ()=> {
    isinannouncement = false;
    console.log("mouseleave");
    if(announcement_div.hasAttribute("id")) {
        console.log("mouseleave");
        setTimeout(()=>{
            if(!isinannouncement) {
                // announcement_div.style.display = "none";
                // announcement_div.style.visibility = "hidden";
                announcement_div.removeAttribute("id");
                announcement_icon_to_white.style.filter = "none";
                announcement_number_badge.style.display = "flex";

            }
        },100)
    }
});

for(let item of Array.from(hamburger_items)) {
    item.addEventListener("click", ()=> {
        
        for(let i of Array.from(hamburger_items)) {
            i.classList.remove("selected");
        }
        item.classList.add("selected");
    });
}



export {};
