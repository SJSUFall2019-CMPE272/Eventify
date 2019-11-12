
from pymongo import MongoClient
# pprint library is used to make the output look more pretty
from pprint import pprint
# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient("mongodb+srv://root:root@grubhub-b4ptc.mongodb.net/grubhub?retryWrites=true&w=majority")
#pprint(client.mflix)
db = client.get_database('Eventify')
rfid_collection= db.rfid_tags
#print("Test", people.count_documents({}))
new_rfid= {
'id':'123456789',
'time':'to be fixed',
'reader':'1'
}
rfid_collection.insert_one(new_rfid)
print("Inserted, new Count", rfid_collection.count_documents({}))
#db=client.admin
# Issue the serverStatus command and print the results
#serverStatusResult=db.command("serverStatus")
#pprint(serverStatusResult)
