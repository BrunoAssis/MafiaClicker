if (Meteor.isClient) {
  Meteor.subscribe('userData');

  Template.main.user = function() {
    return Meteor.user();
  };

  Template.main.items = function() {
    return [{name: "Kiddo", cost: 100}];
  };

  Template.main.events({
    'click input.crime': function() {
      Meteor.call('click');
    },
    'click input.buy': function(event) {
      Meteor.call('buy', event.target.id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function(){
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

Meteor.methods({
  click: function() {
    Meteor.users.update({_id: this.userId}, {$inc: {'money': 1}});
  },
  buy: function(amount) {
    if (Meteor.user().money >= amount && amount > 0) {
      Meteor.users.update({_id: this.userId}, {$inc: {'rate': (Math.floor(amount/500)), 'money': (0-amount)}});
    }
  }
});
