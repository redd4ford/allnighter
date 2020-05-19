const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const clock = document.getElementById('clock');

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const STRIKETHROUGH_PROPERTY = "lineThrough";

let LIST = [];
let id = 0;

if (localStorage.getItem("TODO")) {
    LIST = JSON.parse(localStorage.getItem("TODO"));
    id = LIST.length;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}


function loadList(array) {
    array.forEach(function (item) {
        addTask(item.name, item.id, item.done, item.isInTrash);
    });
}


clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});


const options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options).toLowerCase();


function time() {
    var time = new Date();
    var seconds = time.getSeconds();
    var minutes = time.getMinutes();
    var hours = time.getHours();
    clock.textContent = hours + ":" + minutes + ":" + seconds;
}


setInterval(time, 1000);


function addTask(toDo, id, done, isInTrash) {
    if (!isInTrash) {
        let DONE, LINE;
        if (done) {
            DONE = CHECK;
            LINE = STRIKETHROUGH_PROPERTY;
        } else {
            DONE = UNCHECK;
            LINE = "";
        }
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;

    list.insertAdjacentHTML("beforeend", item);
    }
}


function completeTask(task) {
    task.classList.toggle(CHECK);
    task.classList.toggle(UNCHECK);
    task.parentNode.querySelector(".text").classList.toggle(STRIKETHROUGH_PROPERTY);

    LIST[task.id].done = !LIST[task.id].done;
}


function removeTask(task) {
    task.parentNode.parentNode.removeChild(task.parentNode);

    LIST[task.id].isInTrash = true;
}


document.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        const task = input.value;
        if (task) {
            addTask(task, id, false, false);
            LIST.push({
                name: task,
                id: id,
                done: false,
                isInTrash: false
            });
            id++;
            localStorage.setItem("TODO", JSON.stringify(LIST));
        }
        input.value = "";
    }
});


list.addEventListener("click", function (event) {
    const element = event.target;
    if (element.attributes.job.value === "complete") {
        completeTask(element);
    } else if (element.attributes.job.value === "delete") {
        removeTask(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});