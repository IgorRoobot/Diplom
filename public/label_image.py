# /usr/bin/python3
# -*- coding: utf-8 -*-
import sqlite3
import tensorflow

class Main:

    def search(self, image_path):
        result = []

        # считывает файл image_data
        image_data = tensorflow.gfile.FastGFile(image_path, 'rb').read()
        
        # загружает выбранный файл и удаляет символ разрыва строки
        label_lines = [line.rstrip() for line in tensorflow.gfile.GFile("/var/www/i-dyplom/public_html/tf_files/retrained_labels.txt")]
        # return {"data": image_path}

        # отделяет граф от файла
        with tensorflow.gfile.FastGFile("/var/www/i-dyplom/public_html/tf_files/retrained_graph.pb", 'rb') as f:
            graph_def = tensorflow.GraphDef()
            graph_def.ParseFromString(f.read())
            _ = tensorflow.import_graph_def(graph_def, name='')

        # загружает image_data как входные данные и отображает первые предположения
        with tensorflow.Session() as sess:
            softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')
            predictions = sess.run(softmax_tensor, {'DecodeJpeg/contents:0': image_data})

        # сортирует категории после первых предположений в порядке роста уверенности
        top_k = predictions[0].argsort()[-len(predictions[0]):][::-1]

        for node_id in top_k:
            human_string = label_lines[node_id]
            score = predictions[0][node_id]

            result.append({
                'title': human_string,
                'score': int(score*100),
                'image': image_path
                })

        return {'data': 'Image was not recognized'} if int(result[0].get('score')) < 90 else self.get_from_db(result[0])

    def get_from_db(self, object):
        # подключение к бд
        conn = sqlite3.connect("/var/www/i-dyplom/public_html/data.db")

        with conn:
            cur = conn.cursor()

            # получаем категорию
            cur.execute("SELECT * FROM images WHERE title='%s'" % object.get('title'))
            data = cur.fetchone()
            # формируем результат
            data = {
                "score": object.get('score'),
                "id": data[0],
                "name": data[1],
                # "description": data[1],
                # "image": object.get('image')
            }

        return data
