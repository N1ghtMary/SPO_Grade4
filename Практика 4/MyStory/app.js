var curScene = 0;
var curSceneHistory = 0;
var history = [];
var historyGoodFinal = historyBadFinal = 0;
var testHGF = 0;
var testHBF = 0;

function replaceNodeText(id, newText)
{
    var nodeToChange = document.getElementById(id);
    if (nodeToChange.firstChild) {
        nodeToChange.removeChild(nodeToChange.firstChild);
    }
    nodeToChange.appendChild(document.createTextNode(newText));
    // nodeToChange.removeChild(nodeToChange.firstChild);
    // nodeToChange.appendChild(document.createTextNode(newText));
}    

function clearHistory()
{
    history = [];
    document.getElementById('history').innerHTML = '';
}

function changeScene(decision) {
    var message = "";
    switch (curScene) 
    {
        case 0: 
            curScene = 1;
            curSceneHistory = 0;
            message = "Вы проснулись на лесной тропинке. Вокруг Вас есть старый автомобиль, деревья и валуны. Рядом с Вами лежит рюкзак. Что вы решите исследовать первым?";
            replaceNodeText("decision1", "Автомобиль");
            replaceNodeText("decision2", "Ближайший валун");
            replaceNodeText("decision3", "Рюкзак");
            document.getElementById("decision1").style.display = "inline-block";
            document.getElementById("decision2").style.display = "inline-block";
            document.getElementById("decision3").style.display = "inline-block";
            document.getElementById("clearSpan").style.display = "none";
            //document.getElementById("decision2c").style.visibility = "visible";
            //document.getElementById("decision3c").style.visibility = "visible";
            break;

        case 1: 
            switch(decision)
            {
                case 1: // car start
                    curScene = 2;
                    curSceneHistory++;
                    message = "В автомобиле Вы нашли крошки, пищевые упаковки, бутылку с остатками сладкой воды и гаечный ключ. Что сделаете с ними?";
                    replaceNodeText("decision1", "Изучу упаковки на тот случай, если там есть еще съестное");
                    replaceNodeText("decision2", "Выпью воду");
                    replaceNodeText("decision3", "Возьму гаечный ключ");
                    document.getElementById("decision2").style.display = "inline-block";
                    document.getElementById("decision3").style.display = "inline-block";
                    break;

                case 2: // rock start
                    curScene = 7;
                    curSceneHistory++;
                    message = "Вы забрались на валун и увидели, что с другой его стороны спят собаки, а дальше есть обзорная площадка, примерно в 2 км от Вас. Куда Вы отправитесь?";
                    replaceNodeText("decision1", "К собакам");
                    replaceNodeText("decision2", "К обзорной площадке");
                    replaceNodeText("decision3", "Вернусь за рюкзаком");
                    document.getElementById("decision2").style.display = "inline-block";
                    document.getElementById("decision3").style.display = "inline-block";
                    break;
                
                case 3: // backpack start
                    curScene = 8;
                    curSceneHistory++;
                    message = "В рюкзаке Вы нашли литровую бутылку воды, немного еды, факел и классовую книгу. Изучив ее, Вы узнали, что можете стать ученым, фермером или путешественником. Каждый класс даст опеределенные преимущества. Какой класс Вы выберете?";
                    replaceNodeText("decision1", "Ученый");
                    replaceNodeText("decision2", "Фермер");
                    replaceNodeText("decision3", "Путешественник");
                    document.getElementById("decision1").style.display = "inline-block";
                    document.getElementById("decision2").style.display = "inline-block";
                    document.getElementById("decision3").style.display = "inline-block";
                    break;
            }
            break;
            

        case 2: // car second  
            switch(decision)
            {
                case 1: // car plastic
                    curScene = 3;
                    curSceneHistory++;
                    message = "Упс, Вы были слишком громкими и разбудили собак. Вы решили забраться на валун, но долго оставаться там нельзя. С него видно обзорную площадку. Отправитесь к ней или углубитесь в лес?"
                    replaceNodeText("decision1", "Отправиться к обзорной площадке");
                    replaceNodeText("decision2", "Углубиться в лес");
                    //replaceNodeText("decision3", "Возьму гаечный ключ");
                    //document.getElementById("decision2").style.visibility = "visible";
                    document.getElementById("decision3").style.display = "none";
                    break;

                case 2: // car water
                    curScene = 4;
                    curSceneHistory++;
                    message = "Поздравляю! Теперь Вы заражены. Вы можете лечь на камушек или отправиться в город в надежде найти лекарства.";
                    replaceNodeText("decision1", "Лечь на камушек");
                    replaceNodeText("decision2", "Отправиться в город");
                    document.getElementById("decision3").style.display = "none";
                    break;
                case 3: // car wrench
                    curScene = 5;
                    curSceneHistory++;
                    message = "Наличие машины навело Вас на мысль, что рядом есть трасса и чей-то загородный дом. Куда отправитесь?";
                    replaceNodeText("decision1", "По тропинке в обратную от машины сторону");
                    replaceNodeText("decision2", "По тропинке по направлению движения машины");
                    document.getElementById("decision3").style.display = "none";
                    break;
            }
            break;

        case 3: // car plastic
            if(decision == 1)
            {
                curScene = 0;
                curSceneHistory++;
                historyBadFinal++;
                message = "На территории Вы нашли несколько полезных вещей и поняли, что мир преобразился, но у Вас недостаточно навыков для его освоения...";
                replaceNodeText("decision1", "Попробовать снова");
                //document.getElementById("decision1").style.display = "inline-block";
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            else
            {
                curScene = 0;
                curSceneHistory++;
                historyBadFinal++;
                message = "Поскольку вы не взяли провиант и не обладали навыками выживания в лесу, вы заблудились... ";
                replaceNodeText("decision1", "Попробовать снова");
                document.getElementById("decision1").style.display = "inline-block";
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            break;

        case 4: // car water
            if(decision == 1)
            {
                curScene = 0;
                curSceneHistory++;
                historyBadFinal++;
                message = "Дорогу осилит идущий. Конец.";
                replaceNodeText("decision1", "Попробовать снова");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            else
            {                        
                curScene = 0;
                curSceneHistory++;
                historyBadFinal++;
                message = "Город не принял Вас радушием, но Вы нашли заброшенную аптеку, где нашли все необходимое, но Вам нужно было особое питание, которое Вы не могли себе обеспечить и покинули сервер."; 
                replaceNodeText("decision1", "Попробовать снова");
                document.getElementById("decision2").style.display = "none";   
                document.getElementById("clearSpan").style.display = "inline-block";                   
            }
            break;

        case 5: // car wrench
            if(decision == 1)
            {
                curScene = 0;
                curSceneHistory++;
                historyBadFinal++;
                message = "На трассе было много брошенных машин, Вы собрали кучу полезного, а приобретенные навыки помогли Вам стать опытным выживальщиком. Но Вы не обрели свой уголок и продожали путешествовать по всему миру без долгих задержек.";
                replaceNodeText("decision1", "Начать сначала");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            else
            {
                curScene = 6;
                curSceneHistory++;
                message = "Дом был достаточно просторный и слегка поврежденный. Вы решили его починить и обосноваться там. В гараже Вы нашли велосипед. Хотите осмотреть город или остаться в доме?";
                replaceNodeText("decision1", "В город!");
                replaceNodeText("decision2", "Обустроить дом");
                //document.getElementById("decision3").style.visibility = "hidden";
            }
            break;

        case 6: // car wrench to the home
            if(decision == 1)
            {
                curScene = 0;
                curSceneHistory++;
                historyGoodFinal++;
                message = "Широкие улицы, почтовые станции, пожарные отделения, торговые центры... Но где же люди?";
                replaceNodeText("decision1", "Начать сначала");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            else
            {
                curScene = 0;
                curSceneHistory++;
                historyGoodFinal++;
                message = "В доме была библиотека, где Вы получили много знаний о мире и ведении быта.";
                replaceNodeText("decision1", "Начать сначала");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            break;

        case 7: // rock second
            switch(decision)
            {
                case 1:
                    curScene = 3;
                    curSceneHistory++;
                    message = "Ммм, встретиться безоружным со стаей голодных и недовольных Вашим появлением собак - лучшая тактика в незнакомом месте.";
                    replaceNodeText("decision2", "Продолжить");
                    document.getElementById("decision1").style.display = "none";
                    document.getElementById("decision3").style.display = "none";
                    break;

                case 2:
                    curScene = 3;
                    curSceneHistory++;
                    message = "Далековато.";
                    replaceNodeText("decision1", "Продолжить");
                    document.getElementById("decision2").style.display = "none";
                    document.getElementById("decision3").style.display = "none";
                    break;
                
                case 3:
                    curScene = 1;
                    curSceneHistory++;
                    message = "Будет очень обидно уходить без него. Вдруг, там сокровища.";
                    replaceNodeText("decision3", "Продолжить");
                    document.getElementById("decision1").style.display = "none";
                    document.getElementById("decision2").style.display = "none";
                    break;
            }
            break;

        case 8: // backpack second
            switch(decision)
            {
                case 1: // scientist
                    curScene = 9;
                    curSceneHistory++;
                    message = "Классовые задания повели вас по сложному начальному пути. Вам нужно выбраться в город и найти временное пристанище. Вы хотите поселиться на крыше пожарной части или в мастерской по ремонту автомобилей?";
                    replaceNodeText("decision1", "Пожарная часть");
                    replaceNodeText("decision2", "Мастерская");
                    //document.getElementById("decision1").style.display = "inline-block";
                    document.getElementById("decision3").style.display = "none";
                    break;
                
                case 2: // farmer
                    curScene = 10;
                    curSceneHistory++;
                    message = "Вы понимали, что этот класс не дает особых преимуществ, но все равно выбрали его, ведь его квесты самые легкие. 10 соцветий золотарника, 10 листьев алоэ, 5 хризантем и вот Вы уже счастливый обладатель букета. Куда отправитесь на поиски моркови?";
                    replaceNodeText("decision1", "В супермаркет");
                    replaceNodeText("decision2", "На заправку");
                    //document.getElementById("decision2").style.display = "inline-block";
                    document.getElementById("decision3").style.display = "none";
                    break;
                
                case 3: // traveler
                    curScene = 11;
                    curSceneHistory++;
                    message = "Вечные приключения и прерывистый сон - вот Ваш спутник. Задания выглядели так, будто Вы должны были заранее где-то все прочитать.";
                    replaceNodeText("decision1", "Отправиться в город на поиски библиотеки");
                    replaceNodeText("decision2", "Поискать загородный дом");
                    //replaceNodeText("decision3", "Путешественник");
                    //document.getElementById("decision2").style.display = "inline-block";
                    document.getElementById("decision3").style.display = "none";
                    break;
            }
            break;

        case 9: // scientist start
            if(decision == 1) // scientist firestantion
            {
                curScene = 12;
                curSceneHistory++;
                message = "Вы набрали тонну барахла ради изучения свойств материалов и получения новых изделий в химических станциях, собранными Вами из подручных материалов. Но пришло время двигаться дальше. ";
                replaceNodeText("decision1", "Изучить глубже текущий");
                replaceNodeText("decision2", "Покинуть город");
            }
            else // scientist workshop
            {
                curScene = 12;
                curSceneHistory++;
                message = "Вы поселились в тонне барахла, что позволило Вам почти не покидать чертоги Вашего разума во время изучения сакральных знаний. Вы привыкли быть бесшумным и осторожным и решили найти что-то, что поможет Вам узнать больше.";
                replaceNodeText("decision1", "Фармзавод");
                replaceNodeText("decision2", "Исследовательская станция");
            }
            break;

        case 10: // farmer start
            if(decision == 1) // farmer store
            {
                curScene = 0;
                curSceneHistory++;
                historyBadFinal++;
                message = "Легкость заключается в том, что нужно смотреть только на объятное.";
                replaceNodeText("decision1", "Попробовать снова");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            else // farmer gas station
            {
                curScene = 13;
                curSceneHistory++;
                message = "Отличный выбор. Никто не говоил, что она дб целой. Во время поисков Вы увидели пустырь, где можно было бы развернуть небольшой огород. Отправитесь к нему?";
                replaceNodeText("decision1", "Конечно");
                replaceNodeText("decision2", "Лучше осмотрю ближайшие магазинчики");
            }
            break;

        case 11: // traveler start
            if(decision == 1) // traveler library
            {
                curScene = 20;
                curSceneHistory++;
                message = "Городская жизнь и вечная борьба за ресурсы не пришлась Вам по душе. Сменим обстановку?";
                replaceNodeText("decision1", "ДА");
                replaceNodeText("decision2", "Совсем немного");
                //document.getElementById("decision2").style.display = "none";
            }
            else // traveler new home
            {
                curScene = 0;
                curSceneHistory++;
                historyBadFinal++;
                message = "В нем оказалось множество полезных вещей. Вы были так рады, что забыли о предупреждениях.";
                replaceNodeText("decision1", "Попробовать снова");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            break;

        case 12: // scientist end
            if(decision == 1)
            {
                curScene = 0;
                curSceneHistory++;
                historyGoodFinal++;
                message = "Ваша наблюдательность и любознательность не позволили Вам пройти мимо каждого кустика и так Вы нашли вход в подземный бункер, где оказались ученые, с которыми Вы провели всю жизнь в попытке разобраться с произошедшим.";
                replaceNodeText("decision1", "Начать сначала");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            else
            {
                curScene = 0;
                curSceneHistory++;
                historyGoodFinal++;
                message = "Отличная подготовка позволила Вам избежать всех опасностей и благополучно изучить всю карту.";
                replaceNodeText("decision1", "Начать сначала");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            break;

        case 13: // farmer gas station
            if(decision == 1) // farmer gas station yes
            {
                curScene = 14;
                curSceneHistory++;
                message = "Вы быстренько сложили свои вещи в коробки и отправились выполнять оставшуюся часть цепочки. Поразмыслив, Вы решили, что вкусно кушать - Ваше призвание. Где поселитесь?";
                replaceNodeText("decision1", "В отеле \"Оверлук\"");
                replaceNodeText("decision1", "В ресторане");
            }
            else // farmer gas station to the store
            {
                curScene = 15;
                curSceneHistory++;
                message = "В магазинах Вы нашли семена и поняли, что Вы - прирожденный садовник. Где будем искать лопату?";
                replaceNodeText("decision1", "В хозяйственном");
                replaceNodeText("decision2", "В супермаркете");
            }
            break;

        case 14: // farmer gas station yes
            if(decision == 1) // farmer gas station yes overlook
            {
                curScene = 0;
                curSceneHistory++;
                historyGoodFinal++;
                message = "Ваша стряпня поразила постояльцев в самое сердце, Вы даже подвох заметили далеко не сразу.";
                replaceNodeText("decision1", "Начать сначала");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            else // farmer gas station yes restaurant
            {
                curScene = 0;
                curSceneHistory++;
                historyBadFinal++;
                message = "Посетителей не было, но Вы не грустили благодаря бонусам на нахождение блюд. Жаль только, что лекарство от ожирения Вашему классу не полагалось.";
                replaceNodeText("decision1", "Попробовать снова");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            break;

        case 15: // farmer gas station to the store
            if(decision == 1) // farmer gas station to the store hardware
            {
                curScene = 0;
                curSceneHistory++;
                historyGoodFinal++;
                message = "Помимо лопаты Вы обнаружили все необходимое для замеса почвы для грядок и доски для каркаса. Вы соорудили чудесный дом и посадили много вкусняшек. Здоровое сбалансированное питание позволило достичь Вам небывалых высот в исследовательской деятельности и даже найти торговца для бесед под полной луной.";
                replaceNodeText("decision1", "Начать сначала");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            else // farmer gas station to the store megashop
            {
                curScene = 16;
                curSceneHistory++;
                message = "Вы достаточно опытны, чтобы осмотреть здание полностью. Рискнете?";
                replaceNodeText("decision1", "Да");
                replaceNodeText("decision2", "Нет");
            }
            break;

        case 16: // farmer gas station to the store megashop
            if(decision == 1) // farmer gas station to the store megashop yes
            {
                curScene = 17;
                curSceneHistory++;
                message = "Вам не понравилось рассматривать чужие владения, и Вы укрепились в мысли, что лучше создать свои. С чего начнете строительство на том пустыре?";
                replaceNodeText("decision1", "Дом");
                replaceNodeText("decision2", "Грядки");
                //document.getElementById("decision2").style.display = "none";
            }
            else // farmer gas station to the store megashop no
            {
                curScene = 15;
                curSceneHistory++;
                message = "Правильно, риск должен быть оправдан.";
                replaceNodeText("decision1", "Продолжить");
                document.getElementById("decision2").style.display = "none";
            }
            break;

        case 17: // farmer gas station to the store megashop yes build
            if(decision == 1) // farmer gas station to the store megashop yes build home
            {
                curScene = 0;
                curSceneHistory++;
                historyBadFinal++;
                message = "Ну как же так. А как же смысл класса?";
                replaceNodeText("decision1", "Попробовать снова");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            else // farmer gas station to the store megashop yes build farmplots
            {
                curScene = 18;
                curSceneHistory++;
                message = "Ваши труды принесли плоды, и Вы не нуждались в постоянных скитаниях. Но Вы все еще периодически отправлялись на поиски ресурсов. Куда хотите отправиться на сей раз?";
                replaceNodeText("decision1", "Поближе");
                replaceNodeText("decision2", "Подальше");
            }
            break;

        case 18: // farmer build farmplots travel
            if(decision == 1) // farmer build farmplots travel near
            {
                curScene = 19;
                curSceneHistory++;
                message = "Увы, если ресурсы никто не производит, то они не появляются.";
                replaceNodeText("decision1", "Отправиться дальше");
                document.getElementById("decision2").style.display = "none";
            }
            else // farmer build farmplots travel far
            {
                curScene = 19;
                curSceneHistory++;
                message = "В дальних путешествиях очень важно подумать о пропитании. Вы вывели долгозреющие неприхотливые семена, чтобы питаться свежими продуктами во время дальних вылазок.";
                replaceNodeText("decision1", "Продолжить");
                document.getElementById("decision2").style.display = "none";
            }
            break;

        case 19: // farmer end
            curScene = 0;
            curSceneHistory++;
            historyGoodFinal++;
            message = "Постояльцам Вы не нравились. Зато многочисленные баффы от еды делали Вас неуязвимым, а значит и владельцем ресурсов.";
            replaceNodeText("decision1", "Начать сначала");
            document.getElementById("clearSpan").style.display = "inline-block";
            break;

        case 20: // traveler from the city
            if(decision == 1) // traveler from the city yes
            {
                curScene = 21;
                curSceneHistory++;
                message = "В лесу оказалось чудесно, но холодно и комары кусают.";
                replaceNodeText("decision1", "Построить пристанище самостоятельно");
                replaceNodeText("decision2", "Найти готовое");
            } 
            else // traveler from the city just a little
            {
                curScene = 22;
                curSceneHistory++;
                message = "";
                replaceNodeText("decision1", "Переехать в соседний город");
                replaceNodeText("decision2", "Поселиться как можно дальше от начального");
            }
            break;

        case 21: // traveler from the city yes
            if(decision == 1) // traveler manual build
            {
                curScene = 0;
                curSceneHistory++;
                historyBadFinal++;
                message = "У Вас получилась отличная большая будка. И Вы с радостью ее расширяли до размеров особняка, что даже забыли смысл класса.";
                replaceNodeText("decision1", "Попробовать снова");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            } 
            else
            {
                curScene = 23;
                curSceneHistory++;
                message = "Вы нашли охотничий домик и поселились в нем.  В ваши редкие поездки Вы очень по нему скучали.";
                replaceNodeText("decision1", "Продолжить");
                document.getElementById("decision2").style.display = "none";
            }
            break;

        case 22: // traveler from the city just a little
            if(decision == 1)
            {
                curScene = 0;
                curSceneHistory++;
                historyGoodFinal++;
                message = "Жажда путешествий не позволила Вам остаться в нем надолго.";
                replaceNodeText("decision1", "Начать сначала");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            } 
            else
            {
                curScene = 0;
                curSceneHistory++;
                historyGoodFinal++;
                message = "Все здания всех городов стали известны Вам до пылинки. Но ресурсы не безграничны.";
                replaceNodeText("decision1", "Начать сначала");
                document.getElementById("decision2").style.display = "none";
                document.getElementById("clearSpan").style.display = "inline-block";
            }
            break;

        case 23: // traveler from the city yes find home
            curScene = 0;
            curSceneHistory++;
            historyGoodFinal++;
            message = "Вы полностью посвятили свою жизнь зеленым просторам и составили карту всех пещер и озер.";
            replaceNodeText("decision1", "Начать сначала");
            document.getElementById("decision2").style.display = "none";
            document.getElementById("clearSpan").style.display = "inline-block";
            break;

        default:
            message = "Something went wrong";
            break;
    }

    document.getElementById("sceneimg").src = "images/scene" + curScene + ".jpg";
    replaceNodeText("sceneDescription", message); // if message start => good if try => bad
    console.log(message === "Начать сначала" ? testHGF++ : testHBF++);
    fillHistory(decision, curSceneHistory, message);
    refreshFinalCount(historyGoodFinal, historyBadFinal);
}

function changeStyle(span)
{
    span.className = "btn btn-info";
}

function returnStyle(span)
{
    span.className = "btn btn-outline-primary";
}

function fillHistory(decision, sceneNumber, message)
{
    var historyDiv = document.getElementById("history");
    var historyP = document.createElement("p");
    historyP.className = "bg-info text-white p-3 mb-2";
    historyP.appendChild(document.createTextNode(`Decision ${decision} -> Scene ${sceneNumber}: "${message}"`));
    historyDiv.appendChild(historyP);
}

function refreshFinalCount(historyGoodFinal, historyBadFinal)
{
    var goodFinalP = document.getElementById("historyGoodFinal");
    goodFinalP.innerText = `Количество хороших концовок пройдено: ${historyGoodFinal}`;
    var badFinalP = document.getElementById("historyBadFinal");
    badFinalP.innerText = `Количество плохих концовок пройдено: ${historyBadFinal}`;
}