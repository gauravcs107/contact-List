const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const contact_list_id = "myContacts"

window.onload = start();//getcontactsAJAX();






function start() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/allContacts', true);

    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                addContactsElements(xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send();
}

function addContactsElements(contacts_data_json) {
    //window.location = "./index.html";
    var data = JSON.parse(contacts_data_json);

    /* parent.innerText = ""; */
    var parent = document.getElementById("myContacts");
    var html = '';
    for (var i = 0; i < data.length; i++) {

        html +='<h3>'+data[i].Name+'</h3><h5>Mobile No. +'+data[i].MOBILE +'</h5>'+'<hr>';
    }

    parent.innerHTML = html;
}




















function getcontactsAJAX() {

    //console.log(window.location.pathname);
    //console.log("AJAX");

    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/api/contacts", true);

    xhr.onreadystatechange = function () {

        if (xhr.readyState == RESPONSE_DONE) {

            if (xhr.status == STATUS_OK) {


                addContactsElements(contact_list_id, xhr.responseText);
            }
        }
    }

    xhr.send(data = null);
}


/*function addContactsElements(id, contacts_data_json) {
    //window.location = "./index.html";
    var contacts = JSON.parse(contacts_data_json);

    var parent = document.getElementById(id);

    parent.innerText = "";


    if (parent) {
        Object.keys(contacts).forEach(
            function (key) {
                console.log(key);
                var todo_element = createContactsElement(key, contacts[key]);
                console.log(contacts[key].Name);
                    parent.appendChild(todo_element);

            }
        )
    }
}*/
function editContactlink(id) {
    window.location.href = "edit.html";
}
function createContactsElement(id, todo_object) {
    var contact_element = document.createElement("div");
   // console.log(todo_object);
    /*if(todo_object.MOBILE==undefined)
    {
        todo_object.MOBILE=988167622;
    }*/
    contact_element.innerHTML = '<h3>'+todo_object.Name+'</h3><h5>Mobile No. +'+todo_object.MOBILE+'</h5>';

    contact_element.setAttribute("id", id);
    contact_element.setAttribute("class","contact")
    contact_element.setAttribute("onclick", "edits(this.id)")
    return contact_element;
}

function addContactAJAX() {
    var Name = document.getElementById("name").value;
    var MOBILE = document.getElementById("MOBILE").value;

    console.log("gaurav");
    console.log('hi'+MOBILE);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/contact", true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    var data = "Name=" + encodeURI(Name) + "&MOBILE=" + encodeURI(MOBILE) ;

    xhr.onreadystatechange = function () {

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {

            }
        }
    }
    console.log(data);
    xhr.send(data);
    homePage();
}

function editContact(id) {


    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/api/contacts", true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                //console.log(xhr.responseText);
                var contacts = xhr.responseText;
                console.log(contacts);
                contacts = JSON.parse(contacts);

                document.getElementById('name').innerText=contacts[id].Name;

            }
        }
    }

    xhr.send(data = null);

}

function homePage(){
    window.location.href = "/";
}



function edits(id) {
    console.log("Start");
    editContactlink(id);
    console.log("mid");
    editContact(id);
    console.log("End");
}