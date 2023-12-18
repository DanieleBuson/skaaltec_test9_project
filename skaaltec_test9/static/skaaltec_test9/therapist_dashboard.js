// globally used functions

var labelElements = document.querySelectorAll('label[for="id_textMessage"]');
labelElements.forEach(function(labelElement) {
    labelElement.style.display = 'none';
});

document.addEventListener("DOMContentLoaded", function () {
    // Function to hide the modebar-container element
    function hideModebarContainer() {
        var modebarContainer = document.querySelector(".modebar-container");

        if (modebarContainer) {
            modebarContainer.style.display = "none";
        }
    }

    // Initial hide
    hideModebarContainer();

    // Use MutationObserver to watch for changes in the DOM
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            // Check if nodes are added or updated
            if (mutation.type === 'childList') {
                // Hide the modebar-container element when changes occur
                hideModebarContainer();
            }
        });
    });

    // Configuration of the MutationObserver
    var config = { childList: true, subtree: true };

    // Start observing the target node for configured mutations
    observer.observe(document.body, config);
});

// globally useful variables

var adminBox = document.getElementById("admin")
var skaalendarBox = document.getElementById("skaalendar")
var messagesBox = document.getElementById("messages")
var analysisBox = document.getElementById("analysis")
var sessionsBox = document.getElementById("sessions")
var uploadBox = document.getElementById("upload")
var chatBox = document.getElementById("chat")

var adminTabletBox = document.getElementById("admin-t")
var skaalendarTabletBox = document.getElementById("skaalendar-t")
var messagesTabletBox = document.getElementById("messages-t")
var analysisTabletBox = document.getElementById("analysis-t")
var sessionsTabletBox = document.getElementById("sessions-t")
var uploadTabletBox = document.getElementById("upload-t")
var chatTabletBox = document.getElementById("chat-t")

var adminMobileBox = document.getElementById("admin-m")
var skaalendarMobileBox = document.getElementById("skaalendar-m")
var messagesMobileBox = document.getElementById("messages-m")
var analysisMobileBox = document.getElementById("analysis-m")
var sessionsMobileBox = document.getElementById("sessions-m")
var uploadMobileBox = document.getElementById("upload-m")
var chatMobileBox = document.getElementById("chat-m")

var patientInfoBox = document.getElementById("patient-info-box")
var patientInfoBoxTablet = document.getElementById("patient-info-box-tablet")
var patientInfoBoxMobile = document.getElementById("patient-info-box-mobile")
var patientNameSession = document.getElementById("patient-name-session")
var patientNameSessionTablet = document.getElementById("patient-name-session-t")
var patientNameSessionMobile = document.getElementById("patient-name-session-m")
var selectedPatient = 0
var selectedSessionId = 0
var analysisId = 0

var url = window.location.href

// loadPatients() function in ajax
const loadPatients = () => {

    $.ajax({
        type: "GET",
        url: url + "load_patients/",
        success: function(response){
            data = response.data
            patientInfoBox.innerHTML = ''
            patientInfoBoxTablet.innerHTML = ''
            patientInfoBoxMobile.innerHTML = ''
            data.forEach(element => {
                patientNameSession.innerHTML = `
                    ${element.patient_name}
                `
                patientInfoBox.innerHTML += `
                    <div id="patient-${element.id}" class="col-xl-12 my-1 patient-info">
                        <div class="mx-1">
                            <h4 id="patient-${element.id}-name" style="font-size: 28;">${element.patient_name}</h4>
                            <h6 style="color: grey; font-size: 16;">${element.age} years old</h6>
                        </div>
                    
                        <div class="dropdown" id="dropdown-${element.id}">
                            <button type="button" class="btn btn-link dropdown-toggle" data-bs-toggle="dropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                                </svg>  
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" id="analysis-${element.id}">Analysis</a></li>
                                <li><a class="dropdown-item" id="session-${element.id}">Session</a></li>
                                <li><a class="dropdown-item" id="chat-${element.id}">Message</a></li>
                            </ul>
                        </div> 

                        <div id="ics-${element.id}" class="not-visible">
                            <a id="home-${element.id}" type="button" class="btn btn-link dropdown-toggle" data-bs-toggle="dropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </a>    
                        </div>

                    </div>
                `

                patientInfoBoxTablet.innerHTML += `
                    <div id="patient-${element.id}-t" class="col-md-12 my-1 patient-info-tablet">
                        <div class="mx-1">
                            <h4 id="patient-${element.id}-t-name" class="mx-1">${element.patient_name}</h4>
                            <h6 class="mx-1">${element.age} years old</h6>
                        </div>
                        <div class="dropdown" id="dropdown-${element.id}-t">
                            <button type="button" class="btn btn-link dropdown-toggle" data-bs-toggle="dropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                                </svg>  
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" id="analysis-${element.id}-t">Analysis</a></li>
                                <li><a class="dropdown-item" id="session-${element.id}-t">Session</a></li>
                                <li><a class="dropdown-item" id="chat-${element.id}-t">Message</a></li>
                            </ul>
                        </div>

                        <div id="ics-${element.id}-t" class="not-visible">
                            <a id="home-${element.id}-t" type="button" class="btn btn-link dropdown-toggle" data-bs-toggle="dropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </a>    
                        </div>
                    </div>
                `

                patientNameSessionTablet.innerHTML = `
                    ${element.patient_name}
                `

                patientInfoBoxMobile.innerHTML += `
                    <div id="patient-${element.id}-m" class="col-sm-12 my-1 patient-info-mobile">
                        <div>
                            <h4 id="patient-${element.id}-m-name">${element.patient_name}</h4>
                            <h6>${element.age} years old</h6>
                        </div>
                        <div class="dropdown" id="dropdown-${element.id}-m">
                            <button type="button" class="btn btn-link dropdown-toggle" data-bs-toggle="dropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                                </svg>  
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" id="analysis-${element.id}-m">Analysis</a></li>
                                <li><a class="dropdown-item" id="session-${element.id}-m">Session</a></li>
                                <li><a class="dropdown-item" id="chat-${element.id}-m">Message</a></li>
                            </ul>
                        </div>
                        <div id="ics-${element.id}-m" class="not-visible">
                            <a id="home-${element.id}-m" type="button" class="btn btn-link dropdown-toggle" data-bs-toggle="dropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </a>    
                        </div>
                    </div>
                `

                patientNameSessionMobile.innerHTML = `
                    ${element.patient_name}
                `
            })

            //implement a function to handle it in anotehr file
            data.forEach(element => {
                //desktop
                var analysisLink = document.getElementById(`analysis-${element.id}`)
                analysisLink.addEventListener("click", function(event) {
                    event.preventDefault(); // Prevent the default link behavior
                    showAnalysis(element.id, '', analysisBox, uploadBox, adminBox, skaalendarBox, messagesBox, sessionsBox, chatBox, loadAnalysis) 
                });

                var sessionLink = document.getElementById(`session-${element.id}`)
                sessionLink.addEventListener("click", function(event) {
                    event.preventDefault(); // Prevent the default link behavior
                    showSessions(element.id, '', analysisBox, uploadBox, adminBox, skaalendarBox, messagesBox, sessionsBox, chatBox, loadSessions)
                });

                var chatLink = document.getElementById(`chat-${element.id}`)
                chatLink.addEventListener("click", function(event) {
                    event.preventDefault(); // Prevent the default link behavior
                    showChat(element.id, '', analysisBox, uploadBox, adminBox, skaalendarBox, messagesBox, sessionsBox, chatBox, loadMessages)
                });

                var admin = document.getElementById(`home-${element.id}`)
                admin.addEventListener("click", function(event) {
                    event.preventDefault(); // Prevent the default link behavior
                    showAdmin(element.id, '', analysisBox, uploadBox, adminBox, skaalendarBox, messagesBox, sessionsBox, chatBox, loadPatients, loadAdminData, loadTherapistData)
                });

                //tablet
                var analysisLinkTablet = document.getElementById(`analysis-${element.id}-t`)
                analysisLinkTablet.addEventListener("click", function(event) {
                    event.preventDefault(); // Prevent the default link behavior
                    showAnalysis(element.id, '-t', analysisTabletBox, uploadTabletBox, adminTabletBox, skaalendarTabletBox, messagesTabletBox, sessionsTabletBox, chatTabletBox, loadAnalysis) 
                });

                var chatLinkTablet = document.getElementById(`chat-${element.id}-t`)
                chatLinkTablet.addEventListener("click", function(event) {
                    event.preventDefault(); // Prevent the default link behavior
                    showChat(element.id, '-t', analysisTabletBox, uploadTabletBox, adminTabletBox, skaalendarTabletBox, messagesTabletBox, sessionsTabletBox, chatTabletBox, loadMessages)
                });

                var sessionLinkTablet = document.getElementById(`session-${element.id}-t`)
                sessionLinkTablet.addEventListener("click", function(event) {
                    event.preventDefault(); // Prevent the default link behavior
                    showSessions(element.id, '-t', analysisTabletBox, uploadTabletBox, adminTabletBox, skaalendarTabletBox, messagesTabletBox, sessionsTabletBox, chatTabletBox, loadSessions)
                });

                var adminTablet = document.getElementById(`home-${element.id}-t`)
                adminTablet.addEventListener("click", function(event) {
                    event.preventDefault(); // Prevent the default link behavior
                    showAdmin(element.id, '-t', analysisTabletBox, uploadTabletBox, adminTabletBox, skaalendarTabletBox, messagesTabletBox, sessionsTabletBox, chatTabletBox, loadPatients, loadAdminData, loadTherapistData)    
                });


                // mobile
                var analysisLinkMobile = document.getElementById(`analysis-${element.id}-m`)
                analysisLinkMobile.addEventListener("click", function(event) {
                    event.preventDefault(); // Prevent the default link behavior
                    showAnalysis(element.id, '-m', analysisMobileBox, uploadMobileBox, adminMobileBox, skaalendarMobileBox, messagesMobileBox, sessionsMobileBox, chatMobileBox, loadAnalysis)
                });

                var sessionLinkMobile = document.getElementById(`session-${element.id}-m`)
                sessionLinkMobile.addEventListener("click", function(event) {
                    event.preventDefault(); // Prevent the default link behavior
                    showSessions(element.id, '-m', analysisMobileBox, uploadMobileBox, adminMobileBox, skaalendarMobileBox, messagesMobileBox, sessionsMobileBox, chatMobileBox, loadSessions)
                });

                var chatLinkMobile = document.getElementById(`chat-${element.id}-m`)
                chatLinkMobile.addEventListener("click", function(event) {
                    event.preventDefault(); // Prevent the default link behavior
                    showChat(element.id, '-m', analysisMobileBox, uploadMobileBox, adminMobileBox, skaalendarMobileBox, messagesMobileBox, sessionsMobileBox, chatMobileBox, loadMessages)
                });

                var adminMobile = document.getElementById(`home-${element.id}-m`)
                adminMobile.addEventListener("click", function(event) {
                    event.preventDefault(); // Prevent the default link behavior
                    showAdmin(element.id, '-m', analysisMobileBox, uploadMobileBox, adminMobileBox, skaalendarMobileBox, messagesMobileBox, sessionsMobileBox, chatMobileBox, loadPatients, loadAdminData, loadTherapistData)
                });
            })
            patients = data.map(patient => {
                return {
                    id: patient.id,
                    patient_name: patient.patient_name,
                    age: patient.age,
                }
            })

            const searchInput = document.querySelector("[data-search]")
            searchInputFunction(searchInput, patients, "")
            const searchInputTablet = document.querySelector("[data-search-tablet]")
            searchInputFunction(searchInputTablet, patients, '-t')
            const searchInputMobile = document.querySelector("[data-search-mobile]")
            searchInputFunction(searchInputMobile, patients, '-m')

        },
        error: function(error){
            console.log(error)
        }


    })

}

// call the function to retrieve data

loadPatients()


// nop, completed-gauge and message-count
// desktop vars
var nopBox = document.getElementById("nop-box")
var completedBoxGauge = document.getElementById("completed-box-gauge")
var messageCountBox = document.getElementById("message-count-box")
const noaBox = document.getElementById("noa-box")
// tablet vars
var nopBoxT = document.getElementById("nop-box-t")
var completedBoxGaugeT = document.getElementById("completed-box-gauge-t")
var messageCountBoxT = document.getElementById("message-count-box-t")
var noaBoxT = document.getElementById("noa-box-t")
//mobile vars
var nopBoxM = document.getElementById("nop-box-m")
var completedBoxGaugeM = document.getElementById("completed-box-gauge-m")
var messageCountBoxM = document.getElementById("message-count-box-m")
var noaBoxM = document.getElementById("noa-box-m")

// populate these fields

const loadAdminData = () => {

    $.ajax({

        type:'GET',
        url: url + "load_admin/",
        success: function(response){
            // number of patients box d,t,m
            nopBox.innerHTML = `
                <div class="d-flex flex-column align-items-center card rounded-total">
                    <div class="row" style="height:100px;">
                        <br>
                        <h6 class="card-title">Number of Patients</h6>
                    </div>
                    
                    <div class="row" style="height:200px; color: rgb(192, 0, 14);">
                        <h1 class="card-big-number">${response.patients_size}</h1>
                    </div>
                </div>
            `
            nopBoxT.innerHTML = `
                <div class="d-flex flex-column align-items-center card rounded-total">
                    <div class="row" style="height:60px;">
                        <br>
                        <h6 class="card-title">Number of Patients</h6>
                    </div>
                    
                    <div class="row" style="height:120px; color: rgb(192, 0, 14);">
                        <h1 class="card-big-number">${response.patients_size}</h1>
                    </div>
                </div>
            `
            nopBoxM.innerHTML = `
                <div class="d-flex flex-column align-items-center card rounded-total">
                    <div class="row" style="height:50px;">
                        <br>
                        <h6 class="card-title">Number of Patients</h6>
                    </div>
                    
                    <div class="row" style="height: 95px; color: rgb(192, 0, 14);">
                        <h1 class="card-big-number">${response.patients_size}</h1>
                    </div>
                </div>
            `


            messageCountBox.innerHTML = ''
            if (response.messages_count === 1){
                messageCountBox.innerHTML = `
                    <div class="d-flex flex-column align-items-center card rounded-total">
                        <div class="row" style="height:100px;">
                            <br>
                            <h6 class="card-title">There is a new message!</h6>
                        </div>
                        
                        <div class="row" style="height:200px; color: rgb(192, 0, 14);">
                            <h1 class="card-big-number">${response.messages_count}</h1>
                        </div>
                    </div>
                `
                messageCountBoxT.innerHTML = `
                    <div class="d-flex flex-column align-items-center card rounded-total">
                        <div class="row" style="height:60px;">
                            <br>
                            <h6 class="card-title">There is a new message!</h6>
                        </div>
                        
                        <div class="row" style="height:120px; color: rgb(192, 0, 14);">
                            <h1 class="card-big-number">${response.messages_count}</h1>
                        </div>
                    </div>
                `
                messageCountBoxM.innerHTML = `
                    <div class="d-flex flex-column align-items-center card rounded-total">
                        <div class="row" style="height:50px;">
                            <br>
                            <h6 class="card-title">There is a new message!</h6>
                        </div>
                        
                        <div class="row" style="height:95px; color: rgb(192, 0, 14);">
                            <h1 class="card-big-number">${response.messages_count}</h1>
                        </div>
                    </div>
                `
            }
            else if(response.messages_count === 0){
                messageCountBox.innerHTML = `
                    <div class="d-flex flex-column align-items-center card rounded-total">
                        <div class="row" style="height:100px;">
                            <br>
                            <h6 class="card-title">You read all the messages!</h6>
                        </div>
                        
                        <div class="row" style="height:200px; color: rgb(192, 0, 14);">
                            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" class="bi bi-envelope-check" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"/>
                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
                            </svg>
                        </div>
                    </div>
                `
                messageCountBoxT.innerHTML = `
                    <div class="d-flex flex-column align-items-center card rounded-total">
                        <div class="row" style="height:60px;">
                            <br>
                            <h6 class="card-title">You read all the messages!</h6>
                        </div>
                        
                        <div class="row" style="height:120px; color: rgb(192, 0, 14);">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-envelope-check" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"/>
                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
                            </svg>
                        </div>
                    </div>
                `
                messageCountBoxM.innerHTML = `
                    <div class="d-flex flex-column align-items-center card rounded-total">
                        <div class="row" style="height:50px;">
                            <br>
                            <h6 class="card-title">You read all the messages!</h6>
                        </div>
                        
                        <div class="row" style="height:95px; color: rgb(192, 0, 14);">
                            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" class="bi bi-envelope-check" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"/>
                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
                            </svg>
                        </div>
                    </div>
                `
            }
            else if (response.messages_count > 1){
                messageCountBox.innerHTML = `
                    <div class="d-flex flex-column align-items-center card rounded-total">
                        <div class="row" style="height:100px;">
                            <br>
                            <h6 class="card-title">There are new messages!</h6>
                        </div>
                        
                        <div class="row" style="height:200px; color: rgb(192, 0, 14);">
                            <h1 class="card-big-number">${response.messages_count}</h1>
                        </div>
                    </div>
                `
                messageCountBoxT.innerHTML = `
                    <div class="d-flex flex-column align-items-center card rounded-total">
                        <div class="row" style="height:60px;">
                            <br>
                            <h6 class="card-title">There are new messages!</h6>
                        </div>
                        
                        <div class="row" style="height: 120px; color: rgb(192, 0, 14);">
                            <h1 class="card-big-number">${response.messages_count}</h1>
                        </div>
                    </div>
                `
                messageCountBoxM.innerHTML = `
                    <div class="d-flex flex-column align-items-center card rounded-total">
                        <div class="row" style="height:50px;">
                            <br>
                            <h6 class="card-title">There are new messages!</h6>
                        </div>
                        
                        <div class="row" style="height: 95px; color: rgb(192, 0, 14);">
                            <h1 class="card-big-number">${response.messages_count}</h1>
                        </div>
                    </div>
                `
            }
            
            completedBoxGauge.innerHTML = `
                <div class="d-flex flex-column align-items-center card rounded-total">
                    <div class="row" style="height:100px;">
                        <br>
                        <h6 class="card-title">Completed Sessions</h6>
                        
                    </div>
                    <div class="row" style="height:200px;">
                        <div id="gauge-chart"></div>
                    </div>
                </div>
            `
            completedBoxGaugeT.innerHTML = `
                <div class="d-flex flex-column align-items-center card rounded-total">
                    <div class="row" style="height:60px;">
                        <br>
                        <h6 class="card-title">Completed Sessions</h6>
                        
                    </div>
                    <div class="row" style="height:120px;">
                        <div id="gauge-chart-t"></div>
                    </div>
                </div>
            `
            completedBoxGaugeM.innerHTML = `
                <div class="d-flex flex-column align-items-center card rounded-total">
                    <div class="row" style="height:50px;">
                        <br>
                        <h6 class="card-title">Completed Sessions</h6>
                        
                    </div>
                    <div class="row" style="height:95px;">
                        <div id="gauge-chart-m"></div>
                    </div>
                </div>
            `

            var data = [
                {
                    domain: { x: [0, 1], y: [0, 1] },
                    value: response.sessions_completed,
                    type: "indicator",
                    mode: "gauge+number",
                    gauge: {
                    axis: { range: [null, response.sessions_total] },
                            bar: { color: "rgb(192, 0, 14)" }, 
                            bgcolor: "white", 
                    }
                }
                ];
                
            var screenWidth = window.innerWidth;

            if (screenWidth <= 769) {
                var layout = { width: 400, height: 100, margin: { t: 0, b: 0 }, paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)'};
                Plotly.newPlot('gauge-chart-m', data, layout);
                } else if (screenWidth >= 1306) {
                var layout = { width: 380, height: 150, margin: { t: 0, b: 0 }, paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)'};
                Plotly.newPlot('gauge-chart', data, layout);
                } else {
                var layout = { width: 300, height: 120, margin: { t: 0, b: 0 }, paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)'};
                Plotly.newPlot('gauge-chart-t', data, layout, { displayModeBar: false });
                }


            noaBox.innerHTML = `
                <canvas id="noa-plot" class="mx-3" style="height: 100%;"></canvas>
            `
            noaBoxT.innerHTML = `
                <canvas id="noa-plot-t"></canvas>
            `
            noaBoxM.innerHTML = `
                <canvas id="noa-plot-m"></canvas>
            `

            var dates = response.dates
            analyses_count = response.analyses_count

            var data =  {
                labels: dates,
                datasets: [
                {
                    fill: true, 
                    label: 'Number of Analyses per Day',
                    data: analyses_count,
                    borderWidth:1,
                    tension:0.4,
                    borderColor: 'rgb(192, 0, 14)',
                    backgroundColor: 'rgba(192, 0, 14)'
                }]
            }

            var config = {
                type: 'bar',
                data: data,
                options: {
                    scales: {
                    y: {
                        beginAtZero: true,
                        stepSize: 1,
                        suggestedMin: 0, // Ensure the minimum value is an integer (e.g., 0)
                        suggestedMax: Math.ceil(Math.max(...analyses_count)), 
                    }
                    },
                    plugins: {
                    legend: {
                        display: true,
                        position: 'top', // Adjust the position as needed
                    },
                    },
                },
                };

            if (screenWidth <= 769){
                var ctx = document.getElementById("noa-plot-m")
                ctx.style.backgroundColor = 'white';
                var noaChart = new Chart(
                    ctx,
                    config
                )
            }
            else if (screenWidth >=1306){
                var ctx = document.getElementById("noa-plot")
                ctx.style.backgroundColor = 'white';
                var noaChart = new Chart(
                    ctx,
                    config
                )
            }
            else{
                var ctx = document.getElementById("noa-plot-t")
                ctx.style.backgroundColor = 'white';
                var noaChart = new Chart(
                    ctx,
                    config
                )
            }

        },
        error: function(error){
            console.log(error)
        }

    })

}

loadAdminData()

// load therapist information
var therapistInfoBox = document.getElementById("therapist-info-box")
var therapistInfoBoxT = document.getElementById("therapist-info-box-t")
var therapistInfoBoxM = document.getElementById("therapist-info-box-m")
var messagesInfoBox = document.getElementById("message-info-box") 
var messagesInfoBoxT = document.getElementById("message-info-box-t") 
var messagesInfoBoxM = document.getElementById("message-info-box-m") 

const loadTherapistData = () => {

    $.ajax({
        
        type: "GET",
        url: url + "load_admin_info/",
        success: function(response){
            var sessions = response.data.sessions
            var messages = response.data.messages
            therapistInfoBox.innerHTML = `
                <h1>${response.data.therapist_name}</h1>
                <hr style="width: 40%;">
                <br>
                <h5 style="color: grey;">Balgrist</h5>
                <h5 style="color: grey;">${response.data.therapist_mail}</h5>
                <h5 style="color: grey;">${response.data.therapist_phone}</h5>
                <br>
                <div style="display: flex; text-align: center; justify-content: space-between; width: 60%;" class="mb-3">
                    <a class="dashboard-button mx-1 rounded-3" style="text-decoration: none;" href="#messages">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="my-1 bi bi-chat" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                        </svg>
                    </a>
                    <a class="dashboard-button mx-1 rounded-3" style="text-decoration: none;" href="#skaalendar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="my-1 bi bi-calendar" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                        </svg>
                    </a>
                </div>
            `
            goToTheElement("messages")
            goToTheElement("skaalendar")

            therapistInfoBoxT.innerHTML = `
                <hr class="mx-1">
                <h1 style="font-size:30;">${response.data.therapist_name}</h1>
                <h5 style="color: grey; font-size:15;">Balgrist</h5>
                <h5 style="color: grey; font-size:15;">${response.data.therapist_mail}</h5>
                <h5 style="color: grey; font-size:15;">${response.data.therapist_phone}</h5>
                <br>
                <div style="display: flex; text-align: center; justify-content: center;" class="mb-3">
                    <a class="dashboard-button mx-1 rounded-3"style="text-decoration: none;" href="#messages-t">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="my-1 bi bi-chat" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                        </svg>
                    </a>
                    <a class="dashboard-button mx-1 rounded-3" style="text-decoration: none;" href="#skaalendar-t">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="my-1 bi bi-calendar" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                        </svg>
                    </a>
                </div>
            `
            goToTheElement("messages-t")
            goToTheElement("skaalendar-t")
            
            therapistInfoBoxM.innerHTML = `
                <h1>${response.data.therapist_name}</h1>
                <h5 style="color: grey;">Balgrist</h5>
                <h5 style="color: grey;">${response.data.therapist_mail}</h5>
                <h5 style="color: grey;">${response.data.therapist_phone}</h5>
                <br>
                <div style="display: flex; text-align: center; justify-content: center;" class="mb-3">
                    <a class="dashboard-button mx-1 rounded-3"style="text-decoration: none;" href="#messages-m">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="my-1 bi bi-chat" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                        </svg>
                    </a>
                    <a class="dashboard-button mx-1 rounded-3" style="text-decoration: none;" href="#skaalendar-m">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="my-1 bi bi-calendar" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                        </svg>
                    </a>
                </div>
            `
            goToTheElement("messages-m")
            goToTheElement("skaalendar-m")

            messagesInfoBox.innerHTML = ''
            messagesInfoBoxT.innerHTML = ''
            messagesInfoBoxM.innerHTML = ''

            messages.forEach(message => {

                if (message.count_new > 0){
                    
                    messagesInfoBox.innerHTML += `
                        <div id="message-${message.id}" class="col-xl-12 my-3 patient-info">
                            <div>
                                <h4 style="font-size: 17; color: rgb(192,0,14)">${message.patient}:</h4>
                                <p style="font-size: 19; width:100%;">${message.sender}: ${message.text}</p>
                                <h6 style="font-size:15; color: grey;">${message.date}</h6>
                            </div>
                            <div>
                                <span class="new-messages mx-2">${message.count_new}</span>
                            </div>
                        </div>
                    `
                    messagesInfoBoxT.innerHTML += `
                        <div id="message-${message.id}-t" class="col-md-12 my-3 patient-info-tablet">
                            <div>
                                <h4 style="font-size: 15; color: rgb(192,0,14)">${message.patient}:</h4>
                                <p style="font-size: 17; width:100%;">${message.sender}: ${message.text}</p>
                                <h6 style="font-size: 13; color: grey;">${message.date}</h6>
                            </div>
                            <div>
                                <span class="new-messages mx-2">${message.count_new}</span>
                            </div>
                        </div>
                    `
                    messagesInfoBoxM.innerHTML += `
                        <div id="message-${message.id}-m" class="col-xs-12 my-3 patient-info-mobile">
                            <div class="mx-2">
                                <h4 style="font-size: 13; color: rgb(192,0,14)">${message.patient}:</h4>
                                <p style="font-size: 15; width:100%;">${message.sender}: ${message.text}</p>
                                <h6 style="font-size: 12; color: grey;">${message.date}</h6>
                            </div>
                            <div>
                                <span class="new-messages mx-2">${message.count_new}</span>
                            </div>
                        </div>
                    `

                }
                else if (message.count_new === 0) {
                    
                    messagesInfoBox.innerHTML += `
                        <div id="message-${message.id}" class="col-xl-12 my-3 patient-info">
                            <div>
                                <h4 style="font-size: 17; color: rgb(192,0,14)">${message.patient}:</h4>
                                <p style="font-size: 19; width:100%;">${message.sender}: ${message.text}</p>
                                <h6 style="font-size:15; color: grey;">${message.date}</h6>
                            </div>
                            <div>
                            </div>
                        </div>
                    `
                    messagesInfoBoxT.innerHTML += `
                        <div id="message-${message.id}-t" class="col-md-12 my-3 patient-info-tablet">
                            <div>
                                <h4 style="font-size: 15; color: rgb(192,0,14)">${message.patient}:</h4>
                                <p style="font-size: 17; width:100%;">${message.sender}: ${message.text}</p>
                                <h6 style="font-size: 13; color: grey;">${message.date}</h6>
                            </div>
                            <div>
                            </div>
                        </div>
                    `
                    messagesInfoBoxM.innerHTML += `
                        <div id="message-${message.id}-m" class="col-xs-12 my-3 patient-info-mobile">
                            <div>
                                <h4 style="font-size: 13; color: rgb(192,0,14)">${message.patient}:</h4>
                                <p style="font-size: 15; width:100%;">${message.sender}: ${message.text}</p>
                                <h6 style="font-size: 12; color: grey;">${message.date}</h6>
                            </div>
                            <div>
                            </div>
                        </div>
                    `

                }

            })

            var screenWidth = window.innerWidth;
            //create the calendar
            if (screenWidth <= 769){
                showCalendar(sessions, 'calendar-m', 450, 430, views="listMonth")
            }
            else if (screenWidth >=1306){
                showCalendar(sessions, 'calendar', 650, 630)
            }
            else{
                showCalendar(sessions, 'calendar-t', 550, 530, views="dayGridMonth,timeGridDay,listMonth")
            }

            messages_list = messages.map(message => {
                return {
                    id: message.id,
                    patient_name: message.patient
                }
            })

            const searchInputMessages = document.querySelector("[data-search-messages]")
            searchChatInputFunction(searchInputMessages, messages_list, "")
            const searchInputMessagesT = document.querySelector("[data-search-messages-t]")
            searchChatInputFunction(searchInputMessagesT, messages_list, '-t')
            const searchInputMessagesM = document.querySelector("[data-search-messages-m]")
            searchChatInputFunction(searchInputMessagesM, messages_list, '-m')
        },
        error: function(error){
            console.log(error)
        }

    })

}

loadTherapistData()

// on resize, call everything again
window.addEventListener('resize', () => {
    var windowWidth = window.innerWidth;

    loadAdminData()
    loadPatients()
    loadTherapistData()

});

// load analysis for a specific patient. 
const loadAnalysis = (patientId, value=300) => {
    drawAnalysisGraphs(patientId, value)
}

var searchInputNom = document.querySelector("[data-search-nom]")
setNumberOfMovements(searchInputNom, "error-input-nom-box")
var searchInputNomTablet = document.querySelector("[data-search-nom-t]")
setNumberOfMovements(searchInputNomTablet, "error-input-nom-box-t")
var searchInputNomMobile = document.querySelector("[data-search-nom-m]")
setNumberOfMovements(searchInputNomMobile, "error-input-nom-box-m")

function showCompleteCalendar(sessionPatient, sessionOthers, elementId, hh, hc, views="dayGridMonth"){
    var p_sessions_list = updateCalendar(sessionPatient)
    var op_sessions_list = updateCalendar(sessionOthers)
    var calendarEl = document.getElementById(elementId);
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: views,
        },
        height: hh,
        contentHeight: hc,
        aspectRatio: 3,
        nowIndicator: true,
        now: new Date().toISOString(), // Get the current date and time in ISO format
        views: {
        dayGridMonth: { buttonText: 'month' },
        },
        themeSystem: 'bootstrap5',
        eventSources:[
            {
                events: p_sessions_list,
                color: "rgba(192,0,14,0.5)",
                textColor: "black"
            },
            {
                events: op_sessions_list,
                color: "rgba(0,0,256, 0.5)",
                textColor: "black"
            }
        ]
    });
    calendar.render();
}

function showSessionsDropdown(sessionsToComplete, typeScreen){
    document.getElementById(`dropdownSessionMenu${typeScreen}`).innerHTML = ""
                
    sessionsToComplete.forEach(session => {
        document.getElementById(`dropdownSessionMenu${typeScreen}`).innerHTML += `
            <li><a class="dropdown-item" id="session-update-${session.id}${typeScreen}">${session.title}</a></li>
        `
    })
    sessionsToComplete.forEach(session => {
        document.getElementById(`session-update-${session.id}${typeScreen}`).addEventListener('click', function(event){
            event.preventDefault()

            selectedSessionId = session.id
            if (selectedSessionId != 0){
                document.getElementById(`session-name-update${typeScreen}`).innerHTML = `
                    What action do you want to take for session with date: "${session.title}"?
                `
                document.getElementById(`complete-button${typeScreen}`).classList.remove("not-visible")
                document.getElementById(`delete-button${typeScreen}`).classList.remove("not-visible")
            }
        })
    })
}

// load session dashboard for a specific patient
const loadSessions = (patientId) => {

    $.ajax({

        type:"GET",
        url: url + `load_sessions/${patientId}`,
        success: function(response){
            selectedPatient = patientId
            var screenWidth = window.innerWidth;
            var patient_sessions = response.data.patientSessions
            var other_patients_sessions = response.data.otherPatientsSessions
            var sessionsToComplete = response.data.sessionsToComplete
            //create the calendar
            if (screenWidth <= 769){
                showCompleteCalendar(patient_sessions, other_patients_sessions, 'calendar-sessions-m', 450, 430, views="dayGridMonth,listMonth")
                showSessionsDropdown(sessionsToComplete, "-m")
            }
            else if (screenWidth >=1306){
                showCompleteCalendar(patient_sessions, other_patients_sessions, 'calendar-sessions', 650, 630, views="dayGridMonth")
                showCalendar(patient_sessions, 'list-sessions', 650, 630, "listMonth")
                showSessionsDropdown(sessionsToComplete, "")
            }
            else{
                showCompleteCalendar(patient_sessions, other_patients_sessions, 'calendar-sessions-t', 550, 530, views="dayGridMonth")
                showCalendar(patient_sessions, 'list-sessions-t', 550, 530, "listMonth")
                showSessionsDropdown(sessionsToComplete, "-t")
            }
        },
        error: function(error){
            console.log(error)
        }

    })

}

const loadMessages = (patientId) => {

    $.ajax({

        type:"GET",
        url: url + `load_messages/${patientId}`,
        success: function(response){
            selectedPatient = patientId

            var screenWidth = window.innerWidth;
            if (screenWidth <= 769){
                
                var PatientNameChatH1M = document.getElementById("patient-name-chat-m")
                PatientNameChatH1M.innerHTML = `
                    <h1>${response.data.patient_name}</h1>
                `
                var messageChatBoxM = document.getElementById("chat-box-m")
                messageChatBoxM.innerHTML = ""
                response.data.messages.forEach(message => {
                    if (message.sender == `${response.data.patient_name}`){
                        messageChatBoxM.innerHTML += `
                            <div class="row" style="margin: 5px; width: 95%;">
                                <div class="m-1 rounded-3" style="background-color: rgba(35, 182, 42, 0.45);">
                                    <p style="width: 90%; word-wrap: break-word; text-align: left; margin: 5px;">${message.text}</p>
                                    <p style="color: grey; font-size: 12;">Sent on: ${message.time}</p>
                                </div>
                            </div>
                        `
                    }
                    else if(message.sender == `${response.data.therapist_name}`){
                        messageChatBoxM.innerHTML += `
                            <div class="row" style="margin: 5px; width: 95%; text-align: right;">
                                <div class=" m-2 rounded-3" style=" background-color: rgba(214, 223, 222, 0.555);">
                                    <p style="word-wrap: break-word; text-align: right; margin: 5px;">${message.text}</p>
                                    <p style="color: grey; font-size: 12; word-wrap: break-word; text-align: right; margin: 5px;">Sent on: ${message.time}</p>
                                </div>
                            </div>
                        `
                    }
                    scrollToBottom(messageChatBoxM)
                })
                    
            }
            else if (screenWidth >=1306){
                
                var PatientNameChatH1 = document.getElementById("patient-name-chat")
                PatientNameChatH1.innerHTML = `
                    <h1>${response.data.patient_name}</h1>
                `
                var messageChatBox = document.getElementById("chat-box")
                messageChatBox.innerHTML = ""
                response.data.messages.forEach(message => {
                    if (message.sender == `${response.data.patient_name}`){
                        messageChatBox.innerHTML += `
                            <div class="row">
                                <div class="col-xl-1"></div>
                                <div class="col-xl-7 my-2 border border-dark rounded-3 ml-3" style="background-color: rgba(35, 182, 42, 0.45);">
                                    <p style="width: 100%; word-wrap: break-word; display: inline-block;"> ${message.text}</p>
                                    <p style="color: grey; font-size: 12;">Sent on: ${message.time}</p>
                                </div>
                            </div>
                        `
                    }
                    else if(message.sender == `${response.data.therapist_name}`){
                        messageChatBox.innerHTML += `
                            <div class="row">
                                <div class="col-xl-3 my-2"></div>
                                <div class="col-xl-7 my-2 border border-dark rounded-3" style="background-color: rgba(214, 223, 222, 0.555);">
                                    <p style="width: 100%; word-wrap: break-word; display: inline-block;"> ${message.text}</p>
                                    <p style="color: grey; font-size: 12;">Sent on: ${message.time}</p>
                                </div>
                                <div class="col-xl-1"></div>
                            </div>
                        `
                    }
                    scrollToBottom(messageChatBox)
                })
            }
            else{
                
                var PatientNameChatH1T = document.getElementById("patient-name-chat-t")
                PatientNameChatH1T.innerHTML = `
                    <h1>${response.data.patient_name}</h1>
                `
                var messageChatBoxT = document.getElementById("chat-box-t")
                messageChatBoxT.innerHTML = ""
                response.data.messages.forEach(message => {
                    if (message.sender == `${response.data.patient_name}`){
                        messageChatBoxT.innerHTML += `
                            <div class="row">
                                <div class="col-md-1"></div>
                                <div class="col-md-7 my-2 border border-dark rounded-3 ml-3" style="background-color: rgba(35, 182, 42, 0.45);">
                                    <p style="width: 100%; word-wrap: break-word; display: inline-block;"> ${message.text}</p>
                                    <p style="color: grey; font-size: 12;">Sent on: ${message.time}</p>
                                </div>
                            </div>
                        `
                    }
                    else if(message.sender == `${response.data.therapist_name}`){
                        messageChatBoxT.innerHTML += `
                            <div class="row">
                                <div class="col-md-3 my-2"></div>
                                <div class="col-md-7 my-2 border border-dark rounded-3" style="background-color: rgba(214, 223, 222, 0.555);">
                                    <p style="width: 100%; word-wrap: break-word; display: inline-block;"> ${message.text}</p>
                                    <p style="color: grey; font-size: 12;">Sent on: ${message.time}</p>
                                </div>
                                <div class="col-md-1"></div>
                            </div>
                        `
                    }
                    scrollToBottom(messageChatBoxT)
                })

            }
        },
        error: function(error){
            console.log(error)
        }

    })

}

// book | desktop
var bookAlertBox = document.getElementById('book-alert-box')
var bookForm = document.getElementById("book-form")

document.getElementById("id_date").setAttribute("id", "id_date_desktop")
var date = document.getElementById("id_date_desktop")

var csrf = document.getElementsByName("csrfmiddlewaretoken")[2]

bookForm.addEventListener('submit', e=>{
    e.preventDefault()
    bookFormFunction(csrf, date, selectedPatient, bookAlertBox)
})

// Messages | desktop
var messageForm = document.getElementById("m-form")

document.getElementById("id_textMessage").setAttribute("id", "id_textMessage_desktop")
var message = document.getElementById("id_textMessage_desktop")

var csrfMessage = document.getElementsByName("csrfmiddlewaretoken")[3]

messageForm.addEventListener('submit', e=>{
    e.preventDefault()
    messagePostFunction(csrfMessage, message, selectedPatient)
})

// upload | desktop
var uploadAlertBox = document.getElementById('upload-alert-box')
var uploadForm = document.getElementById("upload-form")

document.getElementById("id_date").setAttribute("id", "id_date_desktop_upload")
var dateUpload = document.getElementById("id_date_desktop_upload")
document.getElementById("id_data_file").setAttribute("id", "id_data_file_desktop_upload")
var dataFileUpload = document.getElementById("id_data_file_desktop_upload")

var csrfUpload = document.getElementsByName("csrfmiddlewaretoken")[4]

uploadForm.addEventListener('submit', e=>{
    e.preventDefault()
    uploadFormFunction(csrfUpload, dateUpload, dataFileUpload, selectedPatient, uploadAlertBox)
})

// Book | tablet
var bookAlertBoxTablet = document.getElementById('book-alert-box-t')
var bookFormTablet = document.getElementById("book-form-t")
document.getElementById("id_date").setAttribute("id", "id_date_tablet")
var dateT = document.getElementById("id_date_tablet")

var csrfTablet = document.getElementsByName("csrfmiddlewaretoken")[5]

bookFormTablet.addEventListener('submit', e=>{
    e.preventDefault()
    bookFormFunction(csrfTablet, dateT, selectedPatient, bookAlertBoxTablet)
})

// message | tablet
var messageFormTablet = document.getElementById("m-form-t")

document.getElementById("id_textMessage").setAttribute("id", "id_textMessage_tablet")
var messageTablet = document.getElementById("id_textMessage_tablet")

var csrfMessageTablet = document.getElementsByName("csrfmiddlewaretoken")[6]

messageFormTablet.addEventListener('submit', e=>{
    e.preventDefault()
    messagePostFunction(csrfMessageTablet, messageTablet, selectedPatient)
})

// upload | tablet
var uploadAlertBoxTablet = document.getElementById('upload-alert-box-t')
var uploadFormTablet = document.getElementById("upload-form-t")

document.getElementById("id_date").setAttribute("id", "id_date_tablet_upload")
var dateUploadTablet = document.getElementById("id_date_tablet_upload")
document.getElementById("id_data_file").setAttribute("id", "id_data_file_tablet_upload")
var dataFileUploadTablet = document.getElementById("id_data_file_tablet_upload")

var csrfUploadTablet = document.getElementsByName("csrfmiddlewaretoken")[7]

uploadFormTablet.addEventListener('submit', e=>{
    e.preventDefault()
    uploadFormFunction(csrfUploadTablet, dateUploadTablet, dataFileUploadTablet, selectedPatient, uploadAlertBoxTablet)
})

// book | mobile
var bookAlertBoxMobile = document.getElementById('book-alert-box-m')
var bookFormMobile = document.getElementById("book-form-m")

document.getElementById("id_date").setAttribute("id", "id_date_mobile")
var dateM = document.getElementById("id_date_mobile")

var csrfMobile = document.getElementsByName("csrfmiddlewaretoken")[8]

bookFormMobile.addEventListener('submit', e=>{
    e.preventDefault()
    bookFormFunction(csrfMobile, dateM, selectedPatient, bookAlertBoxMobile)
})

// message | mobile
var messageFormMobile = document.getElementById("m-form-m")

document.getElementById("id_textMessage").setAttribute("id", "id_textMessage_mobile")
var messageMobile = document.getElementById("id_textMessage_mobile")

var csrfMessageMobile = document.getElementsByName("csrfmiddlewaretoken")[9]

messageFormMobile.addEventListener('submit', e=>{
    e.preventDefault()
    messagePostFunction(csrfMessageMobile, messageMobile, selectedPatient)
})

// upload | mobile
var uploadAlertBoxMobile = document.getElementById('upload-alert-box-m')
var uploadFormMobile = document.getElementById("upload-form-m")
document.getElementById("id_date").setAttribute("id", "id_date_mobile_upload")
var dateUploadMobile = document.getElementById("id_date_mobile_upload")
document.getElementById("id_data_file").setAttribute("id", "id_data_file_mobile_upload")
var dataFileUploadMobile = document.getElementById("id_data_file_mobile_upload")

var csrfUploadMobile = document.getElementsByName("csrfmiddlewaretoken")[10]

uploadFormMobile.addEventListener('submit', e=>{
    e.preventDefault()
    uploadFormFunction(csrfUploadMobile, dateUploadMobile, dataFileUploadMobile, selectedPatient, uploadAlertBoxMobile)
})  


//Complete and delete functionalities
document.getElementById("complete-button").addEventListener('click', function(event){
    event.preventDefault()

    completeSessionPut({completed:"True"}, "")
})

document.getElementById("delete-button").addEventListener('click', function(event){
    event.preventDefault()
    
    deleteSession("")
})

document.getElementById("complete-button-t").addEventListener('click', function(event){
    event.preventDefault()

    completeSessionPut({completed:"True"}, "-t")
})

document.getElementById("delete-button-t").addEventListener('click', function(event){
    event.preventDefault()
    
    deleteSession("-t")
})

document.getElementById("complete-button-m").addEventListener('click', function(event){
    event.preventDefault()

    completeSessionPut({completed:"True"}, "-m")
})

document.getElementById("delete-button-m").addEventListener('click', function(event){
    event.preventDefault()
    
    deleteSession("-m")
})