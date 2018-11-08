import collections
import fileinput
import mailbox
import string
from stop_words import get_stop_words
import html
import json
from html.parser import HTMLParser

class MLStripper(HTMLParser):
    def __init__(self):
        self.reset()
        self.strict = False
        self.convert_charrefs= True
        self.fed = []
    def handle_data(self, d):
        self.fed.append(d)
    def get_data(self):
        return ''.join(self.fed)

def strip_tags(html):
    s = MLStripper()
    s.feed(html)
    return s.get_data()


stop_words = get_stop_words('en')
worddict = {}
wc = []

def remove_punc(u):
	for s in string.punctuation:
  		u = u.replace(s,'')
	return u

def rerere(message):
	bb = ''
	for part in message.get_payload():
			if not part.is_multipart():
				bb += part.get_payload()
			else:
				bb += rerere(part)
	return bb

for message in mailbox.mbox('mlpack.mbox'):
	if message.is_multipart():
		b =''
		b += rerere(message)
		b = html.unescape(b)
		b = strip_tags(b)
		worddict[message['From']+message['To']] = collections.Counter([w for w in remove_punc(b).lower().split() if not w in stop_words])
	else:		
		worddict[message['From']+message['To']] = collections.Counter([w for w in remove_punc(message.get_payload()).lower().split() if not w in stop_words])

jsonfile = open('wc.json', 'w')

json.dump(worddict, jsonfile)



	
