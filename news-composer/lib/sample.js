'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * BuyNewsTransaction function business logic
 * @param {org.acme.sample.BuyNewsTransaction} tx 
 * The buy news transaction instance
 * @transaction
 */
function buyNews(tx) {
   if (tx.consumer.balance < tx.newsdata.value){
        throw new Error("Insufficient funds");
   }	

   else if (tx.newsdata.published == false){
		throw new Error("The news you want to buy is not officialy published yet!")
	}
   else{
        tx.consumer.balance -= tx.newsdata.value ;
        tx.newsdata.publisher.balance += tx.newsdata.value;
		//tx.newsdata.publisher.reputation += 10;
        //tx.consumer.reputation = tx.consumer.reputation + 150;
        /*if (tx.consumer.reputation > 1000){
            tx.consumer.balance += 50;
            tx.consumer.reputation = 0;
        }
		if (tx.newsdata.publisher.reputation > 30){
			tx.newsdata.publisher.balance += 100;
			tx.newsdata.publisher.reputation = 0;
		}*/
        return getAssetRegistry('org.acme.sample.Newsdata')
            .then(function (assetRegistry){
                return assetRegistry.update(tx.newsdata);
            }) 
            .then(function () {
                return getParticipantRegistry('org.acme.sample.User');
            })
            .then(function (participantRegistry){
                return participantRegistry.update(tx.newsdata.publisher) ;
            })
            .then(function (){
                return getParticipantRegistry('org.acme.sample.User');
            })
            .then(function(participantRegistry){
                return participantRegistry.update(tx.consumer);
            })
            .then(function(){
                var event = getFactory().newEvent('org.acme.sample','BuyEvent');
                event.eventName = tx.consumer.firstName+" buyed News: "+tx.newsdata.newsId
                event.newsdata = tx.newsdata;
                event.publisher = tx.newsdata.publisher;
                event.consumer = tx.consumer;
                emit(event);
            });
   }
}




/**
 * Payment function business logic
 * @param {org.acme.sample.Payment} tx 
 * The payment transaction instance
 * @transaction
 */
function pay(tx) {
		if (tx.payer.balance < tx.value){
			throw new Error("You have insufficient funds to complete this transaction!");
		}
		else{
			tx.payer.balance -= tx.value;
			tx.receiving.balance += tx.value;
			return getParticipantRegistry('org.acme.sample.User')
			.then(function (participantRegistry){
				return participantRegistry.update(tx.payer);
			})
			.then(function () {
                return getParticipantRegistry('org.acme.sample.User');
			})
		    .then(function (participantRegistry){
				return participantRegistry.update(tx.receiving);
			})  
	
			then(function () {

            // Emit an event for the modified asset.
            var event = getFactory().newEvent('org.acme.sample', 'PayEvent');
            event.eventName = tx.payer.lastName+" payed "+ tx.receiving.lastName+ " : " +tx.value;
            event.payer = tx.payer;
            event.consumer = tx.receiving;
            emit(event);
        });
			
	}
       
}


/**
 * Credit function business logic
 * @param {org.acme.sample.Credit} tx 
 * The credit transaction instance
 * @transaction
 */
function credit(tx) {
			tx.requester.balance += 100;
			return getParticipantRegistry('org.acme.sample.User')
			.then(function (participantRegistry){
				return participantRegistry.update(tx.requester);
			})	
			then(function () {

            // Emit an event for the modified asset.
            var event = getFactory().newEvent('org.acme.sample', 'CreditEvent');
            event.eventName = tx.requester.lastName+" credited 100 tokens"; 
            event.requester = tx.requester;
            emit(event);
        });
			      
}

/**
 * ChangeUrl function business logic
 * @param {org.acme.sample.ChangeUrl} tx 
 * The credit transaction instance
 * @transaction
 */

function changeurl(tx) {
		    if(tx.newsdata.publisher.userId != tx.publisher.userId){
		          throw new Error("You are not authorized to change the data!");
            }
			else {
				  tx.newsdata.urls = tx.newurl;
				  return getAssetRegistry('org.acme.sample.Newsdata')
       			 .then(function (assetRegistry) {

            		// Update the asset in the asset registry.
            		return assetRegistry.update(tx.newsdata);

       			 })
				 then(function () {

            // Emit an event for the modified asset.
            		var event = getFactory().newEvent('org.acme.sample', 'ChangeUrlEvent');
           		    event.eventName = tx.publisher.userId+" changed the asset URL"; 
                    event.newsdata = tx.newsdata;
                    emit(event);
       			 });
			      
		}			
			
			      
}


