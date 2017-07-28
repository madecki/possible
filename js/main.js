'use strict';

var model = {
    date: getDateElement(),
    members: getMembers(),
    currentMemberName: currentMemberName(),
    currentMemberPosition: currentMemberPosition(),
    bigImage: bigImage(),
    setMember: setMember,
    selectedMember: 0,
    carousel: {
        min: 0,
        max: 5
    }
};

function getDateElement() {
    return document.getElementById("nav-date");
}

function getMembers() {

    var membersDirty = document.getElementsByClassName("member");
    var members = [];

    for (var i = 0; i < membersDirty.length; i++) {
        var memberData = {
            name: membersDirty[i].dataset.name,
            position: membersDirty[i].dataset.position,
            DOMobject: membersDirty[i],
            order: i,
            rawMember: membersDirty[i]
        };
        members.push(memberData);
    }
    return members;
}

function currentMemberName() {
    return document.getElementById("member-name");
}

function currentMemberPosition() {
    return document.getElementById("member-position");
}

function bigImage() {
    return document.getElementById("big-image");
}

function showHideInfo(type) {
    var info = document.getElementById("team-members-info").style;
    if (type === 'show') {
        info.padding = "5px 15px";
        info.height = '40px';
    }
    else {
        info.padding = "0";
        info.height = '0';
    }

}

function setMemberData(member) {

    var rawMember = member.rawMember.style;

    for (var i = 0; i < model.members.length; i++) {
        model.members[i].rawMember.style.opacity = '0.6';
        model.members[i].rawMember.style.border = 'none';
    }

    for (var i = 0; i < model.members.length; i++) {
        if (i >= model.carousel.min || i <= model.carousel.max){
            model.members[i].rawMember.style.display = 'block';
        }
        if(i < model.carousel.min || i > model.carousel.max) {
            model.members[i].rawMember.style.display = 'none';
        }
    }

    rawMember.border = '2px solid #1d9ed9';
    rawMember.opacity = 1;

    model.currentMemberName.innerHTML = member.name;
    model.currentMemberPosition.innerHTML = member.position;
    var backgroundUrl = 'url(\"assets/img/members/big' + model.selectedMember + '.jpg\")';
    model.bigImage.style.backgroundImage = backgroundUrl;
}


function setMember(command) {
    if(command === 'next') {

        if (model.selectedMember !== 9) {
            model.selectedMember++;

            if (model.selectedMember < 3) {
                model.carousel.min = 0;
                model.carousel.max = 5;
                setMemberData(model.members[model.selectedMember]);
            }
            else if(model.selectedMember >= 6) {
                model.carousel.min = 4;
                model.carousel.max = 9;
                setMemberData(model.members[model.selectedMember]);
            }
            else {
                model.carousel.min++;
                model.carousel.max++;
                setMemberData(model.members[model.selectedMember]);
            }
        }

    }

    if(command === 'previous') {

        if (model.selectedMember !== 0) {
                model.selectedMember--;

            if (model.selectedMember < 3) {
                model.carousel.min = 0;
                model.carousel.max = 5;
                setMemberData(model.members[model.selectedMember]);
            }
            else if (model.selectedMember >= 6) {
                model.carousel.min = 4;
                model.carousel.max = 9;
                setMemberData(model.members[model.selectedMember]);
            }
            else {
                model.carousel.min--;
                model.carousel.max--;
                setMemberData(model.members[model.selectedMember]);
            }
        }
        else return;

    }

    else if(typeof(command) === 'number'){
        model.selectedMember = command;

        if(command < 2) {
            model.carousel.min = 0;
            model.carousel.max = 5;
            setMemberData(model.members[command]);
            return;
        }
        else if(command >= 6) {
            model.carousel.min = 4;
            model.carousel.max = 9;
            setMemberData(model.members[command]);
        }
        else {
            model.carousel.min = command - 2;
            model.carousel.max = command + 3;
            setMemberData(model.members[command]);
        }
    }
}

function initPage() {
    function createDate(date) {
        var months = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

        return day + ' ' + months[month] + ' ' + year;
    }
    model.date.innerHTML = createDate(new Date());
    setMember(0);
}

initPage();
