console.log("ciao")

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    console.log("inside openNav")
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}
  
/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    console.log("inside closeNav")
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

const searchInput = document.querySelector("[data-search]")

const PatientsMessagesBox = document.getElementById("patients-messages-box")
const messageCountBox = document.getElementById("messages-count-box")
const url = window.location.href 
const textLabel = document.getElementsByClassName("form-label requiredField")
const asteriscs = document.getElementsByClassName("asteriskField")
console.log(url)

const loadMessages = () => {

    $.ajax({

        type:"GET",
        url: url + "load_messages/",
        success: function(response){
            if (asteriscs[0]){
                asteriscs[0].innerHTML = ''
            }
            textLabel[0].innerHTML = ''
            console.log(response)
            data = response.data
            setTimeout(() => {
                PatientsMessagesBox.innerHTML = ''
                data.forEach(message => {
                    if (message.count_new > 0){
                        var is_new = ''
                    }
                    else{
                        var is_new = 'display: none;'
                    }
                    PatientsMessagesBox.innerHTML += `
                    <div class="col-xl-12 border border-dark bg-element my-1 rounded-total" id="message-sender-${message.patient_id}">
                        <div class="align-items-center justify-content-between">
                            <a id="message-sender-${message.patient_id}-a" type="button" class="m-2 text-dark" style="font-size: 18; text-decoration: none"><b>${message.patient}</b></a>
                            <p style="color: #117c6f; ${is_new}" id="message-sender-${message.patient_id}-p" class="my-1"><b>${message.count_new}</b></p>
                        </div>
                        <hr>
                        <p style="color: grey;width: 100%; word-wrap: break-word; display: inline-block;"><i>${message.sender}:</i> ${message.text}</p>
                        <p>Sent on: ${message.date}</p>
                    </div>  
                    `
                });

                messages = data.map(message => {
                    return {
                        id: message.id,
                        patient_id: message.patient_id,
                        sender: message.sender,
                        patient: message.patient,
                    }
                })

                function selectChat(patient_id){
                    loadChat(patient_id)
                    selectedPatientID = patient_id
                }
                function hideNew(patient_id){
                    element = document.getElementById(`message-sender-${patient_id}-p`)
                    element.classList.add("not-visible")
                }

                data.forEach(message => {
                    document.getElementById(`message-sender-${message.patient_id}-a`).addEventListener('click', function(){
                        selectChat(message.patient_id)
                        hideNew(message.patient_id)
                    })
                })
                
                if (response.size === 0){
                    messageCountBox.innerHTML = `
                        <p class="card-text">You do not have new messages</p>
                    `
                }
                else if (response.size === 1){
                    messageCountBox.innerHTML = `
                        <p class="card-text">There is ${response.size} new message</p>
                    `
                }
                else if (response.size > 1){
                    messageCountBox.innerHTML = `
                        <p class="card-text">There are ${response.size} new messages</p>
                    `
                }
            }, 100)
        },
        error: function(error){
            console.log(error)
        }

    })

}

loadMessages()

searchInput.addEventListener("input", (e) => {
    
    const value = e.target.value
    messages.forEach(message => {
        const messageLink = document.getElementById(`message-sender-${message.patient_id}`)
        console.log(messageLink)
        const isVisible = message.patient.toLowerCase().includes(value.toLowerCase())
        if (!isVisible){
            messageLink.classList.add('not-visible')
        }
        else{
            if (messageLink.className.includes('not-visible')){
                messageLink.classList.remove('not-visible')
            }
        }
        // console.log("Fino a qui tutto bene")
    })

})

const patientNameH1 = document.getElementById("patient-name")
const chatBox = document.getElementById("chat-box")


const loadChat = (patient_id) => {

    $.ajax({

        type:'GET',
        url: url + `load_chat/${patient_id}`,
        success: function(response){
            console.log(response)
            chatBox.innerHTML = ''
            setTimeout(() => {
                data = response.data
                data.forEach(message => {
                    console.log(message)
                    patientNameH1.innerHTML = `
                        <h1>${message.patient_name}</h1>
                    `
                    if (message.sender == `${message.patient_name}`){
                        chatBox.innerHTML+= `
                            <div class="row">
                                <div class="col-xl-8 my-2 border border-dark rounded-3" style="background-color: rgba(35, 182, 42, 0.45);">
                                    <p style="width: 100%; word-wrap: break-word; display: inline-block;"> ${message.text}</p>
                                    <p style="color: grey; font-size: 12;">Sent on: ${message.date}</p>
                                </div>
                            </div>
                        `
                    }
                    else if(message.sender == `${message.therapist_name}`){
                        chatBox.innerHTML+= `
                            <div class="row">
                                <div class="col-xl-4 my-2"></div>
                                <div class="col-xl-8 my-2 border border-dark rounded-3" style="background-color: rgba(214, 223, 222, 0.555);">
                                    <p style="width: 100%; word-wrap: break-word; display: inline-block;"> ${message.text}</p>
                                    <p style="color: grey; font-size: 12;">Sent on: ${message.date}</p>
                                </div>
                            </div>
                        `
                    }
                });
                chatBox.scrollTop = chatBox.scrollHeight
                // messages_chat = data.map(message => {
                //     return {
                //         id: message.id,
                //         patient_id: message.patient_id,
                //         sender: message.sender,
                //     }
                // })
                
            }, 100)
        },
        error: function(error){
            console.log(error)
        }
        

    })

}

const pForm = document.getElementById("p-form")
const csrf = document.getElementsByName('csrfmiddlewaretoken')
const textInput = document.getElementById("id_textMessage")
console.log(csrf)

pForm.addEventListener('submit', e=>{
    e.preventDefault()

    const fd = new FormData()
    fd.append('csrfmiddlewaretoken', csrf[1].value)
    fd.append('textMessage', textInput.value)
    if (selectedPatientID !== null) {
        fd.append('sender_id', selectedPatientID);
    }

    console.log(fd)

    $.ajax({
        type:'POST', 
        url: url,
        enctype: 'application/x-www-form-urlencoded', 
        data: fd,
        success: function(response){
            loadMessages()
            setTimeout(()=> {
                textInput.value=""
                loadChat(selectedPatientID)
            }, 200)

            console.log("status: ", response)
        },
        error:function(error){
            console.log(error)
        },
        cache:false,
        contentType:false,
        processData:false,
    })
})

