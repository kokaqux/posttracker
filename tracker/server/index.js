Meteor.publish('facebookpost',function(){
	return FacebookPost.find();
})
