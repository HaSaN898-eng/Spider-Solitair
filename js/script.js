// button event start


let startGameBtn = 0;


$("#btn").on("click", () => {

    startGameBtn++;

    if (startGameBtn == 1) {
        startGame();
    }
})

function startGame() {



    $("#btn").fadeOut(500); //hide th button
    $(".p").fadeIn(1000); //show the cards
    $(".downbar").fadeIn(1000); //show the cards
    $(".switch-wrap").fadeIn(1000);
    $(".cheattitle").fadeIn(1000);
    $(".endmsg").fadeOut();


    let b = 0; //give the required number of card to each container    
    let a = 0; //change the card container
    var y = -20;
    var count = 0;
    var scoreC = 500;
    var movesC = 0;
    let t1 = 0;
    let t2 = 0;
    let t3 = 0;
    //values of the game cards
    var arr = [1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13]
        // loop to give each container enough cards
    for (let u = 0; u < 10; u++) {
        // check weather the container require 4 or 5 cards
        if (b >= 4) {
            var i = 1;
        } else {
            var i = 0;
        }

        for (let ii = 0; i < 5; i++) {
            //create a card 
            var elem = $("<div></div>")

            //give it a value
            let arrnum = Math.floor(Math.random() * (arr.length))
            let arrval = arr[arrnum];
            arr.splice(arrnum, 1);
            elem.addClass(`card card-${arrval} card-locked`);
            elem.attr("id", `${arrval}`);
            elem.attr("data-lock", "true");
            // add the hidden card card to the container
            let z = $(".p");
            z.eq(a).append(elem);
            //change css top property
            let d = parseFloat(elem.prev().css("top"));
            elem.css("top", d + 20 + "px");

            if (i == 4) {
                // add the visible card
                var elem = $("<div></div>")
                let arrnum = Math.floor(Math.random() * (arr.length))
                let arrval = arr[arrnum];
                arr.splice(arrnum, 1);
                elem.addClass(`card card-${arrval}`);
                elem.attr("draggable", "true")
                elem.attr("id", `${arrval}`);
                elem.attr("data-lock", "false");
                let z = $(".p");
                z.eq(a).append(elem);
                let d = parseFloat(elem.prev().css("top"));
                elem.css("top", d + 20 + "px");
            }
        }
        //change the container
        b++;
        a++;

    }
    //add the group2 cards 
    a = 0
    for (let i = 0; i < 5; i++) {
        for (let i = 0; i < 10; i++) {
            var elem = $("<div></div>")
            let arrnum = Math.floor(Math.random() * (arr.length))
            let arrval = arr[arrnum];
            arr.splice(arrnum, 1);
            elem.addClass(`card card-${arrval} card-locked`);
            elem.attr("id", `${arrval}`);
            elem.attr("data-lock", "true");
            let z = $(".p2");
            z.eq(a).append(elem);
        }
        let z = $(".p2");
        let d = parseFloat(z.eq(a).css("left"))
        z.eq(a + 1).css("left", d - 20 + "px");
        a++;
    }

    //  drag start event
    $(".card").on("dragstart", (e) => {
        let x = e.target;
        let xdraggable = x.draggable;
        let xnum = parseFloat(x.id);
        let xsiblings = $(x).nextAll();
        var flag2 = false;
        if (xdraggable) {
            if (xsiblings.length == 0) {
                setTimeout(() => x.style.display = "none", 0);
                $(e.target).addClass("dragged");
            } else if (xnum >= xsiblings.length) {
                let n = 1;

                for (let c = 0; c < xsiblings.length; c++) {
                    let xsiblingsid = parseFloat(xsiblings[c].id) + n;
                    if (xnum == xsiblingsid) {
                        flag2 = true
                    } else {
                        flag2 = false;
                    }
                    if (flag2) {
                        setTimeout(() => x.style.display = "none", 0);
                        $(e.target).addClass("dragged");
                        $(xsiblings[c]).addClass("dragged");
                        n++
                    } else {
                        $(".dragged").removeClass("dragged");
                        break;
                    }
                }

            }


        }
    })



    //dragend event
    $(".card").on("dragend", (e) => {
        let x = e.target;
        x.style.display = "block";
        $(".dragged").removeClass("dragged");

    })
    var boxes = document.querySelectorAll(".p");
    for (const box of boxes) {
        box.addEventListener("dragover", dragOver);
        box.addEventListener("dragenter", dragEnter);
        box.addEventListener("drop", dragDrop);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragDrop(e) {
        var dragged = document.querySelectorAll(".dragged");
        let w = parseFloat(e.target.parentNode.lastChild.id);
        if (dragged[0] == undefined) {
            return;
        } else {
            let ww = parseFloat(dragged[0].id) + 1;
            if (w == ww) {
                for (let cj = 0; cj < dragged.length; cj++) {
                    this.append(dragged[cj]);
                    let tt = $(dragged[cj]).prev();
                    if (tt.length == 0) {
                        $(dragged[cj]).css("top", "0px");
                    } else {
                        let d = parseFloat(tt.css("top"));
                        $(dragged[cj]).css("top", d + 20 + "px");
                    }
                    $(dragged[cj]).removeClass("dragged");
                }

            } else if ($(e.target).hasClass("p")) {
                for (let cj = 0; cj < dragged.length; cj++) {
                    this.append(dragged[cj]);
                    let tt = $(dragged[cj]).prev();
                    if (tt.length == 0) {
                        $(dragged[cj]).css("top", "0px");
                    } else {
                        let d = parseFloat(tt.css("top"));
                        $(dragged[cj]).css("top", d + 20 + "px");
                    }
                    $(dragged[cj]).removeClass("dragged");
                }
            }
            unlock();


            let cardds = document.querySelectorAll(".card-13");
            for (let cardd = 0; cardd < cardds.length; cardd++) {
                let ccards = cardds[cardd];
                var flag = false;
                let xsiblings = $(ccards).nextAll();
                let n = 1;
                if (xsiblings.length == 12) {


                    for (let c = 0; c < 12; c++) {

                        let xsiblingsid = parseFloat(xsiblings[c].id) + n;
                        if (13 == xsiblingsid) {
                            flag = true;
                            n++;
                        } else {
                            flag = false;
                            break;
                        }


                    }
                }
                if (flag) {
                    $(ccards).remove();
                    $(xsiblings).remove();
                    let g3 = document.querySelector(".group3");
                    let p3 = $("<div></div>");
                    $(p3).addClass("p3");
                    $(g3).append(p3);
                    $(p3).css("left", y + 20 + "px");
                    y += 20;
                    count++;

                    if (count == 8) {
                        endgame();
                    }

                    unlock();

                }
            }

        }

        movesC++;
        scoreC--;

        document.querySelector("#movesC").innerHTML = movesC;
        document.querySelector("#scoreC").innerHTML = scoreC;

    }

    $(".p2").on("click", (e) => {
        let pp = $(".p");
        var flag1 = true;
        for (const p of pp) {
            let tt = $(p).children();
            if (tt.length > 0) {
                flag1 = true;
            } else {
                flag1 = false;
                break;
            }
        }
        if (flag1) {
            for (const p of pp) {
                var p2 = e.target.parentNode;
                let p2child = p2.firstChild;
                p.append(p2child);
                $(p2child).removeClass("card-locked");
                let t = $(p2child).prev();

                let d = parseFloat(t.css("top"));
                $(p2child).css("top", d + 20 + "px");
                $(p2child).attr("draggable", "true");
                $(p2).hide();

            }
        }




    })

    function unlock() {
        let pp = $(".p");
        for (const p of pp) {
            let plast = p.lastChild;
            $(plast).removeClass("card-locked");
            $(plast).attr("draggable", "true");

        }
    }

    function endgame() {
        $(".downbar").fadeOut(1000);
        $(".switch-wrap").fadeOut(1000);
        $(".cheattitle").fadeOut(1000);
        $(".cheatcard").fadeOut(1000);
        clearInterval(timinginterval);
        $(".endtime").html(`${t3} : ${t2} : ${t1}`);
        $(".endmoves").html(movesC);
        $(".endscore").html(scoreC);
        $(".endmsg").fadeIn();
    }
    $("#btn2").on("click", function() {
        $(".group3").empty();
        $(".group2").html(`
      <div class="p2" id="p-11"></div>
      <div class="p2" id="p-12"></div>
      <div class="p2" id="p-13"></div>
      <div class="p2" id="p-14"></div>
      <div class="p2" id="p-15"></div>`);

        startGame();
    })



    // timing start

    var timinginterval = setInterval(function() {

        if (t1 < 59) {
            t1++;

        } else if (t1 == 59) {
            t1 = 0;
            if (t2 < 59) {
                t2++;
            } else if (t2 == 59) {
                t2 = 0;
                t3++;
            }
        }
        document.querySelector("#t1").innerHTML = t1;
        document.querySelector("#t2").innerHTML = t2;
        document.querySelector("#t3").innerHTML = t3;
    }, 1000);


    //  timing end

    // cheat mode start
    $(".switch-wrap").click(function(e) {
        var cheatflag = document.querySelector("#cheatinput").checked;
        if (cheatflag) {
            $(".cheatcard").fadeIn(1000);
        } else {
            $(".cheatcard").fadeOut(1000);
        }

    });

    $(".card").mouseover(function() {
        var cheatflag = document.querySelector("#cheatinput").checked;
        if (cheatflag) {
            document.querySelector(".cheatcard").className = `cheatcard card card-${this.id}`;
        }
    });


}