import serial 
#import MySQLdb
import time
from datetime import datetime
from pymongo import MongoClient
#establish connection to MySQL. You'll have to change this for your database.
#dbConn = MySQLdb.connect("localhost","root","","rfid_scanner") or die ("could not connect to database")
#open a cursor to the database
#cursor = dbConn.cursor()
client = MongoClient("mongodb+srv://root:root@cluster0-1enyv.mongodb.net/test?retryWrites=true&w=majority")
#pprint(client.mflix)
db = client.get_database('Eventify')
rfid_collection= db.rfid_tags

device = 'COM3' #this will have to be changed to the serial port you are using
try:
  print ("Trying...",device) 
  arduino = serial.Serial(device, 9600) 
except: 
  print ("Failed to connect on",device)
while True:
    time.sleep(2)
    try:
        data=arduino.readline()
        print (data)
        pieces=data.split( )
        print (pieces)
        try:
            print("hhhh")
            tagId = pieces[0].decode('ascii')
            print("tagId",tagId)
            if tagId.isnumeric():
                now = datetime.now()
                current_time = now.strftime("%H:%M:%S")
                print("Current Time =", current_time)
                document_id = rfid_collection.find_one({'id':tagId, 'isComplete':'false','reader':1},{'_id':1,'current_time_in':1})
                print(document_id)
                # print(document_id["_id"])
                if not document_id is None:
                    entryTime = document_id["current_time_in"]
                    timeDiff1 = now - entryTime
                    timeDiff = timeDiff1.total_seconds() / 60
                    print("diff",timeDiff )
                    updateQuery = { '_id': document_id["_id"] }

                    newvalues = { "$set": { 'isComplete' : 'true', 'current_time_out': now , 'timeDifference':timeDiff }}
                    rfid_collection.update_one(updateQuery, newvalues)
                    print("data updated")
                else:
                    print("inside else")
                    new_rfid={'id' : tagId ,'current_time_in': now, 'reader': 1, 'isComplete':'false' }
                    rfid_collection.insert_one(new_rfid)
                    print("data inserted")
            

            # new_rfid= {
            # 'id':pieces[0].decode('ascii'),
            # 'time':'to be fixed',
            # 'reader':'1',
            # 'flag': pieces[1].decode('ascii')
            # }
            # rfid_collection.insert_one(new_rfid)
            # print("Inserted, new Count", rfid_collection.count_documents({}))
            # client.close()
        except :
            print ("failed to insert data")
        finally:
            print("done")
            #client.close()
    except:
        print ("Processing")
    
            
