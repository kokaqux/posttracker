Meteor.subscribe("facebookpost");



Template.addItem.events({
  'click .submit': function() {
  	var current_date = moment().format("DD-MM-YYYY hh:mm");
	console.log('current date:',current_date);
    var facebookpost = {
      created_at: current_date,
      time: $('#datetimepicker').val(),
      username: Meteor.user().username,
      user_ids: Meteor.userId(), 
      listing_url: $('#listing_url').val(),
      facebook_url: $('#facebook_url').val()
    }
    	console.log('facebookpost:', facebookpost);
    FacebookPost.insert(facebookpost);

    $(".clear").val(' ');
    // $form.parsley('validate');
    // // Get the status of validity
    // var isValid = $form.parsley('isValid');

    // if (isValid) {
    //     alert('done');
    // }
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
  entry :function() {

    var selector={};
    var options={
      sort:{}
    };

    // var sort_by_time = Session.get('sort_by_time');

    // var sort_by_listing = Session.get('sort_by_listing');

    // console.log('sort_by_time:', sort_by_time);
    // console.log('sort_by_listing:',sort_by_listing);

        


    // if (sort_by_time) {
    //   options.sort[sort_by_time] = -1;
    // };

    // delete Session.keys['sort_by_time'];

    // if (sort_by_listing) {
    // 	options.sort[sort_by_listing] = 1;
    // };

    // delete Session.keys['sort_by_listing'];

    var sort = Session.get('sort');

    if(sort) {
    	if(sort == 'created_at')
    		options.sort[sort] = -1;

    	if(sort == 'listing_url')
    		options.sort[sort] = 1;
    }


    console.log('Selector:',selector);
    console.log('Options',options);
    var facebookposts=FacebookPost.find(selector,options);
      return facebookposts;

  }
})
  	

Template.listItem.events({
  'click .delete' : function() {
    FacebookPost.remove(this._id);
  },
  'click .sort_by_time': function() {
    // tell the page to sort byname
    // Session.set('sort_by_time', 'created_at')
    Session.set('sort','created_at');
    console.log('sortin by createdAt');
  },
  'click .sort_by_listing': function() {
    // tell the page to sort byname
    // Session.set('sort_by_listing', 'listing_url')
    Session.set('sort','listing_url');
    console.log('sortin by listing');
  }
})

Template.addItem.onRendered(function() {
  $('#datetimepicker').datetimepicker({
       datepicker: false,
       format: 'H:i',
       formatTime:'g:i A'  
  })  
});

// Template.addItem.rendered = function () {

//   // Setup parsley form validation
//   // replace form with the id of your form
//   $('#form').parsley({trigger: 'change'});
// }

// Template.addItem.rendered(function(){
//   $('#addItem').parsley({trigger: 'change'})
// });

// Template.addItem.onRendered(function () {
//   $('#addItem').parsley({trigger: 'change'});
// });

// Template.addItem.onRendered(function () {
//   window.ParsleyValidator.setLocale(getLocale());
// });