import sqlite3

conn = sqlite3.connect("data.db")
cur = conn.cursor()

cur.execute("""CREATE TABLE IF NOT EXISTS images
                  (
					id integer primary key autoincrement,
                  	title text, 
                  	description text,
					url text,
					domain text,
					realm text,
					department text,
					class text,
					order_ text,
					family text,
					rod text,
					species text,
					mixed_forests text,
					forest_steppe text,
					steppe text,
					mountains text)""")

cur.execute("INSERT INTO images VALUES('0', 'dandelion','description', 'https://upload.wikimedia.org/wikipedia/commons/4/44/AmanitaFranchetii.jpg', 'Эукариоты', 'Грибы', 'Базидиомицеты', 'Агарикомицеты', 'Агариковые', 'Мухоморовые', 'Мухомор', 'None', '252', '52', '1111', '1231')")
cur.execute("INSERT INTO images VALUES('1','daisy','description daisy', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Amanita_caesarea.JPG/800px-Amanita_caesarea.JPG', 'Эукариоты', 'Грибы', 'Базидиомицеты', 'Агарикомицеты', 'Агариковые', 'Мухоморовые', 'Мухомор', 'null', '252', '52', '1111', '1231')")

conn.commit()
