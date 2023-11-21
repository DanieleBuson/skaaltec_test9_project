// globally useful variables

var adminBox = document.getElementById("admin")
var skaalendarBox = document.getElementById("skaalendar")
var messagesBox = document.getElementById("messages")
var analysisBox = document.getElementById("analysis")
var sessionsBox = document.getElementById("sessions")

var adminTabletBox = document.getElementById("admin-t")
var skaalendarTabletBox = document.getElementById("skaalendar-t")
var messagesTabletBox = document.getElementById("messages-t")
var analysisTabletBox = document.getElementById("analysis-t")
var sessionsTabletBox = document.getElementById("sessions-t")

var adminMobileBox = document.getElementById("admin-m")
var skaalendarMobileBox = document.getElementById("skaalendar-m")
var messagesMobileBox = document.getElementById("messages-m")
var analysisMobileBox = document.getElementById("analysis-m")
var sessionsMobileBox = document.getElementById("sessions-m")

url = window.location.href

// Function to show and hide the search bar by clicking the icon

function toggleSearchBar() {
    var searchBar = document.getElementById('search-bar-box');
    if (searchBar) {
        searchBar.classList.toggle('not-visible');
    }
}

function toggleSearchBarTablet() {
    var searchBarBoxT = document.getElementById("search-bar-box-tablet")
    if (searchBarBoxT){
        searchBarBoxT.classList.toggle('not-visible')
    }
}

function toggleSearchBarMobile() {
    var searchInfoBox = document.getElementById("patient-search-info-box")
    if (searchInfoBox){
        searchInfoBox.classList.toggle('not-visible')
    }
}

function toggleSearchBarMessage() {
    var searchInfoBox = document.getElementById("search-bar-box-message")
    if (searchInfoBox){
        searchInfoBox.classList.toggle('not-visible')
    }
}

function toggleSearchBarMessageTablet() {
    var searchInfoBox = document.getElementById("search-bar-box-message-tablet")
    if (searchInfoBox){
        searchInfoBox.classList.toggle('not-visible')
    }
}

function toggleSearchBarMessageMobile() {
    var searchInfoBox = document.getElementById("search-bar-box-message-mobile")
    if (searchInfoBox){
        searchInfoBox.classList.toggle('not-visible')
    }
}

// loadPatients() function in ajax

var patientInfoBox = document.getElementById("patient-info-box")
var patientInfoBoxTablet = document.getElementById("patient-info-box-tablet")
var patientInfoBoxMobile = document.getElementById("patient-info-box-mobile")
var patientNameSession = document.getElementById("patient-name-session")
var patientNameSessionTablet = document.getElementById("patient-name-session-t")
var patientNameSessionMobile = document.getElementById("patient-name-session-m")
var selectedPatient = 0
var analysisId = 0

const loadPatients = () => {

    $.ajax({
        type: "GET",
        url: url + "load_patients/",
        success: function(response){
            data = response.data
            setTimeout(() => {
                patientInfoBox.innerHTML = ''
                patientInfoBoxTablet.innerHTML = ''
                patientInfoBoxMobile.innerHTML = ''
                data.forEach(element => {
                    patientNameSession.innerHTML = `
                        ${element.patient_name}
                    `
                    patientInfoBox.innerHTML += `
                        <div id="patient-${element.id}" class="col-xl-12 my-1 patient-info">
                            <div>
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
                                    <li><a class="dropdown-item" href="#">Message</a></li>
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
                            <div>
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
                                    <li><a class="dropdown-item" href="#">Message</a></li>
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
                                    <li><a class="dropdown-item" href="#">Message</a></li>
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

                data.forEach(element => {
                    var analysisLink = document.getElementById(`analysis-${element.id}`)
                    analysisLink.addEventListener("click", function(event) {
                        event.preventDefault(); // Prevent the default link behavior
                        
                        loadAnalysis(element.id)
                        selectedPatient = element.id
                        if (!adminBox.classList.contains("not-visible")){
                            adminBox.classList.add("not-visible")
                        }
                        if (!skaalendarBox.classList.contains("not-visible")){
                            skaalendarBox.classList.add("not-visible")
                        }
                        if (!messagesBox.classList.contains("not-visible")){
                            messagesBox.classList.add("not-visible")
                        }
                        if (!sessionsBox.classList.contains("not-visible")){
                            sessionsBox.classList.add("not-visible")
                        }
                        if (document.getElementById(`ics-${element.id}`).classList.contains("not-visible")){
                            document.getElementById(`ics-${element.id}`).classList.remove("not-visible")
                        }
                        if (!document.getElementById(`patient-${element.id}-name`).classList.contains("active-patient")){
                            document.getElementById(`patient-${element.id}-name`).classList.add("active-patient")
                        }
                        if (!document.getElementById(`dropdown-${element.id}`).classList.contains("not-visible")){
                            document.getElementById(`dropdown-${element.id}`).classList.add("not-visible")
                        }
                        if (analysisBox.classList.contains("not-visible")){
                            analysisBox.classList.remove("not-visible")
                        }
                        
                    });

                    var sessionLink = document.getElementById(`session-${element.id}`)
                    sessionLink.addEventListener("click", function(event) {
                        event.preventDefault(); // Prevent the default link behavior
                  
                        loadSessions(element.id)
                        selectedPatient = element.id
                        if (!adminBox.classList.contains("not-visible")){
                            adminBox.classList.add("not-visible")
                        }
                        if (!skaalendarBox.classList.contains("not-visible")){
                            skaalendarBox.classList.add("not-visible")
                        }
                        if (!messagesBox.classList.contains("not-visible")){
                            messagesBox.classList.add("not-visible")
                        }
                        if (!analysisBox.classList.contains("not-visible")){
                            analysisBox.classList.add("not-visible")
                        }
                        if (document.getElementById(`ics-${element.id}`).classList.contains("not-visible")){
                            document.getElementById(`ics-${element.id}`).classList.remove("not-visible")
                        }
                        if (!document.getElementById(`patient-${element.id}-name`).classList.contains("active-patient")){
                            document.getElementById(`patient-${element.id}-name`).classList.add("active-patient")
                        }
                        if (!document.getElementById(`dropdown-${element.id}`).classList.contains("not-visible")){
                            document.getElementById(`dropdown-${element.id}`).classList.add("not-visible")
                        }
                        if (sessionsBox.classList.contains("not-visible")){
                            sessionsBox.classList.remove("not-visible")
                        }
                        
                    });

                    var admin = document.getElementById(`home-${element.id}`)
                    admin.addEventListener("click", function(event) {
                        event.preventDefault(); // Prevent the default link behavior
                  
                        if (adminBox.classList.contains("not-visible")){
                            adminBox.classList.remove("not-visible")
                        }
                        if (skaalendarBox.classList.contains("not-visible")){
                            skaalendarBox.classList.remove("not-visible")
                        }
                        if (messagesBox.classList.contains("not-visible")){
                            messagesBox.classList.remove("not-visible")
                        }
                        if (!analysisBox.classList.contains("not-visible")){
                            analysisBox.classList.add("not-visible")
                        }
                        if (!document.getElementById(`ics-${element.id}`).classList.contains("not-visible")){
                            document.getElementById(`ics-${element.id}`).classList.add("not-visible")
                        }
                        if (document.getElementById(`patient-${element.id}-name`).classList.contains("active-patient")){
                            document.getElementById(`patient-${element.id}-name`).classList.remove("active-patient")
                        }
                        if (document.getElementById(`dropdown-${element.id}`).classList.contains("not-visible")){
                            document.getElementById(`dropdown-${element.id}`).classList.remove("not-visible")
                        }
                        if (!sessionsBox.classList.contains("not-visible")){
                            sessionsBox.classList.add("not-visible")
                        }
                        
                    });

                    var analysisLinkTablet = document.getElementById(`analysis-${element.id}-t`)
                    analysisLinkTablet.addEventListener("click", function(event) {
                        event.preventDefault(); // Prevent the default link behavior
                        
                        loadAnalysis(element.id)
                        selectedPatient = element.id
                        if (!adminTabletBox.classList.contains("not-visible")){
                            adminTabletBox.classList.add("not-visible")
                        }
                        if (!skaalendarTabletBox.classList.contains("not-visible")){
                            skaalendarTabletBox.classList.add("not-visible")
                        }
                        if (!messagesTabletBox.classList.contains("not-visible")){
                            messagesTabletBox.classList.add("not-visible")
                        }
                        if (!sessionsTabletBox.classList.contains("not-visible")){
                            sessionsTabletBox.classList.add("not-visible")
                        }
                        if (document.getElementById(`ics-${element.id}-t`).classList.contains("not-visible")){
                            document.getElementById(`ics-${element.id}-t`).classList.remove("not-visible")
                        }
                        if (!document.getElementById(`patient-${element.id}-t-name`).classList.contains("active-patient")){
                            document.getElementById(`patient-${element.id}-t-name`).classList.add("active-patient")
                        }
                        if (!document.getElementById(`dropdown-${element.id}-t`).classList.contains("not-visible")){
                            document.getElementById(`dropdown-${element.id}-t`).classList.add("not-visible")
                        }
                        if (analysisTabletBox.classList.contains("not-visible")){
                            analysisTabletBox.classList.remove("not-visible")
                        }
                        
                    });

                    var sessionLinkTablet = document.getElementById(`session-${element.id}-t`)
                    sessionLinkTablet.addEventListener("click", function(event) {
                        event.preventDefault(); // Prevent the default link behavior
                  
                        loadSessions(element.id)
                        selectedPatient = element.id
                        if (!adminTabletBox.classList.contains("not-visible")){
                            adminTabletBox.classList.add("not-visible")
                        }
                        if (!skaalendarTabletBox.classList.contains("not-visible")){
                            skaalendarTabletBox.classList.add("not-visible")
                        }
                        if (!messagesTabletBox.classList.contains("not-visible")){
                            messagesTabletBox.classList.add("not-visible")
                        }
                        if (!analysisTabletBox.classList.contains("not-visible")){
                            analysisTabletBox.classList.add("not-visible")
                        }
                        if (document.getElementById(`ics-${element.id}-t`).classList.contains("not-visible")){
                            document.getElementById(`ics-${element.id}-t`).classList.remove("not-visible")
                        }
                        if (!document.getElementById(`patient-${element.id}-t-name`).classList.contains("active-patient")){
                            document.getElementById(`patient-${element.id}-t-name`).classList.add("active-patient")
                        }
                        if (!document.getElementById(`dropdown-${element.id}-t`).classList.contains("not-visible")){
                            document.getElementById(`dropdown-${element.id}-t`).classList.add("not-visible")
                        }
                        if (sessionsTabletBox.classList.contains("not-visible")){
                            sessionsTabletBox.classList.remove("not-visible")
                        }
                        
                    });

                    var adminTablet = document.getElementById(`home-${element.id}-t`)
                    adminTablet.addEventListener("click", function(event) {
                        event.preventDefault(); // Prevent the default link behavior
                  
                        if (adminTabletBox.classList.contains("not-visible")){
                            adminTabletBox.classList.remove("not-visible")
                        }
                        if (skaalendarTabletBox.classList.contains("not-visible")){
                            skaalendarTabletBox.classList.remove("not-visible")
                        }
                        if (messagesTabletBox.classList.contains("not-visible")){
                            messagesTabletBox.classList.remove("not-visible")
                        }
                        if (!analysisTabletBox.classList.contains("not-visible")){
                            analysisTabletBox.classList.add("not-visible")
                        }
                        if (!document.getElementById(`ics-${element.id}-t`).classList.contains("not-visible")){
                            document.getElementById(`ics-${element.id}-t`).classList.add("not-visible")
                        }
                        if (document.getElementById(`patient-${element.id}-t-name`).classList.contains("active-patient")){
                            document.getElementById(`patient-${element.id}-t-name`).classList.remove("active-patient")
                        }
                        if (document.getElementById(`dropdown-${element.id}-t`).classList.contains("not-visible")){
                            document.getElementById(`dropdown-${element.id}-t`).classList.remove("not-visible")
                        }
                        if (!sessionsTabletBox.classList.contains("not-visible")){
                            sessionsTabletBox.classList.add("not-visible")
                        }
                        
                    });

                    var analysisLinkMobile = document.getElementById(`analysis-${element.id}-m`)
                    analysisLinkMobile.addEventListener("click", function(event) {
                        event.preventDefault(); // Prevent the default link behavior
                        
                        loadAnalysis(element.id)
                        selectedPatient = element.id
                        if (!adminMobileBox.classList.contains("not-visible")){
                            adminMobileBox.classList.add("not-visible")
                        }
                        if (!skaalendarMobileBox.classList.contains("not-visible")){
                            skaalendarMobileBox.classList.add("not-visible")
                        }
                        if (!messagesMobileBox.classList.contains("not-visible")){
                            messagesMobileBox.classList.add("not-visible")
                        }
                        if (!sessionsMobileBox.classList.contains("not-visible")){
                            sessionsMobileBox.classList.add("not-visible")
                        }
                        if (document.getElementById(`ics-${element.id}-m`).classList.contains("not-visible")){
                            document.getElementById(`ics-${element.id}-m`).classList.remove("not-visible")
                        }
                        if (!document.getElementById(`patient-${element.id}-m-name`).classList.contains("active-patient")){
                            document.getElementById(`patient-${element.id}-m-name`).classList.add("active-patient")
                        }
                        if (!document.getElementById(`dropdown-${element.id}-m`).classList.contains("not-visible")){
                            document.getElementById(`dropdown-${element.id}-m`).classList.add("not-visible")
                        }
                        if (analysisMobileBox.classList.contains("not-visible")){
                            analysisMobileBox.classList.remove("not-visible")
                        }
                        
                    });

                    var sessionLinkMobile = document.getElementById(`session-${element.id}-m`)
                    sessionLinkMobile.addEventListener("click", function(event) {
                        event.preventDefault(); // Prevent the default link behavior
                  
                        loadSessions(element.id)
                        selectedPatient = element.id
                        if (!adminMobileBox.classList.contains("not-visible")){
                            adminMobileBox.classList.add("not-visible")
                        }
                        if (!skaalendarMobileBox.classList.contains("not-visible")){
                            skaalendarMobileBox.classList.add("not-visible")
                        }
                        if (!messagesMobileBox.classList.contains("not-visible")){
                            messagesMobileBox.classList.add("not-visible")
                        }
                        if (!analysisMobileBox.classList.contains("not-visible")){
                            analysisMobileBox.classList.add("not-visible")
                        }
                        if (document.getElementById(`ics-${element.id}-m`).classList.contains("not-visible")){
                            document.getElementById(`ics-${element.id}-m`).classList.remove("not-visible")
                        }
                        if (!document.getElementById(`patient-${element.id}-m-name`).classList.contains("active-patient")){
                            document.getElementById(`patient-${element.id}-m-name`).classList.add("active-patient")
                        }
                        if (!document.getElementById(`dropdown-${element.id}-m`).classList.contains("not-visible")){
                            document.getElementById(`dropdown-${element.id}-m`).classList.add("not-visible")
                        }
                        if (sessionsMobileBox.classList.contains("not-visible")){
                            sessionsMobileBox.classList.remove("not-visible")
                        }
                        
                    });

                    var adminMobile = document.getElementById(`home-${element.id}-m`)
                    adminMobile.addEventListener("click", function(event) {
                        event.preventDefault(); // Prevent the default link behavior
                  
                        if (adminMobileBox.classList.contains("not-visible")){
                            adminMobileBox.classList.remove("not-visible")
                        }
                        if (skaalendarMobileBox.classList.contains("not-visible")){
                            skaalendarMobileBox.classList.remove("not-visible")
                        }
                        if (messagesMobileBox.classList.contains("not-visible")){
                            messagesMobileBox.classList.remove("not-visible")
                        }
                        if (!analysisMobileBox.classList.contains("not-visible")){
                            analysisMobileBox.classList.add("not-visible")
                        }
                        if (!document.getElementById(`ics-${element.id}-m`).classList.contains("not-visible")){
                            document.getElementById(`ics-${element.id}-m`).classList.add("not-visible")
                        }
                        if (document.getElementById(`patient-${element.id}-m-name`).classList.contains("active-patient")){
                            document.getElementById(`patient-${element.id}-m-name`).classList.remove("active-patient")
                        }
                        if (document.getElementById(`dropdown-${element.id}-m`).classList.contains("not-visible")){
                            document.getElementById(`dropdown-${element.id}-m`).classList.remove("not-visible")
                        }
                        if (!sessionsMobileBox.classList.contains("not-visible")){
                            sessionsMobileBox.classList.add("not-visible")
                        }
                        
                    });
                })

            }, 100)
            patients = data.map(patient => {
                return {
                    id: patient.id,
                    patient_name: patient.patient_name,
                    age: patient.age,
                }
            })
        },
        error: function(error){
            console.log(error)
        }


    })

}

// call the function to retrieve data

loadPatients()

//search input desktop

const searchInput = document.querySelector("[data-search]")

searchInput.addEventListener("input", (e) => {
    
    const value = e.target.value
    patients.forEach(patient => {
        const patientPage = document.getElementById(`patient-${patient.id}`)
        const isVisible = patient.patient_name.toLowerCase().includes(value.toLowerCase())
        if (!isVisible){
            patientPage.classList.add('not-visible')
        }
        else{
            if (patientPage.className.includes('not-visible')){
                patientPage.classList.remove('not-visible')
            }
        }
    })

    
})

// search input tablet

const searchInputTablet = document.querySelector("[data-search-tablet]")

searchInputTablet.addEventListener("input", (e) => {
    
    const value = e.target.value
    patients.forEach(patient => {
        const patientPage = document.getElementById(`patient-${patient.id}-t`)
        const isVisible = patient.patient_name.toLowerCase().includes(value.toLowerCase())
        if (!isVisible){
            patientPage.classList.add('not-visible')
        }
        else{
            if (patientPage.className.includes('not-visible')){
                patientPage.classList.remove('not-visible')
            }
        }
    })

    
})

// search input mobile

const searchInputMobile = document.querySelector("[data-search-mobile]")

searchInputMobile.addEventListener("input", (e) => {
    
    const value = e.target.value
    patients.forEach(patient => {
        const patientPage = document.getElementById(`patient-${patient.id}-m`)
        const isVisible = patient.patient_name.toLowerCase().includes(value.toLowerCase())
        if (!isVisible){
            patientPage.classList.add('not-visible')
        }
        else{
            if (patientPage.className.includes('not-visible')){
                patientPage.classList.remove('not-visible')
            }
        }
    })

    
})

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

            setTimeout(() => {
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

                dates = response.dates
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


            }, 100)

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
//useful function
var sessions_list = []

function updateCalendar(sessions){
    sessions_list = sessions.map(element => {
        return {
            title: element.title,
            start: moment(element.start).format('YYYY-MM-DDTHH:mm:ss'),
        };
    });
    return sessions_list
}


const loadTherapistData = () => {

    $.ajax({
        
        type: "GET",
        url: url + "load_admin_info/",
        success: function(response){
            var sessions = response.data.sessions
            var messages = response.data.messages
            setTimeout(() => {

                therapistInfoBox.innerHTML = `
                    <h1>${response.data.therapist_name}</h1>
                    <hr style="width: 40%;">
                    <br>
                    <h5 style="color: grey;">Balgrist</h5>
                    <h5 style="color: grey;">${response.data.therapist_mail}</h5>
                    <h5 style="color: grey;">${response.data.therapist_phone}</h5>
                    <br>
                    <div style="display: flex; text-align: center; justify-content: space-between; width: 60%;" class="mb-3">
                        <a class="dashboard-button mx-1 rounded-3"style="text-decoration: none;" href="#messages">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="my-1 bi bi-chat" viewBox="0 0 16 16">
                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                            </svg>
                        </a>
                        <a class="dashboard-button mx-1 rounded-3" style="text-decoration: none;" href="#skaalendar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="my-1 bi bi-calendar" viewBox="0 0 16 16">
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                            </svg>
                        </a>
                        <a class="dashboard-button mx-1 rounded-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="my-1 bi bi-gear" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                        </a>
                    </div>
                `
                
                document.querySelector('a[href="#messages"]').addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent the default behavior of the anchor tag
                
                    // Scroll to the target element
                    const targetElement = document.querySelector('#messages');
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' }); // Use smooth scrolling
                    }
                  });

                document.querySelector('a[href="#skaalendar"]').addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent the default behavior of the anchor tag
                
                    // Scroll to the target element
                    const targetElement = document.querySelector('#skaalendar');
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' }); // Use smooth scrolling
                    }
                  });

                therapistInfoBoxT.innerHTML = `
                    <hr class="mx-1">
                    <h1 style="font-size:30;">${response.data.therapist_name}</h1>
                    <h5 style="color: grey; font-size:15;">Balgrist</h5>
                    <h5 style="color: grey; font-size:15;">${response.data.therapist_mail}</h5>
                    <h5 style="color: grey; font-size:15;">${response.data.therapist_phone}</h5>
                    <br>
                    <div style="display: flex; text-align: center; justify-content: space-between;" class="mb-3">
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
                        <a class="dashboard-button mx-1 rounded-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="my-1 bi bi-gear" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                        </a>
                    </div>
                `

                document.querySelector('a[href="#messages-t"]').addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent the default behavior of the anchor tag
                
                    // Scroll to the target element
                    const targetElement = document.querySelector('#messages-t');
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' }); // Use smooth scrolling
                    }
                  });

                document.querySelector('a[href="#skaalendar-t"]').addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent the default behavior of the anchor tag
                
                    // Scroll to the target element
                    const targetElement = document.querySelector('#skaalendar-t');
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' }); // Use smooth scrolling
                    }
                  });

                therapistInfoBoxM.innerHTML = `
                    <h1>${response.data.therapist_name}</h1>
                    <h5 style="color: grey;">Balgrist</h5>
                    <h5 style="color: grey;">${response.data.therapist_mail}</h5>
                    <h5 style="color: grey;">${response.data.therapist_phone}</h5>
                    <br>
                    <div style="display: flex; text-align: center; justify-content: space-between;" class="mb-3">
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
                        <a class="dashboard-button mx-1 rounded-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="my-1 bi bi-gear" viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                        </a>
                    </div>
                `

                document.querySelector('a[href="#messages-m"]').addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent the default behavior of the anchor tag
                
                    // Scroll to the target element
                    const targetElement = document.querySelector('#messages-m');
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' }); // Use smooth scrolling
                    }
                  });

                document.querySelector('a[href="#skaalendar-m"]').addEventListener('click', function(event) {
                    event.preventDefault(); // Prevent the default behavior of the anchor tag
                
                    // Scroll to the target element
                    const targetElement = document.querySelector('#skaalendar-m');
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth' }); // Use smooth scrolling
                    }
                  });


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
                
            }, 100)

            var screenWidth = window.innerWidth;
            //create the calendar
            if (screenWidth <= 769){
                
                sessions_list = updateCalendar(sessions)
                var calendarEl = document.getElementById('calendar-m');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,listMonth',
                    },
                    initialView:'listMonth',
                    height: 450,
                    contentHeight: 430,
                    aspectRatio: 3,
                    nowIndicator: true,
                    now: new Date().toISOString(), // Get the current date and time in ISO format
                    views: {
                    dayGridMonth: { buttonText: 'month' },
                    timeGridWeek: { buttonText: 'week' },
                    timeGridDay: { buttonText: 'day' },
                    },
                    events: sessions_list,
                    themeSystem: 'bootstrap5',
                    eventColor: 'rgb(192, 0, 14)',
                    eventBackgroundColor: 'rgb(192, 0, 14)', // Set event background color to tonalities of rgb(192, 0, 14)
                    eventBorderColor: 'rgb(192, 0, 14)', // Set event border color to tonalities of rgb(192, 0, 14)
                });
                calendar.render();
                    
            }
            else if (screenWidth >=1306){
                
                sessions_list = updateCalendar(sessions)
                var calendarEl = document.getElementById('calendar');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                    },
                    initialView:'listMonth',
                    height: 650,
                    contentHeight: 630,
                    aspectRatio: 3,
                    nowIndicator: true,
                    now: new Date().toISOString(), // Get the current date and time in ISO format
                    views: {
                    dayGridMonth: { buttonText: 'month' },
                    timeGridWeek: { buttonText: 'week' },
                    timeGridDay: { buttonText: 'day' },
                    },
                    themeSystem: 'bootstrap5',
                    eventColor: 'rgb(192, 0, 14)',
                    eventBackgroundColor: 'rgba(192, 0, 14, 0.5)', // Set event background color to tonalities of rgb(192, 0, 14)
                    eventBorderColor: 'rgb(192, 0, 14)', // Set event border color to tonalities of rgb(192, 0, 14)
                    events:sessions_list,
                });
                calendar.render();

            }
            else{
                
                sessions_list = updateCalendar(sessions)
                var calendarEl = document.getElementById('calendar-t');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridDay,listMonth',
                    },
                    initialView:'listMonth',
                    height: 550,
                    contentHeight: 530,
                    aspectRatio: 3,
                    nowIndicator: true,
                    now: new Date().toISOString(), // Get the current date and time in ISO format
                    views: {
                    dayGridMonth: { buttonText: 'month' },
                    timeGridWeek: { buttonText: 'week' },
                    timeGridDay: { buttonText: 'day' },
                    },
                    events: sessions_list,
                    themeSystem: 'bootstrap5',
                    eventColor: 'rgb(192, 0, 14)',
                    eventBackgroundColor: 'rgb(192, 0, 14)', // Set event background color to tonalities of rgb(192, 0, 14)
                    eventBorderColor: 'rgb(192, 0, 14)', // Set event border color to tonalities of rgb(192, 0, 14)
                });
                calendar.render();

            }

            messages_list = messages.map(message => {
                return {
                    id: message.id,
                    patient_name: message.patient
                }
            })
            
        },
        error: function(error){
            console.log(error)
        }

    })

}

loadTherapistData()

//search function for messages
const searchInputMessages = document.querySelector("[data-search-messages]")

searchInputMessages.addEventListener("input", (e) => {
    
    const value = e.target.value
    messages_list.forEach(message => {
        const messageDiv = document.getElementById(`message-${message.id}`)
        const isVisible = message.patient_name.toLowerCase().includes(value.toLowerCase())
        if (!isVisible){
            messageDiv.classList.add('not-visible')
        }
        else{
            if (messageDiv.className.includes('not-visible')){
                messageDiv.classList.remove('not-visible')
            }
        }
    })
    
})

const searchInputMessagesT = document.querySelector("[data-search-messages-t]")

searchInputMessages.addEventListener("input", (e) => {
    
    const value = e.target.value
    messages_list.forEach(message => {
        const messageDiv = document.getElementById(`message-${message.id}-t`)
        const isVisible = message.patient_name.toLowerCase().includes(value.toLowerCase())
        if (!isVisible){
            messageDiv.classList.add('not-visible')
        }
        else{
            if (messageDiv.className.includes('not-visible')){
                messageDiv.classList.remove('not-visible')
            }
        }
    })
    
})

const searchInputMessagesM = document.querySelector("[data-search-messages-m]")

searchInputMessages.addEventListener("input", (e) => {
    
    const value = e.target.value
    messages_list.forEach(message => {
        const messageDiv = document.getElementById(`message-${message.id}-m`)
        const isVisible = message.patient_name.toLowerCase().includes(value.toLowerCase())
        if (!isVisible){
            messageDiv.classList.add('not-visible')
        }
        else{
            if (messageDiv.className.includes('not-visible')){
                messageDiv.classList.remove('not-visible')
            }
        }
    })
    
})

// recall the function while changing the screen size
window.addEventListener('resize', function() {
    loadPatients();
    loadAdminData();
    loadTherapistData();
  });



// load analysis for a specific patient. 

const loadAnalysis = (patientId, value=300) => {

    $.ajax({

        type:"GET",
        url: url + `load_analysis/${patientId}`,
        success: function(response){

            var patient_sessions = response.sessions
            var patient_info = response.patient_info
            var patientAnalysisInfo = document.getElementById("patient-analysis-info")
            var patientAnalysisInfoTablet = document.getElementById("patient-analysis-info-t")
            var patientAnalysisInfoMobile = document.getElementById("patient-analysis-info-m")
            var numberOfMovementsBox = document.getElementById("numberOfMovement-box")
            var numberOfMovementsBoxTablet = document.getElementById("numberOfMovement-box-t")
            var numberOfMovementsBoxMobile = document.getElementById("numberOfMovement-box-m")
            var otherGraphsBox = document.getElementById("otherGraphs-box")
            var otherGraphsBoxTablet = document.getElementById("otherGraphs-box-t")
            var otherGraphsBoxMobile = document.getElementById("otherGraphs-box-m")

            const number_of_movements = response.number_of_movements
            const number_of_movements_dates = number_of_movements.dates
            const number_of_movements_nom = number_of_movements.nom

            const timestamps = response.timestamps
            const duration = response.duration
            const duration_dates = duration.dates
            const duration_dur = duration.dur
            const duration_upper = duration.upper
            const duration_lower = duration.lower
            const duration_avg = response.general_data.average_duration
            const duration_std = response.general_data.std_duration

            const mean_velocity = response.mean_velocity
            const mean_velocity_dates = mean_velocity.dates
            const mean_velocity_mean_vel = mean_velocity.mean_vel
            const mean_velocity_upper = mean_velocity.upper
            const mean_velocity_lower = mean_velocity.lower
            const mean_velocity_avg = response.general_data.average_mean_velocity
            const mean_velocity_std = response.general_data.std_mean_velocity

            const max_velocity = response.max_velocity
            const max_velocity_dates = max_velocity.dates
            const max_velocity_max_vel = max_velocity.max_vel
            const max_velocity_upper = max_velocity.upper
            const max_velocity_lower = max_velocity.lower
            const max_velocity_avg = response.general_data.average_max_velocity
            const max_velocity_std = response.general_data.std_max_velocity

            const zero_crossings = response.zero_crossings
            const zero_crossings_dates = zero_crossings.dates
            const zero_crossings_zero_c = zero_crossings.zero_c
            const zero_crossings_upper = zero_crossings.upper
            const zero_crossings_lower = zero_crossings.lower
            const zero_crossings_avg = response.general_data.average_zero_crossings
            const zero_crossings_std = response.general_data.std_zero_crossings

            const distance_traveled = response.distance_traveled
            const distance_traveled_dates = distance_traveled.dates
            const distance_traveled_distance_t = distance_traveled.distance_t
            const distance_traveled_upper = distance_traveled.upper
            const distance_traveled_lower = distance_traveled.lower
            const distance_traveled_avg = response.general_data.average_distance_traveled
            const distance_traveled_std = response.general_data.std_distance_traveled

            const max_acceleration = response.max_acceleration
            const max_acceleration_dates = max_acceleration.dates
            const max_acceleration_max_acc = max_acceleration.max_acc
            const max_acceleration_upper = max_acceleration.upper
            const max_acceleration_lower = max_acceleration.lower
            const max_acceleration_avg = response.general_data.average_max_acceleration
            const max_acceleration_std = response.general_data.std_max_acceleration

            var score = []
            var expected = []
            for (i = 0; i < timestamps.length; i++){
                score.push( 10 * max_acceleration_max_acc[i] + 15 * max_velocity_max_vel[i] + 0.01 * number_of_movements_nom[i])
                expected.push(value)
            }
            

            var screenWidth = window.innerWidth;
            //create the calendar
            if (screenWidth <= 769){
                
                //patient information 
                patientAnalysisInfoMobile.innerHTML = `
                    <div class="container ml-3">
                        <h1>${patient_info.name}</h1>
                        <hr>
                        <h5>Contacts:</h5>
                        <p class="mx-2">Phone: ${patient_info.phoneNumber}</p>
                        <p class="mx-2">Mail: ${patient_info.email}</p>
                        <h5>Medical Information:</h5>
                        <p class="mx-2">Age: ${patient_info.age}</p>
                        <p class="mx-2">Weight: ${patient_info.weight} Kg</p>
                        <p class="mx-2">Height: ${patient_info.height} cm</p>
                    </div>
                `

                //calendar list per month
                sessions_list = updateCalendar(patient_sessions)
                var calendarEl = document.getElementById('sessions-list-calendar-m');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                    right: 'prev,next today',
                    left: 'title',
                    },
                    initialView:'listMonth',
                    height: 350,
                    contentHeight: 330,
                    aspectRatio: 3,
                    nowIndicator: true,
                    now: new Date().toISOString(), // Get the current date and time in ISO format
                    themeSystem: 'bootstrap5',
                    eventColor: 'rgb(192, 0, 14)',
                    eventBackgroundColor: 'rgba(192, 0, 14, 0.5)', // Set event background color to tonalities of rgb(192, 0, 14)
                    eventBorderColor: 'rgb(192, 0, 14)', // Set event border color to tonalities of rgb(192, 0, 14)
                    events:sessions_list,
                });
                calendar.render();

                //create graphs
                
                numberOfMovementsBoxMobile.innerHTML = ''

                numberOfMovementsBoxMobile.innerHTML = `
                    <div class="chart-area my-4"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                        <canvas id="numberOfMovementsChart${response.patient_id}-m" style="display: block; width: 1200px; height: 400px;" class="chartjs-render-monitor" width="1200" height="600"></canvas>
                    </div>
                `

                otherGraphsBoxMobile.innerHTML = ''

                otherGraphsBoxMobile.innerHTML = `
                    <div class="col-xs-12 my-4">
                        <div class="row align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Duration</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="duration-info">
                                    
                                </div>
                                <div class="h5 mb-0" id="duration-trend-info">
                                    
                                </div>
                                <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="durationChart${response.patient_id}-m" style="display: block; width: 700px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 my-4">
                        <div class="row align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Velocity
                                </div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="mean-velocity-info">

                                </div>
                                <div class="h5 mb-0" id="velocity-trend-info">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="meanVelocityChart${response.patient_id}-m" style="display: block; width: 700px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 my-4">
                        <div class="row align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Maximal Velocity</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-velocity-info">

                                </div>
                                <div class="h5 mb-0" id="max-velocity-trend-info">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="maxVelocityChart${response.patient_id}-m" style="display: block; width: 700px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 my-4">
                        <div class="row align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Zero Crossings</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="zero-crossings-info">

                                </div>
                                <div class="h5 mb-0" id="zero-crossings-trend-info">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="zeroCrossingsChart${response.patient_id}-m" style="display: block; width: 700px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 my-4">
                        <div class="row align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Distance Traveled</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="distance-traveled-info">

                                </div>
                                <div class="h5 mb-0" id="distance-traveled-trend-info">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="distanceTraveledChart${response.patient_id}-m" style="display: block; width: 700px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 my-4">
                        <div class="row align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                    Average Maximal Acceleration</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-acceleration-info">

                                </div>
                                <div class="h5 mb-0" id="max-acceleration-trend-info">
                                    
                                </div>
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                    <canvas id="maxAccelerationChart${response.patient_id}-m" style="display: block; width: 700px; height: 245px;" class="chartjs-render-monitor" width="467" height="245"></canvas>
                            </div>
                        </div>
                    </div>
                `

                var ctx = document.getElementById(`numberOfMovementsChart${response.patient_id}-m`)
                var ctx_duration = document.getElementById(`durationChart${response.patient_id}-m`)
                var ctx_mean_vel = document.getElementById(`meanVelocityChart${response.patient_id}-m`)
                var ctx_max_vel = document.getElementById(`maxVelocityChart${response.patient_id}-m`)
                var ctx_zero_c = document.getElementById(`zeroCrossingsChart${response.patient_id}-m`)
                var ctx_distance_t = document.getElementById(`distanceTraveledChart${response.patient_id}-m`)
                var ctx_max_acc = document.getElementById(`maxAccelerationChart${response.patient_id}-m`)

                //Number of Movements
                var data =  {
                    labels: number_of_movements_dates,
                    datasets: [
                    {
                        fill:false,
                        label: 'Ideal number of movements',
                        data: expected,
                        borderWidth: 1,
                        yAxisID: 'y',
                        borderColor: 'rgba(0, 0, 255, 1)',
                        borderDash: [5, 5],
                    },
                    {
                        fill:true,
                        label: 'Number of Movements',
                        data: number_of_movements_nom,
                        borderWidth: 1,
                        tension: 0.4,
                        yAxisID: 'y',
                        borderColor: 'rgba(26,115,252,1)',
                        backgroundColor: 'rgba(26,115,252,0.4)'
                    },
                    {
                        fill: true, 
                        label: 'Movement score',
                        data: score,
                        borderWidth:1,
                        tension:0.4,
                        yAxisID: 'y1',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.4)'
                    }]
                }
    
                var config = {
                    type: 'line',
                    data: data,
                    options: {
                        responsive: true,
                        interaction: {
                        mode: 'index',
                        intersect: false,
                        },
                        stacked: false,
                        scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                    
                            // grid line settings
                            grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                            },
                        },
                        }
                    },
                    };
    
                var numberOfMovementsChart = new Chart(
                    ctx,
                    config
                )

                //others

                //duration
                var durationInfo = document.getElementById("duration-info")
                var durationInfoTrend = document.getElementById("duration-trend-info")
                durationInfo.textContent = `${duration_avg} ± ${duration_std}`

                function sum(array_elements){
                    summation = 0
                    for (i = 0; i < array_elements.length; i ++ ){
                        summation += array_elements[i]
                    }
                    return summation
                }
                function array_mult(array_1, array_2){
                    final_array = []
                    if (array_1.length === array_2.length){
                        for (i = 0; i < array_1.length; i ++){
                            final_array.push(array_1[i] * array_2[i])
                        }
                        return final_array
                    }
                    else {
                        return 0
                    }
                }
                function squared_element(array_1) {
                    final_array = []
                    for (i=0; i < array_1.length; i++){
                        final_array.push(array_1[i]**2)
                    }
                    return final_array
                }

                var n = timestamps.length
                const a_duration = (n*sum(array_mult(duration_dur, timestamps)) - sum(duration_dur)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_duration = (sum(duration_dur)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, duration_dur)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)

                if (a_duration > 0){
                    durationInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_duration < 0){
                    durationInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_duration = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_duration.push(a_duration*timestamps[i] + b_duration)
                }
                
                var data =  {
                    labels: duration_dates,
                    datasets: [
                    {
                        fill: false, 
                        label: "Average duration",
                        data: duration_dur,
                        borderWidth: 1, 
                        tension: 0.5
                    },
                    {
                        fill: false, 
                        label: "Duration trend",
                        data: regression_points_duration,
                        borderWidth: 1,
                    }]
                } 

                const shadingArea_dur = {
                    id: "shadingArea_dur",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (duration_dur[0] - duration_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (duration_dur[i] - duration_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (duration_upper[z] - duration_dur[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (duration_upper[0] - duration_dur[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: .2
                            }
                        }
                    },
                    plugins: [shadingArea_dur]
                }

                const durationChart = new Chart(
                    ctx_duration,
                    config
                )
                
                // // average velocity
                var meanVelocityInfo = document.getElementById("mean-velocity-info")
                var velocityInfoTrend = document.getElementById("velocity-trend-info")
                meanVelocityInfo.textContent = `${mean_velocity_avg} ± ${mean_velocity_std}`

                var n = timestamps.length
                const a_velocity = (n*sum(array_mult(mean_velocity_mean_vel, timestamps)) - sum(mean_velocity_mean_vel)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_velocity = (sum(mean_velocity_mean_vel)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, mean_velocity_mean_vel)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                
                if (a_velocity > 0){
                    velocityInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_velocity < 0){
                    velocityInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_velocity = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_velocity.push(a_velocity*timestamps[i] + b_velocity)
                }
                
                var data =  {
                    labels: mean_velocity_dates,
                    datasets: [
                    {
                        fill: false,
                        label: "Average velocity",
                        data: mean_velocity_mean_vel,
                        borderWidth: 1, 
                        tension: 0.4
                    },
                    {
                        fill: false,
                        label: "Mean velocity trend",
                        data: regression_points_velocity,
                        borderWidth: 1
                    }]
                }

                const shadingArea_mean_vel = {
                    id: "shadingArea_mean_vel",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (mean_velocity_mean_vel[0] - mean_velocity_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (mean_velocity_mean_vel[i] - mean_velocity_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (mean_velocity_upper[z] - mean_velocity_mean_vel[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (mean_velocity_upper[0] - mean_velocity_mean_vel[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: 0.2
                            }
                        }
                    },
                    plugins: [shadingArea_mean_vel]
                }

                const meanVelocityChart = new Chart(
                    ctx_mean_vel,
                    config
                )

                // // maximal velocity
                var maxVelocityInfo = document.getElementById("max-velocity-info")
                var maxVelocityInfoTrend = document.getElementById("max-velocity-trend-info")
                maxVelocityInfo.textContent = `${max_velocity_avg} ± ${max_velocity_std}`

                var n = timestamps.length
                const a_max_velocity = (n*sum(array_mult(max_velocity_max_vel, timestamps)) - sum(max_velocity_max_vel)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_max_velocity = (sum(max_velocity_max_vel)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, max_velocity_max_vel)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)

                if (a_max_velocity > 0){
                    maxVelocityInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_max_velocity < 0){
                    maxVelocityInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_max_velocity = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_max_velocity.push(a_max_velocity*timestamps[i] + b_max_velocity)
                }
                
                var data =  {
                    labels: max_velocity_dates,
                    datasets: [
                    {
                        fill:false,
                        label: "Max velocity",
                        data: max_velocity_max_vel,
                        borderWidth: 1,
                        tension: 0.4
                    },
                    {
                        fill:false,
                        label: "Max velocity trend",
                        data: regression_points_max_velocity,
                        borderWidth: 1,
                    }]
                }

                const shadingArea_max_vel = {
                    id: "shadingArea_max_vel",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (max_velocity_max_vel[0] - max_velocity_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (max_velocity_max_vel[i] - max_velocity_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (max_velocity_upper[z] - max_velocity_max_vel[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (max_velocity_upper[0] - max_velocity_max_vel[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: 0.5
                            }
                        }
                    },
                    plugins: [shadingArea_max_vel]
                }

                const maxVelocityChart = new Chart(
                    ctx_max_vel,
                    config
                )

                // // zero crossings
                var zeroCrossingsInfo = document.getElementById("zero-crossings-info")
                var zeroCrossingsInfoTrend = document.getElementById("zero-crossings-trend-info")
                zeroCrossingsInfo.textContent = `${zero_crossings_avg} ± ${zero_crossings_std}`
                
                var n = timestamps.length
                const a_zero_crossings = (n*sum(array_mult(zero_crossings_zero_c, timestamps)) - sum(zero_crossings_zero_c)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_zero_crossings = (sum(zero_crossings_zero_c)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, zero_crossings_zero_c)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                

                if (a_zero_crossings > 0){
                    zeroCrossingsInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_zero_crossings < 0){
                    zeroCrossingsInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_zero_crossings = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_zero_crossings.push(a_zero_crossings*timestamps[i] + b_zero_crossings)
                }

                var data =  {
                    labels: zero_crossings_dates,
                    datasets: [
                    {
                        fill: false,
                        label: "Average zero crossings",
                        data: zero_crossings_zero_c,
                        borderWidth: 1,
                        tension: 0.4
                    },
                    {
                        fill: false, 
                        label: "Zero crossings trend",
                        data: regression_points_zero_crossings,
                        borderWidth: 1,
                    }]
                }



                const shadingArea_zero_c = {
                    id: "shadingArea_zero_c",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (zero_crossings_zero_c[0] - zero_crossings_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (zero_crossings_zero_c[i] - zero_crossings_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (zero_crossings_upper[z] - zero_crossings_zero_c[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (zero_crossings_upper[0] - zero_crossings_zero_c[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false, 
                                grace: 1
                            }
                        }
                    },
                    plugins: [shadingArea_zero_c]
                }

                const zeroCrossingsChart = new Chart(
                    ctx_zero_c,
                    config
                )

                // // distance travelled
                var distaceTraveledInfo = document.getElementById("distance-traveled-info")
                var distanceTraveledInfoTrend = document.getElementById("distance-traveled-trend-info")
                distaceTraveledInfo.textContent = `${distance_traveled_avg} ± ${distance_traveled_std}`
                
                var n = timestamps.length
                const a_distance_traveled = (n*sum(array_mult(distance_traveled_distance_t, timestamps)) - sum(distance_traveled_distance_t)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_distance_traveled = (sum(distance_traveled_distance_t)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, distance_traveled_distance_t)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)

                if (a_distance_traveled > 0){
                    distanceTraveledInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_distance_traveled < 0){
                    distanceTraveledInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_distance_traveled = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_distance_traveled.push(a_distance_traveled*timestamps[i] + b_distance_traveled)
                }

                var data =  {
                    labels: distance_traveled_dates,
                    datasets: [
                        {
                            fill: false, 
                            label: "Average distance traveled",
                            data: distance_traveled_distance_t,
                            borderWidth: 1,
                            tension: 0.4
                        },
                        {
                            fill: false, 
                            label: "Distance traveled trend",
                            data: regression_points_distance_traveled,
                            borderWidth: 1
                        }]
                }

                const shadingArea_distance_t = {
                    id: "shadingArea_distance_t",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (distance_traveled_distance_t[0] - distance_traveled_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (distance_traveled_distance_t[i] - distance_traveled_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (distance_traveled_upper[z] - distance_traveled_distance_t[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (distance_traveled_upper[0] - distance_traveled_distance_t[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: .2,
                            }
                        }
                    },
                    plugins: [shadingArea_distance_t]
                }

                const distanceTraveledChart = new Chart(
                    ctx_distance_t,
                    config
                )


                // // max acceleration 
                var maxAccelerationInfo = document.getElementById("max-acceleration-info")
                var maxAccelerationInfoTrend = document.getElementById("max-acceleration-trend-info")
                maxAccelerationInfo.textContent = `${max_acceleration_avg} ± ${max_acceleration_std}`
                
                var n = timestamps.length
                const a_max_acceleration = (n*sum(array_mult(max_acceleration_max_acc, timestamps)) - sum(max_acceleration_max_acc)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_max_acceleration = (sum(max_acceleration_max_acc)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, max_acceleration_max_acc)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)

                if (a_max_acceleration > 0){
                    maxAccelerationInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_max_acceleration < 0){
                    maxAccelerationInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_max_acceleration = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_max_acceleration.push(a_max_acceleration*timestamps[i] + b_max_acceleration)
                }

                var data =  {
                    labels: max_acceleration_dates,
                    datasets: [
                    {
                        fill:false,
                        label: 'Max acceleration',
                        data: max_acceleration_max_acc,
                        borderWidth: 1,
                        tension: 0.4
                    },
                    {
                        fill: false,
                        label: "Max acceleration trend",
                        data: regression_points_max_acceleration,
                        borderWidth: 1,
                    }
                    ]
                }

                const shadingArea_max_acc = {
                    id: "shadingArea_max_acc",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (max_acceleration_max_acc[0] - max_acceleration_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (max_acceleration_max_acc[i] - max_acceleration_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (max_acceleration_upper[z] - max_acceleration_max_acc[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (max_acceleration_upper[0] - max_acceleration_max_acc[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: 1,
                            }
                        }
                    },
                    plugins: [shadingArea_max_acc]
                }

                const maxAccelerationChart = new Chart(
                    ctx_max_acc,
                    config
                )
                    
            }
            else if (screenWidth >=1306){
                
                //patient information 
                patientAnalysisInfo.innerHTML = `
                    <div class="container ml-3">
                        <h1>${patient_info.name}</h1>
                        <hr>
                        <h5>Contacts:</h5>
                        <p class="mx-2">Phone: ${patient_info.phoneNumber}</p>
                        <p class="mx-2">Mail: ${patient_info.email}</p>
                        <h5>Medical Information:</h5>
                        <p class="mx-2">Age: ${patient_info.age}</p>
                        <p class="mx-2">Weight: ${patient_info.weight} Kg</p>
                        <p class="mx-2">Height: ${patient_info.height} cm</p>
                    </div>
                `

                //calendar list per month
                sessions_list = updateCalendar(patient_sessions)
                var calendarEl = document.getElementById('sessions-list-calendar');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                    right: 'prev,next today',
                    left: 'title',
                    },
                    initialView:'listMonth',
                    height: 350,
                    contentHeight: 330,
                    aspectRatio: 3,
                    nowIndicator: true,
                    now: new Date().toISOString(), // Get the current date and time in ISO format
                    themeSystem: 'bootstrap5',
                    eventColor: 'rgb(192, 0, 14)',
                    eventBackgroundColor: 'rgba(192, 0, 14, 0.5)', // Set event background color to tonalities of rgb(192, 0, 14)
                    eventBorderColor: 'rgb(192, 0, 14)', // Set event border color to tonalities of rgb(192, 0, 14)
                    events:sessions_list,
                });
                calendar.render();

                //create graphs
                
                numberOfMovementsBox.innerHTML = ''

                numberOfMovementsBox.innerHTML = `
                    <div class="chart-area"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                        <canvas id="numberOfMovementsChart${response.patient_id}" style="display: block; width: 1500px; height: 500px;" class="chartjs-render-monitor" width="999" height="320"></canvas>
                    </div>
                `

                otherGraphsBox.innerHTML = ''

                otherGraphsBox.innerHTML = `
                    <div class="col-xl-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Duration
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="duration-info">
                                
                            </div>
                            <div class="h5 mb-0" id="duration-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="durationChart${response.patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="350"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Velocity
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="mean-velocity-info">

                            </div>
                            <div class="h5 mb-0" id="velocity-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="meanVelocityChart${response.patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="350"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Maximal Velocity</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-velocity-info">

                            </div>
                            <div class="h5 mb-0" id="max-velocity-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="maxVelocityChart${response.patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="350"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Zero Crossings</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="zero-crossings-info">

                            </div>
                            <div class="h5 mb-0" id="zero-crossings-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="zeroCrossingsChart${response.patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="350"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Distance Traveled</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="distance-traveled-info">

                            </div>
                            <div class="h5 mb-0" id="distance-traveled-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="distanceTraveledChart${response.patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="350"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Maximal Acceleration</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-acceleration-info">

                            </div>
                            <div class="h5 mb-0" id="max-acceleration-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="maxAccelerationChart${response.patient_id}" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="350"></canvas>
                            </div>
                        </div> 
                    </div>
                `

                var ctx = document.getElementById(`numberOfMovementsChart${response.patient_id}`)
                var ctx_duration = document.getElementById(`durationChart${response.patient_id}`)
                var ctx_mean_vel = document.getElementById(`meanVelocityChart${response.patient_id}`)
                var ctx_max_vel = document.getElementById(`maxVelocityChart${response.patient_id}`)
                var ctx_zero_c = document.getElementById(`zeroCrossingsChart${response.patient_id}`)
                var ctx_distance_t = document.getElementById(`distanceTraveledChart${response.patient_id}`)
                var ctx_max_acc = document.getElementById(`maxAccelerationChart${response.patient_id}`)

                //Number of Movements
                var data =  {
                    labels: number_of_movements_dates,
                    datasets: [
                    {
                        fill:false,
                        label: 'Ideal number of movements',
                        data: expected,
                        borderWidth: 1,
                        yAxisID: 'y',
                        borderColor: 'rgba(0, 0, 255, 1)',
                        borderDash: [5, 5],
                    },
                    {
                        fill:true,
                        label: 'Number of Movements',
                        data: number_of_movements_nom,
                        borderWidth: 1,
                        tension: 0.4,
                        yAxisID: 'y',
                        borderColor: 'rgba(26,115,252,1)',
                        backgroundColor: 'rgba(26,115,252,0.4)'
                    },
                    {
                        fill: true, 
                        label: 'Movement score',
                        data: score,
                        borderWidth:1,
                        tension:0.4,
                        yAxisID: 'y1',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.4)'
                    }]
                }
    
                var config = {
                    type: 'line',
                    data: data,
                    options: {
                        responsive: true,
                        interaction: {
                        mode: 'index',
                        intersect: false,
                        },
                        stacked: false,
                        scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                    
                            // grid line settings
                            grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                            },
                        },
                        }
                    },
                    };
    
                var numberOfMovementsChart = new Chart(
                    ctx,
                    config
                )

                //others

                //duration
                var durationInfo = document.getElementById("duration-info")
                var durationInfoTrend = document.getElementById("duration-trend-info")
                durationInfo.textContent = `${duration_avg} ± ${duration_std}`

                function sum(array_elements){
                    summation = 0
                    for (i = 0; i < array_elements.length; i ++ ){
                        summation += array_elements[i]
                    }
                    return summation
                }
                function array_mult(array_1, array_2){
                    final_array = []
                    if (array_1.length === array_2.length){
                        for (i = 0; i < array_1.length; i ++){
                            final_array.push(array_1[i] * array_2[i])
                        }
                        return final_array
                    }
                    else {
                        return 0
                    }
                }

                function squared_element(array_1) {
                    final_array = []
                    for (i=0; i < array_1.length; i++){
                        final_array.push(array_1[i]**2)
                    }
                    return final_array
                }

                var n = timestamps.length
                const a_duration = (n*sum(array_mult(duration_dur, timestamps)) - sum(duration_dur)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_duration = (sum(duration_dur)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, duration_dur)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)

                if (a_duration > 0){
                    durationInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_duration < 0){
                    durationInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_duration = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_duration.push(a_duration*timestamps[i] + b_duration)
                }
                
                var data =  {
                    labels: duration_dates,
                    datasets: [
                    {
                        fill: false, 
                        label: "Average duration",
                        data: duration_dur,
                        borderWidth: 1, 
                        tension: 0.5
                    },
                    {
                        fill: false, 
                        label: "Duration trend",
                        data: regression_points_duration,
                        borderWidth: 1,
                    }]
                } 

                const shadingArea_dur = {
                    id: "shadingArea_dur",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (duration_dur[0] - duration_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (duration_dur[i] - duration_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (duration_upper[z] - duration_dur[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (duration_upper[0] - duration_dur[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: .2
                            }
                        }
                    },
                    plugins: [shadingArea_dur]
                }

                const durationChart = new Chart(
                    ctx_duration,
                    config
                )
                
                // // average velocity
                var meanVelocityInfo = document.getElementById("mean-velocity-info")
                var velocityInfoTrend = document.getElementById("velocity-trend-info")
                meanVelocityInfo.textContent = `${mean_velocity_avg} ± ${mean_velocity_std}`

                var n = timestamps.length
                const a_velocity = (n*sum(array_mult(mean_velocity_mean_vel, timestamps)) - sum(mean_velocity_mean_vel)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_velocity = (sum(mean_velocity_mean_vel)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, mean_velocity_mean_vel)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                
                if (a_velocity > 0){
                    velocityInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_velocity < 0){
                    velocityInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_velocity = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_velocity.push(a_velocity*timestamps[i] + b_velocity)
                }
                
                var data =  {
                    labels: mean_velocity_dates,
                    datasets: [
                    {
                        fill: false,
                        label: "Average velocity",
                        data: mean_velocity_mean_vel,
                        borderWidth: 1, 
                        tension: 0.4
                    },
                    {
                        fill: false,
                        label: "Mean velocity trend",
                        data: regression_points_velocity,
                        borderWidth: 1
                    }]
                }

                const shadingArea_mean_vel = {
                    id: "shadingArea_mean_vel",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (mean_velocity_mean_vel[0] - mean_velocity_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (mean_velocity_mean_vel[i] - mean_velocity_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (mean_velocity_upper[z] - mean_velocity_mean_vel[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (mean_velocity_upper[0] - mean_velocity_mean_vel[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: 0.2
                            }
                        }
                    },
                    plugins: [shadingArea_mean_vel]
                }

                const meanVelocityChart = new Chart(
                    ctx_mean_vel,
                    config
                )

                // // maximal velocity
                var maxVelocityInfo = document.getElementById("max-velocity-info")
                var maxVelocityInfoTrend = document.getElementById("max-velocity-trend-info")
                maxVelocityInfo.textContent = `${max_velocity_avg} ± ${max_velocity_std}`

                var n = timestamps.length
                const a_max_velocity = (n*sum(array_mult(max_velocity_max_vel, timestamps)) - sum(max_velocity_max_vel)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_max_velocity = (sum(max_velocity_max_vel)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, max_velocity_max_vel)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)

                if (a_max_velocity > 0){
                    maxVelocityInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_max_velocity < 0){
                    maxVelocityInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_max_velocity = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_max_velocity.push(a_max_velocity*timestamps[i] + b_max_velocity)
                }
                
                var data =  {
                    labels: max_velocity_dates,
                    datasets: [
                    {
                        fill:false,
                        label: "Max velocity",
                        data: max_velocity_max_vel,
                        borderWidth: 1,
                        tension: 0.4
                    },
                    {
                        fill:false,
                        label: "Max velocity trend",
                        data: regression_points_max_velocity,
                        borderWidth: 1,
                    }]
                }

                const shadingArea_max_vel = {
                    id: "shadingArea_max_vel",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (max_velocity_max_vel[0] - max_velocity_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (max_velocity_max_vel[i] - max_velocity_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (max_velocity_upper[z] - max_velocity_max_vel[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (max_velocity_upper[0] - max_velocity_max_vel[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: 0.5
                            }
                        }
                    },
                    plugins: [shadingArea_max_vel]
                }

                const maxVelocityChart = new Chart(
                    ctx_max_vel,
                    config
                )

                // // zero crossings
                var zeroCrossingsInfo = document.getElementById("zero-crossings-info")
                var zeroCrossingsInfoTrend = document.getElementById("zero-crossings-trend-info")
                zeroCrossingsInfo.textContent = `${zero_crossings_avg} ± ${zero_crossings_std}`
                
                var n = timestamps.length
                const a_zero_crossings = (n*sum(array_mult(zero_crossings_zero_c, timestamps)) - sum(zero_crossings_zero_c)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_zero_crossings = (sum(zero_crossings_zero_c)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, zero_crossings_zero_c)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                

                if (a_zero_crossings > 0){
                    zeroCrossingsInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_zero_crossings < 0){
                    zeroCrossingsInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_zero_crossings = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_zero_crossings.push(a_zero_crossings*timestamps[i] + b_zero_crossings)
                }

                var data =  {
                    labels: zero_crossings_dates,
                    datasets: [
                    {
                        fill: false,
                        label: "Average zero crossings",
                        data: zero_crossings_zero_c,
                        borderWidth: 1,
                        tension: 0.4
                    },
                    {
                        fill: false, 
                        label: "Zero crossings trend",
                        data: regression_points_zero_crossings,
                        borderWidth: 1,
                    }]
                }



                const shadingArea_zero_c = {
                    id: "shadingArea_zero_c",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (zero_crossings_zero_c[0] - zero_crossings_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (zero_crossings_zero_c[i] - zero_crossings_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (zero_crossings_upper[z] - zero_crossings_zero_c[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (zero_crossings_upper[0] - zero_crossings_zero_c[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false, 
                                grace: 1
                            }
                        }
                    },
                    plugins: [shadingArea_zero_c]
                }

                const zeroCrossingsChart = new Chart(
                    ctx_zero_c,
                    config
                )

                // // distance travelled
                var distaceTraveledInfo = document.getElementById("distance-traveled-info")
                var distanceTraveledInfoTrend = document.getElementById("distance-traveled-trend-info")
                distaceTraveledInfo.textContent = `${distance_traveled_avg} ± ${distance_traveled_std}`
                
                var n = timestamps.length
                const a_distance_traveled = (n*sum(array_mult(distance_traveled_distance_t, timestamps)) - sum(distance_traveled_distance_t)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_distance_traveled = (sum(distance_traveled_distance_t)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, distance_traveled_distance_t)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)

                if (a_distance_traveled > 0){
                    distanceTraveledInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_distance_traveled < 0){
                    distanceTraveledInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_distance_traveled = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_distance_traveled.push(a_distance_traveled*timestamps[i] + b_distance_traveled)
                }

                var data =  {
                    labels: distance_traveled_dates,
                    datasets: [
                        {
                            fill: false, 
                            label: "Average distance traveled",
                            data: distance_traveled_distance_t,
                            borderWidth: 1,
                            tension: 0.4
                        },
                        {
                            fill: false, 
                            label: "Distance traveled trend",
                            data: regression_points_distance_traveled,
                            borderWidth: 1
                        }]
                }

                const shadingArea_distance_t = {
                    id: "shadingArea_distance_t",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (distance_traveled_distance_t[0] - distance_traveled_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (distance_traveled_distance_t[i] - distance_traveled_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (distance_traveled_upper[z] - distance_traveled_distance_t[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (distance_traveled_upper[0] - distance_traveled_distance_t[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: .2,
                            }
                        }
                    },
                    plugins: [shadingArea_distance_t]
                }

                const distanceTraveledChart = new Chart(
                    ctx_distance_t,
                    config
                )


                // // max acceleration 
                var maxAccelerationInfo = document.getElementById("max-acceleration-info")
                var maxAccelerationInfoTrend = document.getElementById("max-acceleration-trend-info")
                maxAccelerationInfo.textContent = `${max_acceleration_avg} ± ${max_acceleration_std}`
                
                var n = timestamps.length
                const a_max_acceleration = (n*sum(array_mult(max_acceleration_max_acc, timestamps)) - sum(max_acceleration_max_acc)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_max_acceleration = (sum(max_acceleration_max_acc)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, max_acceleration_max_acc)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)

                if (a_max_acceleration > 0){
                    maxAccelerationInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_max_acceleration < 0){
                    maxAccelerationInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_max_acceleration = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_max_acceleration.push(a_max_acceleration*timestamps[i] + b_max_acceleration)
                }

                var data =  {
                    labels: max_acceleration_dates,
                    datasets: [
                    {
                        fill:false,
                        label: 'Max acceleration',
                        data: max_acceleration_max_acc,
                        borderWidth: 1,
                        tension: 0.4
                    },
                    {
                        fill: false,
                        label: "Max acceleration trend",
                        data: regression_points_max_acceleration,
                        borderWidth: 1,
                    }
                    ]
                }

                const shadingArea_max_acc = {
                    id: "shadingArea_max_acc",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (max_acceleration_max_acc[0] - max_acceleration_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (max_acceleration_max_acc[i] - max_acceleration_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (max_acceleration_upper[z] - max_acceleration_max_acc[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (max_acceleration_upper[0] - max_acceleration_max_acc[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: 1,
                            }
                        }
                    },
                    plugins: [shadingArea_max_acc]
                }

                const maxAccelerationChart = new Chart(
                    ctx_max_acc,
                    config
                )

            }
            else{
                
                //patient information 
                patientAnalysisInfoTablet.innerHTML = `
                    <div class="container ml-3">
                        <h1>${patient_info.name}</h1>
                        <hr>
                        <h5>Contacts:</h5>
                        <p class="mx-2">Phone: ${patient_info.phoneNumber}</p>
                        <p class="mx-2">Mail: ${patient_info.email}</p>
                        <h5>Medical Information:</h5>
                        <p class="mx-2">Age: ${patient_info.age}</p>
                        <p class="mx-2">Weight: ${patient_info.weight} Kg</p>
                        <p class="mx-2">Height: ${patient_info.height} cm</p>
                    </div>
                `

                //calendar list per month
                sessions_list = updateCalendar(patient_sessions)
                var calendarEl = document.getElementById('sessions-list-calendar-t');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                    right: 'prev,next today',
                    left: 'title',
                    },
                    initialView:'listMonth',
                    height: 350,
                    contentHeight: 330,
                    aspectRatio: 3,
                    nowIndicator: true,
                    now: new Date().toISOString(), // Get the current date and time in ISO format
                    themeSystem: 'bootstrap5',
                    eventColor: 'rgb(192, 0, 14)',
                    eventBackgroundColor: 'rgba(192, 0, 14, 0.5)', // Set event background color to tonalities of rgb(192, 0, 14)
                    eventBorderColor: 'rgb(192, 0, 14)', // Set event border color to tonalities of rgb(192, 0, 14)
                    events:sessions_list,
                });
                calendar.render();

                //create graphs
                
                numberOfMovementsBoxTablet.innerHTML = ''

                numberOfMovementsBoxTablet.innerHTML = `
                    <div class="chart-area"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                        <canvas id="numberOfMovementsChart${response.patient_id}-t" style="display: block; width: 1000px; height: 330px;" class="chartjs-render-monitor" width="999" height="320"></canvas>
                    </div>
                `

                otherGraphsBoxTablet.innerHTML = ''

                otherGraphsBoxTablet.innerHTML = `
                    <div class="col-md-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Duration</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="duration-info">
                                
                            </div>
                            <div class="h5 mb-0" id="duration-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="durationChart${response.patient_id}-t" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Velocity
                            </div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="mean-velocity-info">

                            </div>
                            <div class="h5 mb-0" id="velocity-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="meanVelocityChart${response.patient_id}-t" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Maximal Velocity</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-velocity-info">

                            </div>
                            <div class="h5 mb-0" id="max-velocity-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="maxVelocityChart${response.patient_id}-t" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="300"></canvas>
                            </div> 
                        </div>       
                    </div>
                    <div class="col-md-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Zero Crossings</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="zero-crossings-info">

                            </div>
                            <div class="h5 mb-0" id="zero-crossings-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="zeroCrossingsChart${response.patient_id}-t" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="300"></canvas>
                            </div>
                        </div>      
                    </div>
                    <div class="col-md-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Distance Traveled</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="distance-traveled-info">

                            </div>
                            <div class="h5 mb-0" id="distance-traveled-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="distanceTraveledChart${response.patient_id}-t" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="300"></canvas>
                            </div>
                        </div>          
                    </div>
                    <div class="col-md-5">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-dark text-uppercase mb-1">
                                Average Maximal Acceleration</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800" id="max-acceleration-info">

                            </div>
                            <div class="h5 mb-0" id="max-acceleration-trend-info">
                                
                            </div>
                            <div class="chart-line pt-4 pb-2"><div class="chartjs-size-monitor"><div class="chartjs-size-monitor-expand"><div class=""></div></div><div class="chartjs-size-monitor-shrink"><div class=""></div></div></div>
                                <canvas id="maxAccelerationChart${response.patient_id}-t" style="display: block; width: 467px; height: 245px;" class="chartjs-render-monitor" width="467" height="300"></canvas>
                            </div>
                        </div>
                    </div>
                `

                var ctx = document.getElementById(`numberOfMovementsChart${response.patient_id}-t`)
                var ctx_duration = document.getElementById(`durationChart${response.patient_id}-t`)
                var ctx_mean_vel = document.getElementById(`meanVelocityChart${response.patient_id}-t`)
                var ctx_max_vel = document.getElementById(`maxVelocityChart${response.patient_id}-t`)
                var ctx_zero_c = document.getElementById(`zeroCrossingsChart${response.patient_id}-t`)
                var ctx_distance_t = document.getElementById(`distanceTraveledChart${response.patient_id}-t`)
                var ctx_max_acc = document.getElementById(`maxAccelerationChart${response.patient_id}-t`)

                //Number of Movements
                var data =  {
                    labels: number_of_movements_dates,
                    datasets: [
                    {
                        fill:false,
                        label: 'Ideal number of movements',
                        data: expected,
                        borderWidth: 1,
                        yAxisID: 'y',
                        borderColor: 'rgba(0, 0, 255, 1)',
                        borderDash: [5, 5],
                    },
                    {
                        fill:true,
                        label: 'Number of Movements',
                        data: number_of_movements_nom,
                        borderWidth: 1,
                        tension: 0.4,
                        yAxisID: 'y',
                        borderColor: 'rgba(26,115,252,1)',
                        backgroundColor: 'rgba(26,115,252,0.4)'
                    },
                    {
                        fill: true, 
                        label: 'Movement score',
                        data: score,
                        borderWidth:1,
                        tension:0.4,
                        yAxisID: 'y1',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.4)'
                    }]
                }
    
                var config = {
                    type: 'line',
                    data: data,
                    options: {
                        responsive: true,
                        interaction: {
                        mode: 'index',
                        intersect: false,
                        },
                        stacked: false,
                        scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                    
                            // grid line settings
                            grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                            },
                        },
                        }
                    },
                    };
    
                var numberOfMovementsChart = new Chart(
                    ctx,
                    config
                )

                //others

                //duration
                var durationInfo = document.getElementById("duration-info")
                var durationInfoTrend = document.getElementById("duration-trend-info")
                durationInfo.textContent = `${duration_avg} ± ${duration_std}`

                function sum(array_elements){
                    summation = 0
                    for (i = 0; i < array_elements.length; i ++ ){
                        summation += array_elements[i]
                    }
                    return summation
                }
                function array_mult(array_1, array_2){
                    final_array = []
                    if (array_1.length === array_2.length){
                        for (i = 0; i < array_1.length; i ++){
                            final_array.push(array_1[i] * array_2[i])
                        }
                        return final_array
                    }
                    else {
                        return 0
                    }
                }

                function squared_element(array_1) {
                    final_array = []
                    for (i=0; i < array_1.length; i++){
                        final_array.push(array_1[i]**2)
                    }
                    return final_array
                }

                var n = timestamps.length
                const a_duration = (n*sum(array_mult(duration_dur, timestamps)) - sum(duration_dur)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_duration = (sum(duration_dur)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, duration_dur)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)

                if (a_duration > 0){
                    durationInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_duration < 0){
                    durationInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_duration = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_duration.push(a_duration*timestamps[i] + b_duration)
                }
                
                var data =  {
                    labels: duration_dates,
                    datasets: [
                    {
                        fill: false, 
                        label: "Average duration",
                        data: duration_dur,
                        borderWidth: 1, 
                        tension: 0.5
                    },
                    {
                        fill: false, 
                        label: "Duration trend",
                        data: regression_points_duration,
                        borderWidth: 1,
                    }]
                } 

                const shadingArea_dur = {
                    id: "shadingArea_dur",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (duration_dur[0] - duration_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (duration_dur[i] - duration_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (duration_upper[z] - duration_dur[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (duration_upper[0] - duration_dur[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: .2
                            }
                        }
                    },
                    plugins: [shadingArea_dur]
                }

                const durationChart = new Chart(
                    ctx_duration,
                    config
                )
                
                // // average velocity
                var meanVelocityInfo = document.getElementById("mean-velocity-info")
                var velocityInfoTrend = document.getElementById("velocity-trend-info")
                meanVelocityInfo.textContent = `${mean_velocity_avg} ± ${mean_velocity_std}`

                var n = timestamps.length
                const a_velocity = (n*sum(array_mult(mean_velocity_mean_vel, timestamps)) - sum(mean_velocity_mean_vel)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_velocity = (sum(mean_velocity_mean_vel)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, mean_velocity_mean_vel)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                
                if (a_velocity > 0){
                    velocityInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_velocity < 0){
                    velocityInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_velocity = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_velocity.push(a_velocity*timestamps[i] + b_velocity)
                }
                
                var data =  {
                    labels: mean_velocity_dates,
                    datasets: [
                    {
                        fill: false,
                        label: "Average velocity",
                        data: mean_velocity_mean_vel,
                        borderWidth: 1, 
                        tension: 0.4
                    },
                    {
                        fill: false,
                        label: "Mean velocity trend",
                        data: regression_points_velocity,
                        borderWidth: 1
                    }]
                }

                const shadingArea_mean_vel = {
                    id: "shadingArea_mean_vel",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (mean_velocity_mean_vel[0] - mean_velocity_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (mean_velocity_mean_vel[i] - mean_velocity_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (mean_velocity_upper[z] - mean_velocity_mean_vel[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (mean_velocity_upper[0] - mean_velocity_mean_vel[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: 0.2
                            }
                        }
                    },
                    plugins: [shadingArea_mean_vel]
                }

                const meanVelocityChart = new Chart(
                    ctx_mean_vel,
                    config
                )

                // // maximal velocity
                var maxVelocityInfo = document.getElementById("max-velocity-info")
                var maxVelocityInfoTrend = document.getElementById("max-velocity-trend-info")
                maxVelocityInfo.textContent = `${max_velocity_avg} ± ${max_velocity_std}`

                var n = timestamps.length
                const a_max_velocity = (n*sum(array_mult(max_velocity_max_vel, timestamps)) - sum(max_velocity_max_vel)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_max_velocity = (sum(max_velocity_max_vel)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, max_velocity_max_vel)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)

                if (a_max_velocity > 0){
                    maxVelocityInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_max_velocity < 0){
                    maxVelocityInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_max_velocity = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_max_velocity.push(a_max_velocity*timestamps[i] + b_max_velocity)
                }
                
                var data =  {
                    labels: max_velocity_dates,
                    datasets: [
                    {
                        fill:false,
                        label: "Max velocity",
                        data: max_velocity_max_vel,
                        borderWidth: 1,
                        tension: 0.4
                    },
                    {
                        fill:false,
                        label: "Max velocity trend",
                        data: regression_points_max_velocity,
                        borderWidth: 1,
                    }]
                }

                const shadingArea_max_vel = {
                    id: "shadingArea_max_vel",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (max_velocity_max_vel[0] - max_velocity_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (max_velocity_max_vel[i] - max_velocity_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (max_velocity_upper[z] - max_velocity_max_vel[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (max_velocity_upper[0] - max_velocity_max_vel[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: 0.5
                            }
                        }
                    },
                    plugins: [shadingArea_max_vel]
                }

                const maxVelocityChart = new Chart(
                    ctx_max_vel,
                    config
                )

                // // zero crossings
                var zeroCrossingsInfo = document.getElementById("zero-crossings-info")
                var zeroCrossingsInfoTrend = document.getElementById("zero-crossings-trend-info")
                zeroCrossingsInfo.textContent = `${zero_crossings_avg} ± ${zero_crossings_std}`
                
                var n = timestamps.length
                const a_zero_crossings = (n*sum(array_mult(zero_crossings_zero_c, timestamps)) - sum(zero_crossings_zero_c)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_zero_crossings = (sum(zero_crossings_zero_c)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, zero_crossings_zero_c)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                

                if (a_zero_crossings > 0){
                    zeroCrossingsInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_zero_crossings < 0){
                    zeroCrossingsInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_zero_crossings = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_zero_crossings.push(a_zero_crossings*timestamps[i] + b_zero_crossings)
                }

                var data =  {
                    labels: zero_crossings_dates,
                    datasets: [
                    {
                        fill: false,
                        label: "Average zero crossings",
                        data: zero_crossings_zero_c,
                        borderWidth: 1,
                        tension: 0.4
                    },
                    {
                        fill: false, 
                        label: "Zero crossings trend",
                        data: regression_points_zero_crossings,
                        borderWidth: 1,
                    }]
                }



                const shadingArea_zero_c = {
                    id: "shadingArea_zero_c",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (zero_crossings_zero_c[0] - zero_crossings_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (zero_crossings_zero_c[i] - zero_crossings_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (zero_crossings_upper[z] - zero_crossings_zero_c[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (zero_crossings_upper[0] - zero_crossings_zero_c[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false, 
                                grace: 1
                            }
                        }
                    },
                    plugins: [shadingArea_zero_c]
                }

                const zeroCrossingsChart = new Chart(
                    ctx_zero_c,
                    config
                )

                // // distance travelled
                var distaceTraveledInfo = document.getElementById("distance-traveled-info")
                var distanceTraveledInfoTrend = document.getElementById("distance-traveled-trend-info")
                distaceTraveledInfo.textContent = `${distance_traveled_avg} ± ${distance_traveled_std}`
                
                var n = timestamps.length
                const a_distance_traveled = (n*sum(array_mult(distance_traveled_distance_t, timestamps)) - sum(distance_traveled_distance_t)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_distance_traveled = (sum(distance_traveled_distance_t)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, distance_traveled_distance_t)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)

                if (a_distance_traveled > 0){
                    distanceTraveledInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_distance_traveled < 0){
                    distanceTraveledInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_distance_traveled = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_distance_traveled.push(a_distance_traveled*timestamps[i] + b_distance_traveled)
                }

                var data =  {
                    labels: distance_traveled_dates,
                    datasets: [
                        {
                            fill: false, 
                            label: "Average distance traveled",
                            data: distance_traveled_distance_t,
                            borderWidth: 1,
                            tension: 0.4
                        },
                        {
                            fill: false, 
                            label: "Distance traveled trend",
                            data: regression_points_distance_traveled,
                            borderWidth: 1
                        }]
                }

                const shadingArea_distance_t = {
                    id: "shadingArea_distance_t",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (distance_traveled_distance_t[0] - distance_traveled_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (distance_traveled_distance_t[i] - distance_traveled_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (distance_traveled_upper[z] - distance_traveled_distance_t[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (distance_traveled_upper[0] - distance_traveled_distance_t[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: .2,
                            }
                        }
                    },
                    plugins: [shadingArea_distance_t]
                }

                const distanceTraveledChart = new Chart(
                    ctx_distance_t,
                    config
                )


                // // max acceleration 
                var maxAccelerationInfo = document.getElementById("max-acceleration-info")
                var maxAccelerationInfoTrend = document.getElementById("max-acceleration-trend-info")
                maxAccelerationInfo.textContent = `${max_acceleration_avg} ± ${max_acceleration_std}`
                
                var n = timestamps.length
                const a_max_acceleration = (n*sum(array_mult(max_acceleration_max_acc, timestamps)) - sum(max_acceleration_max_acc)*sum(timestamps))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)
                const b_max_acceleration = (sum(max_acceleration_max_acc)*sum(squared_element(timestamps)) - sum(timestamps)*sum(array_mult(timestamps, max_acceleration_max_acc)))/(n*sum(squared_element(timestamps))-sum(timestamps)**2)

                if (a_max_acceleration > 0){
                    maxAccelerationInfoTrend.innerHTML = `
                    <i style="color: green; font-size: small;">Trending Up</i>
                    `
                }
                else if(a_max_acceleration < 0){
                    maxAccelerationInfoTrend.innerHTML = `
                    <i style="color: red; font-size: small;">Trending Down</i>
                    `
                }

                const regression_points_max_acceleration = []
                for (i = 0; i < timestamps.length; i ++){
                    regression_points_max_acceleration.push(a_max_acceleration*timestamps[i] + b_max_acceleration)
                }

                var data =  {
                    labels: max_acceleration_dates,
                    datasets: [
                    {
                        fill:false,
                        label: 'Max acceleration',
                        data: max_acceleration_max_acc,
                        borderWidth: 1,
                        tension: 0.4
                    },
                    {
                        fill: false,
                        label: "Max acceleration trend",
                        data: regression_points_max_acceleration,
                        borderWidth: 1,
                    }
                    ]
                }

                const shadingArea_max_acc = {
                    id: "shadingArea_max_acc",
                    beforeDatasetsDraw(chart, args, pluginsOptions) {
                        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                        const tickHeight = y.height/y.max;

                        ctx.save();
                        const datapointsLength = chart.data.labels.length; 
                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(26,115,252,0.4)'
                        // ctx.strokeStyle = 'rgba(0,0,0,1)'
                        ctx.moveTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y + tickHeight * (max_acceleration_max_acc[0] - max_acceleration_lower[0]));

                        for (let i = 1; i < datapointsLength; i++){
                            ctx.lineTo(chart.getDatasetMeta(0).data[i].x, chart.getDatasetMeta(0).data[i].y + tickHeight * (max_acceleration_max_acc[i] - max_acceleration_lower[i]));
                        }

                        for (let z = datapointsLength - 1; z > 0; z--){
                            ctx.lineTo(chart.getDatasetMeta(0).data[z].x, chart.getDatasetMeta(0).data[z].y - tickHeight * (max_acceleration_upper[z] - max_acceleration_max_acc[z]));
                        }
                        
                        ctx.lineTo(chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - tickHeight * (max_acceleration_upper[0] - max_acceleration_max_acc[0]));

                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    
                }

                var config = {
                    type: 'line',
                    data, 
                    options: {
                        scales: {
                            y: {
                                beginAtZero: false,
                                grace: 1,
                            }
                        }
                    },
                    plugins: [shadingArea_max_acc]
                }

                const maxAccelerationChart = new Chart(
                    ctx_max_acc,
                    config
                )
            }



        },
        error: function(error){
            console.log(error)
        }

    })

}

var searchInputNom = document.querySelector("[data-search-nom]")

searchInputNom.addEventListener("input", (e) => {
    
    const valueInput = e.target.value
    try{
        document.getElementById("error-input-nom-box").innerHTML = ''
        string = valueInput
        value_to_push = parseInt(valueInput)
        if (value_to_push<0){
            throw new Error('Negative values are not possible!')
        }
        if (isNaN(value_to_push) && string === ""){
            value_to_push = 300
        }
        else if(isNaN(value_to_push) && string != ""){
            throw new Error('Please insert an integer number!')
        }
        loadAnalysis(selectedPatient, value_to_push)
    }
    catch (err){
        document.getElementById("error-input-nom-box").innerHTML = err.message
        document.getElementById("error-input-nom-box").classList.remove("not-visible")
        
        setTimeout(() => {
            document.getElementById("error-input-nom-box").innerHTML = ""
            document.getElementById("error-input-nom-box").classList.add("not-visible")
        }, 3000)
    }
    
})

var searchInputNomTablet = document.querySelector("[data-search-nom-t]")

searchInputNomTablet.addEventListener("input", (e) => {
    
    const valueInput = e.target.value
    try{
        document.getElementById("error-input-nom-box-t").innerHTML = ''
        string = valueInput
        value_to_push = parseInt(valueInput)
        if (value_to_push<0){
            throw new Error('Negative values are not possible!')
        }
        if (isNaN(value_to_push) && string === ""){
            value_to_push = 300
        }
        else if(isNaN(value_to_push) && string != ""){
            throw new Error('Please insert an integer number!')
        }
        loadAnalysis(selectedPatient, value_to_push)
    }
    catch (err){
        document.getElementById("error-input-nom-box-t").innerHTML = err.message
        document.getElementById("error-input-nom-box-t").classList.remove("not-visible")
        
        setTimeout(() => {
            document.getElementById("error-input-nom-box-t").innerHTML = ""
            document.getElementById("error-input-nom-box-t").classList.add("not-visible")
        }, 3000)
    }
    
})

var searchInputNomTablet = document.querySelector("[data-search-nom-m]")

searchInputNomTablet.addEventListener("input", (e) => {
    
    const valueInput = e.target.value
    try{
        document.getElementById("error-input-nom-box-m").innerHTML = ''
        string = valueInput
        value_to_push = parseInt(valueInput)
        if (value_to_push<0){
            throw new Error('Negative values are not possible!')
        }
        if (isNaN(value_to_push) && string === ""){
            value_to_push = 300
        }
        else if(isNaN(value_to_push) && string != ""){
            throw new Error('Please insert an integer number!')
        }
        loadAnalysis(selectedPatient, value_to_push)
    }
    catch (err){
        document.getElementById("error-input-nom-box-m").innerHTML = err.message
        document.getElementById("error-input-nom-box-m").classList.remove("not-visible")
        
        setTimeout(() => {
            document.getElementById("error-input-nom-box-m").innerHTML = ""
            document.getElementById("error-input-nom-box-m").classList.add("not-visible")
        }, 3000)
    }
    
})

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
            //create the calendar
            if (screenWidth <= 769){
                
                var p_sessions_list = updateCalendar(patient_sessions)
                var op_sessions_list = updateCalendar(other_patients_sessions)
                var calendarEl = document.getElementById('calendar-sessions-m');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,listMonth',
                    },
                    initialView:'listMonth',
                    height: 450,
                    contentHeight: 430,
                    aspectRatio: 3,
                    nowIndicator: true,
                    now: new Date().toISOString(), // Get the current date and time in ISO format
                    views: {
                    dayGridMonth: { buttonText: 'month' },
                    },
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
            else if (screenWidth >=1306){
                
                var p_sessions_list = updateCalendar(patient_sessions)
                var op_sessions_list = updateCalendar(other_patients_sessions)
                var calendarEl = document.getElementById('calendar-sessions');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth',
                    },
                    height: 650,
                    contentHeight: 630,
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

                var calendarList = document.getElementById('list-sessions');
                var calendar = new FullCalendar.Calendar(calendarList, {
                    headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'listMonth',
                    },
                    height: 650,
                    contentHeight: 630,
                    aspectRatio: 3,
                    nowIndicator: true,
                    now: new Date().toISOString(), // Get the current date and time in ISO format
                    initialView:'listMonth',
                    themeSystem: 'bootstrap5',
                    events: p_sessions_list,
                });
                calendar.render();

            }
            else{
                
                var p_sessions_list = updateCalendar(patient_sessions)
                var op_sessions_list = updateCalendar(other_patients_sessions)
                var calendarEl = document.getElementById('calendar-sessions-t');
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth',
                    },
                    height: 650,
                    contentHeight: 630,
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

                var calendarList = document.getElementById('list-sessions-t');
                var calendar = new FullCalendar.Calendar(calendarList, {
                    headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'listMonth',
                    },
                    height: 650,
                    contentHeight: 630,
                    aspectRatio: 3,
                    nowIndicator: true,
                    now: new Date().toISOString(), // Get the current date and time in ISO format
                    initialView:'listMonth',
                    themeSystem: 'bootstrap5',
                    events: p_sessions_list,
                });
                calendar.render();

            }
        },
        error: function(response){
            console.log(error)
        }

    })

}


// book a new session when needed.

var bookAlertBox = document.getElementById('book-alert-box')
var bookForm = document.getElementById("book-form")
try {
    document.getElementById("id_date").setAttribute("id", "id_date_desktop")
    var date = document.getElementById("id_date_desktop")
} catch (error) {
    console.log(error)
} finally{
    var date = document.getElementById("id_date_desktop")
}


// check always before
var csrf = document.getElementsByName("csrfmiddlewaretoken")[0]

const handleAlerts = (type, text) => {
    bookAlertBox.innerHTML = `
    <div class="alert alert-${type}" role="alert">
        ${text}
    </div>
    `
    bookAlertBoxTablet.innerHTML = `
    <div class="alert alert-${type}" role="alert">
        ${text}
    </div>
    `
    bookAlertBoxMobile.innerHTML = `
    <div class="alert alert-${type}" role="alert">
        ${text}
    </div>
    `
}

bookForm.addEventListener('submit', e=>{
    e.preventDefault()

    var fd = new FormData()
    fd.append('csrfmiddlewaretoken', csrf.value)
    fd.append('date', date.value)
    fd.append('patient_id', selectedPatient)
    $.ajax({
        type:'POST', 
        url: url,
        data: fd,
        success: function(response){
            var successText = `
                successfully saved file from ${response.date}
            `
            handleAlerts('success', successText)

            setTimeout(() => {
                bookAlertBox.innerHTML = ""
                date.value=""
                loadSessions(selectedPatient)
            }, 1000)
        },
        error:function(error){
            handleAlerts('danger', 'ups, something went wrong')
            console.log(error)
        },
        cache:false,
        contentType:false,
        processData:false,
    })
})

var bookAlertBoxTablet = document.getElementById('book-alert-box-t')
var bookFormTablet = document.getElementById("book-form-t")
try {
    document.getElementById("id_date").setAttribute("id", "id_date_tablet")
    var dateT = document.getElementById("id_date_tablet")
} catch (error) {
    console.log(error)
} finally{
    var dateT = document.getElementById("id_date_tablet")
}

// check always before
var csrfTablet = document.getElementsByName("csrfmiddlewaretoken")[1]

bookFormTablet.addEventListener('submit', e=>{
    e.preventDefault()
    var fd = new FormData()
    fd.append('csrfmiddlewaretoken', csrfTablet.value)
    fd.append('date', dateT.value)
    fd.append('patient_id', selectedPatient)
    $.ajax({
        type:'POST', 
        url: url,
        data: fd,
        success: function(response){
            var successText = `
                successfully saved file from ${response.date}
            `
            handleAlerts('success', successText)

            setTimeout(() => {
                bookAlertBoxTablet.innerHTML = ""
                dateT.value=""
                loadSessions(selectedPatient)
            }, 1000)
            
        },
        error:function(error){
            handleAlerts('danger', 'ups, something went wrong')
            console.log(error)
        },
        cache:false,
        contentType:false,
        processData:false,
    })
})


var bookAlertBoxMobile = document.getElementById('book-alert-box-m')
var bookFormMobile = document.getElementById("book-form-m")
try {
    document.getElementById("id_date").setAttribute("id", "id_date_mobile")
    var dateM = document.getElementById("id_date_mobile")
} catch (error) {
    console.log(error)
} finally{
    var dateM = document.getElementById("id_date_mobile")
}

// check always before
var csrfMobile = document.getElementsByName("csrfmiddlewaretoken")[2]


bookFormMobile.addEventListener('submit', e=>{
    e.preventDefault()
    var fd = new FormData()
    fd.append('csrfmiddlewaretoken', csrfMobile.value)
    fd.append('date', dateM.value)
    fd.append('patient_id', selectedPatient)
    $.ajax({
        type:'POST', 
        url: url,
        data: fd,
        success: function(response){
            var successText = `
                successfully saved file from ${response.date}
            `
            handleAlerts('success', successText)

            setTimeout(() => {
                bookAlertBoxMobile.innerHTML = ""
                dateM.value=""
                loadSessions(selectedPatient)
            }, 1000)
        },
        error:function(error){
            handleAlerts('danger', 'ups, something went wrong')
            console.log(error)
        },
        cache:false,
        contentType:false,
        processData:false,
    })
})