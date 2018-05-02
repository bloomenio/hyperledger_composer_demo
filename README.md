# Bloomen - Hyperledger Composer Application Demo - BackEnd


### Technical Description
This demo is based on Hyperledger Platform. Three major components/Hyperledger Projects have been used:
1) Hyperledger Fabric
2) Hyperledger Composer
3) Hyperledger Explorer

### Application Description
Participants : Media Content Publishers and Consumers
* Publishers can create a new asset by specifying ID, Title, Description and others
* Consumers can pay tokens to buy this content
* Query powered from Hyperledger Composer (Extra Feature)
* Changing Metadata powered from Hyperledger Composer (Extra Feature)
* Simple token payments
* Exploring all transactions in blockchain using Hyperledger Explorer Project 


## Prerequisites
* Hyperledger Fabric Installation
* Hyperledger Explorer Installation
* MySQL
* Hyperledger Explorer Ιnstallation

## Initializing Hyperledger Fabric Network
```
cd fabric-dev-servers
./startFabric.sh
./createComposerProfile.sh
./createPeerAdminCard.sh
```

## Initializing Hyperledger Composer Application
```
cd ../news-composer
composer archive create -t dir -n .

composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName news-network

composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile news-network@1.1.0.bna --file networkadmin.card

composer card import --file networkadmin.card

composer-rest-server
```
Now you are ready to browse the REST API at http://localhost:3000!

## Initializing Hyperledger Explorer 
```
cd ../blockchain-explorer
mysql -u<username> -p < db/fabricexplorer.sql
npm install
./start.sh
```
You can also process config.json file as you want!
Now you can access your Hyperledger Blockchain at http://localhost:9090

