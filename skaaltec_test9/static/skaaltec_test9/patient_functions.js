// function to return a list of sessions with the right data format
function updateCalendar(sessions){
    sessions_list = sessions.map(element => {
        return {
            title: element.title,
            start: moment(element.start).format('YYYY-MM-DDTHH:mm:ss'),
        };
    });
    return sessions_list
}

// function to scroll to the bottom in the chat
function scrollToBottom(component) {
    component.scrollTop = component.scrollHeight;
}

// function to handle alerts
const handleAlerts = (component, type, text) => {
    component.innerHTML = `
    <div class="alert alert-${type}" role="alert">
        ${text}
    </div>
    `
}

// message form function
const sendMessageForm = (csrf, message) => {
    var fd = new FormData()
    fd.append('csrfmiddlewaretoken', csrf.value)
    fd.append('textMessage', message.value)
    fd.append('type', "message")
    $.ajax({
        type:'POST', 
        url: url,
        enctype: 'application/x-www-form-urlencoded', 
        data: fd,
        success: function(response){

            setTimeout(()=> {
                message.value=""
                loadMessages()
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

// book session form function
const bookSessionForm = (csrf, date, alertElement) => {
    var fd = new FormData()
    fd.append('csrfmiddlewaretoken', csrf.value)
    fd.append('date', date.value)
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
                date.value = ""
                loadInformation()
            }, 1500)
        },
        error:function(error){
            handleAlerts('danger', 'ups, something went wrong')
            console.log(error)
        },
        cache:false,
        contentType:false,
        processData:false,
    })
}

// share the fucntions within the window
window.updateCalendar = updateCalendar;
window.scrollToBottom = scrollToBottom;
window.handleAlerts = handleAlerts;


