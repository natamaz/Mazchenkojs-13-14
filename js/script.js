
'use strict'
$(function(){
    setObject();
    var testing = JSON.parse(getObject());
    var tmpl = _.template($('#test').html());
    var result = tmpl(testing);
    $('body').append(result);
    function setObject(){
        var data = {
            '1': {
                'question': 'Какие государства Европы перестали существовать как самостоятельные государства перед второй мировой войны?”?',
                'answers':[
                    'Австрия, Чехословакия',
                    'Чехословакия, Польша',
                    'Австрия, Швейцария',
                    'Чехословакия, Венгрия'],
                'check':0,
            },
            '2': {
                'question': 'Армия какой из стран не оказала сопротивление гитлеровским войскам и сложило оружие после нападения Германии?',
                'answers': [
                    'Норвегии',
                    'Дании',
                    'Франции',
                    'Польши',
                ],
                'check': 1,
            },
            '3': {
                'question': 'Какое из государств сохраняло нейтралитет во время первой мировой войны?',
                'answers':[
                    'Португалия',
                    'Румыния',
                    'Нидерланды',
                    'Бельгия'],
                'check': 2,
            }
        };

        var tmp = {data};

        localStorage.setItem('funnytest', JSON.stringify(tmp));
//        console.log(localStorage);
    }

    function getObject(){
        return localStorage.getItem('funnytest');
    }

    $('.checkbox').click(function() {
        $(this).parent().siblings().children().filter(':checked').not(this).removeAttr('checked');
    });
    /*click button*/
    $('#buttonOn').on('click', function(){
        createModal();
        showResult();
    });

    /*show result*/
    function showResult(){
        var elements = $('input:radio');
        var indexElement = 0;

        var elementsCh = $('input:checkbox');
        var indexElementCh = 0;
        for(var index in testing.data){
            if(testing.data[index]){
                testing.data[index].answers.forEach(function(item, i){
                    if(elements[indexElement].checked){
                        $('.list__answerOne')[indexElement].style.color = "red";
                        $('.list__answerOne')[indexElement].style.background = "rgba(255, 69, 0, 0.4)";
                    }
                    if(i === testing.data[index].check){
                        if(elements[indexElement].checked){
                            $('.list__answerOne')[indexElement].style.color = "black";
                            $('.list__answerOne')[indexElement].style.background = "rgba(224,248,246, 0.4)";
                        }
                    }
                    indexElement++;
                })
            }
        }
        indexElement = 0;
    }
    function createModal(){


        var owerlay = $('<div class="owerlayWindov"></div>');
        var modal = $('<div class="modal"><h3>Проверить</h3><div class="modal_close">&otimes;</div></div>');
        var main = $('.main');
        main.append(owerlay)
            .append(modal);

        var list = $('<ol class = "list"></ol>');
        modal.append(list);
        for(var index in testing.data)
        {
            var item = $('<li class = "list__item"></li>');
            list.append(item);
            var quest = $('<h4 class="questionTitle"></h4>');
            item.append(quest);
            quest.text(testing.data[index].question);
            var answer = $('<ul class = "list__answer"></ul>');
            item.append(answer);
            testing.data[index].answers.forEach(function(item){
                if(testing.data[index])
                    var answerItem = $('<li class = "list__answerOne"></li>');
                answer.append(answerItem);
                answerItem.text(item);
            })
        }
        var button = $('.modal_close');
        button.click(removeModal);
    }
    function removeModal(){
        $('input').attr('checked', false);
        $('.owerlayWindov').remove();
        $('.modal').remove();
    }
});
