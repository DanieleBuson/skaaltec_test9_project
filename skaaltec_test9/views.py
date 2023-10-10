from django.shortcuts import render
import datetime
from .models import News
from .forms import ContactForm

# Create your views here.
def main(request):
    return render(request, 'skaaltec_test9/main.html')

def smartVNS(request):
    return render(request, 'skaaltec_test9/smartVNS.html')

def aboutus(request):
    return render(request, 'skaaltec_test9/aboutus.html')

def news(request):
    news = News.objects.all()
    context = {
        'all_news': news,
    }
    return render(request, 'skaaltec_test9/news.html', context)

def contactus(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # send_mail(
            #     subject=form.subject,
            #     message=form.message,
            #     from_email="busond5@gmail.com",
            #     recipient_list=[form.email],
            #     fail_silently=False,
            # )
            print(form.cleaned_data['name'])
            file = open('message_' + form.cleaned_data['name'] + str(datetime.date.today().strftime("%d%m%Y")) + ".txt", 'w')
            file.write("Subject:  " + form.cleaned_data['subject'] + "\n" + "Message: " + form.cleaned_data['message'])
            file.close()
            return render(request, 'skaaltec_test9/main.html', {'message': 'We received your message, we will answer as soon as possible. Thanks for you patient!'})
    else:
        form = ContactForm()
    return render(request, "skaaltec_test9/contactus.html", {'form': form})