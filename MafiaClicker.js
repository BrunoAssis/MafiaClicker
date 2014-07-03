if (Meteor.isClient) {
  Meteor.subscribe('userData');

  Template.hello.greeting = function () {
    return "Welcome to MafiaClicker.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Accounts.onCreateUser(function(options, user) {
      user.money = 0;
      user.rate = 0;
      return user;
    });
  });

  Meteor.publish("userData", function() {
    return Meteor.users.find({}, {sort: {'money': -1}});
  });
}
