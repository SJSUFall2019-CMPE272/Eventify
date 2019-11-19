import serial 
#import MySQLdb
import time
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
            new_rfid= {
            'id':pieces[0].decode('ascii'),
            'time':'to be fixed',
            'reader':'1',
            'flag': pieces[1].decode('ascii')
            }
            rfid_collection.insert_one(new_rfid)
            print("Inserted, new Count", rfid_collection.count_documents({}))
            #client.close()
        except :
            print ("failed to insert data")
        finally:
            print("done")
            #client.close()
    except:
        print ("Processing")
    
            
