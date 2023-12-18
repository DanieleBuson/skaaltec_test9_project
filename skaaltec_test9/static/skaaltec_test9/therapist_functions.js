// function to toggle the searchbar
function toggleSearchBar(id) {
    var searchBar = document.getElementById(id);
    if (searchBar) {
        searchBar.classList.toggle('not-visible');
    }
}

// function needed to block all the dropdown that are not selected

function disableDropdowns(data, selectedPatient){
    data.forEach(element => {
        if (selectedPatient == 0){
            if (document.getElementById(`dropdown-${element.id}`).classList.contains("not-working")){
                document.getElementById(`dropdown-${element.id}`).classList.remove("not-working")
            }
            if (document.getElementById(`dropdown-${element.id}-t`).classList.contains("not-working")){
                document.getElementById(`dropdown-${element.id}-t`).classList.remove("not-working")
            }
            if (document.getElementById(`dropdown-${element.id}-m`).classList.contains("not-working")){
                document.getElementById(`dropdown-${element.id}-m`).classList.remove("not-working")
            }
        }
        else{
            if (selectedPatient != element.id){
                if (!document.getElementById(`dropdown-${element.id}`).classList.contains("not-working")){
                    document.getElementById(`dropdown-${element.id}`).classList.add("not-working")
                } 
                if (!document.getElementById(`dropdown-${element.id}-t`).classList.contains("not-working")){
                    document.getElementById(`dropdown-${element.id}-t`).classList.add("not-working")
                } 
                if (!document.getElementById(`dropdown-${element.id}-m`).classList.contains("not-working")){
                    document.getElementById(`dropdown-${element.id}-m`).classList.add("not-working")
                } 
            }
        }
    })
}

// function to show code accordingly to the selection 
// 4 types:
// 1) showAnalysis(patient_id, type, analysisBox, uploadBox, adminBox, skaalendarBox, messagesBox, sessionsBox, chatBox, loadFunction)
// 2) showSessions(patient_id, type, analysisBox, uploadBox, adminBox, skaalendarBox, messagesBox, sessionsBox, chatBox, loadFunction)
// 3) showChat(patient_id, type, analysisBox, uploadBox, adminBox, skaalendarBox, messagesBox, sessionsBox, chatBox, loadFunction)
// 4) showAdmin(patient_id, type, analysisBox, uploadBox, adminBox, skaalendarBox, messagesBox, sessionsBox, chatBox, loadPatients, loadAdminData, loadTherapistData)

const showAnalysis = (patient_id, type, analysisBox, uploadBox, adminBox, skaalendarBox, messagesBox, sessionsBox, chatBox, loadFunction) => {
    
    loadFunction(patient_id)
    selectedPatient = patient_id
    disableDropdowns(data, selectedPatient)

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
    if (!chatBox.classList.contains("not-visible")){
        chatBox.classList.add("not-visible")
    }
    if (document.getElementById(`ics-${patient_id}${type}`).classList.contains("not-visible")){
        document.getElementById(`ics-${patient_id}${type}`).classList.remove("not-visible")
    }
    if (!document.getElementById(`patient-${patient_id}${type}-name`).classList.contains("active-patient")){
        document.getElementById(`patient-${patient_id}${type}-name`).classList.add("active-patient")
    }
    if (!document.getElementById(`patient-${patient_id}${type}`).classList.contains("selected")){
        document.getElementById(`patient-${patient_id}${type}`).classList.add("selected")
    }
    if (!document.getElementById(`dropdown-${patient_id}${type}`).classList.contains("not-visible")){
        document.getElementById(`dropdown-${patient_id}${type}`).classList.add("not-visible")
    }
    if (analysisBox.classList.contains("not-visible")){
        analysisBox.classList.remove("not-visible")
    }
    if (uploadBox.classList.contains("not-visible")){
        uploadBox.classList.remove("not-visible")
    }
}

const showSessions = (patient_id, type, analysisBox, uploadBox, adminBox, skaalendarBox, messagesBox, sessionsBox, chatBox, loadFunction) => {
    
    loadFunction(patient_id)
    selectedPatient = patient_id
    disableDropdowns(data, selectedPatient)

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
    if (!uploadBox.classList.contains("not-visible")){
        uploadBox.classList.add("not-visible")
    }
    if (!chatBox.classList.contains("not-visible")){
        chatBox.classList.add("not-visible")
    }
    if (document.getElementById(`ics-${patient_id}${type}`).classList.contains("not-visible")){
        document.getElementById(`ics-${patient_id}${type}`).classList.remove("not-visible")
    }
    if (!document.getElementById(`patient-${patient_id}${type}-name`).classList.contains("active-patient")){
        document.getElementById(`patient-${patient_id}${type}-name`).classList.add("active-patient")
    }
    if (!document.getElementById(`patient-${patient_id}${type}`).classList.contains("selected")){
        document.getElementById(`patient-${patient_id}${type}`).classList.add("selected")
    }
    if (!document.getElementById(`dropdown-${patient_id}${type}`).classList.contains("not-visible")){
        document.getElementById(`dropdown-${patient_id}${type}`).classList.add("not-visible")
    }
    if (sessionsBox.classList.contains("not-visible")){
        sessionsBox.classList.remove("not-visible")
    }
}

const showChat = (patient_id, type, analysisBox, uploadBox, adminBox, skaalendarBox, messagesBox, sessionsBox, chatBox, loadFunction) => {
    loadFunction(patient_id)
    selectedPatient = patient_id
    disableDropdowns(data, selectedPatient)

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
    if (!uploadBox.classList.contains("not-visible")){
        uploadBox.classList.add("not-visible")
    }
    if (!sessionsBox.classList.contains("not-visible")){
        sessionsBox.classList.add("not-visible")
    }
    if (document.getElementById(`ics-${patient_id}${type}`).classList.contains("not-visible")){
        document.getElementById(`ics-${patient_id}${type}`).classList.remove("not-visible")
    }
    if (!document.getElementById(`patient-${patient_id}${type}-name`).classList.contains("active-patient")){
        document.getElementById(`patient-${patient_id}${type}-name`).classList.add("active-patient")
    }
    if (!document.getElementById(`patient-${patient_id}${type}`).classList.contains("selected")){
        document.getElementById(`patient-${patient_id}${type}`).classList.add("selected")
    }
    if (!document.getElementById(`dropdown-${patient_id}${type}`).classList.contains("not-visible")){
        document.getElementById(`dropdown-${patient_id}${type}`).classList.add("not-visible")
    }
    if (chatBox.classList.contains("not-visible")){
        chatBox.classList.remove("not-visible")
    }
}

const showAdmin = (patient_id, type, analysisBox, uploadBox, adminBox, skaalendarBox, messagesBox, sessionsBox, chatBox, loadPatients, loadAdminData, loadTherapistData) => {
    
    loadPatients();
    loadAdminData();
    loadTherapistData();
    selectedPatient = 0

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
    if (!uploadBox.classList.contains("not-visible")){
        uploadBox.classList.add("not-visible")
    }
    if (!chatBox.classList.contains("not-visible")){
        chatBox.classList.add("not-visible")
    }
    if (!document.getElementById(`ics-${patient_id}${type}`).classList.contains("not-visible")){
        document.getElementById(`ics-${patient_id}${type}`).classList.add("not-visible")
    }
    if (document.getElementById(`patient-${patient_id}${type}-name`).classList.contains("active-patient")){
        document.getElementById(`patient-${patient_id}${type}-name`).classList.remove("active-patient")
    }
    if (document.getElementById(`patient-${patient_id}${type}`).classList.contains("selected")){
        document.getElementById(`patient-${patient_id}${type}`).classList.remove("selected")
    }
    if (document.getElementById(`dropdown-${patient_id}${type}`).classList.contains("not-visible")){
        document.getElementById(`dropdown-${patient_id}${type}`).classList.remove("not-visible")
    }
    if (!sessionsBox.classList.contains("not-visible")){
        sessionsBox.classList.add("not-visible")
    }
}

// searching bar on patients
function searchInputFunction(elementInput, patients, type){
    elementInput.addEventListener("input", (e) => {
    
        const value = e.target.value
        patients.forEach(patient => {
            const patientPage = document.getElementById(`patient-${patient.id}${type}`)
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
}

// updating the session date according to what is needed fr fullCalendar.js
function updateCalendar(sessions){
    sessions_list = sessions.map(element => {
        return {
            title: element.title,
            start: moment(element.start).format('YYYY-MM-DDTHH:mm:ss'),
        };
    });
    return sessions_list
}

// function to do the scrolling to the element selected
function goToTheElement(elemnentId){
    document.querySelector(`a[href="#${elemnentId}"]`).addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default behavior of the anchor tag
    
        // Scroll to the target element
        const targetElement = document.querySelector(`#${elemnentId}`);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' }); // Use smooth scrolling
        }
      });
}

// function to build the calendar in fullCaledar.js
function showCalendar(sessions, elementId, hh, ch, views='dayGridMonth,timeGridWeek,timeGridDay,listMonth'){
    sessions_list = updateCalendar(sessions)
    var calendarEl = document.getElementById(elementId);
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: views,
        },
        initialView:'listMonth',
        height: hh,
        contentHeight: ch,
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

// searching function to select a chat
function searchChatInputFunction(elementInput, messages, type){
    elementInput.addEventListener("input", (e) => {
    
    const value = e.target.value
    messages.forEach(message => {
        const messageDiv = document.getElementById(`message-${message.id}${type}`)
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
}

// function to set the number of movements
function setNumberOfMovements(element, errorElementId){
    element.addEventListener("input", (e) => {
    
        const valueInput = e.target.value
        try{
            document.getElementById(errorElementId).innerHTML = ''
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
            document.getElementById(errorElementId).innerHTML = err.message
            document.getElementById(errorElementId).classList.remove("not-visible")
            
            setTimeout(() => {
                document.getElementById(errorElementId).innerHTML = ""
                document.getElementById(errorElementId).classList.add("not-visible")
            }, 3000)
        }
        
    })
}

// function to scroll to bottom (used in chat loading)
function scrollToBottom(component) {
    component.scrollTop = component.scrollHeight;
}

// function to handle alerts
const handleAlerts = (element, type, text) => {
    element.innerHTML = `
    <div class="alert alert-${type}" role="alert">
        ${text}
    </div>
    `
}

// book form function
const bookFormFunction = (csrf, date, patient_id, alertElement) => {
    var fd = new FormData()
    fd.append('csrfmiddlewaretoken', csrf.value)
    fd.append('date', date.value)
    fd.append('patient_id', patient_id)
    fd.append('type', "book")
    $.ajax({
        type:'POST', 
        url: url,
        data: fd,
        success: function(response){
            var successText = `
                successfully saved file from ${response.date}
            `
            handleAlerts(alertElement, 'success', successText)

            setTimeout(() => {
                alertElement.innerHTML = ""
                date.value=""
                loadSessions(patient_id)
            }, 1000)
        },
        error:function(error){
            handleAlerts(alertElement, 'danger', 'ups, something went wrong')
            console.log(error)
        },
        cache:false,
        contentType:false,
        processData:false,
    })
}

//upload form function
const uploadFormFunction = (csrf, dateUpload, dataFileUpload, patient_id, alertElement) => {
    var fd = new FormData()
    fd.append('csrfmiddlewaretoken', csrf.value)
    fd.append('date', dateUpload.value)
    fd.append('data_file', dataFileUpload.files[0])
    fd.append('patient_id', patient_id);
    fd.append('type', "upload")
    $.ajax({
        type:'POST', 
        url: url,
        enctype: 'multipart/form-data',
        data: fd,
        success: function(response){
            var successText = `
                successfully saved file from ${response.date}
            `
            handleAlerts(alertElement, 'success', successText)

            setTimeout(()=> {
                alertElement.innerHTML = ""
                dateUpload.value=""
                dataFileUpload.value=""
                loadAnalysis(patient_id)
            }, 1000)
        },
        error:function(error){
            handleAlerts(alertElement, 'danger', 'ups, something went wrong')
            console.log(error)
        },
        cache:false,
        contentType:false,
        processData:false,
    })
}

// messagePostFunction 
const messagePostFunction = (csrf, message, patient_id) => {
    var fd = new FormData()
    fd.append('csrfmiddlewaretoken', csrf.value)
    fd.append('textMessage', message.value)
    fd.append('patient_id', patient_id);
    fd.append('type', "message")
    $.ajax({
        type:'POST', 
        url: url,
        enctype: 'application/x-www-form-urlencoded', 
        data: fd,
        success: function(response){

            setTimeout(()=> {
                message.value=""
                loadMessages(patient_id)
            }, 250)
        },
        error:function(error){
            console.log(error)
        },
        cache:false,
        contentType:false,
        processData:false,
    })
}

// function to create a csrf middleware token
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// function to state that the function is completed (once completed, it is not possible to delete)
function completeSessionPut(updatedData, typeScreen) {

    var csrfToken = getCookie('csrftoken');

    if (csrfToken === null) {
        console.error('CSRF token not found.');
        return;
    }

    $.ajax({
        url: url + "complete_session/" + selectedSessionId,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(updatedData),
        headers: { 'X-CSRFToken': csrfToken }, 
        success: function(response) {
            loadSessions(selectedPatient)
            document.getElementById(`session-name-update${typeScreen}`).innerHTML=""
            document.getElementById(`complete-button${typeScreen}`).classList.add("not-visible")
            document.getElementById(`delete-button${typeScreen}`).classList.add("not-visible")
        },
        error: function(error) {
            console.error('Error in update request:', error);
        }
    });
}

// function to delete a session already booked
function deleteSession(typeScreen){

    var csrfToken = getCookie('csrftoken');

    // Make sure the token is retrieved successfully
    if (csrfToken === null) {
        console.error('CSRF token not found.');
        return;
    }

    $.ajax({
        url: url + "delete_session/" + selectedSessionId,
        type: 'DELETE',
        contentType: 'application/json',
        headers: { 'X-CSRFToken': csrfToken }, 
        success: function(response) {
            loadSessions(selectedPatient)
            document.getElementById(`session-name-update${typeScreen}`).innerHTML=""
            document.getElementById(`complete-button${typeScreen}`).classList.add("not-visible")
            document.getElementById(`delete-button${typeScreen}`).classList.add("not-visible")
        },
        error: function(error) {
            console.error('Error in delete request:', error);
        }
    });
}

// Attach functions to the window object
window.toggleSearchBar = toggleSearchBar;
window.disableDropdowns = disableDropdowns;
window.showAnalysis = showAnalysis;
window.showSessions = showSessions;
window.showChat = showChat;
window.showAdmin = showAdmin;
window.searchInputFunction = searchInputFunction;
window.updateCalendar = updateCalendar;
window.goToTheElement = goToTheElement;
window.showCalendar = showCalendar;
window.searchChatInputFunction = searchChatInputFunction;
window.setNumberOfMovements = setNumberOfMovements;
window.scrollToBottom = scrollToBottom;
window.handleAlerts = handleAlerts;
window.bookFormFunction = bookFormFunction;
window.uploadFormFunction = uploadFormFunction;
window.messagePostFunction = messagePostFunction;
window.getCookie = getCookie;
window.completeSessionPut = completeSessionPut;
window.deleteSession = deleteSession;