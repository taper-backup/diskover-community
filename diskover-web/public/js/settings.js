/*
diskover-web community edition (ce)
https://github.com/diskoverdata/diskover-community/
https://diskoverdata.com

Copyright 2017-2023 Diskover Data, Inc.
"Community" portion of Diskover made available under the Apache 2.0 License found here:
https://www.diskoverdata.com/apache-license/
 
All other content is subject to the Diskover Data, Inc. end user license agreement found at:
https://www.diskoverdata.com/eula-subscriptions/
  
Diskover Data products and features for all versions found here:
https://www.diskoverdata.com/solutions/

*/

$(document).ready(function () {
    // set file size display checkbox
    if (getCookie('filesizebase10') == 1) {
        document.getElementById('sizedisplay').checked = true;
    } else {
        document.getElementById('sizedisplay').checked = false;
    }
    // set size field checkbox
    if (getCookie('sizefield') == 'size_du') {
        document.getElementById('sizedu').checked = true;
    } else {
        document.getElementById('sizedu').checked = false;
    }
    /* set time display for local timezone or utc (default)
    set time display checkbox */
    if (getCookie('localtime') == 1) {
        document.getElementById('timedisplay').checked = true;
    } else {
        document.getElementById('timedisplay').checked = false;
    }
    // set unsorted checkbox
    if (getCookie('unsorted') == 1) {
        document.getElementById('sortdisplay').checked = true;
    } else {
        document.getElementById('sortdisplay').checked = false;
    }
    // set predictive wildcard search checkbox
    if (getCookie('wildcardsearch') == 1) {
        document.getElementById('wildcardsearch').checked = true;
    } else {
        document.getElementById('wildcardsearch').checked = false;
    }
    // set filter charts checkbox
    if (getCookie('filtercharts') == 1) {
        document.getElementById('filterchart').checked = true;
    } else {
        document.getElementById('filterchart').checked = false;
    }
    // set search file tree sort checkbox
    if (getCookie('searchfiletreesort') == 1) {
        document.getElementById('searchfiletreesort').checked = true;
    } else {
        document.getElementById('searchfiletreesort').checked = false;
    }

    $("#elasticsearchform").submit(function (event) {
        $('.has-error').removeClass();
        $(".help-block").remove();
        var formData = $("#elasticsearchform").serialize();

        $.ajax({
            type: "POST",
            url: "settings_process.php",
            data: formData,
            dataType: "json",
            encode: true,
        }).done(function (data) {
            console.log(data);

            if (!data.success) {
                for (var key in data.errors) {
                    if (data.errors.hasOwnProperty(key)) {
                        $("#"+key+"-group").addClass("has-error");
                        $("#"+key+"-group").append(
                            '<div class="help-block">' + data.errors[key] + "</div>"
                        );
                    }
                  }
            } else {
                $("#elasticsearchform").append(
                    '<div class="alert alert-success" id="elasticsearchformsuccess">' + data.message + "</div>"
                ).fadeIn();
                setTimeout(function(){
                    $('#elasticsearchformsuccess').fadeOut();
                },2000);
                setTimeout(function(){
                    $('#elasticsearchformsuccess').remove(); 
                },3000);
            }
        })
        .fail(function (data) {
            $("#elasticsearchform").append(
                '<div class="alert alert-danger" id="elasticsearchformerror">Could not reach server, please try again later.</div>'
            ).fadeIn();
            setTimeout(function () {
                $('#elasticsearchformerror').fadeOut();
            }, 2000);
            setTimeout(function () {
                $('#elasticsearchformerror').remove();
            }, 3000);
        });

        event.preventDefault();
    });

    $("#elasticsearchtestform").submit(function (event) {
        $('.has-error').removeClass();
        $(".help-block").remove();
        var formData = $("#elasticsearchform").serialize();

        $.ajax({
            type: "POST",
            url: "settings_tests.php",
            data: formData,
            dataType: "json",
            encode: true,
        }).done(function (data) {
            console.log(data);

            if (!data.success) {
                $("#elasticsearchform").append(
                    '<div class="alert alert-danger" id="elasticsearchformerror">' + data.errors + "</div>"
                ).fadeIn();
                setTimeout(function(){
                    $('#elasticsearchformerror').fadeOut();
                },2000);
                setTimeout(function(){
                    $('#elasticsearchformerror').remove(); 
                },3000);
            } else {
                $("#elasticsearchform").append(
                    '<div class="alert alert-success" id="elasticsearchformsuccess">' + data.message + "</div>"
                ).fadeIn();
                setTimeout(function(){
                    $('#elasticsearchformsuccess').fadeOut();
                },2000);
                setTimeout(function(){
                    $('#elasticsearchformsuccess').remove(); 
                },3000);
            }
        })
        .fail(function (data) {
            $("#elasticsearchform").append(
                '<div class="alert alert-danger" id="elasticsearchformerror">Could not reach server, please try again later.</div>'
            ).fadeIn();
            setTimeout(function () {
                $('#elasticsearchformerror').fadeOut();
            }, 2000);
            setTimeout(function () {
                $('#elasticsearchformerror').remove();
            }, 3000);
        });

        event.preventDefault();
    });

    $("#otherform").submit(function (event) {
        $('.has-error').removeClass();
        $(".help-block").remove();
        var formData = $("#otherform").serialize();

        $.ajax({
            type: "POST",
            url: "settings_process.php",
            data: formData,
            dataType: "json",
            encode: true,
        }).done(function (data) {
            console.log(data);

            if (!data.success) {
                for (var key in data.errors) {
                    if (data.errors.hasOwnProperty(key)) {
                        $("#"+key+"-group").addClass("has-error");
                        $("#"+key+"-group").append(
                            '<div class="help-block">' + data.errors[key] + "</div>"
                        );
                    }
                  }
            } else {
                $("#otherform").append(
                    '<div class="alert alert-success" id="otherformsuccess">' + data.message + "</div>"
                ).fadeIn();
                setTimeout(function(){
                    $('#otherformsuccess').fadeOut();
                },2000);
                setTimeout(function(){
                    $('#otherformsuccess').remove();
                },3000);
            }
        })
        .fail(function (data) {
            $("#otherform").append(
                '<div class="alert alert-danger" id="otherformerror">Could not reach server, please try again later.</div>'
            ).fadeIn();
            setTimeout(function () {
                $('#otherformerror').fadeOut();
            }, 2000);
            setTimeout(function () {
                $('#otherformerror').remove();
            }, 3000);
        });

        event.preventDefault();
    });

});