import moment from 'moment';

import ioClient from 'socket.io-client';

const socket = ioClient('http://localhost:3000');

const msgs = [];
var nickName = lorem();
var onlineUsers = [];
var userTyping = {nickName:null};
var timeout;


socket.emit('user connected', nickName);

socket.on('msg received', function (strMsg) {
    var msg = JSON.parse(strMsg);
    // JIF - change the last index to "processed" - 
    // ideally it would be to the object from server to replace the object in arr by idx
    if (nickName === msg.from) msgs[msgs.length - 1].processed = true;
    else msgs.push(msg);
});

socket.on('other user connected', function (connectedNickName) {
    //how can i know who logs out? can i do it without info stored in db?
    onlineUsers.push(connectedNickName);
    if (nickName !== connectedNickName) {
        let msg = `${connectedNickName} connected`;
        let msgObj = { txt: msg, from: 'system' }
        msgs.push(msgObj);
    }

})

socket.on('user disconnect', function () {
    let msg = 'user disconnected';
    msgs.push(getSystemMsg(msg));
})

socket.on('user typing', function (typingUser) {
    clearTimeout(timeout);
    userTyping.nickName = typingUser;
    //ideal would be to be using debounce somehow...
    timeout = setTimeout(function () {
        userTyping.nickName = null;
    }, 1000);
})


const getSystemMsg = (msg) => {
    return { txt: msg, from: 'system' };
}

const getMsgs = () => {
    return msgs;
}

const send = (msg) => {
    msgs.push(msg);
    socket.emit('msg new', JSON.stringify(msg));
}

function typing(nickName) {
    socket.emit('typing', nickName);
}

function lorem(size = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

export default {
    getMsgs,
    send,
    nickName,
    typing,
    onlineUsers,
    userTyping,
}
