var obj = {'l': '', 'p': '', 'email': '', 'csrf_token': ''}
obj.csrf_token = $('[name="csrfmiddlewaretoken"]').val()

function back_to_dashboard() {
    $('#DashboardRows').empty();
    $('#DashboardRows').append(
        '<div class="row" id="DashboardRows">' +
        '<div class="col-xxl-2" style="padding: 1.5rem 2rem;width: 245.16px;">' +
        '<div class="card bg-dark text-white">' +
        '<div class="card-body" style="text-align:  center; padding: 0.5rem;">' +
        '<h5 class="card-title unselectable">Новости</h5>' +
        '<svg class="bi" width="100" height="100"><use xlink:href="#news"/></svg>' +
        '<button href="#" class="btn btn-primary unselectable" style="margin-top: 3px" onclick="WindowCreateNews()">Создать</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="col-xxl-2" style="padding: 1.5rem 2rem;width: 245.16px;">' +
        '<div class="card bg-dark text-white">' +
        '<div class="card-body" style="text-align:  center; padding: 0.5rem;">' +
        '<h5 class="card-title unselectable">Статистика</h5>' +
        '<svg class="bi" width="100" height="100"><use xlink:href="#analytics"/></svg>' +
        '<button href="#" class="btn btn-primary unselectable" style="margin-top: 3px" onclick="WindowCreateDashboard()">Просмотреть</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="col-xxl-2" style="padding: 1.5rem 2rem;width: 245.16px;">' +
        '<div class="card bg-dark text-white">' +
        '<div class="card-body" style="text-align:  center; padding: 0.5rem;">' +
        '<h5 class="card-title unselectable">Обращения</h5>' +
        '<svg class="bi" width="100" height="100"><use xlink:href="#chat-left"/></svg>' +
        '<button href="#" class="btn btn-primary unselectable" style="margin-top: 3px" onclick="WindowCreateStatistics()">Просмотреть</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    )
}

function WindowCreateNews() {
    $('#DashboardRows').empty();
    let csrf_token = $('[type=hidden][name=csrfmiddlewaretoken]').val()
    $('#DashboardRows').append(
        '<div class="col-xxl-12">' +
        '<div class="card bg-dark text-white">' +
        '<div class="card-body">' +
        '<div class="card-text" style="font-size: 18px;font-family: ui-monospace;display: flex;">' +
        '<p style="margin-bottom: 2rem;font-family: sans-serif;max-width: fit-content;height: min-content;">' +
        '<em style="font-size: 22px;"><b style="font-size: 28px;">Создание новости</b></em></p>' +
        '<button onclick="back_to_dashboard()" style="height: 3rem; width: 3rem; margin-left: 4rem; background: #f0f8ff00; border: #0000ff00; color: white;">' +
        '<span style="font-size: 20px;">&#10006;</span>' +
        '</button>' +
        '</div>' +
        '' +
        '<div class="card-text feedback-card" style="width: 100%;">' +
        '<div id="email_flex">' +
        '<p class="text-cursive-museosan" style="font-size: 18px;font-family: \'museosanscyrl-300\', cursive;">Заголовок:</p>' +
        '<input type="text" class="Supported" id="header" name="header" value="" style="height: 2rem;border: 0;border-radius: 5px;">' +
        '</div>' +
        '<div id="email_flex">' +
        '<p class="text-cursive-museosan" style="font-size: 18px;font-family: \'museosanscyrl-300\', cursive;">Подзаголовок:</p>' +
        '<input type="text" class="Supported" id="subtitle" name="subtitle" value="" style="height: 2rem;border: 0;border-radius: 5px;">' +
        '</div>' +
        '<div id="email_flex">' +
        '<p class="text-cursive-museosan" style="font-size: 18px;font-family: \'museosanscyrl-300\', cursive;">Текст новости:</p>' +
        '<textarea rows="5" cols="50" class="Supported" id="message" name="message" style="border: 0px;border-radius: 5px;"></textarea>' +
        '</div>' +
        '<input type="hidden" name="csrfmiddlewaretoken" value="'+ obj.csrf_token +'">' +
        '<button class="btn btn-primary" id="Supported_btn" onclick="CreateNews()" name="Supported" style="width: 11rem;margin-top: 1rem;font-size: 20px;">Отправить</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'
    )
}

function CreateNews() {
    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
    var header = $('#header').val();
    var message = $('#message').val();
    var subtitle = $('#subtitle').val();
    $.ajax({
      method: "post",
      url: "/dashboard/",
      data: {csrfmiddlewaretoken: csrftoken, 'header': header, 'subtitle': subtitle, 'message': message},
      success: function (data) {
        data.forEach(function (curr_obj) {
            $("#alert_all").append(
                '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                '<strong>Успешно!</strong> Новость успешно создана!' +
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                '</div>')
            console.log(curr_obj)
        })
      }
    })
}

var testData;

function WindowCreateDashboard() {
    $('#DashboardRows').empty();
    $('#DashboardRows').append(
      '<div class="col-xxl-6">' +
      '<canvas id="canvas"></canvas>' +
      '</div>' +
      '<div class="container-fluid d-flex flex-row">' +
        '<button class="btn btn-danger m-2" onclick="UpdateStatsButton()">Обновить</button>' +
        '<button class="btn btn-primary m-2" onclick="updateLineChart()">Назад</button>' +
        '<span class=" align-middle m-2">Введите первую дату:</span>' +
        '<span class=" align-middle m-2">Введите вторую дату:</span>' +
        '<button class="btn btn-primary m-2" onclick="updateLineChart()">Вперед</button>' +
      '</div>'
    )
    let i = 0;
    $.ajax({
      url: "/dashboard",
      type: "get",
      data: {"stats": "stats"},
      success: function (data) {
        testData = {
          "type": "line",
          "data": {
            "labels":data[0][0],
            "datasets": [{
              "label": "В день",
              "data": data[0][1],
              "fill": false, // Заполнить ли цвет фона
              "borderColor": "rgb(30, 152, 228)", // red
              "backgroundColor": "rgb(0, 152, 228)", // синий
              "lineTension": 0.1 // резкость кривой
            }]
          }
        };
        var myLineChart = new Chart($("#canvas").get(0).getContext("2d"), {
          "type": 'line',
          "data": testData.data
        });
        var myLineChart;
      }
    });
}

function UpdateStatsButton() {
    $('#canvas').remove();
    $('#DashboardRows').find(".col-xxl-6").prepend(
      '<canvas id="canvas"></canvas>'
    )
    $.ajax({
      url: "/dashboard",
      type: "get",
      data: {"stats": "stats"},
      success: function (data) {
        testData = {
          "type": "line",
          "data": {
            "labels":data[0][0],
            "datasets": [{
              "label": "В день",
              "data": data[0][1],
              "fill": false, // Заполнить ли цвет фона
              "borderColor": "rgb(30, 152, 228)", // red
              "backgroundColor": "rgb(0, 152, 228)", // синий
              "lineTension": 0.1 // резкость кривой
            }]
          }
        };
        var myLineChart = new Chart($("#canvas").get(0).getContext("2d"), {
          "type": 'line',
          "data": testData.data
        });
        var myLineChart;
      }
    });
}

function DeleteHelp(i) {
    var csrftoken = jQuery("[name=csrfmiddlewaretoken]").val();
    $.ajax({
      method: "post",
      url: "/dashboard/",
      data: {'method': 'delete','id': i},
      beforeSend: function (xhr) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken )
      },
      success: function (data) {
        data.forEach(function (curr_obj) {
            $("#alert_all").html(
                '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
                '<strong>Успешно!</strong> Обращение удалено!' +
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                '</div>')
            $("#HelpNumber"+i).remove()
            if($('#DashboardRows').length = 1){
                $('#DashboardRows').append(
                    '<div class="row" id="DashboardRows">' +
                    '<div class="col-xxl-2" style="padding: 1.5rem 2rem;width: 245.16px;">' +
                    '<div class="card bg-dark text-white">' +
                    '<div class="card-body" style="text-align:  center; padding: 0.5rem;">' +
                    '<h5 class="card-title unselectable">Новости</h5>' +
                    '<svg class="bi" width="100" height="100"><use xlink:href="#news"/></svg>' +
                    '<button href="#" class="btn btn-primary unselectable" style="margin-top: 3px" onclick="WindowCreateNews()">Создать</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-xxl-2" style="padding: 1.5rem 2rem;width: 245.16px;">' +
                    '<div class="card bg-dark text-white">' +
                    '<div class="card-body" style="text-align:  center; padding: 0.5rem;">' +
                    '<h5 class="card-title unselectable">Статистика</h5>' +
                    '<svg class="bi" width="100" height="100"><use xlink:href="#analytics"/></svg>' +
                    '<button href="#" class="btn btn-primary unselectable" style="margin-top: 3px" onclick="WindowCreateDashboard()">Просмотреть</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="col-xxl-2" style="padding: 1.5rem 2rem;width: 245.16px;">' +
                    '<div class="card bg-dark text-white">' +
                    '<div class="card-body" style="text-align:  center; padding: 0.5rem;">' +
                    '<h5 class="card-title unselectable">Обращения</h5>' +
                    '<svg class="bi" width="100" height="100"><use xlink:href="#chat-left"/></svg>' +
                    '<button href="#" class="btn btn-primary unselectable" style="margin-top: 3px" onclick="WindowCreateStatistics()">Просмотреть</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                )
                $("#alert_all").append(
                    '<div class="alert alert-warning alert-dismissible fade show" role="alert">' +
                    'Обращений больше нет!' +
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                    '</div>'
                )
            }
        })
      }
    })
}

var i = 0

function WindowCreateStatistics() {

    $.ajax({
      method: "get",
      url: "/dashboard/",
      data: {'input': "Statistics"},
      success: function(data) {
        data.forEach(function (curr_obj) {
            i++
            console.log(curr_obj.length)
            $('#DashboardRows').empty();
            $('#DashboardRows').append(
                '<div class="alert alert-warning" id="HelpNumber'+ curr_obj.id +'">' +
                '<input type="hidden" name="csrfmiddlewaretoken" value="'+ obj.csrf_token +'">' +
                '<p>Имя и Фамилия: ' + curr_obj.last_name + ' ' + curr_obj.first_name + '</p>' +
                '<p>Адрес: '+ curr_obj.address +'</p>' +
                '<p>Проблема: '+ curr_obj.message +'</p>' +
                '<button class="btn btn-danger" onclick="DeleteHelp('+ curr_obj.id +')">Удалить</button>' +
                '</div>'
            )

        });
        if(i === 0){
            $("#alert_all").append(
                '<div class="alert alert-warning alert-dismissible fade show" role="alert">' +
                'Обращений ещё не было!' +
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                '</div>'
            )
        }
      }
    });
}