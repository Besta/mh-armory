function add(name, value) {
    if($(".js-equip [data-name='" + name + "']").length > 0){
        $(".js-equip [data-name='" + name + "']").find("span").text(parseInt($(".js-equip [data-name='" + name + "']").find("span").text()) + value);
    } else {
        $(".js-equip").append('<div data-name="' + name + '" class="mh-equip__bonus">+<span>'+value+'</span> '+name+'</div>')
    }
}

function remove(name, value) {
    if($(".js-equip [data-name='" + name + "']").length > 0){
        $(".js-equip [data-name='" + name + "']").find("span").text(parseInt($(".js-equip [data-name='" + name + "']").find("span").text()) - value);

        if(parseInt($(".js-equip [data-name='" + name + "']").find("span").text()) === 0) {
            $(".js-equip [data-name='" + name + "']").remove();
        }
    }
}

$(document).ready(function() {
    $.each(equip, function() {
        var html = "<tr><td>"+this.name+"</td>";
        $.each(this.bonus, function() {
           html += "<td>";
           $.each(this.bonus, function() {
               if(this.name.toString()){
                html += "<div class='js-container'><span data-name='"+this.name.toString()+"' class='js-name'>"+this.name.toString()+"</span> <span class='js-value'>" +this.value.toString()+"</span></div>";   
               }
           });
            html += "</td>";
        });
        html += "</tr>"
        $(".js-set").append(html);
    });
    
    var select = "<select><option value='---Filtra---'>Filtra</option>";
    $.each(skill, function() {
        select += "<option value='"+this.name+"'>"+this.name+"</option>";
    });
    select += "</select>";
    $(".js-cerca").append(select);
    
    $('select').material_select();
    
    
    $("body").on("click", ".js-set td:not(:first-child):not(.x-active)", function(){
        if($(this).text()){
            $(this).addClass("x-active");
            var bonuses = $(this).find(".js-container");
            $.each(bonuses, function() {
                var n = $(this).find(".js-name").text();
                var v = parseInt($(this).find(".js-value").text());
                add(n,v);
            })
        }
    });
    
    $("body").on("click", ".js-set td.x-active", function(){
        $(this).removeClass("x-active");
        
        var bonuses = $(this).find(".js-container");
        $.each(bonuses, function() {
            var n = $(this).find(".js-name").text();
            var v = parseInt($(this).find(".js-value").text());
            remove(n,v);
        })
    });
    
    $("body").on("change", ".js-cerca select", function(event){
        $(".x-filtered").removeClass("x-filtered");
        $("[data-name='"+event.target.value+"']").closest("td").addClass("x-filtered");
        
        if($(".x-filtered").length > 0) {
            $("html, body").animate({"scrollTop":$(".x-filtered").first().offset().top - 100}, 500);
        }       
    });
});