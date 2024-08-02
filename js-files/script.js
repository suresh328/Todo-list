const addbtn = document.querySelector(".add-btn");//17--html <button class="add-btn">Add</button>
const newTASkInput = document.querySelector("#wrapper input");//<div id="wrapper">
//<input type="text"
//placeholder="Enter Task To Be Done..." />
const tasksContainer = document.querySelector("#task");//<div id="task">
const error = document.querySelector("#error");//<p id="error">Input cannot be empty!</p>
const countValue =document.querySelector(".count-value");//<span class="count-value">0</span>


let taskCount = 0;

const displayCount = (taskCount) =>{//10th line action
    countValue.innerHTML= taskCount;
};

const addTask = () =>{
    const taskName = newTASkInput.value.trim();//2nd line  action
    error.style.display="none";
    if(!taskName){
        setTimeout(()=>{
            error.style.display = "block";
        },200);
        return;
    }
    const task = `<div class = "task">
    <input type ="checkbox" class= "task-check">
    <span class ="taskname">${taskName}</span>
    <button class="edit">
        <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete">
        <i class="fa-solid fa-trash"></i>
    </button>
    </div>`;

    tasksContainer.insertAdjacentHTML("beforeend", task);

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(button => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
    });
    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) =>{
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if(!(e.target.className == "edit")){
                targetElement = e.target.parentElement;
            }
            newTASkInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
    });
    const taskCheck = document.querySelectorAll(".task-check");
    taskCheck.forEach((checkBox) => {
        checkBox.onchange = ()=>{
            checkBox.nextElementSibling.classList.toggle("completed");
            if(checkBox.checked){
                taskCount -=1;
            }else {
                taskCount += 1;
            }
            displayCount(taskCount);
        };
    });
    taskCount +=1;
    displayCount (taskCount);
    newTASkInput.value = "";
};

addbtn.addEventListener("click", addTask);

window.onload = ( ) =>{
    taskCount = 0 ;
    displayCount(taskCount);
    newTASkInput.value ="";
};