import os
import glob
from shutil import copyfile

categories = [
    {
        'source': ['Data/DanTri/CongNghe', 'Data/ThanhNien/CongNghe', 'Data/TuoiTre/CongNghe', 'Data/VnExpress/CongNghe'],
        'destination': 'Data/CongNghe',
        'text_files': []
    },
    {
        'source': ['Data/DanTri/GiaiTri', 'Data/ThanhNien/GiaiTri', 'Data/TuoiTre/GiaiTri', 'Data/VnExpress/GiaiTri'],
        'destination': 'Data/GiaiTri',
        'text_files': []
    },
    {
        'source': ['Data/DanTri/GiaoDuc', 'Data/ThanhNien/GiaoDuc', 'Data/TuoiTre/GiaoDuc', 'Data/VnExpress/GiaoDuc'],
        'destination': 'Data/GiaoDuc',
        'text_files': []
    },
    {
        'source': ['Data/DanTri/Xe', 'Data/TuoiTre/Xe', 'Data/VnExpress/Xe'],
        'destination': 'Data/Xe',
        'text_files': []
    }
]

for category in categories:
    for folder in category['source']:
        folder_name = "".join(folder.split('/'))
        directory = folder + "/*.txt"
        text_files = glob.glob(directory)

        for text_file in text_files:
            file_name = text_file.split('\\')[-1]
            new_file_name = folder_name + '-' + file_name
            new_file_path = category['destination'] + "/" + new_file_name

            copyfile(text_file, new_file_path)
            category['text_files'].append(new_file_path)

for category in categories:
    for i in range(0, len(category['text_files'])):
        os.rename(category['text_files'][i], category['destination'] + '/' + str(i + 1) + '.txt') 