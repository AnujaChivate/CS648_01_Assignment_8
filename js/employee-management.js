/*eslint-env browser*/
var employees = [ 
    ["Sally Smith", "Quality Assurance", 3423], 
    ["Mark Martin", "Vp Sales", 3346], 
    ["John Johnson", "Marketing", 3232], 
    ["Sundar Pichai", "CEO", 3300], 
    ["Sean Quinn", "Developer", 3620], 
];
 var $ = function(id) {
     return document.getElementById(id);
 };

//form validation
 var processEntries = function() {
    var header, msg, required, name, title, extension;
    header = "";
    required = "* This field is required";
    msg = "Please complete all required fields.";
    name = $("name").value;
    title = $("title").value;
    extension = $("extension").value;

    if(name === "" || name === " ") {
     $("name_error").innerHTML = required;
        header = msg;
    }
    
    if(title === "" || title === " ") {
       $("title_error").innerHTML = required;
       header = msg;
    }
   
    if(extension === "" || extension === " ") {
       $("extension_error").innerHTML = required;
       header = msg;
    }

    if(header === msg) {
        alert(header);
    } else if(isNaN(extension)) {
        $("extension_error").innerHTML = "Enter valid Number";
    } else {
        var newEmployee =[name, title, extension];
        employees.push(newEmployee);
        resetForm();
        clearErrMsgs();
        addRow(newEmployee);
    }
    totalEmployees();
};

var resetForm = function () {
    $("form").reset();
    $("name").focus();
};

// clear the error messeages
function clearErrMsgs() {
    $("name_error").innerHTML = "";
    $("title_error").innerHTML = "";
    $("extension_error").innerHTML = "";
}

function totalEmployees() {
    $("countEmplyees").innerHTML = employees.length;
 }

function addRow(employee) {
    var columnNum = 0;
    var table = $("employee-info");
    var row =  table.insertRow();

    for(var i = 0; i < employee.length; i++) {
        row.insertCell(columnNum).innerHTML = employee[i];
        columnNum++;
    }

    var button = document.createElement("input");
    button.style.background = "#0a79ce";
    button.style.width = "60%";
    button.style.color = "#ffffff";
    button.style.padding = "5px";
    button.setAttribute("type", "button");
    button.setAttribute("value", "Delete" );
    button.setAttribute('onclick', 'deleteEmployee(this)');

    row.insertCell(columnNum).appendChild(button);
} 

function createtable() {
   //inserting rows 
   for (var employee  of employees){
       addRow(employee);
    }

    /* Get new  count of employees */
    totalEmployees(); 
};

var deleteEmployee = function(e) {
    var row = e.parentNode.parentNode.rowIndex;

    /* Delete row from the table */
    document.getElementById("employee-info").deleteRow(row);

    /* Remove the  corresponding employee record in the array */
    employees.splice(row-1, 1);

    /* Get the new count of employees */
    totalEmployees(); 
};


window.addEventListener("load", function() {
    createtable();
    $("add").addEventListener("click", processEntries);
});
