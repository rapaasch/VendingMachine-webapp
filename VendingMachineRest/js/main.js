var money = 0;
var change = 0;
var itemToBuy = 0;
var numQuarters = 0;
var numDimes = 0;
var numNickles = 0;
var itemCost = 0;
var numDollars = 0;
var moneyIn = 0;

$(document).ready(function() {
  getItems();

  $("#item1").click(function() {
    $('#num1').clone().appendTo('#viewItem');
    itemCost = $("#cost1").html();
  });

  $("#item2").click(function() {
    $('#num2').clone().appendTo('#viewItem');
    itemCost = $("#cost2").html();
  });

  $("#item3").click(function() {
    $('#num3').clone().appendTo('#viewItem');
    itemCost = $("#cost3").html();
  });

  $("#item4").click(function() {
    $('#num4').clone().appendTo('#viewItem');
    itemCost = $("#cost4").html();
  });

  $("#item5").click(function() {
    $('#num5').clone().appendTo('#viewItem');
    itemCost = $("#cost5").html();
  });

  $("#item6").click(function() {
    $('#num6').clone().appendTo('#viewItem');
    itemCost = $("#cost6").html();
  });

  $("#item7").click(function() {
    $('#num7').clone().appendTo('#viewItem');
    itemCost = $("#cost7").html();
  });

  $("#item8").click(function() {
    $('#num8').clone().appendTo('#viewItem');
    itemCost = $("#cost8").html();
  });

  $("#item9").click(function() {
    $('#num9').clone().appendTo('#viewItem');
    itemCost = $("#cost9").html();
  });

  function setMoneyIn(){
    moneyIn = parseFloat(money).toFixed(2);
    $("#viewMoney").html(moneyIn);
    console.log(money);
    console.log(moneyIn);
  }

  $("#dollarButton").click(function(event) {
    money = money + 1;
    setMoneyIn();
    console.log("dollar");
  });

  $("#addMoney").on("click", "#quarterButton", function(event) {
    money = money + .25;
    setMoneyIn();
    console.log("quarter");
  });

  $("#dimeButton").on("click", function(event) {
    money = money + .1;
    setMoneyIn();
    console.log("dime");
  });

  $(document).on("click", "#nickelButton", function(event) {
    money = money + .05;
    setMoneyIn();
    console.log("nickle");
  });

  $("#purchaseButton").click(function() {
    buyItems();
  });

  $("#changeButton").click(function() {
    while (numQuarters > 3) {
      numQuarters = numQuarters - 4;
      numDollars++;
    }
    $("#viewChange").html(numDollars + " S, " + numQuarters + "q, " + numDimes + "d, " + numNickles + "n");
    resetPage();
  });

  function changeTotal() {
    itemCost = itemCost.substring(1);
    var change = money - itemCost;
    $("#viewMoney").html(change.toFixed(2));
  };

  function resetPage() {
    $("#viewMoney").html(0.00);
    $("#viewMessage").html(" ");
    $("#viewItem").html(" ");
    numDollars = 0;
    numQuarters = 0;
    numDimes = 0;
    numNickles = 0;
  }

  function buyItems() {
    moneyIn = $("#viewMoney").html();
    itemToBuy = $("#viewItem").text();
    $.ajax({
        type: 'POST',
        url: 'http://tsg-vending.herokuapp.com/money/' + moneyIn + '/item/' + itemToBuy,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        success: function(changeArray) {
          numQuarters = changeArray.quarters;
          numDimes = changeArray.dimes;
          numNickles = changeArray.nickels;
          numPennies = changeArray.pennies;
          $("#viewMessage").html("Thank you");
          changeTotal();
        },
        error: function(jqXHR, exception, message) {
          var errorData = $.parseJSON(jqXHR.responseText);
          var errorMessage = errorData.message;
          $("#viewMessage").html(errorMessage);
        }
      });

    }

  function getItems() {
    var article = 1;
    $.ajax({
      type: 'GET',
      url: ' http://tsg-vending.herokuapp.com/items',
      success: function(itemArray) {
        $.each(itemArray, function(index, item) {
          var itemNum = item.id;
          var itemName = item.name;
          var itemCost = item.price;
          var itemQuant = item.quantity;
          $('#num' + article).text(itemNum);
          $('#name' + article).text(itemName);
          $('#cost' + article).text("$" + itemCost.toFixed(2));
          $('#numItem' + article).text(itemQuant);
          article++;
        })

      },
      error: function() {
        $('#errorMessages')
          .append($('<li>')
            .attr({
              class: 'list-group-item list-group-item-danger'
            })
            .text('Error calling web service.  Please try again later.'));
      }
    });
  }

});


// $.each(itemArray, function(index, item) {
//  var elem = $(".container-fluid a.article:first").parent().com();
//elem.find(".num").text(item.id);
//elem.find(".name").text(item.name);
//    elem.find(".cost").text(item.price);
//    elem.find(".quantity").text(item.quantity);
//    $(".container-fluid").append(elem);
