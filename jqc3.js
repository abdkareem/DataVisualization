var vn = [],
    nyc = [], 
    goa = [],
    sfo = [],
    cn = [],
    phk = [],
    lon = [],
    values = [];
var hcmApi ='http://api.openweathermap.org/data/2.5/forecast/daily?id=1566083&units=imperial&cnt=16&appid=594c02ebb0b04deddc5df03301a4eb44',
    nycApi = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=5128581&units=imperial&cnt=16&appid=594c02ebb0b04deddc5df03301a4eb44',
    goaApi = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=1271146&units=imperial&cnt=16&appid=594c02ebb0b04deddc5df03301a4eb44',
    sfoApi = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=5391959&units=imperial&cnt=16&appid=594c02ebb0b04deddc5df03301a4eb44',
    lonApi = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=2643741&units=imperial&cnt=16&appid=594c02ebb0b04deddc5df03301a4eb44',
    beiApi = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=1816670&units=imperial&cnt=16&appid=594c02ebb0b04deddc5df03301a4eb44',
    phkApi = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=1151254&units=imperial&cnt=16&appid=594c02ebb0b04deddc5df03301a4eb44';
    
$(document).ready(function() {
    vn = makeAPICall(hcmApi);
    nyc = makeAPICall(nycApi);
    goa = makeAPICall(goaApi);
    sfo = makeAPICall(sfoApi);
    lon = makeAPICall(lonApi);
    cn = makeAPICall(beiApi);
    phk = makeAPICall(phkApi);
    values.push(vn, nyc, goa, sfo, lon, cn, phk); 
    $("#parent").on("change", "#ac", default_graph);
    $("#parent").on("change", "#vn", {plotvalues: vn}, vvn);
    $("#parent").on("change", "#cn", {plotvalues: cn}, vvn);
    $("#parent").on("change", "#goa", {plotvalues: goa}, vvn);
    $("#parent").on("change", "#sfo", {plotvalues: sfo}, vvn);
    $("#parent").on("change", "#nyc", {plotvalues: nyc}, vvn);
    $("#parent").on("change", "#lon", {plotvalues: lon}, vvn);
});

function makeAPICall(apiUrl) {
    var temp = []; 
    $.getJSON(apiUrl, function(data){ 
        temp.push(data["city"]["name"],data["list"][0]["temp"]["day"],data["list"][1]["temp"]["day"],
        data["list"][2]["temp"]["day"],data["list"][3]["temp"]["day"],data["list"][4]["temp"]["day"],
        data["list"][5]["temp"]["day"],data["list"][6]["temp"]["day"],data["list"][7]["temp"]["day"]);
    },'JSON');
    return temp;
}

/* ploting default (main) graph for all cities data using c3js librarie */
function default_graph() {   
    var chart = c3.generate({
    bindto: ('#chart'),
    padding: {
        right: 10,
        bottom: 20  
    },
    data: {
        //x: 'Date',
        columns: values
        //columns: [[finaltime[0].getDate(),finaltime[1].getDate(),finaltime[2].getDate(),finaltime[3].getDate(),finaltime[4].getDate(),finaltime[5].getDate(),finaltime[6].getDate(),finaltime[7].getDate()],vn, nyc, goa, sfo, lon, cn, phk]
    },
    axis: {
            y: {
                label: { 
                    text: 'Temp. in Fahrenheit',
                    position: 'outer-middle'
                    }
                },
            x: {
                /*type: 'timeseries',
                tick: {
                    format: '%m/%d/%Y'
                }, */
                label: {
                    text: 'Dates',
                    position: 'outer-center'
                    }
                    }
            },
    legend: {
        position: 'bottom'
    }
        });
}

/* one-to-one comparision between Phuket and other cities */
function vvn(event) { 
    //alert('entered');
    //alert(event.data[0]);
    var chart = c3.generate({
        bindto: ('#chart'),
        padding: {
                right: 10,
                bottom: 20  
            },
        data: {
                columns: [ [values[6][0],values[6][1],values[6][2], values[6][3],values[6][4],values[6][5],values[6][6],values[6][7] ], 
                [event.data.plotvalues[0],event.data.plotvalues[1],event.data.plotvalues[2], event.data.plotvalues[3],event.data.plotvalues[4],event.data.plotvalues[5],event.data.plotvalues[6],event.data.plotvalues[7] ] ],
                type: 'bar'
            },
        axis: {
        y: {
            label: { 
                text: 'Temp. in Fahrenheit',
                position: 'outer-middle'
                }
            },
        x: {
            label: {
                text: 'Dates',
                position: 'outer-center'
                }
                }
        },
        bar: {
                width: {
                ratio: 0.5
                }
            }
    });
}

$('#showInstructions').on('click', function(e){
    $('#howTo').modal('show');
});

setTimeout(default_graph,1000);

/*
function prepareTimeLabel(timee) {
    for (var timeentry in timee) {
        finaltime.push(new Date(timee[timeentry] * 1000));
    }
    retun;  
} */