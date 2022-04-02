#import hashlib
#import json
#
#import requests
#
#BLACK_COIN_URL = 'http://82.146.39.217/black_coin/api/v1'
#BLACK_COIN_ACCESS_TOKEN = '6jfvt04ydgd93dcbaigaupdjo0sxyype'
#BLACK_COIN_CALLBACK_SECRET = ''
#
#
#def get_balance():
#    headers = {'Authorization': f'Bearer 6jfvt04ydgd93dcbaigaupdjo0sxyype','Content-Type': 'application/json'}
#    response = requests.get(BLACK_COIN_URL + '/balance', headers=headers)
#    response = response.json()
#    return print(response['balance'])
#
#get_balance()




