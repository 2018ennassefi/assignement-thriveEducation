from flask import jsonify
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
import os
import sqlite3
import click
from flask import current_app, g
from flask.cli import with_appcontext
from sqlalchemy import MetaData

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)

class Content(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(50),unique= True, nullable =False)
    content = db.Column(db.Text)
    def as_dict(self):
        return {self.name:self.content}


@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/init')
def init():
    #To create table and contents
    db.drop_all()
    db.create_all()
    introduction = Content(name='introduction',content="<p>Join <b>Thrive Education's </b> core team on our mission to use technology to provide clarity for people wiht learning differences like dyslexia, ADHD, and autism. We are a young, well-funded startup, on our way to a top-tier accelerator this summer. We are deeply mission driven, entrepreneurial, and value open communication to drive the best answer.</p> <p> One in five people has a learning difference, but many go undiagnosed due to high costs and long wait times. We believe that, if properly identified and harnessed, a learning difference can be a remarkable strength. Our vision is to give every persoon with a learning difference the full range of tools they need to thrive, from diagnosis to support.</p>")
    role = Content(name='role',content='We are looking for an ambitious <b>Full-Stack Engineer</b> (VP of engineering wannabee), who will come in at the ground floor and help shape our company and product. You will work hand-in-hand with our CTO to bring a premium experience to our customers while ensuring the scalability of our multi-purpose, data-rich platforms. You will also work closely with the rest of the team, as the product requirements will be developed alongside our Operations and our Clinical Psychology functions. ')
    profile = Content(name='profile',content='Aside from technlogy, we are looking for someone who is detail-oriented, rigorously implements best-practices, communicates openly, and has an intuition for end-to-end product development ( user empathy, experience design, etc.). You should be ready to develop adn defend data-based opinions, as you will play a decisive role in designing our product road map. As far as our tech stack, you should be fluent in Javascript, Python, Docker, SQL, and knowledgeable in Vue.js, AWS, and Cloud Security.')
    location = Content(name='location',content='We are a "remote-first" company and have no requirements regarding location. However, the founding team is based in LA, so that may be a plus for team cohesion. Authorization to work in United States is required')
    interested = Content(name='interested',content="If you feel like you're a good fit, we would like to know more about you. Send us your resume and a brief introduction (please keep it light) to <b>meryll@thrive-education.co </b>. Looking forward hearing from you!")
    credentials = Content(name='credentials',content='<b>Thrive Education is an equal oppurtunity employer </b>. We celebrate diversity and are commited to creating an inclusive environment for all employees. All employment decisions at Thrive Education are based on business needs, job requirements, and individual qualifications without regard to race, color, religion, sex, national origins, disability status, protected veteran status, or any other characteristic protected by law.')
    quote = Content(name='quote',content='<i>Everybody is a genius. But if you judge a fish but its ability to climb a tree, it will live its whole life believing that it is stupid. - <b>Albert Einstein </b> </i>')
    weblink = Content(name='weblink',content='thrive-education.co')
    linkedin=Content(name='linkedin',content='linkedin.com/company/thriveeducation')
    contents = [introduction,role,profile,location,interested,credentials,quote,weblink,linkedin]
    for content in contents:
            db.session.add(content)
    try:
        db.session.commit()
    except: #the database has been intialized before
        print('error')
        pass
    return '<h1> Initialized all content  ! </h1> <br> <h2> Please go back to main page to see all content'

@app.route('/getData')
@cross_origin()
def sendData():
    result ={}
    contents = Content.query.all()
    for content in contents:
        result.update(Content.as_dict(content))
    print(result)
    return result