/*
File: slider.js
Samin_basir@student.uml.edu
Computer Science Student UMass Lowell GUI Programming I
Date: 6/23/2022
Updated: 6/23/2022 by Samin Basir
created a table completely dynamically based on parameters entered
in an HTML form
tools used for help w3schools.com
https://stackoverflow.com/questions/8749236/create-table-with-jquery-append
for slider: https://www.tutorialspoint.com/jqueryui/jqueryui_slider.htm
*/

var tabCount = 0;//tracking tabs

document.querySelector("#saveBtn").onclick = function() {// checking if tab is valid
    var valid = $("#inputForm").validate().checkForm();
    if (!valid) {
        return false;
    }

    tabCount++;// increase the tab count
    $("#savedTables").tabs();
    var firstC = Number(document.getElementById("firstC").value);
    var lastC = Number(document.getElementById("lastC").value);
    var firstR = Number(document.getElementById("firstR").value);
    var lastR = Number(document.getElementById("lastR").value);

    var tabList = "<li class='tab'>";//for headers
    tabList += "<a href='#" + tabCount + "'>(" + firstC + " to " + lastC + ") x (" + firstR + " to " + lastR + ")</a>"
    tabList += "<span class='ui-icon ui-icon-close' role='presentation'></span></li>";
    document.querySelector("#savedTablesList").insertAdjacentHTML("beforeend", tabList);

    var table = document.querySelector("#multTable").innerHTML;// for tab content
    var tabContent = "<div id='" + tabCount + "'>";
    tabContent += table;
    tabContent += "</div>";
    document.querySelector("#savedTables").insertAdjacentHTML("beforeend", tabContent);

    $("#savedTables").tabs("refresh");//update
    $("#savedTables").tabs("option", "active", -1);

    $("#savedTables").delegate( "span.ui-icon-close", "click", function() {// declaring tabs
        var tabNum = $(this).closest("li").remove().attr("aria-controls");
        $("#" + tabNum).remove();

        try {
            $("#savedTables").tabs("refresh");
        }
        catch (e) {
        }

        if($("li.tab").length == 0) {
            try {
                $("#savedTables").tabs("destroy");
            }
            catch (e) {
            }

            return false;
        }
    });

    return false;
}
