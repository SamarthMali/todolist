var toDoData = [];


function save(){
   
    let Text = document.getElementById("toDoText").value;
    if(Text!=""){
        toDoData.push(Text);
        localStorage.setItem("todos", toDoData.toString());
    } else {
        alert("Please Enter Data");
    }
   
}

function getData(){
    let str = localStorage.getItem("todos");
    toDoData = str.split(',');
    let htmlString =
        `    <tr> 
                <th> Sr.No. </th>
                <th> Task </th> 
                <th> Actions </th>
            </tr>
        `

        let counter = 0;

        toDoData.forEach(ele =>{
            counter ++;
            htmlString += `
            <tr> 
            <td> ${counter} </td>
            <td id="table-data-${counter}">${ele}  </td>
            <td>
            <button id="dbtn${counter}" onclick="edit(${counter})" class=" btn btn-warning text-white">Edit</button>
            <button id="dbtn${counter}" onclick="deleteToDo(${counter})" class="  btn btn-danger">Delete</button>
            <button id="dbtn${counter}" onclick="complete(${counter})" class="  btn btn-success">Complete</button>
            
            </td>
            </tr>
            `
        })

        document.getElementById("table").innerHTML = htmlString;
}



function deleteAll(){
    localStorage.removeItem("todos");
    document.getElementById("table").innerHTML = "";
    toDoData = [];
}



function deleteToDo(counter){
    var con = confirm("Do you want to delete this task");
        if(con == true){
            toDoData.splice(counter-1, 1);
            console.log(counter-1);
            localStorage.setItem("todos", toDoData.toString());

            if(toDoData == "" ){
                deleteAll();
            }
        }
    getData();
}

function complete(counter){
     var taskConfirm  = confirm("Is you task completed?");
     if(taskConfirm == true){
        var strike = `<strike>${toDoData[counter-1]}</strike>`
        toDoData[counter-1] = strike;
        localStorage.setItem("todos", toDoData.toString());
        console.log("table-data-"+ counter);
        getData();
     }
     document.getElementById(`dbtn${counter}`).setAttribute("disabled", true)

}

function edit(counter){
    let editTask = prompt("Do you want to change the Task ?", toDoData[counter-1]);
    if(editTask!="" && editTask){
        toDoData[counter-1] = editTask;
        localStorage.setItem('todos', toDoData.toString());
    }
    
}









