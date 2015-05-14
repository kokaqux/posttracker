Meteor.subscribe("facebookpost");



Template.addItem.events({
  'click .submit': function() {
  	var current_date = moment().format("DD-MM-YYYY hh:mm");
	// moment().format("DD-MM-YYYY");
	console.log('current date:',current_date);
    var facebookpost = {
      created_at: current_date,
      time: $('#time').val(),
      username: Meteor.user().username,
      user_ids: Meteor.userId(), 
      listing_url: $('#listing_url').val(),
      facebook_url: $('#facebook_url').val()
    }
    	console.log('facebookpost:', facebookpost)
    FacebookPost.insert(facebookpost);
  }
})

// function getDateString() {
//     var date = Meteor.user().createdAt;
//           var month = date.getMonth()+ 1;
//           var dateString =  month + "-" + date.getDate() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
//       		return dateString;
// }

Accounts.ui.config({
		passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
	});

Template.listItem.helpers({
	entry:function() {
	return FacebookPost.find().fetch();
	}
  	
})

Template.listItem.events({
  'click .delete' : function() {
    FacebookPost.remove(this._id);
  }
})

// Template.listItem.helpers({
// 	created_at: function() {
// 		return current_date;
// 	}
// })

// sort posting time  in desending order
// listing url with string and in ascending order
