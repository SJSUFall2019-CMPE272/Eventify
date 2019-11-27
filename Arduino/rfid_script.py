import serial 
import time
from pymongo import MongoClient
#establish connection to MySQL. You'll have to change this for your database.
#dbConn = MySQLdb.connect("localhost","root","","rfid_scanner") or die ("could not connect to database")
#open a cursor to the database
#cursor = db.cursor()
client = MongoClient("mongodb+srv://root:root@cluster0-1enyv.mongodb.net/test?retryWrites=true&w=majority")
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
        print ("Data to be inserted", data)
        pieces=data.split()
        print (pieces)
        #pieces=data.split("")
        #print ("Pieces after split",pieces)
        try:
            new_rfid= {
                    'id':data,
                    'time':'to be fixed',
                    'reader':'1',
                    'flag':data
                    }
            rfid_collection.insert_one(new_rfid)
            print("Inserted, new Count", rfid_collection.count_documents({}))
            #cursor=dbConn.cursor()

            #cursor.execute("""INSERT INTO scanner_data (ID,flag) VALUES (%s,%s)""", (pieces[0],pieces[1]))
            #dbConn.commit()
            client.close()
        except :
            print ("failed to insert data")
        finally:
            client.close()
    except:
        print ("Processing")
    
            
