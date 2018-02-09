function add(name, value, type, item) {
    if(!$(".js-equip [data-type='" + type + "']").length > 0){
        item.addClass("x-active");
        if($(".js-equip [data-name='" + name + "']").length > 0){
            $(".js-equip [data-name='" + name + "']").find("span").text(parseInt($(".js-equip [data-name='" + name + "']").find("span").text()) + value);
        } else {
            $(".js-equip").append('<div class="row" data-type="'+type+'" data-name="' + name + '"><div class="col s4"></div><div class="col s8 text-right">+<span>'+value+'</span> '+name+'</div></div>')
        }
        $(".js-"+type).append("+" + value + " " + name);
    }
}

function remove(name, value, type) {
    if($(".js-equip [data-name='" + name + "']").length > 0){
        $(".js-equip [data-name='" + name + "']").find("span").text(parseInt($(".js-equip [data-name='" + name + "']").find("span").text()) - value);

        if(parseInt($(".js-equip [data-name='" + name + "']").find("span").text()) === 0) {
            $(".js-equip [data-name='" + name + "']").remove();
        }
    }
    $(".js-"+type).text("");
}

$(document).ready(function() {
    $.each(equip, function() {
        var html = "<tr><td>"+this.name+"</td>";
        $.each(this.equip, function() {
           html += "<td>";
           let equipName = this.name;
           $.each(this.bonus, function() {
               if(this.name.toString()){
                html += "<div class='js-container'><span data-type='"+equipName+"' data-name='"+this.name.toString()+"' class='js-name'>"+this.name.toString()+"</span> <span class='js-value'>" +this.value.toString()+"</span></div>";   
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
            let item = $(this);
            var bonuses = $(this).find(".js-container");
            $.each(bonuses, function() {
                var n = $(this).find(".js-name").text();
                var v = parseInt($(this).find(".js-value").text());
                var t = $(this).find(".js-name").data("type");
                add(n,v,t,item);
            })
        }
    });
    
    $("body").on("click", ".js-set td.x-active", function(){
        $(this).removeClass("x-active");
        
        var bonuses = $(this).find(".js-container");
        $.each(bonuses, function() {
            var n = $(this).find(".js-name").text();
            var v = parseInt($(this).find(".js-value").text());
            var t = $(this).find(".js-name").data("type");
            remove(n,v,t);
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