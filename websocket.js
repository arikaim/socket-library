/**
 *  Arikaim
 *  @copyright  Copyright (c) Intersoft Ltd <info@arikaim.com>
 *  @license    http://www.arikaim.com/license
 *  http://www.arikaim.com
*/
'use strict';

function WebSocketClient(url, protocol) {
    var socket = null;
    var onClose = null;
    var onMessage = null;
    var onOpen = null;
    var onError  = null;

    this.connect = function(url, protocol) {
        socket = new WebSocket(url,protocol);
        if (onClose != null) {
            socket.onclose = onClose;
        }

        if (onMessage != null) {
            socket.onmessage = onMessage;
        }

        if (onOpen != null) {
            socket.onopen = onOpen;
        }

        if (onError != null) {
            socket.onerror = onError;
        }
    };

    this.isConnected = function() {
        if (socket == null) {
            return false;
        }
      
        return true;
    };

    this.send = function(data) {
        if (isObject(socket) == false) {
            return false;
        }
    
        try {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }

            socket.send(data);
            return true;
        } catch(error) {
            console.error(error);
            return false;
        }
    };

    this.close = function(code) {
        if (isObject(socket) == false) {
            return;
        }

        socket.close(code);
        socket = null;
    };

    this.getSocket = function() {
        return this.socket;
    };

    this.getUrl = function() {
        if (isObject(socket) == false) {
            return null;
        }
        return socket.url;
    };

    this.getState = function() {
        if (isObject(socket) == false) {
            return null;
        }

        return socket.readyState;
    };

    this.getProtocol = function() {
        if (isObject(socket) == false) {
            return null;
        }

        return socket.protocol;
    };

    this.onClose = function(callback) {
        onClose = callback;
        if (isObject(socket) == false) {
            return false;
        }

        socket.onclose = onClose;
    };

    this.onMessage = function(callback) {
        onMessage = callback;
        if (isObject(socket) == false) {
            return false;
        }

        socket.onmessage = onMessage;
    };

    this.onOpen = function(callback) {
        onOpen = callback;
        if (isObject(socket) == false) {
            return false;
        }

        socket.onopen = onOpen;
    };

    this.onError = function(callback) {
        onError = callback;
        if (isObject(socket) == false) {
            return false;
        }

        socket.onerror = onError;
    };

    if (typeof url != 'undefined') {
        this.connect(url,protocol);
    }
}
