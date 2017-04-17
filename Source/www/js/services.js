angular.module('starter.services', [])

.factory('Chats', function($http) {
  // Might use a resource here that returns a JSON array

    var userName = localStorage.getItem('UserName');
    console.log(userName);
  // Some fake testing data
  /*var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];*/
    var chats = [];
    if (userName != null) {
                
                //This is the API that gives the list of venues based on the place and search query.
        /*$http({
                type: "GET",
                url: 'https://api.mlab.com/api/1/databases/appointdb/collections/chats?q={recipient:\'' + userName + '\'}&apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI',

                contentType: "application/json"
            })*/
        var handler = $http.get("https://api.mlab.com/api/1/databases/appointdb/collections/chats?q={recipient:\'" + userName + "\'}&apiKey=EGAP5ndZR-TtwcytcnEZBQ-NH6PVDoiI");
            handler.success(function (data) {
                    if (data != null) {
                        console.log("a");
                        for (var i = 0; i < data.length; i++) {
                            console.log(i);
                            text = {
                                "id": i,
                                "name": data[i].username,
                                "lastText": data[i].textmessage,
                                "face": 'img/default.png'
                            };
                            chats.push(text);
                        }
                        
                        console.log(chats);
                    }
                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
    
    
});
