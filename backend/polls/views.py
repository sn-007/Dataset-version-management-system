from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.http import HttpResponse

from .models import Question, Choice

def index(request):
    # get latest questions list
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    output = ', '.join([q.question_text for q in latest_question_list])
    return HttpResponse(output)

def detail(request, question_id):
    return HttpResponse("You are looking at question %s." % question_id)

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    # return HttpResponse("You're voting on question %s." % question_id)
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # return retval ass http resp
        return HttpResponse("You didn't select a choice.")
    else:
        selected_choice.votes += 1
        selected_choice.save()