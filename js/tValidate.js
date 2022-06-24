/*
File: tVlalidate.js
Samin_basir@student.uml.edu
Computer Science Student UMass Lowell GUI Programming I
Date: 6/23/2022
Updated: 6/23/2022 by Samin Basir
created a table completely dynamically based on parameters entered
in an HTML form
tools used for help w3schools.com
https://stackoverflow.com/questions/8749236/create-table-with-jquery-append
*/

$(function() {// initializing sliders
    $("#firstColslider").slider({// setting rules of the slider
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#firstC").val(ui.value);
            genTable();
        }
    });

    $("#firstC").val($("#firstColslider").slider("value"));// two way binding
    $("#firstC").change(function() {

        var oldVal = $("#firstColslider").slider("value");
        var newVal = $(this).val();

        if (isNaN(newVal)) {
            $("#firstColslider").slider("value", oldVal);
        }
        else {
            $("#firstColslider").slider("value", newVal);
        }
        genTable();
    });

    $("#lastColslider").slider({// setting rules cont'd
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#lastC").val(ui.value);
            genTable();
        }
    });

    $("#lastC").val($("#lastColslider").slider("value"));
    $("#lastC").change(function() {
        var oldVal = $("#lastColslider").slider("value");
        var newVal = $(this).val();

        if (isNaN(newVal)) {
            $("#lastColslider").slider("value", oldVal);
        }
        else {
            $("#lastColslider").slider("value", newVal);
        }

        genTable();
    });


    $("#firstRowslider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#firstR").val(ui.value);
            genTable();
        }
    });

    $("#firstR").val($("#firstRowslider").slider("value"));
    $("#firstR").change(function() {
        var oldVal = $("#firstRowslider").slider("value");
        var newVal = $(this).val();

        if (isNaN(newVal)) {
            $("#firstRowslider").slider("value", oldVal);
        }
        else {
            $("#firstRowslider").slider("value", newVal);
        }

        genTable();
    });


    $("#lastRowslider").slider({
        min: -50,
        max: 50,
        slide: function(event, ui) {
            $("#lastR").val(ui.value);
            genTable();
        }
    });

    $("#lastR").val($("#lastRowslider").slider("value"));
    $("#lastR").change(function() {
        var oldVal = $("#lastRowslider").slider("value");
        var newVal = $(this).val();

        if (isNaN(newVal)) {
            $("#lastRowslider").slider("value", oldVal);
        }
        else {
            $("#lastRowslider").slider("value", newVal);
        }

        genTable();
    });

    genTable();
});

function genTable() {

    if ($("#inputForm").valid() != true) {
        $("#multTable").empty(); // clear further tables
      return false;
    }

    // getting values
    var firstC = Number(document.getElementById("firstC").value);
    var lastC = Number(document.getElementById("lastC").value);
    var firstR = Number(document.getElementById("firstR").value);
    var lastR = Number(document.getElementById("lastR").value);
    // console.log

    if (firstC > lastC) {// checking if min > max
        var tempCol = firstC;
        firstC = lastC;
        lastC = tempCol;
    }
    if (firstR > lastR) {
        var tempRow = firstR;
        firstR = lastR;
        lastR = tempRow;
    }

    var colSize = lastC - firstC + 1// initializing matrix
    var rowSize = lastR - firstR + 1
    var arr = new Array(rowSize);
    for (var i = 0; i < rowSize; i++) {
        arr[i] = new Array(colSize);
    }

    var x = firstC;// filling the matrix
    var y = firstR;
    var product;
    var prodCommas;
    for (var i = 0; i < rowSize; i++) {
        for (var j = 0; j < colSize; j++) {
            product = x * y;
            if (product >= 1000 || product <= -1000) {	// insert commas
                prodCommas = product.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                arr[i][j] = prodCommas;
            }
            else {
                arr[i][j] = product;
            }
            x++;
        }
        x = firstC;
        y++;
    }

    var table = "<table>"; // for table
    table += "<tr>";
    table += "<th>*</th>";
    for (var i = firstC; i <= lastC; i++) {
        table += "<th>" + i + "</th>";
    }
    table += "</tr>";

    var rowNum = firstR;
    for (var i = 0; i < rowSize; i++) {
        table += "<tr>";
        table += "<td>" + rowNum++ + "</td>";
        for (var j = 0; j < colSize; j++) {
            table += "<td>" + arr[i][j] + "</td>";
        }
        table += "</tr>";
    }

    table += "</table>";
    document.getElementById("multTable").innerHTML = table;

    return false;
}
